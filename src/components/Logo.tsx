
import React from 'react';
import { Sparkles, Zap } from 'lucide-react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <div className={`flex items-center space-x-3 group ${className}`}>
      <div className="relative">
        {/* Main logo container */}
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 shadow-lg">
          {/* Inner glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400/30 via-blue-400/30 to-cyan-400/30 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
          
          {/* AI text */}
          <span className="relative text-white font-bold text-lg tracking-wider">AI</span>
          
          {/* Sparkle decorations */}
          <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-yellow-300 animate-pulse" />
          <Zap className="absolute -bottom-1 -left-1 w-3 h-3 text-cyan-300 animate-bounce" />
        </div>
        
        {/* Orbital rings */}
        <div className="absolute inset-0 rounded-full border border-purple-400/20 animate-spin" style={{ animationDuration: '8s' }}></div>
        <div className="absolute inset-1 rounded-full border border-blue-400/15 animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }}></div>
      </div>
      
      {/* Text logo */}
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent transition-all duration-300 group-hover:from-pink-400 group-hover:via-purple-400 group-hover:to-blue-400">
          AI Galaxy
        </h1>
        <span className="text-xs text-muted-foreground font-medium tracking-wide opacity-75">
          Discover • Explore • Create
        </span>
      </div>
    </div>
  );
};

export default Logo;
