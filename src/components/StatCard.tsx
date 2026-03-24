import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  change?: string;
}

const StatCard = ({ icon: Icon, label, value, change }: StatCardProps) => {
  return (
    <div className="bg-card rounded-lg border border-border p-4 hover:shadow-sm transition-shadow">
      <div className="flex items-center gap-3 mb-2">
        <Icon className="w-4 h-4 text-muted-foreground" />
        <span className="text-xs text-muted-foreground font-medium">{label}</span>
      </div>
      <p className="text-2xl font-display font-bold text-foreground">{value}</p>
      {change && <p className="text-xs text-success mt-1">{change}</p>}
    </div>
  );
};

export default StatCard;
