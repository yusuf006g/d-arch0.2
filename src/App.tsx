import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { Editor } from './pages/Editor';
import { History } from './pages/History';
import { Archive } from './pages/Archive';
import { Style } from './pages/Style';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-white dark:bg-gray-900">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/editor/:id" element={<Editor />} />
            <Route path="/history" element={<History />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/style" element={<Style />} />
          </Routes>
          <Toaster />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
