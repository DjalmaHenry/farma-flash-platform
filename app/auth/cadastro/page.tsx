import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function RegisterSelectionPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Farma Flash</CardTitle>
          <CardDescription>Escolha o tipo de conta para se cadastrar</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <Button className="w-full h-16 text-lg" asChild>
              <Link href="/auth/cadastro/cliente">Sou Cliente</Link>
            </Button>
            <Button className="w-full h-16 text-lg" variant="outline" asChild>
              <Link href="/auth/cadastro/farmacia">Sou Farmácia</Link>
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm">
            Já tem uma conta?{" "}
            <Link href="/auth/login" className="text-primary hover:underline">
              Faça login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
