"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ShoppingBag,
  BarChart3,
  Package,
  Users,
  Settings,
  LogOut,
  Bell,
  Search,
  Plus,
  Edit,
  Trash2,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Dados simulados
const medicamentos = [
  {
    id: 1,
    nome: "Paracetamol 500mg",
    imagem: "/placeholder.svg?height=80&width=80",
    precoOriginal: 25.9,
    precoDesconto: 18.9,
    dataValidade: "2025-08-15",
    quantidade: 20,
    categoria: "Analgésicos",
    status: "active",
  },
  {
    id: 2,
    nome: "Dipirona 1g",
    imagem: "/placeholder.svg?height=80&width=80",
    precoOriginal: 18.5,
    precoDesconto: 12.9,
    dataValidade: "2025-07-20",
    quantidade: 5,
    categoria: "Analgésicos",
    status: "active",
  },
  {
    id: 3,
    nome: "Omeprazol 20mg",
    imagem: "/placeholder.svg?height=80&width=80",
    precoOriginal: 32.9,
    precoDesconto: 24.5,
    dataValidade: "2025-06-10",
    quantidade: 30,
    categoria: "Gastrintestinais",
    status: "active",
  },
  {
    id: 4,
    nome: "Loratadina 10mg",
    imagem: "/placeholder.svg?height=80&width=80",
    precoOriginal: 22.9,
    precoDesconto: 15.9,
    dataValidade: "2025-08-05",
    quantidade: 25,
    categoria: "Antialérgicos",
    status: "active",
  },
  {
    id: 5,
    nome: "Ibuprofeno 600mg",
    imagem: "/placeholder.svg?height=80&width=80",
    precoOriginal: 28.5,
    precoDesconto: 19.9,
    dataValidade: "2025-07-25",
    quantidade: 3,
    categoria: "Anti-inflamatórios",
    status: "active",
  },
  {
    id: 6,
    nome: "Amoxicilina 500mg",
    imagem: "/placeholder.svg?height=80&width=80",
    precoOriginal: 45.9,
    precoDesconto: 32.9,
    dataValidade: "2025-06-05",
    quantidade: 0,
    categoria: "Antibióticos",
    status: "inactive",
  },
  {
    id: 7,
    nome: "Atenolol 50mg",
    imagem: "/placeholder.svg?height=80&width=80",
    precoOriginal: 35.9,
    precoDesconto: 28.5,
    dataValidade: "2025-09-05",
    quantidade: 12,
    categoria: "Cardiovasculares",
    status: "active",
  },
]

