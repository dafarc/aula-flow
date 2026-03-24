import { useParams, Link } from "react-router-dom";
import { mockCourses, mockModules } from "@/lib/mock-data";
import { ChevronLeft, Plus, PlayCircle, FileText, HelpCircle, CheckCircle2, ChevronDown, ChevronRight, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";

const typeIcons = { video: PlayCircle, pdf: FileText, quiz: HelpCircle };
const typeLabels = { video: "Vídeo", pdf: "PDF", quiz: "Quiz" };
const typeBadgeColors = { video: "bg-info/10 text-info", pdf: "bg-destructive/10 text-destructive", quiz: "bg-warning/10 text-warning" };

const CourseDetail = () => {
  const { courseId } = useParams();
  const course = mockCourses.find((c) => c.id === courseId);
  const modules = mockModules.filter((m) => m.courseId === courseId);
  const [openModules, setOpenModules] = useState<string[]>([modules[0]?.id || ""]);

  const toggleModule = (id: string) => {
    setOpenModules((prev) => prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]);
  };

  if (!course) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground text-sm">Curso não encontrado.</p>
        <Link to="/admin/courses" className="text-primary hover:underline text-xs mt-2 inline-block">Voltar</Link>
      </div>
    );
  }

  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedLessons = modules.reduce((acc, m) => acc + m.lessons.filter((l) => l.completed).length, 0);
  const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link to="/admin/courses" className="p-1.5 rounded-md hover:bg-secondary transition-colors">
          <ChevronLeft className="w-4 h-4 text-muted-foreground" />
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-display font-bold truncate">{course.title}</h1>
          <p className="text-xs text-muted-foreground mt-0.5">{course.description}</p>
        </div>
        <Button size="sm" className="gap-1.5 text-xs shrink-0">
          <Plus className="w-3.5 h-3.5" /> Módulo
        </Button>
      </div>

      {/* Progress bar */}
      <div className="bg-card rounded-lg border border-border p-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-muted-foreground">Progresso geral</span>
          <span className="text-xs font-medium">{completedLessons}/{totalLessons} aulas</span>
        </div>
        <Progress value={progressPercent} className="h-1.5" />
      </div>

      {/* Modules */}
      <div className="space-y-2">
        {modules.map((mod) => {
          const isOpen = openModules.includes(mod.id);
          const modCompleted = mod.lessons.filter((l) => l.completed).length;
          return (
            <div key={mod.id} className="bg-card rounded-lg border border-border overflow-hidden">
              <button
                onClick={() => toggleModule(mod.id)}
                className="w-full flex items-center gap-2 px-4 py-3 hover:bg-secondary/50 transition-colors"
              >
                {isOpen ? <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" /> : <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />}
                <span className="text-sm font-semibold text-foreground flex-1 text-left">
                  {mod.order}. {mod.title}
                </span>
                <span className="text-xs text-muted-foreground">{modCompleted}/{mod.lessons.length}</span>
              </button>
              {isOpen && (
                <div className="border-t border-border">
                  {mod.lessons.map((lesson) => {
                    const Icon = typeIcons[lesson.type];
                    return (
                      <div key={lesson.id} className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-secondary/30 transition-colors border-b border-border/50 last:border-b-0 group cursor-pointer">
                        <GripVertical className="w-3 h-3 text-muted-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                        {lesson.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border-2 border-border shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground truncate">{lesson.title}</p>
                        </div>
                        <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${typeBadgeColors[lesson.type]}`}>
                          {typeLabels[lesson.type]}
                        </span>
                        {lesson.duration && (
                          <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                        )}
                        {lesson.type === 'video' && lesson.watchProgress !== undefined && lesson.watchProgress > 0 && !lesson.completed && (
                          <div className="w-12">
                            <Progress value={lesson.watchProgress} className="h-1" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                  <button className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-muted-foreground hover:text-primary hover:bg-secondary/30 transition-colors">
                    <Plus className="w-3 h-3" /> Adicionar aula
                  </button>
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
