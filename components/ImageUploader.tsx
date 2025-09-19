import React from 'react';
import type { UploadedFile } from '../types';
import UploadIcon from './icons/UploadIcon';
import { translations } from '../config/translations';

interface ImageUploaderProps {
  uploadedFile: UploadedFile | null;
  onFileSelect: (file: UploadedFile | null) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ uploadedFile, onFileSelect }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        onFileSelect({
          base64: base64String,
          mimeType: file.type,
          name: file.name
        });
      };
      reader.readAsDataURL(file);
    } else {
      onFileSelect(null);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-3">{translations.es_MX.uploadTitle}</h2>
      <label htmlFor="file-upload" className="cursor-pointer group">
        <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-500 transition-colors duration-300 bg-gray-100/50">
          {uploadedFile ? (
            <div>
              <img
                src={`data:${uploadedFile.mimeType};base64,${uploadedFile.base64}`}
                alt="Uploaded room"
                className="max-h-48 sm:max-h-60 mx-auto rounded-lg object-contain"
              />
              <p className="mt-4 text-gray-600 truncate">{uploadedFile.name}</p>
            </div>
          ) : (
            <div className="flex flex-col items-center text-gray-500">
              <UploadIcon className="w-12 h-12 text-gray-400 group-hover:text-indigo-500 transition-colors" />
              <p className="mt-2 font-semibold text-gray-700">
                {translations.es_MX.uploadCta}
              </p>
              <p className="text-sm">{translations.es_MX.uploadFormats}</p>
            </div>
          )}
        </div>
      </label>
      <input
        id="file-upload"
        type="file"
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ImageUploader;
