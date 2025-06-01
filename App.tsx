import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Glossary } from './pages/Glossary';
import * as serviceWorkerRegistration from './serviceWorker';

import './App.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/glossary" element={<Glossary />} />
            {/* Weitere Routen werden hier hinzugefügt */}
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}

// Registriere den Service Worker für Offline-Funktionalität
serviceWorkerRegistration.register();

export default App;
