import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, CreditCard, MapPin, ShoppingBag, Ticket, User } from "lucide-react";

import { Header } from "@/components/Header";
import { ProfileSidebar } from "@/components/ProfileSidebar";
import { Badge } from "@/components/ui/badge";
import { useMockAuth } from "@/lib/mock-auth";
import { type MockOrder, type PaymentMethod, useMockOrders } from "@/lib/mock-orders";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const dateTimeFormatter = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "America/Sao_Paulo",
});

export const Route = createFileRoute("/pedidos")({
  head: () => ({
    meta: [
      { title: "Ticketmaster Brasil" },
      { name: "description", content: "Consulte seus pedidos e ingressos comprados." },
    ],
  }),
  component: OrdersRoute,
});

function OrdersRoute() {
  const { isLoggedIn, isHydrated: isAuthHydrated, login } = useMockAuth();
  const { orders, isHydrated: areOrdersHydrated } = useMockOrders();
  const isLoading = !isAuthHydrated || !areOrdersHydrated;

  return (
    <div className="min-h-screen bg-[#F6F7F9] font-sans text-foreground">
      <Header />

      <div className="bg-tm-blue px-8 pb-12 pt-6 text-white">
        <div className="mx-auto max-w-[1400px]">
          <h1 className="mb-2 text-3xl font-bold">Meu perfil</h1>
          <p className="text-sm text-white/90">
            Consulte seus pedidos e os ingressos vinculados à sua conta.
          </p>
        </div>
      </div>

      <main className="-mt-8 mx-auto flex max-w-[1400px] flex-col gap-8 px-8 py-8 md:flex-row">
        <ProfileSidebar />

        <section className="min-w-0 flex-1 rounded-xl bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-tm-blue">Compras</p>
              <h2 className="mt-1 text-2xl font-bold">Meus Pedidos</h2>
            </div>
            {isLoggedIn && !isLoading && (
              <Badge variant="secondary">
                {orders.length} {orders.length === 1 ? "pedido" : "pedidos"}
              </Badge>
            )}
          </div>

          {isLoading ? (
            <LoadingState />
          ) : !isLoggedIn ? (
            <LoggedOutState onLogin={login} />
          ) : orders.length === 0 ? (
            <EmptyOrdersState />
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function OrderCard({ order }: { order: MockOrder }) {
  return (
    <article className="overflow-hidden rounded-2xl border bg-card shadow-sm">
      <div className="grid md:grid-cols-[220px_1fr]">
        <div className="bg-muted">
          <img
            src={order.event.image}
            alt={order.event.title}
            className="h-full min-h-48 w-full object-cover"
          />
        </div>

        <div className="p-5 sm:p-6">
          <div className="flex flex-col gap-4 border-b pb-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-emerald-600 hover:bg-emerald-600">Confirmado</Badge>
                <span className="text-xs font-semibold uppercase text-muted-foreground">
                  {order.id}
                </span>
              </div>
              <h3 className="mt-3 text-xl font-extrabold">{order.event.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Comprado em {dateTimeFormatter.format(new Date(order.purchasedAt))}
              </p>
            </div>
            <div className="sm:text-right">
              <p className="text-xs font-bold uppercase text-muted-foreground">Total</p>
              <p className="mt-1 text-2xl font-extrabold text-tm-blue">
                {currencyFormatter.format(order.total)}
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-4 text-sm sm:grid-cols-2 xl:grid-cols-3">
            <OrderDetail
              icon={CalendarDays}
              label="Sessão"
              value={dateTimeFormatter.format(new Date(order.session.startsAt))}
            />
            <OrderDetail
              icon={MapPin}
              label="Local"
              value={`${order.venue.name} · ${order.venue.city}, ${order.venue.state}`}
            />
            <OrderDetail
              icon={Ticket}
              label="Ingresso"
              value={`${order.quantity}x ${order.ticket.name}`}
            />
            <OrderDetail icon={User} label="Titular" value={order.holder.name} />
            <OrderDetail
              icon={CreditCard}
              label="Pagamento"
              value={paymentMethodLabels[order.paymentMethod]}
            />
            <OrderDetail
              icon={ShoppingBag}
              label="Taxas incluídas"
              value={currencyFormatter.format(order.serviceFees)}
            />
          </div>

          <div className="mt-6 flex justify-end border-t pt-5">
            <Link
              to="/event/$slug"
              params={{ slug: order.event.slug }}
              className="rounded-full border border-tm-blue px-5 py-2.5 text-sm font-bold text-tm-blue transition hover:bg-tm-blue hover:text-white"
            >
              Ver detalhes do evento
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

function OrderDetail({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Ticket;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-tm-blue" />
      <div>
        <p className="text-xs font-bold uppercase text-muted-foreground">{label}</p>
        <p className="mt-1 font-semibold">{value}</p>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="space-y-4" aria-label="Carregando pedidos">
      {[1, 2].map((item) => (
        <div key={item} className="h-52 animate-pulse rounded-2xl bg-muted" />
      ))}
    </div>
  );
}

function LoggedOutState({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="rounded-2xl border border-blue-100 bg-blue-50 px-6 py-12 text-center">
      <User className="mx-auto h-10 w-10 text-tm-blue" />
      <h3 className="mt-4 text-xl font-bold text-blue-950">Entre para acessar seus pedidos</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-blue-900/80">
        Seus ingressos ficam vinculados à sua conta e estarão disponíveis novamente após o login.
      </p>
      <button
        type="button"
        onClick={onLogin}
        className="mt-5 rounded-full bg-tm-blue px-6 py-3 text-sm font-bold text-white hover:bg-tm-blue-dark"
      >
        Entrar
      </button>
    </div>
  );
}

function EmptyOrdersState() {
  return (
    <div className="rounded-2xl border border-dashed px-6 py-14 text-center">
      <ShoppingBag className="mx-auto h-11 w-11 text-muted-foreground" />
      <h3 className="mt-4 text-xl font-bold">Você ainda não possui pedidos</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        Quando você comprar ingressos, os detalhes do pedido aparecerão nesta página.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex rounded-full bg-tm-blue px-6 py-3 text-sm font-bold text-white hover:bg-tm-blue-dark"
      >
        Explorar eventos
      </Link>
    </div>
  );
}

const paymentMethodLabels: Record<PaymentMethod, string> = {
  pix: "Pix",
  credit_card: "Cartão de crédito",
};
