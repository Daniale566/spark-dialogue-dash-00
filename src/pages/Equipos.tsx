import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Mail, Phone, MapPin, Award, Lightbulb, TrendingUp } from "lucide-react";

const Equipos = () => {
  const teams = [
    {
      id: 1,
      name: "Equipo de Producción",
      department: "Producción",
      leader: "María González",
      members: 15,
      totalIdeas: 89,
      implementedIdeas: 23,
      location: "Medellín - Planta Principal",
      performance: "Excelente",
      recentIdeas: [
        "Automatización de línea de ensamble",
        "Optimización de tiempos de setup",
        "Sistema de control de calidad en tiempo real"
      ]
    },
    {
      id: 2,
      name: "Equipo de Calidad",
      department: "Control de Calidad",
      leader: "Carlos Rodríguez",
      members: 8,
      totalIdeas: 52,
      implementedIdeas: 18,
      location: "Rionegro - Centro de Distribución",
      performance: "Muy Bueno",
      recentIdeas: [
        "Sistema de trazabilidad QR",
        "Protocolo de inspección visual",
        "Dashboard de métricas de calidad"
      ]
    },
    {
      id: 3,
      name: "Equipo de Logística",
      department: "Logística y Distribución",
      leader: "Ana Martínez",
      members: 12,
      totalIdeas: 41,
      implementedIdeas: 12,
      location: "Envigado - Centro Logístico",
      performance: "Bueno",
      recentIdeas: [
        "Optimización de rutas de distribución",
        "Sistema de inventario inteligente",
        "App para tracking de pedidos"
      ]
    },
    {
      id: 4,
      name: "Equipo de IT",
      department: "Tecnología",
      leader: "Luis Fernández",
      members: 6,
      totalIdeas: 35,
      implementedIdeas: 15,
      location: "Medellín - Oficina Central",
      performance: "Excelente",
      recentIdeas: [
        "Migración a la nube",
        "Sistema de backup automático",
        "Portal de autoservicio"
      ]
    },
    {
      id: 5,
      name: "Equipo de RRHH",
      department: "Recursos Humanos",
      leader: "Patricia Silva",
      members: 5,
      totalIdeas: 30,
      implementedIdeas: 8,
      location: "Bello - Oficina Administrativa",
      performance: "Bueno",
      recentIdeas: [
        "Programa de bienestar laboral",
        "Sistema de evaluación 360°",
        "Portal de capacitaciones online"
      ]
    }
  ];

  const topPerformers = [
    { name: "María González", team: "Producción", ideas: 12, rating: 4.9 },
    { name: "Carlos Rodríguez", team: "Calidad", ideas: 9, rating: 4.8 },
    { name: "Ana Martínez", team: "Logística", ideas: 8, rating: 4.7 },
    { name: "Luis Fernández", team: "IT", ideas: 7, rating: 4.8 },
    { name: "Patricia Silva", team: "RRHH", ideas: 6, rating: 4.6 },
  ];

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'Excelente': return 'bg-green-100 text-green-800 border-green-200';
      case 'Muy Bueno': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Bueno': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getImplementationRate = (implemented: number, total: number) => {
    return Math.round((implemented / total) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2 mb-2">
          <Users className="h-8 w-8 text-primary" />
          Gestión de Equipos
        </h1>
        <p className="text-muted-foreground">
          Administra equipos de trabajo y su rendimiento en innovación
        </p>
      </div>

      {/* Team Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-primary mb-2">5</div>
            <p className="text-sm text-muted-foreground">Equipos Activos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">46</div>
            <p className="text-sm text-muted-foreground">Colaboradores Participando</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-green-600 mb-2">76</div>
            <p className="text-sm text-muted-foreground">Ideas Implementadas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-yellow-600 mb-2">31%</div>
            <p className="text-sm text-muted-foreground">Tasa de Implementación</p>
          </CardContent>
        </Card>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        {teams.map((team) => (
          <Card key={team.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{team.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1 mt-1">
                    <MapPin className="h-4 w-4" />
                    {team.location}
                  </CardDescription>
                </div>
                <Badge className={`${getPerformanceColor(team.performance)} border`}>
                  {team.performance}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Team Leader */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{team.leader}</div>
                      <div className="text-xs text-muted-foreground">Líder del equipo</div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">{team.members} miembros</div>
                </div>

                {/* Ideas Stats */}
                <div className="grid grid-cols-3 gap-4 py-3 border-t">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{team.totalIdeas}</div>
                    <div className="text-xs text-muted-foreground">Ideas Totales</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{team.implementedIdeas}</div>
                    <div className="text-xs text-muted-foreground">Implementadas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {getImplementationRate(team.implementedIdeas, team.totalIdeas)}%
                    </div>
                    <div className="text-xs text-muted-foreground">Tasa Éxito</div>
                  </div>
                </div>

                {/* Recent Ideas */}
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">Ideas Recientes:</div>
                  <div className="space-y-1">
                    {team.recentIdeas.slice(0, 2).map((idea, index) => (
                      <div key={index} className="text-xs text-muted-foreground flex items-center gap-1">
                        <Lightbulb className="h-3 w-3" />
                        {idea}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2 border-t">
                  <Button variant="outline" size="sm" className="flex-1">
                    Ver Detalles
                  </Button>
                  <Button variant="outline" size="sm">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Top Performers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Top Innovadores del Mes
          </CardTitle>
          <CardDescription>
            Colaboradores destacados por su contribución al programa de ideas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {topPerformers.map((performer, index) => (
              <Card key={performer.name} className="relative">
                <CardContent className="p-4 text-center">
                  {index === 0 && (
                    <div className="absolute -top-2 -right-2">
                      <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                        <Award className="h-3 w-3 text-white" />
                      </div>
                    </div>
                  )}
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div className="font-medium text-sm mb-1">{performer.name}</div>
                  <div className="text-xs text-muted-foreground mb-2">{performer.team}</div>
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Lightbulb className="h-3 w-3 text-yellow-500" />
                    <span className="text-sm font-medium">{performer.ideas} ideas</span>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span className="text-xs">{performer.rating} rating</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Equipos;