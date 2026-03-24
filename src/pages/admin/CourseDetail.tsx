import { useParams, Link } from "react-router-dom";
import { mockCourses, mockModules } from "@/lib/mock-data";
import { ChevronLeft, Plus, PlayCircle, FileText, HelpCircle, CheckCircle2, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";

const typeIcons = {
  video: PlayCircle,
  pdf: FileText,
  quiz: HelpCircle,
};

const typeLabels = {
  video: "Vídeo",
  pdf: "PDF",
  quiz: "Quiz",
};

const CourseDetail = () => {
  const { courseId } = useParams();
  const course = mockCourses.find((c) => c.id === courseId);
  const modules = mockModules.filter((m) => m.courseId === courseId);
  const [openModules, setOpenModules] = useState<string[]>([modules[0]?.id || ""]);

  const toggleModule = (id: string) => {
    setOpenModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  if (!course) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">Curso não encontrado.</p>
        <Link to="/admin/courses" className="text-primary hover:underline text-sm mt-2 inline-block">Voltar</Link>
      </div>
    );
  }

  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedLessons = modules.reduce(
    (acc, m) => acc + m.lessons.filter((l) => l.completed).length,
    0
  );
  const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/admin/courses" className="p-2 rounded-lg hover:bg-secondary transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-display font-bold">{course.title}</h1>
          <p className="text-sm text-muted-foreground mt-1">{course.description}</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" /> Novo Módulo
        </Button>
      </div>

      {/* Progress */}
      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-muted-foreground">Progresso do curso</p>
          <p className="text-sm font-medium">{completedLessons}/{totalLessons} aulas</p>
        </div>
        <Progress value={progressPercent} className="h-2" />
      </div>

      {/* Modules */}
      <div className="space-y-3">
        {modules.map((mod) => {
          const isOpen = openModules.includes(mod.id);
          const modCompleted = mod.lessons.filter((l) => l.completed).length;
          return (
            <div key={mod.id} className="glass-card overflow-hidden">
              <button
                onClick={() => toggleModule(mod.id)}
                className="w-full flex items-center gap-3 p-4 hover:bg-secondary/50 transition-colors"
              >
                {isOpen ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                <div className="flex-1 text-left">
                  <p className="font-medium text-sm">Módulo {mod.order}: {mod.title}</p>
                  <p className="text-xs text-muted-foreground">{modCompleted}/{mod.lessons.length} concluídas</p>
                </div>
              </button>
              {isOpen && (
                <div className="border-t border-border">
                  {mod.lessons.map((lesson) => {
                    const Icon = typeIcons[lesson.type];
                    return (
                      <div key={lesson.id} className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/30 transition-colors border-b border-border/50 last:border-b-0">
                        {lesson.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                        ) : (
                          <Icon className="w-5 h-5 text-muted-foreground shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{lesson.title}</p>
                          <p className="text-xs text-muted-foreground">{typeLabels[lesson.type]}{lesson.duration ? ` · ${lesson.duration}` : ''}</p>
                        </div>
                        {lesson.type === 'video' && lesson.watchProgress !== undefined && lesson.watchProgress > 0 && !lesson.completed && (
                          <div className="w-16">
                            <Progress value={lesson.watchProgress} className="h-1" />
                            <p className="text-[10px] text-muted-foreground text-right mt-0.5">{lesson.watchProgress}%</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseDetail;
