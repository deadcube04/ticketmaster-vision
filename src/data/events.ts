import exp1 from "@/assets/exp-1.jpg";
import exp2 from "@/assets/exp-2.jpg";
import exp3 from "@/assets/exp-3.jpg";
import exp4 from "@/assets/exp-4.jpg";
import exp5 from "@/assets/exp-5.jpg";
import exp6 from "@/assets/exp-6.jpg";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";

export type EventCategory =
  | "comedy"
  | "experience"
  | "family"
  | "festival"
  | "music"
  | "sports"
  | "theater";

export type EventStatus = "announced" | "on_sale" | "sold_out" | "cancelled" | "finished";
export type SessionStatus = "available" | "few_tickets" | "sold_out" | "cancelled";
export type HomepagePlacement = "hero" | "experiences" | "theater";

export interface Address {
  street: string;
  number?: string;
  district: string;
  city: string;
  state: string;
  postalCode?: string;
  country: "Brasil";
}

export interface Venue {
  id: string;
  name: string;
  address: Address;
  capacity?: number;
  accessibilityFeatures: string[];
}

export interface Organizer {
  id: string;
  name: string;
  supportEmail: string;
  website?: string;
}

export interface EventSession {
  id: string;
  startsAt: string;
  doorsOpenAt?: string;
  endsAt?: string;
  status: SessionStatus;
}

export interface TicketType {
  id: string;
  name: string;
  description: string;
  price: number;
  serviceFee: number;
  currency: "BRL";
  availability: "available" | "few_tickets" | "sold_out";
  benefits: string[];
}

export interface EventPolicy {
  ageRating: "Livre" | "10 anos" | "12 anos" | "14 anos" | "16 anos" | "18 anos";
  ageRatingDetails: string;
  entryRules: string[];
  accessibility: string[];
  cancellation: string;
}

export interface EventImages {
  card: string;
  hero?: string;
  alt: string;
}

export interface HomepagePresentation {
  placement: HomepagePlacement;
  order: number;
  dateLabel: string;
  locationLabel: string;
}

export interface Event {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  summary: string;
  description: string;
  category: EventCategory;
  tags: string[];
  status: EventStatus;
  venueId: string;
  organizerId: string;
  durationMinutes?: number;
  sessions: EventSession[];
  ticketTypes: TicketType[];
  policy: EventPolicy;
  images: EventImages;
  homepage?: HomepagePresentation;
}

const standardEntryRules = [
  "Apresente o ingresso digital e um documento oficial com foto.",
  "O QR Code é válido para uma única entrada e não deve ser compartilhado.",
];

const standardAccessibility = [
  "Atendimento preferencial disponível no local.",
  "Espaços reservados para pessoas com deficiência e acompanhantes.",
];

const standardCancellation =
  "Cancelamentos e alterações seguem a política do organizador e a legislação aplicável.";

function createPolicy(
  ageRating: EventPolicy["ageRating"],
  ageRatingDetails: string,
  extraRules: string[] = [],
): EventPolicy {
  return {
    ageRating,
    ageRatingDetails,
    entryRules: [...standardEntryRules, ...extraRules],
    accessibility: standardAccessibility,
    cancellation: standardCancellation,
  };
}

function createSession(
  eventId: string,
  id: string,
  startsAt: string,
  doorsOpenAt?: string,
  status: SessionStatus = "available",
): EventSession {
  return {
    id: `${eventId}-${id}`,
    startsAt,
    doorsOpenAt,
    status,
  };
}

function createTicketTypes(
  eventId: string,
  standardPrice: number,
  premiumPrice: number,
  premiumName = "Experiência premium",
): TicketType[] {
  return [
    {
      id: `${eventId}-inteira`,
      name: "Inteira",
      description: "Ingresso individual com acesso geral ao evento.",
      price: standardPrice,
      serviceFee: Number((standardPrice * 0.12).toFixed(2)),
      currency: "BRL",
      availability: "available",
      benefits: [],
    },
    {
      id: `${eventId}-meia`,
      name: "Meia-entrada",
      description: "Ingresso sujeito à apresentação de comprovante válido.",
      price: standardPrice / 2,
      serviceFee: Number((standardPrice * 0.06).toFixed(2)),
      currency: "BRL",
      availability: "available",
      benefits: [],
    },
    {
      id: `${eventId}-premium`,
      name: premiumName,
      description: "Ingresso com benefícios exclusivos definidos pelo organizador.",
      price: premiumPrice,
      serviceFee: Number((premiumPrice * 0.12).toFixed(2)),
      currency: "BRL",
      availability: "few_tickets",
      benefits: ["Entrada prioritária", "Área exclusiva", "Item comemorativo"],
    },
  ];
}

