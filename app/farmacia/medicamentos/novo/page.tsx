import Link from "next/link"
import { ShoppingBag, BarChart3, Package, Users, Settings, LogOut, Bell, ArrowLeft, Upload } from "lucide-react"
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

export default function NewMedicationPage() {
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
              <span>Medicamentos</span>
            </Link>
            <Link
              href="/farmacia/pedidos"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-blue-100 hover:bg-blue-800 hover:text-white"
            >
              <ShoppingBag className="h-5 w-5" />
              <span>Pedidos</span>
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
              <h1 className="text-xl font-bold text-blue-800">Novo Medicamento</h1>
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

        <main className="p-4 md:p-6">
          <div className="mb-6">
            <Link href="/farmacia/medicamentos" className="flex items-center text-blue-800 hover:underline">
              <ArrowLeft className="h-4 w-4 mr-1" /> Voltar para medicamentos
            </Link>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Cadastrar Novo Medicamento</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nome do Medicamento</Label>
                      <Input id="name" placeholder="Ex: Paracetamol 500mg" />
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
                        <Upload className="h-10 w-10 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">Arraste uma imagem ou clique para fazer upload</p>
                        <p className="text-xs text-gray-400 mt-1">PNG, JPG ou JPEG (máx. 2MB)</p>
                        <Input id="image" type="file" className="hidden" />
                        <Button variant="outline" size="sm" className="mt-4">
                          Selecionar Arquivo
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="originalPrice">Preço Original (R$)</Label>
                        <Input id="originalPrice" type="number" step="0.01" placeholder="0,00" />
                      </div>
                      <div>
                        <Label htmlFor="discountPrice">Preço com Desconto (R$)</Label>
                        <Input id="discountPrice" type="number" step="0.01" placeholder="0,00" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="quantity">Quantidade</Label>
                        <Input id="quantity" type="number" placeholder="0" />
                      </div>
                      <div>
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
                    <div>
                      <Label htmlFor="expiryDate">Data de Validade</Label>
                      <Input id="expiryDate" type="date" />
                    </div>
                  </div>
                </div>
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
                <div className="flex justify-end gap-4">
                  <Button variant="outline">Cancelar</Button>
                  <Button className="bg-blue-800 hover:bg-blue-900">Cadastrar Medicamento</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
