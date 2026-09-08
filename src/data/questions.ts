export type CognitiveDomain = 'matrix_reasoning' | 'cube_rotation' | 'cube_nets' | 'topological_series';

export interface QuestionOption {
  id: number; // 1 to 6
  svgContent: string; // Clean, responsive SVG graphic string
  isCorrect: boolean;
  distractorType?: 'incomplete_rule' | 'rotation_error' | 'feature_attraction' | 'cancellation_error' | 'random';
}

export interface QuestionItem {
  id: number; // 1 to 24
  domain: CognitiveDomain;
  promptSvg: string;
  options: QuestionOption[]; // Exactly 6 choices
  a: number; // Discrimination parameter (0.8 to 2.2)
  b: number; // Difficulty parameter (-2.5 to +2.5)
  explanation: string;
}

export const QUESTION_ITEMS: QuestionItem[] = [
  {
    "id": 1,
    "domain": "matrix_reasoning",
    "promptSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 280 280\" class=\"w-full h-full max-w-[280px] mx-auto select-none\" fill=\"none\"><rect width=\"280\" height=\"280\" rx=\"12\" fill=\"#f4f4f5\" class=\"dark:fill-zinc-900\" stroke=\"#e4e4e7\" class=\"dark:stroke-zinc-800\" stroke-width=\"2\"/><line x1=\"93.3\" y1=\"0\" x2=\"93.3\" y2=\"280\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"2\"/><line x1=\"186.6\" y1=\"0\" x2=\"186.6\" y2=\"280\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"2\"/><line x1=\"0\" y1=\"93.3\" x2=\"280\" y2=\"93.3\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"2\"/><line x1=\"0\" y1=\"186.6\" x2=\"280\" y2=\"186.6\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"2\"/><g transform=\"translate(0,0)\"><g transform=\"translate(6.6,6.6)\"><rect x=\"18\" y=\"18\" width=\"44\" height=\"44\" rx=\"4\" fill=\"#93c5fd\" stroke=\"#1e3a8a\" stroke-width=\"2\"/></g></g><g transform=\"translate(93.3,0)\"><g transform=\"translate(6.6,6.6)\"><rect x=\"18\" y=\"18\" width=\"44\" height=\"44\" rx=\"4\" fill=\"#6366f1\" stroke=\"#312e81\" stroke-width=\"2\"/></g></g><g transform=\"translate(186.6,0)\"><g transform=\"translate(6.6,6.6)\"><rect x=\"18\" y=\"18\" width=\"44\" height=\"44\" rx=\"4\" fill=\"#a855f7\" stroke=\"#581c87\" stroke-width=\"2\"/></g></g><g transform=\"translate(0,93.3)\"><g transform=\"translate(6.6,6.6)\"><circle cx=\"40\" cy=\"40\" r=\"22\" fill=\"#93c5fd\" stroke=\"#1e3a8a\" stroke-width=\"2\"/></g></g><g transform=\"translate(93.3,93.3)\"><g transform=\"translate(6.6,6.6)\"><circle cx=\"40\" cy=\"40\" r=\"22\" fill=\"#6366f1\" stroke=\"#312e81\" stroke-width=\"2\"/></g></g><g transform=\"translate(186.6,93.3)\"><g transform=\"translate(6.6,6.6)\"><circle cx=\"40\" cy=\"40\" r=\"22\" fill=\"#a855f7\" stroke=\"#581c87\" stroke-width=\"2\"/></g></g><g transform=\"translate(0,186.6)\"><g transform=\"translate(6.6,6.6)\"><polygon points=\"40,16 64,64 16,64\" fill=\"#93c5fd\" stroke=\"#1e3a8a\" stroke-width=\"2\"/></g></g><g transform=\"translate(93.3,186.6)\"><g transform=\"translate(6.6,6.6)\"><polygon points=\"40,16 64,64 16,64\" fill=\"#6366f1\" stroke=\"#312e81\" stroke-width=\"2\"/></g></g><g transform=\"translate(186.6,186.6)\"><rect width=\"93.3\" height=\"93.3\" rx=\"8\" fill=\"#eff6ff\" class=\"dark:fill-blue-950/40\" stroke=\"#3b82f6\" stroke-width=\"2\" stroke-dasharray=\"4 3\"/><text x=\"46.6\" y=\"58\" font-family=\"sans-serif\" font-size=\"36\" font-weight=\"bold\" fill=\"#2563eb\" class=\"dark:fill-blue-400\" text-anchor=\"middle\">?</text></g></svg>",
    "options": [
      {
        "id": 1,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><polygon points=\"40,16 64,64 16,64\" fill=\"#a855f7\" stroke=\"#581c87\" stroke-width=\"2\"/></svg>",
        "isCorrect": true
      },
      {
        "id": 2,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><polygon points=\"40,16 64,64 16,64\" fill=\"#93c5fd\" stroke=\"#1e3a8a\" stroke-width=\"2\"/></svg>",
        "isCorrect": false,
        "distractorType": "incomplete_rule"
      },
      {
        "id": 3,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><circle cx=\"40\" cy=\"40\" r=\"22\" fill=\"#a855f7\" stroke=\"#581c87\" stroke-width=\"2\"/></svg>",
        "isCorrect": false,
        "distractorType": "feature_attraction"
      },
      {
        "id": 4,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><polygon points=\"40,64 64,16 16,16\" fill=\"#a855f7\" stroke=\"#581c87\" stroke-width=\"2\"/></svg>",
        "isCorrect": false,
        "distractorType": "rotation_error"
      },
      {
        "id": 5,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><rect x=\"18\" y=\"18\" width=\"44\" height=\"44\" rx=\"4\" fill=\"#a855f7\" stroke=\"#581c87\" stroke-width=\"2\"/></svg>",
        "isCorrect": false,
        "distractorType": "feature_attraction"
      },
      {
        "id": 6,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><polygon points=\"40,16 64,64 16,64\" fill=\"none\" stroke=\"#581c87\" stroke-width=\"2\"/></svg>",
        "isCorrect": false,
        "distractorType": "incomplete_rule"
      }
    ],
    "a": 0.95,
    "b": -2.2,
    "explanation": "Each row maintains a consistent shape (squares, circles, triangles) while each column shifts color from light blue to indigo to purple. The missing cell requires an upright triangle with purple fill."
  },
  {
    "id": 2,
    "domain": "topological_series",
    "promptSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 90\" class=\"w-full h-full max-w-[360px] mx-auto select-none\" fill=\"none\"><rect width=\"360\" height=\"90\" rx=\"12\" fill=\"#f4f4f5\" class=\"dark:fill-zinc-900\" stroke=\"#e4e4e7\" class=\"dark:stroke-zinc-800\" stroke-width=\"2\"/><rect x=\"15\" y=\"12.5\" width=\"65\" height=\"65\" rx=\"8\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"1.5\"/><g transform=\"translate(15,12.5)\"><rect x=\"10\" y=\"10\" width=\"45\" height=\"45\" rx=\"6\" fill=\"#f4f4f5\" class=\"dark:fill-zinc-900\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"1.5\"/><circle cx=\"20\" cy=\"20\" r=\"4.5\" fill=\"#2563eb\"/><circle cx=\"32.5\" cy=\"20\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"45\" cy=\"20\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"20\" cy=\"32.5\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"32.5\" cy=\"32.5\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"45\" cy=\"32.5\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"20\" cy=\"45\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"32.5\" cy=\"45\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"45\" cy=\"45\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/></g><path d=\"M87 45 L93 45 M90 42 L93 45 L90 48\" stroke=\"#a1a1aa\" stroke-width=\"1.5\" stroke-linecap=\"round\"/><rect x=\"95\" y=\"12.5\" width=\"65\" height=\"65\" rx=\"8\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"1.5\"/><g transform=\"translate(95,12.5)\"><rect x=\"10\" y=\"10\" width=\"45\" height=\"45\" rx=\"6\" fill=\"#f4f4f5\" class=\"dark:fill-zinc-900\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"1.5\"/><circle cx=\"20\" cy=\"20\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"32.5\" cy=\"20\" r=\"4.5\" fill=\"#2563eb\"/><circle cx=\"45\" cy=\"20\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"20\" cy=\"32.5\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"32.5\" cy=\"32.5\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"45\" cy=\"32.5\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"20\" cy=\"45\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"32.5\" cy=\"45\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"45\" cy=\"45\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/></g><path d=\"M167 45 L173 45 M170 42 L173 45 L170 48\" stroke=\"#a1a1aa\" stroke-width=\"1.5\" stroke-linecap=\"round\"/><rect x=\"175\" y=\"12.5\" width=\"65\" height=\"65\" rx=\"8\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"1.5\"/><g transform=\"translate(175,12.5)\"><rect x=\"10\" y=\"10\" width=\"45\" height=\"45\" rx=\"6\" fill=\"#f4f4f5\" class=\"dark:fill-zinc-900\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"1.5\"/><circle cx=\"20\" cy=\"20\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"32.5\" cy=\"20\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"45\" cy=\"20\" r=\"4.5\" fill=\"#2563eb\"/><circle cx=\"20\" cy=\"32.5\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"32.5\" cy=\"32.5\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"45\" cy=\"32.5\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"20\" cy=\"45\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"32.5\" cy=\"45\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"45\" cy=\"45\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/></g><path d=\"M247 45 L253 45 M250 42 L253 45 L250 48\" stroke=\"#a1a1aa\" stroke-width=\"1.5\" stroke-linecap=\"round\"/><rect x=\"255\" y=\"12.5\" width=\"65\" height=\"65\" rx=\"8\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"1.5\"/><g transform=\"translate(255,12.5)\"><rect x=\"10\" y=\"10\" width=\"45\" height=\"45\" rx=\"6\" fill=\"#f4f4f5\" class=\"dark:fill-zinc-900\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"1.5\"/><circle cx=\"20\" cy=\"20\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"32.5\" cy=\"20\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"45\" cy=\"20\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"20\" cy=\"32.5\" r=\"4.5\" fill=\"#2563eb\"/><circle cx=\"32.5\" cy=\"32.5\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"45\" cy=\"32.5\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"20\" cy=\"45\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"32.5\" cy=\"45\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"45\" cy=\"45\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/></g><g transform=\"translate(255,12.5)\"><rect width=\"65\" height=\"65\" rx=\"8\" fill=\"#eff6ff\" class=\"dark:fill-blue-950/40\" stroke=\"#3b82f6\" stroke-width=\"2\" stroke-dasharray=\"4 3\"/><text x=\"32.5\" y=\"44\" font-family=\"sans-serif\" font-size=\"28\" font-weight=\"bold\" fill=\"#2563eb\" class=\"dark:fill-blue-400\" text-anchor=\"middle\">?</text></g></svg>",
    "options": [
      {
        "id": 1,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(7.5,7.5)\"><rect x=\"10\" y=\"10\" width=\"45\" height=\"45\" rx=\"6\" fill=\"#f4f4f5\" class=\"dark:fill-zinc-900\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"1.5\"/><circle cx=\"20\" cy=\"20\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"32.5\" cy=\"20\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"45\" cy=\"20\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"20\" cy=\"32.5\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"32.5\" cy=\"32.5\" r=\"4.5\" fill=\"#2563eb\"/><circle cx=\"45\" cy=\"32.5\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"20\" cy=\"45\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"32.5\" cy=\"45\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"45\" cy=\"45\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/></g></svg>",
        "isCorrect": true
      },
      {
        "id": 2,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(7.5,7.5)\"><rect x=\"10\" y=\"10\" width=\"45\" height=\"45\" rx=\"6\" fill=\"#f4f4f5\" class=\"dark:fill-zinc-900\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"1.5\"/><circle cx=\"20\" cy=\"20\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"32.5\" cy=\"20\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"45\" cy=\"20\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"20\" cy=\"32.5\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"32.5\" cy=\"32.5\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"45\" cy=\"32.5\" r=\"4.5\" fill=\"#2563eb\"/><circle cx=\"20\" cy=\"45\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"32.5\" cy=\"45\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"45\" cy=\"45\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/></g></svg>",
        "isCorrect": false,
        "distractorType": "rotation_error"
      },
      {
        "id": 3,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(7.5,7.5)\"><rect x=\"10\" y=\"10\" width=\"45\" height=\"45\" rx=\"6\" fill=\"#f4f4f5\" class=\"dark:fill-zinc-900\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"1.5\"/><circle cx=\"20\" cy=\"20\" r=\"4.5\" fill=\"#2563eb\"/><circle cx=\"32.5\" cy=\"20\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"45\" cy=\"20\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"20\" cy=\"32.5\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"32.5\" cy=\"32.5\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"45\" cy=\"32.5\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"20\" cy=\"45\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"32.5\" cy=\"45\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"45\" cy=\"45\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/></g></svg>",
        "isCorrect": false,
        "distractorType": "feature_attraction"
      },
      {
        "id": 4,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(7.5,7.5)\"><rect x=\"10\" y=\"10\" width=\"45\" height=\"45\" rx=\"6\" fill=\"#f4f4f5\" class=\"dark:fill-zinc-900\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"1.5\"/><circle cx=\"20\" cy=\"20\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"32.5\" cy=\"20\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"45\" cy=\"20\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"20\" cy=\"32.5\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"32.5\" cy=\"32.5\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"45\" cy=\"32.5\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"20\" cy=\"45\" r=\"4.5\" fill=\"#2563eb\"/><circle cx=\"32.5\" cy=\"45\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"45\" cy=\"45\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/></g></svg>",
        "isCorrect": false,
        "distractorType": "incomplete_rule"
      },
      {
        "id": 5,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(7.5,7.5)\"><rect x=\"10\" y=\"10\" width=\"45\" height=\"45\" rx=\"6\" fill=\"#f4f4f5\" class=\"dark:fill-zinc-900\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"1.5\"/><circle cx=\"20\" cy=\"20\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"32.5\" cy=\"20\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"45\" cy=\"20\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"20\" cy=\"32.5\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"32.5\" cy=\"32.5\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"45\" cy=\"32.5\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"20\" cy=\"45\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"32.5\" cy=\"45\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"45\" cy=\"45\" r=\"4.5\" fill=\"#2563eb\"/></g></svg>",
        "isCorrect": false,
        "distractorType": "random"
      },
      {
        "id": 6,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(7.5,7.5)\"><rect x=\"10\" y=\"10\" width=\"45\" height=\"45\" rx=\"6\" fill=\"#f4f4f5\" class=\"dark:fill-zinc-900\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"1.5\"/><circle cx=\"20\" cy=\"20\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"32.5\" cy=\"20\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"45\" cy=\"20\" r=\"4.5\" fill=\"#2563eb\"/><circle cx=\"20\" cy=\"32.5\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"32.5\" cy=\"32.5\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"45\" cy=\"32.5\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"20\" cy=\"45\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"32.5\" cy=\"45\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/><circle cx=\"45\" cy=\"45\" r=\"2\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-700\"/></g></svg>",
        "isCorrect": false,
        "distractorType": "feature_attraction"
      }
    ],
    "a": 1.05,
    "b": -1.9,
    "explanation": "The active indicator traverses the 3x3 grid horizontally row by row. Following top-right to middle-left, the next step occupies the middle-center position."
  },
  {
    "id": 3,
    "domain": "matrix_reasoning",
    "promptSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 280 280\" class=\"w-full h-full max-w-[280px] mx-auto select-none\" fill=\"none\"><rect width=\"280\" height=\"280\" rx=\"12\" fill=\"#f4f4f5\" class=\"dark:fill-zinc-900\" stroke=\"#e4e4e7\" class=\"dark:stroke-zinc-800\" stroke-width=\"2\"/><line x1=\"93.3\" y1=\"0\" x2=\"93.3\" y2=\"280\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"2\"/><line x1=\"186.6\" y1=\"0\" x2=\"186.6\" y2=\"280\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"2\"/><line x1=\"0\" y1=\"93.3\" x2=\"280\" y2=\"93.3\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"2\"/><line x1=\"0\" y1=\"186.6\" x2=\"280\" y2=\"186.6\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"2\"/><g transform=\"translate(0,0)\"><g transform=\"translate(6.6,6.6)\"><line x1=\"40.0\" y1=\"18\" x2=\"40.0\" y2=\"62\" stroke=\"#2563eb\" stroke-width=\"4\" stroke-linecap=\"round\"/></g></g><g transform=\"translate(93.3,0)\"><g transform=\"translate(6.6,6.6)\"><line x1=\"30.0\" y1=\"18\" x2=\"30.0\" y2=\"62\" stroke=\"#2563eb\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"50.0\" y1=\"18\" x2=\"50.0\" y2=\"62\" stroke=\"#2563eb\" stroke-width=\"4\" stroke-linecap=\"round\"/></g></g><g transform=\"translate(186.6,0)\"><g transform=\"translate(6.6,6.6)\"><line x1=\"25.0\" y1=\"18\" x2=\"25.0\" y2=\"62\" stroke=\"#2563eb\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"40.0\" y1=\"18\" x2=\"40.0\" y2=\"62\" stroke=\"#2563eb\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"55.0\" y1=\"18\" x2=\"55.0\" y2=\"62\" stroke=\"#2563eb\" stroke-width=\"4\" stroke-linecap=\"round\"/></g></g><g transform=\"translate(0,93.3)\"><g transform=\"translate(6.6,6.6)\"><circle cx=\"30.0\" cy=\"40\" r=\"6\" fill=\"#6366f1\"/><circle cx=\"50.0\" cy=\"40\" r=\"6\" fill=\"#6366f1\"/></g></g><g transform=\"translate(93.3,93.3)\"><g transform=\"translate(6.6,6.6)\"><circle cx=\"25.0\" cy=\"40\" r=\"6\" fill=\"#6366f1\"/><circle cx=\"40.0\" cy=\"40\" r=\"6\" fill=\"#6366f1\"/><circle cx=\"55.0\" cy=\"40\" r=\"6\" fill=\"#6366f1\"/></g></g><g transform=\"translate(186.6,93.3)\"><g transform=\"translate(6.6,6.6)\"><circle cx=\"22.0\" cy=\"40\" r=\"6\" fill=\"#6366f1\"/><circle cx=\"34.0\" cy=\"40\" r=\"6\" fill=\"#6366f1\"/><circle cx=\"46.0\" cy=\"40\" r=\"6\" fill=\"#6366f1\"/><circle cx=\"58.0\" cy=\"40\" r=\"6\" fill=\"#6366f1\"/></g></g><g transform=\"translate(0,186.6)\"><g transform=\"translate(6.6,6.6)\"><polygon points=\"23.75,34 28.75,40 23.75,46 18.75,40\" fill=\"#a855f7\"/><polygon points=\"40.0,34 45.0,40 40.0,46 35.0,40\" fill=\"#a855f7\"/><polygon points=\"56.25,34 61.25,40 56.25,46 51.25,40\" fill=\"#a855f7\"/></g></g><g transform=\"translate(93.3,186.6)\"><g transform=\"translate(6.6,6.6)\"><polygon points=\"20.5,34 25.5,40 20.5,46 15.5,40\" fill=\"#a855f7\"/><polygon points=\"33.5,34 38.5,40 33.5,46 28.5,40\" fill=\"#a855f7\"/><polygon points=\"46.5,34 51.5,40 46.5,46 41.5,40\" fill=\"#a855f7\"/><polygon points=\"59.5,34 64.5,40 59.5,46 54.5,40\" fill=\"#a855f7\"/></g></g><g transform=\"translate(186.6,186.6)\"><rect width=\"93.3\" height=\"93.3\" rx=\"8\" fill=\"#eff6ff\" class=\"dark:fill-blue-950/40\" stroke=\"#3b82f6\" stroke-width=\"2\" stroke-dasharray=\"4 3\"/><text x=\"46.6\" y=\"58\" font-family=\"sans-serif\" font-size=\"36\" font-weight=\"bold\" fill=\"#2563eb\" class=\"dark:fill-blue-400\" text-anchor=\"middle\">?</text></g></svg>",
    "options": [
      {
        "id": 1,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><polygon points=\"18.333333333333336,34 23.333333333333336,40 18.333333333333336,46 13.333333333333336,40\" fill=\"#a855f7\"/><polygon points=\"29.166666666666668,34 34.16666666666667,40 29.166666666666668,46 24.166666666666668,40\" fill=\"#a855f7\"/><polygon points=\"40.0,34 45.0,40 40.0,46 35.0,40\" fill=\"#a855f7\"/><polygon points=\"50.833333333333336,34 55.833333333333336,40 50.833333333333336,46 45.833333333333336,40\" fill=\"#a855f7\"/><polygon points=\"61.66666666666667,34 66.66666666666667,40 61.66666666666667,46 56.66666666666667,40\" fill=\"#a855f7\"/></svg>",
        "isCorrect": true
      },
      {
        "id": 2,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><polygon points=\"20.5,34 25.5,40 20.5,46 15.5,40\" fill=\"#a855f7\"/><polygon points=\"33.5,34 38.5,40 33.5,46 28.5,40\" fill=\"#a855f7\"/><polygon points=\"46.5,34 51.5,40 46.5,46 41.5,40\" fill=\"#a855f7\"/><polygon points=\"59.5,34 64.5,40 59.5,46 54.5,40\" fill=\"#a855f7\"/></svg>",
        "isCorrect": false,
        "distractorType": "incomplete_rule"
      },
      {
        "id": 3,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><polygon points=\"16.785714285714285,34 21.785714285714285,40 16.785714285714285,46 11.785714285714285,40\" fill=\"#a855f7\"/><polygon points=\"26.071428571428573,34 31.071428571428573,40 26.071428571428573,46 21.071428571428573,40\" fill=\"#a855f7\"/><polygon points=\"35.35714285714286,34 40.35714285714286,40 35.35714285714286,46 30.35714285714286,40\" fill=\"#a855f7\"/><polygon points=\"44.642857142857146,34 49.642857142857146,40 44.642857142857146,46 39.642857142857146,40\" fill=\"#a855f7\"/><polygon points=\"53.92857142857143,34 58.92857142857143,40 53.92857142857143,46 48.92857142857143,40\" fill=\"#a855f7\"/><polygon points=\"63.21428571428572,34 68.21428571428572,40 63.21428571428572,46 58.21428571428572,40\" fill=\"#a855f7\"/></svg>",
        "isCorrect": false,
        "distractorType": "incomplete_rule"
      },
      {
        "id": 4,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><circle cx=\"20.0\" cy=\"40\" r=\"6\" fill=\"#6366f1\"/><circle cx=\"30.0\" cy=\"40\" r=\"6\" fill=\"#6366f1\"/><circle cx=\"40.0\" cy=\"40\" r=\"6\" fill=\"#6366f1\"/><circle cx=\"50.0\" cy=\"40\" r=\"6\" fill=\"#6366f1\"/><circle cx=\"60.0\" cy=\"40\" r=\"6\" fill=\"#6366f1\"/></svg>",
        "isCorrect": false,
        "distractorType": "feature_attraction"
      },
      {
        "id": 5,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><line x1=\"20.0\" y1=\"18\" x2=\"20.0\" y2=\"62\" stroke=\"#2563eb\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"30.0\" y1=\"18\" x2=\"30.0\" y2=\"62\" stroke=\"#2563eb\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"40.0\" y1=\"18\" x2=\"40.0\" y2=\"62\" stroke=\"#2563eb\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"50.0\" y1=\"18\" x2=\"50.0\" y2=\"62\" stroke=\"#2563eb\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"60.0\" y1=\"18\" x2=\"60.0\" y2=\"62\" stroke=\"#2563eb\" stroke-width=\"4\" stroke-linecap=\"round\"/></svg>",
        "isCorrect": false,
        "distractorType": "feature_attraction"
      },
      {
        "id": 6,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><polygon points=\"29.166666666666668,34 34.16666666666667,40 29.166666666666668,46 24.166666666666668,40\" fill=\"#a855f7\"/><polygon points=\"50.833333333333336,34 55.833333333333336,40 50.833333333333336,46 45.833333333333336,40\" fill=\"#a855f7\"/></svg>",
        "isCorrect": false,
        "distractorType": "random"
      }
    ],
    "a": 1.1,
    "b": -1.6,
    "explanation": "Across each row, element count increases by exactly one (+1). The third row begins with 3 and 4 diamonds, so the missing final cell must contain exactly 5 diamonds."
  },
  {
    "id": 4,
    "domain": "cube_rotation",
    "promptSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><circle cx=\"0\" cy=\"0\" r=\"8\" fill=\"#2563eb\"/></g><g transform=\"translate(50,81.5)\"><path d=\"M-8 0 L8 0 M0 -8 L0 8\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"3\" stroke-linecap=\"round\"/></g><g transform=\"translate(90,81.5)\"><rect x=\"-7\" y=\"-7\" width=\"14\" height=\"14\" fill=\"#a855f7\"/></g></svg>",
    "options": [
      {
        "id": 1,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(-30,-30) scale(0.6)\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><circle cx=\"0\" cy=\"0\" r=\"8\" fill=\"#2563eb\"/></g><g transform=\"translate(50,81.5)\"><rect x=\"-7\" y=\"-7\" width=\"14\" height=\"14\" fill=\"#a855f7\"/></g><g transform=\"translate(90,81.5)\"><polygon points=\"0,-8 8,8 -8,8\" fill=\"#10b981\"/></g></svg></g></svg>",
        "isCorrect": true
      },
      {
        "id": 2,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(-30,-30) scale(0.6)\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><circle cx=\"0\" cy=\"0\" r=\"8\" fill=\"#2563eb\"/></g><g transform=\"translate(50,81.5)\"><polygon points=\"0,-8 8,8 -8,8\" fill=\"#10b981\"/></g><g transform=\"translate(90,81.5)\"><rect x=\"-7\" y=\"-7\" width=\"14\" height=\"14\" fill=\"#a855f7\"/></g></svg></g></svg>",
        "isCorrect": false,
        "distractorType": "rotation_error"
      },
      {
        "id": 3,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(-30,-30) scale(0.6)\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><rect x=\"-7\" y=\"-7\" width=\"14\" height=\"14\" fill=\"#a855f7\"/></g><g transform=\"translate(50,81.5)\"><path d=\"M-8 0 L8 0 M0 -8 L0 8\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"3\" stroke-linecap=\"round\"/></g><g transform=\"translate(90,81.5)\"><circle cx=\"0\" cy=\"0\" r=\"8\" fill=\"#2563eb\"/></g></svg></g></svg>",
        "isCorrect": false,
        "distractorType": "incomplete_rule"
      },
      {
        "id": 4,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(-30,-30) scale(0.6)\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><circle cx=\"0\" cy=\"0\" r=\"8\" fill=\"#2563eb\"/></g><g transform=\"translate(50,81.5)\"><path d=\"M-8 0 L8 0 M0 -8 L0 8\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"3\" stroke-linecap=\"round\"/></g><g transform=\"translate(90,81.5)\"><rect x=\"-7\" y=\"-7\" width=\"14\" height=\"14\" fill=\"#a855f7\"/></g></svg></g></svg>",
        "isCorrect": false,
        "distractorType": "feature_attraction"
      },
      {
        "id": 5,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(-30,-30) scale(0.6)\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><polygon points=\"0,-8 8,8 -8,8\" fill=\"#10b981\"/></g><g transform=\"translate(50,81.5)\"><circle cx=\"0\" cy=\"0\" r=\"8\" fill=\"#2563eb\"/></g><g transform=\"translate(90,81.5)\"><path d=\"M-8 0 L8 0 M0 -8 L0 8\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"3\" stroke-linecap=\"round\"/></g></svg></g></svg>",
        "isCorrect": false,
        "distractorType": "random"
      },
      {
        "id": 6,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(-30,-30) scale(0.6)\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><polygon points=\"0,-8 2,-2 8,-2 3,2 5,8 0,4 -5,8 -3,2 -8,-2 -2,-2\" fill=\"#f59e0b\"/></g><g transform=\"translate(50,81.5)\"><rect x=\"-7\" y=\"-7\" width=\"14\" height=\"14\" fill=\"#a855f7\"/></g><g transform=\"translate(90,81.5)\"><polygon points=\"0,-8 8,8 -8,8\" fill=\"#10b981\"/></g></svg></g></svg>",
        "isCorrect": false,
        "distractorType": "rotation_error"
      }
    ],
    "a": 1.15,
    "b": -1.3,
    "explanation": "Rotating the cube 90 degrees clockwise around its vertical Y-axis keeps the circle on the top face while rotating the square face into front view, revealing a new adjacent face on the right."
  },
  {
    "id": 5,
    "domain": "matrix_reasoning",
    "promptSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 280 280\" class=\"w-full h-full max-w-[280px] mx-auto select-none\" fill=\"none\"><rect width=\"280\" height=\"280\" rx=\"12\" fill=\"#f4f4f5\" class=\"dark:fill-zinc-900\" stroke=\"#e4e4e7\" class=\"dark:stroke-zinc-800\" stroke-width=\"2\"/><line x1=\"93.3\" y1=\"0\" x2=\"93.3\" y2=\"280\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"2\"/><line x1=\"186.6\" y1=\"0\" x2=\"186.6\" y2=\"280\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"2\"/><line x1=\"0\" y1=\"93.3\" x2=\"280\" y2=\"93.3\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"2\"/><line x1=\"0\" y1=\"186.6\" x2=\"280\" y2=\"186.6\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"2\"/><g transform=\"translate(0,0)\"><g transform=\"translate(6.6,6.6)\"><circle cx=\"40\" cy=\"40\" r=\"22\" stroke=\"#2563eb\" stroke-width=\"3\"/><circle cx=\"40\" cy=\"40\" r=\"6\" fill=\"#2563eb\"/></g></g><g transform=\"translate(93.3,0)\"><g transform=\"translate(6.6,6.6)\"><rect x=\"18\" y=\"18\" width=\"44\" height=\"44\" rx=\"4\" stroke=\"#6366f1\" stroke-width=\"3\"/><circle cx=\"40\" cy=\"40\" r=\"6\" fill=\"#6366f1\"/></g></g><g transform=\"translate(186.6,0)\"><g transform=\"translate(6.6,6.6)\"><polygon points=\"40,14 66,40 40,66 14,40\" stroke=\"#a855f7\" stroke-width=\"3\"/><circle cx=\"40\" cy=\"40\" r=\"6\" fill=\"#a855f7\"/></g></g><g transform=\"translate(0,93.3)\"><g transform=\"translate(6.6,6.6)\"><rect x=\"18\" y=\"18\" width=\"44\" height=\"44\" rx=\"4\" stroke=\"#6366f1\" stroke-width=\"3\"/><circle cx=\"40\" cy=\"40\" r=\"6\" fill=\"#6366f1\"/></g></g><g transform=\"translate(93.3,93.3)\"><g transform=\"translate(6.6,6.6)\"><polygon points=\"40,14 66,40 40,66 14,40\" stroke=\"#a855f7\" stroke-width=\"3\"/><circle cx=\"40\" cy=\"40\" r=\"6\" fill=\"#a855f7\"/></g></g><g transform=\"translate(186.6,93.3)\"><g transform=\"translate(6.6,6.6)\"><circle cx=\"40\" cy=\"40\" r=\"22\" stroke=\"#2563eb\" stroke-width=\"3\"/><circle cx=\"40\" cy=\"40\" r=\"6\" fill=\"#2563eb\"/></g></g><g transform=\"translate(0,186.6)\"><g transform=\"translate(6.6,6.6)\"><polygon points=\"40,14 66,40 40,66 14,40\" stroke=\"#a855f7\" stroke-width=\"3\"/><circle cx=\"40\" cy=\"40\" r=\"6\" fill=\"#a855f7\"/></g></g><g transform=\"translate(93.3,186.6)\"><g transform=\"translate(6.6,6.6)\"><circle cx=\"40\" cy=\"40\" r=\"22\" stroke=\"#2563eb\" stroke-width=\"3\"/><circle cx=\"40\" cy=\"40\" r=\"6\" fill=\"#2563eb\"/></g></g><g transform=\"translate(186.6,186.6)\"><rect width=\"93.3\" height=\"93.3\" rx=\"8\" fill=\"#eff6ff\" class=\"dark:fill-blue-950/40\" stroke=\"#3b82f6\" stroke-width=\"2\" stroke-dasharray=\"4 3\"/><text x=\"46.6\" y=\"58\" font-family=\"sans-serif\" font-size=\"36\" font-weight=\"bold\" fill=\"#2563eb\" class=\"dark:fill-blue-400\" text-anchor=\"middle\">?</text></g></svg>",
    "options": [
      {
        "id": 1,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><rect x=\"18\" y=\"18\" width=\"44\" height=\"44\" rx=\"4\" stroke=\"#6366f1\" stroke-width=\"3\"/><circle cx=\"40\" cy=\"40\" r=\"6\" fill=\"#6366f1\"/></svg>",
        "isCorrect": true
      },
      {
        "id": 2,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><circle cx=\"40\" cy=\"40\" r=\"22\" stroke=\"#2563eb\" stroke-width=\"3\"/><circle cx=\"40\" cy=\"40\" r=\"6\" fill=\"#2563eb\"/></svg>",
        "isCorrect": false,
        "distractorType": "feature_attraction"
      },
      {
        "id": 3,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><polygon points=\"40,14 66,40 40,66 14,40\" stroke=\"#a855f7\" stroke-width=\"3\"/><circle cx=\"40\" cy=\"40\" r=\"6\" fill=\"#a855f7\"/></svg>",
        "isCorrect": false,
        "distractorType": "feature_attraction"
      },
      {
        "id": 4,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><rect x=\"18\" y=\"18\" width=\"44\" height=\"44\" rx=\"4\" stroke=\"#6366f1\" stroke-width=\"3\"/></svg>",
        "isCorrect": false,
        "distractorType": "incomplete_rule"
      },
      {
        "id": 5,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><polygon points=\"40,16 64,64 16,64\" stroke=\"#10b981\" stroke-width=\"3\"/><circle cx=\"40\" cy=\"48\" r=\"6\" fill=\"#10b981\"/></svg>",
        "isCorrect": false,
        "distractorType": "random"
      },
      {
        "id": 6,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><circle cx=\"40\" cy=\"40\" r=\"14\" fill=\"#2563eb\"/></svg>",
        "isCorrect": false,
        "distractorType": "feature_attraction"
      }
    ],
    "a": 1.2,
    "b": -1.0,
    "explanation": "Every row and column follows a Latin square distribution containing exactly one circle, one square, and one diamond. The missing cell requires a square containing a central dot."
  },
  {
    "id": 6,
    "domain": "topological_series",
    "promptSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 90\" class=\"w-full h-full max-w-[360px] mx-auto select-none\" fill=\"none\"><rect width=\"360\" height=\"90\" rx=\"12\" fill=\"#f4f4f5\" class=\"dark:fill-zinc-900\" stroke=\"#e4e4e7\" class=\"dark:stroke-zinc-800\" stroke-width=\"2\"/><rect x=\"15\" y=\"12.5\" width=\"65\" height=\"65\" rx=\"8\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"1.5\"/><g transform=\"translate(15,12.5)\"><polygon points=\"32.5,14 52,50 13,50\" fill=\"#2563eb\"/></g><path d=\"M87 45 L93 45 M90 42 L93 45 L90 48\" stroke=\"#a1a1aa\" stroke-width=\"1.5\" stroke-linecap=\"round\"/><rect x=\"95\" y=\"12.5\" width=\"65\" height=\"65\" rx=\"8\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"1.5\"/><g transform=\"translate(95,12.5)\"><polygon points=\"32.5,41 44,23 21,23\" fill=\"#a855f7\"/></g><path d=\"M167 45 L173 45 M170 42 L173 45 L170 48\" stroke=\"#a1a1aa\" stroke-width=\"1.5\" stroke-linecap=\"round\"/><rect x=\"175\" y=\"12.5\" width=\"65\" height=\"65\" rx=\"8\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"1.5\"/><g transform=\"translate(175,12.5)\"><polygon points=\"32.5,14 52,50 13,50\" fill=\"#2563eb\"/></g><path d=\"M247 45 L253 45 M250 42 L253 45 L250 48\" stroke=\"#a1a1aa\" stroke-width=\"1.5\" stroke-linecap=\"round\"/><rect x=\"255\" y=\"12.5\" width=\"65\" height=\"65\" rx=\"8\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"1.5\"/><g transform=\"translate(255,12.5)\"><polygon points=\"32.5,41 44,23 21,23\" fill=\"#a855f7\"/></g><g transform=\"translate(255,12.5)\"><rect width=\"65\" height=\"65\" rx=\"8\" fill=\"#eff6ff\" class=\"dark:fill-blue-950/40\" stroke=\"#3b82f6\" stroke-width=\"2\" stroke-dasharray=\"4 3\"/><text x=\"32.5\" y=\"44\" font-family=\"sans-serif\" font-size=\"28\" font-weight=\"bold\" fill=\"#2563eb\" class=\"dark:fill-blue-400\" text-anchor=\"middle\">?</text></g></svg>",
    "options": [
      {
        "id": 1,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(7.5,7.5)\"><polygon points=\"32.5,14 52,50 13,50\" fill=\"#2563eb\"/></g></svg>",
        "isCorrect": true
      },
      {
        "id": 2,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(7.5,7.5)\"><polygon points=\"32.5,23 44,41 21,41\" fill=\"#2563eb\"/></g></svg>",
        "isCorrect": false,
        "distractorType": "incomplete_rule"
      },
      {
        "id": 3,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(7.5,7.5)\"><polygon points=\"32.5,50 52,14 13,14\" fill=\"#a855f7\"/></g></svg>",
        "isCorrect": false,
        "distractorType": "rotation_error"
      },
      {
        "id": 4,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(7.5,7.5)\"><polygon points=\"32.5,41 44,23 21,23\" fill=\"#a855f7\"/></g></svg>",
        "isCorrect": false,
        "distractorType": "feature_attraction"
      },
      {
        "id": 5,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><rect x=\"22\" y=\"22\" width=\"36\" height=\"36\" fill=\"#2563eb\"/></svg>",
        "isCorrect": false,
        "distractorType": "random"
      },
      {
        "id": 6,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><circle cx=\"40\" cy=\"40\" r=\"18\" fill=\"#a855f7\"/></svg>",
        "isCorrect": false,
        "distractorType": "random"
      }
    ],
    "a": 1.25,
    "b": -0.8,
    "explanation": "The pattern alternates both size (large, small) and vertical orientation (upward, downward). The fifth element returns to a large upward-pointing triangle."
  },
  {
    "id": 7,
    "domain": "matrix_reasoning",
    "promptSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 280 280\" class=\"w-full h-full max-w-[280px] mx-auto select-none\" fill=\"none\"><rect width=\"280\" height=\"280\" rx=\"12\" fill=\"#f4f4f5\" class=\"dark:fill-zinc-900\" stroke=\"#e4e4e7\" class=\"dark:stroke-zinc-800\" stroke-width=\"2\"/><line x1=\"93.3\" y1=\"0\" x2=\"93.3\" y2=\"280\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"2\"/><line x1=\"186.6\" y1=\"0\" x2=\"186.6\" y2=\"280\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"2\"/><line x1=\"0\" y1=\"93.3\" x2=\"280\" y2=\"93.3\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"2\"/><line x1=\"0\" y1=\"186.6\" x2=\"280\" y2=\"186.6\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"2\"/><g transform=\"translate(0,0)\"><g transform=\"translate(6.6,6.6)\"><line x1=\"40\" y1=\"40\" x2=\"66.0\" y2=\"40.0\" stroke=\"#2563eb\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"27.0\" y2=\"62.5\" stroke=\"#2563eb\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"27.0\" y2=\"17.5\" stroke=\"#2563eb\" stroke-width=\"3\" stroke-linecap=\"round\"/><circle cx=\"40\" cy=\"40\" r=\"8\" fill=\"#2563eb\"/></g></g><g transform=\"translate(93.3,0)\"><g transform=\"translate(6.6,6.6)\"><line x1=\"40\" y1=\"40\" x2=\"66.0\" y2=\"40.0\" stroke=\"#6366f1\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"40.0\" y2=\"66.0\" stroke=\"#6366f1\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"14.0\" y2=\"40.0\" stroke=\"#6366f1\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"40.0\" y2=\"14.0\" stroke=\"#6366f1\" stroke-width=\"3\" stroke-linecap=\"round\"/><circle cx=\"40\" cy=\"40\" r=\"8\" fill=\"#6366f1\"/></g></g><g transform=\"translate(186.6,0)\"><g transform=\"translate(6.6,6.6)\"><line x1=\"40\" y1=\"40\" x2=\"66.0\" y2=\"40.0\" stroke=\"#a855f7\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"48.0\" y2=\"64.7\" stroke=\"#a855f7\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"19.0\" y2=\"55.3\" stroke=\"#a855f7\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"19.0\" y2=\"24.7\" stroke=\"#a855f7\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"48.0\" y2=\"15.3\" stroke=\"#a855f7\" stroke-width=\"3\" stroke-linecap=\"round\"/><circle cx=\"40\" cy=\"40\" r=\"8\" fill=\"#a855f7\"/></g></g><g transform=\"translate(0,93.3)\"><g transform=\"translate(6.6,6.6)\"><line x1=\"40\" y1=\"40\" x2=\"66.0\" y2=\"40.0\" stroke=\"#6366f1\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"40.0\" y2=\"66.0\" stroke=\"#6366f1\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"14.0\" y2=\"40.0\" stroke=\"#6366f1\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"40.0\" y2=\"14.0\" stroke=\"#6366f1\" stroke-width=\"3\" stroke-linecap=\"round\"/><circle cx=\"40\" cy=\"40\" r=\"8\" fill=\"#6366f1\"/></g></g><g transform=\"translate(93.3,93.3)\"><g transform=\"translate(6.6,6.6)\"><line x1=\"40\" y1=\"40\" x2=\"66.0\" y2=\"40.0\" stroke=\"#a855f7\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"48.0\" y2=\"64.7\" stroke=\"#a855f7\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"19.0\" y2=\"55.3\" stroke=\"#a855f7\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"19.0\" y2=\"24.7\" stroke=\"#a855f7\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"48.0\" y2=\"15.3\" stroke=\"#a855f7\" stroke-width=\"3\" stroke-linecap=\"round\"/><circle cx=\"40\" cy=\"40\" r=\"8\" fill=\"#a855f7\"/></g></g><g transform=\"translate(186.6,93.3)\"><g transform=\"translate(6.6,6.6)\"><line x1=\"40\" y1=\"40\" x2=\"66.0\" y2=\"40.0\" stroke=\"#2563eb\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"53.0\" y2=\"62.5\" stroke=\"#2563eb\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"27.0\" y2=\"62.5\" stroke=\"#2563eb\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"14.0\" y2=\"40.0\" stroke=\"#2563eb\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"27.0\" y2=\"17.5\" stroke=\"#2563eb\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"53.0\" y2=\"17.5\" stroke=\"#2563eb\" stroke-width=\"3\" stroke-linecap=\"round\"/><circle cx=\"40\" cy=\"40\" r=\"8\" fill=\"#2563eb\"/></g></g><g transform=\"translate(0,186.6)\"><g transform=\"translate(6.6,6.6)\"><line x1=\"40\" y1=\"40\" x2=\"66.0\" y2=\"40.0\" stroke=\"#a855f7\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"48.0\" y2=\"64.7\" stroke=\"#a855f7\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"19.0\" y2=\"55.3\" stroke=\"#a855f7\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"19.0\" y2=\"24.7\" stroke=\"#a855f7\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"48.0\" y2=\"15.3\" stroke=\"#a855f7\" stroke-width=\"3\" stroke-linecap=\"round\"/><circle cx=\"40\" cy=\"40\" r=\"8\" fill=\"#a855f7\"/></g></g><g transform=\"translate(93.3,186.6)\"><g transform=\"translate(6.6,6.6)\"><line x1=\"40\" y1=\"40\" x2=\"66.0\" y2=\"40.0\" stroke=\"#2563eb\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"53.0\" y2=\"62.5\" stroke=\"#2563eb\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"27.0\" y2=\"62.5\" stroke=\"#2563eb\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"14.0\" y2=\"40.0\" stroke=\"#2563eb\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"27.0\" y2=\"17.5\" stroke=\"#2563eb\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"53.0\" y2=\"17.5\" stroke=\"#2563eb\" stroke-width=\"3\" stroke-linecap=\"round\"/><circle cx=\"40\" cy=\"40\" r=\"8\" fill=\"#2563eb\"/></g></g><g transform=\"translate(186.6,186.6)\"><rect width=\"93.3\" height=\"93.3\" rx=\"8\" fill=\"#eff6ff\" class=\"dark:fill-blue-950/40\" stroke=\"#3b82f6\" stroke-width=\"2\" stroke-dasharray=\"4 3\"/><text x=\"46.6\" y=\"58\" font-family=\"sans-serif\" font-size=\"36\" font-weight=\"bold\" fill=\"#2563eb\" class=\"dark:fill-blue-400\" text-anchor=\"middle\">?</text></g></svg>",
    "options": [
      {
        "id": 1,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><line x1=\"40\" y1=\"40\" x2=\"66.0\" y2=\"40.0\" stroke=\"#6366f1\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"56.2\" y2=\"60.3\" stroke=\"#6366f1\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"34.2\" y2=\"65.3\" stroke=\"#6366f1\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"16.6\" y2=\"51.3\" stroke=\"#6366f1\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"16.6\" y2=\"28.7\" stroke=\"#6366f1\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"34.2\" y2=\"14.7\" stroke=\"#6366f1\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"56.2\" y2=\"19.7\" stroke=\"#6366f1\" stroke-width=\"3\" stroke-linecap=\"round\"/><circle cx=\"40\" cy=\"40\" r=\"8\" fill=\"#6366f1\"/></svg>",
        "isCorrect": true
      },
      {
        "id": 2,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><line x1=\"40\" y1=\"40\" x2=\"66.0\" y2=\"40.0\" stroke=\"#6366f1\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"53.0\" y2=\"62.5\" stroke=\"#6366f1\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"27.0\" y2=\"62.5\" stroke=\"#6366f1\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"14.0\" y2=\"40.0\" stroke=\"#6366f1\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"27.0\" y2=\"17.5\" stroke=\"#6366f1\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"53.0\" y2=\"17.5\" stroke=\"#6366f1\" stroke-width=\"3\" stroke-linecap=\"round\"/><circle cx=\"40\" cy=\"40\" r=\"8\" fill=\"#6366f1\"/></svg>",
        "isCorrect": false,
        "distractorType": "incomplete_rule"
      },
      {
        "id": 3,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><line x1=\"40\" y1=\"40\" x2=\"66.0\" y2=\"40.0\" stroke=\"#2563eb\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"56.2\" y2=\"60.3\" stroke=\"#2563eb\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"34.2\" y2=\"65.3\" stroke=\"#2563eb\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"16.6\" y2=\"51.3\" stroke=\"#2563eb\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"16.6\" y2=\"28.7\" stroke=\"#2563eb\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"34.2\" y2=\"14.7\" stroke=\"#2563eb\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"56.2\" y2=\"19.7\" stroke=\"#2563eb\" stroke-width=\"3\" stroke-linecap=\"round\"/><circle cx=\"40\" cy=\"40\" r=\"8\" fill=\"#2563eb\"/></svg>",
        "isCorrect": false,
        "distractorType": "incomplete_rule"
      },
      {
        "id": 4,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><line x1=\"40\" y1=\"40\" x2=\"66.0\" y2=\"40.0\" stroke=\"#a855f7\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"56.2\" y2=\"60.3\" stroke=\"#a855f7\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"34.2\" y2=\"65.3\" stroke=\"#a855f7\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"16.6\" y2=\"51.3\" stroke=\"#a855f7\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"16.6\" y2=\"28.7\" stroke=\"#a855f7\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"34.2\" y2=\"14.7\" stroke=\"#a855f7\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"56.2\" y2=\"19.7\" stroke=\"#a855f7\" stroke-width=\"3\" stroke-linecap=\"round\"/><circle cx=\"40\" cy=\"40\" r=\"8\" fill=\"#a855f7\"/></svg>",
        "isCorrect": false,
        "distractorType": "rotation_error"
      },
      {
        "id": 5,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><line x1=\"40\" y1=\"40\" x2=\"66.0\" y2=\"40.0\" stroke=\"#6366f1\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"58.4\" y2=\"58.4\" stroke=\"#6366f1\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"40.0\" y2=\"66.0\" stroke=\"#6366f1\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"21.6\" y2=\"58.4\" stroke=\"#6366f1\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"14.0\" y2=\"40.0\" stroke=\"#6366f1\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"21.6\" y2=\"21.6\" stroke=\"#6366f1\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"40.0\" y2=\"14.0\" stroke=\"#6366f1\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"58.4\" y2=\"21.6\" stroke=\"#6366f1\" stroke-width=\"3\" stroke-linecap=\"round\"/><circle cx=\"40\" cy=\"40\" r=\"8\" fill=\"#6366f1\"/></svg>",
        "isCorrect": false,
        "distractorType": "random"
      },
      {
        "id": 6,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><line x1=\"40\" y1=\"40\" x2=\"66.0\" y2=\"40.0\" stroke=\"#6366f1\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"48.0\" y2=\"64.7\" stroke=\"#6366f1\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"19.0\" y2=\"55.3\" stroke=\"#6366f1\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"19.0\" y2=\"24.7\" stroke=\"#6366f1\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"40\" x2=\"48.0\" y2=\"15.3\" stroke=\"#6366f1\" stroke-width=\"3\" stroke-linecap=\"round\"/><circle cx=\"40\" cy=\"40\" r=\"8\" fill=\"#6366f1\"/></svg>",
        "isCorrect": false,
        "distractorType": "feature_attraction"
      }
    ],
    "a": 1.3,
    "b": -0.6,
    "explanation": "Spoke count increases by +1 horizontally, while colors cycle across blue, indigo, and purple. The missing cell requires 7 spokes with an indigo core."
  },
  {
    "id": 8,
    "domain": "cube_rotation",
    "promptSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><path d=\"M-7 0 L7 0 M0 -7 L0 7\" stroke=\"#dc2626\" stroke-width=\"3.5\" stroke-linecap=\"round\"/></g><g transform=\"translate(50,81.5)\"><circle cx=\"0\" cy=\"0\" r=\"7\" fill=\"#2563eb\"/></g><g transform=\"translate(90,81.5)\"><line x1=\"-7\" y1=\"7\" x2=\"7\" y2=\"-7\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"3\" stroke-linecap=\"round\"/></g></svg>",
    "options": [
      {
        "id": 1,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(-30,-30) scale(0.6)\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><circle cx=\"0\" cy=\"0\" r=\"7\" stroke=\"#10b981\" stroke-width=\"3\"/></g><g transform=\"translate(50,81.5)\"><circle cx=\"0\" cy=\"0\" r=\"7\" fill=\"#2563eb\"/></g><g transform=\"translate(90,81.5)\"><line x1=\"-7\" y1=\"-7\" x2=\"7\" y2=\"7\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"3\" stroke-linecap=\"round\"/></g></svg></g></svg>",
        "isCorrect": true
      },
      {
        "id": 2,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(-30,-30) scale(0.6)\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><circle cx=\"0\" cy=\"0\" r=\"7\" stroke=\"#10b981\" stroke-width=\"3\"/></g><g transform=\"translate(50,81.5)\"><line x1=\"-7\" y1=\"7\" x2=\"7\" y2=\"-7\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"3\" stroke-linecap=\"round\"/></g><g transform=\"translate(90,81.5)\"><circle cx=\"0\" cy=\"0\" r=\"7\" fill=\"#2563eb\"/></g></svg></g></svg>",
        "isCorrect": false,
        "distractorType": "rotation_error"
      },
      {
        "id": 3,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(-30,-30) scale(0.6)\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><path d=\"M-7 0 L7 0 M0 -7 L0 7\" stroke=\"#dc2626\" stroke-width=\"3.5\" stroke-linecap=\"round\"/></g><g transform=\"translate(50,81.5)\"><circle cx=\"0\" cy=\"0\" r=\"7\" fill=\"#2563eb\"/></g><g transform=\"translate(90,81.5)\"><line x1=\"-7\" y1=\"7\" x2=\"7\" y2=\"-7\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"3\" stroke-linecap=\"round\"/></g></svg></g></svg>",
        "isCorrect": false,
        "distractorType": "feature_attraction"
      },
      {
        "id": 4,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(-30,-30) scale(0.6)\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><circle cx=\"0\" cy=\"0\" r=\"7\" stroke=\"#10b981\" stroke-width=\"3\"/></g><g transform=\"translate(50,81.5)\"><path d=\"M-7 0 L7 0 M0 -7 L0 7\" stroke=\"#dc2626\" stroke-width=\"3.5\" stroke-linecap=\"round\"/></g><g transform=\"translate(90,81.5)\"><line x1=\"-7\" y1=\"7\" x2=\"7\" y2=\"-7\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"3\" stroke-linecap=\"round\"/></g></svg></g></svg>",
        "isCorrect": false,
        "distractorType": "incomplete_rule"
      },
      {
        "id": 5,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(-30,-30) scale(0.6)\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><circle cx=\"0\" cy=\"0\" r=\"7\" fill=\"#2563eb\"/></g><g transform=\"translate(50,81.5)\"><circle cx=\"0\" cy=\"0\" r=\"7\" stroke=\"#10b981\" stroke-width=\"3\"/></g><g transform=\"translate(90,81.5)\"><line x1=\"-7\" y1=\"-7\" x2=\"7\" y2=\"7\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"3\" stroke-linecap=\"round\"/></g></svg></g></svg>",
        "isCorrect": false,
        "distractorType": "rotation_error"
      },
      {
        "id": 6,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(-30,-30) scale(0.6)\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><line x1=\"-7\" y1=\"7\" x2=\"7\" y2=\"-7\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"3\" stroke-linecap=\"round\"/></g><g transform=\"translate(50,81.5)\"><circle cx=\"0\" cy=\"0\" r=\"7\" fill=\"#2563eb\"/></g><g transform=\"translate(90,81.5)\"><circle cx=\"0\" cy=\"0\" r=\"7\" stroke=\"#10b981\" stroke-width=\"3\"/></g></svg></g></svg>",
        "isCorrect": false,
        "distractorType": "random"
      }
    ],
    "a": 1.35,
    "b": -0.4,
    "explanation": "A 180 degree rotation around the lateral axis brings the bottom face (ring) to the top, preserves front dot alignment, and reverses the slant of the right diagonal slash."
  },
  {
    "id": 9,
    "domain": "cube_nets",
    "promptSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 150\" class=\"w-full h-full max-w-[200px] mx-auto select-none\" fill=\"none\"><rect width=\"200\" height=\"150\" rx=\"10\" fill=\"#f4f4f5\" class=\"dark:fill-zinc-900\" stroke=\"#e4e4e7\" class=\"dark:stroke-zinc-800\" stroke-width=\"2\"/><rect x=\"60\" y=\"10\" width=\"40\" height=\"40\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"1.8\"/><g transform=\"translate(80,30)\"><circle cx=\"0\" cy=\"0\" r=\"8\" fill=\"#2563eb\"/></g><rect x=\"20\" y=\"50\" width=\"40\" height=\"40\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"1.8\"/><g transform=\"translate(40,70)\"><polygon points=\"0,-8 2,-2 8,-2 3,2 5,8 0,4 -5,8 -3,2 -8,-2 -2,-2\" fill=\"#f59e0b\"/></g><rect x=\"60\" y=\"50\" width=\"40\" height=\"40\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"1.8\"/><g transform=\"translate(80,70)\"><rect x=\"-7\" y=\"-7\" width=\"14\" height=\"14\" fill=\"#a855f7\"/></g><rect x=\"100\" y=\"50\" width=\"40\" height=\"40\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"1.8\"/><g transform=\"translate(120,70)\"><path d=\"M-8 0 L8 0 M0 -8 L0 8\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"3\" stroke-linecap=\"round\"/></g><rect x=\"140\" y=\"50\" width=\"40\" height=\"40\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"1.8\"/><g transform=\"translate(160,70)\"><polygon points=\"0,-8 8,8 -8,8\" fill=\"#10b981\"/></g><rect x=\"60\" y=\"90\" width=\"40\" height=\"40\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"1.8\"/><g transform=\"translate(80,110)\"><path d=\"M-7 0 L7 0 M0 -7 L0 7\" stroke=\"#dc2626\" stroke-width=\"3.5\" stroke-linecap=\"round\"/></g></svg>",
    "options": [
      {
        "id": 1,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(-30,-30) scale(0.6)\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><circle cx=\"0\" cy=\"0\" r=\"8\" fill=\"#2563eb\"/></g><g transform=\"translate(50,81.5)\"><rect x=\"-7\" y=\"-7\" width=\"14\" height=\"14\" fill=\"#a855f7\"/></g><g transform=\"translate(90,81.5)\"><path d=\"M-8 0 L8 0 M0 -8 L0 8\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"3\" stroke-linecap=\"round\"/></g></svg></g></svg>",
        "isCorrect": true
      },
      {
        "id": 2,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(-30,-30) scale(0.6)\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><circle cx=\"0\" cy=\"0\" r=\"8\" fill=\"#2563eb\"/></g><g transform=\"translate(50,81.5)\"><rect x=\"-7\" y=\"-7\" width=\"14\" height=\"14\" fill=\"#a855f7\"/></g><g transform=\"translate(90,81.5)\"><path d=\"M-7 0 L7 0 M0 -7 L0 7\" stroke=\"#dc2626\" stroke-width=\"3.5\" stroke-linecap=\"round\"/></g></svg></g></svg>",
        "isCorrect": false,
        "distractorType": "incomplete_rule"
      },
      {
        "id": 3,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(-30,-30) scale(0.6)\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><polygon points=\"0,-8 2,-2 8,-2 3,2 5,8 0,4 -5,8 -3,2 -8,-2 -2,-2\" fill=\"#f59e0b\"/></g><g transform=\"translate(50,81.5)\"><rect x=\"-7\" y=\"-7\" width=\"14\" height=\"14\" fill=\"#a855f7\"/></g><g transform=\"translate(90,81.5)\"><path d=\"M-8 0 L8 0 M0 -8 L0 8\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"3\" stroke-linecap=\"round\"/></g></svg></g></svg>",
        "isCorrect": false,
        "distractorType": "rotation_error"
      },
      {
        "id": 4,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(-30,-30) scale(0.6)\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><circle cx=\"0\" cy=\"0\" r=\"8\" fill=\"#2563eb\"/></g><g transform=\"translate(50,81.5)\"><polygon points=\"0,-8 8,8 -8,8\" fill=\"#10b981\"/></g><g transform=\"translate(90,81.5)\"><path d=\"M-7 0 L7 0 M0 -7 L0 7\" stroke=\"#dc2626\" stroke-width=\"3.5\" stroke-linecap=\"round\"/></g></svg></g></svg>",
        "isCorrect": false,
        "distractorType": "feature_attraction"
      },
      {
        "id": 5,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(-30,-30) scale(0.6)\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><path d=\"M-8 0 L8 0 M0 -8 L0 8\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"3\" stroke-linecap=\"round\"/></g><g transform=\"translate(50,81.5)\"><circle cx=\"0\" cy=\"0\" r=\"8\" fill=\"#2563eb\"/></g><g transform=\"translate(90,81.5)\"><rect x=\"-7\" y=\"-7\" width=\"14\" height=\"14\" fill=\"#a855f7\"/></g></svg></g></svg>",
        "isCorrect": false,
        "distractorType": "rotation_error"
      },
      {
        "id": 6,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(-30,-30) scale(0.6)\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><polygon points=\"0,-8 2,-2 8,-2 3,2 5,8 0,4 -5,8 -3,2 -8,-2 -2,-2\" fill=\"#f59e0b\"/></g><g transform=\"translate(50,81.5)\"><circle cx=\"0\" cy=\"0\" r=\"8\" fill=\"#2563eb\"/></g><g transform=\"translate(90,81.5)\"><polygon points=\"0,-8 8,8 -8,8\" fill=\"#10b981\"/></g></svg></g></svg>",
        "isCorrect": false,
        "distractorType": "random"
      }
    ],
    "a": 1.4,
    "b": -0.2,
    "explanation": "In this cross net, the Circle, Square, and Cross fold around a common corner vertex without requiring inversion of opposite faces."
  },
  {
    "id": 10,
    "domain": "matrix_reasoning",
    "promptSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 280 280\" class=\"w-full h-full max-w-[280px] mx-auto select-none\" fill=\"none\"><rect width=\"280\" height=\"280\" rx=\"12\" fill=\"#f4f4f5\" class=\"dark:fill-zinc-900\" stroke=\"#e4e4e7\" class=\"dark:stroke-zinc-800\" stroke-width=\"2\"/><line x1=\"93.3\" y1=\"0\" x2=\"93.3\" y2=\"280\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"2\"/><line x1=\"186.6\" y1=\"0\" x2=\"186.6\" y2=\"280\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"2\"/><line x1=\"0\" y1=\"93.3\" x2=\"280\" y2=\"93.3\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"2\"/><line x1=\"0\" y1=\"186.6\" x2=\"280\" y2=\"186.6\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"2\"/><g transform=\"translate(0,0)\"><g transform=\"translate(6.6,6.6)\"><line x1=\"40\" y1=\"14\" x2=\"40\" y2=\"66\" stroke=\"#2563eb\" stroke-width=\"4\" stroke-linecap=\"round\"/></g></g><g transform=\"translate(93.3,0)\"><g transform=\"translate(6.6,6.6)\"><line x1=\"14\" y1=\"40\" x2=\"66\" y2=\"40\" stroke=\"#2563eb\" stroke-width=\"4\" stroke-linecap=\"round\"/></g></g><g transform=\"translate(186.6,0)\"><g transform=\"translate(6.6,6.6)\"><line x1=\"40\" y1=\"14\" x2=\"40\" y2=\"66\" stroke=\"#2563eb\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"14\" y1=\"40\" x2=\"66\" y2=\"40\" stroke=\"#2563eb\" stroke-width=\"4\" stroke-linecap=\"round\"/></g></g><g transform=\"translate(0,93.3)\"><g transform=\"translate(6.6,6.6)\"><line x1=\"16\" y1=\"16\" x2=\"64\" y2=\"64\" stroke=\"#6366f1\" stroke-width=\"4\" stroke-linecap=\"round\"/></g></g><g transform=\"translate(93.3,93.3)\"><g transform=\"translate(6.6,6.6)\"><line x1=\"64\" y1=\"16\" x2=\"16\" y2=\"64\" stroke=\"#6366f1\" stroke-width=\"4\" stroke-linecap=\"round\"/></g></g><g transform=\"translate(186.6,93.3)\"><g transform=\"translate(6.6,6.6)\"><line x1=\"16\" y1=\"16\" x2=\"64\" y2=\"64\" stroke=\"#6366f1\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"64\" y1=\"16\" x2=\"16\" y2=\"64\" stroke=\"#6366f1\" stroke-width=\"4\" stroke-linecap=\"round\"/></g></g><g transform=\"translate(0,186.6)\"><g transform=\"translate(6.6,6.6)\"><path d=\"M16 40 L16 16 L40 16\" stroke=\"#a855f7\" stroke-width=\"4\" stroke-linecap=\"round\" fill=\"none\"/></g></g><g transform=\"translate(93.3,186.6)\"><g transform=\"translate(6.6,6.6)\"><path d=\"M40 64 L64 64 L64 40\" stroke=\"#a855f7\" stroke-width=\"4\" stroke-linecap=\"round\" fill=\"none\"/></g></g><g transform=\"translate(186.6,186.6)\"><rect width=\"93.3\" height=\"93.3\" rx=\"8\" fill=\"#eff6ff\" class=\"dark:fill-blue-950/40\" stroke=\"#3b82f6\" stroke-width=\"2\" stroke-dasharray=\"4 3\"/><text x=\"46.6\" y=\"58\" font-family=\"sans-serif\" font-size=\"36\" font-weight=\"bold\" fill=\"#2563eb\" class=\"dark:fill-blue-400\" text-anchor=\"middle\">?</text></g></svg>",
    "options": [
      {
        "id": 1,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><path d=\"M16 40 L16 16 L40 16\" stroke=\"#a855f7\" stroke-width=\"4\" stroke-linecap=\"round\" fill=\"none\"/><path d=\"M40 64 L64 64 L64 40\" stroke=\"#a855f7\" stroke-width=\"4\" stroke-linecap=\"round\" fill=\"none\"/></svg>",
        "isCorrect": true
      },
      {
        "id": 2,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><rect x=\"16\" y=\"16\" width=\"48\" height=\"48\" rx=\"4\" stroke=\"#a855f7\" stroke-width=\"4\" fill=\"none\"/></svg>",
        "isCorrect": false,
        "distractorType": "feature_attraction"
      },
      {
        "id": 3,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><path d=\"M16 40 L16 16 L40 16\" stroke=\"#a855f7\" stroke-width=\"4\" stroke-linecap=\"round\" fill=\"none\"/></svg>",
        "isCorrect": false,
        "distractorType": "incomplete_rule"
      },
      {
        "id": 4,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><path d=\"M40 64 L64 64 L64 40\" stroke=\"#a855f7\" stroke-width=\"4\" stroke-linecap=\"round\" fill=\"none\"/></svg>",
        "isCorrect": false,
        "distractorType": "incomplete_rule"
      },
      {
        "id": 5,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><circle cx=\"40\" cy=\"40\" r=\"24\" stroke=\"#a855f7\" stroke-width=\"4\" fill=\"none\"/></svg>",
        "isCorrect": false,
        "distractorType": "random"
      },
      {
        "id": 6,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><line x1=\"16\" y1=\"40\" x2=\"64\" y2=\"40\" stroke=\"#a855f7\" stroke-width=\"4\" stroke-linecap=\"round\"/></svg>",
        "isCorrect": false,
        "distractorType": "feature_attraction"
      }
    ],
    "a": 1.45,
    "b": 0.0,
    "explanation": "In each row, Column 3 superimposes the line components of Columns 1 and 2. Combining the top-left bracket and bottom-right bracket yields the combined corner bracket pair."
  },
  {
    "id": 11,
    "domain": "topological_series",
    "promptSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 90\" class=\"w-full h-full max-w-[360px] mx-auto select-none\" fill=\"none\"><rect width=\"360\" height=\"90\" rx=\"12\" fill=\"#f4f4f5\" class=\"dark:fill-zinc-900\" stroke=\"#e4e4e7\" class=\"dark:stroke-zinc-800\" stroke-width=\"2\"/><rect x=\"15\" y=\"12.5\" width=\"65\" height=\"65\" rx=\"8\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"1.5\"/><g transform=\"translate(15,12.5)\"><circle cx=\"32.5\" cy=\"32.5\" r=\"24\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"1.5\"/><line x1=\"32.5\" y1=\"32.5\" x2=\"32.5\" y2=\"12.5\" stroke=\"#2563eb\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"32.5\" y1=\"32.5\" x2=\"32.5\" y2=\"18.5\" stroke=\"#a855f7\" stroke-width=\"2\" stroke-linecap=\"round\"/><circle cx=\"32.5\" cy=\"32.5\" r=\"3\" fill=\"#18181b\" class=\"dark:fill-zinc-200\"/></g><path d=\"M87 45 L93 45 M90 42 L93 45 L90 48\" stroke=\"#a1a1aa\" stroke-width=\"1.5\" stroke-linecap=\"round\"/><rect x=\"95\" y=\"12.5\" width=\"65\" height=\"65\" rx=\"8\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"1.5\"/><g transform=\"translate(95,12.5)\"><circle cx=\"32.5\" cy=\"32.5\" r=\"24\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"1.5\"/><line x1=\"32.5\" y1=\"32.5\" x2=\"46.6\" y2=\"18.4\" stroke=\"#2563eb\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"32.5\" y1=\"32.5\" x2=\"18.5\" y2=\"32.5\" stroke=\"#a855f7\" stroke-width=\"2\" stroke-linecap=\"round\"/><circle cx=\"32.5\" cy=\"32.5\" r=\"3\" fill=\"#18181b\" class=\"dark:fill-zinc-200\"/></g><path d=\"M167 45 L173 45 M170 42 L173 45 L170 48\" stroke=\"#a1a1aa\" stroke-width=\"1.5\" stroke-linecap=\"round\"/><rect x=\"175\" y=\"12.5\" width=\"65\" height=\"65\" rx=\"8\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"1.5\"/><g transform=\"translate(175,12.5)\"><circle cx=\"32.5\" cy=\"32.5\" r=\"24\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"1.5\"/><line x1=\"32.5\" y1=\"32.5\" x2=\"52.5\" y2=\"32.5\" stroke=\"#2563eb\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"32.5\" y1=\"32.5\" x2=\"32.5\" y2=\"46.5\" stroke=\"#a855f7\" stroke-width=\"2\" stroke-linecap=\"round\"/><circle cx=\"32.5\" cy=\"32.5\" r=\"3\" fill=\"#18181b\" class=\"dark:fill-zinc-200\"/></g><path d=\"M247 45 L253 45 M250 42 L253 45 L250 48\" stroke=\"#a1a1aa\" stroke-width=\"1.5\" stroke-linecap=\"round\"/><rect x=\"255\" y=\"12.5\" width=\"65\" height=\"65\" rx=\"8\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"1.5\"/><g transform=\"translate(255,12.5)\"><circle cx=\"32.5\" cy=\"32.5\" r=\"24\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"1.5\"/><line x1=\"32.5\" y1=\"32.5\" x2=\"46.6\" y2=\"46.6\" stroke=\"#2563eb\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"32.5\" y1=\"32.5\" x2=\"46.5\" y2=\"32.5\" stroke=\"#a855f7\" stroke-width=\"2\" stroke-linecap=\"round\"/><circle cx=\"32.5\" cy=\"32.5\" r=\"3\" fill=\"#18181b\" class=\"dark:fill-zinc-200\"/></g><g transform=\"translate(255,12.5)\"><rect width=\"65\" height=\"65\" rx=\"8\" fill=\"#eff6ff\" class=\"dark:fill-blue-950/40\" stroke=\"#3b82f6\" stroke-width=\"2\" stroke-dasharray=\"4 3\"/><text x=\"32.5\" y=\"44\" font-family=\"sans-serif\" font-size=\"28\" font-weight=\"bold\" fill=\"#2563eb\" class=\"dark:fill-blue-400\" text-anchor=\"middle\">?</text></g></svg>",
    "options": [
      {
        "id": 1,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(7.5,7.5)\"><circle cx=\"32.5\" cy=\"32.5\" r=\"24\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"1.5\"/><line x1=\"32.5\" y1=\"32.5\" x2=\"32.5\" y2=\"52.5\" stroke=\"#2563eb\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"32.5\" y1=\"32.5\" x2=\"32.5\" y2=\"18.5\" stroke=\"#a855f7\" stroke-width=\"2\" stroke-linecap=\"round\"/><circle cx=\"32.5\" cy=\"32.5\" r=\"3\" fill=\"#18181b\" class=\"dark:fill-zinc-200\"/></g></svg>",
        "isCorrect": true
      },
      {
        "id": 2,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(7.5,7.5)\"><circle cx=\"32.5\" cy=\"32.5\" r=\"24\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"1.5\"/><line x1=\"32.5\" y1=\"32.5\" x2=\"32.5\" y2=\"52.5\" stroke=\"#2563eb\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"32.5\" y1=\"32.5\" x2=\"46.5\" y2=\"32.5\" stroke=\"#a855f7\" stroke-width=\"2\" stroke-linecap=\"round\"/><circle cx=\"32.5\" cy=\"32.5\" r=\"3\" fill=\"#18181b\" class=\"dark:fill-zinc-200\"/></g></svg>",
        "isCorrect": false,
        "distractorType": "rotation_error"
      },
      {
        "id": 3,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(7.5,7.5)\"><circle cx=\"32.5\" cy=\"32.5\" r=\"24\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"1.5\"/><line x1=\"32.5\" y1=\"32.5\" x2=\"46.6\" y2=\"46.6\" stroke=\"#2563eb\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"32.5\" y1=\"32.5\" x2=\"32.5\" y2=\"18.5\" stroke=\"#a855f7\" stroke-width=\"2\" stroke-linecap=\"round\"/><circle cx=\"32.5\" cy=\"32.5\" r=\"3\" fill=\"#18181b\" class=\"dark:fill-zinc-200\"/></g></svg>",
        "isCorrect": false,
        "distractorType": "incomplete_rule"
      },
      {
        "id": 4,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(7.5,7.5)\"><circle cx=\"32.5\" cy=\"32.5\" r=\"24\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"1.5\"/><line x1=\"32.5\" y1=\"32.5\" x2=\"18.4\" y2=\"46.6\" stroke=\"#2563eb\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"32.5\" y1=\"32.5\" x2=\"32.5\" y2=\"18.5\" stroke=\"#a855f7\" stroke-width=\"2\" stroke-linecap=\"round\"/><circle cx=\"32.5\" cy=\"32.5\" r=\"3\" fill=\"#18181b\" class=\"dark:fill-zinc-200\"/></g></svg>",
        "isCorrect": false,
        "distractorType": "rotation_error"
      },
      {
        "id": 5,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(7.5,7.5)\"><circle cx=\"32.5\" cy=\"32.5\" r=\"24\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"1.5\"/><line x1=\"32.5\" y1=\"32.5\" x2=\"32.5\" y2=\"52.5\" stroke=\"#2563eb\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"32.5\" y1=\"32.5\" x2=\"18.5\" y2=\"32.5\" stroke=\"#a855f7\" stroke-width=\"2\" stroke-linecap=\"round\"/><circle cx=\"32.5\" cy=\"32.5\" r=\"3\" fill=\"#18181b\" class=\"dark:fill-zinc-200\"/></g></svg>",
        "isCorrect": false,
        "distractorType": "incomplete_rule"
      },
      {
        "id": 6,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(7.5,7.5)\"><circle cx=\"32.5\" cy=\"32.5\" r=\"24\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"1.5\"/><line x1=\"32.5\" y1=\"32.5\" x2=\"32.5\" y2=\"12.5\" stroke=\"#2563eb\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"32.5\" y1=\"32.5\" x2=\"32.5\" y2=\"46.5\" stroke=\"#a855f7\" stroke-width=\"2\" stroke-linecap=\"round\"/><circle cx=\"32.5\" cy=\"32.5\" r=\"3\" fill=\"#18181b\" class=\"dark:fill-zinc-200\"/></g></svg>",
        "isCorrect": false,
        "distractorType": "feature_attraction"
      }
    ],
    "a": 1.45,
    "b": 0.2,
    "explanation": "Hand A (blue) rotates clockwise by +45 degrees per step reaching 180 degrees (straight down), while Hand B (purple) rotates counter-clockwise by -90 degrees per step cycling back to 0 degrees (straight up)."
  },
  {
    "id": 12,
    "domain": "matrix_reasoning",
    "promptSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 280 280\" class=\"w-full h-full max-w-[280px] mx-auto select-none\" fill=\"none\"><rect width=\"280\" height=\"280\" rx=\"12\" fill=\"#f4f4f5\" class=\"dark:fill-zinc-900\" stroke=\"#e4e4e7\" class=\"dark:stroke-zinc-800\" stroke-width=\"2\"/><line x1=\"93.3\" y1=\"0\" x2=\"93.3\" y2=\"280\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"2\"/><line x1=\"186.6\" y1=\"0\" x2=\"186.6\" y2=\"280\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"2\"/><line x1=\"0\" y1=\"93.3\" x2=\"280\" y2=\"93.3\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"2\"/><line x1=\"0\" y1=\"186.6\" x2=\"280\" y2=\"186.6\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"2\"/><g transform=\"translate(0,0)\"><g transform=\"translate(6.6,6.6)\"><circle cx=\"40\" cy=\"40\" r=\"22\" stroke=\"#2563eb\" stroke-width=\"3\" fill=\"none\"/><line x1=\"24\" y1=\"40\" x2=\"56\" y2=\"40\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\"/></g></g><g transform=\"translate(93.3,0)\"><g transform=\"translate(6.6,6.6)\"><rect x=\"18\" y=\"18\" width=\"44\" height=\"44\" rx=\"4\" stroke=\"#6366f1\" stroke-width=\"3\" fill=\"none\"/><line x1=\"40\" y1=\"24\" x2=\"40\" y2=\"56\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\"/></g></g><g transform=\"translate(186.6,0)\"><g transform=\"translate(6.6,6.6)\"><polygon points=\"40,16 62,28 62,52 40,64 18,52 18,28\" stroke=\"#a855f7\" stroke-width=\"3\" fill=\"none\"/><line x1=\"24\" y1=\"40\" x2=\"56\" y2=\"40\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\"/><line x1=\"40\" y1=\"24\" x2=\"40\" y2=\"56\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\"/></g></g><g transform=\"translate(0,93.3)\"><g transform=\"translate(6.6,6.6)\"><rect x=\"18\" y=\"18\" width=\"44\" height=\"44\" rx=\"4\" stroke=\"#6366f1\" stroke-width=\"3\" fill=\"none\"/><line x1=\"24\" y1=\"40\" x2=\"56\" y2=\"40\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\"/><line x1=\"40\" y1=\"24\" x2=\"40\" y2=\"56\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\"/></g></g><g transform=\"translate(93.3,93.3)\"><g transform=\"translate(6.6,6.6)\"><polygon points=\"40,16 62,28 62,52 40,64 18,52 18,28\" stroke=\"#a855f7\" stroke-width=\"3\" fill=\"none\"/><line x1=\"24\" y1=\"40\" x2=\"56\" y2=\"40\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\"/></g></g><g transform=\"translate(186.6,93.3)\"><g transform=\"translate(6.6,6.6)\"><circle cx=\"40\" cy=\"40\" r=\"22\" stroke=\"#2563eb\" stroke-width=\"3\" fill=\"none\"/><line x1=\"40\" y1=\"24\" x2=\"40\" y2=\"56\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\"/></g></g><g transform=\"translate(0,186.6)\"><g transform=\"translate(6.6,6.6)\"><polygon points=\"40,16 62,28 62,52 40,64 18,52 18,28\" stroke=\"#a855f7\" stroke-width=\"3\" fill=\"none\"/><line x1=\"40\" y1=\"24\" x2=\"40\" y2=\"56\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\"/></g></g><g transform=\"translate(93.3,186.6)\"><g transform=\"translate(6.6,6.6)\"><circle cx=\"40\" cy=\"40\" r=\"22\" stroke=\"#2563eb\" stroke-width=\"3\" fill=\"none\"/><line x1=\"24\" y1=\"40\" x2=\"56\" y2=\"40\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\"/><line x1=\"40\" y1=\"24\" x2=\"40\" y2=\"56\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\"/></g></g><g transform=\"translate(186.6,186.6)\"><rect width=\"93.3\" height=\"93.3\" rx=\"8\" fill=\"#eff6ff\" class=\"dark:fill-blue-950/40\" stroke=\"#3b82f6\" stroke-width=\"2\" stroke-dasharray=\"4 3\"/><text x=\"46.6\" y=\"58\" font-family=\"sans-serif\" font-size=\"36\" font-weight=\"bold\" fill=\"#2563eb\" class=\"dark:fill-blue-400\" text-anchor=\"middle\">?</text></g></svg>",
    "options": [
      {
        "id": 1,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><rect x=\"18\" y=\"18\" width=\"44\" height=\"44\" rx=\"4\" stroke=\"#6366f1\" stroke-width=\"3\" fill=\"none\"/><line x1=\"24\" y1=\"40\" x2=\"56\" y2=\"40\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\"/></svg>",
        "isCorrect": true
      },
      {
        "id": 2,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><rect x=\"18\" y=\"18\" width=\"44\" height=\"44\" rx=\"4\" stroke=\"#6366f1\" stroke-width=\"3\" fill=\"none\"/><line x1=\"40\" y1=\"24\" x2=\"40\" y2=\"56\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\"/></svg>",
        "isCorrect": false,
        "distractorType": "incomplete_rule"
      },
      {
        "id": 3,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><circle cx=\"40\" cy=\"40\" r=\"22\" stroke=\"#2563eb\" stroke-width=\"3\" fill=\"none\"/><line x1=\"24\" y1=\"40\" x2=\"56\" y2=\"40\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\"/></svg>",
        "isCorrect": false,
        "distractorType": "feature_attraction"
      },
      {
        "id": 4,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><polygon points=\"40,16 62,28 62,52 40,64 18,52 18,28\" stroke=\"#a855f7\" stroke-width=\"3\" fill=\"none\"/><line x1=\"24\" y1=\"40\" x2=\"56\" y2=\"40\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\"/></svg>",
        "isCorrect": false,
        "distractorType": "feature_attraction"
      },
      {
        "id": 5,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><rect x=\"18\" y=\"18\" width=\"44\" height=\"44\" rx=\"4\" stroke=\"#6366f1\" stroke-width=\"3\" fill=\"none\"/><line x1=\"24\" y1=\"40\" x2=\"56\" y2=\"40\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\"/><line x1=\"40\" y1=\"24\" x2=\"40\" y2=\"56\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\"/></svg>",
        "isCorrect": false,
        "distractorType": "incomplete_rule"
      },
      {
        "id": 6,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><circle cx=\"40\" cy=\"40\" r=\"22\" stroke=\"#2563eb\" stroke-width=\"3\" fill=\"none\"/><line x1=\"40\" y1=\"24\" x2=\"40\" y2=\"56\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\"/></svg>",
        "isCorrect": false,
        "distractorType": "random"
      }
    ],
    "a": 1.5,
    "b": 0.4,
    "explanation": "Both outer geometry and internal crosshatching follow Latin square permutations across rows and columns. The missing cell requires a square with horizontal internal line texture."
  },
  {
    "id": 13,
    "domain": "cube_rotation",
    "promptSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><circle cx=\"0\" cy=\"0\" r=\"8\" fill=\"#2563eb\"/></g><g transform=\"translate(50,81.5)\"><polygon points=\"0,-8 8,8 -8,8\" fill=\"#10b981\"/></g><g transform=\"translate(90,81.5)\"><polygon points=\"0,-8 2,-2 8,-2 3,2 5,8 0,4 -5,8 -3,2 -8,-2 -2,-2\" fill=\"#f59e0b\"/></g></svg>",
    "options": [
      {
        "id": 1,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(-30,-30) scale(0.6)\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><polygon points=\"0,-8 2,-2 8,-2 3,2 5,8 0,4 -5,8 -3,2 -8,-2 -2,-2\" fill=\"#f59e0b\"/></g><g transform=\"translate(50,81.5)\"><circle cx=\"0\" cy=\"0\" r=\"8\" fill=\"#2563eb\"/></g><g transform=\"translate(90,81.5)\"><path d=\"M-7 0 L7 0 M0 -7 L0 7\" stroke=\"#dc2626\" stroke-width=\"3.5\" stroke-linecap=\"round\"/></g></svg></g></svg>",
        "isCorrect": true
      },
      {
        "id": 2,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(-30,-30) scale(0.6)\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><circle cx=\"0\" cy=\"0\" r=\"8\" fill=\"#2563eb\"/></g><g transform=\"translate(50,81.5)\"><polygon points=\"0,-8 2,-2 8,-2 3,2 5,8 0,4 -5,8 -3,2 -8,-2 -2,-2\" fill=\"#f59e0b\"/></g><g transform=\"translate(90,81.5)\"><path d=\"M-7 0 L7 0 M0 -7 L0 7\" stroke=\"#dc2626\" stroke-width=\"3.5\" stroke-linecap=\"round\"/></g></svg></g></svg>",
        "isCorrect": false,
        "distractorType": "rotation_error"
      },
      {
        "id": 3,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(-30,-30) scale(0.6)\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><polygon points=\"0,-8 8,8 -8,8\" fill=\"#10b981\"/></g><g transform=\"translate(50,81.5)\"><circle cx=\"0\" cy=\"0\" r=\"8\" fill=\"#2563eb\"/></g><g transform=\"translate(90,81.5)\"><polygon points=\"0,-8 2,-2 8,-2 3,2 5,8 0,4 -5,8 -3,2 -8,-2 -2,-2\" fill=\"#f59e0b\"/></g></svg></g></svg>",
        "isCorrect": false,
        "distractorType": "rotation_error"
      },
      {
        "id": 4,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(-30,-30) scale(0.6)\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><circle cx=\"0\" cy=\"0\" r=\"8\" fill=\"#2563eb\"/></g><g transform=\"translate(50,81.5)\"><polygon points=\"0,-8 8,8 -8,8\" fill=\"#10b981\"/></g><g transform=\"translate(90,81.5)\"><polygon points=\"0,-8 2,-2 8,-2 3,2 5,8 0,4 -5,8 -3,2 -8,-2 -2,-2\" fill=\"#f59e0b\"/></g></svg></g></svg>",
        "isCorrect": false,
        "distractorType": "feature_attraction"
      },
      {
        "id": 5,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(-30,-30) scale(0.6)\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><path d=\"M-7 0 L7 0 M0 -7 L0 7\" stroke=\"#dc2626\" stroke-width=\"3.5\" stroke-linecap=\"round\"/></g><g transform=\"translate(50,81.5)\"><polygon points=\"0,-8 8,8 -8,8\" fill=\"#10b981\"/></g><g transform=\"translate(90,81.5)\"><circle cx=\"0\" cy=\"0\" r=\"8\" fill=\"#2563eb\"/></g></svg></g></svg>",
        "isCorrect": false,
        "distractorType": "incomplete_rule"
      },
      {
        "id": 6,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(-30,-30) scale(0.6)\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><polygon points=\"0,-8 2,-2 8,-2 3,2 5,8 0,4 -5,8 -3,2 -8,-2 -2,-2\" fill=\"#f59e0b\"/></g><g transform=\"translate(50,81.5)\"><polygon points=\"0,-8 8,8 -8,8\" fill=\"#10b981\"/></g><g transform=\"translate(90,81.5)\"><circle cx=\"0\" cy=\"0\" r=\"8\" fill=\"#2563eb\"/></g></svg></g></svg>",
        "isCorrect": false,
        "distractorType": "random"
      }
    ],
    "a": 1.55,
    "b": 0.6,
    "explanation": "A compound 90 degree horizontal yaw followed by a 90 degree roll swings the star face onto the top surface while bringing the circle face into front view."
  },
  {
    "id": 14,
    "domain": "matrix_reasoning",
    "promptSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 280 280\" class=\"w-full h-full max-w-[280px] mx-auto select-none\" fill=\"none\"><rect width=\"280\" height=\"280\" rx=\"12\" fill=\"#f4f4f5\" class=\"dark:fill-zinc-900\" stroke=\"#e4e4e7\" class=\"dark:stroke-zinc-800\" stroke-width=\"2\"/><line x1=\"93.3\" y1=\"0\" x2=\"93.3\" y2=\"280\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"2\"/><line x1=\"186.6\" y1=\"0\" x2=\"186.6\" y2=\"280\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"2\"/><line x1=\"0\" y1=\"93.3\" x2=\"280\" y2=\"93.3\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"2\"/><line x1=\"0\" y1=\"186.6\" x2=\"280\" y2=\"186.6\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"2\"/><g transform=\"translate(0,0)\"><g transform=\"translate(6.6,6.6)\"><line x1=\"20\" y1=\"20\" x2=\"60\" y2=\"20\" stroke=\"#2563eb\" stroke-width=\"3.5\" stroke-linecap=\"round\"/><line x1=\"20\" y1=\"40\" x2=\"60\" y2=\"40\" stroke=\"#2563eb\" stroke-width=\"3.5\" stroke-linecap=\"round\"/></g></g><g transform=\"translate(93.3,0)\"><g transform=\"translate(6.6,6.6)\"><line x1=\"20\" y1=\"40\" x2=\"60\" y2=\"40\" stroke=\"#2563eb\" stroke-width=\"3.5\" stroke-linecap=\"round\"/><line x1=\"20\" y1=\"60\" x2=\"60\" y2=\"60\" stroke=\"#2563eb\" stroke-width=\"3.5\" stroke-linecap=\"round\"/></g></g><g transform=\"translate(186.6,0)\"><g transform=\"translate(6.6,6.6)\"><line x1=\"20\" y1=\"20\" x2=\"60\" y2=\"20\" stroke=\"#2563eb\" stroke-width=\"3.5\" stroke-linecap=\"round\"/><line x1=\"20\" y1=\"60\" x2=\"60\" y2=\"60\" stroke=\"#2563eb\" stroke-width=\"3.5\" stroke-linecap=\"round\"/></g></g><g transform=\"translate(0,93.3)\"><g transform=\"translate(6.6,6.6)\"><line x1=\"20\" y1=\"20\" x2=\"20\" y2=\"60\" stroke=\"#6366f1\" stroke-width=\"3.5\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"20\" x2=\"40\" y2=\"60\" stroke=\"#6366f1\" stroke-width=\"3.5\" stroke-linecap=\"round\"/></g></g><g transform=\"translate(93.3,93.3)\"><g transform=\"translate(6.6,6.6)\"><line x1=\"40\" y1=\"20\" x2=\"40\" y2=\"60\" stroke=\"#6366f1\" stroke-width=\"3.5\" stroke-linecap=\"round\"/><line x1=\"60\" y1=\"20\" x2=\"60\" y2=\"60\" stroke=\"#6366f1\" stroke-width=\"3.5\" stroke-linecap=\"round\"/></g></g><g transform=\"translate(186.6,93.3)\"><g transform=\"translate(6.6,6.6)\"><line x1=\"20\" y1=\"20\" x2=\"20\" y2=\"60\" stroke=\"#6366f1\" stroke-width=\"3.5\" stroke-linecap=\"round\"/><line x1=\"60\" y1=\"20\" x2=\"60\" y2=\"60\" stroke=\"#6366f1\" stroke-width=\"3.5\" stroke-linecap=\"round\"/></g></g><g transform=\"translate(0,186.6)\"><g transform=\"translate(6.6,6.6)\"><line x1=\"20\" y1=\"20\" x2=\"60\" y2=\"20\" stroke=\"#2563eb\" stroke-width=\"3.5\" stroke-linecap=\"round\"/><line x1=\"20\" y1=\"20\" x2=\"20\" y2=\"60\" stroke=\"#6366f1\" stroke-width=\"3.5\" stroke-linecap=\"round\"/><line x1=\"20\" y1=\"40\" x2=\"60\" y2=\"40\" stroke=\"#2563eb\" stroke-width=\"3.5\" stroke-linecap=\"round\"/></g></g><g transform=\"translate(93.3,186.6)\"><g transform=\"translate(6.6,6.6)\"><line x1=\"20\" y1=\"40\" x2=\"60\" y2=\"40\" stroke=\"#2563eb\" stroke-width=\"3.5\" stroke-linecap=\"round\"/><line x1=\"60\" y1=\"20\" x2=\"60\" y2=\"60\" stroke=\"#6366f1\" stroke-width=\"3.5\" stroke-linecap=\"round\"/><line x1=\"20\" y1=\"60\" x2=\"60\" y2=\"60\" stroke=\"#2563eb\" stroke-width=\"3.5\" stroke-linecap=\"round\"/></g></g><g transform=\"translate(186.6,186.6)\"><rect width=\"93.3\" height=\"93.3\" rx=\"8\" fill=\"#eff6ff\" class=\"dark:fill-blue-950/40\" stroke=\"#3b82f6\" stroke-width=\"2\" stroke-dasharray=\"4 3\"/><text x=\"46.6\" y=\"58\" font-family=\"sans-serif\" font-size=\"36\" font-weight=\"bold\" fill=\"#2563eb\" class=\"dark:fill-blue-400\" text-anchor=\"middle\">?</text></g></svg>",
    "options": [
      {
        "id": 1,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><line x1=\"20\" y1=\"20\" x2=\"60\" y2=\"20\" stroke=\"#2563eb\" stroke-width=\"3.5\" stroke-linecap=\"round\"/><line x1=\"20\" y1=\"20\" x2=\"20\" y2=\"60\" stroke=\"#6366f1\" stroke-width=\"3.5\" stroke-linecap=\"round\"/><line x1=\"60\" y1=\"20\" x2=\"60\" y2=\"60\" stroke=\"#6366f1\" stroke-width=\"3.5\" stroke-linecap=\"round\"/><line x1=\"20\" y1=\"60\" x2=\"60\" y2=\"60\" stroke=\"#2563eb\" stroke-width=\"3.5\" stroke-linecap=\"round\"/></svg>",
        "isCorrect": true
      },
      {
        "id": 2,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><line x1=\"20\" y1=\"20\" x2=\"60\" y2=\"20\" stroke=\"#2563eb\" stroke-width=\"3.5\" stroke-linecap=\"round\"/><line x1=\"20\" y1=\"40\" x2=\"60\" y2=\"40\" stroke=\"#2563eb\" stroke-width=\"3.5\" stroke-linecap=\"round\"/><line x1=\"20\" y1=\"20\" x2=\"20\" y2=\"60\" stroke=\"#6366f1\" stroke-width=\"3.5\" stroke-linecap=\"round\"/><line x1=\"60\" y1=\"20\" x2=\"60\" y2=\"60\" stroke=\"#6366f1\" stroke-width=\"3.5\" stroke-linecap=\"round\"/><line x1=\"20\" y1=\"60\" x2=\"60\" y2=\"60\" stroke=\"#2563eb\" stroke-width=\"3.5\" stroke-linecap=\"round\"/></svg>",
        "isCorrect": false,
        "distractorType": "cancellation_error"
      },
      {
        "id": 3,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><line x1=\"20\" y1=\"40\" x2=\"60\" y2=\"40\" stroke=\"#2563eb\" stroke-width=\"3.5\" stroke-linecap=\"round\"/></svg>",
        "isCorrect": false,
        "distractorType": "incomplete_rule"
      },
      {
        "id": 4,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><line x1=\"20\" y1=\"20\" x2=\"60\" y2=\"20\" stroke=\"#2563eb\" stroke-width=\"3.5\" stroke-linecap=\"round\"/><line x1=\"20\" y1=\"60\" x2=\"60\" y2=\"60\" stroke=\"#2563eb\" stroke-width=\"3.5\" stroke-linecap=\"round\"/></svg>",
        "isCorrect": false,
        "distractorType": "incomplete_rule"
      },
      {
        "id": 5,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><line x1=\"20\" y1=\"20\" x2=\"20\" y2=\"60\" stroke=\"#6366f1\" stroke-width=\"3.5\" stroke-linecap=\"round\"/><line x1=\"60\" y1=\"20\" x2=\"60\" y2=\"60\" stroke=\"#6366f1\" stroke-width=\"3.5\" stroke-linecap=\"round\"/></svg>",
        "isCorrect": false,
        "distractorType": "incomplete_rule"
      },
      {
        "id": 6,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><line x1=\"20\" y1=\"40\" x2=\"60\" y2=\"40\" stroke=\"#2563eb\" stroke-width=\"3.5\" stroke-linecap=\"round\"/><line x1=\"20\" y1=\"20\" x2=\"20\" y2=\"60\" stroke=\"#6366f1\" stroke-width=\"3.5\" stroke-linecap=\"round\"/><line x1=\"60\" y1=\"20\" x2=\"60\" y2=\"60\" stroke=\"#6366f1\" stroke-width=\"3.5\" stroke-linecap=\"round\"/></svg>",
        "isCorrect": false,
        "distractorType": "rotation_error"
      }
    ],
    "a": 1.6,
    "b": 0.8,
    "explanation": "Across each row, Column 3 is governed by Boolean XOR logic: line segments present in only one cell are preserved, while overlapping segments common to both cells cancel out. The central horizontal bar cancels, leaving the perimeter box."
  },
  {
    "id": 15,
    "domain": "cube_nets",
    "promptSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 150\" class=\"w-full h-full max-w-[200px] mx-auto select-none\" fill=\"none\"><rect width=\"200\" height=\"150\" rx=\"10\" fill=\"#f4f4f5\" class=\"dark:fill-zinc-900\" stroke=\"#e4e4e7\" class=\"dark:stroke-zinc-800\" stroke-width=\"2\"/><rect x=\"60\" y=\"10\" width=\"40\" height=\"40\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"1.8\"/><g transform=\"translate(80,30)\"><path d=\"M0 -6 L0 6 M-4 2 L0 6 L4 2\" stroke=\"#2563eb\" stroke-width=\"2.5\" stroke-linecap=\"round\"/></g><rect x=\"20\" y=\"50\" width=\"40\" height=\"40\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"1.8\"/><g transform=\"translate(40,70)\"><path d=\"M-6 0 L6 0 M2 -4 L6 0 L2 4\" stroke=\"#2563eb\" stroke-width=\"2.5\" stroke-linecap=\"round\"/></g><rect x=\"60\" y=\"50\" width=\"40\" height=\"40\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"1.8\"/><g transform=\"translate(80,70)\"><path d=\"M0 6 L0 -6 M-4 -2 L0 -6 L4 -2\" stroke=\"#2563eb\" stroke-width=\"2.5\" stroke-linecap=\"round\"/></g><rect x=\"100\" y=\"50\" width=\"40\" height=\"40\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"1.8\"/><g transform=\"translate(120,70)\"><path d=\"M6 0 L-6 0 M-2 -4 L-6 0 L-2 4\" stroke=\"#2563eb\" stroke-width=\"2.5\" stroke-linecap=\"round\"/></g><rect x=\"140\" y=\"50\" width=\"40\" height=\"40\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"1.8\"/><g transform=\"translate(160,70)\"><rect x=\"-7\" y=\"-7\" width=\"14\" height=\"14\" fill=\"#a855f7\"/></g><rect x=\"60\" y=\"90\" width=\"40\" height=\"40\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"1.8\"/><g transform=\"translate(80,110)\"><circle cx=\"0\" cy=\"0\" r=\"7\" fill=\"#2563eb\"/></g></svg>",
    "options": [
      {
        "id": 1,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(-30,-30) scale(0.6)\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><path d=\"M0 -6 L0 6 M-4 2 L0 6 L4 2\" stroke=\"#2563eb\" stroke-width=\"2.5\" stroke-linecap=\"round\"/></g><g transform=\"translate(50,81.5)\"><path d=\"M0 6 L0 -6 M-4 -2 L0 -6 L4 -2\" stroke=\"#2563eb\" stroke-width=\"2.5\" stroke-linecap=\"round\"/></g><g transform=\"translate(90,81.5)\"><path d=\"M6 0 L-6 0 M-2 -4 L-6 0 L-2 4\" stroke=\"#2563eb\" stroke-width=\"2.5\" stroke-linecap=\"round\"/></g></svg></g></svg>",
        "isCorrect": true
      },
      {
        "id": 2,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(-30,-30) scale(0.6)\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><path d=\"M0 6 L0 -6 M-4 -2 L0 -6 L4 -2\" stroke=\"#2563eb\" stroke-width=\"2.5\" stroke-linecap=\"round\"/></g><g transform=\"translate(50,81.5)\"><path d=\"M0 -6 L0 6 M-4 2 L0 6 L4 2\" stroke=\"#2563eb\" stroke-width=\"2.5\" stroke-linecap=\"round\"/></g><g transform=\"translate(90,81.5)\"><path d=\"M-6 0 L6 0 M2 -4 L6 0 L2 4\" stroke=\"#2563eb\" stroke-width=\"2.5\" stroke-linecap=\"round\"/></g></svg></g></svg>",
        "isCorrect": false,
        "distractorType": "rotation_error"
      },
      {
        "id": 3,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(-30,-30) scale(0.6)\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><path d=\"M0 -6 L0 6 M-4 2 L0 6 L4 2\" stroke=\"#2563eb\" stroke-width=\"2.5\" stroke-linecap=\"round\"/></g><g transform=\"translate(50,81.5)\"><rect x=\"-7\" y=\"-7\" width=\"14\" height=\"14\" fill=\"#a855f7\"/></g><g transform=\"translate(90,81.5)\"><circle cx=\"0\" cy=\"0\" r=\"7\" fill=\"#2563eb\"/></g></svg></g></svg>",
        "isCorrect": false,
        "distractorType": "incomplete_rule"
      },
      {
        "id": 4,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(-30,-30) scale(0.6)\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><path d=\"M-6 0 L6 0 M2 -4 L6 0 L2 4\" stroke=\"#2563eb\" stroke-width=\"2.5\" stroke-linecap=\"round\"/></g><g transform=\"translate(50,81.5)\"><path d=\"M6 0 L-6 0 M-2 -4 L-6 0 L-2 4\" stroke=\"#2563eb\" stroke-width=\"2.5\" stroke-linecap=\"round\"/></g><g transform=\"translate(90,81.5)\"><rect x=\"-7\" y=\"-7\" width=\"14\" height=\"14\" fill=\"#a855f7\"/></g></svg></g></svg>",
        "isCorrect": false,
        "distractorType": "rotation_error"
      },
      {
        "id": 5,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(-30,-30) scale(0.6)\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><circle cx=\"0\" cy=\"0\" r=\"7\" fill=\"#2563eb\"/></g><g transform=\"translate(50,81.5)\"><path d=\"M0 6 L0 -6 M-4 -2 L0 -6 L4 -2\" stroke=\"#2563eb\" stroke-width=\"2.5\" stroke-linecap=\"round\"/></g><g transform=\"translate(90,81.5)\"><path d=\"M0 -6 L0 6 M-4 2 L0 6 L4 2\" stroke=\"#2563eb\" stroke-width=\"2.5\" stroke-linecap=\"round\"/></g></svg></g></svg>",
        "isCorrect": false,
        "distractorType": "feature_attraction"
      },
      {
        "id": 6,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(-30,-30) scale(0.6)\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><rect x=\"-7\" y=\"-7\" width=\"14\" height=\"14\" fill=\"#a855f7\"/></g><g transform=\"translate(50,81.5)\"><path d=\"M-6 0 L6 0 M2 -4 L6 0 L2 4\" stroke=\"#2563eb\" stroke-width=\"2.5\" stroke-linecap=\"round\"/></g><g transform=\"translate(90,81.5)\"><circle cx=\"0\" cy=\"0\" r=\"7\" fill=\"#2563eb\"/></g></svg></g></svg>",
        "isCorrect": false,
        "distractorType": "random"
      }
    ],
    "a": 1.65,
    "b": 1.0,
    "explanation": "When folding the T-net, the top wing arrow and center row arrows converge along the shared folded ridge, pointing directly toward each other."
  },
  {
    "id": 16,
    "domain": "matrix_reasoning",
    "promptSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 280 280\" class=\"w-full h-full max-w-[280px] mx-auto select-none\" fill=\"none\"><rect width=\"280\" height=\"280\" rx=\"12\" fill=\"#f4f4f5\" class=\"dark:fill-zinc-900\" stroke=\"#e4e4e7\" class=\"dark:stroke-zinc-800\" stroke-width=\"2\"/><line x1=\"93.3\" y1=\"0\" x2=\"93.3\" y2=\"280\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"2\"/><line x1=\"186.6\" y1=\"0\" x2=\"186.6\" y2=\"280\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"2\"/><line x1=\"0\" y1=\"93.3\" x2=\"280\" y2=\"93.3\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"2\"/><line x1=\"0\" y1=\"186.6\" x2=\"280\" y2=\"186.6\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"2\"/><g transform=\"translate(0,0)\"><g transform=\"translate(6.6,6.6)\"><rect x=\"18\" y=\"18\" width=\"44\" height=\"44\" rx=\"6\" stroke=\"#2563eb\" stroke-width=\"2\"  fill=\"none\"/><line x1=\"62.0\" y1=\"40.0\" x2=\"18.0\" y2=\"40.0\" stroke=\"#a855f7\" stroke-width=\"3\" stroke-linecap=\"round\"/><circle cx=\"28.0\" cy=\"40\" r=\"3\" fill=\"#2563eb\"/><circle cx=\"40.0\" cy=\"40\" r=\"3\" fill=\"#2563eb\"/><circle cx=\"52.0\" cy=\"40\" r=\"3\" fill=\"#2563eb\"/></g></g><g transform=\"translate(93.3,0)\"><g transform=\"translate(6.6,6.6)\"><rect x=\"18\" y=\"18\" width=\"44\" height=\"44\" rx=\"6\" stroke=\"#2563eb\" stroke-width=\"2\" stroke-dasharray=\"4 3\" fill=\"none\"/><line x1=\"55.6\" y1=\"55.6\" x2=\"24.4\" y2=\"24.4\" stroke=\"#a855f7\" stroke-width=\"3\" stroke-linecap=\"round\"/><circle cx=\"28.0\" cy=\"40\" r=\"3\" fill=\"#2563eb\"/><circle cx=\"40.0\" cy=\"40\" r=\"3\" fill=\"#2563eb\"/><circle cx=\"52.0\" cy=\"40\" r=\"3\" fill=\"#2563eb\"/></g></g><g transform=\"translate(186.6,0)\"><g transform=\"translate(6.6,6.6)\"><rect x=\"18\" y=\"18\" width=\"44\" height=\"44\" rx=\"6\" stroke=\"#2563eb\" stroke-width=\"2\" stroke-width=\"5\" fill=\"none\"/><line x1=\"40.0\" y1=\"62.0\" x2=\"40.0\" y2=\"18.0\" stroke=\"#a855f7\" stroke-width=\"3\" stroke-linecap=\"round\"/><circle cx=\"28.0\" cy=\"40\" r=\"3\" fill=\"#2563eb\"/><circle cx=\"40.0\" cy=\"40\" r=\"3\" fill=\"#2563eb\"/><circle cx=\"52.0\" cy=\"40\" r=\"3\" fill=\"#2563eb\"/></g></g><g transform=\"translate(0,93.3)\"><g transform=\"translate(6.6,6.6)\"><rect x=\"18\" y=\"18\" width=\"44\" height=\"44\" rx=\"6\" stroke=\"#2563eb\" stroke-width=\"2\" stroke-dasharray=\"4 3\" fill=\"none\"/><line x1=\"62.0\" y1=\"40.0\" x2=\"18.0\" y2=\"40.0\" stroke=\"#a855f7\" stroke-width=\"3\" stroke-linecap=\"round\"/><circle cx=\"34.0\" cy=\"40\" r=\"3\" fill=\"#2563eb\"/><circle cx=\"46.0\" cy=\"40\" r=\"3\" fill=\"#2563eb\"/></g></g><g transform=\"translate(93.3,93.3)\"><g transform=\"translate(6.6,6.6)\"><rect x=\"18\" y=\"18\" width=\"44\" height=\"44\" rx=\"6\" stroke=\"#2563eb\" stroke-width=\"2\" stroke-width=\"5\" fill=\"none\"/><line x1=\"55.6\" y1=\"55.6\" x2=\"24.4\" y2=\"24.4\" stroke=\"#a855f7\" stroke-width=\"3\" stroke-linecap=\"round\"/><circle cx=\"34.0\" cy=\"40\" r=\"3\" fill=\"#2563eb\"/><circle cx=\"46.0\" cy=\"40\" r=\"3\" fill=\"#2563eb\"/></g></g><g transform=\"translate(186.6,93.3)\"><g transform=\"translate(6.6,6.6)\"><rect x=\"18\" y=\"18\" width=\"44\" height=\"44\" rx=\"6\" stroke=\"#2563eb\" stroke-width=\"2\"  fill=\"none\"/><line x1=\"40.0\" y1=\"62.0\" x2=\"40.0\" y2=\"18.0\" stroke=\"#a855f7\" stroke-width=\"3\" stroke-linecap=\"round\"/><circle cx=\"34.0\" cy=\"40\" r=\"3\" fill=\"#2563eb\"/><circle cx=\"46.0\" cy=\"40\" r=\"3\" fill=\"#2563eb\"/></g></g><g transform=\"translate(0,186.6)\"><g transform=\"translate(6.6,6.6)\"><rect x=\"18\" y=\"18\" width=\"44\" height=\"44\" rx=\"6\" stroke=\"#2563eb\" stroke-width=\"2\" stroke-width=\"5\" fill=\"none\"/><line x1=\"62.0\" y1=\"40.0\" x2=\"18.0\" y2=\"40.0\" stroke=\"#a855f7\" stroke-width=\"3\" stroke-linecap=\"round\"/><circle cx=\"40.0\" cy=\"40\" r=\"3\" fill=\"#2563eb\"/></g></g><g transform=\"translate(93.3,186.6)\"><g transform=\"translate(6.6,6.6)\"><rect x=\"18\" y=\"18\" width=\"44\" height=\"44\" rx=\"6\" stroke=\"#2563eb\" stroke-width=\"2\"  fill=\"none\"/><line x1=\"55.6\" y1=\"55.6\" x2=\"24.4\" y2=\"24.4\" stroke=\"#a855f7\" stroke-width=\"3\" stroke-linecap=\"round\"/><circle cx=\"40.0\" cy=\"40\" r=\"3\" fill=\"#2563eb\"/></g></g><g transform=\"translate(186.6,186.6)\"><rect width=\"93.3\" height=\"93.3\" rx=\"8\" fill=\"#eff6ff\" class=\"dark:fill-blue-950/40\" stroke=\"#3b82f6\" stroke-width=\"2\" stroke-dasharray=\"4 3\"/><text x=\"46.6\" y=\"58\" font-family=\"sans-serif\" font-size=\"36\" font-weight=\"bold\" fill=\"#2563eb\" class=\"dark:fill-blue-400\" text-anchor=\"middle\">?</text></g></svg>",
    "options": [
      {
        "id": 1,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><rect x=\"18\" y=\"18\" width=\"44\" height=\"44\" rx=\"6\" stroke=\"#2563eb\" stroke-width=\"2\" stroke-dasharray=\"4 3\" fill=\"none\"/><line x1=\"40.0\" y1=\"62.0\" x2=\"40.0\" y2=\"18.0\" stroke=\"#a855f7\" stroke-width=\"3\" stroke-linecap=\"round\"/><circle cx=\"40.0\" cy=\"40\" r=\"3\" fill=\"#2563eb\"/></svg>",
        "isCorrect": true
      },
      {
        "id": 2,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><rect x=\"18\" y=\"18\" width=\"44\" height=\"44\" rx=\"6\" stroke=\"#2563eb\" stroke-width=\"2\" stroke-dasharray=\"4 3\" fill=\"none\"/><line x1=\"55.6\" y1=\"55.6\" x2=\"24.4\" y2=\"24.4\" stroke=\"#a855f7\" stroke-width=\"3\" stroke-linecap=\"round\"/><circle cx=\"40.0\" cy=\"40\" r=\"3\" fill=\"#2563eb\"/></svg>",
        "isCorrect": false,
        "distractorType": "rotation_error"
      },
      {
        "id": 3,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><rect x=\"18\" y=\"18\" width=\"44\" height=\"44\" rx=\"6\" stroke=\"#2563eb\" stroke-width=\"2\" stroke-dasharray=\"4 3\" fill=\"none\"/><line x1=\"40.0\" y1=\"62.0\" x2=\"40.0\" y2=\"18.0\" stroke=\"#a855f7\" stroke-width=\"3\" stroke-linecap=\"round\"/><circle cx=\"34.0\" cy=\"40\" r=\"3\" fill=\"#2563eb\"/><circle cx=\"46.0\" cy=\"40\" r=\"3\" fill=\"#2563eb\"/></svg>",
        "isCorrect": false,
        "distractorType": "incomplete_rule"
      },
      {
        "id": 4,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><rect x=\"18\" y=\"18\" width=\"44\" height=\"44\" rx=\"6\" stroke=\"#2563eb\" stroke-width=\"2\"  fill=\"none\"/><line x1=\"40.0\" y1=\"62.0\" x2=\"40.0\" y2=\"18.0\" stroke=\"#a855f7\" stroke-width=\"3\" stroke-linecap=\"round\"/><circle cx=\"40.0\" cy=\"40\" r=\"3\" fill=\"#2563eb\"/></svg>",
        "isCorrect": false,
        "distractorType": "incomplete_rule"
      },
      {
        "id": 5,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><rect x=\"18\" y=\"18\" width=\"44\" height=\"44\" rx=\"6\" stroke=\"#2563eb\" stroke-width=\"2\" stroke-dasharray=\"4 3\" fill=\"none\"/><line x1=\"62.0\" y1=\"40.0\" x2=\"18.0\" y2=\"40.0\" stroke=\"#a855f7\" stroke-width=\"3\" stroke-linecap=\"round\"/><circle cx=\"40.0\" cy=\"40\" r=\"3\" fill=\"#2563eb\"/></svg>",
        "isCorrect": false,
        "distractorType": "rotation_error"
      },
      {
        "id": 6,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><rect x=\"18\" y=\"18\" width=\"44\" height=\"44\" rx=\"6\" stroke=\"#2563eb\" stroke-width=\"2\" stroke-width=\"5\" fill=\"none\"/><line x1=\"40.0\" y1=\"62.0\" x2=\"40.0\" y2=\"18.0\" stroke=\"#a855f7\" stroke-width=\"3\" stroke-linecap=\"round\"/><circle cx=\"28.0\" cy=\"40\" r=\"3\" fill=\"#2563eb\"/><circle cx=\"40.0\" cy=\"40\" r=\"3\" fill=\"#2563eb\"/><circle cx=\"52.0\" cy=\"40\" r=\"3\" fill=\"#2563eb\"/></svg>",
        "isCorrect": false,
        "distractorType": "feature_attraction"
      }
    ],
    "a": 1.7,
    "b": 1.2,
    "explanation": "Three rules govern the matrix: the indicator bar rotates +45 degrees per column, dot count decrements by 1 per row, and border style permutes cyclically. The missing cell requires a vertical bar, 1 dot, and a dashed border."
  },
  {
    "id": 17,
    "domain": "cube_rotation",
    "promptSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><path d=\"M0 -3 C-6 -9 -10 -2 -5 3 L0 8 L5 3 C10 -2 6 -9 0 -3\" fill=\"#ef4444\"/></g><g transform=\"translate(50,81.5)\"><path d=\"M-6 -6 L6 -6 L6 2 C6 7 0 9 0 9 C0 9 -6 7 -6 2 Z\" fill=\"#3b82f6\"/></g><g transform=\"translate(90,81.5)\"><path d=\"M-8 0 L8 0 M0 -8 L0 8\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"3\" stroke-linecap=\"round\"/></g></svg>",
    "options": [
      {
        "id": 1,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(-30,-30) scale(0.6)\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><path d=\"M-8 0 L8 0 M0 -8 L0 8\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"3\" stroke-linecap=\"round\"/></g><g transform=\"translate(50,81.5)\"><path d=\"M0 -3 C-6 -9 -10 -2 -5 3 L0 8 L5 3 C10 -2 6 -9 0 -3\" fill=\"#ef4444\"/></g><g transform=\"translate(90,81.5)\"><path d=\"M-6 -6 L6 -6 L6 2 C6 7 0 9 0 9 C0 9 -6 7 -6 2 Z\" fill=\"#3b82f6\"/></g></svg></g></svg>",
        "isCorrect": true
      },
      {
        "id": 2,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(-30,-30) scale(0.6)\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><path d=\"M-6 -6 L6 -6 L6 2 C6 7 0 9 0 9 C0 9 -6 7 -6 2 Z\" fill=\"#3b82f6\"/></g><g transform=\"translate(50,81.5)\"><path d=\"M-8 0 L8 0 M0 -8 L0 8\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"3\" stroke-linecap=\"round\"/></g><g transform=\"translate(90,81.5)\"><path d=\"M0 -3 C-6 -9 -10 -2 -5 3 L0 8 L5 3 C10 -2 6 -9 0 -3\" fill=\"#ef4444\"/></g></svg></g></svg>",
        "isCorrect": false,
        "distractorType": "rotation_error"
      },
      {
        "id": 3,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(-30,-30) scale(0.6)\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><path d=\"M0 -3 C-6 -9 -10 -2 -5 3 L0 8 L5 3 C10 -2 6 -9 0 -3\" fill=\"#ef4444\"/></g><g transform=\"translate(50,81.5)\"><path d=\"M-8 0 L8 0 M0 -8 L0 8\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"3\" stroke-linecap=\"round\"/></g><g transform=\"translate(90,81.5)\"><path d=\"M-6 -6 L6 -6 L6 2 C6 7 0 9 0 9 C0 9 -6 7 -6 2 Z\" fill=\"#3b82f6\"/></g></svg></g></svg>",
        "isCorrect": false,
        "distractorType": "rotation_error"
      },
      {
        "id": 4,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(-30,-30) scale(0.6)\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><path d=\"M-8 0 L8 0 M0 -8 L0 8\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"3\" stroke-linecap=\"round\"/></g><g transform=\"translate(50,81.5)\"><path d=\"M-6 -6 L6 -6 L6 2 C6 7 0 9 0 9 C0 9 -6 7 -6 2 Z\" fill=\"#3b82f6\"/></g><g transform=\"translate(90,81.5)\"><path d=\"M0 -3 C-6 -9 -10 -2 -5 3 L0 8 L5 3 C10 -2 6 -9 0 -3\" fill=\"#ef4444\"/></g></svg></g></svg>",
        "isCorrect": false,
        "distractorType": "incomplete_rule"
      },
      {
        "id": 5,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(-30,-30) scale(0.6)\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><path d=\"M0 -3 C-6 -9 -10 -2 -5 3 L0 8 L5 3 C10 -2 6 -9 0 -3\" fill=\"#ef4444\"/></g><g transform=\"translate(50,81.5)\"><path d=\"M-6 -6 L6 -6 L6 2 C6 7 0 9 0 9 C0 9 -6 7 -6 2 Z\" fill=\"#3b82f6\"/></g><g transform=\"translate(90,81.5)\"><path d=\"M-8 0 L8 0 M0 -8 L0 8\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"3\" stroke-linecap=\"round\"/></g></svg></g></svg>",
        "isCorrect": false,
        "distractorType": "feature_attraction"
      },
      {
        "id": 6,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(-30,-30) scale(0.6)\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><polygon points=\"0,-8 2,-2 8,-2 3,2 5,8 0,4 -5,8 -3,2 -8,-2 -2,-2\" fill=\"#f59e0b\"/></g><g transform=\"translate(50,81.5)\"><path d=\"M0 -3 C-6 -9 -10 -2 -5 3 L0 8 L5 3 C10 -2 6 -9 0 -3\" fill=\"#ef4444\"/></g><g transform=\"translate(90,81.5)\"><path d=\"M-6 -6 L6 -6 L6 2 C6 7 0 9 0 9 C0 9 -6 7 -6 2 Z\" fill=\"#3b82f6\"/></g></svg></g></svg>",
        "isCorrect": false,
        "distractorType": "random"
      }
    ],
    "a": 1.7,
    "b": 1.4,
    "explanation": "A 120 degree corner triad rotation around the principal diagonal cycles the visible faces: Cross moves to Top, Heart moves to Front, and Shield moves to Right."
  },
  {
    "id": 18,
    "domain": "matrix_reasoning",
    "promptSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 280 280\" class=\"w-full h-full max-w-[280px] mx-auto select-none\" fill=\"none\"><rect width=\"280\" height=\"280\" rx=\"12\" fill=\"#f4f4f5\" class=\"dark:fill-zinc-900\" stroke=\"#e4e4e7\" class=\"dark:stroke-zinc-800\" stroke-width=\"2\"/><line x1=\"93.3\" y1=\"0\" x2=\"93.3\" y2=\"280\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"2\"/><line x1=\"186.6\" y1=\"0\" x2=\"186.6\" y2=\"280\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"2\"/><line x1=\"0\" y1=\"93.3\" x2=\"280\" y2=\"93.3\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"2\"/><line x1=\"0\" y1=\"186.6\" x2=\"280\" y2=\"186.6\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"2\"/><g transform=\"translate(0,0)\"><g transform=\"translate(6.6,6.6)\"><line x1=\"20\" y1=\"20\" x2=\"60\" y2=\"20\" stroke=\"#2563eb\" stroke-width=\"3.5\"/><line x1=\"20\" y1=\"40\" x2=\"60\" y2=\"40\" stroke=\"#2563eb\" stroke-width=\"3.5\"/><line x1=\"20\" y1=\"20\" x2=\"20\" y2=\"60\" stroke=\"#2563eb\" stroke-width=\"3.5\"/></g></g><g transform=\"translate(93.3,0)\"><g transform=\"translate(6.6,6.6)\"><line x1=\"20\" y1=\"40\" x2=\"60\" y2=\"40\" stroke=\"#2563eb\" stroke-width=\"3.5\"/><line x1=\"20\" y1=\"60\" x2=\"60\" y2=\"60\" stroke=\"#2563eb\" stroke-width=\"3.5\"/><line x1=\"20\" y1=\"20\" x2=\"20\" y2=\"60\" stroke=\"#2563eb\" stroke-width=\"3.5\"/></g></g><g transform=\"translate(186.6,0)\"><g transform=\"translate(6.6,6.6)\"><line x1=\"20\" y1=\"40\" x2=\"60\" y2=\"40\" stroke=\"#2563eb\" stroke-width=\"3.5\"/><line x1=\"20\" y1=\"20\" x2=\"20\" y2=\"60\" stroke=\"#2563eb\" stroke-width=\"3.5\"/></g></g><g transform=\"translate(0,93.3)\"><g transform=\"translate(6.6,6.6)\"><circle cx=\"30\" cy=\"40\" r=\"16\" stroke=\"#a855f7\" stroke-width=\"3\" fill=\"none\"/><circle cx=\"50\" cy=\"40\" r=\"16\" stroke=\"#a855f7\" stroke-width=\"3\" fill=\"none\"/></g></g><g transform=\"translate(93.3,93.3)\"><g transform=\"translate(6.6,6.6)\"><circle cx=\"30\" cy=\"40\" r=\"16\" stroke=\"#a855f7\" stroke-width=\"3\" fill=\"none\"/><line x1=\"40\" y1=\"20\" x2=\"40\" y2=\"60\" stroke=\"#a855f7\" stroke-width=\"3\"/></g></g><g transform=\"translate(186.6,93.3)\"><g transform=\"translate(6.6,6.6)\"><circle cx=\"30\" cy=\"40\" r=\"16\" stroke=\"#a855f7\" stroke-width=\"3\" fill=\"none\"/></g></g><g transform=\"translate(0,186.6)\"><g transform=\"translate(6.6,6.6)\"><polygon points=\"40,16 64,64 16,64\" stroke=\"#10b981\" stroke-width=\"3\" fill=\"none\"/><line x1=\"40\" y1=\"16\" x2=\"40\" y2=\"64\" stroke=\"#10b981\" stroke-width=\"3\"/></g></g><g transform=\"translate(93.3,186.6)\"><g transform=\"translate(6.6,6.6)\"><line x1=\"40\" y1=\"16\" x2=\"40\" y2=\"64\" stroke=\"#10b981\" stroke-width=\"3\"/><line x1=\"24\" y1=\"40\" x2=\"56\" y2=\"40\" stroke=\"#10b981\" stroke-width=\"3\"/></g></g><g transform=\"translate(186.6,186.6)\"><rect width=\"93.3\" height=\"93.3\" rx=\"8\" fill=\"#eff6ff\" class=\"dark:fill-blue-950/40\" stroke=\"#3b82f6\" stroke-width=\"2\" stroke-dasharray=\"4 3\"/><text x=\"46.6\" y=\"58\" font-family=\"sans-serif\" font-size=\"36\" font-weight=\"bold\" fill=\"#2563eb\" class=\"dark:fill-blue-400\" text-anchor=\"middle\">?</text></g></svg>",
    "options": [
      {
        "id": 1,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><line x1=\"40\" y1=\"16\" x2=\"40\" y2=\"64\" stroke=\"#10b981\" stroke-width=\"3\"/></svg>",
        "isCorrect": true
      },
      {
        "id": 2,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><polygon points=\"40,16 64,64 16,64\" stroke=\"#10b981\" stroke-width=\"3\" fill=\"none\"/><line x1=\"40\" y1=\"16\" x2=\"40\" y2=\"64\" stroke=\"#10b981\" stroke-width=\"3\"/></svg>",
        "isCorrect": false,
        "distractorType": "feature_attraction"
      },
      {
        "id": 3,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><line x1=\"40\" y1=\"16\" x2=\"40\" y2=\"64\" stroke=\"#10b981\" stroke-width=\"3\"/><line x1=\"24\" y1=\"40\" x2=\"56\" y2=\"40\" stroke=\"#10b981\" stroke-width=\"3\"/></svg>",
        "isCorrect": false,
        "distractorType": "feature_attraction"
      },
      {
        "id": 4,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><line x1=\"24\" y1=\"40\" x2=\"56\" y2=\"40\" stroke=\"#10b981\" stroke-width=\"3\"/></svg>",
        "isCorrect": false,
        "distractorType": "incomplete_rule"
      },
      {
        "id": 5,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><polygon points=\"40,16 64,64 16,64\" stroke=\"#10b981\" stroke-width=\"3\" fill=\"none\"/><line x1=\"40\" y1=\"16\" x2=\"40\" y2=\"64\" stroke=\"#10b981\" stroke-width=\"3\"/><line x1=\"40\" y1=\"16\" x2=\"40\" y2=\"64\" stroke=\"#10b981\" stroke-width=\"3\"/><line x1=\"24\" y1=\"40\" x2=\"56\" y2=\"40\" stroke=\"#10b981\" stroke-width=\"3\"/></svg>",
        "isCorrect": false,
        "distractorType": "cancellation_error"
      },
      {
        "id": 6,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><circle cx=\"40\" cy=\"40\" r=\"8\" fill=\"#10b981\"/></svg>",
        "isCorrect": false,
        "distractorType": "random"
      }
    ],
    "a": 1.75,
    "b": 1.6,
    "explanation": "Under Boolean AND logic, only geometric elements present simultaneously in both Column 1 and Column 2 are retained in Column 3. The vertical bisector is the sole overlapping element."
  },
  {
    "id": 19,
    "domain": "cube_nets",
    "promptSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 150\" class=\"w-full h-full max-w-[200px] mx-auto select-none\" fill=\"none\"><rect width=\"200\" height=\"150\" rx=\"10\" fill=\"#f4f4f5\" class=\"dark:fill-zinc-900\" stroke=\"#e4e4e7\" class=\"dark:stroke-zinc-800\" stroke-width=\"2\"/><rect x=\"60\" y=\"10\" width=\"40\" height=\"40\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"1.8\"/><g transform=\"translate(80,30)\"><path d=\"M-6 -6 L-6 6 L6 6\" stroke=\"#2563eb\" stroke-width=\"3.5\" fill=\"none\" stroke-linecap=\"round\"/></g><rect x=\"20\" y=\"50\" width=\"40\" height=\"40\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"1.8\"/><g transform=\"translate(40,70)\"><polygon points=\"-7,-7 7,-7 -7,7\" fill=\"#6366f1\"/></g><rect x=\"60\" y=\"50\" width=\"40\" height=\"40\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"1.8\"/><g transform=\"translate(80,70)\"><circle cx=\"-5\" cy=\"-5\" r=\"4\" fill=\"#a855f7\"/></g><rect x=\"100\" y=\"50\" width=\"40\" height=\"40\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"1.8\"/><g transform=\"translate(120,70)\"><circle cx=\"-4\" cy=\"0\" r=\"3.5\" fill=\"#18181b\" class=\"dark:fill-zinc-200\"/><circle cx=\"4\" cy=\"0\" r=\"3.5\" fill=\"#18181b\" class=\"dark:fill-zinc-200\"/></g><rect x=\"140\" y=\"50\" width=\"40\" height=\"40\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"1.8\"/><g transform=\"translate(160,70)\"><path d=\"M-7 0 L7 0 M0 -7 L0 7\" stroke=\"#dc2626\" stroke-width=\"3.5\" stroke-linecap=\"round\"/></g><rect x=\"60\" y=\"90\" width=\"40\" height=\"40\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"1.8\"/><g transform=\"translate(80,110)\"><line x1=\"-7\" y1=\"7\" x2=\"7\" y2=\"-7\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"3\" stroke-linecap=\"round\"/></g></svg>",
    "options": [
      {
        "id": 1,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(-30,-30) scale(0.6)\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><path d=\"M-6 -6 L-6 6 L6 6\" stroke=\"#2563eb\" stroke-width=\"3.5\" fill=\"none\" stroke-linecap=\"round\"/></g><g transform=\"translate(50,81.5)\"><circle cx=\"-5\" cy=\"-5\" r=\"4\" fill=\"#a855f7\"/></g><g transform=\"translate(90,81.5)\"><circle cx=\"-4\" cy=\"0\" r=\"3.5\" fill=\"#18181b\" class=\"dark:fill-zinc-200\"/><circle cx=\"4\" cy=\"0\" r=\"3.5\" fill=\"#18181b\" class=\"dark:fill-zinc-200\"/></g></svg></g></svg>",
        "isCorrect": true
      },
      {
        "id": 2,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(-30,-30) scale(0.6)\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><path d=\"M-6 -6 L-6 6 L6 6\" stroke=\"#2563eb\" stroke-width=\"3.5\" fill=\"none\" stroke-linecap=\"round\"/></g><g transform=\"translate(50,81.5)\"><circle cx=\"-4\" cy=\"0\" r=\"3.5\" fill=\"#18181b\" class=\"dark:fill-zinc-200\"/><circle cx=\"4\" cy=\"0\" r=\"3.5\" fill=\"#18181b\" class=\"dark:fill-zinc-200\"/></g><g transform=\"translate(90,81.5)\"><circle cx=\"-5\" cy=\"-5\" r=\"4\" fill=\"#a855f7\"/></g></svg></g></svg>",
        "isCorrect": false,
        "distractorType": "rotation_error"
      },
      {
        "id": 3,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(-30,-30) scale(0.6)\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><polygon points=\"-7,-7 7,-7 -7,7\" fill=\"#6366f1\"/></g><g transform=\"translate(50,81.5)\"><circle cx=\"-4\" cy=\"0\" r=\"3.5\" fill=\"#18181b\" class=\"dark:fill-zinc-200\"/><circle cx=\"4\" cy=\"0\" r=\"3.5\" fill=\"#18181b\" class=\"dark:fill-zinc-200\"/></g><g transform=\"translate(90,81.5)\"><path d=\"M-7 0 L7 0 M0 -7 L0 7\" stroke=\"#dc2626\" stroke-width=\"3.5\" stroke-linecap=\"round\"/></g></svg></g></svg>",
        "isCorrect": false,
        "distractorType": "incomplete_rule"
      },
      {
        "id": 4,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(-30,-30) scale(0.6)\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><path d=\"M-6 -6 L-6 6 L6 6\" stroke=\"#2563eb\" stroke-width=\"3.5\" fill=\"none\" stroke-linecap=\"round\"/></g><g transform=\"translate(50,81.5)\"><path d=\"M-7 0 L7 0 M0 -7 L0 7\" stroke=\"#dc2626\" stroke-width=\"3.5\" stroke-linecap=\"round\"/></g><g transform=\"translate(90,81.5)\"><line x1=\"-7\" y1=\"7\" x2=\"7\" y2=\"-7\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"3\" stroke-linecap=\"round\"/></g></svg></g></svg>",
        "isCorrect": false,
        "distractorType": "feature_attraction"
      },
      {
        "id": 5,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(-30,-30) scale(0.6)\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><circle cx=\"-5\" cy=\"-5\" r=\"4\" fill=\"#a855f7\"/></g><g transform=\"translate(50,81.5)\"><polygon points=\"-7,-7 7,-7 -7,7\" fill=\"#6366f1\"/></g><g transform=\"translate(90,81.5)\"><circle cx=\"-4\" cy=\"0\" r=\"3.5\" fill=\"#18181b\" class=\"dark:fill-zinc-200\"/><circle cx=\"4\" cy=\"0\" r=\"3.5\" fill=\"#18181b\" class=\"dark:fill-zinc-200\"/></g></svg></g></svg>",
        "isCorrect": false,
        "distractorType": "rotation_error"
      },
      {
        "id": 6,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(-30,-30) scale(0.6)\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><line x1=\"-7\" y1=\"7\" x2=\"7\" y2=\"-7\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"3\" stroke-linecap=\"round\"/></g><g transform=\"translate(50,81.5)\"><path d=\"M-6 -6 L-6 6 L6 6\" stroke=\"#2563eb\" stroke-width=\"3.5\" fill=\"none\" stroke-linecap=\"round\"/></g><g transform=\"translate(90,81.5)\"><circle cx=\"-5\" cy=\"-5\" r=\"4\" fill=\"#a855f7\"/></g></svg></g></svg>",
        "isCorrect": false,
        "distractorType": "random"
      }
    ],
    "a": 1.8,
    "b": 1.8,
    "explanation": "Folding this asymmetric net confirms that the L-bracket, corner pip, and dual dot faces share a common corner vertex with consistent cyclic alignment."
  },
  {
    "id": 20,
    "domain": "cube_rotation",
    "promptSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><path d=\"M-6 -6 L-6 6 L6 6\" stroke=\"#2563eb\" stroke-width=\"3.5\" fill=\"none\" stroke-linecap=\"round\"/></g><g transform=\"translate(50,81.5)\"><line x1=\"-7\" y1=\"7\" x2=\"7\" y2=\"-7\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"3\" stroke-linecap=\"round\"/></g><g transform=\"translate(90,81.5)\"><polygon points=\"-7,-7 7,-7 -7,7\" fill=\"#6366f1\"/></g></svg>",
    "options": [
      {
        "id": 1,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(-30,-30) scale(0.6)\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><polygon points=\"-7,-7 7,-7 -7,7\" fill=\"#6366f1\"/></g><g transform=\"translate(50,81.5)\"><path d=\"M-6 -6 L-6 6 L6 6\" stroke=\"#2563eb\" stroke-width=\"3.5\" fill=\"none\" stroke-linecap=\"round\"/></g><g transform=\"translate(90,81.5)\"><line x1=\"-7\" y1=\"-7\" x2=\"7\" y2=\"7\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"3\" stroke-linecap=\"round\"/></g></svg></g></svg>",
        "isCorrect": true
      },
      {
        "id": 2,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(-30,-30) scale(0.6)\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><polygon points=\"-7,-7 7,-7 -7,7\" fill=\"#6366f1\"/></g><g transform=\"translate(50,81.5)\"><line x1=\"-7\" y1=\"-7\" x2=\"7\" y2=\"7\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"3\" stroke-linecap=\"round\"/></g><g transform=\"translate(90,81.5)\"><path d=\"M-6 -6 L-6 6 L6 6\" stroke=\"#2563eb\" stroke-width=\"3.5\" fill=\"none\" stroke-linecap=\"round\"/></g></svg></g></svg>",
        "isCorrect": false,
        "distractorType": "rotation_error"
      },
      {
        "id": 3,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(-30,-30) scale(0.6)\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><path d=\"M-6 -6 L-6 6 L6 6\" stroke=\"#2563eb\" stroke-width=\"3.5\" fill=\"none\" stroke-linecap=\"round\"/></g><g transform=\"translate(50,81.5)\"><polygon points=\"-7,-7 7,-7 -7,7\" fill=\"#6366f1\"/></g><g transform=\"translate(90,81.5)\"><line x1=\"-7\" y1=\"7\" x2=\"7\" y2=\"-7\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"3\" stroke-linecap=\"round\"/></g></svg></g></svg>",
        "isCorrect": false,
        "distractorType": "incomplete_rule"
      },
      {
        "id": 4,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(-30,-30) scale(0.6)\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><path d=\"M-6 -6 L-6 6 L6 6\" stroke=\"#2563eb\" stroke-width=\"3.5\" fill=\"none\" stroke-linecap=\"round\"/></g><g transform=\"translate(50,81.5)\"><line x1=\"-7\" y1=\"7\" x2=\"7\" y2=\"-7\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"3\" stroke-linecap=\"round\"/></g><g transform=\"translate(90,81.5)\"><polygon points=\"-7,-7 7,-7 -7,7\" fill=\"#6366f1\"/></g></svg></g></svg>",
        "isCorrect": false,
        "distractorType": "feature_attraction"
      },
      {
        "id": 5,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(-30,-30) scale(0.6)\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><line x1=\"-7\" y1=\"-7\" x2=\"7\" y2=\"7\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"3\" stroke-linecap=\"round\"/></g><g transform=\"translate(50,81.5)\"><path d=\"M-6 -6 L-6 6 L6 6\" stroke=\"#2563eb\" stroke-width=\"3.5\" fill=\"none\" stroke-linecap=\"round\"/></g><g transform=\"translate(90,81.5)\"><polygon points=\"-7,-7 7,-7 -7,7\" fill=\"#6366f1\"/></g></svg></g></svg>",
        "isCorrect": false,
        "distractorType": "rotation_error"
      },
      {
        "id": 6,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(-30,-30) scale(0.6)\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><path d=\"M-8 0 L8 0 M0 -8 L0 8\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"3\" stroke-linecap=\"round\"/></g><g transform=\"translate(50,81.5)\"><path d=\"M-6 -6 L-6 6 L6 6\" stroke=\"#2563eb\" stroke-width=\"3.5\" fill=\"none\" stroke-linecap=\"round\"/></g><g transform=\"translate(90,81.5)\"><line x1=\"-7\" y1=\"7\" x2=\"7\" y2=\"-7\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"3\" stroke-linecap=\"round\"/></g></svg></g></svg>",
        "isCorrect": false,
        "distractorType": "random"
      }
    ],
    "a": 1.85,
    "b": 2.0,
    "explanation": "Validating this complex 3D rotation requires matching chiral handedness. Option 1 is the unique rigid rotation without mirror reflection."
  },
  {
    "id": 21,
    "domain": "cube_rotation",
    "promptSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><path d=\"M-6 -6 L6 -6 L6 2 C6 7 0 9 0 9 C0 9 -6 7 -6 2 Z\" fill=\"#3b82f6\"/></g><g transform=\"translate(50,81.5)\"><path d=\"M0 -3 C-6 -9 -10 -2 -5 3 L0 8 L5 3 C10 -2 6 -9 0 -3\" fill=\"#ef4444\"/></g><g transform=\"translate(90,81.5)\"><circle cx=\"-4\" cy=\"0\" r=\"3.5\" fill=\"#18181b\" class=\"dark:fill-zinc-200\"/><circle cx=\"4\" cy=\"0\" r=\"3.5\" fill=\"#18181b\" class=\"dark:fill-zinc-200\"/></g></svg>",
    "options": [
      {
        "id": 1,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(-30,-30) scale(0.6)\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><circle cx=\"-4\" cy=\"0\" r=\"3.5\" fill=\"#18181b\" class=\"dark:fill-zinc-200\"/><circle cx=\"4\" cy=\"0\" r=\"3.5\" fill=\"#18181b\" class=\"dark:fill-zinc-200\"/></g><g transform=\"translate(50,81.5)\"><path d=\"M-6 -6 L6 -6 L6 2 C6 7 0 9 0 9 C0 9 -6 7 -6 2 Z\" fill=\"#3b82f6\"/></g><g transform=\"translate(90,81.5)\"><path d=\"M0 -3 C-6 -9 -10 -2 -5 3 L0 8 L5 3 C10 -2 6 -9 0 -3\" fill=\"#ef4444\"/></g></svg></g></svg>",
        "isCorrect": true
      },
      {
        "id": 2,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(-30,-30) scale(0.6)\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><path d=\"M0 -3 C-6 -9 -10 -2 -5 3 L0 8 L5 3 C10 -2 6 -9 0 -3\" fill=\"#ef4444\"/></g><g transform=\"translate(50,81.5)\"><path d=\"M-6 -6 L6 -6 L6 2 C6 7 0 9 0 9 C0 9 -6 7 -6 2 Z\" fill=\"#3b82f6\"/></g><g transform=\"translate(90,81.5)\"><circle cx=\"-4\" cy=\"0\" r=\"3.5\" fill=\"#18181b\" class=\"dark:fill-zinc-200\"/><circle cx=\"4\" cy=\"0\" r=\"3.5\" fill=\"#18181b\" class=\"dark:fill-zinc-200\"/></g></svg></g></svg>",
        "isCorrect": false,
        "distractorType": "rotation_error"
      },
      {
        "id": 3,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(-30,-30) scale(0.6)\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><circle cx=\"-4\" cy=\"0\" r=\"3.5\" fill=\"#18181b\" class=\"dark:fill-zinc-200\"/><circle cx=\"4\" cy=\"0\" r=\"3.5\" fill=\"#18181b\" class=\"dark:fill-zinc-200\"/></g><g transform=\"translate(50,81.5)\"><path d=\"M0 -3 C-6 -9 -10 -2 -5 3 L0 8 L5 3 C10 -2 6 -9 0 -3\" fill=\"#ef4444\"/></g><g transform=\"translate(90,81.5)\"><path d=\"M-6 -6 L6 -6 L6 2 C6 7 0 9 0 9 C0 9 -6 7 -6 2 Z\" fill=\"#3b82f6\"/></g></svg></g></svg>",
        "isCorrect": false,
        "distractorType": "rotation_error"
      },
      {
        "id": 4,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(-30,-30) scale(0.6)\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><path d=\"M-6 -6 L6 -6 L6 2 C6 7 0 9 0 9 C0 9 -6 7 -6 2 Z\" fill=\"#3b82f6\"/></g><g transform=\"translate(50,81.5)\"><circle cx=\"-4\" cy=\"0\" r=\"3.5\" fill=\"#18181b\" class=\"dark:fill-zinc-200\"/><circle cx=\"4\" cy=\"0\" r=\"3.5\" fill=\"#18181b\" class=\"dark:fill-zinc-200\"/></g><g transform=\"translate(90,81.5)\"><path d=\"M0 -3 C-6 -9 -10 -2 -5 3 L0 8 L5 3 C10 -2 6 -9 0 -3\" fill=\"#ef4444\"/></g></svg></g></svg>",
        "isCorrect": false,
        "distractorType": "incomplete_rule"
      },
      {
        "id": 5,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(-30,-30) scale(0.6)\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><polygon points=\"0,-8 2,-2 8,-2 3,2 5,8 0,4 -5,8 -3,2 -8,-2 -2,-2\" fill=\"#f59e0b\"/></g><g transform=\"translate(50,81.5)\"><path d=\"M-6 -6 L6 -6 L6 2 C6 7 0 9 0 9 C0 9 -6 7 -6 2 Z\" fill=\"#3b82f6\"/></g><g transform=\"translate(90,81.5)\"><path d=\"M0 -3 C-6 -9 -10 -2 -5 3 L0 8 L5 3 C10 -2 6 -9 0 -3\" fill=\"#ef4444\"/></g></svg></g></svg>",
        "isCorrect": false,
        "distractorType": "random"
      },
      {
        "id": 6,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><g transform=\"translate(-30,-30) scale(0.6)\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 140 140\" class=\"w-full h-full max-w-[140px] mx-auto select-none\" fill=\"none\"><polygon points=\"70,25 110,48 70,70 30,48\" fill=\"#ffffff\" class=\"dark:fill-zinc-800\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"30,48 70,70 70,115 30,93\" fill=\"#e4e4e7\" class=\"dark:fill-zinc-900\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><polygon points=\"70,70 110,48 110,93 70,115\" fill=\"#d4d4d8\" class=\"dark:fill-zinc-950\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g transform=\"translate(70,47.5)\"><path d=\"M-6 -6 L6 -6 L6 2 C6 7 0 9 0 9 C0 9 -6 7 -6 2 Z\" fill=\"#3b82f6\"/></g><g transform=\"translate(50,81.5)\"><path d=\"M0 -3 C-6 -9 -10 -2 -5 3 L0 8 L5 3 C10 -2 6 -9 0 -3\" fill=\"#ef4444\"/></g><g transform=\"translate(90,81.5)\"><circle cx=\"-4\" cy=\"0\" r=\"3.5\" fill=\"#18181b\" class=\"dark:fill-zinc-200\"/><circle cx=\"4\" cy=\"0\" r=\"3.5\" fill=\"#18181b\" class=\"dark:fill-zinc-200\"/></g></svg></g></svg>",
        "isCorrect": false,
        "distractorType": "feature_attraction"
      }
    ],
    "a": 1.85,
    "b": 2.15,
    "explanation": "Rotating around the diagonal isometric axis brings the dual dots to the top while shifting the shield to the front and the heart to the right."
  },
  {
    "id": 22,
    "domain": "matrix_reasoning",
    "promptSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 280 280\" class=\"w-full h-full max-w-[280px] mx-auto select-none\" fill=\"none\"><rect width=\"280\" height=\"280\" rx=\"12\" fill=\"#f4f4f5\" class=\"dark:fill-zinc-900\" stroke=\"#e4e4e7\" class=\"dark:stroke-zinc-800\" stroke-width=\"2\"/><line x1=\"93.3\" y1=\"0\" x2=\"93.3\" y2=\"280\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"2\"/><line x1=\"186.6\" y1=\"0\" x2=\"186.6\" y2=\"280\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"2\"/><line x1=\"0\" y1=\"93.3\" x2=\"280\" y2=\"93.3\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"2\"/><line x1=\"0\" y1=\"186.6\" x2=\"280\" y2=\"186.6\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"2\"/><g transform=\"translate(0,0)\"><g transform=\"translate(6.6,6.6)\"><rect x=\"18\" y=\"18\" width=\"20\" height=\"20\" fill=\"#2563eb\"/><rect x=\"42\" y=\"18\" width=\"20\" height=\"20\" fill=\"#6366f1\"/></g></g><g transform=\"translate(93.3,0)\"><g transform=\"translate(6.6,6.6)\"><rect x=\"42\" y=\"18\" width=\"20\" height=\"20\" fill=\"#6366f1\"/><rect x=\"42\" y=\"42\" width=\"20\" height=\"20\" fill=\"#a855f7\"/></g></g><g transform=\"translate(186.6,0)\"><g transform=\"translate(6.6,6.6)\"><rect x=\"18\" y=\"18\" width=\"20\" height=\"20\" fill=\"#2563eb\"/><rect x=\"42\" y=\"42\" width=\"20\" height=\"20\" fill=\"#a855f7\"/></g></g><g transform=\"translate(0,93.3)\"><g transform=\"translate(6.6,6.6)\"><rect x=\"42\" y=\"18\" width=\"20\" height=\"20\" fill=\"#6366f1\"/><rect x=\"18\" y=\"42\" width=\"20\" height=\"20\" fill=\"#ec4899\"/></g></g><g transform=\"translate(93.3,93.3)\"><g transform=\"translate(6.6,6.6)\"><rect x=\"18\" y=\"42\" width=\"20\" height=\"20\" fill=\"#ec4899\"/><rect x=\"42\" y=\"42\" width=\"20\" height=\"20\" fill=\"#a855f7\"/></g></g><g transform=\"translate(186.6,93.3)\"><g transform=\"translate(6.6,6.6)\"><rect x=\"42\" y=\"18\" width=\"20\" height=\"20\" fill=\"#6366f1\"/><rect x=\"42\" y=\"42\" width=\"20\" height=\"20\" fill=\"#a855f7\"/></g></g><g transform=\"translate(0,186.6)\"><g transform=\"translate(6.6,6.6)\"><rect x=\"18\" y=\"18\" width=\"20\" height=\"20\" fill=\"#2563eb\"/><rect x=\"18\" y=\"42\" width=\"20\" height=\"20\" fill=\"#ec4899\"/><rect x=\"42\" y=\"18\" width=\"20\" height=\"20\" fill=\"#6366f1\"/></g></g><g transform=\"translate(93.3,186.6)\"><g transform=\"translate(6.6,6.6)\"><rect x=\"42\" y=\"18\" width=\"20\" height=\"20\" fill=\"#6366f1\"/><rect x=\"42\" y=\"42\" width=\"20\" height=\"20\" fill=\"#a855f7\"/><rect x=\"18\" y=\"42\" width=\"20\" height=\"20\" fill=\"#ec4899\"/></g></g><g transform=\"translate(186.6,186.6)\"><rect width=\"93.3\" height=\"93.3\" rx=\"8\" fill=\"#eff6ff\" class=\"dark:fill-blue-950/40\" stroke=\"#3b82f6\" stroke-width=\"2\" stroke-dasharray=\"4 3\"/><text x=\"46.6\" y=\"58\" font-family=\"sans-serif\" font-size=\"36\" font-weight=\"bold\" fill=\"#2563eb\" class=\"dark:fill-blue-400\" text-anchor=\"middle\">?</text></g></svg>",
    "options": [
      {
        "id": 1,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><rect x=\"18\" y=\"18\" width=\"20\" height=\"20\" fill=\"#2563eb\"/><rect x=\"42\" y=\"42\" width=\"20\" height=\"20\" fill=\"#a855f7\"/></svg>",
        "isCorrect": true
      },
      {
        "id": 2,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><rect x=\"18\" y=\"18\" width=\"20\" height=\"20\" fill=\"#2563eb\"/><rect x=\"42\" y=\"18\" width=\"20\" height=\"20\" fill=\"#6366f1\"/><rect x=\"42\" y=\"42\" width=\"20\" height=\"20\" fill=\"#a855f7\"/><rect x=\"18\" y=\"42\" width=\"20\" height=\"20\" fill=\"#ec4899\"/></svg>",
        "isCorrect": false,
        "distractorType": "cancellation_error"
      },
      {
        "id": 3,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><rect x=\"42\" y=\"18\" width=\"20\" height=\"20\" fill=\"#6366f1\"/><rect x=\"18\" y=\"42\" width=\"20\" height=\"20\" fill=\"#ec4899\"/></svg>",
        "isCorrect": false,
        "distractorType": "incomplete_rule"
      },
      {
        "id": 4,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><rect x=\"18\" y=\"18\" width=\"20\" height=\"20\" fill=\"#2563eb\"/></svg>",
        "isCorrect": false,
        "distractorType": "incomplete_rule"
      },
      {
        "id": 5,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><rect x=\"42\" y=\"42\" width=\"20\" height=\"20\" fill=\"#a855f7\"/></svg>",
        "isCorrect": false,
        "distractorType": "incomplete_rule"
      },
      {
        "id": 6,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><rect x=\"42\" y=\"18\" width=\"20\" height=\"20\" fill=\"#6366f1\"/><rect x=\"18\" y=\"42\" width=\"20\" height=\"20\" fill=\"#ec4899\"/><rect x=\"42\" y=\"42\" width=\"20\" height=\"20\" fill=\"#a855f7\"/></svg>",
        "isCorrect": false,
        "distractorType": "rotation_error"
      }
    ],
    "a": 1.9,
    "b": 2.3,
    "explanation": "Applying Boolean XOR logic across the third row cancels out the two overlapping quadrants (top-right and bottom-left), leaving only the top-left and bottom-right colored quadrants."
  },
  {
    "id": 23,
    "domain": "matrix_reasoning",
    "promptSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 280 280\" class=\"w-full h-full max-w-[280px] mx-auto select-none\" fill=\"none\"><rect width=\"280\" height=\"280\" rx=\"12\" fill=\"#f4f4f5\" class=\"dark:fill-zinc-900\" stroke=\"#e4e4e7\" class=\"dark:stroke-zinc-800\" stroke-width=\"2\"/><line x1=\"93.3\" y1=\"0\" x2=\"93.3\" y2=\"280\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"2\"/><line x1=\"186.6\" y1=\"0\" x2=\"186.6\" y2=\"280\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"2\"/><line x1=\"0\" y1=\"93.3\" x2=\"280\" y2=\"93.3\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"2\"/><line x1=\"0\" y1=\"186.6\" x2=\"280\" y2=\"186.6\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"2\"/><g transform=\"translate(0,0)\"><g transform=\"translate(6.6,6.6)\"><polygon points=\"40,16 62,56 18,56\" stroke=\"#2563eb\" stroke-width=\"3\" fill=\"none\"/><circle cx=\"40\" cy=\"8\" r=\"5\" fill=\"#a855f7\"/></g></g><g transform=\"translate(93.3,0)\"><g transform=\"translate(6.6,6.6)\"><polygon points=\"20,20 60,20 60,60 20,60\" stroke=\"#2563eb\" stroke-width=\"3\" fill=\"none\"/><circle cx=\"72\" cy=\"40\" r=\"5\" fill=\"#a855f7\"/></g></g><g transform=\"translate(186.6,0)\"><g transform=\"translate(6.6,6.6)\"><polygon points=\"40,16 63,33 54,60 26,60 17,33\" stroke=\"#2563eb\" stroke-width=\"3\" fill=\"none\"/><circle cx=\"40\" cy=\"72\" r=\"5\" fill=\"#a855f7\"/></g></g><g transform=\"translate(0,93.3)\"><g transform=\"translate(6.6,6.6)\"><polygon points=\"20,20 60,20 60,60 20,60\" stroke=\"#2563eb\" stroke-width=\"3\" fill=\"none\"/><circle cx=\"40\" cy=\"72\" r=\"5\" fill=\"#a855f7\"/></g></g><g transform=\"translate(93.3,93.3)\"><g transform=\"translate(6.6,6.6)\"><polygon points=\"40,16 63,33 54,60 26,60 17,33\" stroke=\"#2563eb\" stroke-width=\"3\" fill=\"none\"/><circle cx=\"8\" cy=\"40\" r=\"5\" fill=\"#a855f7\"/></g></g><g transform=\"translate(186.6,93.3)\"><g transform=\"translate(6.6,6.6)\"><polygon points=\"40,16 62,56 18,56\" stroke=\"#2563eb\" stroke-width=\"3\" fill=\"none\"/><circle cx=\"40\" cy=\"8\" r=\"5\" fill=\"#a855f7\"/></g></g><g transform=\"translate(0,186.6)\"><g transform=\"translate(6.6,6.6)\"><polygon points=\"40,16 63,33 54,60 26,60 17,33\" stroke=\"#2563eb\" stroke-width=\"3\" fill=\"none\"/><circle cx=\"72\" cy=\"40\" r=\"5\" fill=\"#a855f7\"/></g></g><g transform=\"translate(93.3,186.6)\"><g transform=\"translate(6.6,6.6)\"><polygon points=\"40,16 62,56 18,56\" stroke=\"#2563eb\" stroke-width=\"3\" fill=\"none\"/><circle cx=\"40\" cy=\"72\" r=\"5\" fill=\"#a855f7\"/></g></g><g transform=\"translate(186.6,186.6)\"><rect width=\"93.3\" height=\"93.3\" rx=\"8\" fill=\"#eff6ff\" class=\"dark:fill-blue-950/40\" stroke=\"#3b82f6\" stroke-width=\"2\" stroke-dasharray=\"4 3\"/><text x=\"46.6\" y=\"58\" font-family=\"sans-serif\" font-size=\"36\" font-weight=\"bold\" fill=\"#2563eb\" class=\"dark:fill-blue-400\" text-anchor=\"middle\">?</text></g></svg>",
    "options": [
      {
        "id": 1,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><polygon points=\"20,20 60,20 60,60 20,60\" stroke=\"#2563eb\" stroke-width=\"3\" fill=\"none\"/><circle cx=\"8\" cy=\"40\" r=\"5\" fill=\"#a855f7\"/></svg>",
        "isCorrect": true
      },
      {
        "id": 2,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><polygon points=\"20,20 60,20 60,60 20,60\" stroke=\"#2563eb\" stroke-width=\"3\" fill=\"none\"/><circle cx=\"72\" cy=\"40\" r=\"5\" fill=\"#a855f7\"/></svg>",
        "isCorrect": false,
        "distractorType": "rotation_error"
      },
      {
        "id": 3,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><polygon points=\"40,16 62,56 18,56\" stroke=\"#2563eb\" stroke-width=\"3\" fill=\"none\"/><circle cx=\"8\" cy=\"40\" r=\"5\" fill=\"#a855f7\"/></svg>",
        "isCorrect": false,
        "distractorType": "feature_attraction"
      },
      {
        "id": 4,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><polygon points=\"40,16 63,33 54,60 26,60 17,33\" stroke=\"#2563eb\" stroke-width=\"3\" fill=\"none\"/><circle cx=\"8\" cy=\"40\" r=\"5\" fill=\"#a855f7\"/></svg>",
        "isCorrect": false,
        "distractorType": "feature_attraction"
      },
      {
        "id": 5,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><polygon points=\"20,20 60,20 60,60 20,60\" stroke=\"#2563eb\" stroke-width=\"3\" fill=\"none\"/><circle cx=\"40\" cy=\"8\" r=\"5\" fill=\"#a855f7\"/></svg>",
        "isCorrect": false,
        "distractorType": "incomplete_rule"
      },
      {
        "id": 6,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><polygon points=\"20,20 60,20 60,60 20,60\" stroke=\"#2563eb\" stroke-width=\"3\" fill=\"none\"/><circle cx=\"40\" cy=\"72\" r=\"5\" fill=\"#a855f7\"/></svg>",
        "isCorrect": false,
        "distractorType": "rotation_error"
      }
    ],
    "a": 1.95,
    "b": 2.45,
    "explanation": "Both outer polygon vertex count and satellite orbiting position follow strict Latin square distributions across the 3x3 array. The missing cell requires a 4-sided square with satellite node at the 9 o'clock position."
  },
  {
    "id": 24,
    "domain": "matrix_reasoning",
    "promptSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 280 280\" class=\"w-full h-full max-w-[280px] mx-auto select-none\" fill=\"none\"><rect width=\"280\" height=\"280\" rx=\"12\" fill=\"#f4f4f5\" class=\"dark:fill-zinc-900\" stroke=\"#e4e4e7\" class=\"dark:stroke-zinc-800\" stroke-width=\"2\"/><line x1=\"93.3\" y1=\"0\" x2=\"93.3\" y2=\"280\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"2\"/><line x1=\"186.6\" y1=\"0\" x2=\"186.6\" y2=\"280\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"2\"/><line x1=\"0\" y1=\"93.3\" x2=\"280\" y2=\"93.3\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"2\"/><line x1=\"0\" y1=\"186.6\" x2=\"280\" y2=\"186.6\" stroke=\"#d4d4d8\" class=\"dark:stroke-zinc-700\" stroke-width=\"2\"/><g transform=\"translate(0,0)\"><g transform=\"translate(6.6,6.6)\"><circle cx=\"40\" cy=\"40\" r=\"26\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2.5\" fill=\"none\"/><line x1=\"16\" y1=\"40\" x2=\"64\" y2=\"40\" stroke=\"#2563eb\" stroke-width=\"3\" stroke-linecap=\"round\"/><circle cx=\"40\" cy=\"40\" r=\"6\" fill=\"#2563eb\"/></g></g><g transform=\"translate(93.3,0)\"><g transform=\"translate(6.6,6.6)\"><rect x=\"14\" y=\"14\" width=\"52\" height=\"52\" rx=\"4\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2.5\" fill=\"none\"/><line x1=\"16\" y1=\"40\" x2=\"64\" y2=\"40\" stroke=\"#2563eb\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"16\" x2=\"40\" y2=\"64\" stroke=\"#a855f7\" stroke-width=\"3\" stroke-linecap=\"round\"/><circle cx=\"40\" cy=\"40\" r=\"6\" stroke=\"#2563eb\" stroke-width=\"2.5\" fill=\"#ffffff\" class=\"dark:fill-zinc-900\"/></g></g><g transform=\"translate(186.6,0)\"><g transform=\"translate(6.6,6.6)\"><polygon points=\"40,12 68,40 40,68 12,40\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2.5\" fill=\"none\"/><line x1=\"40\" y1=\"16\" x2=\"40\" y2=\"64\" stroke=\"#a855f7\" stroke-width=\"3\" stroke-linecap=\"round\"/><circle cx=\"40\" cy=\"40\" r=\"6\" fill=\"#2563eb\"/></g></g><g transform=\"translate(0,93.3)\"><g transform=\"translate(6.6,6.6)\"><rect x=\"14\" y=\"14\" width=\"52\" height=\"52\" rx=\"4\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2.5\" fill=\"none\"/><line x1=\"40\" y1=\"16\" x2=\"40\" y2=\"64\" stroke=\"#a855f7\" stroke-width=\"3\" stroke-linecap=\"round\"/><circle cx=\"40\" cy=\"40\" r=\"6\" fill=\"#2563eb\"/></g></g><g transform=\"translate(93.3,93.3)\"><g transform=\"translate(6.6,6.6)\"><polygon points=\"40,12 68,40 40,68 12,40\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2.5\" fill=\"none\"/><line x1=\"16\" y1=\"40\" x2=\"64\" y2=\"40\" stroke=\"#2563eb\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"16\" x2=\"40\" y2=\"64\" stroke=\"#a855f7\" stroke-width=\"3\" stroke-linecap=\"round\"/><circle cx=\"40\" cy=\"40\" r=\"6\" fill=\"#2563eb\"/></g></g><g transform=\"translate(186.6,93.3)\"><g transform=\"translate(6.6,6.6)\"><circle cx=\"40\" cy=\"40\" r=\"26\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2.5\" fill=\"none\"/><line x1=\"16\" y1=\"40\" x2=\"64\" y2=\"40\" stroke=\"#2563eb\" stroke-width=\"3\" stroke-linecap=\"round\"/><circle cx=\"40\" cy=\"40\" r=\"6\" stroke=\"#2563eb\" stroke-width=\"2.5\" fill=\"#ffffff\" class=\"dark:fill-zinc-900\"/></g></g><g transform=\"translate(0,186.6)\"><g transform=\"translate(6.6,6.6)\"><polygon points=\"40,12 68,40 40,68 12,40\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2.5\" fill=\"none\"/><line x1=\"16\" y1=\"40\" x2=\"64\" y2=\"40\" stroke=\"#2563eb\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"16\" x2=\"40\" y2=\"64\" stroke=\"#a855f7\" stroke-width=\"3\" stroke-linecap=\"round\"/><circle cx=\"40\" cy=\"40\" r=\"6\" stroke=\"#2563eb\" stroke-width=\"2.5\" fill=\"#ffffff\" class=\"dark:fill-zinc-900\"/></g></g><g transform=\"translate(93.3,186.6)\"><g transform=\"translate(6.6,6.6)\"><circle cx=\"40\" cy=\"40\" r=\"26\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2.5\" fill=\"none\"/><line x1=\"40\" y1=\"16\" x2=\"40\" y2=\"64\" stroke=\"#a855f7\" stroke-width=\"3\" stroke-linecap=\"round\"/><circle cx=\"40\" cy=\"40\" r=\"6\" fill=\"#2563eb\"/></g></g><g transform=\"translate(186.6,186.6)\"><rect width=\"93.3\" height=\"93.3\" rx=\"8\" fill=\"#eff6ff\" class=\"dark:fill-blue-950/40\" stroke=\"#3b82f6\" stroke-width=\"2\" stroke-dasharray=\"4 3\"/><text x=\"46.6\" y=\"58\" font-family=\"sans-serif\" font-size=\"36\" font-weight=\"bold\" fill=\"#2563eb\" class=\"dark:fill-blue-400\" text-anchor=\"middle\">?</text></g></svg>",
    "options": [
      {
        "id": 1,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><rect x=\"14\" y=\"14\" width=\"52\" height=\"52\" rx=\"4\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2.5\" fill=\"none\"/><line x1=\"16\" y1=\"40\" x2=\"64\" y2=\"40\" stroke=\"#2563eb\" stroke-width=\"3\" stroke-linecap=\"round\"/><circle cx=\"40\" cy=\"40\" r=\"6\" fill=\"#2563eb\"/></svg>",
        "isCorrect": true
      },
      {
        "id": 2,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><rect x=\"14\" y=\"14\" width=\"52\" height=\"52\" rx=\"4\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2.5\" fill=\"none\"/><line x1=\"16\" y1=\"40\" x2=\"64\" y2=\"40\" stroke=\"#2563eb\" stroke-width=\"3\" stroke-linecap=\"round\"/><circle cx=\"40\" cy=\"40\" r=\"6\" stroke=\"#2563eb\" stroke-width=\"2.5\" fill=\"#ffffff\" class=\"dark:fill-zinc-900\"/></svg>",
        "isCorrect": false,
        "distractorType": "incomplete_rule"
      },
      {
        "id": 3,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><polygon points=\"40,12 68,40 40,68 12,40\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2.5\" fill=\"none\"/><line x1=\"16\" y1=\"40\" x2=\"64\" y2=\"40\" stroke=\"#2563eb\" stroke-width=\"3\" stroke-linecap=\"round\"/><circle cx=\"40\" cy=\"40\" r=\"6\" fill=\"#2563eb\"/></svg>",
        "isCorrect": false,
        "distractorType": "feature_attraction"
      },
      {
        "id": 4,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><rect x=\"14\" y=\"14\" width=\"52\" height=\"52\" rx=\"4\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2.5\" fill=\"none\"/><line x1=\"16\" y1=\"40\" x2=\"64\" y2=\"40\" stroke=\"#2563eb\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"40\" y1=\"16\" x2=\"40\" y2=\"64\" stroke=\"#a855f7\" stroke-width=\"3\" stroke-linecap=\"round\"/><circle cx=\"40\" cy=\"40\" r=\"6\" fill=\"#2563eb\"/></svg>",
        "isCorrect": false,
        "distractorType": "cancellation_error"
      },
      {
        "id": 5,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><circle cx=\"40\" cy=\"40\" r=\"26\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2.5\" fill=\"none\"/><line x1=\"40\" y1=\"16\" x2=\"40\" y2=\"64\" stroke=\"#a855f7\" stroke-width=\"3\" stroke-linecap=\"round\"/><circle cx=\"40\" cy=\"40\" r=\"6\" stroke=\"#2563eb\" stroke-width=\"2.5\" fill=\"#ffffff\" class=\"dark:fill-zinc-900\"/></svg>",
        "isCorrect": false,
        "distractorType": "rotation_error"
      },
      {
        "id": 6,
        "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\" class=\"w-full h-full max-w-[80px] mx-auto select-none\" fill=\"none\"><rect x=\"14\" y=\"14\" width=\"52\" height=\"52\" rx=\"4\" stroke=\"#18181b\" class=\"dark:stroke-zinc-200\" stroke-width=\"2.5\" fill=\"none\"/><line x1=\"40\" y1=\"16\" x2=\"40\" y2=\"64\" stroke=\"#a855f7\" stroke-width=\"3\" stroke-linecap=\"round\"/><circle cx=\"40\" cy=\"40\" r=\"6\" fill=\"#2563eb\"/></svg>",
        "isCorrect": false,
        "distractorType": "rotation_error"
      }
    ],
    "a": 2.0,
    "b": 2.6,
    "explanation": "The ceiling item integrates three simultaneous transformations: outer frame Latin square permutation, internal segment XOR cancellation, and parity-dependent central core fill. Option 1 satisfies all three rules concurrently."
  }
];