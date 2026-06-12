import * as React from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  Clock3,
  Info,
  MapPin,
  ShieldCheck,
  Ticket,
  Users,
} from "lucide-react";

import { AppFooter } from "@/components/AppFooter";
import { EventPurchaseDialog } from "@/components/EventPurchaseDialog";
import { Header } from "@/components/Header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  getEventBySlug,
  getOrganizerById,
  getVenueById,
  type Event,
  type EventCategory,
  type EventSession,
  type EventStatus,
  type Organizer,
  type SessionStatus,
  type TicketType,
  type Venue,
} from "@/data/events";
import { useMockAuth } from "@/lib/mock-auth";

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "full",
  timeZone: "America/Sao_Paulo",
});

const shortDateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "America/Sao_Paulo",
});

const timeFormatter = new Intl.DateTimeFormat("pt-BR", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "America/Sao_Paulo",
});

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const categoryLabels: Record<EventCategory, string> = {
  comedy: "Comédia",
  experience: "Experiência",
  family: "Família",
  festival: "Festival",
  music: "Música",
  sports: "Esportes",
  theater: "Teatro",
};

const eventStatusLabels: Record<EventStatus, string> = {
  announced: "Vendas em breve",
  on_sale: "Ingressos disponíveis",
  sold_out: "Ingressos esgotados",
  cancelled: "Evento cancelado",
  finished: "Evento encerrado",
};

const sessionStatusLabels: Record<SessionStatus, string> = {
  available: "Disponível",
  few_tickets: "Últimos ingressos",
  sold_out: "Esgotado",
  cancelled: "Cancelada",
};

const ticketAvailabilityLabels: Record<TicketType["availability"], string> = {
  available: "Disponível",
  few_tickets: "Poucos ingressos",
  sold_out: "Esgotado",
};

export const Route = createFileRoute("/event/$slug")({
  loader: ({ params }) => {
    const event = getEventBySlug(params.slug);

    if (!event) {
      throw notFound();
    }

    const venue = getVenueById(event.venueId);
    const organizer = getOrganizerById(event.organizerId);

    if (!venue || !organizer) {
      throw notFound();
    }

    return { event, venue, organizer };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: "Ticketmaster Brasil" },
          { name: "description", content: loaderData.event.summary },
          { property: "og:title", content: loaderData.event.title },
          { property: "og:description", content: loaderData.event.summary },
          {
            property: "og:image",
            content: loaderData.event.images.hero ?? loaderData.event.images.card,
          },
        ]
      : [{ title: "Ticketmaster Brasil" }],
  }),
  notFoundComponent: EventNotFound,
  component: EventDetailsPage,
});

function EventDetailsPage() {
  const { event, venue, organizer } = Route.useLoaderData();
  const primarySession = event.sessions[0];
  const [isPurchaseOpen, setIsPurchaseOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main>
        <nav
          aria-label="Navegação estrutural"
          className="border-b bg-card text-sm text-muted-foreground"
        >
          <div className="mx-auto flex max-w-[1200px] items-center gap-2 overflow-hidden px-5 py-3 sm:px-6">
            <Link to="/" className="shrink-0 font-semibold text-tm-blue hover:underline">
              Início
            </Link>
            <span aria-hidden="true">/</span>
            <span className="shrink-0">Eventos</span>
            <span aria-hidden="true">/</span>
            <span className="truncate text-foreground">{event.title}</span>
          </div>
        </nav>

        <Hero event={event} venue={venue} primarySession={primarySession} />

        <div className="mx-auto max-w-[1200px] px-5 py-8 sm:px-6 lg:py-12">
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-tm-blue hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para eventos
          </Link>

          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="min-w-0 space-y-10">
              <EventOverview event={event} venue={venue} organizer={organizer} />
              <Sessions event={event} />
              <VenueDetails venue={venue} />
              <EventInformation event={event} />
            </div>

            <aside className="hidden lg:sticky lg:top-6 lg:block">
              <PurchaseCard event={event} onPurchase={() => setIsPurchaseOpen(true)} />
            </aside>
          </div>
        </div>
      </main>

      <div className="mx-auto max-w-[1200px] px-5 pb-10 sm:px-6 lg:hidden">
        <PurchaseCard event={event} onPurchase={() => setIsPurchaseOpen(true)} />
      </div>

      <AppFooter />
      <EventPurchaseDialog
        key={event.id}
        event={event}
        venue={venue}
        open={isPurchaseOpen}
        onOpenChange={setIsPurchaseOpen}
      />
    </div>
  );
}