export const venues: Venue[] = [
  {
    id: "cidade-do-rock",
    name: "Cidade do Rock",
    address: {
      street: "Avenida Embaixador Abelardo Bueno",
      number: "6555",
      district: "Barra da Tijuca",
      city: "Rio de Janeiro",
      state: "RJ",
      country: "Brasil",
    },
    capacity: 100000,
    accessibilityFeatures: ["Rotas acessíveis", "Plataformas elevadas", "Banheiros adaptados"],
  },
  {
    id: "shopping-cidade-sao-paulo",
    name: "Shopping Cidade São Paulo",
    address: {
      street: "Avenida Paulista",
      number: "1230",
      district: "Bela Vista",
      city: "São Paulo",
      state: "SP",
      country: "Brasil",
    },
    accessibilityFeatures: ["Elevadores", "Banheiros adaptados"],
  },
  {
    id: "vibra-sao-paulo",
    name: "Vibra São Paulo",
    address: {
      street: "Avenida das Nações Unidas",
      number: "17955",
      district: "Vila Almeida",
      city: "São Paulo",
      state: "SP",
      country: "Brasil",
    },
    capacity: 7000,
    accessibilityFeatures: ["Assentos reservados", "Banheiros adaptados"],
  },
  {
    id: "allianz-parque",
    name: "Allianz Parque",
    address: {
      street: "Avenida Francisco Matarazzo",
      number: "1705",
      district: "Água Branca",
      city: "São Paulo",
      state: "SP",
      country: "Brasil",
    },
    capacity: 55000,
    accessibilityFeatures: ["Rotas acessíveis", "Assentos reservados", "Banheiros adaptados"],
  },
  {
    id: "autodromo-velocitta",
    name: "Autódromo Velocitta",
    address: {
      street: "Rodovia SP-342",
      district: "Nova Louzã",
      city: "Mogi Guaçu",
      state: "SP",
      country: "Brasil",
    },
    accessibilityFeatures: ["Estacionamento reservado", "Rotas acessíveis"],
  },
  {
    id: "shopping-vila-olimpia",
    name: "Shopping Vila Olímpia",
    address: {
      street: "Rua Olimpíadas",
      number: "360",
      district: "Vila Olímpia",
      city: "São Paulo",
      state: "SP",
      country: "Brasil",
    },
    accessibilityFeatures: ["Elevadores", "Banheiros adaptados"],
  },
  {
    id: "shopping-eldorado",
    name: "Shopping Eldorado",
    address: {
      street: "Avenida Rebouças",
      number: "3970",
      district: "Pinheiros",
      city: "São Paulo",
      state: "SP",
      country: "Brasil",
    },
    accessibilityFeatures: ["Elevadores", "Banheiros adaptados"],
  },
  {
    id: "parkshopping-brasilia",
    name: "ParkShopping Brasília",
    address: {
      street: "SAI/SO Área 6580",
      district: "Guará",
      city: "Brasília",
      state: "DF",
      country: "Brasil",
    },
    accessibilityFeatures: ["Elevadores", "Banheiros adaptados"],
  },
  {
    id: "parque-villa-lobos",
    name: "Parque Villa-Lobos",
    address: {
      street: "Avenida Professor Fonseca Rodrigues",
      number: "2001",
      district: "Alto de Pinheiros",
      city: "São Paulo",
      state: "SP",
      country: "Brasil",
    },
    accessibilityFeatures: ["Rotas acessíveis", "Banheiros adaptados"],
  },
  {
    id: "teatro-villalobos",
    name: "Teatro VillaLobos",
    address: {
      street: "Avenida Princesa Isabel",
      number: "440",
      district: "Copacabana",
      city: "Rio de Janeiro",
      state: "RJ",
      country: "Brasil",
    },
    capacity: 700,
    accessibilityFeatures: ["Assentos reservados", "Banheiros adaptados"],
  },
  {
    id: "teatro-renault",
    name: "Teatro Renault",
    address: {
      street: "Avenida Brigadeiro Luís Antônio",
      number: "411",
      district: "República",
      city: "São Paulo",
      state: "SP",
      country: "Brasil",
    },
    capacity: 1530,
    accessibilityFeatures: ["Elevadores", "Assentos reservados", "Banheiros adaptados"],
  },
  {
    id: "teatro-bradesco",
    name: "Teatro Bradesco",
    address: {
      street: "Rua Palestra Itália",
      number: "500",
      district: "Perdizes",
      city: "São Paulo",
      state: "SP",
      country: "Brasil",
    },
    capacity: 1439,
    accessibilityFeatures: ["Elevadores", "Assentos reservados", "Banheiros adaptados"],
  },
  {
    id: "teatro-procopio-ferreira",
    name: "Teatro Procópio Ferreira",
    address: {
      street: "Rua Augusta",
      number: "2823",
      district: "Cerqueira César",
      city: "São Paulo",
      state: "SP",
      country: "Brasil",
    },
    capacity: 624,
    accessibilityFeatures: ["Assentos reservados", "Banheiros adaptados"],
  },
];

