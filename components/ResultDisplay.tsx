import React, { useState, useEffect } from 'react';
import SpinnerIcon from './icons/SpinnerIcon';
import SparklesIcon from './icons/SparklesIcon';
import DownloadIcon from './icons/DownloadIcon';
import EditIcon from './icons/EditIcon';
import ExclamationTriangleIcon from './icons/ExclamationTriangleIcon';
import { translations } from '../config/translations';

interface ResultDisplayProps {
  isLoading: boolean;
  generatedImage: string | null;
  error: string | null;
  onDownload: () => void;
  onEdit: () => void;
}

const loadingMessages = [
  translations.es_MX.generatingSubtitle,
  translations.es_MX.loadingMessage1,
  translations.es_MX.loadingMessage2,
  translations.es_MX.loadingMessage3,
  translations.es_MX.loadingMessage4,
];

const ResultDisplay: React.FC<ResultDisplayProps> = ({ isLoading, generatedImage, error, onDownload, onEdit }) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    if (isLoading) {
      const intervalId = setInterval(() => {
        setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
      }, 2500);
      return () => clearInterval(intervalId);
    }
  }, [isLoading]);

  return (
    <div className="w-full h-full bg-white rounded-lg flex items-center justify-center p-4 border border-gray-200 shadow-inner bg-gray-50/50 min-h-[400px]">
      {isLoading ? (
        <div className="text-center text-gray-600">
          <SpinnerIcon className="w-12 h-12 mx-auto mb-4 text-indigo-500" />
          <p className="text-lg font-semibold">{translations.es_MX.generatingTitle}</p>
          <p className="text-sm text-gray-500 transition-opacity duration-500 h-5">{loadingMessages[currentMessageIndex]}</p>
        </div>
      ) : error ? (
        <div className="text-center text-red-600 p-6 flex flex-col items-center">
          <ExclamationTriangleIcon className="w-12 h-12 mx-auto mb-4" />
          <p className="font-bold text-lg">{translations.es_MX.errorTitle}</p>
          <p className="mt-2 max-w-md">{error}</p>
        </div>
      ) : generatedImage ? (
        <div className="w-full h-full relative group">
          <img
            src={`data:image/png;base64,${generatedImage}`}
            alt="Generated decoration"
            className="w-full h-full object-contain rounded-md"
          />
          <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={onDownload}
              className="bg-white/70 backdrop-blur-md text-gray-800 p-3 rounded-full hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 transition-all"
              aria-label="Download image"
              title="Download image"
            >
              <DownloadIcon className="w-6 h-6" />
            </button>
            <button
              onClick={onEdit}
              className="bg-white/70 backdrop-blur-md text-gray-800 p-3 rounded-full hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 transition-all"
              aria-label="Edit this image"
              title="Use this image as the next input"
            >
              <EditIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-400 p-6">
          <SparklesIcon className="w-16 h-16 mx-auto mb-4" />
          <p className="text-xl font-medium text-gray-600">{translations.es_MX.masterpieceTitle}</p>
          <p>{translations.es_MX.masterpieceSubtitle}</p>
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;