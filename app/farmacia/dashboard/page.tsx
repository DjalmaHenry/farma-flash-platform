import Link from "next/link"
import { Package, PlusCircle, ShoppingBag, Pill, Clock, TrendingUp, Settings, Store } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function FarmaciaDashboardPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard da Farmácia</h1>
          <p className="text-muted-foreground">Gerencie seus medicamentos e pedidos</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/farmacia/medicamentos/cadastrar">
              <PlusCircle className="mr-2 h-4 w-4" />
              Novo Medicamento
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/farmacia/configuracoes">
              <Settings className="mr-2 h-4 w-4" />
              Configurações
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Medicamentos Cadastrados</CardTitle>
            <Pill className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">+5 na última semana</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pedidos Pendentes</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">3 novos hoje</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vendas do Mês</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 4.325,00</div>
            <p className="text-xs text-muted-foreground">+12% em relação ao mês anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Medicamentos a Vencer</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">Nos próximos 30 dias</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Pedidos Recentes</CardTitle>
            <CardDescription>Você tem 7 pedidos pendentes para processar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="font-medium">PED-004</p>
                  <p className="text-sm text-muted-foreground">Ana Pereira • 01/05/2024</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-sm font-medium">R$ 67,40</div>
                  <Button size="sm" variant="outline" asChild>
                    <Link href="/farmacia/pedidos">Ver</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="font-medium">PED-003</p>
                  <p className="text-sm text-muted-foreground">Carlos Santos • 02/05/2024</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-sm font-medium">R$ 120,50</div>
                  <Button size="sm" variant="outline" asChild>
                    <Link href="/farmacia/pedidos">Ver</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="font-medium">PED-002</p>
                  <p className="text-sm text-muted-foreground">Maria Oliveira • 10/05/2024</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-sm font-medium">R$ 45,80</div>
                  <Button size="sm" variant="outline" asChild>
                    <Link href="/farmacia/pedidos">Ver</Link>
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <Button variant="link" asChild>
                  <Link href="/farmacia/pedidos">Ver todos os pedidos</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>Acesse as principais funcionalidades</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button className="w-full justify-start" variant="outline" asChild>
                <Link href="/farmacia/medicamentos">
                  <Pill className="mr-2 h-4 w-4" />
                  Gerenciar Medicamentos
                </Link>
              </Button>
              <Button className="w-full justify-start" variant="outline" asChild>
                <Link href="/farmacia/pedidos">
                  <Package className="mr-2 h-4 w-4" />
                  Gerenciar Pedidos
                </Link>
              </Button>
              <Button className="w-full justify-start" variant="outline" asChild>
                <Link href="/farmacia/relatorios">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Relatórios de Vendas
                </Link>
              </Button>
              <Button className="w-full justify-start" variant="outline" asChild>
                <Link href="/farmacia/perfil">
                  <Store className="mr-2 h-4 w-4" />
                  Perfil da Farmácia
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
