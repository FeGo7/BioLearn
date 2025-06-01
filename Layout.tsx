import { Button } from './ui/button';
import { Sidebar, SidebarHeader, SidebarHeaderTitle, SidebarNav, SidebarNavItem, SidebarSection, SidebarSectionTitle } from './ui/sidebar';
import { Sun, Moon, BookOpen, Brain, FlaskConical, Home } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { darkMode, toggleDarkMode } = useAppContext();
  
  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-background text-foreground flex min-h-screen">
        {/* Sidebar */}
        <Sidebar defaultCollapsed={false} collapsible>
          <SidebarHeader>
            <SidebarHeaderTitle>
              <div className="flex items-center gap-2">
                <BookOpen className="h-6 w-6" />
                <span>BioLearn</span>
              </div>
            </SidebarHeaderTitle>
          </SidebarHeader>
          
          <SidebarSection>
            <SidebarSectionTitle>Navigation</SidebarSectionTitle>
            <SidebarNav>
              <SidebarNavItem href="/" active={true} icon={Home}>
                Dashboard
              </SidebarNavItem>
              <SidebarNavItem href="/modules" icon={Brain}>
                Module
              </SidebarNavItem>
              <SidebarNavItem href="/flashcards" icon={BookOpen}>
                Karteikarten
              </SidebarNavItem>
              <SidebarNavItem href="/glossary" icon={FlaskConical}>
                Glossar
              </SidebarNavItem>
            </SidebarNav>
          </SidebarSection>
          
          <div className="mt-auto pt-4 border-t">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleDarkMode}
              className="w-full flex justify-start px-3"
            >
              {darkMode ? (
                <Sun className="h-4 w-4 mr-2" />
              ) : (
                <Moon className="h-4 w-4 mr-2" />
              )}
              <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </Button>
          </div>
        </Sidebar>
        
        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <main className="container py-6 max-w-6xl">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
