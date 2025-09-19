
export interface StyleConfig {
  name: string;
  description: string;
}

export interface PromptConfig {
  basePrompt: string;
  styles: StyleConfig[];
}

export const promptConfig: PromptConfig = {
  basePrompt: "Redecorate this room in a beautiful and creative {styleDescription} style. The final image should have an aspect ratio of {aspectRatio}. Focus on creating a realistic and aesthetically pleasing result.",
  styles: [
    {
      name: "Modern",
      description: "a clean, crisp style with simple color palettes and materials like metal, glass, and steel"
    },
    {
      name: "Minimalist",
      description: "a style characterized by simplicity, clean lines, and a monochromatic palette with color used as an accent"
    },
    {
      name: "Bohemian",
      description: "a relaxed, and unusual style that often incorporates vintage furniture, globally-inspired textiles, and displays of collections"
    },
    {
      name: "Industrial",
      description: "a raw, unfinished look that celebrates utilitarian materials like exposed brick, concrete, and weathered wood"
    },
    {
      name: "Scandinavian",
      description: "a style focused on simplicity, minimalism, and functionality, using natural materials like wood and a light, neutral color palette"
    },
    {
      name: "Coastal",
      description: "a light, airy, and relaxing style inspired by the beach, featuring natural light, soft tones, and a clean aesthetic"
    },
    {
      name: "Farmhouse",
      description: "a rustic yet chic style that combines practicality with comfort, featuring natural textures and materials like wood and galvanized steel"
    },
    {
      name: "Mid-Century",
      description: "a style from the mid-20th century known for its clean lines, organic curves, and a mix of different, sometimes contrasting, materials"
    }
  ]
};
