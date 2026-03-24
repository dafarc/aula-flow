import { Users, BookOpen, PlayCircle, TrendingUp, Video, CheckCircle } from "lucide-react";
import StatCard from "@/components/StatCard";
import { dashboardStats, mockEvents, mockCourses } from "@/lib/mock-data";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-bold">
          Bom dia, Professor! 👋
        </h1>
        <p className="text-muted-foreground mt-1">
          Aqui está o resumo das suas aulas e alunos.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard icon={Users} label="Alunos" value={dashboardStats.totalStudents} change="+12 este mês" variant="primary" />
        <StatCard icon={BookOpen} label="Cursos" value={dashboardStats.totalCourses} variant="default" />
        <StatCard icon={PlayCircle} label="Aulas" value={dashboardStats.totalLessons} variant="default" />
        <StatCard icon={TrendingUp} label="Presença" value={`${dashboardStats.avgAttendance}%`} variant="success" />
        <StatCard icon={Video} label="Aulas esta semana" value={dashboardStats.lessonsThisWeek} variant="info" />
        <StatCard icon={CheckCircle} label="Conclusão" value={`${dashboardStats.completionRate}%`} variant="success" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upcoming Events */}
        <div className="lg:col-span-2 glass-card p-6">
          <h2 className="text-lg font-display font-semibold mb-4">Próximos Eventos</h2>
          <div className="space-y-3">
            {mockEvents.map((event) => (
              <div key={event.id} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                <div className={`w-2 h-2 rounded-full ${
                  event.type === 'live' ? 'bg-destructive animate-pulse' :
                  event.type === 'deadline' ? 'bg-warning' : 'bg-success'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{event.title}</p>
                  <p className="text-xs text-muted-foreground">{event.courseName}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-medium">{event.time}</p>
                  <p className="text-xs text-muted-foreground">{event.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Courses Summary */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display font-semibold">Meus Cursos</h2>
            <Link to="/admin/courses" className="text-xs text-primary hover:underline">Ver todos</Link>
          </div>
          <div className="space-y-4">
            {mockCourses.map((course) => (
              <Link key={course.id} to={`/admin/courses/${course.id}`} className="block p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                <p className="text-sm font-medium">{course.title}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" /> {course.studentsCount}
                  </span>
                  <span className="flex items-center gap-1">
                    <PlayCircle className="w-3 h-3" /> {course.lessonsCount} aulas
                  </span>
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
