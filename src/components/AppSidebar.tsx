import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Calendar,
  GraduationCap,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronLeft,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
  { icon: BookOpen, label: "Cursos", path: "/admin/courses" },
  { icon: Users, label: "Turmas", path: "/admin/classes" },
  { icon: GraduationCap, label: "Alunos", path: "/admin/students" },
  { icon: Calendar, label: "Agenda", path: "/admin/schedule" },
  { icon: Settings, label: "Configurações", path: "/admin/settings" },
];

const AppSidebar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-card border border-border md:hidden hover:bg-secondary transition-colors"
      >
        {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-foreground/20 z-40 md:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-sidebar border-r border-sidebar-border z-40 flex flex-col transition-all duration-200 ${
          collapsed ? "w-16" : "w-60"
        } ${mobileOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Logo */}
        <div className={`flex items-center border-b border-sidebar-border h-14 ${collapsed ? "justify-center px-2" : "px-4 gap-3"}`}>
          <Link to="/admin" className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center shrink-0">
              <GraduationCap className="w-4 h-4 text-primary-foreground" />
            </div>
            {!collapsed && (
              <span className="font-display text-sm font-bold text-foreground truncate">AulaHub</span>
            )}
          </Link>
          {!collapsed && (
            <button onClick={() => setCollapsed(true)} className="ml-auto p-1 rounded hover:bg-secondary transition-colors hidden md:block">
              <ChevronLeft className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-2 px-2 space-y-0.5 overflow-y-auto">
          {collapsed && (
            <button onClick={() => setCollapsed(false)} className="w-full flex justify-center p-2 mb-1 rounded hover:bg-secondary transition-colors">
              <Menu className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== "/admin" && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                title={collapsed ? item.label : undefined}
                className={`flex items-center gap-2.5 rounded-md text-[13px] font-medium transition-colors ${
                  collapsed ? "justify-center p-2.5" : "px-3 py-2"
                } ${
                  isActive
                    ? "bg-primary/8 text-primary"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
              >
                <item.icon className="w-[18px] h-[18px] shrink-0" />
                {!collapsed && item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-2 py-2 border-t border-sidebar-border">
          <Link
            to="/"
            className={`flex items-center gap-2.5 rounded-md text-[13px] text-muted-foreground hover:text-destructive transition-colors ${
              collapsed ? "justify-center p-2.5" : "px-3 py-2"
            }`}
          >
            <LogOut className="w-[18px] h-[18px] shrink-0" />
            {!collapsed && "Sair"}
          </Link>
        </div>
      </aside>
    </>
  );
};

export default AppSidebar;
