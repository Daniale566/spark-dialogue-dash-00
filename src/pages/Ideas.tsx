import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Lightbulb, Plus, Search, Filter, Eye, Edit, Trash2, Star } from "lucide-react";

const Ideas = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const ideas = [
    {
      id: "001",
      title: "Sistema de automatización de inventarios",
      description: "Implementar un sistema automatizado para el control de inventarios en tiempo real",
      author: "María González",
      department: "Logística",
      category: "Automatización",
      priority: "Alta",
      status: "En Evaluación",
      createdAt: "2024-01-15",
      votes: 23,
      comments: 5
    },
    {
      id: "002", 
      title: "Programa de bienestar laboral",
      description: "Crear espacios de relajación y actividades de team building para mejorar el ambiente laboral",
      author: "Carlos Rodríguez",
      department: "RRHH",
      category: "Bienestar",
      priority: "Media",
      status: "Aprobada",
      createdAt: "2024-01-12",
      votes: 18,
      comments: 8
    },
    {
      id: "003",
      title: "Optimización energética",
      description: "Implementar paneles solares y sistemas de ahorro energético en todas las plantas",
      author: "Ana Martínez",
      department: "Sostenibilidad",
      category: "Medio Ambiente",
      priority: "Alta",
      status: "En Desarrollo",
      createdAt: "2024-01-10",
      votes: 31,
      comments: 12
    },
    {
      id: "004",
      title: "App móvil para reportes",
      description: "Desarrollar aplicación móvil para que los empleados puedan reportar incidencias",
      author: "Luis Fernández",
      department: "IT",
      category: "Tecnología",
      priority: "Media",
      status: "Pendiente",
      createdAt: "2024-01-08",
      votes: 15,
      comments: 3
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aprobada': return 'bg-green-100 text-green-800 border-green-200';
      case 'En Desarrollo': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'En Evaluación': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Pendiente': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Alta': return 'bg-red-100 text-red-800 border-red-200';
      case 'Media': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Baja': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredIdeas = ideas.filter(idea => {
    const matchesSearch = idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         idea.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         idea.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || idea.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-subtle p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <Lightbulb className="h-8 w-8 text-primary" />
              Gestión de Ideas
            </h1>
            <p className="text-muted-foreground">
              Administra y evalúa las ideas innovadoras de los colaboradores
            </p>
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Nueva Idea
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">124</div>
              <p className="text-sm text-muted-foreground">Ideas Totales</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">23</div>
              <p className="text-sm text-muted-foreground">Aprobadas</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">45</div>
              <p className="text-sm text-muted-foreground">En Evaluación</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-yellow-600">18</div>
              <p className="text-sm text-muted-foreground">En Desarrollo</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex gap-4 items-center">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar ideas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="Pendiente">Pendiente</SelectItem>
                  <SelectItem value="En Evaluación">En Evaluación</SelectItem>
                  <SelectItem value="Aprobada">Aprobada</SelectItem>
                  <SelectItem value="En Desarrollo">En Desarrollo</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Más Filtros
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ideas Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Ideas</CardTitle>
          <CardDescription>
            {filteredIdeas.length} de {ideas.length} ideas mostradas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Idea</TableHead>
                <TableHead>Autor</TableHead>
                <TableHead>Departamento</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Prioridad</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Votos</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIdeas.map((idea) => (
                <TableRow key={idea.id}>
                  <TableCell className="font-medium">{idea.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{idea.title}</div>
                      <div className="text-sm text-muted-foreground">{idea.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>{idea.author}</TableCell>
                  <TableCell>{idea.department}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{idea.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getPriorityColor(idea.priority)} border`}>
                      {idea.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(idea.status)} border`}>
                      {idea.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>{idea.votes}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Ideas;