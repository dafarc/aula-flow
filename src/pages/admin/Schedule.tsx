import { mockEvents } from "@/lib/mock-data";
import { Video, Clock, FileCheck } from "lucide-react";

const eventIcons = {
  live: Video,
  deadline: FileCheck,
  recording: Clock,
};

const eventColors = {
  live: "text-destructive",
  deadline: "text-warning",
  recording: "text-success",
};

const Schedule = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold">Agenda</h1>
        <p className="text-muted-foreground text-sm mt-1">Suas aulas e eventos programados.</p>
      </div>

      <div className="space-y-3">
        {mockEvents.map((event) => {
          const Icon = eventIcons[event.type];
          return (
            <div key={event.id} className="glass-card p-4 flex items-center gap-4 hover:border-primary/30 transition-colors">
              <div className={`w-10 h-10 rounded-lg bg-secondary flex items-center justify-center ${eventColors[event.type]}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{event.title}</p>
                <p className="text-xs text-muted-foreground">{event.courseName}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-medium">{event.time}</p>
                <p className="text-xs text-muted-foreground">{event.date}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Schedule;
