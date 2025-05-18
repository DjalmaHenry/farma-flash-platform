import Link from "next/link"
import Image from "next/image"
import { MapPin, Clock, ChevronLeft, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Simulação de dados do medicamento
const medication = {
  id: 1,
  name: "Paracetamol 500mg",
  image: "/placeholder.svg?height=400&width=400",
  originalPrice: 25.9,
  discountPrice: 18.9,
  expiryDate: "2025-08-15",
  distance: 1.2,
  pharmacy: {
    id: 1,
    name: "Farmácia Saúde",
    address: "Av. Paulista, 1000 - São Paulo, SP",
    phone: "11 99999-9999",
    rating: 4.8,
    reviews: 124,
    image: "/placeholder.svg?height=100&width=100",
  },
  category: "Analgésicos",
  description:
    "Paracetamol 500mg é um medicamento indicado para o alívio temporário de dores leves a moderadas, como dores de cabeça, musculares, de dente, nas costas, resfriados e febre.",
  dosage:
    "Adultos e crianças acima de 12 anos: 1 a 2 comprimidos a cada 4 a 6 horas. Não exceder 8 comprimidos em 24 horas.",
  contraindications:
    "Hipersensibilidade ao paracetamol ou a qualquer componente da fórmula. Pacientes com doença hepática grave ou insuficiência hepática ativa.",
  sideEffects: "Raros: reações alérgicas, erupções cutâneas, alterações sanguíneas, alterações hepáticas e renais.",
  quantity: 20,
  unit: "comprimidos",
  manufacturer: "Laboratório Saúde",
  batchNumber: "L123456",
  registrationNumber: "1.2345.6789",
}

// Simulação de medicamentos relacionados
const relatedMedications = [
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
]

export default function MedicationDetailPage({ params }: { params: { id: string } }) {
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
              <ShoppingBag className="h-6 w-6 text-blue-800" />
              <span className="text-xl font-bold text-blue-800">Farma Flash</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:underline">
              Início
            </Link>
            <Link href="/buscar" className="text-sm font-medium hover:underline">
              Buscar
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
          <div className="mb-6">
            <Link href="/buscar" className="flex items-center text-blue-800 hover:underline">
              <ChevronLeft className="h-4 w-4 mr-1" /> Voltar para busca
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-xl overflow-hidden border p-6">
              <div className="relative h-[300px] md:h-[400px] bg-gray-50 rounded-lg mb-4">
                <Image
                  src={medication.image || "/placeholder.svg"}
                  alt={medication.name}
                  fill
                  className="object-contain p-4"
                />
                <Badge className="absolute top-4 right-4 bg-lime-500 text-white">
                  {Math.round((1 - medication.discountPrice / medication.originalPrice) * 100)}% OFF
                </Badge>
              </div>
              <div className="flex items-center gap-4 justify-center">
                <div className="h-20 w-20 relative border rounded-md cursor-pointer hover:border-blue-800">
                  <Image
                    src={medication.image || "/placeholder.svg"}
                    alt={medication.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <div className="h-20 w-20 relative border rounded-md cursor-pointer hover:border-blue-800">
                  <Image
                    src={medication.image || "/placeholder.svg"}
                    alt={medication.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <div className="h-20 w-20 relative border rounded-md cursor-pointer hover:border-blue-800">
                  <Image
                    src={medication.image || "/placeholder.svg"}
                    alt={medication.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>
              </div>
            </div>

            <div>
              <Badge variant="outline" className="mb-2 text-xs bg-blue-50 text-blue-800 border-blue-200">
                {medication.category}
              </Badge>
              <h1 className="text-2xl md:text-3xl font-bold text-blue-800 mb-2">{medication.name}</h1>
              <div className="flex items-center gap-2 text-gray-500 mb-2">
                <Clock className="h-4 w-4" />
                <span>Válido até {formatDate(medication.expiryDate)}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 mb-4">
                <MapPin className="h-4 w-4" />
                <span>
                  {medication.distance} km - {medication.pharmacy.name}
                </span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-gray-500 line-through text-lg">R$ {medication.originalPrice.toFixed(2)}</span>
                <span className="text-blue-800 font-bold text-3xl">R$ {medication.discountPrice.toFixed(2)}</span>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <ShoppingBag className="h-5 w-5 text-blue-800" />
                  <span className="font-medium">
                    Quantidade disponível: {medication.quantity} {medication.unit}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Este medicamento está com desconto por ter validade próxima, mas está em perfeitas condições de uso
                  até a data indicada.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Button className="bg-blue-800 hover:bg-blue-900 h-12">Agendar entrega</Button>
                <Link href={`https://wa.me/${medication.pharmacy.phone.replace(/\D/g, "")}`} target="_blank">
                  <Button variant="outline" className="w-full border-blue-800 text-blue-800 hover:bg-blue-50 h-12">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2"
                    >
                      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                      <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                      <path d="M9.5 13.5c.5 1 1.5 1 2 1s1.5 0 2-1" />
                    </svg>
                    Contatar via WhatsApp
                  </Button>
                </Link>
              </div>

              <Card className="mb-6">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 rounded-full overflow-hidden">
                      <Image
                        src={medication.pharmacy.image || "/placeholder.svg"}
                        alt={medication.pharmacy.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">{medication.pharmacy.name}</h3>
                      <p className="text-sm text-gray-600">{medication.pharmacy.address}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="#FFD700"
                          stroke="#FFD700"
                          strokeWidth="1"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                        <span className="text-sm font-medium">{medication.pharmacy.rating}</span>
                        <span className="text-sm text-gray-500">({medication.pharmacy.reviews} avaliações)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Tabs defaultValue="description" className="mb-12">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="description">Descrição</TabsTrigger>
              <TabsTrigger value="dosage">Posologia</TabsTrigger>
              <TabsTrigger value="contraindications">Contraindicações</TabsTrigger>
              <TabsTrigger value="details">Detalhes</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="p-6 bg-white rounded-lg border">
              <h3 className="text-lg font-semibold mb-4">Descrição do Medicamento</h3>
              <p>{medication.description}</p>
            </TabsContent>
            <TabsContent value="dosage" className="p-6 bg-white rounded-lg border">
              <h3 className="text-lg font-semibold mb-4">Posologia</h3>
              <p>{medication.dosage}</p>
            </TabsContent>
            <TabsContent value="contraindications" className="p-6 bg-white rounded-lg border">
              <h3 className="text-lg font-semibold mb-4">Contraindicações</h3>
              <p>{medication.contraindications}</p>
              <h3 className="text-lg font-semibold mt-6 mb-4">Efeitos Colaterais</h3>
              <p>{medication.sideEffects}</p>
            </TabsContent>
            <TabsContent value="details" className="p-6 bg-white rounded-lg border">
              <h3 className="text-lg font-semibold mb-4">Informações Técnicas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Fabricante</p>
                  <p className="font-medium">{medication.manufacturer}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Número de Lote</p>
                  <p className="font-medium">{medication.batchNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Registro ANVISA</p>
                  <p className="font-medium">{medication.registrationNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Quantidade</p>
                  <p className="font-medium">
                    {medication.quantity} {medication.unit}
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mb-12">
            <h2 className="text-xl font-bold text-blue-800 mb-6">Medicamentos Relacionados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedMedications.map((med) => (
                <Card key={med.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative h-48 bg-gray-100">
                      <Image src={med.image || "/placeholder.svg"} alt={med.name} fill className="object-contain p-4" />
                      <Badge className="absolute top-2 right-2 bg-lime-500">
                        {Math.round((1 - med.discountPrice / med.originalPrice) * 100)}% OFF
                      </Badge>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-1 mb-1">
                        <Badge variant="outline" className="text-xs bg-blue-50 text-blue-800 border-blue-200">
                          {med.category}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{med.name}</h3>
                      <div className="flex items-center gap-2 text-gray-500 mb-2">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">Válido até {formatDate(med.expiryDate)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 mb-4">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">
                          {med.distance} km - {med.pharmacy}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-gray-500 line-through">R$ {med.originalPrice.toFixed(2)}</span>
                        <span className="text-blue-800 font-bold text-xl">R$ {med.discountPrice.toFixed(2)}</span>
                      </div>
                      <Link href={`/medicamento/${med.id}`}>
                        <Button className="w-full bg-blue-800 hover:bg-blue-900">Ver detalhes</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
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
                  className="mr-2"
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
