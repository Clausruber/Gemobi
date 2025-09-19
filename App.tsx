import React, { useState, useCallback, useEffect } from 'react';
import type { UploadedFile, AspectRatio, HistoryItem } from './types';
import { DECORATION_STYLES } from './constants';
import { generateDecoratedImage } from './services/geminiService';
import { translations } from './config/translations';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './services/firebase';
import { addUserHistoryItem, getUserHistory, clearUserHistory } from './services/firestoreService';

import Navbar from './components/Navbar';
import ImageUploader from './components/ImageUploader';
import StyleSelector from './components/StyleSelector';
import AspectRatioSelector from './components/AspectRatioSelector';
import InstructionsInput from './components/InstructionsInput';
import ResultDisplay from './components/ResultDisplay';
import HistoryPanel from './components/HistoryPanel';
import SparklesIcon from './components/icons/SparklesIcon';
import MenuIcon from './components/icons/MenuIcon';
import AuthModal from './components/AuthModal';
import SpinnerIcon from './components/icons/SpinnerIcon';


const App: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string>(DECORATION_STYLES[0].name);
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<AspectRatio>('4:3');
  const [instructions, setInstructions] = useState<string>('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        setUser(currentUser);
        if (currentUser) {
            setIsAuthModalOpen(false); // Close modal on successful login
            try {
                const userHistory = await getUserHistory(currentUser.uid);
                setHistory(userHistory);
            } catch (e) {
                console.error("Failed to load user history", e);
                setError(translations.es_MX.errorHistoryLoad);
                setHistory([]);
            }
        } else {
            setHistory([]);
        }
        setIsAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);


  const handleGenerateClick = useCallback(async () => {
    if (!uploadedFile) {
      setError(translations.es_MX.errorUpload);
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);
    if(isSidebarOpen) setIsSidebarOpen(false); 

    try {
      const result = await generateDecoratedImage(
        uploadedFile.base64,
        uploadedFile.mimeType,
        selectedStyle,
        selectedAspectRatio,
        instructions
      );
      setGeneratedImage(result);

      if (user) {
        const newHistoryItemData: Omit<HistoryItem, 'id'> = {
          generatedImage: result,
          originalFile: uploadedFile,
          style: selectedStyle,
          aspectRatio: selectedAspectRatio,
          instructions: instructions,
          timestamp: Date.now(),
        };
        
        const newId = await addUserHistoryItem(user.uid, newHistoryItemData);
        const newHistoryItem = { ...newHistoryItemData, id: newId };
        setHistory(prev => [newHistoryItem, ...prev]);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  }, [uploadedFile, selectedStyle, selectedAspectRatio, instructions, user, isSidebarOpen]);
  
  const handleDownloadImage = useCallback(() => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${generatedImage}`;
    link.download = `ai-decorator-${selectedStyle.toLowerCase().replace(' ', '-')}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [generatedImage, selectedStyle]);

  const handleSelectHistoryItem = (item: HistoryItem) => {
    setUploadedFile(item.originalFile);
    setSelectedStyle(item.style);
    setSelectedAspectRatio(item.aspectRatio);
    setInstructions(item.instructions || '');
    setGeneratedImage(item.generatedImage);
    setError(null);
    if(isSidebarOpen) setIsSidebarOpen(false);
  };

  const handleClearHistory = async () => {
    if (user && window.confirm(translations.es_MX.confirmClearHistory)) {
        try {
            await clearUserHistory(user.uid);
            setHistory([]);
        } catch (err) {
            console.error("Failed to clear history", err);
            setError(translations.es_MX.errorHistoryClear);
        }
    }
  };

  const handleEditImage = useCallback((base64Image: string) => {
    const newFile: UploadedFile = {
        base64: base64Image,
        mimeType: 'image/png',
        name: `edited-${Date.now()}.png`
    };
    setUploadedFile(newFile);
    setGeneratedImage(null);
    setError(null);

    if (window.innerWidth < 768) {
      setIsSidebarOpen(true);
    }
  }, []);
  
  const handleEditHistoryItem = useCallback((item: HistoryItem) => {
    handleEditImage(item.generatedImage);
  }, [handleEditImage]);

  const isGenerateDisabled = !uploadedFile || isLoading;

  if (isAuthLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gray-50">
        <SpinnerIcon className="w-12 h-12 text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans flex flex-col">
      <Navbar user={user} onLoginClick={() => setIsAuthModalOpen(true)}>
        <button 
          className="md:hidden p-2"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label="Toggle controls"
          title="Toggle controls panel"
        >
          <MenuIcon className="w-6 h-6 text-gray-600" />
        </button>
      </Navbar>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <div className="flex flex-1 overflow-hidden relative">
        <aside className={`w-full max-w-sm p-6 bg-white border-r border-gray-200 overflow-y-auto flex flex-col gap-8 transition-transform duration-300 ease-in-out md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} absolute md:static h-full z-10`}>
          <ImageUploader uploadedFile={uploadedFile} onFileSelect={setUploadedFile} />
          <StyleSelector selectedStyle={selectedStyle} onSelectStyle={setSelectedStyle} />
          <AspectRatioSelector selectedRatio={selectedAspectRatio} onSelectRatio={setSelectedAspectRatio} />
          <InstructionsInput instructions={instructions} onInstructionsChange={setInstructions} />
          
          <button
            onClick={handleGenerateClick}
            disabled={isGenerateDisabled}
            className={`w-full flex items-center justify-center gap-2 mt-auto py-3 px-6 rounded-lg text-lg font-bold transition-all duration-300 transform hover:scale-[1.02]
              ${isGenerateDisabled 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 shadow-lg shadow-indigo-500/30'
              }`}
          >
            <SparklesIcon className="w-6 h-6" />
            {isLoading ? translations.es_MX.generatingButton : translations.es_MX.generateButton}
          </button>
        </aside>

        <main className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto w-full">
            <HistoryPanel 
              user={user}
              history={history}
              onSelect={handleSelectHistoryItem}
              onClear={handleClearHistory}
              onEdit={handleEditHistoryItem}
            />
            <div className="flex-1 flex mt-6">
               <ResultDisplay 
                isLoading={isLoading} 
                generatedImage={generatedImage} 
                error={error} 
                onDownload={handleDownloadImage}
                onEdit={() => generatedImage && handleEditImage(generatedImage)}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;