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
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-9 h-9 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-display font-bold">AulaHub</h1>
          <p className="text-muted-foreground mt-2">Gestão de Aulas Online</p>
        </div>

        {/* Role Selector */}
        <div className="flex gap-2 p-1 bg-secondary rounded-xl">
          <button
            onClick={() => setRole("professor")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
              role === "professor" ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Professor
          </button>
          <button
            onClick={() => setRole("aluno")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
              role === "aluno" ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Aluno
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="glass-card p-6 space-y-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">E-mail</label>
            <Input type="email" placeholder="seu@email.com" defaultValue="demo@aulahub.com" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Senha</label>
            <Input type="password" placeholder="••••••••" defaultValue="123456" />
          </div>
          <Button type="submit" className="w-full gap-2">
            Entrar <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        <p className="text-center text-xs text-muted-foreground">
          Demo: selecione o perfil e clique em Entrar
        </p>
      </div>
    </div>
  );
};

export default Login;
