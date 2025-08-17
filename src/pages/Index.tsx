import { useState } from "react";
import Header from "@/components/Header";
import ChatInterface from "@/components/chat/ChatInterface";
import LoadingScreen from "@/components/LoadingScreen";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showProposal, setShowProposal] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleShowProposal = () => {
    setShowProposal(true);
  };

  const handleReset = () => {
    setResetTrigger(prev => prev + 1);
  };

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header onShowProposal={handleShowProposal} onReset={handleReset} />
      <ChatInterface 
        showProposal={showProposal} 
        onHideProposal={() => setShowProposal(false)}
        resetTrigger={resetTrigger}
      />
    </div>
  );
};

export default Index;
