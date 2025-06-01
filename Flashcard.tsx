import * as React from "react";
import { cn } from "../lib/utils";

interface FlashcardProps {
  front: string;
  back: string;
  onAnswer: (known: boolean) => void;
}

export function Flashcard({ front, back, onAnswer }: FlashcardProps) {
  const [flipped, setFlipped] = React.useState(false);
  
  const handleFlip = () => {
    if (!flipped) {
      setFlipped(true);
    }
  };
  
  const handleAnswer = (known: boolean) => {
    onAnswer(known);
    setFlipped(false);
  };
  
  return (
    <div className="w-full max-w-md mx-auto perspective-1000">
      <div
        className={cn(
          "relative w-full h-64 cursor-pointer transition-transform duration-500 transform-style-3d",
          flipped ? "rotate-y-180" : ""
        )}
        onClick={handleFlip}
      >
        {/* Vorderseite */}
        <div
          className={cn(
            "absolute inset-0 backface-hidden bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col justify-center",
            flipped ? "invisible" : "visible"
          )}
        >
          <div className="text-center">
            <h3 className="text-lg font-medium mb-4">Frage</h3>
            <p className="text-xl">{front}</p>
          </div>
          <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
            Klicken zum Umdrehen
          </div>
        </div>
        
        {/* Rückseite */}
        <div
          className={cn(
            "absolute inset-0 backface-hidden bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col justify-between rotate-y-180",
            flipped ? "visible" : "invisible"
          )}
        >
          <div className="text-center flex-1 flex flex-col justify-center">
            <h3 className="text-lg font-medium mb-4">Antwort</h3>
            <p className="text-xl">{back}</p>
          </div>
          
          <div className="flex justify-between mt-4 pt-4 border-t">
            <button
              className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 dark:bg-red-900 dark:text-red-100 dark:hover:bg-red-800"
              onClick={(e) => {
                e.stopPropagation();
                handleAnswer(false);
              }}
            >
              Nicht gewusst
            </button>
            <button
              className="px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 dark:bg-green-900 dark:text-green-100 dark:hover:bg-green-800"
              onClick={(e) => {
                e.stopPropagation();
                handleAnswer(true);
              }}
            >
              Gewusst
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
