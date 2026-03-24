import { mockEvents } from "@/lib/mock-data";
import { Video, Clock, FileCheck } from "lucide-react";

const eventIcons = { live: Video, deadline: FileCheck, recording: Clock };
const eventDotColors = { live: "bg-destructive", deadline: "bg-warning", recording: "bg-success" };

const Schedule = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-display font-bold">Agenda</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Suas aulas e eventos programados.</p>
      </div>

      <div className="bg-card rounded-lg border border-border divide-y divide-border">
        {mockEvents.map((event) => {
          const Icon = eventIcons[event.type];
          return (
            <div key={event.id} className="flex items-center gap-3 px-4 py-3.5 hover:bg-secondary/50 transition-colors cursor-pointer">
              <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${eventDotColors[event.type]}`} />
              <Icon className="w-4 h-4 text-muted-foreground shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{event.title}</p>
                <p className="text-xs text-muted-foreground">{event.courseName}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs font-medium text-foreground">{event.time}</p>
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
