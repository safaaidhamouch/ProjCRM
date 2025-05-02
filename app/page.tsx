import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Shield, BarChart3, Users, LineChart } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-violet-900 mb-4">AssurCRM</h1>
          <p className="text-xl text-violet-700 max-w-2xl mx-auto">
            Système de gestion intégré pour les professionnels de l'assurance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="border-violet-200 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-violet-900">
                <BarChart3 className="mr-2 h-5 w-5 text-violet-600" />
                Direction Générale
              </CardTitle>
              <CardDescription>Tableaux de bord stratégiques et analyses de performance</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                Accédez aux KPIs, analyses des performances des équipes et gestion des objectifs stratégiques.
              </p>
              <Link href="/login?role=ceo" className="w-full">
                <Button className="w-full bg-violet-600 hover:bg-violet-700">Accéder</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-violet-200 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-violet-900">
                <Users className="mr-2 h-5 w-5 text-violet-600" />
                Commercial
              </CardTitle>
              <CardDescription>Gestion des prospects et du pipeline de vente</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                Suivez vos prospects, gérez votre pipeline de vente et administrez vos clients existants.
              </p>
              <Link href="/login?role=commercial" className="w-full">
                <Button className="w-full bg-violet-600 hover:bg-violet-700">Accéder</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-violet-200 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-violet-900">
                <LineChart className="mr-2 h-5 w-5 text-violet-600" />
                Marketing
              </CardTitle>
              <CardDescription>Suivi des campagnes et analyses marketing</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                Gérez vos campagnes, emails, réseaux sociaux et suivez vos KPIs marketing.
              </p>
              <Link href="/login?role=marketing" className="w-full">
                <Button className="w-full bg-violet-600 hover:bg-violet-700">Accéder</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-violet-200 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-violet-900">
                <Shield className="mr-2 h-5 w-5 text-violet-600" />
                ERP Assurance
              </CardTitle>
              <CardDescription>Gestion des contrats et sinistres</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                Gérez les contrats, sinistres, renouvellements et entreprises clientes.
              </p>
              <Link href="/login?role=erp" className="w-full">
                <Button className="w-full bg-violet-600 hover:bg-violet-700">Accéder</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-violet-900 mb-4">Une solution complète pour votre entreprise</h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-8">
            AssurCRM intègre tous les outils nécessaires pour gérer efficacement votre entreprise d'assurance, de la
            prospection commerciale à la gestion des contrats, en passant par le marketing et le pilotage stratégique.
          </p>
        </div>
      </div>
    </div>
  )
}
