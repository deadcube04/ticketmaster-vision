import * as React from "react";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, CreditCard, LogIn, QrCode, ShieldCheck, Ticket } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Event, EventSession, TicketType, Venue } from "@/data/events";
import { useMockAuth } from "@/lib/mock-auth";
import { type MockOrder, type PaymentMethod, useMockOrders } from "@/lib/mock-orders";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const sessionFormatter = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "America/Sao_Paulo",
});

interface EventPurchaseDialogProps {
  event: Event;
  venue: Venue;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EventPurchaseDialog({
  event,
  venue,
  open,
  onOpenChange,
}: EventPurchaseDialogProps) {
  const { isLoggedIn, login, user } = useMockAuth();
  const { createOrder } = useMockOrders();
  const availableSessions = event.sessions.filter(
    (session) => session.status === "available" || session.status === "few_tickets",
  );
  const availableTickets = event.ticketTypes.filter(
    (ticketType) =>
      ticketType.availability === "available" || ticketType.availability === "few_tickets",
  );
  const [sessionId, setSessionId] = React.useState(availableSessions[0]?.id ?? "");
  const [ticketId, setTicketId] = React.useState(availableTickets[0]?.id ?? "");
  const [quantity, setQuantity] = React.useState("1");
  const [holderName, setHolderName] = React.useState("");
  const [holderEmail, setHolderEmail] = React.useState("");
  const [holderDocument, setHolderDocument] = React.useState("");
  const [paymentMethod, setPaymentMethod] = React.useState<PaymentMethod>("pix");
  const [acceptedTerms, setAcceptedTerms] = React.useState(false);
  const [error, setError] = React.useState("");
  const [createdOrder, setCreatedOrder] = React.useState<MockOrder | null>(null);

  React.useEffect(() => {
    if (!open || !user) {
      return;
    }

    setHolderName((currentValue) => currentValue || `${user.firstName} ${user.lastName}`);
    setHolderEmail((currentValue) => currentValue || user.email);
    setHolderDocument((currentValue) => currentValue || user.documentNumber);
  }, [open, user]);

  const selectedSession =
    availableSessions.find((session) => session.id === sessionId) ?? availableSessions[0];
  const selectedTicket =
    availableTickets.find((ticketType) => ticketType.id === ticketId) ?? availableTickets[0];
  const numericQuantity = Number(quantity);
  const subtotal = selectedTicket ? selectedTicket.price * numericQuantity : 0;
  const serviceFees = selectedTicket ? selectedTicket.serviceFee * numericQuantity : 0;
  const total = subtotal + serviceFees;

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setCreatedOrder(null);
      setError("");
      setAcceptedTerms(false);
    }

