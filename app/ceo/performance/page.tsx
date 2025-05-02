import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Chart, ChartBar, ChartLine } from "@/components/ui/chart"
import { Progress } from "@/components/ui/progress"

export default function PerformancePage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Analyse des Performances des Équipes</h2>
        <div className="flex items-center gap-2">
          <Select defaultValue="quarter">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Mois</SelectItem>
              <SelectItem value="quarter">Trimestre</SelectItem>
              <SelectItem value="year">Année</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performances Individuelles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="p-2 font-medium">Commercial</th>
                  <th className="p-2 font-medium">Contrats Signés</th>
                  <th className="p-2 font-medium">Taux de Réussite</th>
                  <th className="p-2 font-medium">Valeur Totale</th>
                  <th className="p-2 font-medium">Performance</th>
                </tr>
              </thead>
              <tbody>
                {performanceData.map((person, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2">{person.name}</td>
                    <td className="p-2">{person.contracts}</td>
                    <td className="p-2">{person.successRate}%</td>
                    <td className="p-2">{person.totalValue} €</td>
                    <td className="p-2 w-[200px]">
                      <div className="flex items-center gap-2">
                        <Progress value={person.performance} className="h-2" />
                        <span className="text-xs font-medium">{person.performance}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="contracts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="contracts">Contrats par Commercial</TabsTrigger>
          <TabsTrigger value="success">Taux de Réussite</TabsTrigger>
          <TabsTrigger value="quarterly">Comparaison Trimestrielle</TabsTrigger>
          <TabsTrigger value="marketing">Campagnes Marketing</TabsTrigger>
        </TabsList>
        <TabsContent value="contracts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contrats par Commercial</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Chart>
                <ChartBar data={performanceData} xKey="name" yKeys={["contracts"]} colors={["#8b5cf6"]} />
              </Chart>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="success" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Taux de Réussite</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Chart>
                <ChartBar data={performanceData} xKey="name" yKeys={["successRate"]} colors={["#8b5cf6"]} />
              </Chart>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="quarterly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Comparaison Trimestrielle</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Chart>
                <ChartLine
                  data={quarterlyData}
                  xKey="quarter"
                  yKeys={["equipe1", "equipe2", "equipe3"]}
                  colors={["#8b5cf6", "#a78bfa", "#c4b5fd"]}
                />
              </Chart>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="marketing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Campagnes Marketing</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Chart>
                <ChartBar data={marketingData} xKey="type" yKeys={["taux", "roi"]} colors={["#8b5cf6", "#c4b5fd"]} />
              </Chart>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const performanceData = [
  { name: "Sophie Martin", contracts: 52, successRate: 75, totalValue: "520 000", performance: 95 },
  { name: "Thomas Dubois", contracts: 48, successRate: 72, totalValue: "480 000", performance: 88 },
  { name: "Julie Leroy", contracts: 45, successRate: 70, totalValue: "450 000", performance: 82 },
  { name: "Pierre Moreau", contracts: 38, successRate: 68, totalValue: "420 000", performance: 76 },
  { name: "Emma Bernard", contracts: 31, successRate: 65, totalValue: "380 000", performance: 70 },
]

const quarterlyData = [
  { quarter: "Q1", equipe1: 320000, equipe2: 280000, equipe3: 350000 },
  { quarter: "Q2", equipe1: 380000, equipe2: 320000, equipe3: 420000 },
  { quarter: "Q3", equipe1: 420000, equipe2: 380000, equipe3: 460000 },
  { quarter: "Q4", equipe1: 480000, equipe2: 420000, equipe3: 500000 },
]

const marketingData = [
  { type: "Email", taux: 24, roi: 320 },
  { type: "Social", taux: 18, roi: 280 },
  { type: "Content", taux: 15, roi: 240 },
  { type: "Events", taux: 32, roi: 380 },
]
