import { GoogleGenAI, Modality } from "@google/genai";
import type { AspectRatio } from '../types';
import { promptConfig } from '../config/promptConfig';
import { translations } from '../config/translations';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateDecoratedImage(
    base64ImageData: string,
    mimeType: string,
    styleName: string,
    aspectRatio: AspectRatio,
    instructions?: string
): Promise<string> {
    try {
        const style = promptConfig.styles.find(s => s.name === styleName);
        if (!style) {
            throw new Error(translations.es_MX.errorStyleNotFound(styleName));
        }

        let prompt = promptConfig.basePrompt
            .replace('{styleDescription}', style.description)
            .replace('{aspectRatio}', aspectRatio);

        if (instructions) {
            prompt += ` Follow these instructions carefully: ${instructions}.`;
        }

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image-preview',
            contents: {
                parts: [
                    {
                        inlineData: {
                            data: base64ImageData,
                            mimeType: mimeType,
                        },
                    },
                    {
                        text: prompt,
                    },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });

        if (response?.candidates?.[0]?.content?.parts) {
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    return part.inlineData.data;
                }
            }
        }
        
        throw new Error(translations.es_MX.errorNoImage);

    } catch (error) {
        console.error("Error generating decorated image:", error);
        if (error instanceof Error && (error.message.includes('style') || error.message.includes('IA'))) {
            throw error;
        }
        throw new Error(translations.es_MX.errorFailedGeneration);
    }
}
