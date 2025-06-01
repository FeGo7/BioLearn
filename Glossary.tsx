import { Tabs as TabsComponent, TabsList as TabsListComponent, TabsTrigger as TabsTriggerComponent } from '../components/ui/tabs';

export function Glossary() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Glossar</h1>
        <p className="text-muted-foreground">
          Durchsuche biologische Fachbegriffe und Definitionen.
        </p>
      </div>
      
      {/* Tabs für Modulfilterung */}
      <TabsComponent defaultValue="all">
        <TabsListComponent className="w-full flex overflow-x-auto">
          <TabsTriggerComponent value="all">
            Alle
          </TabsTriggerComponent>
          <TabsTriggerComponent value="Genetik">
            Genetik
          </TabsTriggerComponent>
          <TabsTriggerComponent value="Zellbiologie">
            Zellbiologie
          </TabsTriggerComponent>
        </TabsListComponent>
      </TabsComponent>
      
      <div className="py-8 text-center">
        <p>Glossar wird geladen...</p>
      </div>
    </div>
  );
}