export default function MedicamentosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [medicamentoParaExcluir, setMedicamentoParaExcluir] = useState<number | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [visualizacao, setVisualizacao] = useState("tabela")

  const formatarData = (dataString: string) => {
    const data = new Date(dataString)
    return data.toLocaleDateString("pt-BR")
  }

  const verificarValidade = (dataString: string) => {
    const data = new Date(dataString)
    const hoje = new Date()
    const diferenca = data.getTime() - hoje.getTime()
    const dias = Math.ceil(diferenca / (1000 * 3600 * 24))
    return dias <= 30
  }

  const verificarEstoque = (quantidade: number) => {
    if (quantidade === 0) return "indisponível"
    if (quantidade <= 5) return "crítico"
    return "disponível"
  }

  const handleExcluir = (id: number) => {
    setMedicamentoParaExcluir(id)
    setDialogOpen(true)
  }

  const confirmarExclusao = () => {
    // Aqui seria implementada a lógica para excluir o medicamento
    console.log(`Excluindo medicamento ${medicamentoParaExcluir}`)
    setDialogOpen(false)
    setMedicamentoParaExcluir(null)
  }

  const medicamentosFiltrados = medicamentos.filter((med) => {
    const matchesSearch =
      med.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.categoria.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = categoryFilter === "all" || med.categoria === categoryFilter

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "available" && med.quantidade > 0) ||
      (statusFilter === "critical" && med.quantidade <= 5 && med.quantidade > 0) ||
      (statusFilter === "unavailable" && med.quantidade === 0)

    return matchesSearch && matchesCategory && matchesStatus
  })

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
              <span className="font-semibold">FS</span>
            </div>
            <div>
              <p className="font-medium">Farmácia Saúde</p>
              <p className="text-xs text-blue-200">Administrador</p>
            </div>
          </div>
          <nav className="space-y-1">
            <Link
              href="/farmacia/dashboard"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-blue-100 hover:bg-blue-800 hover:text-white"
            >
              <BarChart3 className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/farmacia/medicamentos"
              className="flex items-center gap-3 px-3 py-2 rounded-md bg-blue-800 text-white"
            >
              <Package className="h-5 w-5" />
              <span>Meu Catálogo</span>
            </Link>
            <Link
              href="/farmacia/medicamentos/cadastrar"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-blue-100 hover:bg-blue-800 hover:text-white ml-6"
            >
              <span>→ Cadastrar Produto</span>
            </Link>
            <Link
              href="/farmacia/loja"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-blue-100 hover:bg-blue-800 hover:text-white"
            >
              <Store className="h-5 w-5" />
              <span>Minha Loja</span>
            </Link>
            <Link
              href="/farmacia/pedidos"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-blue-100 hover:bg-blue-800 hover:text-white"
            >
              <ShoppingBag className="h-5 w-5" />
              <span>Meus Pedidos</span>
            </Link>
            <Link
              href="/farmacia/clientes"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-blue-100 hover:bg-blue-800 hover:text-white"
            >
              <Users className="h-5 w-5" />
              <span>Clientes</span>
            </Link>
            <Link
              href="/farmacia/configuracoes"
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
              <h1 className="text-xl font-bold text-blue-800">Meu Catálogo</h1>
            </div>
            <div className="flex items-center gap-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-5 w-5" />
                      <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Você tem 3 notificações</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="font-semibold text-blue-800">FS</span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
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

        {/* Botão de suporte via WhatsApp fixo no canto inferior direito */}
        <div className="fixed bottom-6 right-6 z-50">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-lime-500 hover:bg-lime-600 text-white rounded-full p-3 shadow-lg flex items-center justify-center transition-transform hover:scale-105"
                >
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
                    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                    <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                    <path d="M9.5 13.5c.5 1 1.5 1 2 1s1.5 0 2-1" />
                  </svg>
                </a>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Precisa de ajuda? Fale conosco</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <main className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold">Medicamentos Cadastrados</h2>
              <p className="text-gray-500">Gerencie seu estoque de medicamentos com descontos</p>
            </div>

            <Link href="/farmacia/medicamentos/cadastrar">
              <Button className="bg-blue-800 hover:bg-blue-900">
                <Plus className="h-4 w-4 mr-2" /> Novo Medicamento
              </Button>
            </Link>
          </div>

          <div className="bg-white p-4 rounded-lg border mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Buscar por nome, categoria..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-full md:w-40">
                      <SelectValue placeholder="Categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as categorias</SelectItem>
                      <SelectItem value="Analgésicos">Analgésicos</SelectItem>
                      <SelectItem value="Antibióticos">Antibióticos</SelectItem>
                      <SelectItem value="Antialérgicos">Antialérgicos</SelectItem>
                      <SelectItem value="Anti-inflamatórios">Anti-inflamatórios</SelectItem>
                      <SelectItem value="Cardiovasculares">Cardiovasculares</SelectItem>
                      <SelectItem value="Gastrintestinais">Gastrintestinais</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os status</SelectItem>
                      <SelectItem value="available">Disponível</SelectItem>
                      <SelectItem value="critical">Estoque crítico</SelectItem>
                      <SelectItem value="unavailable">Indisponível</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <div className="flex border rounded-md overflow-hidden">
                    <Button
                      variant={visualizacao === "tabela" ? "default" : "outline"}
                      className={
                        visualizacao === "tabela" ? "rounded-none bg-blue-800 hover:bg-blue-900" : "rounded-none"
                      }
                      onClick={() => setVisualizacao("tabela")}
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
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="3" y1="9" x2="21" y2="9"></line>
                        <line x1="3" y1="15" x2="21" y2="15"></line>
                        <line x1="9" y1="3" x2="9" y2="21"></line>
                        <line x1="15" y1="3" x2="15" y2="21"></line>
                      </svg>
                      <span className="ml-2">Tabela</span>
                    </Button>
                    <Button
                      variant={visualizacao === "cards" ? "default" : "outline"}
                      className={
                        visualizacao === "cards" ? "rounded-none bg-blue-800 hover:bg-blue-900" : "rounded-none"
                      }
                      onClick={() => setVisualizacao("cards")}
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
                        <rect x="3" y="3" width="7" height="7"></rect>
                        <rect x="14" y="3" width="7" height="7"></rect>
                        <rect x="14" y="14" width="7" height="7"></rect>
                        <rect x="3" y="14" width="7" height="7"></rect>
                      </svg>
                      <span className="ml-2">Cards</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {visualizacao === "tabela" ? (
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-gray-500">Medicamento</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500">Preço</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500">Validade</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500">Estoque</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-500">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {medicamentosFiltrados.map((medicamento) => (
                        <tr key={medicamento.id} className="border-b">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="relative h-10 w-10 rounded-md overflow-hidden bg-gray-100">
                                <Image
                                  src={medicamento.imagem || "/placeholder.svg"}
                                  alt={medicamento.nome}
                                  fill
                                  className="object-contain"
                                />
                              </div>
                              <div>
                                <p className="font-medium">{medicamento.nome}</p>
                                <p className="text-xs text-gray-500">{medicamento.categoria}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex flex-col">
                              <span className="text-gray-500 line-through text-xs">
                                R$ {medicamento.precoOriginal.toFixed(2)}
                              </span>
                              <span className="font-medium">R$ {medicamento.precoDesconto.toFixed(2)}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-1">
                              {verificarValidade(medicamento.dataValidade) ? (
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Clock className="h-4 w-4 text-orange-500" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Validade próxima (menos de 30 dias)</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              ) : (
                                <Clock className="h-4 w-4 text-gray-400" />
                              )}
                              <span>{formatarData(medicamento.dataValidade)}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge
                              variant={
                                verificarEstoque(medicamento.quantidade) === "disponível"
                                  ? "outline"
                                  : verificarEstoque(medicamento.quantidade) === "crítico"
                                    ? "secondary"
                                    : "destructive"
                              }
                              className={
                                verificarEstoque(medicamento.quantidade) === "disponível"
                                  ? "bg-green-100 text-green-800 border-green-200"
                                  : verificarEstoque(medicamento.quantidade) === "crítico"
                                    ? "bg-orange-100 text-orange-800 border-orange-200"
                                    : "bg-red-100 text-red-800 border-red-200"
                              }
                            >
                              {medicamento.quantidade} unidades
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" asChild>
                                      <Link href={`/farmacia/medicamentos/editar/${medicamento.id}`}>
                                        <Edit className="h-4 w-4" />
                                      </Link>
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Editar medicamento</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>

                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" onClick={() => handleExcluir(medicamento.id)}>
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Excluir medicamento</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {medicamentosFiltrados.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-gray-500">Nenhum medicamento encontrado.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {medicamentosFiltrados.map((medicamento) => (
                <Card key={medicamento.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative h-48 bg-gray-100">
                      <Image
                        src={medicamento.imagem || "/placeholder.svg"}
                        alt={medicamento.nome}
                        fill
                        className="object-contain p-4"
                      />
                      <Badge className="absolute top-2 right-2 bg-lime-500">
                        {Math.round((1 - medicamento.precoDesconto / medicamento.precoOriginal) * 100)}% OFF
                      </Badge>
                      {verificarValidade(medicamento.dataValidade) && (
                        <Badge className="absolute top-2 left-2 bg-orange-100 text-orange-800 border-orange-200">
                          <Clock className="h-3 w-3 mr-1" /> Validade próxima
                        </Badge>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs bg-blue-50 text-blue-800 border-blue-200">
                          {medicamento.categoria}
                        </Badge>
                        <Badge
                          variant={
                            verificarEstoque(medicamento.quantidade) === "disponível"
                              ? "outline"
                              : verificarEstoque(medicamento.quantidade) === "crítico"
                                ? "secondary"
                                : "destructive"
                          }
                          className={
                            verificarEstoque(medicamento.quantidade) === "disponível"
                              ? "bg-green-100 text-green-800 border-green-200"
                              : verificarEstoque(medicamento.quantidade) === "crítico"
                                ? "bg-orange-100 text-orange-800 border-orange-200"
                                : "bg-red-100 text-red-800 border-red-200"
                          }
                        >
                          {medicamento.quantidade} unidades
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{medicamento.nome}</h3>
                      <div className="flex items-center gap-2 text-gray-500 mb-2">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">Válido até {formatarData(medicamento.dataValidade)}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-gray-500 line-through">R$ {medicamento.precoOriginal.toFixed(2)}</span>
                        <span className="text-blue-800 font-bold text-xl">
                          R$ {medicamento.precoDesconto.toFixed(2)}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" asChild>
                          <Link href={`/farmacia/medicamentos/editar/${medicamento.id}`}>
                            <Edit className="h-4 w-4 mr-2" /> Editar
                          </Link>
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleExcluir(medicamento.id)}
                          className="bg-red-100 hover:bg-red-200 text-red-800"
                        >
                          <Trash2 className="h-4 w-4 mr-2" /> Excluir
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {medicamentosFiltrados.length === 0 && (
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-500">Nenhum medicamento encontrado.</p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Dialog de confirmação para excluir medicamento */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir medicamento</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir este medicamento? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmarExclusao}>
              Sim, excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Novo componente de ícone Store já que não foi incluído nas importações originais
function Store(props: React.SVGProps<SVGSVGElement>) {
  return (
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
      {...props}
    >
      <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"></path>
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
      <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"></path>
      <path d="M2 7h20"></path>
      <path d="M22 7v3a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2V7"></path>
      <path d="M18 12v0a2 2 0 0 1-2-2V7"></path>
      <path d="M14 7v3a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2V7"></path>
      <path d="M10 12v0a2 2 0 0 1-2-2V7"></path>
      <path d="M6 7v3a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2V7"></path>
    </svg>
  )
}
