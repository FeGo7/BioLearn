// Typdefinitionen für die Biologie-Lern-App

// Modultypen
export type ModuleType = 'Genetik' | 'Zellbiologie' | 'Biochemie' | 'Botanik' | 'Mikrobiologie' | 'Ökologie';

// Farben für die Module
export const ModuleColors: Record<ModuleType, string> = {
  'Genetik': 'blue',
  'Zellbiologie': 'green',
  'Biochemie': 'purple',
  'Botanik': 'emerald',
  'Mikrobiologie': 'pink',
  'Ökologie': 'amber'
};

// Modul
export interface Module {
  id: string;
  title: string;
  description: string;
  type: ModuleType;
  iconName: string;
  lessons?: string[]; // IDs der zugehörigen Lektionen
}

// Lektion
export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  content: string;
  order: number;
  flashcards?: string[]; // IDs der zugehörigen Karteikarten
}

// Karteikarte
export interface Flashcard {
  id: string;
  lessonId: string;
  front: string;
  back: string;
  status?: 'new' | 'learning' | 'review' | 'known';
  interval?: number;
}

// Karteikarten-Fortschritt
export interface FlashcardProgress {
  status: 'new' | 'learning' | 'review' | 'known';
  interval: number;
  easeFactor: number;
  nextReview: string | null;
}

// Quiz-Frage
export interface QuizQuestion {
  id: string;
  moduleId: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

// Quiz-Ergebnis
export interface QuizResult {
  questionId: string;
  moduleId: string;
  isCorrect: boolean;
  date: string;
}

// Glossar-Eintrag
export interface GlossaryEntry {
  id: string;
  term: string;
  definition: string;
  moduleTypes: ModuleType[];
  imageUrl?: string;
  relatedTerms?: { id: string; term: string }[];
}

// Modul-Fortschritt
export interface ModuleProgress {
  completedLessons: string[];
  flashcardStats: {
    new: number;
    learning: number;
    review: number;
    known: number;
  };
}

// Gesamtfortschritt
export interface Progress {
  completedLessons: string[];
  flashcards: Record<string, FlashcardProgress>;
  quizResults: QuizResult[];
  lastActivity: string;
  moduleProgress: Record<string, ModuleProgress>;
}

// Täglicher Lernplan
export interface DailyPlan {
  date: string;
  flashcardsToReview: string[];
  suggestedLessons: string[];
  suggestedQuizzes: string[];
}

// Benutzereinstellungen
export interface UserSettings {
  username?: string;
  studyProgram?: string;
  semester?: number;
  learningLevel: 'basic' | 'advanced';
  darkMode: boolean;
}
