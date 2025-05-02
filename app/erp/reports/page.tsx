"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, FileText, Plus, Search, Share2, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Chart } from "@/components/ui/chart"

export default function ReportsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [sortBy, setSortBy] = useState("recent")

  // Sample data for reports
  const reports = [
    {
      id: "REP-001",
      name: "Rapport Trimestriel - Q3 2023",
      type: "Financier",
      created: "2023-10-05",
      author: "Jean Dupont",
      department: "Finance",
    },
    {
      id: "REP-002",
      name: "Analyse des Sinistres - Septembre 2023",
      type: "Sinistres",
      created: "2023-10-02",
      author: "Marie Laurent",
      department: "Sinistres",
    },
    {
      id: "REP-003",
      name: "Performance des Contrats - Q3 2023",
      type: "Contrats",
      created: "2023-10-01",
      author: "Pierre Martin",
      department: "Commercial",
    },
    {
      id: "REP-004",
      name: "Rapport de Renouvellements - Octobre 2023",
      type: "Renouvellements",
      created: "2023-09-28",
      author: "Sophie Bernard",
      department: "Opérations",
    },
    {
      id: "REP-005",
      name: "Analyse des Risques - Q3 2023",
      type: "Risques",
      created: "2023-09-25",
      author: "Thomas Petit",
      department: "Risques",
    },
  ]

  // Filter reports based on search term and department
  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.author.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDepartment = departmentFilter === "all" || report.department.toLowerCase() === departmentFilter

    return matchesSearch && matchesDepartment
  })

  // Sort reports based on selected sort option
  const sortedReports = [...filteredReports].sort((a, b) => {
    switch (sortBy) {
      case "recent":
        return new Date(b.created).getTime() - new Date(a.created).getTime()
      case "oldest":
        return new Date(a.created).getTime() - new Date(b.created).getTime()
      case "name":
        return a.name.localeCompare(b.name)
      case "type":
        return a.type.localeCompare(b.type)
      default:
        return 0
    }
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Rapports & Analyses</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Partager
          </Button>
          <Button size="sm" className="bg-violet-600 hover:bg-violet-700">
            <Plus className="mr-2 h-4 w-4" />
            Nouveau Rapport
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">Tous les rapports</TabsTrigger>
          <TabsTrigger value="financial">Financiers</TabsTrigger>
          <TabsTrigger value="claims">Sinistres</TabsTrigger>
          <TabsTrigger value="contracts">Contrats</TabsTrigger>
          <TabsTrigger value="renewals">Renouvellements</TabsTrigger>
        </TabsList>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher un rapport..."
              className="w-full pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Département" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les départements</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="sinistres">Sinistres</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="opérations">Opérations</SelectItem>
                <SelectItem value="risques">Risques</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Plus récents</SelectItem>
                <SelectItem value="oldest">Plus anciens</SelectItem>
                <SelectItem value="name">Nom (A-Z)</SelectItem>
                <SelectItem value="type">Type</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="all" className="m-0">
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Liste des Rapports</CardTitle>
              <CardDescription>Consultez et gérez tous les rapports disponibles</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Nom du rapport</TableHead>
                      <TableHead className="hidden md:table-cell">Type</TableHead>
                      <TableHead className="hidden md:table-cell">Date de création</TableHead>
                      <TableHead className="hidden md:table-cell">Auteur</TableHead>
                      <TableHead>Département</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.id}</TableCell>
                        <TableCell>{report.name}</TableCell>
                        <TableCell className="hidden md:table-cell">{report.type}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          {new Date(report.created).toLocaleDateString("fr-FR")}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{report.author}</TableCell>
                        <TableCell>{report.department}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              <FileText className="h-4 w-4" />
                              <span className="sr-only">Voir</span>
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Télécharger</span>
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Share2 className="h-4 w-4" />
                              <span className="sr-only">Partager</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other tab contents would be similar but with filtered data */}
        <TabsContent value="financial" className="m-0">
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Rapports Financiers</CardTitle>
              <CardDescription>Consultez les rapports financiers</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Nom du rapport</TableHead>
                      <TableHead className="hidden md:table-cell">Type</TableHead>
                      <TableHead className="hidden md:table-cell">Date de création</TableHead>
                      <TableHead className="hidden md:table-cell">Auteur</TableHead>
                      <TableHead>Département</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedReports
                      .filter((report) => report.type === "Financier")
                      .map((report) => (
                        <TableRow key={report.id}>
                          <TableCell className="font-medium">{report.id}</TableCell>
                          <TableCell>{report.name}</TableCell>
                          <TableCell className="hidden md:table-cell">{report.type}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            {new Date(report.created).toLocaleDateString("fr-FR")}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{report.author}</TableCell>
                          <TableCell>{report.department}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm">
                                <FileText className="h-4 w-4" />
                                <span className="sr-only">Voir</span>
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                                <span className="sr-only">Télécharger</span>
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Share2 className="h-4 w-4" />
                                <span className="sr-only">Partager</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1 md:col-span-2 lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Rapports par type</CardTitle>
            <CardDescription>Distribution des rapports par catégorie</CardDescription>
          </CardHeader>
          <CardContent>
            <Chart
              type="pie"
              data={{
                labels: ["Financier", "Sinistres", "Contrats", "Renouvellements", "Risques"],
                datasets: [
                  {
                    data: [
                      reports.filter((r) => r.type === "Financier").length,
                      reports.filter((r) => r.type === "Sinistres").length,
                      reports.filter((r) => r.type === "Contrats").length,
                      reports.filter((r) => r.type === "Renouvellements").length,
                      reports.filter((r) => r.type === "Risques").length,
                    ],
                    backgroundColor: ["#9333ea", "#c084fc", "#a855f7", "#d8b4fe", "#f5d0fe"],
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "bottom",
                  },
                },
              }}
            />
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-2 lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Tendances des rapports</CardTitle>
            <CardDescription>Évolution du nombre de rapports générés</CardDescription>
          </CardHeader>
          <CardContent>
            <Chart
              type="line"
              data={{
                labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"],
                datasets: [
                  {
                    label: "Rapports générés",
                    data: [5, 8, 6, 9, 7, 10, 8, 7, 9, 12, 0, 0],
                    backgroundColor: "#9333ea",
                    borderColor: "#9333ea",
                    borderWidth: 2,
                  },
                ],
              }}
              options={{
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Rapports populaires</CardTitle>
            <CardDescription>Les rapports les plus consultés</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Analyse des Sinistres - Septembre 2023", views: 145, department: "Sinistres" },
                { name: "Rapport Trimestriel - Q3 2023", views: 132, department: "Finance" },
                { name: "Performance des Contrats - Q3 2023", views: 98, department: "Commercial" },
                { name: "Analyse des Risques - Q3 2023", views: 87, department: "Risques" },
                { name: "Rapport de Renouvellements - Octobre 2023", views: 76, department: "Opérations" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.department}</p>
                  </div>
                  <div className="text-sm font-medium">{item.views} vues</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Rapports récents</CardTitle>
            <CardDescription>Les derniers rapports générés</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sortedReports.slice(0, 5).map((report, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">{report.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {report.department} • {new Date(report.created).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    Voir
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
