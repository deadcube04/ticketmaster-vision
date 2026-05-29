import { createFileRoute, Link } from "@tanstack/react-router";

import { Header } from "@/components/Header";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade — Ticketmaster Brasil" },
      { name: "description", content: "Política de Privacidade e informações sobre como exercer seus direitos" },
    ],
  }),
  component: PrivacyPage,
});

const ONETRUST_FORM_URL = "https://onetrust.example/form"; // substituir pelo link real

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="mx-auto max-w-[900px] px-6 py-16">
        <h1 className="text-3xl font-extrabold">Política de Privacidade</h1>
        <p className="mt-4 text-muted-foreground">
          Nesta página apresentamos, de forma clara e objetiva, as finalidades do
          tratamento de dados, base legal e os canais para o exercício dos
          direitos previstos na LGPD.
        </p>

        {/* CTA destacado - topo */}
        <div className="mt-8 rounded-lg border border-border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-bold">Exercer meus direitos</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Acesse nosso portal de privacidade para enviar solicitações de acesso,
            portabilidade, eliminação ou quaisquer outros direitos previstos na
            LGPD.
          </p>
          <Link
            to="/privacy-form"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-tm-blue px-4 py-2 text-sm font-semibold text-white transition hover:bg-tm-blue-dark"
            aria-label="Acessar formulário para exercer meus direitos"
          >
            Acesse nosso Portal de Privacidade
          </Link>
        </div>

        {/* Conteúdo resumido da política */}
        <section className="mt-8 space-y-4">
          <h3 className="text-lg font-semibold">Finalidades do tratamento</h3>
          <p className="text-sm text-muted-foreground">
            Utilizamos dados pessoais apenas para finalidades legítimas, como
            processamento de pedidos, comunicação sobre eventos e segurança de
            pagamentos. Informações adicionais e bases legais completas estão na
            versão completa do documento (versão demonstrativa neste template).
          </p>

          <h3 className="text-lg font-semibold">Contato e canal para direitos</h3>
          <p className="text-sm text-muted-foreground">
            Para exercer seus direitos, utilize o botão acima que redireciona
            diretamente ao formulário do nosso provedor de privacidade (OneTrust).
          </p>
        </section>

        {/* CTA final */}
        <div className="mt-10 rounded-lg border border-border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-bold">Deseja exercer seus direitos agora?</h2>
          <p className="mt-2 text-sm text-muted-foreground">Clique abaixo para abrir o formulário.</p>
          <Link
            to="/privacy-form"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-tm-blue px-4 py-2 text-sm font-semibold text-white transition hover:bg-tm-blue-dark"
          >
            Exercer meus direitos
          </Link>
        </div>
      </main>

      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-[1400px] px-6 py-6 text-center text-xs text-white/60">
          © {new Date().getFullYear()} Ticketmaster Brasil — Réplica visual para fins demonstrativos.
        </div>
      </footer>
    </div>
  );
}

export default PrivacyPage;
