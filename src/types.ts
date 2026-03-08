export type QuestionType = 'translate' | 'select_image' | 'pair_words' | 'chess_board';

export interface Question {
  id: string;
  type: QuestionType;
  prompt: string;
  
  // For translate
  answer?: string;
  wordBank?: string[];
  
  // For select_image
  imageOptions?: { id: string; emoji: string; text: string; isCorrect: boolean }[];
  
  // For pair_words
  pairs?: { id: string; left: string; right: string }[];

  // For chess_board
  chessConfig?: {
    fen: string;
    targetSquare?: string;
  };
}

export interface Lesson {
  id: string;
  title: string;
  questions: Question[];
}

export interface Course {
  id: string;
  name: string;
  code: string;
  color: string;
  textColor: string;
  theme: {
    primary: string;
    border: string;
    ring: string;
    text: string;
  };
  lessons: Lesson[];
}

export interface UserState {
  hearts: number;
  streak: number;
  gems: number;
  xp: number;
  currentLessonId: string;
  completedLessons: string[];
}
