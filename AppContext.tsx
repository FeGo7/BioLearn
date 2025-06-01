import { createContext, useContext, useState, ReactNode } from 'react';
import { 
  Module, 
  ModuleType, 
  Lesson, 
  Flashcard, 
  QuizQuestion, 
  GlossaryEntry, 
  Progress, 
  DailyPlan,
  FlashcardProgress,
  QuizResult,
  ModuleProgress
} from '../data/types';
import { 
  initialModules, 
  initialLessons, 
  initialFlashcards, 
  initialQuizQuestions, 
  initialGlossaryEntries 
} from '../data/mockData';

// Kontext-Typ
interface AppContextType {
  // Daten
  modules: Module[];
  dailyPlan: DailyPlan | null;
  progress: Progress | null;
  darkMode: boolean;
  
  // Funktionen
  getModuleById: (id: string) => Module | null;
  getLessonById: (id: string) => Lesson | null;
  getFlashcardById: (id: string) => Flashcard | null;
  getFlashcardsForLesson: (lessonId: string) => Flashcard[];
  getFlashcardsToReview: () => Flashcard[];
  getQuizQuestionsForModule: (moduleId: string) => QuizQuestion[];
  getModuleProgress: (moduleId: string) => ModuleProgress | null;
  
  // Karteikarten-Funktionen
  answerFlashcard: (id: string, known: boolean) => void;
  
  // Quiz-Funktionen
  submitQuizAnswer: (questionId: string, isCorrect: boolean) => void;
  
  // Glossar-Funktionen
  searchGlossary: (term: string) => GlossaryEntry[];
  
  // Fortschritt-Funktionen
  completeLesson: (lessonId: string) => void;
  resetProgress: () => void;
  
  // Tagesplan-Funktionen
  generateDailyPlan: () => void;
  
  // Einstellungen
  toggleDarkMode: () => void;
}

