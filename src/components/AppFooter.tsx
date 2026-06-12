import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const socialLinks = [
  { label: "Facebook", icon: Facebook },
  { label: "Instagram", icon: Instagram },
  { label: "Twitter", icon: Twitter },
  { label: "YouTube", icon: Youtube },
];

export function AppFooter() {
  return (
    <footer className="bg-foreground text-white/80">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-6 py-14 md:grid-cols-4">
        <div>
          <div className="text-2xl font-bold italic text-white">ticketmaster</div>
          <p className="mt-4 text-sm">
            O maior site de venda de ingressos do Brasil. Garanta sua entrada para os melhores
            eventos.
          </p>
        </div>
        <FooterColumn
          title="Ajuda"
          items={["Central de ajuda", "Contato", "Devolução", "Trocas"]}
        />
        <FooterColumn
          title="Sobre"
          items={["Quem somos", "Trabalhe conosco", "Imprensa", "Portal de Privacidade"]}
        />
        <div>
          <h4 className="text-sm font-bold uppercase text-white">Siga-nos</h4>
          <div className="mt-4 flex gap-3">
            {socialLinks.map(({ label, icon: Icon }) => (
              <a
                key={label}
                href="#"
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-tm-blue"
                aria-label={label}
              >
                <Icon className="h-4 w-4 text-white" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1400px] px-6 py-6 text-center text-xs text-white/60">
          © {new Date().getFullYear()} Ticketmaster Brasil — Réplica visual para fins
          demonstrativos.
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-sm font-bold uppercase text-white">{title}</h4>
      <ul className="mt-4 space-y-2 text-sm">
        {items.map((item) => (
          <li key={item}>
            {item === "Portal de Privacidade" ? (
              <Link
                to="/privacy"
                className="inline-flex items-center rounded-md bg-blue-600 px-3 py-1.5 font-medium text-white shadow-sm transition-colors hover:bg-blue-500 hover:text-white"
              >
                {item}
              </Link>
            ) : (
              <a href="#" className="hover:text-white">
                {item}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
