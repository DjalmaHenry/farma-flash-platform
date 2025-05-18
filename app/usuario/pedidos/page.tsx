"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Search, ShoppingBag, ChevronDown, ChevronUp, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// Dados de exemplo para pedidos
const pedidosExemplo = [
  {
    id: "PED-001",
    data: "15/05/2024",
    farmacia: {
      nome: "Farmácia São João",
      endereco: "Av. Paulista, 1000 - São Paulo, SP",
      telefone: "11 99999-9999",
      logo: "/placeholder.svg?height=80&width=80",
    },
    status: "Entregue",
    total: 89.9,
    itens: [
      {
        id: 1,
        nome: "Paracetamol 500mg",
        imagem: "/placeholder.svg?height=80&width=80",
        quantidade: 2,
        preco: 15.9,
      },
      {
        id: 2,
        nome: "Dipirona 1g",
        imagem: "/placeholder.svg?height=80&width=80",
        quantidade: 1,
        preco: 12.5,
      },
      {
        id: 3,
        nome: "Omeprazol 20mg",
        imagem: "/placeholder.svg?height=80&width=80",
        quantidade: 1,
        preco: 25.6,
      },
    ],
    entrega: {
      tipo: "Entrega",
      endereco: "Rua das Flores, 123 - Apto 45 - São Paulo, SP",
      data: "16/05/2024",
      horario: "14:00 - 16:00",
    },
    pagamento: {
      metodo: "Cartão de Crédito",
      status: "Aprovado",
    },
  },
  {
    id: "PED-002",
    data: "10/05/2024",
    farmacia: {
      nome: "Drogaria Mais Saúde",
      endereco: "Rua Augusta, 500 - São Paulo, SP",
      telefone: "11 98888-8888",
      logo: "/placeholder.svg?height=80&width=80",
    },
    status: "Em trânsito",
    total: 45.8,
    itens: [
      {
        id: 4,
        nome: "Loratadina 10mg",
        imagem: "/placeholder.svg?height=80&width=80",
        quantidade: 1,
        preco: 18.9,
      },
      {
        id: 5,
        nome: "Vitamina C",
        imagem: "/placeholder.svg?height=80&width=80",
        quantidade: 1,
        preco: 26.9,
      },
    ],
    entrega: {
      tipo: "Entrega",
      endereco: "Rua das Flores, 123 - Apto 45 - São Paulo, SP",
      data: "11/05/2024",
      horario: "10:00 - 12:00",
    },
    pagamento: {
      metodo: "Pix",
      status: "Aprovado",
    },
  },
  {
    id: "PED-003",
    data: "02/05/2024",
    farmacia: {
      nome: "Farmácia Popular",
      endereco: "Av. Rebouças, 1200 - São Paulo, SP",
      telefone: "11 97777-7777",
      logo: "/placeholder.svg?height=80&width=80",
    },
    status: "Entregue",
    total: 120.5,
    itens: [
      {
        id: 6,
        nome: "Amoxicilina 500mg",
        imagem: "/placeholder.svg?height=80&width=80",
        quantidade: 1,
        preco: 45.9,
      },
      {
        id: 7,
        nome: "Ibuprofeno 600mg",
        imagem: "/placeholder.svg?height=80&width=80",
        quantidade: 2,
        preco: 22.8,
      },
      {
        id: 8,
        nome: "Nimesulida 100mg",
        imagem: "/placeholder.svg?height=80&width=80",
        quantidade: 1,
        preco: 29.0,
      },
    ],
    entrega: {
      tipo: "Retirada",
      endereco: "Av. Rebouças, 1200 - São Paulo, SP",
      data: "02/05/2024",
      horario: "16:30",
    },
    pagamento: {
      metodo: "Cartão de Débito",
      status: "Aprovado",
    },
  },
]