// Erstelle den Kontext
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider-Komponente
export function AppProvider({ children }: { children: ReactNode }) {
  // State für Daten
  const [modules] = useState<Module[]>(initialModules);
  const [lessons] = useState<Lesson[]>(initialLessons);
  const [flashcards, setFlashcards] = useState<Flashcard[]>(initialFlashcards);
  const [quizQuestions] = useState<QuizQuestion[]>(initialQuizQuestions);
  const [glossaryEntries] = useState<GlossaryEntry[]>(initialGlossaryEntries);
  
  // State für Benutzerfortschritt
  const [progress, setProgress] = useState<Progress | null>(() => {
    const savedProgress = localStorage.getItem('biolearn-progress');
    return savedProgress ? JSON.parse(savedProgress) : {
      completedLessons: [],
      flashcards: {},
      quizResults: [],
      lastActivity: new Date().toISOString(),
      moduleProgress: {}
    };
  });
  
  // State für Tagesplan
  const [dailyPlan, setDailyPlan] = useState<DailyPlan | null>(() => {
    const savedPlan = localStorage.getItem('biolearn-daily-plan');
    const plan = savedPlan ? JSON.parse(savedPlan) : null;
    
    // Prüfe, ob der Plan von heute ist
    if (plan && new Date(plan.date).toDateString() === new Date().toDateString()) {
      return plan;
    }
    return null;
  });
  
  // State für Dark Mode
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedMode = localStorage.getItem('biolearn-dark-mode');
    return savedMode ? JSON.parse(savedMode) : 
      window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  
  // Hilfsfunktionen
  const getModuleById = (id: string): Module | null => {
    return modules.find(module => module.id === id) || null;
  };
  
  const getLessonById = (id: string): Lesson | null => {
    return lessons.find(lesson => lesson.id === id) || null;
  };
  
  const getFlashcardById = (id: string): Flashcard | null => {
    return flashcards.find(card => card.id === id) || null;
  };
  
  const getFlashcardsForLesson = (lessonId: string): Flashcard[] => {
    return flashcards.filter(card => card.lessonId === lessonId);
  };
  
  const getQuizQuestionsForModule = (moduleId: string): QuizQuestion[] => {
    return quizQuestions.filter(question => question.moduleId === moduleId);
  };
  
  // Karteikarten zum Wiederholen basierend auf Spaced Repetition
  const getFlashcardsToReview = (): Flashcard[] => {
    if (!progress) return [];
    
    const now = new Date();
    const cardsToReview: Flashcard[] = [];
    
    flashcards.forEach(card => {
      const cardProgress = progress.flashcards[card.id];
      
      if (!cardProgress) {
        // Neue Karte
        cardsToReview.push({...card, status: 'new'});
      } else if (cardProgress.nextReview) {
        const nextReview = new Date(cardProgress.nextReview);
        if (nextReview <= now) {
          // Karte ist fällig zur Wiederholung
          cardsToReview.push({
            ...card, 
            status: cardProgress.status,
            interval: cardProgress.interval
          });
        }
      }
    });
    
    return cardsToReview;
  };
  
  // Fortschritt für ein Modul abrufen
  const getModuleProgress = (moduleId: string): ModuleProgress | null => {
    if (!progress) return null;
    return progress.moduleProgress[moduleId] || {
      completedLessons: [],
      flashcardStats: { new: 0, learning: 0, review: 0, known: 0 }
    };
  };
  
  // Karteikarte beantworten
  const answerFlashcard = (id: string, known: boolean) => {
    if (!progress) return;
    
    const card = getFlashcardById(id);
    if (!card) return;
    
    const moduleId = getLessonById(card.lessonId)?.moduleId || '';
    if (!moduleId) return;
    
    const now = new Date();
    const updatedFlashcards = {...progress.flashcards};
    const moduleProgress = {...progress.moduleProgress};
    
    if (!moduleProgress[moduleId]) {
      moduleProgress[moduleId] = {
        completedLessons: [],
        flashcardStats: { new: 0, learning: 0, review: 0, known: 0 }
      };
    }
    
    const cardProgress = updatedFlashcards[id] || {
      status: 'new',
      interval: 0,
      easeFactor: 2.5,
      nextReview: null
    };
    
    // Aktualisiere die Statistik
    if (cardProgress.status && moduleProgress[moduleId].flashcardStats[cardProgress.status]) {
      moduleProgress[moduleId].flashcardStats[cardProgress.status]--;
    }
    
    // Spaced Repetition Algorithmus (vereinfachte Version von SuperMemo SM-2)
    if (known) {
      // Richtig beantwortet
      let newInterval: number;
      let newStatus: 'new' | 'learning' | 'review' | 'known';
      
      if (cardProgress.status === 'new') {
        newInterval = 1; // 1 Tag
        newStatus = 'learning';
      } else if (cardProgress.status === 'learning') {
        newInterval = 3; // 3 Tage
        newStatus = 'review';
      } else {
        // Erhöhe das Intervall
        newInterval = Math.round(cardProgress.interval * cardProgress.easeFactor);
        newStatus = newInterval > 30 ? 'known' : 'review';
      }
      
      // Erhöhe den Ease Factor leicht
      const newEaseFactor = Math.min(cardProgress.easeFactor + 0.1, 2.5);
      
      updatedFlashcards[id] = {
        status: newStatus,
        interval: newInterval,
        easeFactor: newEaseFactor,
        nextReview: new Date(now.getTime() + newInterval * 24 * 60 * 60 * 1000).toISOString()
      };
      
      moduleProgress[moduleId].flashcardStats[newStatus]++;
      
    } else {
      // Falsch beantwortet
      let newStatus: 'new' | 'learning' | 'review' | 'known';
      
      if (cardProgress.status === 'known' || cardProgress.status === 'review') {
        newStatus = 'learning';
      } else {
        newStatus = 'new';
      }
      
      // Verringere den Ease Factor
      const newEaseFactor = Math.max(cardProgress.easeFactor - 0.2, 1.3);
      
      updatedFlashcards[id] = {
        status: newStatus,
        interval: 1, // Zurück auf 1 Tag
        easeFactor: newEaseFactor,
        nextReview: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString() // Morgen wiederholen
      };
      
      moduleProgress[moduleId].flashcardStats[newStatus]++;
    }
    
    // Aktualisiere den Fortschritt
    const updatedProgress: Progress = {
      ...progress,
      flashcards: updatedFlashcards,
      moduleProgress: moduleProgress,
      lastActivity: now.toISOString()
    };
    
    setProgress(updatedProgress);
    localStorage.setItem('biolearn-progress', JSON.stringify(updatedProgress));
    
    // Aktualisiere den Status der Karteikarte im State
    setFlashcards(prevCards => 
      prevCards.map(c => 
        c.id === id 
          ? {...c, status: updatedFlashcards[id].status, interval: updatedFlashcards[id].interval} 
          : c
      )
    );
  };
  
  // Quiz-Antwort einreichen
  const submitQuizAnswer = (questionId: string, isCorrect: boolean) => {
    if (!progress) return;
    
    const question = quizQuestions.find(q => q.id === questionId);
    if (!question) return;
    
    const now = new Date();
    const newQuizResult: QuizResult = {
      questionId,
      moduleId: question.moduleId,
      isCorrect,
      date: now.toISOString()
    };
    
    const updatedQuizResults = [...progress.quizResults, newQuizResult];
    
    const updatedProgress: Progress = {
      ...progress,
      quizResults: updatedQuizResults,
      lastActivity: now.toISOString()
    };
    
    setProgress(updatedProgress);
    localStorage.setItem('biolearn-progress', JSON.stringify(updatedProgress));
  };
  
  // Glossar durchsuchen
  const searchGlossary = (term: string): GlossaryEntry[] => {
    const searchTerm = term.toLowerCase();
    return glossaryEntries.filter(entry => 
      entry.term.toLowerCase().includes(searchTerm) || 
      entry.definition.toLowerCase().includes(searchTerm)
    );
  };
  
  // Lektion als abgeschlossen markieren
  const completeLesson = (lessonId: string) => {
    if (!progress) return;
    
    const lesson = getLessonById(lessonId);
    if (!lesson) return;
    
    const moduleId = lesson.moduleId;
    
    // Prüfe, ob die Lektion bereits abgeschlossen ist
    if (progress.completedLessons.includes(lessonId)) return;
    
    const updatedCompletedLessons = [...progress.completedLessons, lessonId];
    
    // Aktualisiere den Modul-Fortschritt
    const moduleProgress = {...progress.moduleProgress};
    if (!moduleProgress[moduleId]) {
      moduleProgress[moduleId] = {
        completedLessons: [],
        flashcardStats: { new: 0, learning: 0, review: 0, known: 0 }
      };
    }
    
    moduleProgress[moduleId].completedLessons = [
      ...moduleProgress[moduleId].completedLessons,
      lessonId
    ];
    
    const now = new Date();
    const updatedProgress: Progress = {
      ...progress,
      completedLessons: updatedCompletedLessons,
      moduleProgress,
      lastActivity: now.toISOString()
    };
    
    setProgress(updatedProgress);
    localStorage.setItem('biolearn-progress', JSON.stringify(updatedProgress));
  };
  
  // Fortschritt zurücksetzen
  const resetProgress = () => {
    const emptyProgress: Progress = {
      completedLessons: [],
      flashcards: {},
      quizResults: [],
      lastActivity: new Date().toISOString(),
      moduleProgress: {}
    };
    
    setProgress(emptyProgress);
    localStorage.setItem('biolearn-progress', JSON.stringify(emptyProgress));
    
    // Setze auch den Tagesplan zurück
    setDailyPlan(null);
    localStorage.removeItem('biolearn-daily-plan');
  };
  
  // Tagesplan generieren
  const generateDailyPlan = () => {
    if (!progress) return;
    
    // Karteikarten zum Wiederholen
    const flashcardsToReview = getFlashcardsToReview().map(card => card.id);
    
    // Empfohlene Lektionen (noch nicht abgeschlossene)
    const completedLessonIds = new Set(progress.completedLessons);
    const suggestedLessons = lessons
      .filter(lesson => !completedLessonIds.has(lesson.id))
      .sort(() => Math.random() - 0.5) // Zufällige Reihenfolge
      .slice(0, 3) // Maximal 3 Lektionen
      .map(lesson => lesson.id);
    
    // Empfohlene Quiz (Module mit den meisten abgeschlossenen Lektionen)
    const moduleCompletionCount: Record<string, number> = {};
    
    modules.forEach(module => {
      const moduleLessons = lessons.filter(lesson => lesson.moduleId === module.id);
      const completedModuleLessons = moduleLessons.filter(lesson => 
        completedLessonIds.has(lesson.id)
      );
      
      moduleCompletionCount[module.id] = completedModuleLessons.length / moduleLessons.length;
    });
    
    const suggestedQuizzes = Object.entries(moduleCompletionCount)
      .filter(([_, completion]) => completion > 0.3) // Mindestens 30% des Moduls abgeschlossen
      .sort((a, b) => b[1] - a[1]) // Sortiere nach Abschlussgrad (absteigend)
      .slice(0, 2) // Maximal 2 Quiz
      .map(([moduleId]) => moduleId);
    
    const newDailyPlan: DailyPlan = {
      date: new Date().toISOString(),
      flashcardsToReview,
      suggestedLessons,
      suggestedQuizzes
    };
    
    setDailyPlan(newDailyPlan);
    localStorage.setItem('biolearn-daily-plan', JSON.stringify(newDailyPlan));
  };
  
  // Dark Mode umschalten
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('biolearn-dark-mode', JSON.stringify(newMode));
  };
  
  // Kontext-Wert
  const contextValue: AppContextType = {
    modules,
    dailyPlan,
    progress,
    darkMode,
    getModuleById,
    getLessonById,
    getFlashcardById,
    getFlashcardsForLesson,
    getFlashcardsToReview,
    getQuizQuestionsForModule,
    getModuleProgress,
    answerFlashcard,
    submitQuizAnswer,
    searchGlossary,
    completeLesson,
    resetProgress,
    generateDailyPlan,
    toggleDarkMode
  };
  
  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

// Hook für den Zugriff auf den Kontext
export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
