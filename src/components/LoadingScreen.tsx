import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center space-y-8 animate-fade-in">
        {/* Logo */}
        <div className="animate-scale-in">
          <img 
            src="/lovable-uploads/c610eb67-608b-4934-b110-bd55c863dcba.png" 
            alt="Rysal Logo" 
            className="h-16 w-auto object-contain"
          />
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold text-primary">ChatIA</h2>
          <p className="text-sm text-muted-foreground">Iniciando tu asistente inteligente...</p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-1 bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress Percentage */}
        <div className="text-xs text-muted-foreground font-mono">
          {progress}%
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;