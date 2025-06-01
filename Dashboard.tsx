import { useAppContext } from '../context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { ModuleCard } from '../components/ModuleCard';
import { Button } from '../components/ui/button';

export function Dashboard() {
  const { 
    modules, 
    progress, 
    dailyPlan, 
    generateDailyPlan,
    getFlashcardsToReview,
    getLessonById,
    getModuleById
  } = useAppContext();
  
  // Berechne den Gesamtfortschritt
  const totalModules = modules.length;
  const completedModules = Object.values(progress?.moduleProgress || {})
    .filter(mp => mp.completedLessons.length >= 5)
    .length;
  
  const moduleProgress = (completedModules / totalModules) * 100;
  
  // Karteikarten zum Wiederholen
  const flashcardsToReview = getFlashcardsToReview();
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Willkommen zurück! Hier ist dein Lernfortschritt und täglicher Plan.
          </p>
        </div>
        <Button onClick={generateDailyPlan}>
          Neuen Tagesplan erstellen
        </Button>
      </div>
      
      {/* Fortschrittsübersicht */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Gesamtfortschritt
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(moduleProgress)}%</div>
            <Progress 
              value={moduleProgress} 
              max={100}
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-2">
              {completedModules} von {totalModules} Modulen abgeschlossen
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Karteikarten heute
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{flashcardsToReview.length}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Karteikarten zum Wiederholen
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Letzte Aktivität
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {progress?.lastActivity ? (
                new Date(progress.lastActivity).toLocaleDateString()
              ) : (
                "Keine"
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Datum der letzten Lernaktivität
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Quiz-Ergebnisse
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {progress?.quizResults.length || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Abgeschlossene Quiz
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Täglicher Lernplan */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">Dein Lernplan für heute</h2>
        
        {dailyPlan ? (
          <div className="space-y-6">
            {/* Karteikarten zum Wiederholen */}
            <Card>
              <CardHeader>
                <CardTitle>Karteikarten wiederholen</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Du hast <strong>{dailyPlan.flashcardsToReview.length}</strong> Karteikarten zum Wiederholen.
                </p>
                <Button asChild>
                  <a href="/flashcards">Jetzt wiederholen</a>
                </Button>
              </CardContent>
            </Card>
            
            {/* Empfohlene Lektionen */}
            {dailyPlan.suggestedLessons.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Empfohlene Lektionen</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {dailyPlan.suggestedLessons.map(lessonId => {
                      const lesson = getLessonById(lessonId);
                      const module = lesson ? getModuleById(lesson.moduleId) : null;
                      
                      return lesson && module ? (
                        <li key={lessonId} className="flex items-center justify-between">
                          <div>
                            <span className="font-medium">{lesson.title}</span>
                            <p className="text-sm text-muted-foreground">{module.title}</p>
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <a href={`/lessons/${lessonId}`}>Lernen</a>
                          </Button>
                        </li>
                      ) : null;
                    })}
                  </ul>
                </CardContent>
              </Card>
            )}
            
            {/* Empfohlene Quiz */}
            {dailyPlan.suggestedQuizzes.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Empfohlene Quiz</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {dailyPlan.suggestedQuizzes.map(moduleId => {
                      const module = getModuleById(moduleId);
                      
                      return module ? (
                        <li key={moduleId} className="flex items-center justify-between">
                          <div>
                            <span className="font-medium">{module.title} Quiz</span>
                            <p className="text-sm text-muted-foreground">Teste dein Wissen</p>
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <a href={`/quiz/${moduleId}`}>Starten</a>
                          </Button>
                        </li>
                      ) : null;
                    })}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          <Card>
            <CardContent className="py-6">
              <p className="text-center text-muted-foreground">
                Kein Lernplan für heute verfügbar. Erstelle einen neuen Plan!
              </p>
              <div className="flex justify-center mt-4">
                <Button onClick={generateDailyPlan}>
                  Lernplan erstellen
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      {/* Module-Übersicht */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">Deine Module</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map(module => (
            <ModuleCard
              key={module.id}
              id={module.id}
              title={module.title}
              description={module.description}
              type={module.type}
              iconName={module.iconName}
              onClick={() => window.location.href = `/modules/${module.id}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
