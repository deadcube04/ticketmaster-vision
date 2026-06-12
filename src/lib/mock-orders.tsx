import * as React from "react";

import type { Event, EventSession, TicketType, Venue } from "@/data/events";
import { useMockAuth } from "@/lib/mock-auth";

const MOCK_ORDERS_STORAGE_KEY = "ticketmaster-vision:orders";

export type PaymentMethod = "pix" | "credit_card";

export interface MockOrder {
  id: string;
  buyerEmail: string;
  purchasedAt: string;
  status: "confirmed";
  paymentMethod: PaymentMethod;
  quantity: number;
  subtotal: number;
  serviceFees: number;
  total: number;
  holder: {
    name: string;
    email: string;
    document: string;
  };
  event: {
    id: string;
    slug: string;
    title: string;
    image: string;
  };
  venue: {
    name: string;
    city: string;
    state: string;
  };
  session: {
    id: string;
    startsAt: string;
    doorsOpenAt?: string;
  };
  ticket: {
    id: string;
    name: string;
    price: number;
    serviceFee: number;
  };
}

export interface CreateOrderInput {
  event: Event;
  venue: Venue;
  session: EventSession;
  ticket: TicketType;
  quantity: number;
  holder: MockOrder["holder"];
  paymentMethod: PaymentMethod;
}

interface MockOrdersContextValue {
  orders: MockOrder[];
  isHydrated: boolean;
  createOrder: (input: CreateOrderInput) => MockOrder;
}

const MockOrdersContext = React.createContext<MockOrdersContextValue | null>(null);

export function MockOrdersProvider({ children }: { children: React.ReactNode }) {
  const { user } = useMockAuth();
  const [allOrders, setAllOrders] = React.useState<MockOrder[]>([]);
  const [isHydrated, setIsHydrated] = React.useState(false);

  React.useEffect(() => {
    try {
      const savedOrders = window.localStorage.getItem(MOCK_ORDERS_STORAGE_KEY);
      setAllOrders(savedOrders ? (JSON.parse(savedOrders) as MockOrder[]) : []);
    } catch {
      window.localStorage.removeItem(MOCK_ORDERS_STORAGE_KEY);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  const createOrder = React.useCallback(
    (input: CreateOrderInput) => {
      if (!user) {
        throw new Error("É necessário estar logado para criar um pedido.");
      }

      const subtotal = input.ticket.price * input.quantity;
      const serviceFees = input.ticket.serviceFee * input.quantity;
      const purchasedAt = new Date().toISOString();
      const order: MockOrder = {
        id: createOrderId(purchasedAt),
        buyerEmail: user.email,
        purchasedAt,
        status: "confirmed",
        paymentMethod: input.paymentMethod,
        quantity: input.quantity,
        subtotal,
        serviceFees,
        total: subtotal + serviceFees,
        holder: input.holder,
        event: {
          id: input.event.id,
          slug: input.event.slug,
          title: input.event.title,
          image: input.event.images.card,
        },
        venue: {
          name: input.venue.name,
          city: input.venue.address.city,
          state: input.venue.address.state,
        },
        session: {
          id: input.session.id,
          startsAt: input.session.startsAt,
          doorsOpenAt: input.session.doorsOpenAt,
        },
        ticket: {
          id: input.ticket.id,
          name: input.ticket.name,
          price: input.ticket.price,
          serviceFee: input.ticket.serviceFee,
        },
      };

      setAllOrders((currentOrders) => {
        const nextOrders = [order, ...currentOrders];
        window.localStorage.setItem(MOCK_ORDERS_STORAGE_KEY, JSON.stringify(nextOrders));
        return nextOrders;
      });

      return order;
    },
    [user],
  );

  const orders = React.useMemo(
    () =>
      user
        ? allOrders
            .filter((order) => order.buyerEmail === user.email)
            .sort(
              (firstOrder, secondOrder) =>
                new Date(secondOrder.purchasedAt).getTime() -
                new Date(firstOrder.purchasedAt).getTime(),
            )
        : [],
    [allOrders, user],
  );

  const value = React.useMemo(
    () => ({ orders, isHydrated, createOrder }),
    [createOrder, isHydrated, orders],
  );

  return <MockOrdersContext.Provider value={value}>{children}</MockOrdersContext.Provider>;
}

export function useMockOrders() {
  const context = React.useContext(MockOrdersContext);

  if (!context) {
    throw new Error("useMockOrders must be used within MockOrdersProvider");
  }

  return context;
}

function createOrderId(purchasedAt: string): string {
  const date = new Date(purchasedAt);
  const datePart = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("");
  const sequence = String(date.getTime()).slice(-6);

  return `TM-${datePart}-${sequence}`;
}
