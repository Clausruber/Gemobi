export interface StyleOption {
  name: string;
  imageUrl: string;
}

export type AspectRatio = '1:1' | '16:9' | '9:16' | '4:3' | '3:4';

export interface AspectRatioOption {
  label: string;
  value: AspectRatio;
}

export interface UploadedFile {
  base64: string;
  mimeType: string;
  name: string;
}

export interface HistoryItem {
  id: string;
  generatedImage: string;
  originalFile: UploadedFile;
  style: string;
  aspectRatio: AspectRatio;
  instructions?: string;
  timestamp: number;
}