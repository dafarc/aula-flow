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
    setOpenModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Curso não encontrado.</p>
          <Link to="/student" className="text-primary hover:underline text-sm">Voltar</Link>
        </div>
      </div>
    );
  }

  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedLessons = modules.reduce((acc, m) => acc + m.lessons.filter((l) => l.completed).length, 0);
  const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-30">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold">AulaHub</span>
          </div>
          <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive transition-colors">
            <LogOut className="w-4 h-4" /> Sair
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center gap-3">
          <Link to="/student" className="p-2 rounded-lg hover:bg-secondary transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div className="flex-1">
            <h1 className="text-xl font-display font-bold">{course.title}</h1>
            <p className="text-sm text-muted-foreground mt-0.5">{course.description}</p>
          </div>
          <button onClick={() => setNotesOpen(!notesOpen)} className="p-2 rounded-lg hover:bg-secondary transition-colors" title="Caderno de Anotações">
            <StickyNote className="w-5 h-5 text-primary" />
          </button>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Seu progresso</p>
            <p className="text-sm font-medium">{progressPercent}%</p>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className={`space-y-3 ${notesOpen ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
            {modules.map((mod) => {
              const isOpen = openModules.includes(mod.id);
              return (
                <div key={mod.id} className="glass-card overflow-hidden">
                  <button onClick={() => toggleModule(mod.id)} className="w-full flex items-center gap-3 p-4 hover:bg-secondary/50 transition-colors">
                    {isOpen ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                    <p className="font-medium text-sm text-left flex-1">Módulo {mod.order}: {mod.title}</p>
                  </button>
                  {isOpen && (
                    <div className="border-t border-border">
                      {mod.lessons.map((lesson) => {
                        const Icon = typeIcons[lesson.type];
                        return (
                          <div key={lesson.id} className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/30 transition-colors border-b border-border/50 last:border-b-0 cursor-pointer">
                            {lesson.completed ? (
                              <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                            ) : (
                              <Icon className="w-5 h-5 text-muted-foreground shrink-0" />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{lesson.title}</p>
                              <p className="text-xs text-muted-foreground">{lesson.duration || ''}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Notes Panel */}
          {notesOpen && (
            <div className="glass-card p-5 h-fit sticky top-20">
              <h3 className="font-display font-semibold flex items-center gap-2 mb-4">
                <StickyNote className="w-4 h-4 text-primary" /> Caderno de Anotações
              </h3>
              <textarea
                placeholder="Escreva suas anotações aqui..."
                className="w-full h-64 bg-secondary/50 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary border border-border"
              />
              <p className="text-xs text-muted-foreground mt-2">As anotações são salvas automaticamente por aula.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentCourse;
