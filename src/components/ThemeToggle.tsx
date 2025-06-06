
import React from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="hover:scale-105 transition-all duration-200 relative overflow-hidden"
    >
      <div className="relative z-10 flex items-center space-x-2">
        {theme === 'light' ? (
          <Moon className="w-4 h-4" />
        ) : (
          <Sun className="w-4 h-4" />
        )}
        <span className="hidden sm:inline">
          {theme === 'light' ? 'Dark' : 'Light'}
        </span>
      </div>
      
      {/* Animated background */}
      <div className={`absolute inset-0 transition-transform duration-300 ${
        theme === 'light' 
          ? 'bg-gradient-to-r from-slate-800 to-slate-900 translate-y-full' 
          : 'bg-gradient-to-r from-yellow-200 to-orange-200 -translate-y-full'
      }`}></div>
    </Button>
  );
};

export default ThemeToggle;
