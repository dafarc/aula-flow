import { Link } from "react-router-dom";
import { mockCourses, mockEvents } from "@/lib/mock-data";
import { BookOpen, Calendar, Video, Clock, FileCheck, GraduationCap, LogOut, PlayCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const eventIcons = { live: Video, deadline: FileCheck, recording: Clock };
const eventBg = { live: "bg-destructive/10 text-destructive", deadline: "bg-warning/10 text-warning", recording: "bg-success/10 text-success" };

const studentCourses = mockCourses.map((c) => ({ ...c, progress: Math.floor(Math.random() * 80) + 10 }));

const StudentArea = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Student Header */}
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

      <div className="container mx-auto px-4 py-8 space-y-8">
        <div>
          <h1 className="text-2xl font-display font-bold">Olá, Aluno! 📖</h1>
          <p className="text-muted-foreground text-sm mt-1">Continue de onde parou.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Courses */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-display font-semibold flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" /> Meus Cursos
            </h2>
            {studentCourses.map((course) => (
              <Link key={course.id} to={`/student/course/${course.id}`} className="glass-card p-5 block hover:border-primary/30 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-semibold">{course.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{course.modulesCount} módulos · {course.lessonsCount} aulas</p>
                  </div>
                  <PlayCircle className="w-8 h-8 text-primary shrink-0" />
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <Progress value={course.progress} className="h-2 flex-1" />
                  <span className="text-xs font-medium text-muted-foreground w-9">{course.progress}%</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Calendar / Events */}
          <div className="space-y-4">
            <h2 className="text-lg font-display font-semibold flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" /> Próximos Eventos
            </h2>
            <div className="space-y-3">
              {mockEvents.map((event) => {
                const Icon = eventIcons[event.type];
                return (
                  <div key={event.id} className="glass-card p-4">
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${eventBg[event.type]}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{event.title}</p>
                        <p className="text-xs text-muted-foreground">{event.date} · {event.time}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentArea;
