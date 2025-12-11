import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, FolderOpen, Edit, History, Archive, Palette, Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from './ui/button';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { path: '/', label: 'Главная', icon: Home },
    { path: '/projects', label: 'Проекты', icon: FolderOpen },
    { path: '/history', label: 'История', icon: History },
    { path: '/archive', label: 'Архив', icon: Archive },
    { path: '/style', label: 'Стиль', icon: Palette },
  ];

  const isActive = (path: string) => {
    return location.pathname === path || (path !== '/' && location.pathname.startsWith(path));
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <Edit className="w-6 h-6" style={{ color: 'var(--accent-color, #3B82F6)' }} />
              <span className="text-gray-900 dark:text-white">Archi Editor</span>
            </Link>
            
            <div className="flex gap-1">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link key={path} to={path}>
                  <Button
                    variant={isActive(path) ? 'default' : 'ghost'}
                    size="sm"
                    className="gap-2"
                    style={isActive(path) ? { backgroundColor: 'var(--accent-color, #3B82F6)' } : {}}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </Button>
        </div>
      </div>
    </nav>
  );
};
