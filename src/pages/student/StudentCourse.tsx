import { useParams, Link } from "react-router-dom";
import { mockCourses, mockModules } from "@/lib/mock-data";
import { ChevronLeft, PlayCircle, FileText, HelpCircle, CheckCircle2, ChevronDown, ChevronRight, GraduationCap, LogOut, StickyNote } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

const typeIcons = { video: PlayCircle, pdf: FileText, quiz: HelpCircle };

const StudentCourse = () => {
  const { courseId } = useParams();
  const course = mockCourses.find((c) => c.id === courseId);
  const modules = mockModules.filter((m) => m.courseId === courseId);
  const [openModules, setOpenModules] = useState<string[]>([modules[0]?.id || ""]);
  const [notesOpen, setNotesOpen] = useState(false);

  const toggleModule = (id: string) => {
    setOpenModules((prev) => prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]);
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Curso não encontrado.</p>
          <Link to="/student" className="text-primary hover:underline text-xs">Voltar</Link>
        </div>
      </div>
    );
  }

  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedLessons = modules.reduce((acc, m) => acc + m.lessons.filter((l) => l.completed).length, 0);
  const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-30">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display text-sm font-bold text-foreground">AulaHub</span>
          </div>
          <Link to="/" className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-colors">
            <LogOut className="w-3.5 h-3.5" /> Sair
          </Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-6 space-y-5">
        <div className="flex items-center gap-2">
          <Link to="/student" className="p-1.5 rounded-md hover:bg-secondary transition-colors">
            <ChevronLeft className="w-4 h-4 text-muted-foreground" />
          </Link>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-display font-bold truncate">{course.title}</h1>
          </div>
          <button onClick={() => setNotesOpen(!notesOpen)} className={`p-2 rounded-md transition-colors ${notesOpen ? 'bg-primary/10 text-primary' : 'hover:bg-secondary text-muted-foreground'}`} title="Anotações">
            <StickyNote className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-card rounded-lg border border-border p-3.5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-muted-foreground">Seu progresso</span>
            <span className="text-xs font-medium">{progressPercent}%</span>
          </div>
          <Progress value={progressPercent} className="h-1.5" />
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          <div className={`space-y-2 ${notesOpen ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
            {modules.map((mod) => {
              const isOpen = openModules.includes(mod.id);
              return (
                <div key={mod.id} className="bg-card rounded-lg border border-border overflow-hidden">
                  <button onClick={() => toggleModule(mod.id)} className="w-full flex items-center gap-2 px-4 py-3 hover:bg-secondary/50 transition-colors">
                    {isOpen ? <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" /> : <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />}
                    <span className="text-sm font-semibold text-foreground flex-1 text-left">{mod.order}. {mod.title}</span>
                  </button>
                  {isOpen && (
                    <div className="border-t border-border">
                      {mod.lessons.map((lesson) => {
                        const Icon = typeIcons[lesson.type];
                        return (
                          <div key={lesson.id} className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-secondary/30 transition-colors border-b border-border/50 last:border-b-0 cursor-pointer">
                            {lesson.completed ? (
                              <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                            ) : (
                              <div className="w-4 h-4 rounded-full border-2 border-border shrink-0" />
                            )}
                            <Icon className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                            <span className="text-sm text-foreground flex-1 truncate">{lesson.title}</span>
                            {lesson.duration && <span className="text-xs text-muted-foreground">{lesson.duration}</span>}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {notesOpen && (
            <div className="bg-card rounded-lg border border-border p-4 h-fit sticky top-20">
              <h3 className="text-sm font-semibold flex items-center gap-2 mb-3">
                <StickyNote className="w-3.5 h-3.5 text-primary" /> Anotações
              </h3>
              <textarea
                placeholder="Escreva suas anotações..."
                className="w-full h-56 bg-secondary/50 rounded-md p-3 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary border border-border"
              />
              <p className="text-[11px] text-muted-foreground mt-2">Salvas automaticamente por aula.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentCourse;
