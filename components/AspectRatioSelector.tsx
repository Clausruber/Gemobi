import React from 'react';
import type { AspectRatio } from '../types';
import { ASPECT_RATIOS } from '../constants';
import { translations } from '../config/translations';

interface AspectRatioSelectorProps {
  selectedRatio: AspectRatio;
  onSelectRatio: (ratio: AspectRatio) => void;
}

const AspectRatioSelector: React.FC<AspectRatioSelectorProps> = ({ selectedRatio, onSelectRatio }) => {
  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-3">{translations.es_MX.aspectRatioTitle}</h2>
      <div className="relative w-full">
        <select
          id="ratio-select"
          value={selectedRatio}
          onChange={(e) => onSelectRatio(e.target.value as AspectRatio)}
          className="w-full appearance-none bg-gray-100 border border-gray-300 rounded-lg py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Select aspect ratio"
        >
          {ASPECT_RATIOS.map((ratio) => (
            <option key={ratio.value} value={ratio.value}>
              {ratio.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default AspectRatioSelector;
