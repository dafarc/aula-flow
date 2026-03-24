import { Plus, Users, PlayCircle, BookOpen } from "lucide-react";
import { mockCourses } from "@/lib/mock-data";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Courses = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold">Cursos</h1>
          <p className="text-muted-foreground text-sm mt-1">Gerencie seus cursos, módulos e aulas.</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" /> Novo Curso
        </Button>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockCourses.map((course) => (
          <Link key={course.id} to={`/admin/courses/${course.id}`} className="glass-card overflow-hidden group hover:border-primary/30 transition-colors">
            <div className="h-36 bg-gradient-to-br from-primary/20 to-secondary flex items-center justify-center">
              <BookOpen className="w-12 h-12 text-primary/50 group-hover:text-primary transition-colors" />
            </div>
            <div className="p-5">
              <h3 className="font-display font-semibold text-lg">{course.title}</h3>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{course.description}</p>
              <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {course.studentsCount} alunos</span>
                <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> {course.modulesCount} módulos</span>
                <span className="flex items-center gap-1"><PlayCircle className="w-3.5 h-3.5" /> {course.lessonsCount} aulas</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Courses;
