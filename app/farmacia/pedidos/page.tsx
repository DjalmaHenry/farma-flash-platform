"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, Package, Search, ShoppingBag, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Dados de exemplo para pedidos
const pedidosExemplo = [
  {
    id: "PED-001",
    data: "15/05/2024",
    cliente: {
      nome: "João Silva",
      telefone: "11 99999-9999",
      endereco: "Rua das Flores, 123 - São Paulo, SP",
    },
    status: "Entregue",
    total: "R$ 89,90",
    itens: [
      { nome: "Paracetamol 500mg", quantidade: 2, preco: "R$ 15,90" },
      { nome: "Dipirona 1g", quantidade: 1, preco: "R$ 12,50" },
      { nome: "Omeprazol 20mg", quantidade: 1, preco: "R$ 25,60" },
    ],
  },
  {
    id: "PED-002",
    data: "10/05/2024",
    cliente: {
      nome: "Maria Oliveira",
      telefone: "11 98888-8888",
      endereco: "Av. Paulista, 1000 - São Paulo, SP",
    },
    status: "Em preparação",
    total: "R$ 45,80",
    itens: [
      { nome: "Loratadina 10mg", quantidade: 1, preco: "R$ 18,90" },
      { nome: "Vitamina C", quantidade: 1, preco: "R$ 26,90" },
    ],
  },
  {
    id: "PED-003",
    data: "02/05/2024",
    cliente: {
      nome: "Carlos Santos",
      telefone: "11 97777-7777",
      endereco: "Rua Augusta, 500 - São Paulo, SP",
    },
    status: "Aguardando retirada",
    total: "R$ 120,50",
    itens: [
      { nome: "Amoxicilina 500mg", quantidade: 1, preco: "R$ 45,90" },
      { nome: "Ibuprofeno 600mg", quantidade: 2, preco: "R$ 22,80" },
      { nome: "Nimesulida 100mg", quantidade: 1, preco: "R$ 29,00" },
    ],
  },
  {
    id: "PED-004",
    data: "01/05/2024",
    cliente: {
      nome: "Ana Pereira",
      telefone: "11 96666-6666",
      endereco: "Rua Oscar Freire, 300 - São Paulo, SP",
    },
    status: "Novo pedido",
    total: "R$ 67,40",
    itens: [
      { nome: "Dorflex", quantidade: 2, preco: "R$ 18,90" },
      { nome: "Buscopan", quantidade: 1, preco: "R$ 29,60" },
    ],
  },
]

