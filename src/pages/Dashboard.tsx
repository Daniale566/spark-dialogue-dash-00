import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Users, Clock, TrendingUp, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import ConversationCard from "@/components/dashboard/ConversationCard";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { toast } = useToast();

  // Datos simulados para el dashboard
  const stats = [
    {
      title: "Total Conversaciones",
      value: "1,247",
      description: "Últimos 30 días",
      icon: MessageCircle,
      trend: "+12%"
    },
    {
      title: "Conversaciones Pendientes",
      value: "23",
      description: "Requieren revisión",
      icon: AlertCircle,
      trend: "+5%"
    },
    {
      title: "Tiempo Promedio",
      value: "3.2 min",
      description: "Por conversación",
      icon: Clock,
      trend: "-5%"
    },
    {
      title: "Tasa de Aceptación",
      value: "89%",
      description: "Conversaciones aprobadas",
      icon: CheckCircle,
      trend: "+3%"
    }
  ];

  // Conversaciones simuladas con formato específico
  const [conversations, setConversations] = useState([
    {
      id: "CONV-2024-001",
      userId: "user_anonymous_001",
      status: 'pendiente' as const,
      messageCount: 8,
      lastMessage: "¿Puedes ayudarme con información sobre productos?",
      timestamp: "2024-01-17 14:30",
      summary: "Usuario consulta sobre catálogo de productos y precios. Mostró interés en productos de temporada y solicita información detallada sobre disponibilidad."
    },
    {
      id: "CONV-2024-002", 
      userId: "user_anonymous_002",
      status: 'aceptada' as const,
      messageCount: 12,
      lastMessage: "Gracias por la información completa",
      timestamp: "2024-01-17 13:15",
      summary: "Conversación sobre soporte técnico. Usuario reportó problema con su cuenta y se le proporcionó solución exitosa."
    },
    {
      id: "CONV-2024-003",
      userId: "user_anonymous_003", 
      status: 'pendiente' as const,
      messageCount: 5,
      lastMessage: "¿Cuáles son los métodos de pago disponibles?",
      timestamp: "2024-01-17 12:45",
      summary: "Consulta sobre métodos de pago y políticas de devolución. Usuario evalúa realizar una compra de alto valor."
    },
    {
      id: "CONV-2024-004",
      userId: "user_anonymous_004",
      status: 'rechazada' as const, 
      messageCount: 3,
      lastMessage: "Contenido inapropiado detectado",
      timestamp: "2024-01-17 11:20",
      summary: "Conversación rechazada por contener solicitudes fuera del alcance del servicio y lenguaje inapropiado."
    },
    {
      id: "CONV-2024-005",
      userId: "user_anonymous_005",
      status: 'activa' as const,
      messageCount: 15,
      lastMessage: "Estoy revisando las opciones que me enviaste",
      timestamp: "2024-01-17 10:30",
      summary: "Conversación activa sobre personalización de productos. Usuario está en proceso de selección y configuración."
    }
  ]);

  const handleAcceptConversation = (id: string) => {
    setConversations(prev => 
      prev.map(conv => 
        conv.id === id 
          ? { ...conv, status: 'aceptada' as const }
          : conv
      )
    );
    toast({
      title: "Conversación Aceptada",
      description: `La conversación ${id} ha sido marcada como aceptada.`,
    });
  };

  const handleRejectConversation = (id: string) => {
    setConversations(prev => 
      prev.map(conv => 
        conv.id === id 
          ? { ...conv, status: 'rechazada' as const }
          : conv
      )
    );
    toast({
      title: "Conversación Rechazada",
      description: `La conversación ${id} ha sido marcada como rechazada.`,
      variant: "destructive"
    });
  };

  const handleRate = (id: string, rating: number) => {
    setConversations(prev => 
      prev.map(conv => 
        conv.id === id ? { ...conv, rating } : conv
      )
    );
    toast({
      title: "Calificación guardada",
      description: `Conversación ${id} calificada con ${rating} estrellas`,
    });
  };

  const handleCheckSimilarity = (id: string) => {
    // Simulate AI similarity check
    const similarity = Math.random();
    setConversations(prev => 
      prev.map(conv => 
        conv.id === id ? { ...conv, similarity } : conv
      )
    );
    
    const percentage = Math.round(similarity * 100);
    toast({
      title: "Análisis de similitud completado",
      description: `Conversación ${id} tiene ${percentage}% de similitud con otras`,
      variant: similarity > 0.8 ? "destructive" : "default",
    });
  };

  const filterConversations = (status?: string) => {
    if (!status) return conversations;
    return conversations.filter(conv => conv.status === status);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard de Trazabilidad</h1>
          <p className="text-muted-foreground">
            Monitorea y gestiona las conversaciones del chat con trazabilidad completa
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={stat.title} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                  <Badge 
                    variant={stat.trend.startsWith('+') ? 'secondary' : 'outline'}
                    className="text-xs"
                  >
                    {stat.trend}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Conversaciones con Trazabilidad */}
        <Card className="animate-slide-up" style={{ animationDelay: '400ms' }}>
          <CardHeader>
            <CardTitle className="text-xl text-foreground">Gestión de Conversaciones</CardTitle>
            <CardDescription>
              Revisa, acepta o rechaza conversaciones con trazabilidad por ID
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">Todas ({conversations.length})</TabsTrigger>
                <TabsTrigger value="pendiente">
                  Pendientes ({filterConversations('pendiente').length})
                </TabsTrigger>
                <TabsTrigger value="aceptada">
                  Aceptadas ({filterConversations('aceptada').length})
                </TabsTrigger>
                <TabsTrigger value="rechazada">
                  Rechazadas ({filterConversations('rechazada').length})
                </TabsTrigger>
                <TabsTrigger value="activa">
                  Activas ({filterConversations('activa').length})
                </TabsTrigger>
              </TabsList>

              {['all', 'pendiente', 'aceptada', 'rechazada', 'activa'].map(status => (
                <TabsContent key={status} value={status} className="mt-6">
                  <ScrollArea className="h-[600px]">
                    <div className="grid gap-4">
                      {filterConversations(status === 'all' ? undefined : status).map((conversation) => (
                        <ConversationCard
                          key={conversation.id}
                          conversation={conversation}
                          onAccept={handleAcceptConversation}
                          onReject={handleRejectConversation}
                          onRate={handleRate}
                          onCheckSimilarity={handleCheckSimilarity}
                        />
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;