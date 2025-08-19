import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, TrendingUp, BarChart, Users, Clock, CheckCircle } from "lucide-react";

const Analisis = () => {
  const kpis = [
    {
      title: "Tasa de Implementación",
      value: "68%",
      change: "+15%",
      trend: "up",
      description: "Ideas implementadas vs. aprobadas"
    },
    {
      title: "Tiempo Promedio de Evaluación",
      value: "12 días",
      change: "-3 días",
      trend: "down",
      description: "Desde envío hasta aprobación"
    },
    {
      title: "Participación por Empleado",
      value: "2.3",
      change: "+0.7",
      trend: "up",
      description: "Ideas promedio por empleado"
    },
    {
      title: "ROI de Ideas Implementadas",
      value: "340%",
      change: "+25%",
      trend: "up",
      description: "Retorno de inversión promedio"
    }
  ];

  const departmentStats = [
    { name: "Producción", ideas: 89, implemented: 23, percentage: 89 },
    { name: "Calidad", ideas: 52, implemented: 18, percentage: 52 },
    { name: "Logística", ideas: 41, implemented: 12, percentage: 41 },
    { name: "IT", ideas: 35, implemented: 15, percentage: 35 },
    { name: "RRHH", ideas: 30, implemented: 8, percentage: 30 },
  ];

  const categoryAnalysis = [
    { category: "Automatización", count: 45, impact: "Alto", savings: "$120,000" },
    { category: "Sostenibilidad", count: 32, impact: "Medio", savings: "$85,000" },
    { category: "Eficiencia", count: 28, impact: "Alto", savings: "$95,000" },
    { category: "Seguridad", count: 21, impact: "Alto", savings: "$65,000" },
    { category: "Bienestar", count: 18, impact: "Medio", savings: "$40,000" },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2 mb-2">
          <PieChart className="h-8 w-8 text-primary" />
          Análisis de Innovación
        </h1>
        <p className="text-muted-foreground">
          Métricas y análisis detallado del programa de ideas
        </p>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {kpis.map((kpi, index) => (
          <Card key={kpi.title} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
                {kpi.trend === "up" ? (
                  <TrendingUp className="h-4 w-4 text-green-600" />
                ) : (
                  <TrendingUp className="h-4 w-4 text-green-600 rotate-180" />
                )}
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">{kpi.value}</div>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-medium ${kpi.trend === "up" ? "text-green-600" : "text-green-600"}`}>
                  {kpi.change}
                </span>
                <span className="text-xs text-muted-foreground">{kpi.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        {/* Department Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5" />
              Áreas Más Innovadoras
            </CardTitle>
            <CardDescription>Ideas recibidas por departamento</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departmentStats.map((dept) => (
                <div key={dept.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{dept.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{dept.ideas} ideas</span>
                      <span className="text-sm font-medium">{dept.implemented} implementadas</span>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${dept.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Category Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Análisis por Categoría
            </CardTitle>
            <CardDescription>Impacto y ahorro por tipo de idea</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryAnalysis.map((category) => (
                <div key={category.category} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <div className="font-medium">{category.category}</div>
                    <div className="text-sm text-muted-foreground">{category.count} ideas</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-green-600">{category.savings}</div>
                    <div className={`text-xs px-2 py-1 rounded ${
                      category.impact === "Alto" 
                        ? "bg-red-100 text-red-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      Impacto {category.impact}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="h-5 w-5" />
              Top Innovadores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "María González", ideas: 12, implemented: 8 },
                { name: "Carlos Rodríguez", ideas: 9, implemented: 6 },
                { name: "Ana Martínez", ideas: 8, implemented: 5 },
                { name: "Luis Fernández", ideas: 7, implemented: 4 },
              ].map((innovator) => (
                <div key={innovator.name} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">{innovator.name}</div>
                    <div className="text-xs text-muted-foreground">{innovator.ideas} ideas</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-green-600">{innovator.implemented}</div>
                    <div className="text-xs text-muted-foreground">implementadas</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="h-5 w-5" />
              Tendencia Mensual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { month: "Enero", ideas: 45, trend: "+12%" },
                { month: "Febrero", ideas: 52, trend: "+15%" },
                { month: "Marzo", ideas: 38, trend: "-27%" },
                { month: "Abril", ideas: 61, trend: "+61%" },
              ].map((month) => (
                <div key={month.month} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{month.month}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{month.ideas}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      month.trend.startsWith('+') 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    }`}>
                      {month.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <CheckCircle className="h-5 w-5" />
              Estado Actual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">247</div>
                <div className="text-sm text-muted-foreground">Ideas totales</div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Pendientes</span>
                  <span className="font-medium">45</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>En evaluación</span>
                  <span className="font-medium">32</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Aprobadas</span>
                  <span className="font-medium">78</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Implementadas</span>
                  <span className="font-medium">92</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analisis;