import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function FarmaciaRegistroPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <ShoppingBag className="h-6 w-6 text-blue-800" />
              <span className="text-xl font-bold text-blue-800">Farma Flash</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:underline">
              Início
            </Link>
            <Link href="/#como-funciona" className="text-sm font-medium hover:underline">
              Como Funciona
            </Link>
            <Link href="/#medicamentos" className="text-sm font-medium hover:underline">
              Medicamentos
            </Link>
            <Link href="/#farmacias" className="text-sm font-medium hover:underline">
              Farmácias
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/auth/login/farmacia">
              <Button variant="outline" className="border-blue-800 text-blue-800 hover:bg-blue-50">
                Entrar
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-8 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-blue-800">Cadastro de Farmácia</CardTitle>
              <CardDescription>Crie sua conta para vender medicamentos próximos ao vencimento</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome da Farmácia</Label>
                <Input id="name" placeholder="Farmácia São João" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <Input id="cnpj" placeholder="XX.XXX.XXX/0001-XX" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="license">Licença Sanitária</Label>
                  <Input id="license" placeholder="Número da licença" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="farmacia@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" type="tel" placeholder="(11) 99999-9999" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <Input id="address" placeholder="Rua, número e complemento" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">Cidade</Label>
                  <Input id="city" placeholder="São Paulo" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">Estado</Label>
                  <Input id="state" placeholder="SP" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipcode">CEP</Label>
                  <Input id="zipcode" placeholder="00000-000" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input id="password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Concordo com os{" "}
                  <Link href="/termos" className="text-blue-800 hover:underline">
                    Termos de Uso
                  </Link>{" "}
                  e{" "}
                  <Link href="/privacidade" className="text-blue-800 hover:underline">
                    Política de Privacidade
                  </Link>
                </label>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button className="w-full bg-blue-800 hover:bg-blue-900" asChild>
                <Link href="/farmacia/dashboard">Criar Conta</Link>
              </Button>
              <div className="text-center text-sm">
                Já tem uma conta?{" "}
                <Link href="/auth/login/farmacia" className="text-blue-800 hover:underline font-medium">
                  Faça login
                </Link>
              </div>
              <div className="text-center text-sm">
                <Link href="/auth/cadastro/cliente" className="text-gray-500 hover:underline">
                  Sou um cliente
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>

      <footer className="border-t bg-blue-900 text-white">
        <div className="container px-4 md:px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <ShoppingBag className="h-6 w-6" />
                <span className="text-xl font-bold">Farma Flash</span>
              </div>
              <p className="text-blue-100">
                Conectando farmácias e consumidores para oferecer medicamentos com validade próxima a preços reduzidos.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Links Úteis</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/termos" className="text-blue-100 hover:text-white">
                    Termos de Uso
                  </Link>
                </li>
                <li>
                  <Link href="/privacidade" className="text-blue-100 hover:text-white">
                    Política de Privacidade
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-blue-100 hover:text-white">
                    Perguntas Frequentes
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Contato</h3>
              <p className="text-blue-100">contato@farmaflash.com.br</p>
              <p className="text-blue-100">+55 11 99999-9999</p>
            </div>
          </div>
          <div className="border-t border-blue-800 mt-8 pt-4 text-center text-blue-100">
            <p>© 2025 Farma Flash. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
