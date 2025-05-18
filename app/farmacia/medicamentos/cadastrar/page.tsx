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
  ArrowLeft,
  Upload,
  AlertCircle,
  Info,
  Save,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"

export default function CadastrarMedicamentoPage() {
  const [nome, setNome] = useState("")
  const [dataValidade, setDataValidade] = useState("")
  const [precoOriginal, setPrecoOriginal] = useState("")
  const [precoDesconto, setPrecoDesconto] = useState("")
  const [validadeAlerta, setValidadeAlerta] = useState(false)
  const [entregaRapida, setEntregaRapida] = useState(false)
  const [raioEntrega, setRaioEntrega] = useState([5])
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const checkValidityWarning = (date: string) => {
    if (!date) return false

    const selectedDate = new Date(date)
    const today = new Date()

    // Adiciona 30 dias à data atual
    const thirtyDaysFromNow = new Date()
    thirtyDaysFromNow.setDate(today.getDate() + 30)

    // Verifica se a data selecionada é menor que 30 dias a partir de hoje
    const isLessThanThirtyDays = selectedDate < thirtyDaysFromNow

    setValidadeAlerta(isLessThanThirtyDays)
    return isLessThanThirtyDays
  }

  const handleValidadeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value
    setDataValidade(date)
    checkValidityWarning(date)
  }

  const handlePrecoOriginalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value
    setPrecoOriginal(valor)
    // Se o preço com desconto não foi definido, sugerir um desconto de 30%
    if (!precoDesconto && valor) {
      const valorNumerico = Number.parseFloat(valor)
      if (!isNaN(valorNumerico)) {
        const descontoSugerido = (valorNumerico * 0.7).toFixed(2)
        setPrecoDesconto(descontoSugerido)
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui seria implementada a lógica para salvar o medicamento
    alert("Medicamento cadastrado com sucesso!")
    // Redirecionamento para o catálogo
    window.location.href = "/farmacia/medicamentos"
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
              <h1 className="text-xl font-bold text-blue-800">Cadastrar Novo Medicamento</h1>
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
          <div className="mb-6">
            <Link href="/farmacia/medicamentos" className="flex items-center text-blue-800 hover:underline">
              <ArrowLeft className="h-4 w-4 mr-1" /> Voltar para Meu Catálogo
            </Link>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Cadastrar Novo Medicamento</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="flex items-center gap-1">
                        Nome do Medicamento
                        <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        placeholder="Ex: Paracetamol 500mg"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Categoria</Label>
                      <Select>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                        <SelectContent>
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
                      <Label htmlFor="description">Descrição</Label>
                      <Textarea
                        id="description"
                        placeholder="Descreva o medicamento, suas indicações e informações importantes"
                        rows={4}
                      />
                    </div>
                    <div>
                      <Label htmlFor="dosage">Posologia</Label>
                      <Textarea id="dosage" placeholder="Informe a posologia recomendada" rows={2} />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="image">Imagem do Produto</Label>
                      <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
                        {previewImage ? (
                          <div className="relative h-40 w-40 mb-4">
                            <Image
                              src={previewImage || "/placeholder.svg"}
                              alt="Preview da imagem"
                              layout="fill"
                              objectFit="contain"
                              className="rounded-md"
                            />
                          </div>
                        ) : (
                          <Upload className="h-10 w-10 text-gray-400 mb-2" />
                        )}
                        <p className="text-sm text-gray-500">
                          {previewImage
                            ? "Clique para alterar a imagem"
                            : "Arraste uma imagem ou clique para fazer upload"}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">PNG, JPG ou JPEG (máx. 2MB)</p>
                        <Input
                          id="image"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-4"
                          onClick={() => document.getElementById("image")?.click()}
                        >
                          {previewImage ? "Alterar Imagem" : "Selecionar Arquivo"}
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="originalPrice" className="flex items-center gap-1">
                          Preço Original (R$)
                          <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="originalPrice"
                          type="number"
                          step="0.01"
                          placeholder="0,00"
                          value={precoOriginal}
                          onChange={handlePrecoOriginalChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="discountPrice" className="flex items-center gap-1">
                          Preço com Desconto (R$)
                          <span className="text-red-500">*</span>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="h-4 w-4 text-gray-400 cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="w-60">
                                  O desconto deve ser significativo para atrair consumidores. Recomendamos pelo menos
                                  15% para medicamentos com validade maior que 3 meses.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </Label>
                        <Input
                          id="discountPrice"
                          type="number"
                          step="0.01"
                          placeholder="0,00"
                          value={precoDesconto}
                          onChange={(e) => setPrecoDesconto(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="quantity" className="flex items-center gap-1">
                          Quantidade
                          <span className="text-red-500">*</span>
                        </Label>
                        <Input id="quantity" type="number" placeholder="0" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="unit">Unidade</Label>
                        <Select>
                          <SelectTrigger id="unit">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="comprimidos">Comprimidos</SelectItem>
                            <SelectItem value="capsulas">Cápsulas</SelectItem>
                            <SelectItem value="ml">ml</SelectItem>
                            <SelectItem value="frascos">Frascos</SelectItem>
                            <SelectItem value="ampolas">Ampolas</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate" className="flex items-center gap-1">
                        Data de Validade
                        <span className="text-red-500">*</span>
                        {validadeAlerta && (
                          <Badge variant="outline" className="ml-2 bg-orange-100 text-orange-700 border-orange-200">
                            <AlertCircle className="h-3 w-3 mr-1" /> Validade próxima
                          </Badge>
                        )}
                      </Label>
                      <Input
                        id="expiryDate"
                        type="date"
                        value={dataValidade}
                        onChange={handleValidadeChange}
                        required
                      />
                      {validadeAlerta && (
                        <p className="text-xs text-orange-600 flex items-center mt-1">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Este medicamento tem validade inferior a 30 dias. Garanta que será entregue em até 3 dias.
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Informações adicionais</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="manufacturer">Fabricante</Label>
                      <Input id="manufacturer" placeholder="Ex: Laboratório Saúde" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="batchNumber">Número do Lote</Label>
                        <Input id="batchNumber" placeholder="Ex: L123456" />
                      </div>
                      <div>
                        <Label htmlFor="registrationNumber">Registro ANVISA</Label>
                        <Input id="registrationNumber" placeholder="Ex: 1.2345.6789" />
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Opções de entrega</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="deliveryRadius" className="flex items-center gap-2">
                          Raio de entrega
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="h-4 w-4 text-gray-400 cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Defina a distância máxima que sua farmácia consegue entregar.</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </Label>
                        <span className="text-sm font-medium">{raioEntrega[0]} km</span>
                      </div>
                      <Slider
                        id="deliveryRadius"
                        min={1}
                        max={10}
                        step={1}
                        value={raioEntrega}
                        onValueChange={setRaioEntrega}
                      />
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="fastDelivery" className="flex items-center gap-2">
                          Entrega rápida
                          <Badge variant="outline" className="ml-2 bg-lime-100 text-lime-700 border-lime-200">
                            Recomendado
                          </Badge>
                        </Label>
                        <Switch id="fastDelivery" checked={entregaRapida} onCheckedChange={setEntregaRapida} />
                      </div>
                      <p className="text-sm text-gray-500">
                        Ao ativar esta opção, o medicamento será marcado como "Entrega Rápida" e terá prioridade no
                        catálogo.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <Button variant="outline" type="button">
                    Cancelar
                  </Button>
                  <Button className="bg-blue-800 hover:bg-blue-900" type="submit">
                    <Save className="mr-2 h-4 w-4" />
                    Cadastrar Medicamento
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
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