export default function GerenciarPedidosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
  const [pedidos, setPedidos] = useState(pedidosExemplo)

  const filteredPedidos = pedidos.filter(
    (pedido) =>
      pedido.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pedido.cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const toggleOrderDetails = (orderId: string) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null)
    } else {
      setExpandedOrder(orderId)
    }
  }

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setPedidos(pedidos.map((pedido) => (pedido.id === orderId ? { ...pedido, status: newStatus } : pedido)))
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Novo pedido":
        return "destructive"
      case "Em preparação":
        return "default"
      case "Aguardando retirada":
        return "warning"
      case "Em trânsito":
        return "secondary"
      case "Entregue":
        return "outline"
      default:
        return "default"
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
            <Link href="/farmacia/dashboard">
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Gerenciar Pedidos</h1>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar por número do pedido ou cliente..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Tabs defaultValue="todos">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="novos">Novos</TabsTrigger>
          <TabsTrigger value="em-preparacao">Em Preparação</TabsTrigger>
          <TabsTrigger value="aguardando">Aguardando Retirada</TabsTrigger>
          <TabsTrigger value="entregues">Entregues</TabsTrigger>
        </TabsList>
        <TabsContent value="todos" className="space-y-4 mt-4">
          {filteredPedidos.length > 0 ? (
            filteredPedidos.map((pedido) => (
              <Card key={pedido.id} className="overflow-hidden">
                <CardHeader className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-lg">{pedido.id}</CardTitle>
                      <CardDescription>
                        {pedido.data} • {pedido.cliente.nome}
                      </CardDescription>
                    </div>
                    <Badge variant={getStatusBadgeVariant(pedido.status)}>{pedido.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="h-5 w-5 text-muted-foreground" />
                      <span>{pedido.itens.length} itens</span>
                    </div>
                    <div className="font-medium">{pedido.total}</div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <Button variant="ghost" onClick={() => toggleOrderDetails(pedido.id)}>
                    {expandedOrder === pedido.id ? "Ocultar detalhes" : "Ver detalhes"}
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => openWhatsApp(pedido.cliente.telefone)}>
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                    <Select defaultValue={pedido.status} onValueChange={(value) => updateOrderStatus(pedido.id, value)}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Novo pedido">Novo pedido</SelectItem>
                        <SelectItem value="Em preparação">Em preparação</SelectItem>
                        <SelectItem value="Aguardando retirada">Aguardando retirada</SelectItem>
                        <SelectItem value="Em trânsito">Em trânsito</SelectItem>
                        <SelectItem value="Entregue">Entregue</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardFooter>
                {expandedOrder === pedido.id && (
                  <div className="px-4 pb-4 border-t">
                    <div className="my-2">
                      <h4 className="font-medium">Informações do cliente</h4>
                      <p className="text-sm text-muted-foreground">{pedido.cliente.nome}</p>
                      <p className="text-sm text-muted-foreground">{pedido.cliente.telefone}</p>
                      <p className="text-sm text-muted-foreground">{pedido.cliente.endereco}</p>
                    </div>
                    <h4 className="font-medium my-2">Itens do pedido</h4>
                    <ul className="space-y-2">
                      {pedido.itens.map((item, index) => (
                        <li key={index} className="flex justify-between text-sm">
                          <span>
                            {item.quantidade}x {item.nome}
                          </span>
                          <span>{item.preco}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Card>
            ))
          ) : (
            <div className="text-center py-10">
              <Package className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">Nenhum pedido encontrado</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Não encontramos nenhum pedido com os critérios de busca.
              </p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="novos" className="space-y-4 mt-4">
          {filteredPedidos
            .filter((pedido) => pedido.status === "Novo pedido")
            .map((pedido) => (
              <Card key={pedido.id} className="overflow-hidden">
                {/* Conteúdo similar ao da aba "todos", mas filtrado */}
                <CardHeader className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-lg">{pedido.id}</CardTitle>
                      <CardDescription>
                        {pedido.data} • {pedido.cliente.nome}
                      </CardDescription>
                    </div>
                    <Badge variant="destructive">{pedido.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="h-5 w-5 text-muted-foreground" />
                      <span>{pedido.itens.length} itens</span>
                    </div>
                    <div className="font-medium">{pedido.total}</div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <Button variant="ghost" onClick={() => toggleOrderDetails(pedido.id)}>
                    {expandedOrder === pedido.id ? "Ocultar detalhes" : "Ver detalhes"}
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => openWhatsApp(pedido.cliente.telefone)}>
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                    <Select defaultValue={pedido.status} onValueChange={(value) => updateOrderStatus(pedido.id, value)}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Novo pedido">Novo pedido</SelectItem>
                        <SelectItem value="Em preparação">Em preparação</SelectItem>
                        <SelectItem value="Aguardando retirada">Aguardando retirada</SelectItem>
                        <SelectItem value="Em trânsito">Em trânsito</SelectItem>
                        <SelectItem value="Entregue">Entregue</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardFooter>
                {expandedOrder === pedido.id && (
                  <div className="px-4 pb-4 border-t">
                    <div className="my-2">
                      <h4 className="font-medium">Informações do cliente</h4>
                      <p className="text-sm text-muted-foreground">{pedido.cliente.nome}</p>
                      <p className="text-sm text-muted-foreground">{pedido.cliente.telefone}</p>
                      <p className="text-sm text-muted-foreground">{pedido.cliente.endereco}</p>
                    </div>
                    <h4 className="font-medium my-2">Itens do pedido</h4>
                    <ul className="space-y-2">
                      {pedido.itens.map((item, index) => (
                        <li key={index} className="flex justify-between text-sm">
                          <span>
                            {item.quantidade}x {item.nome}
                          </span>
                          <span>{item.preco}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Card>
            ))}
        </TabsContent>
        <TabsContent value="em-preparacao" className="space-y-4 mt-4">
          {filteredPedidos
            .filter((pedido) => pedido.status === "Em preparação")
            .map((pedido) => (
              <Card key={pedido.id} className="overflow-hidden">
                {/* Conteúdo similar ao da aba "todos", mas filtrado */}
                <CardHeader className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-lg">{pedido.id}</CardTitle>
                      <CardDescription>
                        {pedido.data} • {pedido.cliente.nome}
                      </CardDescription>
                    </div>
                    <Badge>{pedido.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="h-5 w-5 text-muted-foreground" />
                      <span>{pedido.itens.length} itens</span>
                    </div>
                    <div className="font-medium">{pedido.total}</div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <Button variant="ghost" onClick={() => toggleOrderDetails(pedido.id)}>
                    {expandedOrder === pedido.id ? "Ocultar detalhes" : "Ver detalhes"}
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => openWhatsApp(pedido.cliente.telefone)}>
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                    <Select defaultValue={pedido.status} onValueChange={(value) => updateOrderStatus(pedido.id, value)}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Novo pedido">Novo pedido</SelectItem>
                        <SelectItem value="Em preparação">Em preparação</SelectItem>
                        <SelectItem value="Aguardando retirada">Aguardando retirada</SelectItem>
                        <SelectItem value="Em trânsito">Em trânsito</SelectItem>
                        <SelectItem value="Entregue">Entregue</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardFooter>
                {expandedOrder === pedido.id && (
                  <div className="px-4 pb-4 border-t">
                    <div className="my-2">
                      <h4 className="font-medium">Informações do cliente</h4>
                      <p className="text-sm text-muted-foreground">{pedido.cliente.nome}</p>
                      <p className="text-sm text-muted-foreground">{pedido.cliente.telefone}</p>
                      <p className="text-sm text-muted-foreground">{pedido.cliente.endereco}</p>
                    </div>
                    <h4 className="font-medium my-2">Itens do pedido</h4>
                    <ul className="space-y-2">
                      {pedido.itens.map((item, index) => (
                        <li key={index} className="flex justify-between text-sm">
                          <span>
                            {item.quantidade}x {item.nome}
                          </span>
                          <span>{item.preco}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Card>
            ))}
        </TabsContent>
        <TabsContent value="aguardando" className="space-y-4 mt-4">
          {filteredPedidos
            .filter((pedido) => pedido.status === "Aguardando retirada")
            .map((pedido) => (
              <Card key={pedido.id} className="overflow-hidden">
                {/* Conteúdo similar ao da aba "todos", mas filtrado */}
                <CardHeader className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-lg">{pedido.id}</CardTitle>
                      <CardDescription>
                        {pedido.data} • {pedido.cliente.nome}
                      </CardDescription>
                    </div>
                    <Badge variant="warning">{pedido.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="h-5 w-5 text-muted-foreground" />
                      <span>{pedido.itens.length} itens</span>
                    </div>
                    <div className="font-medium">{pedido.total}</div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <Button variant="ghost" onClick={() => toggleOrderDetails(pedido.id)}>
                    {expandedOrder === pedido.id ? "Ocultar detalhes" : "Ver detalhes"}
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => openWhatsApp(pedido.cliente.telefone)}>
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                    <Select defaultValue={pedido.status} onValueChange={(value) => updateOrderStatus(pedido.id, value)}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Novo pedido">Novo pedido</SelectItem>
                        <SelectItem value="Em preparação">Em preparação</SelectItem>
                        <SelectItem value="Aguardando retirada">Aguardando retirada</SelectItem>
                        <SelectItem value="Em trânsito">Em trânsito</SelectItem>
                        <SelectItem value="Entregue">Entregue</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardFooter>
                {expandedOrder === pedido.id && (
                  <div className="px-4 pb-4 border-t">
                    <div className="my-2">
                      <h4 className="font-medium">Informações do cliente</h4>
                      <p className="text-sm text-muted-foreground">{pedido.cliente.nome}</p>
                      <p className="text-sm text-muted-foreground">{pedido.cliente.telefone}</p>
                      <p className="text-sm text-muted-foreground">{pedido.cliente.endereco}</p>
                    </div>
                    <h4 className="font-medium my-2">Itens do pedido</h4>
                    <ul className="space-y-2">
                      {pedido.itens.map((item, index) => (
                        <li key={index} className="flex justify-between text-sm">
                          <span>
                            {item.quantidade}x {item.nome}
                          </span>
                          <span>{item.preco}</span>
                        </li>
                      ))}
                    </ul>
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
                {/* Conteúdo similar ao da aba "todos", mas filtrado */}
                <CardHeader className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-lg">{pedido.id}</CardTitle>
                      <CardDescription>
                        {pedido.data} • {pedido.cliente.nome}
                      </CardDescription>
                    </div>
                    <Badge variant="outline">{pedido.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="h-5 w-5 text-muted-foreground" />
                      <span>{pedido.itens.length} itens</span>
                    </div>
                    <div className="font-medium">{pedido.total}</div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <Button variant="ghost" onClick={() => toggleOrderDetails(pedido.id)}>
                    {expandedOrder === pedido.id ? "Ocultar detalhes" : "Ver detalhes"}
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => openWhatsApp(pedido.cliente.telefone)}>
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </CardFooter>
                {expandedOrder === pedido.id && (
                  <div className="px-4 pb-4 border-t">
                    <div className="my-2">
                      <h4 className="font-medium">Informações do cliente</h4>
                      <p className="text-sm text-muted-foreground">{pedido.cliente.nome}</p>
                      <p className="text-sm text-muted-foreground">{pedido.cliente.telefone}</p>
                      <p className="text-sm text-muted-foreground">{pedido.cliente.endereco}</p>
                    </div>
                    <h4 className="font-medium my-2">Itens do pedido</h4>
                    <ul className="space-y-2">
                      {pedido.itens.map((item, index) => (
                        <li key={index} className="flex justify-between text-sm">
                          <span>
                            {item.quantidade}x {item.nome}
                          </span>
                          <span>{item.preco}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Card>
            ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