function Hero({
  event,
  venue,
  primarySession,
}: {
  event: Event;
  venue: Venue;
  primarySession: EventSession;
}) {
  const heroImage = event.images.hero ?? event.images.card;

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <img
        src={heroImage}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-35 blur-2xl"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/90" />

      <div className="relative mx-auto grid max-w-[1200px] gap-8 px-5 py-10 sm:px-6 md:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)] md:items-center lg:py-14">
        <div className="overflow-hidden rounded-2xl border border-white/15 bg-black/20 shadow-2xl">
          <img
            src={heroImage}
            alt={event.images.alt}
            className="aspect-[16/9] h-full w-full object-cover"
          />
        </div>

        <div>
          <div className="flex flex-wrap gap-2">
            <Badge className="border-white/20 bg-white/15 text-white hover:bg-white/15">
              {categoryLabels[event.category]}
            </Badge>
            <Badge className="border-white/20 bg-white/15 text-white hover:bg-white/15">
              {eventStatusLabels[event.status]}
            </Badge>
          </div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            {event.title}
          </h1>
          {event.subtitle && <p className="mt-3 text-lg text-white/80">{event.subtitle}</p>}

          <div className="mt-7 space-y-3 text-sm text-white/90 sm:text-base">
            <p className="flex items-start gap-3">
              <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-blue-300" />
              <span>{dateFormatter.format(new Date(primarySession.startsAt))}</span>
            </p>
            <p className="flex items-start gap-3">
              <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-blue-300" />
              <span>Apresentação às {formatTime(primarySession.startsAt)}</span>
            </p>
            <p className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-blue-300" />
              <span>
                {venue.name} · {venue.address.city}, {venue.address.state}
              </span>
            </p>
            <p className="flex items-start gap-3">
              <Users className="mt-0.5 h-5 w-5 shrink-0 text-blue-300" />
              <span>Classificação: {event.policy.ageRating}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function EventOverview({
  event,
  venue,
  organizer,
}: {
  event: Event;
  venue: Venue;
  organizer: Organizer;
}) {
  return (
    <section aria-labelledby="event-overview">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-tm-blue">Sobre o evento</p>
      <h2 id="event-overview" className="mt-2 text-3xl font-extrabold tracking-tight">
        {event.summary}
      </h2>
      <p className="mt-5 text-base leading-8 text-muted-foreground">{event.description}</p>

      <div className="mt-7 grid gap-4 sm:grid-cols-3">
        <InfoCard icon={Clock3} label="Duração" value={formatDuration(event.durationMinutes)} />
        <InfoCard icon={Users} label="Classificação" value={event.policy.ageRating} />
        <InfoCard icon={ShieldCheck} label="Organização" value={organizer.name} />
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {event.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="px-3 py-1">
            {tag}
          </Badge>
        ))}
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        Evento realizado em {venue.name}. Informações sujeitas a alterações pelo organizador.
      </p>
    </section>
  );
}

function InfoCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Clock3;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm">
      <Icon className="h-5 w-5 text-tm-blue" />
      <p className="mt-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 font-semibold">{value}</p>
    </div>
  );
}

