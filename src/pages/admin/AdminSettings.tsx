import { User, Bell, Palette, Link as LinkIcon, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const sections = [
  {
    icon: User,
    title: "Perfil",
    description: "Informações pessoais e avatar.",
    content: (
      <div className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-foreground mb-1.5 block">Nome</label>
            <Input defaultValue="Professor Demo" className="h-9 text-sm" />
          </div>
          <div>
            <label className="text-xs font-medium text-foreground mb-1.5 block">E-mail</label>
            <Input defaultValue="demo@aulahub.com" className="h-9 text-sm" />
          </div>
        </div>
        <Button size="sm" className="text-xs">Salvar alterações</Button>
      </div>
    ),
  },
  {
    icon: Bell,
    title: "Notificações",
    description: "Configure os lembretes automáticos.",
    content: (
      <div className="space-y-4">
        {[
          { label: "Lembrete antes da aula", desc: "Enviar e-mail 30 min antes da aula ao vivo" },
          { label: "Lembrete no dia da aula", desc: "Notificação no dia de aulas agendadas" },
          { label: "Material pós-aula", desc: "Enviar materiais e gravação após a aula" },
          { label: "Alertas de cancelamento", desc: "Notificar alunos sobre mudanças de horário" },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
            <Switch defaultChecked />
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: Palette,
    title: "Aulas em Vídeo",
    description: "Configurações de acompanhamento de vídeo.",
    content: (
      <div className="space-y-4">
        <div>
          <label className="text-xs font-medium text-foreground mb-1.5 block">
            Percentual mínimo para "aula assistida" (%)
          </label>
          <Input type="number" defaultValue="75" min="1" max="100" className="h-9 text-sm max-w-[120px]" />
          <p className="text-xs text-muted-foreground mt-1">O aluno precisa assistir pelo menos este percentual para a aula ser marcada como concluída.</p>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Permitir retomar de onde parou</p>
            <p className="text-xs text-muted-foreground">O player retoma automaticamente a última posição.</p>
          </div>
          <Switch defaultChecked />
        </div>
      </div>
    ),
  },
  {
    icon: LinkIcon,
    title: "Integrações",
    description: "Conecte com ferramentas externas.",
    content: (
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 rounded-md border border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-secondary flex items-center justify-center text-xs font-bold text-muted-foreground">G</div>
            <div>
              <p className="text-sm font-medium text-foreground">Google Meet</p>
              <p className="text-xs text-muted-foreground">Aulas ao vivo</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="text-xs">Conectar</Button>
        </div>
        <div className="flex items-center justify-between p-3 rounded-md border border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-secondary flex items-center justify-center text-xs font-bold text-destructive">YT</div>
            <div>
              <p className="text-sm font-medium text-foreground">YouTube</p>
              <p className="text-xs text-muted-foreground">Embed de vídeos</p>
            </div>
          </div>
          <span className="text-xs text-success font-medium">Ativo</span>
        </div>
      </div>
    ),
  },
  {
    icon: Shield,
    title: "Acesso e Segurança",
    description: "Configurações de segurança da conta.",
    content: (
      <div className="space-y-4">
        <div>
          <label className="text-xs font-medium text-foreground mb-1.5 block">Alterar senha</label>
          <Input type="password" placeholder="Nova senha" className="h-9 text-sm max-w-xs" />
        </div>
        <Button size="sm" className="text-xs">Atualizar senha</Button>
      </div>
    ),
  },
];

const AdminSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-display font-bold">Configurações</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Gerencie sua conta e preferências.</p>
      </div>

      <div className="space-y-4">
        {sections.map((section) => (
          <div key={section.title} className="bg-card rounded-lg border border-border">
            <div className="px-5 py-4 border-b border-border">
              <div className="flex items-center gap-2.5">
                <section.icon className="w-4 h-4 text-muted-foreground" />
                <div>
                  <h2 className="text-sm font-semibold text-foreground">{section.title}</h2>
                  <p className="text-xs text-muted-foreground">{section.description}</p>
                </div>
              </div>
            </div>
            <div className="px-5 py-4">
              {section.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSettings;
