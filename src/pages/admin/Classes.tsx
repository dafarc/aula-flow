import { mockClasses, mockCourses } from "@/lib/mock-data";
import { Plus, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const Classes = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold">Turmas</h1>
          <p className="text-muted-foreground text-sm mt-1">Organize seus alunos em turmas.</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" /> Nova Turma
        </Button>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {mockClasses.map((cls) => {
          const course = mockCourses.find((c) => c.id === cls.courseId);
          return (
            <div key={cls.id} className="glass-card p-5 hover:border-primary/30 transition-colors cursor-pointer">
              <h3 className="font-display font-semibold">{cls.name}</h3>
              {course && <p className="text-xs text-primary mt-1">{course.title}</p>}
              <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {cls.studentsCount} alunos</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {cls.startDate}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Classes;
