import { createFileRoute, Link } from "@tanstack/react-router";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ProfileSidebar } from "@/components/ProfileSidebar";
import { Header } from "@/components/Header";
import { useMockAuth } from "@/lib/mock-auth";

export const Route = createFileRoute("/profile")({
  component: ProfileRoute,
});

function ProfileRoute() {
  const { isLoggedIn, user } = useMockAuth();

  return (
    <div className="min-h-screen bg-[#F6F7F9] font-sans text-foreground">
      <Header />

      {/* Sub Header */}
      <div className="bg-tm-blue px-8 pb-12 pt-6 text-white">
        <div className="mx-auto max-w-[1400px]">
          <h1 className="mb-2 text-3xl font-bold">Meu perfil</h1>
          <p className="text-sm text-white/90">
            Modifique seus dados pessoais e de contato.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto flex max-w-[1400px] flex-col gap-8 px-8 py-8 md:flex-row -mt-8">
        
        {/* Sidebar */}
        <ProfileSidebar />

        {/* Content Area */}
        <section className="flex-1 rounded-xl bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold">Informações Pessoais</h2>
          {!isLoggedIn ? (
            <div className="rounded-lg border border-blue-100 bg-blue-50 p-6 text-sm font-medium text-blue-900">
              Você só pode armazenar suas informações pessoais se estiver logado.
            </div>
          ) : (
          <form className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome</Label>
                <Input id="nome" defaultValue={user?.firstName} />
                <p className="text-xs text-muted-foreground">Nome como aparece em seu documento.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sobrenome">Sobrenome</Label>
                <Input id="sobrenome" defaultValue={user?.lastName} />
                <p className="text-xs text-muted-foreground">Sobrenome como aparece em seu documento.</p>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="email">E-Mail</Label>
                <Input id="email" type="email" defaultValue={user?.email} />
                <p className="text-xs text-muted-foreground">e-mail para notificações e recuperação de senha.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pais">País de Residência</Label>
                <Select defaultValue={user?.country}>
                  <SelectTrigger id="pais">
                    <SelectValue placeholder="Selecione um país" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Brasil">Brasil</SelectItem>
                    <SelectItem value="Estados Unidos">Estados Unidos</SelectItem>
                    <SelectItem value="Argentina">Argentina</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">O país onde você mora</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tipo-doc">Tipo de documento</Label>
                <Select defaultValue={user?.documentType}>
                  <SelectTrigger id="tipo-doc">
                    <SelectValue placeholder="Selecione um tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CPF">CPF</SelectItem>
                    <SelectItem value="RG">RG</SelectItem>
                    <SelectItem value="Passaporte">Passaporte</SelectItem>
                    <SelectItem value="CNH">CNH</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">O tipo do seu documento de identificação</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cpf">CPF</Label>
                <Input id="cpf" defaultValue={user?.documentNumber} />
                <p className="text-xs text-muted-foreground">O número do seu documento sem pontos ou virgulas.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="codigo-pais">Código do País</Label>
                <Select defaultValue={user?.phoneCountryCode}>
                  <SelectTrigger id="codigo-pais">
                    <SelectValue placeholder="Código" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="+55">+55 (Brasil)</SelectItem>
                    <SelectItem value="+1">+1 (EUA)</SelectItem>
                    <SelectItem value="+54">+54 (Argentina)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Código do País</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input id="telefone" defaultValue={user?.phone} />
                <p className="text-xs text-muted-foreground">Telefone para notificações e contato.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dt-nascimento">Data de nascimento</Label>
                <Input id="dt-nascimento" type="date" defaultValue="" />
                <p className="text-xs text-muted-foreground">Sua data de nascimento no formato DD/MM/AAAA.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="genero">Gênero</Label>
                <Select defaultValue={user?.gender}>
                  <SelectTrigger id="genero">
                    <SelectValue placeholder="Selecione seu gênero" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Masculino">Masculino</SelectItem>
                    <SelectItem value="Feminino">Feminino</SelectItem>
                    <SelectItem value="Não-binário">Não-binário</SelectItem>
                    <SelectItem value="Prefiro não informar">Prefiro não informar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-start gap-4 pb-4 pt-6">
              <Checkbox id="marketing" className="mt-1" />
              <Label htmlFor="marketing" className="text-sm font-normal leading-relaxed text-muted-foreground w-11/12 text-justify">
                Deixe-nos mantê-lo informado sobre o que está por vir — incluindo pré-vendas e ofertas exclusivas — por meios eletrônicos (por exemplo, e-mail, ferramentas de mensageria, redes sociais, etc.). Você sempre pode alterar a forma como entramos em contato com você por meio de sua conta Ticketmaster.
              </Label>
            </div>

            <div className="flex items-center justify-end gap-4 border-t pt-6 mt-4">
              <Button variant="ghost" type="button" className="font-semibold text-muted-foreground hover:bg-muted">
                Cancelar
              </Button>
              <Button type="button" className="bg-tm-blue font-semibold text-white hover:bg-tm-blue-dark">
                Salvar mudanças
              </Button>
            </div>
          </form>
          )}
        </section>
      </main>
    </div>
  );
}
