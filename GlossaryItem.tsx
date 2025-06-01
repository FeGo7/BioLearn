import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface GlossaryItemProps {
  term: string;
  definition: string;
  moduleTypes: string[];
  imageUrl?: string;
  relatedTerms?: { id: string; term: string }[];
  onRelatedTermClick?: (termId: string) => void;
}

export function GlossaryItem({
  term,
  definition,
  moduleTypes,
  imageUrl,
  relatedTerms,
  onRelatedTermClick
}: GlossaryItemProps) {
  // Farben für die Module-Tags
  const getModuleColor = (type: string) => {
    switch (type) {
      case 'Genetik': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'Zellbiologie': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Biochemie': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'Botanik': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300';
      case 'Mikrobiologie': return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300';
      case 'Ökologie': return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{term}</CardTitle>
          <div className="flex flex-wrap gap-1">
            {moduleTypes.map((type) => (
              <span 
                key={type} 
                className={`px-2 py-1 rounded-md text-xs font-medium ${getModuleColor(type)}`}
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {imageUrl && (
          <div className="flex justify-center mb-4">
            <img 
              src={imageUrl} 
              alt={term} 
              className="max-h-48 object-contain rounded-md"
            />
          </div>
        )}
        
        <p className="text-sm">{definition}</p>
        
        {relatedTerms && relatedTerms.length > 0 && (
          <div className="pt-4 border-t">
            <h4 className="text-sm font-medium mb-2">Verwandte Begriffe:</h4>
            <div className="flex flex-wrap gap-2">
              {relatedTerms.map((related) => (
                <button
                  key={related.id}
                  onClick={() => onRelatedTermClick && onRelatedTermClick(related.id)}
                  className="px-2 py-1 bg-secondary/50 hover:bg-secondary text-secondary-foreground rounded-md text-xs transition-colors"
                >
                  {related.term}
                </button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
