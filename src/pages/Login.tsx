import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<"professor" | "aluno">("professor");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(role === "professor" ? "/admin" : "/student");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mx-auto mb-3">
            <GraduationCap className="w-7 h-7 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-display font-bold text-foreground">AulaHub</h1>
          <p className="text-sm text-muted-foreground mt-1">Gestão de Aulas Online</p>
        </div>

        {/* Role */}
        <div className="flex gap-1 p-1 bg-secondary rounded-lg">
          <button
            onClick={() => setRole("professor")}
            className={`flex-1 py-2 rounded-md text-xs font-medium transition-all ${
              role === "professor" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
            }`}
          >
            Professor
          </button>
          <button
            onClick={() => setRole("aluno")}
            className={`flex-1 py-2 rounded-md text-xs font-medium transition-all ${
              role === "aluno" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
            }`}
          >
            Aluno
          </button>
        </div>

        <form onSubmit={handleLogin} className="bg-card rounded-lg border border-border p-5 space-y-4">
          <div>
            <label className="text-xs font-medium text-foreground mb-1.5 block">E-mail</label>
            <Input type="email" placeholder="seu@email.com" defaultValue="demo@aulahub.com" className="h-9 text-sm" />
          </div>
          <div>
            <label className="text-xs font-medium text-foreground mb-1.5 block">Senha</label>
            <Input type="password" placeholder="••••••••" defaultValue="123456" className="h-9 text-sm" />
          </div>
          <Button type="submit" className="w-full gap-1.5 text-sm" size="sm">
            Entrar <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </form>

        <p className="text-center text-xs text-muted-foreground">
          Selecione o perfil e clique em Entrar
        </p>
      </div>
    </div>
  );
};

export default Login;
