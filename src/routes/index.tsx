import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Search, ChevronLeft, ChevronRight, Facebook, Instagram, Twitter, Youtube, Headphones, User, FilePenLine } from "lucide-react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";
import exp1 from "@/assets/exp-1.jpg";
import exp2 from "@/assets/exp-2.jpg";
import exp3 from "@/assets/exp-3.jpg";
import exp4 from "@/assets/exp-4.jpg";
import exp5 from "@/assets/exp-5.jpg";
import exp6 from "@/assets/exp-6.jpg";

import { Header } from "@/components/Header";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ticketmaster Brasil - Compre ingressos para os melhores eventos" },
      { name: "description", content: "Ingressos para shows, esportes, teatro e experiências no Brasil. Compre com segurança no maior site de venda de ingressos." },
    ],
  }),
  component: Index,
});

const slides = [
  { img: hero1, title: "Rock in Rio 2026", date: "4, 5, 6, 7, 11, 12, 13 de Setembro de 2026" },
  { img: hero2, title: "Dia das Mães", date: "27 de Abril a 10 de Maio" },
  { img: hero3, title: "Tiago Iorc — Turnê Troco Likes 10 Anos", date: "Turnê 2026" },
  { img: hero4, title: "aespa: 2026-27 LIVE TOUR — SYNK", date: "04 de Setembro de 2026" },
];

const experiencias = [
  { img: exp1, venue: "Shopping Cidade São Paulo", title: "Toy Story Ao Infinito e Além: A Exposição", loc: "São Paulo | Múltiplas datas" },
  { img: exp2, venue: "Autódromo Velocitta", title: "Manti Wine Sessions", loc: "Mogi Guaçu | 5 e 6 de Junho" },
  { img: exp3, venue: "Shopping Vila Olímpia", title: "Coliseu: Exposição Imersiva", loc: "São Paulo | Múltiplas datas" },
  { img: exp4, venue: "Shopping Eldorado", title: "NBA House 2026", loc: "São Paulo | Múltiplas datas" },
  { img: exp5, venue: "ParkShopping Brasília", title: "Casa Warner", loc: "Brasília | Múltiplas datas" },
  { img: exp6, venue: "Parque Villa-Lobos", title: "Festival de Verão", loc: "São Paulo | Múltiplas datas" },
];

const teatro = [
  { img: exp3, venue: "Teatro VillaLobos", title: "Os Maiores Ilusionistas da América Latina", loc: "Rio de Janeiro" },
  { img: exp1, venue: "Teatro Renault", title: "O Rei Leão — Musical", loc: "São Paulo" },
  { img: exp5, venue: "Teatro Bradesco", title: "Mágica em Família", loc: "São Paulo" },
  { img: exp6, venue: "Teatro Procópio Ferreira", title: "Stand Up Comedy Night", loc: "São Paulo" },
];

function Index() {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5500);
    return () => clearInterval(id);
  }, []);

  const go = (dir: number) =>
    setCurrent((c) => (c + dir + slides.length) % slides.length);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero carousel */}
      <section className="relative overflow-hidden bg-black">
        <div className="relative aspect-[1920/720] w-full">
          {slides.map((s, i) => (
            <div
              key={s.title}
              className={`absolute inset-0 transition-opacity duration-700 ${
                i === current ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={s.img}
                alt={s.title}
                className="h-full w-full object-cover"
                loading={i === 0 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
              <div className="absolute inset-0 mx-auto flex max-w-[1400px] flex-col justify-center px-6 md:px-12">
                <h2 className="max-w-2xl text-4xl font-extrabold uppercase tracking-tight text-white md:text-6xl">
                  {s.title}
                </h2>
                <p className="mt-4 text-lg font-semibold text-white/90 md:text-xl">
                  {s.date}
                </p>
                <div className="mt-6 h-px w-24 bg-white/60" />
                <button className="mt-6 w-fit rounded-full bg-white px-10 py-3 text-sm font-bold uppercase text-tm-blue shadow-lg transition hover:bg-white/90">
                  Comprar
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={() => go(-1)}
            aria-label="Anterior"
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur transition hover:bg-white/40 md:left-8"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Próximo"
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur transition hover:bg-white/40 md:right-8"
          >
            <ChevronRight className="h-7 w-7" />
          </button>

          <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === current ? "w-8 bg-white" : "w-2 bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Experiências */}
      <CardSection title="Experiências" items={experiencias} />

      {/* Teatro & Shows */}
      <CardSection title="Teatro & Shows" items={teatro} />

      {/* Promo strip */}
      <section className="bg-tm-blue py-14 text-white">
        <div className="mx-auto max-w-[1400px] px-6 text-center">
          <h3 className="text-3xl font-extrabold md:text-4xl">
            Os melhores eventos do Brasil em um só lugar
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-white/85">
            Compre seus ingressos com segurança e garantia oficial. Shows, esportes,
            teatro, festivais e experiências exclusivas.
          </p>
          <button className="mt-6 rounded-full bg-white px-10 py-3 text-sm font-bold uppercase text-tm-blue transition hover:bg-white/90">
            Ver todos os eventos
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white/80">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-6 py-14 md:grid-cols-4">
          <div>
            <div className="text-2xl font-bold italic text-white">ticketmaster</div>
            <p className="mt-4 text-sm">
              O maior site de venda de ingressos do Brasil. Garanta sua entrada para
              os melhores eventos.
            </p>
          </div>
          <FooterCol title="Ajuda" items={["Central de ajuda", "Contato", "Devolução", "Trocas"]} />
          <FooterCol title="Sobre" items={["Quem somos", "Trabalhe conosco", "Imprensa", "Política de Privacidade"]} />
          <div>
            <h4 className="text-sm font-bold uppercase text-white">Siga-nos</h4>
            <div className="mt-4 flex gap-3">
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

function CardSection({
  title,
  items,
}: {
  title: string;
  items: { img: string; venue: string; title: string; loc: string }[];
}) {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-14">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">{title}</h2>
        <button className="rounded-full bg-tm-blue px-5 py-2 text-sm font-semibold text-white transition hover:bg-tm-blue-dark">
          Ver mais
        </button>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {items.map((it) => (
          <article
            key={it.title}
            className="group cursor-pointer overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-border transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="bg-tm-blue px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white">
              {it.venue}
            </div>
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src={it.img}
                alt={it.title}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h3 className="line-clamp-2 text-base font-bold text-foreground">{it.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{it.loc}</p>
              <button className="mt-4 w-full rounded-full bg-tm-blue py-2 text-xs font-semibold uppercase text-white transition hover:bg-tm-blue-dark">
                Confira
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-sm font-bold uppercase text-white">{title}</h4>
      <ul className="mt-4 space-y-2 text-sm">
        {items.map((i) => (
          <li key={i}>
            {i === "Política de Privacidade" ? (
              <Link
                to="/privacy"
                className="inline-flex items-center rounded-md bg-blue-600 px-3 py-1.5 font-medium text-white shadow-sm transition-colors hover:bg-blue-500 hover:text-white"
              >
                {i}
              </Link>
            ) : (
              <a href="#" className="hover:text-white">
                {i}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
