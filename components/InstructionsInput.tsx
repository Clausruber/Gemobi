import React from 'react';
import { translations } from '../config/translations';

interface InstructionsInputProps {
  instructions: string;
  onInstructionsChange: (instructions: string) => void;
}

const InstructionsInput: React.FC<InstructionsInputProps> = ({ instructions, onInstructionsChange }) => {
  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-3">{translations.es_MX.instructionsTitle}</h2>
      <textarea
        value={instructions}
        onChange={(e) => onInstructionsChange(e.target.value)}
        placeholder={translations.es_MX.instructionsPlaceholder}
        className="w-full h-24 p-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
        aria-label="Complementary instructions for the AI"
      />
    </div>
  );
};

export default InstructionsInput;
