import React from 'react';
import type { User } from 'firebase/auth';
import type { HistoryItem } from '../types';
import TrashIcon from './icons/TrashIcon';
import EditIcon from './icons/EditIcon';
import { translations } from '../config/translations';

interface HistoryPanelProps {
  history: HistoryItem[];
  user: User | null;
  onSelect: (item: HistoryItem) => void;
  onClear: () => void;
  onEdit: (item: HistoryItem) => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, user, onSelect, onClear, onEdit }) => {
  const getTooltipText = (item: HistoryItem) => {
    let tooltip = `Style: ${item.style}\nRatio: ${item.aspectRatio}`;
    if (item.instructions) {
      tooltip += `\nInstructions: ${item.instructions}`;
    }
    return tooltip;
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-2xl font-semibold text-gray-800">{translations.es_MX.historyTitle}</h2>
        {user && history.length > 0 && (
          <button
            onClick={onClear}
            className="text-gray-500 hover:text-red-500 transition-colors duration-200 p-1"
            aria-label={translations.es_MX.clearHistory}
            title={translations.es_MX.clearHistory}
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        )}
      </div>
      <div className="bg-white p-4 rounded-lg border border-gray-200 min-h-[120px]">
        {!user ? (
            <div className="flex items-center justify-center h-full text-gray-500 text-center py-6">
                <p>{translations.es_MX.historyLoginPrompt}</p>
            </div>
        ) : history.length > 0 ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-3">
            {history.map((item) => (
              <div
                key={item.id}
                className="group aspect-square relative"
                title={getTooltipText(item)}
              >
                <img
                  src={`data:image/png;base64,${item.generatedImage}`}
                  alt={`Generated on ${new Date(item.timestamp).toLocaleDateString()}`}
                  className="w-full h-full object-cover rounded-md border-2 border-transparent group-hover:opacity-0 transition-all duration-300 cursor-pointer"
                  onClick={() => onSelect(item)}
                />
                 <img
                  src={`data:${item.originalFile.mimeType};base64,${item.originalFile.base64}`}
                  alt="Original"
                  className="w-full h-full object-cover rounded-md border-2 border-indigo-500 absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
                  onClick={() => onSelect(item)}
                />
                <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit(item);
                        }}
                        className="bg-white/70 backdrop-blur-md text-gray-800 p-2 rounded-full hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
                        title="Use this image as the next input"
                    >
                        <EditIcon className="w-4 h-4" />
                    </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 text-center py-6">
            <p>{translations.es_MX.historyPlaceholder}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPanel;