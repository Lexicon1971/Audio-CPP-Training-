
export enum ModuleType {
  INTRO = 'INTRO',
  ABUSE_TYPES = 'ABUSE_TYPES',
  CONDUCT = 'CONDUCT',
  BOUNDARIES = 'BOUNDARIES',
  REPORTING = 'REPORTING',
  SAFETY = 'SAFETY',
  QUIZ = 'QUIZ',
  FINISH = 'FINISH'
}

export interface ContentItem {
  text: string;
  extraInfo?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface CourseModule {
  id: ModuleType;
  title: string;
  content: ContentItem[];
  imageUrl: string;
  narrationText: string;
  questions?: QuizQuestion[];
}
