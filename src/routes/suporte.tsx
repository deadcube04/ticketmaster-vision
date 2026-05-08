import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Ticket, CreditCard, RefreshCw, User, HelpCircle, Calendar, ShieldCheck, Mail, ChevronRight, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export const Route = createFileRoute("/suporte")({
  head: () => ({
    meta: [
      { title: "Suporte ao Fã — Ticketmaster Brasil" },
      { name: "description", content: "Central de ajuda da Ticketmaster Brasil. Encontre respostas sobre ingressos, reembolsos, conta e eventos." },
    ],
  }),
  component: SuportePage,
});

const categorias = [
  { icon: Ticket, title: "Meus Ingressos", desc: "Como acessar, transferir e usar seus ingressos." },
  { icon: CreditCard, title: "Pagamentos", desc: "Formas de pagamento, parcelamento e cobranças." },
  { icon: RefreshCw, title: "Reembolsos e Cancelamentos", desc: "Política de reembolso e eventos cancelados." },
  { icon: User, title: "Minha Conta", desc: "Cadastro, login, senha e dados pessoais." },
  { icon: Calendar, title: "Eventos", desc: "Datas, locais, mudanças e remarcações." },
  { icon: ShieldCheck, title: "Segurança e Fraude", desc: "Compre com segurança e evite golpes." },
];

const populares = [
  "Como recebo meus ingressos após a compra?",
  "Como faço para transferir um ingresso?",
  "O evento foi adiado/cancelado, e agora?",
  "Quais são as formas de pagamento aceitas?",
  "Esqueci minha senha, como recupero?",
  "Como solicito o reembolso de um pedido?",
  "Posso alterar o nome do titular do ingresso?",
  "Como entro em contato com o atendimento?",
];

function SuportePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-tm-blue text-white">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5">
          <Link to="/" className="text-2xl font-bold italic tracking-tight">
            ticketmaster
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <Link to="/suporte" className="flex items-center gap-2 hover:opacity-80">
              <HelpCircle className="h-4 w-4" /> Suporte ao Fã
            </Link>
            <a href="#" className="flex items-center gap-2 hover:opacity-80">
              <User className="h-4 w-4" /> Entrar / Cadastre-se
            </a>
          </nav>
        </div>
      </header>

      {/* Hero search */}
      <section className="bg-gradient-to-b from-tm-blue to-tm-blue-dark py-16 text-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-4xl font-extrabold md:text-5xl">Como podemos ajudar?</h1>
          <p className="mt-3 text-white/85">
            Encontre respostas rápidas sobre ingressos, eventos e sua conta.
          </p>
          <form className="relative mt-8 flex items-center">
            <input
              type="text"
              placeholder="Buscar artigos de ajuda..."
              className="h-14 w-full rounded-full border-0 bg-white px-7 text-base text-foreground outline-none placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              className="absolute right-1 flex h-12 items-center gap-2 rounded-full bg-tm-blue px-6 text-sm font-semibold text-white transition hover:bg-tm-blue-dark"
            >
              Buscar <Search className="h-4 w-4" />
            </button>
          </form>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="border-b">
        <div className="mx-auto max-w-[1400px] px-6 py-3 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-tm-blue">Início</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Central de Ajuda</span>
        </div>
      </div>

      {/* Categories */}
      <section className="mx-auto max-w-[1400px] px-6 py-14">
        <h2 className="text-2xl font-extrabold md:text-3xl">Categorias</h2>
        <p className="mt-1 text-muted-foreground">Selecione um tema para ver os artigos relacionados.</p>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categorias.map(({ icon: Icon, title, desc }) => (
            <a
              key={title}
              href="#"
              className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-tm-blue hover:shadow-lg"
            >
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-tm-blue/10 text-tm-blue transition group-hover:bg-tm-blue group-hover:text-white">
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-bold text-foreground">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Popular */}
      <section className="bg-muted/40 py-14">
        <div className="mx-auto max-w-[1400px] px-6">
          <h2 className="text-2xl font-extrabold md:text-3xl">Perguntas frequentes</h2>
          <div className="mt-6 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
            {populares.map((q) => (
              <a
                key={q}
                href="#"
                className="flex items-center justify-between px-6 py-4 text-sm font-medium transition hover:bg-tm-blue/5 hover:text-tm-blue"
              >
                <span>{q}</span>
                <ChevronRight className="h-4 w-4 shrink-0 opacity-60" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="mx-auto max-w-[1400px] px-6 py-14">
        <div className="overflow-hidden rounded-3xl bg-tm-blue px-8 py-12 text-white md:px-14">
          <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <h2 className="text-2xl font-extrabold md:text-3xl">Não encontrou o que procurava?</h2>
              <p className="mt-2 text-white/85">
                Nossa equipe de Suporte ao Fã está pronta para ajudar você.
              </p>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-bold uppercase text-tm-blue transition hover:bg-white/90"
            >
              <Mail className="h-4 w-4" /> Fale Conosco
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white/80">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
          <div className="text-2xl font-bold italic text-white">ticketmaster</div>
          <div className="flex gap-3">
            {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-tm-blue"
                aria-label="Social"
              >
                <Icon className="h-4 w-4 text-white" />
              </a>
            ))}
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto max-w-[1400px] px-6 py-6 text-center text-xs text-white/60">
            © {new Date().getFullYear()} Ticketmaster Brasil — Réplica visual para fins demonstrativos.
          </div>
        </div>
      </footer>
    </div>
  );
}
