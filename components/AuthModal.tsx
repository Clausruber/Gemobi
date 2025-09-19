import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';
import { translations } from '../config/translations';
import XIcon from './icons/XIcon';
import SpinnerIcon from './icons/SpinnerIcon';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Reset form when modal opens
      setEmail('');
      setPassword('');
      setError(null);
      setIsLoading(false);
    }
  }, [isOpen]);

  const handleAuthAction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);
    setError(null);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      // The onAuthStateChanged listener in App.tsx will handle closing the modal
    } catch (err: any) {
      setError(err.code ? translations.es_MX.errorAuthDefault : err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300" aria-modal="true" role="dialog">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 sm:p-8 relative transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 p-1 rounded-full transition-colors" aria-label="Close modal">
          <XIcon className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          {isLogin ? translations.es_MX.loginTitle : translations.es_MX.signupTitle}
        </h2>
        <p className="text-center text-gray-500 mb-6">
          {isLogin ? translations.es_MX.loginSubtitle : translations.es_MX.signupSubtitle}
        </p>
        
        <form onSubmit={handleAuthAction}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">{translations.es_MX.emailLabel}</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="you@example.com"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password"  className="block text-sm font-medium text-gray-700 mb-1">{translations.es_MX.passwordLabel}</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
            />
          </div>
          
          {error && <p className="text-red-500 text-sm text-center mb-4 bg-red-100 p-2 rounded-md">{error}</p>}
          
          <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 transition-all duration-300">
            {isLoading ? <SpinnerIcon className="w-6 h-6"/> : (isLogin ? translations.es_MX.loginButton : translations.es_MX.signupButton)}
          </button>
        </form>
        
        <p className="text-center text-sm text-gray-500 mt-6">
          {isLogin ? translations.es_MX.noAccountPrompt : translations.es_MX.hasAccountPrompt}{' '}
          <button onClick={() => { setIsLogin(!isLogin); setError(null); }} className="font-medium text-indigo-600 hover:text-indigo-500 underline">
            {isLogin ? translations.es_MX.signupLink : translations.es_MX.loginLink}
          </button>
        </p>
      </div>
       <style>{`
        @keyframes fade-in-scale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-scale {
          animation: fade-in-scale 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AuthModal;