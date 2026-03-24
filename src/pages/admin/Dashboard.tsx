import { Users, BookOpen, PlayCircle, TrendingUp, Video, CheckCircle } from "lucide-react";
import StatCard from "@/components/StatCard";
import { dashboardStats, mockEvents, mockCourses } from "@/lib/mock-data";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-display font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Resumo das suas aulas e alunos.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        <StatCard icon={Users} label="Total de Alunos" value={dashboardStats.totalStudents} change="+12 este mês" />
        <StatCard icon={BookOpen} label="Cursos Ativos" value={dashboardStats.totalCourses} />
        <StatCard icon={PlayCircle} label="Total de Aulas" value={dashboardStats.totalLessons} />
        <StatCard icon={TrendingUp} label="Presença Média" value={`${dashboardStats.avgAttendance}%`} />
        <StatCard icon={Video} label="Aulas esta Semana" value={dashboardStats.lessonsThisWeek} />
        <StatCard icon={CheckCircle} label="Taxa de Conclusão" value={`${dashboardStats.completionRate}%`} />
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Upcoming Events */}
        <div className="lg:col-span-3">
          <h2 className="text-sm font-semibold text-foreground mb-3">Próximos Eventos</h2>
          <div className="bg-card rounded-lg border border-border divide-y divide-border">
            {mockEvents.map((event) => (
              <div key={event.id} className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors">
                <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                  event.type === 'live' ? 'bg-destructive' :
                  event.type === 'deadline' ? 'bg-warning' : 'bg-success'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{event.title}</p>
                  <p className="text-xs text-muted-foreground">{event.courseName}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-medium text-foreground">{event.time}</p>
                  <p className="text-xs text-muted-foreground">{event.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Courses */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-foreground">Meus Cursos</h2>
            <Link to="/admin/courses" className="text-xs text-primary hover:underline">Ver todos</Link>
          </div>
          <div className="bg-card rounded-lg border border-border divide-y divide-border">
            {mockCourses.map((course) => (
              <Link key={course.id} to={`/admin/courses/${course.id}`} className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors block">
                <div className="w-8 h-8 rounded bg-secondary flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{course.title}</p>
                  <p className="text-xs text-muted-foreground">{course.studentsCount} alunos · {course.lessonsCount} aulas</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
