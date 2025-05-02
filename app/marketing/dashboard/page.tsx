import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUp, BarChart3, Calendar, LineChart, Mail, Search, Share2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Chart, ChartBar, ChartLine } from "@/components/ui/chart"

export default function MarketingDashboard() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Tableau de Bord Marketing</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Rechercher..." className="w-[200px] pl-8 md:w-[300px]" />
          </div>
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
            <span className="sr-only">Calendrier</span>
          </Button>
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
            <AvatarFallback>MK</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Campagnes actives</CardTitle>
            <BarChart3 className="h-4 w-4 text-sky-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <span className="text-green-500 flex items-center mr-1">
                <ArrowUp className="h-3 w-3 mr-1" />
                20%
              </span>
              depuis le mois dernier
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux d'ouverture emails</CardTitle>
            <Mail className="h-4 w-4 text-sky-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.8%</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <span className="text-green-500 flex items-center mr-1">
                <ArrowUp className="h-3 w-3 mr-1" />
                3.2%
              </span>
              depuis le mois dernier
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nouveaux prospects</CardTitle>
            <LineChart className="h-4 w-4 text-sky-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <span className="text-green-500 flex items-center mr-1">
                <ArrowUp className="h-3 w-3 mr-1" />
                18%
              </span>
              depuis le mois dernier
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chiffre d'affaires</CardTitle>
            <Share2 className="h-4 w-4 text-sky-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">185 000 €</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <span className="text-green-500 flex items-center mr-1">
                <ArrowUp className="h-3 w-3 mr-1" />
                12%
              </span>
              depuis le mois dernier
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="campaigns">Campagnes</TabsTrigger>
          <TabsTrigger value="analytics">Analytiques</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Performance des Campagnes</CardTitle>
              </CardHeader>
              <CardContent>
                <Chart>
                  <ChartBar
                    data={campaignPerformanceData}
                    xKey="name"
                    yKeys={["reach", "conversion"]}
                    colors={["#0ea5e9", "#38bdf8"]}
                  />
                </Chart>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Événements à venir</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="bg-sky-100 text-sky-700 rounded-md p-2 text-center min-w-[60px]">
                        <div className="text-xs font-medium">{event.month}</div>
                        <div className="text-lg font-bold">{event.day}</div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{event.title}</p>
                        <p className="text-xs text-muted-foreground">{event.description}</p>
                        <Badge variant="outline" className="text-xs">
                          {event.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Campagnes Récentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="p-2 font-medium">Nom</th>
                      <th className="p-2 font-medium">Type</th>
                      <th className="p-2 font-medium">Date</th>
                      <th className="p-2 font-medium">Revenus</th>
                      <th className="p-2 font-medium">Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentCampaigns.map((campaign, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2">{campaign.name}</td>
                        <td className="p-2">{campaign.type}</td>
                        <td className="p-2">{campaign.date}</td>
                        <td className="p-2">{campaign.revenue}</td>
                        <td className="p-2">
                          <Badge
                            variant="outline"
                            className={
                              campaign.status === "En cours"
                                ? "bg-green-100 text-green-700 hover:bg-green-100"
                                : campaign.status === "Planifiée"
                                  ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-100"
                            }
                          >
                            {campaign.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Détail des Campagnes</CardTitle>
            </CardHeader>
            <CardContent>
              <Chart>
                <ChartLine
                  data={campaignDetailData}
                  xKey="month"
                  yKeys={["email", "social", "search"]}
                  colors={["#0ea5e9", "#38bdf8", "#7dd3fc"]}
                />
              </Chart>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytiques Marketing</CardTitle>
            </CardHeader>
            <CardContent>
              <Chart>
                <ChartLine
                  data={analyticsData}
                  xKey="month"
                  yKeys={["visitors", "leads", "conversions"]}
                  colors={["#0ea5e9", "#38bdf8", "#7dd3fc"]}
                />
              </Chart>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const campaignPerformanceData = [
  { name: "Email", reach: 5200, conversion: 780 },
  { name: "Social", reach: 8500, conversion: 680 },
  { name: "Search", reach: 3800, conversion: 570 },
  { name: "Display", reach: 6200, conversion: 310 },
  { name: "Events", reach: 2100, conversion: 420 },
]

const upcomingEvents = [
  {
    month: "Mai",
    day: "15",
    title: "Salon de l'Assurance",
    description: "Présentation des nouvelles offres d'assurance vie",
    type: "Salon",
  },
  {
    month: "Mai",
    day: "22",
    title: "Webinaire Assurance Auto",
    description: "Présentation des avantages de nos offres auto",
    type: "Webinaire",
  },
  {
    month: "Juin",
    day: "05",
    title: "Conférence Digitale",
    description: "Transformation digitale dans l'assurance",
    type: "Conférence",
  },
]

const recentCampaigns = [
  {
    name: "Offre Spéciale Été",
    type: "Email",
    date: "01/05/2023",
    revenue: "45 000 €",
    status: "En cours",
  },
  {
    name: "Campagne Réseaux Sociaux",
    type: "Social",
    date: "15/04/2023",
    revenue: "32 000 €",
    status: "En cours",
  },
  {
    name: "Webinaire Assurance Habitation",
    type: "Événement",
    date: "10/06/2023",
    revenue: "0 €",
    status: "Planifiée",
  },
  {
    name: "Campagne Google Ads",
    type: "PPC",
    date: "01/04/2023",
    revenue: "28 000 €",
    status: "Terminée",
  },
  {
    name: "Newsletter Mensuelle",
    type: "Email",
    date: "01/05/2023",
    revenue: "15 000 €",
    status: "En cours",
  },
]

const campaignDetailData = [
  { month: "Jan", email: 2400, social: 1800, search: 1200 },
  { month: "Fév", email: 2800, social: 2100, search: 1400 },
  { month: "Mar", email: 3200, social: 2500, search: 1600 },
  { month: "Avr", email: 3600, social: 2800, search: 1800 },
  { month: "Mai", email: 4000, social: 3200, search: 2000 },
  { month: "Juin", email: 3800, social: 3000, search: 1900 },
]

const analyticsData = [
  { month: "Jan", visitors: 5000, leads: 1200, conversions: 350 },
  { month: "Fév", visitors: 5500, leads: 1300, conversions: 380 },
  { month: "Mar", visitors: 6000, leads: 1450, conversions: 420 },
  { month: "Avr", visitors: 6500, leads: 1600, conversions: 480 },
  { month: "Mai", visitors: 7000, leads: 1750, conversions: 520 },
  { month: "Juin", visitors: 7500, leads: 1900, conversions: 580 },
]