export default function PedidosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  const filteredPedidos = pedidosExemplo.filter(
    (pedido) =>
      pedido.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pedido.farmacia.nome.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const toggleOrderDetails = (orderId: string) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null)
    } else {
      setExpandedOrder(orderId)
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Pendente":
        return "outline"
      case "Em preparação":
        return "secondary"
      case "Em trânsito":
        return "default"
      case "Entregue":
        return "success"
      default:
        return "outline"
    }
  }

  const openWhatsApp = (phone: string) => {
    const phoneNumber = phone.replace(/\D/g, "")
    window.open(`https://wa.me/55${phoneNumber}`, "_blank")
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/usuario/dashboard">
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Meus Pedidos</h1>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar por número do pedido ou farmácia..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Tabs defaultValue="todos">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="em-andamento">Em Andamento</TabsTrigger>
          <TabsTrigger value="entregues">Entregues</TabsTrigger>
        </TabsList>
        <TabsContent value="todos" className="space-y-4 mt-4">
          {filteredPedidos.length > 0 ? (
            filteredPedidos.map((pedido) => (
              <Card key={pedido.id} className="overflow-hidden">
                <CardHeader className="p-4 pb-0">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 rounded-full overflow-hidden border">
                        <Image
                          src={pedido.farmacia.logo || "/placeholder.svg"}
                          alt={pedido.farmacia.nome}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{pedido.id}</CardTitle>
                        <CardDescription>
                          {pedido.data} • {pedido.farmacia.nome}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge
                      variant={
                        pedido.status === "Entregue"
                          ? "outline"
                          : pedido.status === "Em trânsito"
                            ? "default"
                            : "secondary"
                      }
                      className={
                        pedido.status === "Entregue"
                          ? "bg-green-100 text-green-800 border-green-200"
                          : pedido.status === "Em trânsito"
                            ? "bg-blue-100 text-blue-800 border-blue-200"
                            : "bg-yellow-100 text-yellow-800 border-yellow-200"
                      }
                    >
                      {pedido.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="h-5 w-5 text-muted-foreground" />
                      <span>{pedido.itens.length} itens</span>
                    </div>
                    <div className="font-medium">R$ {pedido.total.toFixed(2)}</div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <Button
                    variant="ghost"
                    onClick={() => toggleOrderDetails(pedido.id)}
                    className="flex items-center gap-1"
                  >
                    {expandedOrder === pedido.id ? (
                      <>
                        <ChevronUp className="h-4 w-4" /> Ocultar detalhes
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4" /> Ver detalhes
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => openWhatsApp(pedido.farmacia.telefone)}
                  >
                    <MessageCircle className="h-4 w-4" /> Contatar
                  </Button>
                </CardFooter>
                {expandedOrder === pedido.id && (
                  <div className="px-4 pb-4 border-t">
                    <div className="py-4">
                      <h4 className="font-medium mb-3">Itens do pedido</h4>
                      <div className="space-y-3">
                        {pedido.itens.map((item) => (
                          <div key={item.id} className="flex items-center gap-3">
                            <div className="relative h-16 w-16 rounded-md overflow-hidden bg-gray-100">
                              <Image
                                src={item.imagem || "/placeholder.svg"}
                                alt={item.nome}
                                fill
                                className="object-contain"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{item.nome}</p>
                              <p className="text-sm text-gray-500">Quantidade: {item.quantidade}</p>
                            </div>
                            <div className="font-medium">R$ {item.preco.toFixed(2)}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="py-4 border-t">
                      <h4 className="font-medium mb-3">Informações de entrega</h4>
                      <p className="text-sm">
                        <span className="font-medium">Tipo:</span> {pedido.entrega.tipo}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Endereço:</span> {pedido.entrega.endereco}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Data:</span> {pedido.entrega.data}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Horário:</span> {pedido.entrega.horario}
                      </p>
                    </div>
                    <div className="py-4 border-t">
                      <h4 className="font-medium mb-3">Informações de pagamento</h4>
                      <p className="text-sm">
                        <span className="font-medium">Método:</span> {pedido.pagamento.metodo}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Status:</span> {pedido.pagamento.status}
                      </p>
                      <div className="flex justify-between items-center mt-3">
                        <span className="font-medium">Total</span>
                        <span className="font-bold text-lg">R$ {pedido.total.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="pt-4 border-t flex justify-between">
                      {/* Additional buttons or actions can be added here */}
                    </div>
                  </div>
                )}
              </Card>
            ))
          ) : (
            <p className="text-center text-sm text-muted-foreground">Nenhum pedido encontrado.</p>
          )}
        </TabsContent>
        <TabsContent value="em-andamento" className="space-y-4 mt-4">
          {filteredPedidos
            .filter((pedido) => pedido.status !== "Entregue")
            .map((pedido) => (
              <Card key={pedido.id} className="overflow-hidden">
                <CardHeader className="p-4 pb-0">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 rounded-full overflow-hidden border">
                        <Image
                          src={pedido.farmacia.logo || "/placeholder.svg"}
                          alt={pedido.farmacia.nome}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{pedido.id}</CardTitle>
                        <CardDescription>
                          {pedido.data} • {pedido.farmacia.nome}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant="default" className="bg-blue-100 text-blue-800 border-blue-200">
                      {pedido.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="h-5 w-5 text-muted-foreground" />
                      <span>{pedido.itens.length} itens</span>
                    </div>
                    <div className="font-medium">R$ {pedido.total.toFixed(2)}</div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <Button
                    variant="ghost"
                    onClick={() => toggleOrderDetails(pedido.id)}
                    className="flex items-center gap-1"
                  >
                    {expandedOrder === pedido.id ? (
                      <>
                        <ChevronUp className="h-4 w-4" /> Ocultar detalhes
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4" /> Ver detalhes
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => openWhatsApp(pedido.farmacia.telefone)}
                  >
                    <MessageCircle className="h-4 w-4" /> Contatar
                  </Button>
                </CardFooter>
                {expandedOrder === pedido.id && (
                  <div className="px-4 pb-4 border-t">
                    <div className="py-4">
                      <h4 className="font-medium mb-3">Itens do pedido</h4>
                      <div className="space-y-3">
                        {pedido.itens.map((item) => (
                          <div key={item.id} className="flex items-center gap-3">
                            <div className="relative h-16 w-16 rounded-md overflow-hidden bg-gray-100">
                              <Image
                                src={item.imagem || "/placeholder.svg"}
                                alt={item.nome}
                                fill
                                className="object-contain"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{item.nome}</p>
                              <p className="text-sm text-gray-500">Quantidade: {item.quantidade}</p>
                            </div>
                            <div className="font-medium">R$ {item.preco.toFixed(2)}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="py-4 border-t">
                      <h4 className="font-medium mb-3">Informações de entrega</h4>
                      <p className="text-sm">
                        <span className="font-medium">Tipo:</span> {pedido.entrega.tipo}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Endereço:</span> {pedido.entrega.endereco}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Data:</span> {pedido.entrega.data}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Horário:</span> {pedido.entrega.horario}
                      </p>
                    </div>
                    <div className="py-4 border-t">
                      <h4 className="font-medium mb-3">Informações de pagamento</h4>
                      <p className="text-sm">
                        <span className="font-medium">Método:</span> {pedido.pagamento.metodo}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Status:</span> {pedido.pagamento.status}
                      </p>
                      <div className="flex justify-between items-center mt-3">
                        <span className="font-medium">Total</span>
                        <span className="font-bold text-lg">R$ {pedido.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            ))}
        </TabsContent>
        <TabsContent value="entregues" className="space-y-4 mt-4">
          {filteredPedidos
            .filter((pedido) => pedido.status === "Entregue")
            .map((pedido) => (
              <Card key={pedido.id} className="overflow-hidden">
                <CardHeader className="p-4 pb-0">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 rounded-full overflow-hidden border">
                        <Image
                          src={pedido.farmacia.logo || "/placeholder.svg"}
                          alt={pedido.farmacia.nome}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{pedido.id}</CardTitle>
                        <CardDescription>
                          {pedido.data} • {pedido.farmacia.nome}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                      {pedido.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="h-5 w-5 text-muted-foreground" />
                      <span>{pedido.itens.length} itens</span>
                    </div>
                    <div className="font-medium">R$ {pedido.total.toFixed(2)}</div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <Button
                    variant="ghost"
                    onClick={() => toggleOrderDetails(pedido.id)}
                    className="flex items-center gap-1"
                  >
                    {expandedOrder === pedido.id ? (
                      <>
                        <ChevronUp className="h-4 w-4" /> Ocultar detalhes
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4" /> Ver detalhes
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => openWhatsApp(pedido.farmacia.telefone)}
                  >
                    <MessageCircle className="h-4 w-4" /> Contatar
                  </Button>
                </CardFooter>
                {expandedOrder === pedido.id && (
                  <div className="px-4 pb-4 border-t">
                    <div className="py-4">
                      <h4 className="font-medium mb-3">Itens do pedido</h4>
                      <div className="space-y-3">
                        {pedido.itens.map((item) => (
                          <div key={item.id} className="flex items-center gap-3">
                            <div className="relative h-16 w-16 rounded-md overflow-hidden bg-gray-100">
                              <Image
                                src={item.imagem || "/placeholder.svg"}
                                alt={item.nome}
                                fill
                                className="object-contain"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{item.nome}</p>
                              <p className="text-sm text-gray-500">Quantidade: {item.quantidade}</p>
                            </div>
                            <div className="font-medium">R$ {item.preco.toFixed(2)}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="py-4 border-t">
                      <h4 className="font-medium mb-3">Informações de entrega</h4>
                      <p className="text-sm">
                        <span className="font-medium">Tipo:</span> {pedido.entrega.tipo}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Endereço:</span> {pedido.entrega.endereco}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Data:</span> {pedido.entrega.data}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Horário:</span> {pedido.entrega.horario}
                      </p>
                    </div>
                    <div className="py-4 border-t">
                      <h4 className="font-medium mb-3">Informações de pagamento</h4>
                      <p className="text-sm">
                        <span className="font-medium">Método:</span> {pedido.pagamento.metodo}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Status:</span> {pedido.pagamento.status}
                      </p>
                      <div className="flex justify-between items-center mt-3">
                        <span className="font-medium">Total</span>
                        <span className="font-bold text-lg">R$ {pedido.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
