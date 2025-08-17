import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatInterface = () => {
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
  const { toast } = useToast();

  const WEBHOOK_URL = "https://crystal-n8n.u93rhn.easypanel.host/webhook/677a67ff-ce62-4474-92fb-b9dc51f0ce8c";

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

  const handleReset = () => {
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
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-chat-background">
      {/* Header with Reset Button */}
      <div className="flex justify-end p-4 border-b border-border">
        <Button
          onClick={handleReset}
          variant="outline"
          size="sm"
          className="flex items-center space-x-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reiniciar Chat</span>
        </Button>
      </div>
      
      {/* Main Content Area with Resizable Panels */}
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
                          src="/lovable-uploads/abf804f8-0f27-4e98-b543-78b43f364eda.png" 
                          alt="Crystal Bot" 
                          className="w-5 h-5 rounded-full"
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
              </div>
            </ScrollArea>

            {/* Chat Input */}
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
    </div>
  );
};

export default ChatInterface;