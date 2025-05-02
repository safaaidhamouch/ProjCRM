import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUp, Download, Plus, Users, FileText, CreditCard } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChartBar } from "@/components/ui/chart"

export default function CommercialDashboard() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Tableau de Bord Commercial</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            Exporter
          </Button>
          <Button className="flex items-center gap-1 bg-violet-600 hover:bg-violet-700">
            <Plus className="h-4 w-4" />
            Nouveau prospect
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prospects</CardTitle>
            <Users className="h-4 w-4 text-violet-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">145</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <span className="text-green-500 flex items-center mr-1">
                <ArrowUp className="h-3 w-3 mr-1" />
                12%
              </span>
              depuis le mois dernier
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clients</CardTitle>
            <Users className="h-4 w-4 text-violet-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <span className="text-green-500 flex items-center mr-1">
                <ArrowUp className="h-3 w-3 mr-1" />
                4%
              </span>
              depuis le mois dernier
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contrats</CardTitle>
            <FileText className="h-4 w-4 text-violet-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <span className="text-green-500 flex items-center mr-1">
                <ArrowUp className="h-3 w-3 mr-1" />
                8%
              </span>
              depuis le mois dernier
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenus</CardTitle>
            <CreditCard className="h-4 w-4 text-violet-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245 000 €</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <span className="text-green-500 flex items-center mr-1">
                <ArrowUp className="h-3 w-3 mr-1" />
                15%
              </span>
              depuis le mois dernier
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Pipeline de Vente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ChartBar data={pipelineData} xKey="stage" yKeys={["value"]} colors={["#7c3aed"]} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activités Récentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-4">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={activity.avatar || "/placeholder.svg?height=32&width=32"} alt="Avatar" />
                    <AvatarFallback>{activity.initials}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

const pipelineData = [
  { stage: "Nouveau", value: 45 },
  { stage: "Intérêt confirmé", value: 35 },
  { stage: "En négociation", value: 28 },
  { stage: "Proposition", value: 22 },
  { stage: "Contrat", value: 15 },
]

const recentActivities = [
  {
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "JD",
    title: "Appel avec Jean Dupont",
    description: "Discussion sur le renouvellement du contrat d'assurance auto",
    time: "Il y a 2 heures",
  },
  {
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "ML",
    title: "Email envoyé à Marie Leroy",
    description: "Proposition commerciale pour assurance habitation",
    time: "Il y a 4 heures",
  },
  {
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "SB",
    title: "Rendez-vous avec Société Bertrand",
    description: "Présentation des offres d'assurance professionnelle",
    time: "Hier à 14:30",
  },
  {
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "PL",
    title: "Nouveau prospect: Pierre Lambert",
    description: "Demande d'information sur l'assurance santé",
    time: "Hier à 10:15",
  },
]
