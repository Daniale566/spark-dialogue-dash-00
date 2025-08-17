import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Check, X, Clock, User, Star, Copy } from "lucide-react";

interface Conversation {
  id: string;
  userId: string;
  status: 'pendiente' | 'aceptada' | 'rechazada' | 'activa';
  messageCount: number;
  lastMessage: string;
  timestamp: string;
  summary: string;
  rating?: number;
  similarity?: number;
}

interface ConversationCardProps {
  conversation: Conversation;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
  onRate: (id: string, rating: number) => void;
  onCheckSimilarity: (id: string) => void;
}

const ConversationCard = ({ conversation, onAccept, onReject, onRate, onCheckSimilarity }: ConversationCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aceptada': return 'default';
      case 'rechazada': return 'destructive';
      case 'activa': return 'secondary';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'aceptada': return <Check className="w-3 h-3" />;
      case 'rechazada': return <X className="w-3 h-3" />;
      case 'activa': return <MessageCircle className="w-3 h-3" />;
      default: return <Clock className="w-3 h-3" />;
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3 p-4 sm:p-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-secondary-foreground" />
            </div>
            <div className="min-w-0">
              <p className="font-medium text-sm text-foreground truncate">ID: {conversation.id}</p>
              <p className="text-xs text-muted-foreground truncate">Usuario: {conversation.userId}</p>
            </div>
          </div>
          <Badge variant={getStatusColor(conversation.status)} className="flex items-center space-x-1 flex-shrink-0">
            {getStatusIcon(conversation.status)}
            <span className="capitalize text-xs sm:text-sm">{conversation.status}</span>
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
        {/* Resumen de la conversación */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-2">Resumen:</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {conversation.summary}
          </p>
        </div>

        {/* Último mensaje */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-2">Último mensaje:</h4>
          <p className="text-sm text-muted-foreground italic break-words">
            "{conversation.lastMessage}"
          </p>
        </div>

        {/* Metadata */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-muted-foreground pt-2 border-t border-border">
          <span>{conversation.messageCount} mensajes</span>
          <span>{conversation.timestamp}</span>
        </div>

        {/* Acciones de trazabilidad */}
        {conversation.status === 'pendiente' && (
          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <Button
              size="sm"
              onClick={() => onAccept(conversation.id)}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            >
              <Check className="w-4 h-4 mr-1" />
              Aceptar
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onReject(conversation.id)}
              className="flex-1"
            >
              <X className="w-4 h-4 mr-1" />
              Rechazar
            </Button>
          </div>
        )}

        {/* Sistema de calificación y similitud */}
        {conversation.status !== 'pendiente' && (
          <div className="space-y-3 pt-2 border-t border-border">
            {/* Rating System */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="text-sm font-medium flex-shrink-0">Calificación:</span>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => onRate(conversation.id, star)}
                      className="transition-colors hover:scale-110"
                    >
                      <Star 
                        className={`h-4 w-4 ${
                          (conversation.rating || 0) >= star 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-gray-300 hover:text-yellow-300'
                        }`} 
                      />
                    </button>
                  ))}
                </div>
                {conversation.rating && (
                  <span className="text-sm text-muted-foreground">
                    ({conversation.rating}/5)
                  </span>
                )}
              </div>
            </div>

            {/* Similarity Check */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onCheckSimilarity(conversation.id)}
                className="flex items-center gap-1 w-full sm:w-auto"
              >
                <Copy className="h-4 w-4" />
                <span className="hidden sm:inline">Verificar Similitud</span>
                <span className="sm:hidden">Similitud</span>
              </Button>
              {conversation.similarity !== undefined && (
                <Badge variant={conversation.similarity > 0.8 ? "destructive" : "secondary"}>
                  {Math.round(conversation.similarity * 100)}% similar
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ConversationCard;