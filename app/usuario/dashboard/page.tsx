"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, ShoppingBag, Package, User, Settings, Bell, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Dados de exemplo para medicamentos
const medicamentosExemplo = [
  {
    id: 1,
    nome: "Paracetamol 500mg",
    imagem: "/placeholder.svg?height=200&width=200",
    precoOriginal: 25.9,
    precoDesconto: 18.9,
    dataValidade: "2025-08-15",
    distancia: 1.2,
    farmacia: "Farmácia Saúde",
    categoria: "Analgésicos",
  },
  {
    id: 2,
    nome: "Dipirona 1g",
    imagem: "/placeholder.svg?height=200&width=200",
    precoOriginal: 18.5,
    precoDesconto: 12.9,
    dataValidade: "2025-07-20",
    distancia: 0.8,
    farmacia: "Drogaria Bem Estar",
    categoria: "Analgésicos",
  },
  {
    id: 3,
    nome: "Omeprazol 20mg",
    imagem: "/placeholder.svg?height=200&width=200",
    precoOriginal: 32.9,
    precoDesconto: 24.5,
    dataValidade: "2025-09-10",
    distancia: 2.5,
    farmacia: "Farmácia Popular",
    categoria: "Gastrintestinais",
  },
]

// Dados de exemplo para pedidos recentes
const pedidosRecentes = [
  {
    id: "PED-001",
    data: "15/05/2024",
    farmacia: "Farmácia Saúde",
    status: "Entregue",
    total: "R$ 89,90",
  },
  {
    id: "PED-002",
    data: "10/05/2024",
    farmacia: "Drogaria Mais Saúde",
    status: "Em trânsito",
    total: "R$ 45,80",
  },
]

export default function UsuarioDashboardPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR")
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-blue-900 text-white">
        <div className="p-4 border-b border-blue-800">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-6 w-6" />
            <span className="text-xl font-bold">Farma Flash</span>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="relative h-10 w-10 rounded-full bg-blue-800 flex items-center justify-center">
              <span className="font-semibold">JS</span>
            </div>
            <div>
              <p className="font-medium">João Silva</p>
              <p className="text-xs text-blue-200">Cliente</p>
            </div>
          </div>
          <nav className="space-y-1">
            <Link
              href="/usuario/dashboard"
              className="flex items-center gap-3 px-3 py-2 rounded-md bg-blue-800 text-white"
            >
              <ShoppingBag className="h-5 w-5" />
              <span>Início</span>
            </Link>
            <Link
              href="/usuario/pedidos"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-blue-100 hover:bg-blue-800 hover:text-white"
            >
              <Package className="h-5 w-5" />
              <span>Meus Pedidos</span>
            </Link>
            <Link
              href="/usuario/perfil"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-blue-100 hover:bg-blue-800 hover:text-white"
            >
              <User className="h-5 w-5" />
              <span>Meu Perfil</span>
            </Link>
            <Link
              href="/usuario/configuracoes"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-blue-100 hover:bg-blue-800 hover:text-white"
            >
              <Settings className="h-5 w-5" />
              <span>Configurações</span>
            </Link>
          </nav>
        </div>
        <div className="mt-auto p-4 border-t border-blue-800">
          <Link
            href="/logout"
            className="flex items-center gap-3 px-3 py-2 rounded-md text-blue-100 hover:bg-blue-800 hover:text-white"
          >
            <LogOut className="h-5 w-5" />
            <span>Sair</span>
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1">
        <header className="bg-white border-b sticky top-0 z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center md:hidden">
              <Button variant="ghost" size="icon" className="mr-2">
                <ShoppingBag className="h-6 w-6 text-blue-800" />
              </Button>
              <h1 className="text-xl font-bold text-blue-800">Farma Flash</h1>
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-blue-800">Meu Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="font-semibold text-blue-800">JS</span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Perfil</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Configurações</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <main className="p-4 md:p-6">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Buscar medicamentos..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pedidos Realizados</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">+1 no último mês</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Economia Total</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 87,50</div>
                <p className="text-xs text-muted-foreground">+R$ 25,30 no último mês</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Farmácias Favoritas</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">Farmácia Saúde, Drogaria Bem Estar</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Medicamentos Salvos</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">+2 na última semana</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Medicamentos Recomendados</CardTitle>
                  <CardDescription>Baseado nas suas compras anteriores e preferências</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {medicamentosExemplo.map((medicamento) => (
                      <div key={medicamento.id} className="flex items-center gap-4 border-b pb-4">
                        <div className="relative h-16 w-16 rounded-md overflow-hidden bg-gray-100">
                          <Image
                            src={medicamento.imagem || "/placeholder.svg"}
                            alt={medicamento.nome}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{medicamento.nome}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>{medicamento.farmacia}</span>
                            <span>•</span>
                            <span>{medicamento.distancia} km</span>
                            <span>•</span>
                            <span>Válido até {formatDate(medicamento.dataValidade)}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-gray-500 line-through text-sm">
                              R$ {medicamento.precoOriginal.toFixed(2)}
                            </span>
                            <span className="text-blue-800 font-bold">R$ {medicamento.precoDesconto.toFixed(2)}</span>
                            <Badge className="bg-lime-500">
                              {Math.round((1 - medicamento.precoDesconto / medicamento.precoOriginal) * 100)}% OFF
                            </Badge>
                          </div>
                        </div>
                        <Button asChild className="bg-blue-800 hover:bg-blue-900">
                          <Link href={`/usuario/medicamento/${medicamento.id}`}>Ver</Link>
                        </Button>
                      </div>
                    ))}
                    <div className="flex justify-center">
                      <Button variant="link" asChild>
                        <Link href="/buscar">Ver mais medicamentos</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Pedidos Recentes</CardTitle>
                  <CardDescription>Seus últimos pedidos realizados</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pedidosRecentes.map((pedido) => (
                      <div key={pedido.id} className="flex items-center justify-between border-b pb-4">
                        <div>
                          <p className="font-medium">{pedido.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {pedido.data} • {pedido.farmacia}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={pedido.status === "Entregue" ? "outline" : "default"}
                            className={
                              pedido.status === "Entregue"
                                ? "bg-green-100 text-green-800 border-green-200"
                                : "bg-blue-100 text-blue-800 border-blue-200"
                            }
                          >
                            {pedido.status}
                          </Badge>
                          <div className="text-sm font-medium">{pedido.total}</div>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/usuario/pedidos">Ver todos os pedidos</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Ações Rápidas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button className="w-full justify-start" variant="outline" asChild>
                      <Link href="/buscar">
                        <Search className="mr-2 h-4 w-4" />
                        Buscar Medicamentos
                      </Link>
                    </Button>
                    <Button className="w-full justify-start" variant="outline" asChild>
                      <Link href="/usuario/pedidos">
                        <Package className="mr-2 h-4 w-4" />
                        Meus Pedidos
                      </Link>
                    </Button>
                    <Button className="w-full justify-start" variant="outline" asChild>
                      <Link href="/usuario/perfil">
                        <User className="mr-2 h-4 w-4" />
                        Meu Perfil
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