function Sessions({ event }: { event: Event }) {
  return (
    <section aria-labelledby="sessions-heading">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-tm-blue">Agenda</p>
          <h2 id="sessions-heading" className="mt-2 text-2xl font-extrabold">
            Datas e horários
          </h2>
        </div>
        <Badge variant="outline">
          {event.sessions.length} {event.sessions.length === 1 ? "sessão" : "sessões"}
        </Badge>
      </div>

      <div className="mt-5 space-y-3">
        {event.sessions.map((session) => (
          <div
            key={session.id}
            className="flex flex-col gap-4 rounded-xl border bg-card p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-bold capitalize">
                {shortDateFormatter.format(new Date(session.startsAt))}
              </p>
              <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                <span>Apresentação: {formatTime(session.startsAt)}</span>
                {session.doorsOpenAt && <span>Portões: {formatTime(session.doorsOpenAt)}</span>}
              </div>
            </div>
            <Badge variant={session.status === "cancelled" ? "destructive" : "secondary"}>
              {sessionStatusLabels[session.status]}
            </Badge>
          </div>
        ))}
      </div>
    </section>
  );
}

function VenueDetails({ venue }: { venue: Venue }) {
  return (
    <section aria-labelledby="venue-heading">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-tm-blue">Local</p>
      <h2 id="venue-heading" className="mt-2 text-2xl font-extrabold">
        {venue.name}
      </h2>
      <div className="mt-5 rounded-2xl border bg-card p-6 shadow-sm">
        <div className="flex gap-4">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-tm-blue/10">
            <MapPin className="h-5 w-5 text-tm-blue" />
          </div>
          <div>
            <p className="font-semibold">{formatAddress(venue)}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {venue.address.city} · {venue.address.state} · {venue.address.country}
            </p>
          </div>
        </div>

        <div className="mt-6 border-t pt-5">
          <p className="text-sm font-bold">Recursos de acessibilidade no local</p>
          <ul className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
            {venue.accessibilityFeatures.map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-tm-blue" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function EventInformation({ event }: { event: Event }) {
  return (
    <section aria-labelledby="information-heading">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-tm-blue">
        Informações importantes
      </p>
      <h2 id="information-heading" className="mt-2 text-2xl font-extrabold">
        Antes de ir
      </h2>

      <Accordion
        type="multiple"
        defaultValue={["classification"]}
        className="mt-5 rounded-2xl border bg-card px-5 shadow-sm"
      >
        <AccordionItem value="classification">
          <AccordionTrigger className="text-base font-bold">Classificação etária</AccordionTrigger>
          <AccordionContent className="leading-7 text-muted-foreground">
            <p className="font-semibold text-foreground">{event.policy.ageRating}</p>
            <p>{event.policy.ageRatingDetails}</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="entry">
          <AccordionTrigger className="text-base font-bold">Regras de entrada</AccordionTrigger>
          <AccordionContent>
            <PolicyList items={event.policy.entryRules} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="accessibility">
          <AccordionTrigger className="text-base font-bold">Acessibilidade</AccordionTrigger>
          <AccordionContent>
            <PolicyList items={event.policy.accessibility} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="cancellation" className="border-b-0">
          <AccordionTrigger className="text-base font-bold">
            Cancelamentos e alterações
          </AccordionTrigger>
          <AccordionContent className="leading-7 text-muted-foreground">
            {event.policy.cancellation}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}

function PolicyList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 text-muted-foreground">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 leading-7">
          <Check className="mt-1.5 h-4 w-4 shrink-0 text-tm-blue" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function PurchaseCard({ event, onPurchase }: { event: Event; onPurchase: () => void }) {
  const { isLoggedIn } = useMockAuth();
  const isAvailable =
    event.status === "on_sale" &&
    event.sessions.some(
      (session) => session.status === "available" || session.status === "few_tickets",
    ) &&
    event.ticketTypes.some(
      (ticketType) =>
        ticketType.availability === "available" || ticketType.availability === "few_tickets",
    );
  const buttonLabel = getPurchaseLabel(event.status);
  const lowestPrice = Math.min(...event.ticketTypes.map((ticketType) => ticketType.price));

  return (
    <section
      className="overflow-hidden rounded-2xl border bg-card shadow-xl"
      aria-label="Ingressos"
    >
      <div className="bg-tm-blue px-6 py-5 text-white">
        <p className="text-sm font-medium text-white/80">Ingressos a partir de</p>
        <p className="mt-1 text-3xl font-extrabold">{currencyFormatter.format(lowestPrice)}</p>
        <p className="mt-1 text-xs text-white/70">Taxa de serviço calculada por ingresso</p>
      </div>

      <div className="space-y-4 p-6">
        {event.ticketTypes.map((ticketType) => (
          <TicketPrice key={ticketType.id} ticketType={ticketType} />
        ))}

        <button
          type="button"
          disabled={!isAvailable}
          onClick={onPurchase}
          className="mt-2 w-full rounded-full bg-tm-blue px-5 py-3.5 text-sm font-bold uppercase text-white transition hover:bg-tm-blue-dark disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
        >
          {buttonLabel}
        </button>

        <p className="flex items-start gap-2 text-xs leading-5 text-muted-foreground">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-tm-blue" />
          {isLoggedIn
            ? "Compra segura e ingressos oficiais. Seu pedido ficará vinculado à sua conta."
            : "Compra segura e ingressos oficiais. Entre com sua conta para concluir o pedido."}
        </p>
      </div>
    </section>
  );
}

function TicketPrice({ ticketType }: { ticketType: TicketType }) {
  return (
    <div className="rounded-xl border p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-bold">{ticketType.name}</p>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">{ticketType.description}</p>
        </div>
        <Ticket className="h-5 w-5 shrink-0 text-tm-blue" />
      </div>
      <div className="mt-3 flex items-end justify-between gap-3 border-t pt-3">
        <div>
          <p className="text-lg font-extrabold">{currencyFormatter.format(ticketType.price)}</p>
          <p className="text-xs text-muted-foreground">
            + {currencyFormatter.format(ticketType.serviceFee)} de taxa
          </p>
        </div>
        <span className="text-xs font-semibold text-tm-blue">
          {ticketAvailabilityLabels[ticketType.availability]}
        </span>
      </div>
      {ticketType.benefits.length > 0 && (
        <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
          {ticketType.benefits.map((benefit) => (
            <li key={benefit} className="flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-tm-blue" />
              {benefit}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function EventNotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="grid flex-1 place-items-center px-6 py-20">
        <div className="max-w-lg text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-tm-blue/10">
            <Ticket className="h-8 w-8 text-tm-blue" />
          </div>
          <h1 className="mt-6 text-3xl font-extrabold">Evento não encontrado</h1>
          <p className="mt-3 leading-7 text-muted-foreground">
            Este evento não está disponível ou o endereço acessado não existe mais.
          </p>
          <Link
            to="/"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-tm-blue px-6 py-3 text-sm font-bold text-white hover:bg-tm-blue-dark"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para a página inicial
          </Link>
        </div>
      </main>
      <AppFooter />
    </div>
  );
}

function formatTime(date: string): string {
  return timeFormatter.format(new Date(date));
}

function formatDuration(durationMinutes?: number): string {
  if (!durationMinutes) {
    return "Consultar programação";
  }

  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;

  if (!hours) {
    return `${minutes} min`;
  }

  return minutes ? `${hours}h ${minutes}min` : `${hours}h`;
}

function formatAddress(venue: Venue): string {
  const number = venue.address.number ? `, ${venue.address.number}` : "";
  const postalCode = venue.address.postalCode ? ` · CEP ${venue.address.postalCode}` : "";

  return `${venue.address.street}${number} · ${venue.address.district}${postalCode}`;
}

function getPurchaseLabel(status: EventStatus): string {
  switch (status) {
    case "on_sale":
      return "Comprar ingressos";
    case "announced":
      return "Vendas em breve";
    case "sold_out":
      return "Ingressos esgotados";
    case "cancelled":
      return "Evento cancelado";
    case "finished":
      return "Evento encerrado";
  }
}
