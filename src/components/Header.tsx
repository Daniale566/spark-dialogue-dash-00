import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle, BarChart3, LogOut, FileText, RotateCcw } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface HeaderProps {
  onShowProposal?: () => void;
  onReset?: () => void;
}

const Header = ({ onShowProposal, onReset }: HeaderProps) => {
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/c610eb67-608b-4934-b110-bd55c863dcba.png" 
              alt="CRYS Logo" 
              className="w-8 h-8 object-contain"
            />
            <span className="font-semibold text-lg text-foreground">CRYS</span>
          </Link>
          
          {/* Action buttons on home page */}
          {location.pathname === "/" && (
            <div className="flex items-center space-x-2">
              <Button
                onClick={onShowProposal}
                variant="default"
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center space-x-2"
              >
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">Ver Propuesta</span>
              </Button>
              
              <Button
                onClick={onReset}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">Reset</span>
              </Button>
            </div>
          )}
        </div>

        <nav className="flex items-center space-x-1">
          <Button
            variant={location.pathname === "/" ? "secondary" : "ghost"}
            size="sm"
            asChild
          >
            <Link to="/" className="flex items-center space-x-2">
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Chat</span>
            </Link>
          </Button>
          
          <Button
            variant={location.pathname === "/dashboard" ? "secondary" : "ghost"}
            size="sm"
            asChild
          >
            <Link to="/dashboard" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
          </Button>

          {location.pathname === "/dashboard" && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Salir</span>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;