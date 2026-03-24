import { mockStudents } from "@/lib/mock-data";
import { Plus, Search, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

const Students = () => {
  const [search, setSearch] = useState("");
  const filtered = mockStudents.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-display font-bold">Alunos</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Gerencie alunos e acompanhe o progresso.</p>
        </div>
        <Button size="sm" className="gap-1.5 text-xs">
          <Plus className="w-3.5 h-3.5" /> Adicionar
        </Button>
      </div>

      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
        <Input placeholder="Buscar aluno..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9 text-sm" />
      </div>

      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Aluno</th>
              <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Progresso</th>
              <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground hidden md:table-cell">Último acesso</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((student) => (
              <tr key={student.id} className="hover:bg-secondary/50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                      <span className="text-xs font-semibold text-muted-foreground">
                        {student.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{student.name}</p>
                      <p className="text-xs text-muted-foreground">{student.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 min-w-[100px]">
                    <Progress value={student.progress} className="h-1.5 flex-1 max-w-[80px]" />
                    <span className="text-xs text-muted-foreground w-8">{student.progress}%</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground hidden md:table-cell">{student.lastActive}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students;
