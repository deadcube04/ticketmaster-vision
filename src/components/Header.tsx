import { Link } from "@tanstack/react-router";
import { Search, Headphones, User, FilePenLine, Ticket } from "lucide-react";
import { useMockAuth } from "@/lib/mock-auth";

export function Header() {
  const { isLoggedIn, login, logout } = useMockAuth();

  return (
    <header className="bg-tm-blue text-white">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5">
        <Link to="/" className="text-2xl font-bold italic tracking-tight">
          ticketmaster
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium xl:flex">
          <Link to="/suporte" className="flex items-center gap-2 hover:opacity-80">
            <Headphones className="h-4 w-4" /> Suporte ao Fã
          </Link>
          <Link to="/privacy" className="flex items-center gap-2 hover:opacity-80">
            <FilePenLine className="h-4 w-4" /> Portal de Privacidade
          </Link>
          <Link to="/pedidos" className="flex items-center gap-2 hover:opacity-80">
            <Ticket className="h-4 w-4" /> Meus Pedidos
          </Link>
          <Link to="/profile" className="flex items-center gap-2 hover:opacity-80">
            <User className="h-4 w-4" /> Meu perfil
          </Link>
          {isLoggedIn ? (
            <button type="button" onClick={logout} className="hover:opacity-80">
              Sair
            </button>
          ) : (
            <button type="button" onClick={login} className="hover:opacity-80">
              Login
            </button>
          )}
        </nav>
        <form className="relative hidden w-full max-w-sm lg:block">
          <input
            type="text"
            placeholder="Buscar eventos..."
            className="h-12 w-full rounded-full border-0 bg-white px-7 pr-28 text-base text-foreground outline-none placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            className="absolute right-1 top-1 flex h-10 items-center gap-2 rounded-full bg-tm-blue px-6 text-sm font-semibold text-white transition hover:bg-tm-blue-dark"
          >
            Buscar <Search className="h-4 w-4" />
          </button>
        </form>
      </div>
    </header>
  );
}
