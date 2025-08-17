import { useState } from "react";
import Header from "@/components/Header";
import ChatInterface from "@/components/chat/ChatInterface";
import LoadingScreen from "@/components/LoadingScreen";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      <ChatInterface />
    </div>
  );
};

export default Index;
