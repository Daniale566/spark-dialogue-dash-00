import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MessageCircle, Clock, CheckCircle, AlertCircle, Search, Filter, Calendar, MapPin, Star, Download, RefreshCw, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type ConversationStatus = 'En Prueba' | 'Escalada' | 'Clasificada' | 'Aprobada' | 'Recibida';

interface Conversation {
  id: string;
  title: string;
  collaborator: { name: string; code: string; empId: string };
  category: string;
  location: string;
  date: string;
  status: ConversationStatus;
  messageCount: number;
  lastMessage: string;
  timestamp: string;
  summary: string;
  department: string;
  rating?: number;
  similarity?: number;
}

const Dashboard = () => {
  const { toast } = useToast();

  // Estado para filtros y búsqueda
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");

  // Datos simulados para el dashboard
  const stats = [
    {
      title: "Ideas Recibidas",
      value: "247",
      description: "+12% este mes vs. 220 mes anterior",
      icon: MessageCircle,
      trend: "+12%",
      color: "text-green-600"
    },
    {
      title: "Ideas Aprobadas",
      value: "34",
      description: "+8% para piloto 13.8% tasa aprobación",
      icon: CheckCircle,
      trend: "+8%",
      color: "text-green-600"
    },
    {
      title: "Alineación Estratégica",
      value: "78%",
      description: "+5% promedio objetivo: 80%",
      icon: Clock,
      trend: "+5%",
      color: "text-green-600"
    },
    {
      title: "Tiempo Promedio",
      value: "3.2 días",
      description: "-0.5 días clasificación IA",
      icon: AlertCircle,
      trend: "-0.5",
      color: "text-red-600"
    }
  ];

  // Conversaciones simuladas con formato específico
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "001",
      title: "Automatización de corte de materiales",
      collaborator: { name: "María González", code: "MG", empId: "EMP-4521" },
      category: "Automatización",
      location: "Medellín - Planta Principal",
      date: "14/1/2024",
      status: 'En Prueba',
      messageCount: 8,
      lastMessage: "¿Puedes ayudarme con información sobre productos?",
      timestamp: "2024-01-17 14:30",
      summary: "Usuario consulta sobre catálogo de productos y precios. Mostró interés en productos de temporada y solicita información detallada sobre disponibilidad.",
      department: "Producción"
    },
    {
      id: "002",
      title: "Sistema de trazabilidad para calidad",
      collaborator: { name: "Carlos Rodríguez", code: "CR", empId: "EMP-3847" },
      category: "Calidad",
      location: "Rionegro - Centro de Distribución",
      date: "13/1/2024",
      status: 'Escalada',
      messageCount: 12,
      lastMessage: "Gracias por la información completa",
      timestamp: "2024-01-17 13:15",
      summary: "Conversación sobre soporte técnico. Usuario reportó problema con su cuenta y se le proporcionó solución exitosa.",
      department: "Calidad"
    },
    {
      id: "003",
      title: "App móvil para control de inventario",
      collaborator: { name: "Ana Martínez", code: "AM", empId: "EMP-2156" },
      category: "Tecnología",
      location: "Envigado - Planta Confección",
      date: "12/1/2024",
      status: 'Clasificada',
      messageCount: 5,
      lastMessage: "¿Cuáles son los métodos de pago disponibles?",
      timestamp: "2024-01-17 12:45",
      summary: "Consulta sobre métodos de pago y políticas de devolución. Usuario evalúa realizar una compra de alto valor.",
      department: "IT"
    },
    {
      id: "004",
      title: "Programa de reciclaje de residuos",
      collaborator: { name: "Luis Fernández", code: "LF", empId: "EMP-5632" },
      category: "Sostenibilidad",
      location: "Itagüí - Planta Acabados",
      date: "11/1/2024",
      status: 'Aprobada',
      messageCount: 3,
      lastMessage: "Contenido inapropiado detectado",
      timestamp: "2024-01-17 11:20",
      summary: "Conversación rechazada por contener solicitudes fuera del alcance del servicio y lenguaje inapropiado.",
      department: "Sostenibilidad"
    },
    {
      id: "005",
      title: "Mejora ergonómica en estaciones de trabajo",
      collaborator: { name: "Patricia Silva", code: "PS", empId: "EMP-7891" },
      category: "Bienestar Laboral",
      location: "Bello - Planta Confección",
      date: "10/1/2024",
      status: 'Recibida',
      messageCount: 15,
      lastMessage: "Estoy revisando las opciones que me enviaste",
      timestamp: "2024-01-17 10:30",
      summary: "Conversación activa sobre personalización de productos. Usuario está en proceso de selección y configuración.",
      department: "RRHH"
    }
  ]);

  const getStatusBadgeColor = (status: ConversationStatus) => {
    switch (status) {
      case 'En Prueba': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Escalada': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Clasificada': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Aprobada': return 'bg-green-100 text-green-800 border-green-200';
      case 'Recibida': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'Automatización': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Calidad': return 'bg-green-50 text-green-700 border-green-200';
      case 'Tecnología': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Sostenibilidad': return 'bg-teal-50 text-teal-700 border-teal-200';
      case 'Bienestar Laboral': return 'bg-orange-50 text-orange-700 border-orange-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.collaborator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || conv.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || conv.category === categoryFilter;
    const matchesLocation = locationFilter === 'all' || conv.location.includes(locationFilter);
    
    return matchesSearch && matchesStatus && matchesCategory && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8 animate-fade-in">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Dashboard Gerencial</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Sistema de gestión estratégica de ideas empresariales
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          {stats.map((stat, index) => (
            <Card key={stat.title} className="animate-slide-up hover:shadow-lg transition-shadow" style={{ animationDelay: `${index * 100}ms` }}>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <div className="text-xl sm:text-3xl font-bold text-foreground">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">
                      {stat.description}
                    </p>
                  </div>
                  <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filtros Avanzados */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              <CardTitle>Filtros Avanzados</CardTitle>
            </div>
            <CardDescription>Personaliza tu vista de datos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar ideas, empleados, ubicación..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos los estados" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="En Prueba">En Prueba</SelectItem>
                  <SelectItem value="Escalada">Escalada</SelectItem>
                  <SelectItem value="Clasificada">Clasificada</SelectItem>
                  <SelectItem value="Aprobada">Aprobada</SelectItem>
                  <SelectItem value="Recibida">Recibida</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas las categorías" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  <SelectItem value="Automatización">Automatización</SelectItem>
                  <SelectItem value="Calidad">Calidad</SelectItem>
                  <SelectItem value="Tecnología">Tecnología</SelectItem>
                  <SelectItem value="Sostenibilidad">Sostenibilidad</SelectItem>
                  <SelectItem value="Bienestar Laboral">Bienestar Laboral</SelectItem>
                </SelectContent>
              </Select>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas las ubicaciones" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="Medellín">Medellín</SelectItem>
                  <SelectItem value="Rionegro">Rionegro</SelectItem>
                  <SelectItem value="Envigado">Envigado</SelectItem>
                  <SelectItem value="Itagüí">Itagüí</SelectItem>
                  <SelectItem value="Bello">Bello</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Star className="h-4 w-4 mr-2" />
                  Ideas de Alto Impacto
                </Button>
                <Button variant="outline" size="sm">
                  <Star className="h-4 w-4 mr-2" />
                  Innovación Tecnológica
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Actualizar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabla de Ideas */}
        <Card>
          <CardHeader>
            <CardTitle>Gestión de Ideas</CardTitle>
            <CardDescription>
              {filteredConversations.length} de {conversations.length} ideas mostradas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">ID</TableHead>
                    <TableHead className="min-w-[200px]">Idea</TableHead>
                    <TableHead className="min-w-[120px]">Colaborador</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead className="min-w-[150px]">Ubicación</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="w-20">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredConversations.map((conversation) => (
                    <TableRow key={conversation.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{conversation.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-sm">{conversation.title}</div>
                          <div className="text-xs text-muted-foreground">{conversation.department}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                            {conversation.collaborator.code}
                          </div>
                          <div>
                            <div className="text-sm font-medium">{conversation.collaborator.name}</div>
                            <div className="text-xs text-muted-foreground">{conversation.collaborator.empId}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getCategoryBadgeColor(conversation.category)} border text-xs`}>
                          {conversation.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{conversation.location}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{conversation.date}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getStatusBadgeColor(conversation.status)} border text-xs`}>
                          {conversation.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;