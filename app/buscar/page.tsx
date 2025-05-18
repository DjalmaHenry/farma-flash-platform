import Link from "next/link"
import Image from "next/image"
import { Search, Filter, MapPin, Clock, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const medications = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    image: "/placeholder.svg?height=200&width=200",
    originalPrice: 25.9,
    discountPrice: 18.9,
    expiryDate: "2025-08-15",
    distance: 1.2,
    pharmacy: "Farmácia Saúde",
    category: "Analgésicos",
  },
  {
    id: 2,
    name: "Dipirona 1g",
    image: "/placeholder.svg?height=200&width=200",
    originalPrice: 18.5,
    discountPrice: 12.9,
    expiryDate: "2025-07-20",
    distance: 0.8,
    pharmacy: "Drogaria Bem Estar",
    category: "Analgésicos",
  },
  {
    id: 3,
    name: "Omeprazol 20mg",
    image: "/placeholder.svg?height=200&width=200",
    originalPrice: 32.9,
    discountPrice: 24.5,
    expiryDate: "2025-09-10",
    distance: 2.5,
    pharmacy: "Farmácia Popular",
    category: "Gastrintestinais",
  },
  {
    id: 4,
    name: "Loratadina 10mg",
    image: "/placeholder.svg?height=200&width=200",
    originalPrice: 22.9,
    discountPrice: 15.9,
    expiryDate: "2025-08-05",
    distance: 1.5,
    pharmacy: "Drogaria Vida",
    category: "Antialérgicos",
  },
  {
    id: 5,
    name: "Ibuprofeno 600mg",
    image: "/placeholder.svg?height=200&width=200",
    originalPrice: 28.5,
    discountPrice: 19.9,
    expiryDate: "2025-07-25",
    distance: 3.0,
    pharmacy: "Farmácia Central",
    category: "Anti-inflamatórios",
  },
  {
    id: 6,
    name: "Amoxicilina 500mg",
    image: "/placeholder.svg?height=200&width=200",
    originalPrice: 45.9,
    discountPrice: 32.9,
    expiryDate: "2025-08-30",
    distance: 1.8,
    pharmacy: "Drogaria Saúde Total",
    category: "Antibióticos",
  },
  {
    id: 7,
    name: "Atenolol 50mg",
    image: "/placeholder.svg?height=200&width=200",
    originalPrice: 35.9,
    discountPrice: 28.5,
    expiryDate: "2025-09-05",
    distance: 2.2,
    pharmacy: "Farmácia Popular",
    category: "Cardiovasculares",
  },
  {
    id: 8,
    name: "Losartana 50mg",
    image: "/placeholder.svg?height=200&width=200",
    originalPrice: 32.5,
    discountPrice: 24.9,
    expiryDate: "2025-08-20",
    distance: 1.7,
    pharmacy: "Drogaria Bem Estar",
    category: "Cardiovasculares",
  },
]

export default function SearchPage() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-800"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                <path d="M3 6h18"></path>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
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
            <Link href="/auth/login">
              <Button variant="outline" className="hidden md:flex">
                Entrar
              </Button>
            </Link>
            <Link href="/auth/cadastro">
              <Button className="bg-blue-800 hover:bg-blue-900">Cadastrar</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-blue-800 mb-4">Buscar Medicamentos</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input placeholder="Buscar por nome do medicamento" className="pl-10" />
                </div>
              </div>
              <div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as categorias</SelectItem>
                    <SelectItem value="analgesicos">Analgésicos</SelectItem>
                    <SelectItem value="antibioticos">Antibióticos</SelectItem>
                    <SelectItem value="antialergicos">Antialérgicos</SelectItem>
                    <SelectItem value="anti-inflamatorios">Anti-inflamatórios</SelectItem>
                    <SelectItem value="cardiovasculares">Cardiovasculares</SelectItem>
                    <SelectItem value="gastrintestinais">Gastrintestinais</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Button className="w-full bg-blue-800 hover:bg-blue-900">
                  <Filter className="mr-2 h-4 w-4" /> Filtrar
                </Button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full text-sm">
                <span>Distância:</span>
                <span className="font-medium">Até 5km</span>
                <ChevronDown className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full text-sm">
                <span>Validade:</span>
                <span className="font-medium">Próximos 3 meses</span>
                <ChevronDown className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full text-sm">
                <span>Ordenar por:</span>
                <span className="font-medium">Maior desconto</span>
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {medications.map((medication) => (
              <Card key={medication.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-48 bg-gray-100">
                    <Image
                      src={medication.image || "/placeholder.svg"}
                      alt={medication.name}
                      fill
                      className="object-contain p-4"
                    />
                    <Badge className="absolute top-2 right-2 bg-lime-500">
                      {Math.round((1 - medication.discountPrice / medication.originalPrice) * 100)}% OFF
                    </Badge>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-1 mb-1">
                      <Badge variant="outline" className="text-xs bg-blue-50 text-blue-800 border-blue-200">
                        {medication.category}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{medication.name}</h3>
                    <div className="flex items-center gap-2 text-gray-500 mb-2">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">Válido até {formatDate(medication.expiryDate)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 mb-4">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">
                        {medication.distance} km - {medication.pharmacy}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-gray-500 line-through">R$ {medication.originalPrice.toFixed(2)}</span>
                      <span className="text-blue-800 font-bold text-xl">R$ {medication.discountPrice.toFixed(2)}</span>
                    </div>
                    <Link href={`/medicamento/${medication.id}`}>
                      <Button className="w-full bg-blue-800 hover:bg-blue-900">Ver detalhes</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <footer className="border-t bg-blue-900 text-white">
        <div className="container px-4 md:px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                  <path d="M3 6h18"></path>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
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
              <p className="flex items-center gap-2 text-blue-100">
                <MapPin className="h-4 w-4" /> São Paulo, SP
              </p>
              <Link
                href="https://wa.me/5511999999999"
                className="flex items-center gap-2 text-blue-100 hover:text-white mt-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                  <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                  <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                  <path d="M9.5 13.5c.5 1 1.5 1 2 1s1.5 0 2-1" />
                </svg>
                Fale conosco via WhatsApp
              </Link>
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
