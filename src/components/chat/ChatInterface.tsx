import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, RotateCcw, FileText, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { useIsMobile } from "@/hooks/use-mobile";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatInterfaceProps {
  showProposal?: boolean;
  onHideProposal?: () => void;
  resetTrigger?: number;
}

const ChatInterface = ({ showProposal: externalShowProposal, onHideProposal, resetTrigger }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "👋 ¡Hola! Bienvenido/a al asistente conversacional de Crystal S.A.S.\nEstoy aquí para escucharte y recibir tus propuestas o ideas innovadoras 💡.\nTu aporte es muy valioso para nosotros y puede ayudarnos a generar grandes cambios.\n\nAntes de continuar, por favor indícame tu número de cédula para poder registrar tu idea correctamente.",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const [templateContent, setTemplateContent] = useState<string>("");
  const [showProposal, setShowProposal] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const WEBHOOK_URL = "https://crystal-n8n.u93rhn.easypanel.host/webhook/677a67ff-ce62-4474-92fb-b9dc51f0ce8c";

  // Auto scroll to bottom when new messages are added
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleReset = useCallback(() => {
    setMessages([
      {
        id: "1",
        text: "👋 ¡Hola! Bienvenido/a al asistente conversacional de Crystal S.A.S.\nEstoy aquí para escucharte y recibir tus propuestas o ideas innovadoras 💡.\nTu aporte es muy valioso para nosotros y puede ayudarnos a generar grandes cambios.\n\nAntes de continuar, por favor indícame tu número de cédula para poder registrar tu idea correctamente.",
        isUser: false,
        timestamp: new Date(),
      },
    ]);
    setSessionId("");
    setInputText("");
    setTemplateContent("");
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle external show proposal trigger
  useEffect(() => {
    if (externalShowProposal) {
      setShowProposal(true);
    }
  }, [externalShowProposal]);

  // Handle external reset trigger
  useEffect(() => {
    if (resetTrigger && resetTrigger > 0) {
      handleReset();
    }
  }, [resetTrigger, handleReset]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const messageText = inputText;
    
    // If no session ID is set and this looks like a cédula number, set it as session ID
    if (!sessionId && /^\d{7,11}$/.test(messageText.trim())) {
      setSessionId(messageText.trim());
    }
    
    setInputText("");
    setIsLoading(true);

    try {
      // Only send request if we have a session ID
      if (!sessionId && !/^\d{7,11}$/.test(messageText.trim())) {
        throw new Error("Primero debes proporcionar tu número de cédula");
      }

      const currentSessionId = sessionId || messageText.trim();
      const requestBody = {
        session_id: currentSessionId,
        message: messageText
      };

      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.text();
      
      // Try to parse and format the response better
      let formattedResponse = data;
      let templatePart = "";
      let chatPart = "";
      
      try {
        const parsedData = JSON.parse(data);
        if (Array.isArray(parsedData) && parsedData.length > 0) {
          formattedResponse = parsedData[0].output || parsedData[0].text || data;
        } else if (parsedData.output) {
          formattedResponse = parsedData.output;
        } else if (parsedData.text) {
          formattedResponse = parsedData.text;
        }
      } catch {
        // If parsing fails, use the original response
        formattedResponse = data;
      }
      
      // Parse template and chat sections
      const templateMatch = formattedResponse.match(/\[template\](.*?)(\[chat\]|$)/s);
      const chatMatch = formattedResponse.match(/\[chat\](.*?)$/s);
      
      if (templateMatch) {
        templatePart = templateMatch[1].trim();
        setTemplateContent(templatePart);
      }
      
      if (chatMatch) {
        chatPart = chatMatch[1].trim();
      } else {
        // If no [chat] section, use the full response
        chatPart = formattedResponse;
      }
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: chatPart || "Lo siento, no pude procesar tu mensaje en este momento.",
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error calling webhook:", error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Lo siento, ocurrió un error al procesar tu mensaje. Por favor, intenta de nuevo.",
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "Error",
        description: "No se pudo conectar con el servicio. Intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };


  // Mobile Proposal Overlay Component
  const ProposalOverlay = () => (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      <div className="flex justify-between items-center p-4 border-b border-border">
        <h3 className="font-semibold text-foreground">Propuesta Actual</h3>
        <Button
          onClick={() => {
            setShowProposal(false);
            if (onHideProposal) onHideProposal();
          }}
          variant="ghost"
          size="sm"
          className="p-1"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>
      <ScrollArea className="flex-1 p-4">
        {templateContent ? (
          <div className="text-sm text-foreground whitespace-pre-line">
            {templateContent}
          </div>
        ) : (
          <div className="text-sm text-muted-foreground italic">
            La propuesta aparecerá aquí conforme vayas completando la información...
          </div>
        )}
      </ScrollArea>
    </div>
  );

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-chat-background relative mt-16">
      
      {/* Mobile: Full-screen chat OR Desktop: Resizable panels */}
      {isMobile ? (
        <>
          {/* Mobile Chat Interface */}
          <div className="flex flex-col flex-1">
            {/* Chat Messages */}
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-3 animate-fade-in ${
                      message.isUser ? "flex-row-reverse space-x-reverse" : ""
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.isUser
                          ? "bg-chat-user-bubble text-chat-user-text"
                          : "bg-chat-bot-bubble text-chat-bot-text border border-border"
                      }`}
                    >
                      {message.isUser ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <img 
                          src="/lovable-uploads/c610eb67-608b-4934-b110-bd55c863dcba.png" 
                          alt="CRYS Bot" 
                          className="w-5 h-5 rounded-full object-contain"
                        />
                      )}
                    </div>
                    <div
                      className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                        message.isUser
                          ? "bg-chat-user-bubble text-chat-user-text rounded-br-md"
                          : "bg-chat-bot-bubble text-chat-bot-text border border-border rounded-bl-md"
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                      <span className="text-xs opacity-70 mt-2 block">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Mobile Chat Input */}
            <div className="border-t border-border bg-background/50 p-4">
              <div className="flex space-x-2">
                <Input
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Escribe tu mensaje..."
                  className="flex-1 min-h-[2.5rem] bg-background border-border"
                />
                <Button 
                  onClick={handleSendMessage}
                  size="sm"
                  className="px-3 h-10"
                  disabled={!inputText.trim() || isLoading}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Proposal Overlay */}
          {showProposal && <ProposalOverlay />}
        </>
      ) : (
        /* Desktop: Resizable Panels Layout */
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          {/* Template Panel - Left 30% */}
          <ResizablePanel defaultSize={30} minSize={20} maxSize={50}>
            <div className="h-full bg-background border-r border-border">
              <div className="p-4 border-b border-border">
                <h3 className="font-semibold text-foreground">Propuesta Actual</h3>
              </div>
              <ScrollArea className="h-[calc(100%-4rem)] p-4">
                {templateContent ? (
                  <div className="text-sm text-foreground whitespace-pre-line">
                    {templateContent}
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground italic">
                    La propuesta aparecerá aquí conforme vayas completando la información...
                  </div>
                )}
              </ScrollArea>
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          {/* Chat Panel - Right 70% */}
          <ResizablePanel defaultSize={70}>
            <div className="flex flex-col h-full">
              {/* Chat Messages */}
              <ScrollArea className="flex-1 p-6">
                <div className="max-w-4xl mx-auto space-y-6">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start space-x-3 animate-fade-in ${
                        message.isUser ? "flex-row-reverse space-x-reverse" : ""
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.isUser
                            ? "bg-chat-user-bubble text-chat-user-text"
                            : "bg-chat-bot-bubble text-chat-bot-text border border-border"
                        }`}
                      >
                        {message.isUser ? (
                          <User className="w-4 h-4" />
                        ) : (
                          <img 
                            src="/lovable-uploads/c610eb67-608b-4934-b110-bd55c863dcba.png" 
                            alt="CRYS Bot" 
                            className="w-5 h-5 rounded-full object-contain"
                          />
                        )}
                      </div>
                      <div
                        className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-2xl ${
                          message.isUser
                            ? "bg-chat-user-bubble text-chat-user-text rounded-br-md"
                            : "bg-chat-bot-bubble text-chat-bot-text border border-border rounded-bl-md"
                        }`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                        <span className="text-xs opacity-70 mt-2 block">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Desktop Chat Input */}
              <div className="border-t border-border bg-background/50 p-6">
                <div className="max-w-4xl mx-auto">
                  <div className="flex space-x-3">
                    <Input
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Escribe tu mensaje aquí..."
                      className="flex-1 min-h-[2.5rem] resize-none bg-background border-border"
                    />
                    <Button 
                      onClick={handleSendMessage}
                      size="sm"
                      className="px-4 h-10"
                      disabled={!inputText.trim() || isLoading}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      )}
    </div>
  );
};

export default ChatInterface;