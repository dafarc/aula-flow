import { Plus, Users, PlayCircle, BookOpen, MoreHorizontal } from "lucide-react";
import { mockCourses } from "@/lib/mock-data";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Courses = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-display font-bold">Cursos</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Gerencie seus cursos, módulos e aulas.</p>
        </div>
        <Button size="sm" className="gap-1.5 text-xs">
          <Plus className="w-3.5 h-3.5" /> Novo Curso
        </Button>
      </div>

      <div className="bg-card rounded-lg border border-border divide-y divide-border">
        {mockCourses.map((course) => (
          <Link key={course.id} to={`/admin/courses/${course.id}`} className="flex items-center gap-4 px-4 py-4 hover:bg-secondary/50 transition-colors group">
            <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">{course.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{course.description}</p>
            </div>
            <div className="hidden sm:flex items-center gap-6 text-xs text-muted-foreground shrink-0">
              <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {course.studentsCount}</span>
              <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {course.modulesCount} mód.</span>
              <span className="flex items-center gap-1"><PlayCircle className="w-3 h-3" /> {course.lessonsCount} aulas</span>
            </div>
            <MoreHorizontal className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Courses;
