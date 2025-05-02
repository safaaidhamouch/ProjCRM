"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowDown, ArrowUp, Download, Filter, Search } from "lucide-react"
import { Chart, ChartLine } from "@/components/ui/chart"

export default function KPIsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [periodFilter, setPeriodFilter] = useState("6months")

  const filteredKPIs = kpis.filter((kpi) => {
    const matchesSearch = kpi.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || kpi.type === typeFilter
    return matchesSearch && matchesType
  })

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Indicateurs de Performance (KPIs)</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            Exporter
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-2 md:justify-between">
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher un KPI..."
            className="pl-8 w-full md:w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="social">Réseaux Sociaux</SelectItem>
              <SelectItem value="event">Événements</SelectItem>
              <SelectItem value="web">Web</SelectItem>
            </SelectContent>
          </Select>
          <Select value={periodFilter} onValueChange={setPeriodFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">1 mois</SelectItem>
              <SelectItem value="3months">3 mois</SelectItem>
              <SelectItem value="6months">6 mois</SelectItem>
              <SelectItem value="1year">1 an</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="email" className="space-y-4">
        <TabsList>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="social">Réseaux Sociaux</TabsTrigger>
          <TabsTrigger value="event">Événements</TabsTrigger>
          <TabsTrigger value="web">Web</TabsTrigger>
        </TabsList>
        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Évolution des KPIs Email</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Chart>
                <ChartLine
                  data={emailChartData}
                  xKey="month"
                  yKeys={["openRate", "clickRate", "conversionRate"]}
                  colors={["#0ea5e9", "#38bdf8", "#7dd3fc"]}
                />
              </Chart>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Détails des KPIs Email</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="p-4 font-medium">Nom KPI</th>
                      <th className="p-4 font-medium">Valeur</th>
                      <th className="p-4 font-medium">Évolution</th>
                      <th className="p-4 font-medium">Date</th>
                      <th className="p-4 font-medium">Type</th>
                      <th className="p-4 font-medium">Campagne</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredKPIs
                      .filter((kpi) => kpi.type === "email")
                      .map((kpi, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-4">{kpi.name}</td>
                          <td className="p-4">{kpi.value}</td>
                          <td className="p-4">
                            <div className="flex items-center">
                              {kpi.evolution > 0 ? (
                                <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                              ) : (
                                <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                              )}
                              {Math.abs(kpi.evolution)}%
                            </div>
                          </td>
                          <td className="p-4">{kpi.date}</td>
                          <td className="p-4">
                            <Badge variant="outline" className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                              {kpi.typeLabel}
                            </Badge>
                          </td>
                          <td className="p-4">{kpi.campaign}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="social" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Évolution des KPIs Réseaux Sociaux</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Chart>
                <ChartLine
                  data={socialChartData}
                  xKey="month"
                  yKeys={["engagement", "reach", "followers"]}
                  colors={["#0ea5e9", "#38bdf8", "#7dd3fc"]}
                />
              </Chart>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Détails des KPIs Réseaux Sociaux</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="p-4 font-medium">Nom KPI</th>
                      <th className="p-4 font-medium">Valeur</th>
                      <th className="p-4 font-medium">Évolution</th>
                      <th className="p-4 font-medium">Date</th>
                      <th className="p-4 font-medium">Type</th>
                      <th className="p-4 font-medium">Campagne</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredKPIs
                      .filter((kpi) => kpi.type === "social")
                      .map((kpi, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-4">{kpi.name}</td>
                          <td className="p-4">{kpi.value}</td>
                          <td className="p-4">
                            <div className="flex items-center">
                              {kpi.evolution > 0 ? (
                                <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                              ) : (
                                <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                              )}
                              {Math.abs(kpi.evolution)}%
                            </div>
                          </td>
                          <td className="p-4">{kpi.date}</td>
                          <td className="p-4">
                            <Badge variant="outline" className="bg-purple-100 text-purple-700 hover:bg-purple-100">
                              {kpi.typeLabel}
                            </Badge>
                          </td>
                          <td className="p-4">{kpi.campaign}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="event" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Évolution des KPIs Événements</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Chart>
                <ChartLine
                  data={eventChartData}
                  xKey="month"
                  yKeys={["attendance", "leads", "conversion"]}
                  colors={["#0ea5e9", "#38bdf8", "#7dd3fc"]}
                />
              </Chart>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Détails des KPIs Événements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="p-4 font-medium">Nom KPI</th>
                      <th className="p-4 font-medium">Valeur</th>
                      <th className="p-4 font-medium">Évolution</th>
                      <th className="p-4 font-medium">Date</th>
                      <th className="p-4 font-medium">Type</th>
                      <th className="p-4 font-medium">Campagne</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredKPIs
                      .filter((kpi) => kpi.type === "event")
                      .map((kpi, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-4">{kpi.name}</td>
                          <td className="p-4">{kpi.value}</td>
                          <td className="p-4">
                            <div className="flex items-center">
                              {kpi.evolution > 0 ? (
                                <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                              ) : (
                                <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                              )}
                              {Math.abs(kpi.evolution)}%
                            </div>
                          </td>
                          <td className="p-4">{kpi.date}</td>
                          <td className="p-4">
                            <Badge variant="outline" className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                              {kpi.typeLabel}
                            </Badge>
                          </td>
                          <td className="p-4">{kpi.campaign}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="web" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Évolution des KPIs Web</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Chart>
                <ChartLine
                  data={webChartData}
                  xKey="month"
                  yKeys={["visitors", "pageviews", "conversion"]}
                  colors={["#0ea5e9", "#38bdf8", "#7dd3fc"]}
                />
              </Chart>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Détails des KPIs Web</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="p-4 font-medium">Nom KPI</th>
                      <th className="p-4 font-medium">Valeur</th>
                      <th className="p-4 font-medium">Évolution</th>
                      <th className="p-4 font-medium">Date</th>
                      <th className="p-4 font-medium">Type</th>
                      <th className="p-4 font-medium">Campagne</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredKPIs
                      .filter((kpi) => kpi.type === "web")
                      .map((kpi, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-4">{kpi.name}</td>
                          <td className="p-4">{kpi.value}</td>
                          <td className="p-4">
                            <div className="flex items-center">
                              {kpi.evolution > 0 ? (
                                <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                              ) : (
                                <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                              )}
                              {Math.abs(kpi.evolution)}%
                            </div>
                          </td>
                          <td className="p-4">{kpi.date}</td>
                          <td className="p-4">
                            <Badge variant="outline" className="bg-green-100 text-green-700 hover:bg-green-100">
                              {kpi.typeLabel}
                            </Badge>
                          </td>
                          <td className="p-4">{kpi.campaign}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const emailChartData = [
  { month: "Jan", openRate: 24.5, clickRate: 8.2, conversionRate: 2.1 },
  { month: "Fév", openRate: 25.2, clickRate: 8.5, conversionRate: 2.3 },
  { month: "Mar", openRate: 26.8, clickRate: 9.1, conversionRate: 2.5 },
  { month: "Avr", openRate: 27.5, clickRate: 9.8, conversionRate: 2.8 },
  { month: "Mai", openRate: 28.4, clickRate: 10.2, conversionRate: 3.1 },
  { month: "Juin", openRate: 29.2, clickRate: 10.8, conversionRate: 3.4 },
]

const socialChartData = [
  { month: "Jan", engagement: 3.2, reach: 12500, followers: 4200 },
  { month: "Fév", engagement: 3.5, reach: 13200, followers: 4350 },
  { month: "Mar", engagement: 3.8, reach: 14100, followers: 4500 },
  { month: "Avr", engagement: 4.1, reach: 15200, followers: 4680 },
  { month: "Mai", engagement: 4.5, reach: 16500, followers: 4850 },
  { month: "Juin", engagement: 4.8, reach: 17800, followers: 5100 },
]

const eventChartData = [
  { month: "Jan", attendance: 85, leads: 32, conversion: 12 },
  { month: "Fév", attendance: 92, leads: 38, conversion: 15 },
  { month: "Mar", attendance: 88, leads: 35, conversion: 14 },
  { month: "Avr", attendance: 95, leads: 42, conversion: 18 },
  { month: "Mai", attendance: 105, leads: 48, conversion: 22 },
  { month: "Juin", attendance: 110, leads: 52, conversion: 25 },
]

const webChartData = [
  { month: "Jan", visitors: 8500, pageviews: 32000, conversion: 1.8 },
  { month: "Fév", visitors: 9200, pageviews: 35000, conversion: 2.0 },
  { month: "Mar", visitors: 9800, pageviews: 38000, conversion: 2.2 },
  { month: "Avr", visitors: 10500, pageviews: 42000, conversion: 2.5 },
  { month: "Mai", visitors: 11200, pageviews: 45000, conversion: 2.8 },
  { month: "Juin", visitors: 12000, pageviews: 48000, conversion: 3.1 },
]

const kpis = [
  {
    name: "Taux d'ouverture",
    value: "28.4%",
    evolution: 3.2,
    date: "31/05/2023",
    type: "email",
    typeLabel: "Email",
    campaign: "Offre Spéciale Été",
  },
  {
    name: "Taux de clic",
    value: "10.2%",
    evolution: 4.1,
    date: "31/05/2023",
    type: "email",
    typeLabel: "Email",
    campaign: "Offre Spéciale Été",
  },
  {
    name: "Taux de conversion",
    value: "3.1%",
    evolution: 10.7,
    date: "31/05/2023",
    type: "email",
    typeLabel: "Email",
    campaign: "Offre Spéciale Été",
  },
  {
    name: "Taux de désabonnement",
    value: "0.8%",
    evolution: -5.2,
    date: "31/05/2023",
    type: "email",
    typeLabel: "Email",
    campaign: "Newsletter Mensuelle",
  },
  {
    name: "Taux d'engagement",
    value: "4.5%",
    evolution: 8.3,
    date: "31/05/2023",
    type: "social",
    typeLabel: "Réseaux Sociaux",
    campaign: "Campagne Réseaux Sociaux",
  },
  {
    name: "Portée",
    value: "16 500",
    evolution: 12.5,
    date: "31/05/2023",
    type: "social",
    typeLabel: "Réseaux Sociaux",
    campaign: "Campagne Réseaux Sociaux",
  },
  {
    name: "Nouveaux abonnés",
    value: "250",
    evolution: 15.2,
    date: "31/05/2023",
    type: "social",
    typeLabel: "Réseaux Sociaux",
    campaign: "Campagne Réseaux Sociaux",
  },
  {
    name: "Taux de participation",
    value: "85%",
    evolution: 5.8,
    date: "17/05/2023",
    type: "event",
    typeLabel: "Événement",
    campaign: "Salon de l'Assurance",
  },
  {
    name: "Leads générés",
    value: "48",
    evolution: 14.3,
    date: "17/05/2023",
    type: "event",
    typeLabel: "Événement",
    campaign: "Salon de l'Assurance",
  },
  {
    name: "Taux de conversion",
    value: "22%",
    evolution: 10.0,
    date: "17/05/2023",
    type: "event",
    typeLabel: "Événement",
    campaign: "Salon de l'Assurance",
  },
  {
    name: "Visiteurs uniques",
    value: "11 200",
    evolution: 6.7,
    date: "31/05/2023",
    type: "web",
    typeLabel: "Web",
    campaign: "Global",
  },
  {
    name: "Pages vues",
    value: "45 000",
    evolution: 7.1,
    date: "31/05/2023",
    type: "web",
    typeLabel: "Web",
    campaign: "Global",
  },
  {
    name: "Taux de rebond",
    value: "38%",
    evolution: -3.2,
    date: "31/05/2023",
    type: "web",
    typeLabel: "Web",
    campaign: "Global",
  },
  {
    name: "Taux de conversion",
    value: "2.8%",
    evolution: 12.0,
    date: "31/05/2023",
    type: "web",
    typeLabel: "Web",
    campaign: "Global",
  },
]
