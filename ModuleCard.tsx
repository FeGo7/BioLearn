import { useAppContext } from '../context/AppContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { ModuleType, ModuleColors } from '../data/types';

interface ModuleCardProps {
  id: string;
  title: string;
  description: string;
  type: ModuleType;
  iconName: string;
  onClick: () => void;
}

export function ModuleCard({ id, title, description, type, iconName, onClick }: ModuleCardProps) {
  const { getModuleProgress } = useAppContext();
  const progress = getModuleProgress(id);
  
  // Berechne den Fortschritt
  const moduleColor = ModuleColors[type];
  const totalLessons = progress?.completedLessons?.length || 0;
  const totalFlashcards = progress?.flashcardStats?.known || 0;
  const totalCards = (progress?.flashcardStats?.new || 0) + 
                    (progress?.flashcardStats?.learning || 0) + 
                    (progress?.flashcardStats?.review || 0) + 
                    (progress?.flashcardStats?.known || 0);
  
  const lessonProgress = totalLessons > 0 ? totalLessons : 0;
  const cardProgress = totalCards > 0 ? (totalFlashcards / totalCards) * 100 : 0;
  
  // Icon-Komponente basierend auf iconName
  const IconComponent = () => {
    switch (iconName) {
      case 'dna':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2C8 2 4 6 4 10c0 4 4 12 8 12s8-8 8-12c0-4-4-8-8-8Z" />
            <path d="M4 10c0 4 4 12 8 12s8-8 8-12" />
            <path d="M8 14c-2.2-2-4-5.5-4-8" />
            <path d="M16 14c2.2-2 4-5.5 4-8" />
            <path d="M8 6c2.2 2 4 5.5 4 8" />
            <path d="M16 6c-2.2 2-4 5.5-4 8" />
          </svg>
        );
      case 'cell':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2a14.5 14.5 0 0 0 0 20" />
            <path d="M12 22a14.5 14.5 0 0 0 0-20" />
          </svg>
        );
      case 'flask':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 3h6m-6 0v3m6-3v3M5 7h14M5 7v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7M9 13v-3m6 0v3" />
          </svg>
        );
      case 'leaf':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 22c1.25-1.25 2.5-2.5 3.5-4.5 1.5-3 2.5-4.5 3.5-6.5 1.5-3 3-4 6-4 4 0 8.5-2 9-6.5" />
            <path d="M2 22 17 7" />
          </svg>
        );
      case 'bacteria':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="8" />
            <path d="M12 4a2 2 0 0 0 0 4" />
            <path d="M12 16a2 2 0 0 0 0 4" />
            <path d="M16 12a2 2 0 0 0 4 0" />
            <path d="M4 12a2 2 0 0 0 4 0" />
            <path d="M15 7a2 2 0 0 0 2.83-2.83" />
            <path d="M15 17a2 2 0 0 1 2.83 2.83" />
            <path d="M9 17a2 2 0 0 0-2.83 2.83" />
            <path d="M9 7a2 2 0 0 1-2.83-2.83" />
          </svg>
        );
      case 'globe':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            <path d="M2 12h20" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2v20M2 12h20" />
          </svg>
        );
    }
  };

  return (
    <Card 
      variant="module" 
      className={`border-l-4 cursor-pointer hover:border-l-6 transition-all duration-200 border-l-${moduleColor}-500`}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <div className={`p-2 rounded-lg bg-${moduleColor}-100 text-${moduleColor}-700 dark:bg-${moduleColor}-900 dark:text-${moduleColor}-300`}>
          <IconComponent />
        </div>
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Progress value={lessonProgress} max={5}>
            Lektionen
          </Progress>
          <Progress 
            value={cardProgress} 
            max={100}
            variant={cardProgress > 75 ? "success" : cardProgress > 25 ? "warning" : "default"}
          >
            Karteikarten
          </Progress>
        </div>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        {totalLessons} von 5 Lektionen abgeschlossen
      </CardFooter>
    </Card>
  );
}
