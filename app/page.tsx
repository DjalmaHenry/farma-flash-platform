import Link from "next/link"
import { Search, ShoppingBag, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FeaturedMedications } from "@/components/featured-medications"
import { PharmacyMap } from "@/components/pharmacy-map"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-blue-800" />
            <span className="text-xl font-bold text-blue-800">Farma Flash</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:underline">
              Início
            </Link>
            <Link href="#como-funciona" className="text-sm font-medium hover:underline">
              Como Funciona
            </Link>
            <Link href="#medicamentos" className="text-sm font-medium hover:underline">
              Medicamentos
            </Link>
            <Link href="#farmacias" className="text-sm font-medium hover:underline">
              Farmácias
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex gap-2">
              <Link href="/auth/login/cliente">
                <Button variant="outline" className="border-lime-600 text-lime-600 hover:bg-lime-50">
                  Sou Cliente
                </Button>
              </Link>
              <Link href="/auth/login/farmacia">
                <Button variant="outline" className="border-blue-800 text-blue-800 hover:bg-blue-50">
                  Sou Farmácia
                </Button>
              </Link>
            </div>
            <Link href="/auth/cadastro">
              <Button className="bg-blue-800 hover:bg-blue-900">Cadastrar</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-blue-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-blue-800">
                  Farma Flash
                </h1>
                <p className="mx-auto max-w-[700px] text-lg md:text-xl text-lime-600 font-semibold">
                  Descontos que salvam estoques e bolsos
                </p>
              </div>
              <p className="mx-auto max-w-[700px] text-gray-600 md:text-lg">
                Conectamos farmácias e consumidores para oferecer medicamentos com validade próxima a preços reduzidos.
                Economize dinheiro e ajude a reduzir o desperdício.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link href="/buscar">
                  <Button className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-6">
                    <Search className="mr-2 h-4 w-4" /> Procurar medicamentos próximos
                  </Button>
                </Link>
                <Link href="/auth/cadastro/farmacia">
                  <Button variant="outline" className="border-blue-800 text-blue-800 hover:bg-blue-50 px-8 py-6">
                    <ShoppingBag className="mr-2 h-4 w-4" /> Sou farmácia, quero vender
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="como-funciona" className="py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold text-center mb-12 text-blue-800">Como Funciona</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-blue-50 p-8 rounded-xl">
                <h3 className="text-xl font-bold mb-4 text-blue-800">Para Consumidores</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-lime-500 text-white p-2 rounded-full mr-4">1</div>
                    <div>
                      <p className="font-medium">Busque medicamentos com desconto</p>
                      <p className="text-gray-600">Encontre medicamentos próximos a você com preços reduzidos</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-lime-500 text-white p-2 rounded-full mr-4">2</div>
                    <div>
                      <p className="font-medium">Agende a entrega ou retirada</p>
                      <p className="text-gray-600">Escolha a melhor opção para receber seu medicamento</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-lime-500 text-white p-2 rounded-full mr-4">3</div>
                    <div>
                      <p className="font-medium">Economize e ajude o meio ambiente</p>
                      <p className="text-gray-600">Compre com desconto e evite o desperdício de medicamentos</p>
                    </div>
                  </li>
                </ul>
                <Link href="/auth/cadastro/cliente">
                  <Button className="mt-6 bg-lime-600 hover:bg-lime-700">
                    Criar conta de cliente <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="bg-blue-50 p-8 rounded-xl">
                <h3 className="text-xl font-bold mb-4 text-blue-800">Para Farmácias</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-lime-500 text-white p-2 rounded-full mr-4">1</div>
                    <div>
                      <p className="font-medium">Cadastre sua farmácia</p>
                      <p className="text-gray-600">Insira seus dados e comece a vender medicamentos com desconto</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-lime-500 text-white p-2 rounded-full mr-4">2</div>
                    <div>
                      <p className="font-medium">Ofereça medicamentos com validade próxima</p>
                      <p className="text-gray-600">Ajudando a reduzir o desperdício e aumentando suas vendas</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-lime-500 text-white p-2 rounded-full mr-4">3</div>
                    <div>
                      <p className="font-medium">Gerencie suas entregas</p>
                      <p className="text-gray-600">Facilite a comunicação com os clientes e otimize suas operações</p>
                    </div>
                  </li>
                </ul>
                <Link href="/auth/cadastro/farmacia">
                  <Button className="mt-6 bg-blue-800 hover:bg-blue-900">
                    Criar conta de farmácia <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="medicamentos" className="py-12 md:py-24 bg-blue-50">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold text-center mb-12 text-blue-800">Medicamentos</h2>
            <FeaturedMedications />
          </div>
        </section>

        <section id="farmacias" className="py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold text-center mb-12 text-blue-800">Farmácias</h2>
            <PharmacyMap />
          </div>
        </section>
      </main>
    </div>
  )
}
