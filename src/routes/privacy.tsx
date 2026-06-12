import { createFileRoute, Link } from "@tanstack/react-router";

import { Header } from "@/components/Header";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Ticketmaster Brasil" },
      { name: "description", content: "Portal de Privacidade e informações sobre como exercer seus direitos" },
    ],
  }),
  component: PrivacyPage,
});

const ONETRUST_FORM_URL = "https://onetrust.example/form"; // substituir pelo link real

const DATA_SUBJECT_RIGHTS = [
  "Confirmar a existência de tratamento dos seus dados pessoais.",
  "Acessar os dados pessoais que a Ticketmaster trata sobre você.",
  "Corrigir dados incompletos, inexatos ou desatualizados.",
  "Solicitar anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade com a LGPD.",
  "Solicitar a portabilidade dos seus dados, quando aplicável.",
  "Receber informações sobre compartilhamento de dados com terceiros.",
  "Revogar consentimentos concedidos anteriormente.",
  "Apresentar oposição ou solicitar revisão de decisões quando aplicável.",
];

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="mx-auto max-w-[900px] px-6 py-16">
        <h1 className="text-3xl font-extrabold">Portal de Privacidade</h1>
        <p className="mt-4 text-muted-foreground">
          Nesta página apresentamos, de forma clara e objetiva, os direitos dos
          titulares de dados e os canais para exercê-los conforme previsto na
          LGPD.
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
            to="https://privacy.ticketmaster.com.br/pt/privacy-policy"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-tm-blue px-4 py-2 text-sm font-semibold text-white transition hover:bg-tm-blue-dark"
            aria-label="Acessar formulário para exercer meus direitos"
          >
            Acesse nossa Política de Privacidade
          </Link>
        </div>

        {/* Conteúdo resumido do portal */}
        <section className="mt-8 space-y-4">
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
            Acessar meus direitos
          </Link>
        </div>

        <section className="mt-8 space-y-4">
          <h3 className="text-lg font-semibold">Direitos do titular dos dados</h3>
          <p className="text-sm text-muted-foreground">
            Pela LGPD, você pode solicitar:
          </p>
          <ul className="grid gap-3 text-sm text-muted-foreground md:grid-cols-2">
            {DATA_SUBJECT_RIGHTS.map((right) => (
              <li
                key={right}
                className="rounded-md border border-border bg-card px-4 py-3 leading-relaxed"
              >
                {right}
              </li>
            ))}
          </ul>
        </section>
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
