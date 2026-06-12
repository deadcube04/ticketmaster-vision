import { Link } from "@tanstack/react-router";
import { FileText, Ticket, User } from "lucide-react";

export function ProfileSidebar() {
  return (
    <aside className="w-full shrink-0 md:w-64 space-y-2">
      <div className="mb-4 flex items-center gap-2 px-4 text-sm font-medium text-muted-foreground"></div>

      <nav className="flex flex-col gap-1">
        <Link
          to="/profile"
          className="flex items-center gap-2 rounded-md px-4 py-3 text-sm font-semibold transition-colors"
          activeProps={{ className: "bg-white text-tm-blue border-l-4 border-tm-blue shadow-sm" }}
          inactiveProps={{ className: "text-muted-foreground hover:bg-muted/50" }}
        >
          <User className="h-4 w-4" />
          Informações Pessoais
        </Link>
        <Link
          to="/pedidos"
          className="flex items-center gap-2 rounded-md px-4 py-3 text-sm font-semibold transition-colors"
          activeProps={{ className: "bg-white text-tm-blue border-l-4 border-tm-blue shadow-sm" }}
          inactiveProps={{ className: "text-muted-foreground hover:bg-muted/50" }}
        >
          <Ticket className="h-4 w-4" />
          Meus Pedidos
        </Link>
        <Link
          to="/solicitacoes"
          className="flex items-center gap-2 rounded-md px-4 py-3 text-sm font-semibold transition-colors"
          activeProps={{ className: "bg-white text-tm-blue border-l-4 border-tm-blue shadow-sm" }}
          inactiveProps={{ className: "text-muted-foreground hover:bg-muted/50" }}
        >
          <FileText className="h-4 w-4" />
          Minhas Solicitações
        </Link>

        <div className="mt-4 border-t pt-4">
          <button className="flex items-center gap-2 rounded-md px-4 py-3 text-sm text-muted-foreground hover:bg-muted/50 w-full text-left">
            Você precisa de ajuda?
          </button>
        </div>
      </nav>
    </aside>
  );
}
