import { Link } from "react-router-dom";
import { mockCourses, mockEvents } from "@/lib/mock-data";
import { BookOpen, Calendar, Video, Clock, FileCheck, GraduationCap, LogOut, PlayCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const eventIcons = { live: Video, deadline: FileCheck, recording: Clock };
const eventDotColors = { live: "bg-destructive", deadline: "bg-warning", recording: "bg-success" };

const studentCourses = mockCourses.map((c) => ({ ...c, progress: Math.floor(Math.random() * 80) + 10 }));

const StudentArea = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-30">
        <div className="max-w-4xl mx-auto flex items-center justify-between px-4 py-3">
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

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <div>
          <h1 className="text-xl font-display font-bold">Olá, Aluno! 📖</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Continue de onde parou.</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 space-y-3">
            <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" /> Meus Cursos
            </h2>
            <div className="bg-card rounded-lg border border-border divide-y divide-border">
              {studentCourses.map((course) => (
                <Link key={course.id} to={`/student/course/${course.id}`} className="flex items-center gap-3 px-4 py-3.5 hover:bg-secondary/50 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                    <PlayCircle className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{course.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{course.modulesCount} módulos · {course.lessonsCount} aulas</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <Progress value={course.progress} className="h-1 flex-1 max-w-[120px]" />
                      <span className="text-xs text-muted-foreground">{course.progress}%</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" /> Próximos Eventos
            </h2>
            <div className="bg-card rounded-lg border border-border divide-y divide-border">
              {mockEvents.map((event) => (
                <div key={event.id} className="px-4 py-3 hover:bg-secondary/50 transition-colors">
                  <div className="flex items-start gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${eventDotColors[event.type]}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{event.title}</p>
                      <p className="text-xs text-muted-foreground">{event.date} · {event.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentArea;
