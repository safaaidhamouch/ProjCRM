import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Building2,
  ClipboardList,
  RefreshCw,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Calendar,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ContractsBarChart, ContractsPieChart, ClaimsLineChart } from "@/components/dashboard-charts"

export default function ERPDashboard() {
  // Sample data for charts and statistics
  const contractsChartData = [
    { name: "Jan", "Nouveaux contrats": 12, Renouvellements: 8 },
    { name: "Fév", "Nouveaux contrats": 19, Renouvellements: 15 },
    { name: "Mar", "Nouveaux contrats": 15, Renouvellements: 12 },
    { name: "Avr", "Nouveaux contrats": 17, Renouvellements: 14 },
    { name: "Mai", "Nouveaux contrats": 22, Renouvellements: 18 },
    { name: "Juin", "Nouveaux contrats": 24, Renouvellements: 19 },
    { name: "Juil", "Nouveaux contrats": 19, Renouvellements: 15 },
    { name: "Août", "Nouveaux contrats": 21, Renouvellements: 17 },
    { name: "Sep", "Nouveaux contrats": 18, Renouvellements: 14 },
    { name: "Oct", "Nouveaux contrats": 23, Renouvellements: 19 },
    { name: "Nov", "Nouveaux contrats": 20, Renouvellements: 16 },
    { name: "Déc", "Nouveaux contrats": 25, Renouvellements: 20 },
  ]

  const contractsPieData = [
    { name: "Responsabilité civile", value: 35 },
    { name: "Multirisque", value: 25 },
    { name: "Flotte auto", value: 15 },
    { name: "Santé collective", value: 20 },
    { name: "Autres", value: 5 },
  ]

  const claimsChartData = [
    { name: "Jan", "Sinistres déclarés": 5 },
    { name: "Fév", "Sinistres déclarés": 8 },
    { name: "Mar", "Sinistres déclarés": 6 },
    { name: "Avr", "Sinistres déclarés": 9 },
    { name: "Mai", "Sinistres déclarés": 7 },
    { name: "Juin", "Sinistres déclarés": 10 },
    { name: "Juil", "Sinistres déclarés": 8 },
    { name: "Août", "Sinistres déclarés": 7 },
    { name: "Sep", "Sinistres déclarés": 9 },
    { name: "Oct", "Sinistres déclarés": 6 },
    { name: "Nov", "Sinistres déclarés": 8 },
    { name: "Déc", "Sinistres déclarés": 7 },
  ]

  const renewalStats = [
    {
      title: "À renouveler ce mois",
      value: "24",
      change: "+8%",
      trend: "up",
      icon: Calendar,
    },
    {
      title: "Taux de renouvellement",
      value: "87%",
      change: "+2%",
      trend: "up",
      icon: RefreshCw,
    },
    {
      title: "Contrats expirés",
      value: "3",
      change: "-5%",
      trend: "down",
      icon: ClipboardList,
    },
  ]

  const quickStats = [
    {
      title: "Entreprises",
      value: "128",
      change: "+12%",
      trend: "up",
      icon: Building2,
    },
    {
      title: "Contrats actifs",
      value: "342",
      change: "+5%",
      trend: "up",
      icon: ClipboardList,
    },
    {
      title: "Sinistres en cours",
      value: "17",
      change: "-3%",
      trend: "down",
      icon: AlertTriangle,
    },
    {
      title: "Contacts",
      value: "256",
      change: "+8%",
      trend: "up",
      icon: Users,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tableau de bord ERP</h1>
          <p className="text-muted-foreground">Vue d'ensemble de votre activité d'assurance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Exporter</Button>
          <Button>Nouveau contrat</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {quickStats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
                  )}
                  <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>{stat.change}</span> depuis
                  le mois dernier
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="renewals">Renouvellements</TabsTrigger>
          <TabsTrigger value="claims">Sinistres</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Évolution des contrats</CardTitle>
                <CardDescription>Nouveaux contrats et renouvellements sur les 12 derniers mois</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ContractsBarChart data={contractsChartData} />
              </CardContent>
            </Card>

            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Contrats par type</CardTitle>
                <CardDescription>Répartition des contrats actifs</CardDescription>
              </CardHeader>
              <CardContent>
                <ContractsPieChart data={contractsPieData} />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Activité récente</CardTitle>
                <CardDescription>Les dernières actions effectuées</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      action: "Nouveau contrat",
                      company: "Dupont Industrie",
                      date: "Il y a 2 heures",
                      type: "Multirisque",
                    },
                    { action: "Renouvellement", company: "Martin & Fils", date: "Il y a 5 heures", type: "RC Pro" },
                    {
                      action: "Déclaration sinistre",
                      company: "Tech Solutions",
                      date: "Hier, 14:30",
                      type: "Cyber-risques",
                    },
                    {
                      action: "Modification contrat",
                      company: "Boulangerie Moreau",
                      date: "Hier, 10:15",
                      type: "Multirisque",
                    },
                    { action: "Nouvelle entreprise", company: "Green Energy", date: "22/04/2023", type: "-" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0">
                      <div>
                        <p className="font-medium">{item.action}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.company} • {item.type}
                        </p>
                      </div>
                      <div className="text-sm text-muted-foreground">{item.date}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contrats à suivre</CardTitle>
                <CardDescription>Contrats nécessitant votre attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { company: "Dupont Industrie", issue: "Renouvellement dans 7 jours", priority: "high" },
                    { company: "Tech Solutions", issue: "Document manquant", priority: "medium" },
                    { company: "Martin & Fils", issue: "Paiement en retard", priority: "high" },
                    { company: "Green Energy", issue: "Mise à jour requise", priority: "low" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 border-b pb-2 last:border-0">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          item.priority === "high"
                            ? "bg-red-500"
                            : item.priority === "medium"
                              ? "bg-amber-500"
                              : "bg-green-500"
                        }`}
                      />
                      <div>
                        <p className="font-medium">{item.company}</p>
                        <p className="text-sm text-muted-foreground">{item.issue}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="renewals" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {renewalStats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <Card key={i}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground flex items-center mt-1">
                      {stat.trend === "up" ? (
                        <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                      ) : (
                        <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
                      )}
                      <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>{stat.change}</span>{" "}
                      depuis le mois dernier
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Renouvellements à venir</CardTitle>
              <CardDescription>Contrats à renouveler dans les 30 prochains jours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 gap-4 p-4 font-medium">
                    <div>Entreprise</div>
                    <div>Type de contrat</div>
                    <div>Date d'expiration</div>
                    <div>Prime actuelle</div>
                    <div className="text-right">Actions</div>
                  </div>
                  {[
                    { company: "Dupont Industrie", type: "Multirisque", date: "15/05/2023", premium: "4 250 €" },
                    { company: "Martin & Fils", type: "RC Pro", date: "18/05/2023", premium: "1 800 €" },
                    { company: "Tech Solutions", type: "Cyber-risques", date: "22/05/2023", premium: "3 600 €" },
                    { company: "Boulangerie Moreau", type: "Multirisque", date: "01/06/2023", premium: "1 200 €" },
                    { company: "Green Energy", type: "RC Pro", date: "05/06/2023", premium: "2 400 €" },
                  ].map((item, i) => (
                    <div key={i} className="grid grid-cols-5 gap-4 border-t p-4">
                      <div className="font-medium">{item.company}</div>
                      <div>{item.type}</div>
                      <div>{item.date}</div>
                      <div>{item.premium}</div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          Détails
                        </Button>
                        <Button size="sm">Renouveler</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="claims" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Évolution des sinistres</CardTitle>
              <CardDescription>Sinistres déclarés sur les 12 derniers mois</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ClaimsLineChart data={claimsChartData} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sinistres récents</CardTitle>
              <CardDescription>Les derniers sinistres déclarés</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 gap-4 p-4 font-medium">
                    <div>Référence</div>
                    <div>Entreprise</div>
                    <div>Type</div>
                    <div>Statut</div>
                    <div className="text-right">Actions</div>
                  </div>
                  {[
                    { ref: "SIN-2023-042", company: "Tech Solutions", type: "Dégât des eaux", status: "En cours" },
                    { ref: "SIN-2023-041", company: "Dupont Industrie", type: "Bris de machine", status: "En attente" },
                    { ref: "SIN-2023-040", company: "Martin & Fils", type: "Vol", status: "Expertise" },
                    { ref: "SIN-2023-039", company: "Boulangerie Moreau", type: "Incendie", status: "Indemnisé" },
                    { ref: "SIN-2023-038", company: "Green Energy", type: "RC", status: "Clôturé" },
                  ].map((item, i) => (
                    <div key={i} className="grid grid-cols-5 gap-4 border-t p-4">
                      <div className="font-medium">{item.ref}</div>
                      <div>{item.company}</div>
                      <div>{item.type}</div>
                      <div>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            item.status === "En cours"
                              ? "bg-blue-100 text-blue-800"
                              : item.status === "En attente"
                                ? "bg-amber-100 text-amber-800"
                                : item.status === "Expertise"
                                  ? "bg-purple-100 text-purple-800"
                                  : item.status === "Indemnisé"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          Détails
                        </Button>
                        <Button size="sm">Gérer</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
