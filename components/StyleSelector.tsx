import React from 'react';
import { DECORATION_STYLES } from '../constants';
import { translations } from '../config/translations';
import CheckCircleIcon from './icons/CheckCircleIcon';

interface StyleSelectorProps {
  selectedStyle: string;
  onSelectStyle: (style: string) => void;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyle, onSelectStyle }) => {
  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-3">{translations.es_MX.styleTitle}</h2>
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {DECORATION_STYLES.map((style) => (
          <button
            key={style.name}
            onClick={() => onSelectStyle(style.name)}
            className={`relative group rounded-lg overflow-hidden border-2 aspect-video transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              selectedStyle === style.name ? 'border-indigo-500 shadow-md' : 'border-transparent hover:border-indigo-400'
            }`}
            aria-pressed={selectedStyle === style.name}
          >
            <img 
              src={style.imageUrl} 
              alt={style.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <span className="absolute bottom-2 left-3 text-white font-bold text-sm drop-shadow-md">{style.name}</span>
            {selectedStyle === style.name && (
              <div className="absolute top-2 right-2 text-white bg-indigo-500 rounded-full p-0.5">
                <CheckCircleIcon className="w-5 h-5" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StyleSelector;