    onOpenChange(nextOpen);
  };

  const handleSubmit = (submitEvent: React.FormEvent<HTMLFormElement>) => {
    submitEvent.preventDefault();
    setError("");

    if (!user || !selectedSession || !selectedTicket) {
      setError("Não foi possível preparar esta compra. Escolha uma sessão e um ingresso válidos.");
      return;
    }

    if (!holderName.trim() || !holderEmail.trim() || !holderDocument.trim()) {
      setError("Preencha os dados do titular do ingresso.");
      return;
    }

    if (!holderEmail.includes("@")) {
      setError("Informe um e-mail válido para o titular.");
      return;
    }

    if (!acceptedTerms) {
      setError("Aceite os termos da compra para continuar.");
      return;
    }

    const order = createOrder({
      event,
      venue,
      session: selectedSession,
      ticket: selectedTicket,
      quantity: numericQuantity,
      holder: {
        name: holderName.trim(),
        email: holderEmail.trim(),
        document: holderDocument.trim(),
      },
      paymentMethod,
    });

    setCreatedOrder(order);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[92vh] max-w-3xl overflow-y-auto">
        {!isLoggedIn ? (
          <LoginRequired onLogin={login} />
        ) : createdOrder ? (
          <PurchaseSuccess order={createdOrder} onClose={() => handleOpenChange(false)} />
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Comprar ingressos</DialogTitle>
              <DialogDescription>
                Escolha seus ingressos para {event.title}. A compra é simulada para este protótipo.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="mt-2 grid gap-6 lg:grid-cols-[1fr_280px]">
              <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="purchase-session">Sessão</Label>
                    <Select value={sessionId} onValueChange={setSessionId}>
                      <SelectTrigger id="purchase-session">
                        <SelectValue placeholder="Escolha uma sessão" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableSessions.map((session) => (
                          <SelectItem key={session.id} value={session.id}>
                            {sessionFormatter.format(new Date(session.startsAt))}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="purchase-ticket">Tipo de ingresso</Label>
                    <Select value={ticketId} onValueChange={setTicketId}>
                      <SelectTrigger id="purchase-ticket">
                        <SelectValue placeholder="Escolha um ingresso" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableTickets.map((ticketType) => (
                          <SelectItem key={ticketType.id} value={ticketType.id}>
                            {ticketType.name} · {currencyFormatter.format(ticketType.price)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="purchase-quantity">Quantidade</Label>
                  <Select value={quantity} onValueChange={setQuantity}>
                    <SelectTrigger id="purchase-quantity" className="sm:w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4].map((value) => (
                        <SelectItem key={value} value={String(value)}>
                          {value} {value === 1 ? "ingresso" : "ingressos"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <fieldset className="space-y-4 rounded-xl border p-4">
                  <legend className="px-2 font-bold">Dados do titular</legend>
                  <div className="space-y-2">
                    <Label htmlFor="holder-name">Nome completo</Label>
                    <Input
                      id="holder-name"
                      value={holderName}
                      onChange={(inputEvent) => setHolderName(inputEvent.target.value)}
                      autoComplete="name"
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="holder-email">E-mail</Label>
                      <Input
                        id="holder-email"
                        type="email"
                        value={holderEmail}
                        onChange={(inputEvent) => setHolderEmail(inputEvent.target.value)}
                        autoComplete="email"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="holder-document">Documento</Label>
                      <Input
                        id="holder-document"
                        value={holderDocument}
                        onChange={(inputEvent) => setHolderDocument(inputEvent.target.value)}
                      />
                    </div>
                  </div>
                </fieldset>

                <fieldset className="space-y-3">
                  <legend className="font-bold">Forma de pagamento</legend>
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}
                    className="grid gap-3 sm:grid-cols-2"
                  >
                    <PaymentOption
                      value="pix"
                      title="Pix"
                      description="Confirmação imediata"
                      icon={QrCode}
                    />
                    <PaymentOption
                      value="credit_card"
                      title="Cartão de crédito"
                      description="Sem informar dados do cartão"
                      icon={CreditCard}
                    />
                  </RadioGroup>
                </fieldset>

                <label className="flex cursor-pointer items-start gap-3 rounded-lg border p-4 text-sm">
                  <Checkbox
                    checked={acceptedTerms}
                    onCheckedChange={(checked) => setAcceptedTerms(checked === true)}
                    className="mt-0.5"
                  />
                  <span>
                    Li e aceito os termos da compra, as regras de entrada e a política de
                    cancelamento do evento.
                  </span>
                </label>

                {error && (
                  <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-800">
                    {error}
                  </p>
                )}
              </div>

              <aside className="h-fit rounded-xl border bg-muted/30 p-5 lg:sticky lg:top-0">
                <h3 className="font-bold">Resumo da compra</h3>
                <dl className="mt-4 space-y-3 text-sm">
                  <SummaryRow label="Ingresso" value={selectedTicket?.name ?? "Selecione"} />
                  <SummaryRow label="Quantidade" value={String(numericQuantity)} />
                  <SummaryRow label="Subtotal" value={currencyFormatter.format(subtotal)} />
                  <SummaryRow label="Taxas" value={currencyFormatter.format(serviceFees)} />
                </dl>
                <div className="mt-4 flex items-center justify-between border-t pt-4">
                  <span className="font-bold">Total</span>
                  <span className="text-xl font-extrabold text-tm-blue">
                    {currencyFormatter.format(total)}
                  </span>
                </div>
                <button
                  type="submit"
                  className="mt-5 w-full rounded-full bg-tm-blue px-5 py-3 text-sm font-bold uppercase text-white transition hover:bg-tm-blue-dark"
                >
                  Confirmar compra
                </button>
                <p className="mt-3 flex items-start gap-2 text-xs leading-5 text-muted-foreground">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-tm-blue" />
                  Nenhum dado sensível de pagamento será solicitado ou armazenado.
                </p>
              </aside>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function LoginRequired({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="py-6 text-center">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-tm-blue/10">
        <LogIn className="h-7 w-7 text-tm-blue" />
      </div>
      <DialogHeader className="mt-5 text-center sm:text-center">
        <DialogTitle className="text-2xl">Entre para comprar ingressos</DialogTitle>
        <DialogDescription className="mx-auto max-w-md">
          Somente usuários logados podem concluir compras e acessar seus pedidos posteriormente.
        </DialogDescription>
      </DialogHeader>
      <button
        type="button"
        onClick={onLogin}
        className="mt-6 rounded-full bg-tm-blue px-7 py-3 text-sm font-bold text-white hover:bg-tm-blue-dark"
      >
        Entrar e continuar
      </button>
    </div>
  );
}

function PurchaseSuccess({ order, onClose }: { order: MockOrder; onClose: () => void }) {
  return (
    <div className="py-6 text-center">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100">
        <CheckCircle2 className="h-9 w-9 text-emerald-600" />
      </div>
      <DialogHeader className="mt-5 text-center sm:text-center">
        <DialogTitle className="text-2xl">Compra confirmada</DialogTitle>
        <DialogDescription>
          Seu pedido foi registrado e já está disponível na área Meus Pedidos.
        </DialogDescription>
      </DialogHeader>
      <div className="mx-auto mt-5 max-w-sm rounded-xl border bg-muted/30 p-4">
        <p className="text-xs font-bold uppercase text-muted-foreground">Código do pedido</p>
        <p className="mt-1 text-xl font-extrabold text-tm-blue">{order.id}</p>
        <p className="mt-2 text-sm text-muted-foreground">
          {order.quantity} {order.quantity === 1 ? "ingresso" : "ingressos"} ·{" "}
          {currencyFormatter.format(order.total)}
        </p>
      </div>
      <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border px-6 py-3 text-sm font-bold hover:bg-muted"
        >
          Continuar no evento
        </button>
        <Link
          to="/pedidos"
          onClick={onClose}
          className="rounded-full bg-tm-blue px-6 py-3 text-sm font-bold text-white hover:bg-tm-blue-dark"
        >
          Ver meus pedidos
        </Link>
      </div>
    </div>
  );
}

function PaymentOption({
  value,
  title,
  description,
  icon: Icon,
}: {
  value: PaymentMethod;
  title: string;
  description: string;
  icon: typeof Ticket;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-xl border p-4 hover:bg-muted/40">
      <RadioGroupItem value={value} className="mt-1" />
      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-tm-blue" />
      <span>
        <span className="block font-bold">{title}</span>
        <span className="mt-1 block text-xs text-muted-foreground">{description}</span>
      </span>
    </label>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-semibold">{value}</dd>
    </div>
  );
}
