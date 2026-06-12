# Ticketmaster Vision

O **Ticketmaster Vision** é uma réplica acadêmica e não oficial da plataforma
Ticketmaster. O projeto foi desenvolvido para analisar infrações à Lei Geral de
Proteção de Dados Pessoais (LGPD) identificadas no site original e demonstrar
soluções que tornem a experiência mais transparente, acessível e alinhada aos
direitos dos titulares de dados.

Além da navegação e compra simulada de ingressos, a aplicação apresenta um
Portal de Privacidade no qual o usuário pode conhecer e exercer seus direitos,
acompanhar solicitações e gerenciar informações pessoais.

## Principais recursos

- Catálogo, detalhes de eventos e fluxo simulado de compra de ingressos;
- Login e pedidos simulados, armazenados localmente no navegador;
- Portal de Privacidade com explicações sobre os direitos previstos na LGPD;
- Formulário para envio e acompanhamento de solicitações do titular;
- Área de perfil e central de suporte.

> Este projeto não possui vínculo com a Ticketmaster e não realiza compras,
> autenticações ou solicitações reais. Ele foi criado exclusivamente para fins
> acadêmicos e demonstrativos.

## Tecnologias

- React e TypeScript;
- TanStack Start e TanStack Router;
- Vite;
- Tailwind CSS;
- Bun.

## Como rodar

Tenha o [Bun](https://bun.sh/) instalado e execute:

```bash
bun install
bun run dev
```

Depois, acesse o endereço local exibido no terminal.

Para gerar e visualizar uma versão de produção:

```bash
bun run build
bun run preview
```
