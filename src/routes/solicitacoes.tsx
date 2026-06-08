import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { ProfileSidebar } from "@/components/ProfileSidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  MOCK_PROTOCOL_CODE,
  type PrivacyRequest,
  useMockAuth,
} from "@/lib/mock-auth";

export const Route = createFileRoute("/solicitacoes")({
  component: SolicitacoesRoute,
});

function SolicitacoesRoute() {
  const { isLoggedIn, lastGuestPrivacyRequest } = useMockAuth();
  const [protocolInput, setProtocolInput] = React.useState("");
  const [lookupStatus, setLookupStatus] = React.useState<
    "idle" | "not-found" | "missing-request" | "found"
  >("idle");

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

  const handleProtocolLookup = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (protocolInput.trim() !== MOCK_PROTOCOL_CODE) {
      setLookupStatus("not-found");
      return;
    }

    setLookupStatus(lastGuestPrivacyRequest ? "found" : "missing-request");
  };

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

          {isLoggedIn ? (
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
          ) : (
            <div className="space-y-6">
              <form onSubmit={handleProtocolLookup} className="rounded-lg border border-border p-5">
                <div className="space-y-2">
                  <Label htmlFor="protocol">Insira seu código de protocolo</Label>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Input
                      id="protocol"
                      value={protocolInput}
                      onChange={(event) => {
                        setProtocolInput(event.target.value);
                        setLookupStatus("idle");
                      }}
                      placeholder={MOCK_PROTOCOL_CODE}
                      className="rounded border-gray-300"
                    />
                    <Button type="submit" className="bg-tm-blue hover:bg-tm-blue-dark">
                      Consultar
                    </Button>
                  </div>
                </div>
              </form>

              {lookupStatus === "not-found" && (
                <p className="rounded-md border border-red-100 bg-red-50 p-4 text-sm font-medium text-red-900">
                  Protocolo não encontrado. Verifique o código informado e tente novamente.
                </p>
              )}

              {lookupStatus === "missing-request" && (
                <p className="rounded-md border border-yellow-100 bg-yellow-50 p-4 text-sm font-medium text-yellow-900">
                  Este é o protocolo mockado, mas nenhuma solicitação foi enviada nesta sessão. Envie o formulário de privacidade primeiro.
                </p>
              )}

              {lookupStatus === "found" && lastGuestPrivacyRequest && (
                <GuestRequestDetails request={lastGuestPrivacyRequest} />
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function GuestRequestDetails({ request }: { request: PrivacyRequest }) {
  return (
    <article className="rounded-lg border border-border bg-card p-5 shadow-sm">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase text-muted-foreground">Protocolo</p>
          <h3 className="text-xl font-bold text-foreground">{request.protocol}</h3>
        </div>
        <Badge variant="secondary">Solicitação Recebida</Badge>
      </div>

      <dl className="grid gap-3 text-sm md:grid-cols-2">
        <DetailItem label="Solicitante" value={`${request.firstName} ${request.lastName}`} />
        <DetailItem label="E-mail" value={request.email} />
        <DetailItem label="Envio" value={formatOnBehalf(request.onBehalf)} />
        <DetailItem label="Conta Ticketmaster" value={formatHasAccount(request.hasAccount)} />
        <DetailItem label="Tipo de solicitação" value={formatRequestType(request.requestType)} />
        <DetailItem label="Data da solicitação" value={request.submittedAt} />
        <div className="md:col-span-2">
          <DetailItem label="Detalhes" value={request.details} />
        </div>
      </dl>
    </article>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border p-3">
      <dt className="text-xs font-semibold uppercase text-muted-foreground">{label}</dt>
      <dd className="mt-1 break-words font-medium text-foreground">{value}</dd>
    </div>
  );
}

function formatOnBehalf(value: string) {
  return value === "others" ? "Em nome de outra pessoa" : "Em meu nome";
}

function formatHasAccount(value: string) {
  return value === "yes" ? "Sim" : "Não";
}

function formatRequestType(value: string) {
  const labels: Record<string, string> = {
    exclude: "Excluir minhas informações",
    request: "Solicitar minhas informações",
    disable: "Desativar Marketing",
    restrict: "Restringir o processamento das minhas informações",
    correct: "Corrigir minhas informações",
    other: "Outra opção",
  };

  return labels[value] ?? value;
}
