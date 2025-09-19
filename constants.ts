import type { StyleOption, AspectRatioOption } from './types';
import { promptConfig } from './config/promptConfig';
import { translations } from './config/translations.ts';

export const DECORATION_STYLES: StyleOption[] = promptConfig.styles.map(style => ({
  name: style.name,
  imageUrl: `https://picsum.photos/seed/${style.name.toLowerCase().replace('-', '')}/200`,
}));


export const ASPECT_RATIOS: AspectRatioOption[] = [
  { label: translations.es_MX.aspectRatioSquare, value: '1:1' },
  { label: translations.es_MX.aspectRatioLandscape, value: '16:9' },
  { label: translations.es_MX.aspectRatioPortrait, value: '9:16' },
  { label: translations.es_MX.aspectRatioStandard, value: '4:3' },
  { label: translations.es_MX.aspectRatioClassic, value: '3:4' },
];
