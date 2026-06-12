import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { AppFooter } from "@/components/AppFooter";
import { Header } from "@/components/Header";
import { getHomepageEvents, getVenueById, type Event } from "@/data/events";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ticketmaster Brasil" },
      {
        name: "description",
        content:
          "Ingressos para shows, esportes, teatro e experiências no Brasil. Compre com segurança no maior site de venda de ingressos.",
      },
    ],
  }),
  component: Index,
});

const slides = getHomepageEvents("hero");
const experiencias = getHomepageEvents("experiences");
const teatro = getHomepageEvents("theater");

function Index() {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5500);
    return () => clearInterval(id);
  }, []);

  const go = (dir: number) => setCurrent((c) => (c + dir + slides.length) % slides.length);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero carousel */}
      <section className="relative overflow-hidden bg-black">
        <div className="relative aspect-[1920/720] w-full">
          {slides.map((s, i) => (
            <div
              key={s.id}
              className={`absolute inset-0 transition-opacity duration-700 ${
                i === current ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={s.images.hero ?? s.images.card}
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
                  {s.homepage?.dateLabel}
                </p>
                <div className="mt-6 h-px w-24 bg-white/60" />
                <Link
                  to="/event/$slug"
                  params={{ slug: s.slug }}
                  className="mt-6 w-fit rounded-full bg-white px-10 py-3 text-sm font-bold uppercase text-tm-blue shadow-lg transition hover:bg-white/90"
                >
                  Comprar
                </Link>
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
            Compre seus ingressos com segurança e garantia oficial. Shows, esportes, teatro,
            festivais e experiências exclusivas.
          </p>
          <button className="mt-6 rounded-full bg-white px-10 py-3 text-sm font-bold uppercase text-tm-blue transition hover:bg-white/90">
            Ver todos os eventos
          </button>
        </div>
      </section>

      <AppFooter />
    </div>
  );
}

function CardSection({ title, items }: { title: string; items: Event[] }) {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-14">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">{title}</h2>
        <button className="rounded-full bg-tm-blue px-5 py-2 text-sm font-semibold text-white transition hover:bg-tm-blue-dark">
          Ver mais
        </button>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {items.map((it) => {
          const venue = getVenueById(it.venueId);

          return (
            <Link
              key={it.id}
              to="/event/$slug"
              params={{ slug: it.slug }}
              className="group overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-border transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="bg-tm-blue px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white">
                {venue?.name}
              </div>
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={it.images.card}
                  alt={it.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="line-clamp-2 text-base font-bold text-foreground">{it.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{it.homepage?.locationLabel}</p>
                <span className="mt-4 block w-full rounded-full bg-tm-blue py-2 text-center text-xs font-semibold uppercase text-white transition group-hover:bg-tm-blue-dark">
                  Confira
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
