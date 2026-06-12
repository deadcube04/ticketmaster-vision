import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  MOCK_PROTOCOL_CODE,
  type PrivacyRequest,
  useMockAuth,
} from "@/lib/mock-auth";

export const Route = createFileRoute("/privacy-form")({
  head: () => ({
    meta: [{ title: "Ticketmaster Brasil" }],
  }),
  component: PrivacyFormPage,
});

function PrivacyFormPage() {
  const { isLoggedIn, saveGuestPrivacyRequest } = useMockAuth();
  const [submittedRequest, setSubmittedRequest] = React.useState<PrivacyRequest | null>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const requestData = {
      onBehalf: getFieldValue(formData, "onBehalf"),
      hasAccount: getFieldValue(formData, "hasAccount"),
      requestType: getFieldValue(formData, "requestType"),
      firstName: getFieldValue(formData, "firstName"),
      lastName: getFieldValue(formData, "lastName"),
      email: getFieldValue(formData, "email"),
      details: getFieldValue(formData, "details"),
    };

    const request = isLoggedIn
      ? {
          ...requestData,
          protocol: MOCK_PROTOCOL_CODE,
          submittedAt: new Date().toLocaleDateString("pt-BR"),
        }
      : saveGuestPrivacyRequest(requestData);

    setSubmittedRequest(request);
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="mx-auto max-w-[800px] px-6 py-16">
        <div className="text-center mb-10">
          <h1 className="text-2xl mb-1 text-foreground">Bem-vindo à página de privacidade da</h1>
          <h2 className="text-2xl text-tm-blue mb-8">Ticketmaster</h2>
        </div>

        <div className="mb-6 space-y-2 text-center md:text-left">
          <p className="font-bold text-gray-500 text-sm">Bem-vindo ao nosso Portal de Privacidade.</p>
          <p className="font-bold text-gray-900">
            Para obter mais informações sobre como exercer seus direitos, consulte nosso Portal de Privacidade
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 mt-8">
          
          <div className="space-y-3">
             <label className="text-gray-700 font-bold block">
               <span className="text-red-500 font-bold">*</span> Você está enviando uma solicitação em seu nome ou em nome de outra pessoa?
             </label>
             <div className="grid grid-cols-2 gap-4">
                <label className="cursor-pointer">
                  <input type="radio" name="onBehalf" value="others" className="peer sr-only" required />
                  <div className="rounded border border-gray-300 px-4 py-3 text-center text-sm text-gray-600 hover:bg-gray-50 peer-checked:border-tm-blue peer-checked:text-tm-blue transition-colors h-full flex items-center justify-center">
                    Estou enviando em<br/>nome de outra pessoa
                  </div>
                </label>
                <label className="cursor-pointer">
                  <input type="radio" name="onBehalf" value="me" className="peer sr-only" required />
                  <div className="rounded border border-gray-300 px-4 py-3 text-center text-sm text-gray-600 hover:bg-gray-50 peer-checked:border-tm-blue peer-checked:text-tm-blue transition-colors h-full flex items-center justify-center">
                    Estou enviando em<br/>meu nome
                  </div>
                </label>
             </div>
          </div>

          <div className="space-y-3">
             <label className="text-gray-700 font-bold block">
               <span className="text-red-500 font-bold">*</span> Tem uma conta com a(o) Ticketmaster?
             </label>
             <div className="grid grid-cols-2 gap-4">
                <label className="cursor-pointer">
                  <input type="radio" name="hasAccount" value="yes" className="peer sr-only" required />
                  <div className="rounded border border-gray-300 px-4 py-3 text-center text-sm text-gray-600 hover:bg-gray-50 peer-checked:border-tm-blue peer-checked:text-tm-blue transition-colors">
                    Sim
                  </div>
                </label>
                <label className="cursor-pointer">
                  <input type="radio" name="hasAccount" value="no" className="peer sr-only" required />
                  <div className="rounded border border-gray-300 px-4 py-3 text-center text-sm text-gray-600 hover:bg-gray-50 peer-checked:border-tm-blue peer-checked:text-tm-blue transition-colors">
                    Não
                  </div>
                </label>
             </div>
          </div>

          <div className="space-y-3">
             <label className="text-gray-700 font-bold block">
               <span className="text-red-500 font-bold">*</span> Selecione o tipo de solicitação:
             </label>
             <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <label className="cursor-pointer">
                  <input type="radio" name="requestType" value="exclude" className="peer sr-only" required />
                  <div className="rounded border border-gray-300 px-2 py-4 text-center text-xs text-gray-600 hover:bg-gray-50 peer-checked:border-tm-blue peer-checked:text-tm-blue transition-colors h-full flex items-center justify-center">
                    Excluir minhas<br/>informações
                  </div>
                </label>
                <label className="cursor-pointer">
                  <input type="radio" name="requestType" value="request" className="peer sr-only" required />
                  <div className="rounded border border-gray-300 px-2 py-4 text-center text-xs text-gray-600 hover:bg-gray-50 peer-checked:border-tm-blue peer-checked:text-tm-blue transition-colors h-full flex items-center justify-center">
                    Solicitar minhas<br/>informações
                  </div>
                </label>
                 <label className="cursor-pointer">
                  <input type="radio" name="requestType" value="disable" className="peer sr-only" required />
                  <div className="rounded border border-gray-300 px-2 py-4 text-center text-xs text-gray-600 hover:bg-gray-50 peer-checked:border-tm-blue peer-checked:text-tm-blue transition-colors h-full flex items-center justify-center">
                    Desativar Marketing
                  </div>
                </label>
                
                <label className="cursor-pointer">
                  <input type="radio" name="requestType" value="restrict" className="peer sr-only" required />
                  <div className="rounded border border-gray-300 px-2 py-4 text-center text-xs text-gray-600 hover:bg-gray-50 peer-checked:border-tm-blue peer-checked:text-tm-blue transition-colors h-full flex items-center justify-center">
                    Restringir o<br/>processamento das<br/>minhas informações
                  </div>
                </label>
                <label className="cursor-pointer">
                  <input type="radio" name="requestType" value="correct" className="peer sr-only" required />
                  <div className="rounded border border-gray-300 px-2 py-4 text-center text-xs text-gray-600 hover:bg-gray-50 peer-checked:border-tm-blue peer-checked:text-tm-blue transition-colors h-full flex items-center justify-center">
                    Corrigir minhas<br/>informações
                  </div>
                </label>
                 <label className="cursor-pointer">
                  <input type="radio" name="requestType" value="other" className="peer sr-only" required />
                  <div className="rounded border border-gray-300 px-2 py-4 text-center text-xs text-gray-600 hover:bg-gray-50 peer-checked:border-tm-blue peer-checked:text-tm-blue transition-colors h-full flex items-center justify-center">
                    Outra opção
                  </div>
                </label>
             </div>
          </div>
          
          <div className="space-y-4 pt-4">
             <div className="space-y-2">
                 <Label htmlFor="firstName" className="text-gray-700 font-bold"><span className="text-red-500 font-bold">*</span> Nome</Label>
                 <Input id="firstName" name="firstName" required className="rounded border-gray-300" />
             </div>
             <div className="space-y-2">
                 <Label htmlFor="lastName" className="text-gray-700 font-bold"><span className="text-red-500 font-bold">*</span> Sobrenome</Label>
                 <Input id="lastName" name="lastName" required className="rounded border-gray-300" />
             </div>
             <div className="space-y-2">
                 <Label htmlFor="email" className="text-gray-700 font-bold"><span className="text-red-500 font-bold">*</span> E-mail</Label>
                 <Input id="email" name="email" type="email" required className="rounded border-gray-300" />
             </div>
             <div className="space-y-2">
                 <Label htmlFor="details" className="text-gray-700 font-bold"><span className="text-red-500 font-bold">*</span> Detalhe sua solicitação ou problema</Label>
                 <Textarea
                   id="details"
                   name="details"
                   required
                   className="min-h-32 rounded border-gray-300"
                   placeholder="Descreva o contexto da solicitação, evento, pedido ou problema relacionado."
                 />
                 <p className="text-xs text-muted-foreground">
                   Inclua informações que ajudem a identificar e tratar sua solicitação.
                 </p>
             </div>
          </div>

          <div className="mb-8 rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm text-blue-900 leading-relaxed mt-10">
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
          </div>

          <Button type="submit" className="bg-tm-blue hover:bg-tm-blue-dark">Enviar Solicitação</Button>

        </form>
      </main>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Solicitação enviada com sucesso</DialogTitle>
            <DialogDescription>
              Guarde o código de protocolo abaixo para acompanhar sua solicitação.
            </DialogDescription>
          </DialogHeader>

          {submittedRequest && (
            <div className="space-y-4">
              <div className="rounded-md border border-blue-100 bg-blue-50 p-4 text-blue-900">
                <p className="text-xs font-semibold uppercase">Código de protocolo</p>
                <p className="mt-1 text-lg font-bold">{submittedRequest.protocol}</p>
              </div>

              <dl className="grid gap-3 text-sm md:grid-cols-2">
                <SummaryItem label="Solicitante" value={`${submittedRequest.firstName} ${submittedRequest.lastName}`} />
                <SummaryItem label="E-mail" value={submittedRequest.email} />
                <SummaryItem label="Envio" value={formatOnBehalf(submittedRequest.onBehalf)} />
                <SummaryItem label="Conta Ticketmaster" value={formatHasAccount(submittedRequest.hasAccount)} />
                <SummaryItem label="Tipo de solicitação" value={formatRequestType(submittedRequest.requestType)} />
                <SummaryItem label="Data de envio" value={submittedRequest.submittedAt} />
                <div className="md:col-span-2">
                  <SummaryItem label="Detalhes" value={submittedRequest.details} />
                </div>
              </dl>

              <p className="rounded-md bg-yellow-50 p-3 text-sm font-medium text-yellow-900">
                Guarde este código. Usuários não logados precisarão dele para consultar a solicitação em Minhas Solicitações.
              </p>
            </div>
          )}

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" className="bg-tm-blue hover:bg-tm-blue-dark">
                Entendi
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function getFieldValue(formData: FormData, field: string) {
  const value = formData.get(field);
  return typeof value === "string" ? value : "";
}

function SummaryItem({ label, value }: { label: string; value: string }) {
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
