import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Calendar, BarChart3, Target } from "lucide-react";

const Tendencias = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2 mb-2">
          <TrendingUp className="h-8 w-8 text-primary" />
          Tendencias de Innovación
        </h1>
        <p className="text-muted-foreground">
          Análisis de tendencias y proyecciones futuras
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Tendencias por Categoría
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["Automatización", "Sostenibilidad", "Eficiencia", "Tecnología"].map((trend, index) => (
                <div key={trend} className="flex justify-between items-center">
                  <span>{trend}</span>
                  <span className="text-green-600 font-medium">+{15 + index * 3}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Proyecciones Q2 2024
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">320</div>
              <p className="text-muted-foreground">Ideas proyectadas</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Tendencias;