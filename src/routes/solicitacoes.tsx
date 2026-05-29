import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { ProfileSidebar } from "@/components/ProfileSidebar";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/solicitacoes")({
  component: SolicitacoesRoute,
});

function SolicitacoesRoute() {
  const mockSolicitacoes = [
    {
      id: "REQ-001",
      tipo: "Acesso aos Dados",
      data: "22/05/2026",
      status: "Concluída",
      prazo: "Imediato",
    },
    {
      id: "REQ-002",
      tipo: "Cópia Completa (Declaração Completa)",
      data: "28/05/2026",
      status: "Em Análise",
      prazo: "Até 12/06/2026",
    },
    {
      id: "REQ-003",
      tipo: "Retificação de Dados Incorretos",
      data: "29/05/2026",
      status: "Em Verificação de Identidade",
      prazo: "Até 13/06/2026",
    },
    {
      id: "REQ-004",
      tipo: "Exclusão de Conta e Dados",
      data: "29/05/2026",
      status: "Solicitação Recebida",
      prazo: "Até 13/06/2026",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F6F7F9] font-sans text-foreground">
      <Header />

      {/* Sub Header */}
      <div className="bg-tm-blue px-8 pb-12 pt-6 text-white">
        <div className="mx-auto max-w-[1400px]">
          <h1 className="mb-2 text-3xl font-bold">Meu perfil</h1>
          <p className="text-sm text-white/90">
            Acompanhe suas solicitações de dados e requisições LGPD.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto flex max-w-[1400px] flex-col gap-8 px-8 py-8 md:flex-row -mt-8">
        {/* Sidebar */}
        <ProfileSidebar />

        {/* Content Area */}
        <section className="flex-1 rounded-xl bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold">Minhas Solicitações (SLA - Artigo 19 LGPD)</h2>
          
          <div className="mb-8 rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm text-blue-900 leading-relaxed">
            <h3 className="font-bold mb-2">Transparência e Nível de Serviço (SLA)</h3>
            <p>
              Em conformidade com o <strong>Art. 19 da Lei Geral de Proteção de Dados (LGPD)</strong>, informamos os seguintes prazos para atendimento:
            </p>
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li><strong>Solicitações simples</strong> (como confirmação de existência de dados) serão atendidas de forma imediata.</li>
              <li><strong>Solicitações completas</strong> (acesso, portabilidade, eliminação) serão respondidas em até <strong>15 dias corridos</strong>.</li>
            </ul>
            <p className="mt-2 text-xs italic opacity-90">
              * Obs: Há possibilidade de prorrogação justificada dos prazos, conforme previsto em lei.
            </p>
            <p className="mt-4 text-sm font-medium bg-blue-900 text-white p-3 rounded-md">
              Você receberá notificações por e-mail a cada mudança de status das suas solicitações.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b bg-muted/30">
                <tr>
                  <th className="p-4 font-semibold text-muted-foreground">ID da Solicitação</th>
                  <th className="p-4 font-semibold text-muted-foreground">Tipo de Solicitação</th>
                  <th className="p-4 font-semibold text-muted-foreground">Data da Solicitação</th>
                  <th className="p-4 font-semibold text-muted-foreground">Prazo de Resposta (SLA)</th>
                  <th className="p-4 font-semibold text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {mockSolicitacoes.map((req) => (
                  <tr key={req.id} className="hover:bg-muted/30">
                    <td className="p-4 font-medium">{req.id}</td>
                    <td className="p-4">{req.tipo}</td>
                    <td className="p-4 text-muted-foreground">{req.data}</td>
                    <td className="p-4 text-muted-foreground">{req.prazo}</td>
                    <td className="p-4">
                      <Badge variant={req.status === "Concluída" ? "default" : "secondary"}>
                        {req.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {mockSolicitacoes.length === 0 && (
              <div className="py-12 text-center text-muted-foreground">
                Você ainda não fez nenhuma solicitação de dados.
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
