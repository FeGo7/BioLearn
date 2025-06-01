import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';

interface QuizQuestionProps {
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  onAnswer: (isCorrect: boolean) => void;
}

export function QuizQuestion({ 
  question, 
  options, 
  correctOptionIndex, 
  explanation, 
  onAnswer 
}: QuizQuestionProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  
  const handleOptionSelect = (index: number) => {
    if (selectedOption !== null) return; // Prevent changing answer
    
    setSelectedOption(index);
    const isCorrect = index === correctOptionIndex;
    onAnswer(isCorrect);
    setShowExplanation(true);
  };
  
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">{question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {options.map((option, index) => (
          <Button
            key={index}
            variant={selectedOption === null ? "outline" : 
                   selectedOption === index && index === correctOptionIndex ? "default" :
                   selectedOption === index ? "destructive" :
                   index === correctOptionIndex && showExplanation ? "secondary" : "outline"}
            className={`w-full justify-start text-left p-4 h-auto ${
              selectedOption !== null ? "cursor-default" : ""
            }`}
            onClick={() => handleOptionSelect(index)}
            disabled={selectedOption !== null}
          >
            <div className="flex items-center gap-3">
              <div className={`flex items-center justify-center w-6 h-6 rounded-full border ${
                selectedOption === null ? "border-primary" :
                selectedOption === index && index === correctOptionIndex ? "bg-primary text-primary-foreground border-primary" :
                selectedOption === index ? "bg-destructive text-destructive-foreground border-destructive" :
                index === correctOptionIndex && showExplanation ? "bg-secondary text-secondary-foreground border-secondary" : "border-primary"
              }`}>
                {String.fromCharCode(65 + index)}
              </div>
              <span>{option}</span>
            </div>
          </Button>
        ))}
        
        {showExplanation && (
          <div className="mt-6 p-4 bg-muted rounded-md">
            <h4 className="font-medium mb-2">Erklärung:</h4>
            <p>{explanation}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {selectedOption !== null && (
          <div className={`text-sm font-medium ${
            selectedOption === correctOptionIndex ? "text-green-600" : "text-red-600"
          }`}>
            {selectedOption === correctOptionIndex ? "Richtig!" : "Falsch!"}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
