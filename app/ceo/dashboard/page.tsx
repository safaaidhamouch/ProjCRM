import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUp, BarChart3, LineChart, PieChart, Users } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Chart, ChartArea, ChartBar, ChartPie } from "@/components/ui/chart"

export default function CEODashboard() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Tableau de Bord Stratégique</h2>
        <div className="flex items-center gap-2">
          <Select defaultValue="month">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Jour</SelectItem>
              <SelectItem value="week">Semaine</SelectItem>
              <SelectItem value="month">Mois</SelectItem>
              <SelectItem value="year">Année</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Type d'assurance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous</SelectItem>
              <SelectItem value="auto">Auto</SelectItem>
              <SelectItem value="home">Habitation</SelectItem>
              <SelectItem value="health">Santé</SelectItem>
              <SelectItem value="life">Vie</SelectItem>
              <SelectItem value="business">Entreprise</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nouveaux Contrats</CardTitle>
            <Users className="h-4 w-4 text-violet-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124</div>
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
            <CardTitle className="text-sm font-medium">Chiffre d'Affaires</CardTitle>
            <LineChart className="h-4 w-4 text-violet-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1 245 000 €</div>
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
            <CardTitle className="text-sm font-medium">Performance des Équipes</CardTitle>
            <BarChart3 className="h-4 w-4 text-violet-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
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
            <CardTitle className="text-sm font-medium">Taux de Conversion</CardTitle>
            <PieChart className="h-4 w-4 text-violet-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24%</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <span className="text-green-500 flex items-center mr-1">
                <ArrowUp className="h-3 w-3 mr-1" />
                2%
              </span>
              depuis le mois dernier
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">Évolution des Revenus</TabsTrigger>
          <TabsTrigger value="contracts">Répartition des Contrats</TabsTrigger>
          <TabsTrigger value="trends">Tendances du Marché</TabsTrigger>
        </TabsList>
        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Évolution des Revenus</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Chart>
                <ChartArea data={revenueData} xKey="mois" yKeys={["revenus"]} colors={["#7c3aed"]} />
              </Chart>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="contracts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Répartition des Contrats</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Chart>
                <ChartPie
                  data={contractsData}
                  nameKey="type"
                  dataKey="value"
                  colors={["#7c3aed", "#8b5cf6", "#a78bfa", "#c4b5fd", "#ddd6fe"]}
                />
              </Chart>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tendances du Marché</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Chart>
                <ChartBar
                  data={trendsData}
                  xKey="trimestre"
                  yKeys={["réel", "prévision"]}
                  colors={["#7c3aed", "#3b82f6"]}
                />
              </Chart>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const revenueData = [
  { mois: "Jan", revenus: 850000 },
  { mois: "Fév", revenus: 920000 },
  { mois: "Mar", revenus: 980000 },
  { mois: "Avr", revenus: 1050000 },
  { mois: "Mai", revenus: 1120000 },
  { mois: "Juin", revenus: 1180000 },
  { mois: "Juil", revenus: 1150000 },
  { mois: "Août", revenus: 1100000 },
  { mois: "Sep", revenus: 1180000 },
  { mois: "Oct", revenus: 1220000 },
  { mois: "Nov", revenus: 1280000 },
  { mois: "Déc", revenus: 1350000 },
]

const contractsData = [
  { type: "Auto", value: 35 },
  { type: "Habitation", value: 25 },
  { type: "Santé", value: 20 },
  { type: "Vie", value: 10 },
  { type: "Entreprise", value: 10 },
]

const trendsData = [
  { trimestre: "Q1", réel: 980000, prévision: 950000 },
  { trimestre: "Q2", réel: 1180000, prévision: 1150000 },
  { trimestre: "Q3", réel: 1180000, prévision: 1250000 },
  { trimestre: "Q4", réel: 1350000, prévision: 1400000 },
]
