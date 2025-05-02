import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Chart, ChartLine } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function GoalsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Gestion des Objectifs et Stratégie</h2>
        <div className="flex items-center gap-2">
          <Select defaultValue="quarter">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="quarter">Trimestre</SelectItem>
              <SelectItem value="year">Année</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Département" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous</SelectItem>
              <SelectItem value="sales">Ventes</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="hr">RH</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Progression des Objectifs</CardTitle>
        </CardHeader>
        <CardContent>
          <Chart>
            <ChartLine
              data={progressionData}
              xKey="quarter"
              yKeys={["ventes", "marketing", "finance", "rh"]}
              colors={["#8b5cf6", "#a78bfa", "#c4b5fd", "#ddd6fe"]}
            />
          </Chart>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Objectifs en Cours</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="p-2 font-medium">Objectif</th>
                  <th className="p-2 font-medium">Département</th>
                  <th className="p-2 font-medium">Cible</th>
                  <th className="p-2 font-medium">Actuel</th>
                  <th className="p-2 font-medium">Progression</th>
                  <th className="p-2 font-medium">Échéance</th>
                  <th className="p-2 font-medium">Jours Restants</th>
                  <th className="p-2 font-medium">Statut</th>
                </tr>
              </thead>
              <tbody>
                {goalsData.map((goal, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2">{goal.name}</td>
                    <td className="p-2">{goal.department}</td>
                    <td className="p-2">{goal.target}</td>
                    <td className="p-2">{goal.current}</td>
                    <td className="p-2 w-[150px]">
                      <div className="flex items-center gap-2">
                        <Progress value={goal.progress} className="h-2" />
                        <span className="text-xs font-medium">{goal.progress}%</span>
                      </div>
                    </td>
                    <td className="p-2">{goal.deadline}</td>
                    <td className="p-2">{goal.daysLeft}</td>
                    <td className="p-2">
                      <Badge
                        variant="outline"
                        className={
                          goal.status === "Terminé"
                            ? "bg-green-100 text-green-700 hover:bg-green-100"
                            : "bg-blue-100 text-blue-700 hover:bg-blue-100"
                        }
                      >
                        {goal.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Objectifs Ventes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">83%</div>
            <p className="text-xs text-muted-foreground">Progression moyenne</p>
            <Progress value={83} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Objectifs Marketing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-muted-foreground">Progression moyenne</p>
            <Progress value={68} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Objectifs Finance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">53%</div>
            <p className="text-xs text-muted-foreground">Progression moyenne</p>
            <Progress value={53} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Objectifs RH</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">70%</div>
            <p className="text-xs text-muted-foreground">Progression moyenne</p>
            <Progress value={70} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

const progressionData = [
  { quarter: "Q1", ventes: 82, marketing: 65, finance: 45, rh: 60 },
  { quarter: "Q2", ventes: 90, marketing: 72, finance: 50, rh: 68 },
  { quarter: "Q3", ventes: 90, marketing: 75, finance: 55, rh: 75 },
  { quarter: "Q4", ventes: 70, marketing: 60, finance: 53, rh: 70 },
]

const goalsData = [
  {
    name: "Objectif Q1",
    department: "Ventes",
    target: "1,2M€",
    current: "980 000€",
    progress: 82,
    deadline: "31/03/2023",
    daysLeft: 0,
    status: "Terminé",
  },
  {
    name: "Objectif Q2",
    department: "Ventes",
    target: "1,5M€",
    current: "1,35M€",
    progress: 90,
    deadline: "30/06/2023",
    daysLeft: 0,
    status: "Terminé",
  },
  {
    name: "Objectif Q3",
    department: "Ventes",
    target: "1,8M€",
    current: "1,62M€",
    progress: 90,
    deadline: "30/09/2023",
    daysLeft: 0,
    status: "Terminé",
  },
  {
    name: "Objectif Q4",
    department: "Ventes",
    target: "2M€",
    current: "1,4M€",
    progress: 70,
    deadline: "31/12/2023",
    daysLeft: 45,
    status: "En cours",
  },
  {
    name: "Campagne Email Q4",
    department: "Marketing",
    target: "25%",
    current: "18%",
    progress: 72,
    deadline: "15/12/2023",
    daysLeft: 30,
    status: "En cours",
  },
  {
    name: "Acquisition Réseaux Sociaux",
    department: "Marketing",
    target: "5000",
    current: "3200",
    progress: 64,
    deadline: "31/12/2023",
    daysLeft: 45,
    status: "En cours",
  },
  {
    name: "Réduction des coûts opérationnels",
    department: "Finance",
    target: "15%",
    current: "8%",
    progress: 53,
    deadline: "31/12/2023",
    daysLeft: 45,
    status: "En cours",
  },
  {
    name: "Recrutement nouveaux commerciaux",
    department: "RH",
    target: "10",
    current: "7",
    progress: 70,
    deadline: "15/01/2024",
    daysLeft: 60,
    status: "En cours",
  },
]