export const organizers: Organizer[] = [
  {
    id: "ticketmaster-live",
    name: "Ticketmaster Live",
    supportEmail: "eventos@ticketmaster.mock",
  },
  {
    id: "rock-world",
    name: "Rock World",
    supportEmail: "atendimento@rockworld.mock",
  },
  {
    id: "live-nation-brasil",
    name: "Live Nation Brasil",
    supportEmail: "suporte@livenation.mock",
  },
  {
    id: "entretenimento-cultural",
    name: "Entretenimento Cultural Brasil",
    supportEmail: "contato@cultural.mock",
  },
];

const rockInRioSessions = ["04", "05", "06", "07", "11", "12", "13"].map((day) =>
  createSession(
    "rock-in-rio-2026",
    `set-${day}`,
    `2026-09-${day}T14:00:00-03:00`,
    `2026-09-${day}T12:00:00-03:00`,
  ),
);

export const events: Event[] = [
  {
    id: "rock-in-rio-2026",
    slug: "rock-in-rio-2026",
    title: "Rock in Rio 2026",
    subtitle: "O reencontro da música com a Cidade do Rock",
    summary: "Sete dias de música, experiências e grandes encontros no Rio de Janeiro.",
    description:
      "O Rock in Rio retorna à Cidade do Rock com atrações nacionais e internacionais, múltiplos palcos, ativações de marcas e opções gastronômicas durante todo o dia.",
    category: "festival",
    tags: ["festival", "rock", "pop", "música ao vivo"],
    status: "on_sale",
    venueId: "cidade-do-rock",
    organizerId: "rock-world",
    sessions: rockInRioSessions,
    ticketTypes: createTicketTypes("rock-in-rio-2026", 795, 2990, "Rock in Rio Club"),
    policy: createPolicy("16 anos", "Menores de 16 anos somente acompanhados dos responsáveis."),
    images: { card: hero1, hero: hero1, alt: "Público em um grande festival de música" },
    homepage: {
      placement: "hero",
      order: 1,
      dateLabel: "4, 5, 6, 7, 11, 12, 13 de Setembro de 2026",
      locationLabel: "Rio de Janeiro | Cidade do Rock",
    },
  },
  {
    id: "dia-das-maes",
    slug: "dia-das-maes-experiencia",
    title: "Dia das Mães",
    subtitle: "Uma experiência para viver em família",
    summary: "Programação especial com gastronomia, música e oficinas para toda a família.",
    description:
      "Uma temporada criada para celebrar vínculos afetivos com apresentações acústicas, oficinas criativas, experiências gastronômicas e espaços de fotografia.",
    category: "family",
    tags: ["família", "gastronomia", "oficinas"],
    status: "announced",
    venueId: "shopping-cidade-sao-paulo",
    organizerId: "ticketmaster-live",
    durationMinutes: 180,
    sessions: [
      createSession("dia-das-maes", "abertura", "2027-04-27T10:00:00-03:00"),
      createSession("dia-das-maes", "encerramento", "2027-05-10T10:00:00-03:00"),
    ],
    ticketTypes: createTicketTypes("dia-das-maes", 60, 180, "Pacote família"),
    policy: createPolicy("Livre", "Crianças devem permanecer acompanhadas por um responsável."),
    images: { card: hero2, hero: hero2, alt: "Celebração especial de Dia das Mães" },
    homepage: {
      placement: "hero",
      order: 2,
      dateLabel: "27 de Abril a 10 de Maio",
      locationLabel: "São Paulo | Shopping Cidade São Paulo",
    },
  },
  {
    id: "tiago-iorc-troco-likes",
    slug: "tiago-iorc-turne-troco-likes-10-anos",
    title: "Tiago Iorc — Turnê Troco Likes 10 Anos",
    subtitle: "Uma década de canções em uma noite especial",
    summary: "Tiago Iorc revisita o álbum Troco Likes e sucessos de sua carreira.",
    description:
      "O cantor e compositor apresenta novos arranjos para as faixas que marcaram Troco Likes, além de canções escolhidas de diferentes momentos de sua trajetória.",
    category: "music",
    tags: ["mpb", "pop", "show nacional"],
    status: "on_sale",
    venueId: "vibra-sao-paulo",
    organizerId: "live-nation-brasil",
    durationMinutes: 110,
    sessions: [
      createSession(
        "tiago-iorc-troco-likes",
        "sao-paulo",
        "2026-08-22T21:00:00-03:00",
        "2026-08-22T19:00:00-03:00",
      ),
    ],
    ticketTypes: createTicketTypes("tiago-iorc-troco-likes", 220, 680, "Soundcheck"),
    policy: createPolicy("14 anos", "Menores de 14 anos somente acompanhados dos responsáveis."),
    images: { card: hero3, hero: hero3, alt: "Tiago Iorc em apresentação ao vivo" },
    homepage: {
      placement: "hero",
      order: 3,
      dateLabel: "Turnê 2026",
      locationLabel: "São Paulo | Vibra São Paulo",
    },
  },
  {
    id: "aespa-synk",
    slug: "aespa-2026-27-live-tour-synk",
    title: "aespa: 2026-27 LIVE TOUR — SYNK",
    subtitle: "A nova turnê mundial chega ao Brasil",
    summary: "O aespa apresenta seu espetáculo de K-pop em São Paulo.",
    description:
      "Com produção audiovisual de grande escala, coreografias e repertório que percorre os principais lançamentos do grupo, SYNK marca o retorno do aespa aos palcos brasileiros.",
    category: "music",
    tags: ["k-pop", "show internacional", "girl group"],
    status: "on_sale",
    venueId: "allianz-parque",
    organizerId: "live-nation-brasil",
    durationMinutes: 130,
    sessions: [
      createSession(
        "aespa-synk",
        "sao-paulo",
        "2026-09-04T20:30:00-03:00",
        "2026-09-04T17:30:00-03:00",
      ),
    ],
    ticketTypes: createTicketTypes("aespa-synk", 390, 1600, "VIP SYNK"),
    policy: createPolicy("16 anos", "Menores de 16 anos somente acompanhados dos responsáveis."),
    images: { card: hero4, hero: hero4, alt: "Grupo aespa durante apresentação da turnê SYNK" },
    homepage: {
      placement: "hero",
      order: 4,
      dateLabel: "04 de Setembro de 2026",
      locationLabel: "São Paulo | Allianz Parque",
    },
  },
  {
    id: "toy-story-exposicao",
    slug: "toy-story-ao-infinito-e-alem-exposicao",
    title: "Toy Story Ao Infinito e Além: A Exposição",
    summary: "Cenários interativos e personagens inspirados no universo de Toy Story.",
    description:
      "Uma exposição imersiva para toda a família, com ambientes fotográficos, brincadeiras interativas e uma jornada pelos momentos mais conhecidos da franquia.",
    category: "experience",
    tags: ["exposição", "família", "imersivo"],
    status: "on_sale",
    venueId: "shopping-cidade-sao-paulo",
    organizerId: "entretenimento-cultural",
    durationMinutes: 75,
    sessions: [
      createSession("toy-story-exposicao", "jul-04", "2026-07-04T10:00:00-03:00"),
      createSession("toy-story-exposicao", "jul-05", "2026-07-05T10:00:00-03:00"),
      createSession("toy-story-exposicao", "jul-11", "2026-07-11T10:00:00-03:00"),
    ],
    ticketTypes: createTicketTypes("toy-story-exposicao", 80, 240, "Pacote família"),
    policy: createPolicy("Livre", "Crianças devem permanecer acompanhadas por um responsável."),
    images: { card: exp1, alt: "Exposição temática inspirada em Toy Story" },
    homepage: {
      placement: "experiences",
      order: 1,
      dateLabel: "Múltiplas datas",
      locationLabel: "São Paulo | Múltiplas datas",
    },
  },
  {
    id: "manti-wine-sessions",
    slug: "manti-wine-sessions",
    title: "Manti Wine Sessions",
    summary: "Vinhos, gastronomia e música em um fim de semana no Velocitta.",
    description:
      "O encontro combina degustações guiadas, menus de chefs convidados, apresentações musicais e experiências ao ar livre em um dos autódromos mais charmosos do país.",
    category: "experience",
    tags: ["vinho", "gastronomia", "música"],
    status: "announced",
    venueId: "autodromo-velocitta",
    organizerId: "ticketmaster-live",
    durationMinutes: 480,
    sessions: [
      createSession("manti-wine-sessions", "jun-05", "2027-06-05T12:00:00-03:00"),
      createSession("manti-wine-sessions", "jun-06", "2027-06-06T12:00:00-03:00"),
    ],
    ticketTypes: createTicketTypes("manti-wine-sessions", 280, 720, "Mesa experiência"),
    policy: createPolicy("18 anos", "Evento destinado exclusivamente a maiores de 18 anos."),
    images: { card: exp2, alt: "Experiência de vinho e gastronomia ao ar livre" },
    homepage: {
      placement: "experiences",
      order: 2,
      dateLabel: "5 e 6 de Junho",
      locationLabel: "Mogi Guaçu | 5 e 6 de Junho",
    },
  },
  {
    id: "coliseu-exposicao-imersiva",
    slug: "coliseu-exposicao-imersiva",
    title: "Coliseu: Exposição Imersiva",
    summary: "Uma viagem audiovisual pela história da Roma Antiga.",
    description:
      "Projeções em grande escala, peças cenográficas e recursos interativos apresentam a arquitetura, os personagens e os espetáculos que marcaram a história do Coliseu.",
    category: "experience",
    tags: ["exposição", "história", "imersivo"],
    status: "on_sale",
    venueId: "shopping-vila-olimpia",
    organizerId: "entretenimento-cultural",
    durationMinutes: 60,
    sessions: [
      createSession("coliseu-exposicao-imersiva", "jul-18", "2026-07-18T10:00:00-03:00"),
      createSession("coliseu-exposicao-imersiva", "jul-19", "2026-07-19T10:00:00-03:00"),
    ],
    ticketTypes: createTicketTypes("coliseu-exposicao-imersiva", 70, 190, "Visita guiada"),
    policy: createPolicy("Livre", "Crianças devem permanecer acompanhadas por um responsável."),
    images: { card: exp3, alt: "Ambiente imersivo inspirado no Coliseu romano" },
    homepage: {
      placement: "experiences",
      order: 3,
      dateLabel: "Múltiplas datas",
      locationLabel: "São Paulo | Múltiplas datas",
    },
  },
  {
    id: "nba-house-2026",
    slug: "nba-house-2026",
    title: "NBA House 2026",
    summary: "Basquete, entretenimento e cultura NBA em uma experiência interativa.",
    description:
      "A NBA House reúne transmissões, quadras para desafios, exposição de itens históricos, música e atrações especiais para fãs de todas as idades.",
    category: "sports",
    tags: ["nba", "basquete", "experiência"],
    status: "on_sale",
    venueId: "shopping-eldorado",
    organizerId: "ticketmaster-live",
    durationMinutes: 240,
    sessions: [
      createSession("nba-house-2026", "jun-20", "2026-06-20T13:00:00-03:00"),
      createSession("nba-house-2026", "jun-21", "2026-06-21T13:00:00-03:00"),
    ],
    ticketTypes: createTicketTypes("nba-house-2026", 120, 390, "Courtside Experience"),
    policy: createPolicy(
      "Livre",
      "Menores de 12 anos devem estar acompanhados por um responsável.",
    ),
    images: { card: exp4, alt: "Experiência interativa de basquete da NBA" },
    homepage: {
      placement: "experiences",
      order: 4,
      dateLabel: "Múltiplas datas",
      locationLabel: "São Paulo | Múltiplas datas",
    },
  },
  {
    id: "casa-warner",
    slug: "casa-warner-brasilia",
    title: "Casa Warner",
    summary: "Uma experiência imersiva pelos universos mais conhecidos da Warner.",
    description:
      "Cenários temáticos, figurinos, objetos de cena e atividades interativas aproximam o público de filmes, séries e personagens queridos da Warner.",
    category: "experience",
    tags: ["cinema", "séries", "exposição"],
    status: "on_sale",
    venueId: "parkshopping-brasilia",
    organizerId: "entretenimento-cultural",
    durationMinutes: 90,
    sessions: [
      createSession("casa-warner", "ago-01", "2026-08-01T10:00:00-03:00"),
      createSession("casa-warner", "ago-02", "2026-08-02T10:00:00-03:00"),
    ],
    ticketTypes: createTicketTypes("casa-warner", 95, 290, "Passe família"),
    policy: createPolicy("Livre", "Crianças devem permanecer acompanhadas por um responsável."),
    images: { card: exp5, alt: "Cenário temático da experiência Casa Warner" },
    homepage: {
      placement: "experiences",
      order: 5,
      dateLabel: "Múltiplas datas",
      locationLabel: "Brasília | Múltiplas datas",
    },
  },
  {
    id: "festival-de-verao",
    slug: "festival-de-verao-villa-lobos",
    title: "Festival de Verão",
    summary: "Música, gastronomia e atividades ao ar livre no Parque Villa-Lobos.",
    description:
      "Um festival diurno com apresentações musicais, feira gastronômica, oficinas de bem-estar e programação infantil em diferentes áreas do parque.",
    category: "festival",
    tags: ["verão", "música", "gastronomia", "família"],
    status: "announced",
    venueId: "parque-villa-lobos",
    organizerId: "ticketmaster-live",
    durationMinutes: 600,
    sessions: [
      createSession("festival-de-verao", "jan-16", "2027-01-16T10:00:00-03:00"),
      createSession("festival-de-verao", "jan-17", "2027-01-17T10:00:00-03:00"),
    ],
    ticketTypes: createTicketTypes("festival-de-verao", 130, 420, "Lounge verão"),
    policy: createPolicy(
      "Livre",
      "Menores de 12 anos devem estar acompanhados por um responsável.",
    ),
    images: { card: exp6, alt: "Festival de verão ao ar livre" },
    homepage: {
      placement: "experiences",
      order: 6,
      dateLabel: "Múltiplas datas",
      locationLabel: "São Paulo | Múltiplas datas",
    },
  },
  {
    id: "maiores-ilusionistas",
    slug: "os-maiores-ilusionistas-da-america-latina",
    title: "Os Maiores Ilusionistas da América Latina",
    summary: "Grandes números de ilusionismo reunidos em um espetáculo teatral.",
    description:
      "Artistas premiados apresentam números de escapismo, mentalismo e grandes ilusões em uma montagem criada para surpreender públicos de todas as idades.",
    category: "theater",
    tags: ["mágica", "ilusionismo", "família"],
    status: "on_sale",
    venueId: "teatro-villalobos",
    organizerId: "entretenimento-cultural",
    durationMinutes: 100,
    sessions: [
      createSession("maiores-ilusionistas", "jul-25", "2026-07-25T20:00:00-03:00"),
      createSession("maiores-ilusionistas", "jul-26", "2026-07-26T18:00:00-03:00"),
    ],
    ticketTypes: createTicketTypes("maiores-ilusionistas", 140, 380, "Meet & Greet"),
    policy: createPolicy(
      "10 anos",
      "Menores de 10 anos devem estar acompanhados por um responsável.",
    ),
    images: { card: exp3, alt: "Espetáculo teatral de ilusionismo" },
    homepage: {
      placement: "theater",
      order: 1,
      dateLabel: "25 e 26 de Julho de 2026",
      locationLabel: "Rio de Janeiro",
    },
  },
  {
    id: "rei-leao-musical",
    slug: "o-rei-leao-musical",
    title: "O Rei Leão — Musical",
    summary: "O clássico musical retorna aos palcos de São Paulo.",
    description:
      "Uma grande produção teatral combina música, dança, figurinos e cenários para contar a jornada de Simba em uma experiência para todas as gerações.",
    category: "theater",
    tags: ["musical", "família", "broadway"],
    status: "on_sale",
    venueId: "teatro-renault",
    organizerId: "entretenimento-cultural",
    durationMinutes: 150,
    sessions: [
      createSession("rei-leao-musical", "ago-08", "2026-08-08T20:00:00-03:00"),
      createSession("rei-leao-musical", "ago-09", "2026-08-09T17:00:00-03:00"),
    ],
    ticketTypes: createTicketTypes("rei-leao-musical", 280, 690, "Plateia premium"),
    policy: createPolicy(
      "10 anos",
      "Menores de 10 anos devem estar acompanhados por um responsável.",
    ),
    images: { card: exp1, alt: "Cena de um grande musical teatral" },
    homepage: {
      placement: "theater",
      order: 2,
      dateLabel: "Múltiplas datas",
      locationLabel: "São Paulo",
    },
  },
  {
    id: "magica-em-familia",
    slug: "magica-em-familia",
    title: "Mágica em Família",
    summary: "Um espetáculo de mágica interativo para crianças e adultos.",
    description:
      "A montagem mistura humor, participação da plateia e números visuais em uma apresentação leve criada para ser compartilhada por toda a família.",
    category: "family",
    tags: ["mágica", "infantil", "família"],
    status: "on_sale",
    venueId: "teatro-bradesco",
    organizerId: "entretenimento-cultural",
    durationMinutes: 80,
    sessions: [
      createSession("magica-em-familia", "jul-12", "2026-07-12T16:00:00-03:00"),
      createSession("magica-em-familia", "jul-19", "2026-07-19T16:00:00-03:00"),
    ],
    ticketTypes: createTicketTypes("magica-em-familia", 90, 260, "Família premium"),
    policy: createPolicy("Livre", "Crianças devem permanecer acompanhadas por um responsável."),
    images: { card: exp5, alt: "Espetáculo de mágica para toda a família" },
    homepage: {
      placement: "theater",
      order: 3,
      dateLabel: "Múltiplas datas",
      locationLabel: "São Paulo",
    },
  },
  {
    id: "stand-up-comedy-night",
    slug: "stand-up-comedy-night",
    title: "Stand Up Comedy Night",
    summary: "Uma noite com diferentes nomes da nova comédia brasileira.",
    description:
      "Comediantes convidados se alternam no palco em apresentações rápidas, textos inéditos e improvisos sobre situações do cotidiano.",
    category: "comedy",
    tags: ["stand-up", "comédia", "humor"],
    status: "on_sale",
    venueId: "teatro-procopio-ferreira",
    organizerId: "ticketmaster-live",
    durationMinutes: 90,
    sessions: [
      createSession("stand-up-comedy-night", "jun-27", "2026-06-27T21:00:00-03:00"),
      createSession("stand-up-comedy-night", "jul-04", "2026-07-04T21:00:00-03:00"),
    ],
    ticketTypes: createTicketTypes("stand-up-comedy-night", 85, 220, "Mesa premium"),
    policy: createPolicy("16 anos", "Menores de 16 anos somente acompanhados dos responsáveis."),
    images: { card: exp6, alt: "Apresentação de comédia em um teatro" },
    homepage: {
      placement: "theater",
      order: 4,
      dateLabel: "Múltiplas datas",
      locationLabel: "São Paulo",
    },
  },
];

export function getEventById(id: string): Event | undefined {
  return events.find((event) => event.id === id);
}

export function getEventBySlug(slug: string): Event | undefined {
  return events.find((event) => event.slug === slug);
}

export function getVenueById(id: string): Venue | undefined {
  return venues.find((venue) => venue.id === id);
}

export function getOrganizerById(id: string): Organizer | undefined {
  return organizers.find((organizer) => organizer.id === id);
}

export function getEventsByCategory(category: EventCategory): Event[] {
  return events.filter((event) => event.category === category);
}

export function getHomepageEvents(placement: HomepagePlacement): Event[] {
  return events
    .filter((event) => event.homepage?.placement === placement)
    .sort((a, b) => (a.homepage?.order ?? 0) - (b.homepage?.order ?? 0));
}
