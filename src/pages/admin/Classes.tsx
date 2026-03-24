import { mockClasses, mockCourses } from "@/lib/mock-data";
import { Plus, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const Classes = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-display font-bold">Turmas</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Organize seus alunos em turmas.</p>
        </div>
        <Button size="sm" className="gap-1.5 text-xs">
          <Plus className="w-3.5 h-3.5" /> Nova Turma
        </Button>
      </div>

      <div className="bg-card rounded-lg border border-border divide-y divide-border">
        {mockClasses.map((cls) => {
          const course = mockCourses.find((c) => c.id === cls.courseId);
          return (
            <div key={cls.id} className="flex items-center gap-4 px-4 py-3.5 hover:bg-secondary/50 transition-colors cursor-pointer">
              <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                <Users className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{cls.name}</p>
                {course && <p className="text-xs text-primary">{course.title}</p>}
              </div>
              <div className="hidden sm:flex items-center gap-4 text-xs text-muted-foreground shrink-0">
                <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {cls.studentsCount}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {cls.startDate}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Classes;
