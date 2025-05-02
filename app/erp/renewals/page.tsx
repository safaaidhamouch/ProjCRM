"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Calendar,
  Clock,
  Eye,
  Filter,
  Mail,
  Plus,
  RefreshCw,
  Search,
  User,
  FileText,
  Building,
  AlertCircle,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function RenewalsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"list" | "calendar" | "kanban">("list")

  // Calculate days left and filter renewals
  const renewalsWithDaysLeft = renewals.map((renewal) => {
    const expiryDate = new Date(renewal.expiryDate)
    const today = new Date()
    const diffTime = expiryDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return { ...renewal, daysLeft: diffDays }
  })

  const filteredRenewals = renewalsWithDaysLeft.filter((renewal) => {
    const matchesSearch =
      renewal.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      renewal.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      renewal.contact.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || renewal.status === statusFilter
    const matchesType = typeFilter === "all" || renewal.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  // Group renewals by status for Kanban view
  const renewalsByStatus = {
    urgent: filteredRenewals.filter((r) => r.status === "urgent"),
    upcoming: filteredRenewals.filter((r) => r.status === "upcoming"),
    normal: filteredRenewals.filter((r) => r.status === "normal"),
    processed: filteredRenewals.filter((r) => r.status === "processed"),
  }

  // Group renewals by month for Calendar view
  const months = ["Mai 2023", "Juin 2023", "Juillet 2023", "Août 2023"]
  const renewalsByMonth = {
    "Mai 2023": filteredRenewals.filter((r) => new Date(r.expiryDate).getMonth() === 4),
    "Juin 2023": filteredRenewals.filter((r) => new Date(r.expiryDate).getMonth() === 5),
    "Juillet 2023": filteredRenewals.filter((r) => new Date(r.expiryDate).getMonth() === 6),
    "Août 2023": filteredRenewals.filter((r) => new Date(r.expiryDate).getMonth() === 7),
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gestion des Renouvellements</h1>
          <p className="text-muted-foreground">Suivez et gérez les renouvellements de contrats</p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-violet-600 hover:bg-violet-700">
                <Plus className="mr-2 h-4 w-4" /> Nouveau renouvellement
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Ajouter un renouvellement</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="company" className="text-right">
                    Entreprise
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Sélectionner une entreprise" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dupont">Dupont Industrie</SelectItem>
                      <SelectItem value="martin">Martin & Fils</SelectItem>
                      <SelectItem value="tech">Tech Solutions</SelectItem>
                      <SelectItem value="boulangerie">Boulangerie Moreau</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="contract" className="text-right">
                    Contrat
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Sélectionner un contrat" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rc">RC Pro #12458</SelectItem>
                      <SelectItem value="multi">Multirisque #45789</SelectItem>
                      <SelectItem value="flotte">Flotte Auto #78542</SelectItem>
                      <SelectItem value="cyber">Cyber-risques #36521</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="expiry" className="text-right">
                    Date d'échéance
                  </Label>
                  <Input id="expiry" type="date" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="premium" className="text-right">
                    Prime actuelle
                  </Label>
                  <Input id="premium" className="col-span-3" placeholder="€" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="contact" className="text-right">
                    Contact
                  </Label>
                  <Input id="contact" className="col-span-3" placeholder="Nom du contact" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input id="email" type="email" className="col-span-3" placeholder="Email du contact" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    Téléphone
                  </Label>
                  <Input id="phone" className="col-span-3" placeholder="Téléphone du contact" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    Statut
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Sélectionner un statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="urgent">Urgent</SelectItem>
                      <SelectItem value="upcoming">À venir</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="processed">Traité</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Annuler</Button>
                <Button className="bg-violet-600 hover:bg-violet-700">Ajouter</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-2 md:justify-between">
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher un renouvellement..."
            className="pl-8 w-full md:w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
              <SelectItem value="upcoming">À venir</SelectItem>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="processed">Traité</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              <SelectItem value="RC Pro">RC Pro</SelectItem>
              <SelectItem value="Multirisque">Multirisque</SelectItem>
              <SelectItem value="Flotte Auto">Flotte Auto</SelectItem>
              <SelectItem value="Cyber-risques">Cyber-risques</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "list" | "calendar" | "kanban")}>
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="list">Liste</TabsTrigger>
            <TabsTrigger value="calendar">Calendrier</TabsTrigger>
            <TabsTrigger value="kanban">Kanban</TabsTrigger>
          </TabsList>
          <p className="text-sm text-muted-foreground">{filteredRenewals.length} renouvellements</p>
        </div>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Entreprise</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Échéance</TableHead>
                    <TableHead>Jours restants</TableHead>
                    <TableHead>Prime</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRenewals.map((renewal) => (
                    <TableRow key={renewal.id}>
                      <TableCell className="font-medium">{renewal.id}</TableCell>
                      <TableCell>{renewal.company}</TableCell>
                      <TableCell>{renewal.type}</TableCell>
                      <TableCell>{new Date(renewal.expiryDate).toLocaleDateString("fr-FR")}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={
                              renewal.daysLeft <= 7
                                ? "bg-red-100 text-red-700 hover:bg-red-100"
                                : renewal.daysLeft <= 30
                                  ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
                                  : "bg-green-100 text-green-700 hover:bg-green-100"
                            }
                          >
                            {renewal.daysLeft} jours
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>{renewal.premium}</TableCell>
                      <TableCell>{renewal.contact}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Voir les détails</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <RefreshCw className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Renouveler</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <Mail className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Envoyer un email</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <div className="grid gap-4">
            {months.map((month) => (
              <Card key={month}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-violet-600" />
                    {month}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {renewalsByMonth[month].length === 0 ? (
                    <div className="text-center py-4 text-muted-foreground">Aucun renouvellement pour ce mois</div>
                  ) : (
                    <div className="space-y-3">
                      {renewalsByMonth[month].map((renewal) => (
                        <div
                          key={renewal.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                        >
                          <div className="flex items-start gap-3 mb-2 sm:mb-0">
                            <div
                              className={`h-10 w-1 rounded-full ${
                                renewal.daysLeft <= 7
                                  ? "bg-red-500"
                                  : renewal.daysLeft <= 30
                                    ? "bg-amber-500"
                                    : "bg-green-500"
                              }`}
                            />
                            <div>
                              <div className="font-medium">{renewal.company}</div>
                              <div className="text-sm text-muted-foreground flex items-center gap-2">
                                <FileText className="h-3.5 w-3.5" />
                                {renewal.type} - {renewal.premium}
                              </div>
                              <div className="text-sm text-muted-foreground flex items-center gap-2">
                                <Clock className="h-3.5 w-3.5" />
                                Échéance: {new Date(renewal.expiryDate).toLocaleDateString("fr-FR")} ({renewal.daysLeft}{" "}
                                jours)
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="mr-1 h-3.5 w-3.5" />
                              Détails
                            </Button>
                            <Button size="sm" className="bg-violet-600 hover:bg-violet-700">
                              <RefreshCw className="mr-1 h-3.5 w-3.5" />
                              Renouveler
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="kanban" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Urgent column */}
            <Card className="border-t-4 border-t-red-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <AlertCircle className="mr-2 h-5 w-5 text-red-500" />
                  Urgent
                  <Badge className="ml-2 bg-red-100 text-red-700 hover:bg-red-100">
                    {renewalsByStatus.urgent.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {renewalsByStatus.urgent.length === 0 ? (
                  <div className="text-center py-4 text-muted-foreground">Aucun renouvellement urgent</div>
                ) : (
                  renewalsByStatus.urgent.map((renewal) => (
                    <div
                      key={renewal.id}
                      className="p-3 border rounded-lg bg-white hover:bg-gray-50 shadow-sm cursor-pointer"
                    >
                      <div className="font-medium">{renewal.company}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                        <FileText className="h-3.5 w-3.5" />
                        {renewal.type}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(renewal.expiryDate).toLocaleDateString("fr-FR")}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                        <User className="h-3.5 w-3.5" />
                        {renewal.contact}
                      </div>
                      <div className="mt-2">
                        <Badge variant="outline" className="bg-red-100 text-red-700 hover:bg-red-100">
                          {renewal.daysLeft} jours
                        </Badge>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            {/* Upcoming column */}
            <Card className="border-t-4 border-t-amber-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-amber-500" />À venir
                  <Badge className="ml-2 bg-amber-100 text-amber-700 hover:bg-amber-100">
                    {renewalsByStatus.upcoming.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {renewalsByStatus.upcoming.length === 0 ? (
                  <div className="text-center py-4 text-muted-foreground">Aucun renouvellement à venir</div>
                ) : (
                  renewalsByStatus.upcoming.map((renewal) => (
                    <div
                      key={renewal.id}
                      className="p-3 border rounded-lg bg-white hover:bg-gray-50 shadow-sm cursor-pointer"
                    >
                      <div className="font-medium">{renewal.company}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                        <FileText className="h-3.5 w-3.5" />
                        {renewal.type}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(renewal.expiryDate).toLocaleDateString("fr-FR")}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                        <User className="h-3.5 w-3.5" />
                        {renewal.contact}
                      </div>
                      <div className="mt-2">
                        <Badge variant="outline" className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                          {renewal.daysLeft} jours
                        </Badge>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            {/* Normal column */}
            <Card className="border-t-4 border-t-green-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <RefreshCw className="mr-2 h-5 w-5 text-green-500" />
                  Normal
                  <Badge className="ml-2 bg-green-100 text-green-700 hover:bg-green-100">
                    {renewalsByStatus.normal.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {renewalsByStatus.normal.length === 0 ? (
                  <div className="text-center py-4 text-muted-foreground">Aucun renouvellement normal</div>
                ) : (
                  renewalsByStatus.normal.map((renewal) => (
                    <div
                      key={renewal.id}
                      className="p-3 border rounded-lg bg-white hover:bg-gray-50 shadow-sm cursor-pointer"
                    >
                      <div className="font-medium">{renewal.company}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                        <FileText className="h-3.5 w-3.5" />
                        {renewal.type}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(renewal.expiryDate).toLocaleDateString("fr-FR")}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                        <User className="h-3.5 w-3.5" />
                        {renewal.contact}
                      </div>
                      <div className="mt-2">
                        <Badge variant="outline" className="bg-green-100 text-green-700 hover:bg-green-100">
                          {renewal.daysLeft} jours
                        </Badge>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            {/* Processed column */}
            <Card className="border-t-4 border-t-gray-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Building className="mr-2 h-5 w-5 text-gray-500" />
                  Traité
                  <Badge className="ml-2 bg-gray-100 text-gray-700 hover:bg-gray-100">
                    {renewalsByStatus.processed.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {renewalsByStatus.processed.length === 0 ? (
                  <div className="text-center py-4 text-muted-foreground">Aucun renouvellement traité</div>
                ) : (
                  renewalsByStatus.processed.map((renewal) => (
                    <div
                      key={renewal.id}
                      className="p-3 border rounded-lg bg-white hover:bg-gray-50 shadow-sm cursor-pointer"
                    >
                      <div className="font-medium">{renewal.company}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                        <FileText className="h-3.5 w-3.5" />
                        {renewal.type}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(renewal.expiryDate).toLocaleDateString("fr-FR")}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                        <User className="h-3.5 w-3.5" />
                        {renewal.contact}
                      </div>
                      <div className="mt-2">
                        <Badge variant="outline" className="bg-gray-100 text-gray-700 hover:bg-gray-100">
                          Traité
                        </Badge>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Sample data for renewals
const renewals = [
  {
    id: "REN-2023-001",
    company: "Dupont Industrie",
    type: "Multirisque",
    expiryDate: "2023-05-15",
    premium: "4 250 €",
    status: "urgent",
    contact: "Jean Dupont",
    email: "j.dupont@dupontindustrie.fr",
    phone: "01 23 45 67 89",
  },
  {
    id: "REN-2023-002",
    company: "Martin & Fils",
    type: "RC Pro",
    expiryDate: "2023-05-18",
    premium: "1 800 €",
    status: "upcoming",
    contact: "Sophie Martin",
    email: "s.martin@martinetfils.fr",
    phone: "01 23 45 67 90",
  },
  {
    id: "REN-2023-003",
    company: "Tech Solutions",
    type: "Cyber-risques",
    expiryDate: "2023-05-22",
    premium: "3 600 €",
    status: "upcoming",
    contact: "Pierre Leroy",
    email: "p.leroy@techsolutions.fr",
    phone: "01 23 45 67 91",
  },
  {
    id: "REN-2023-004",
    company: "Boulangerie Moreau",
    type: "Multirisque",
    expiryDate: "2023-06-01",
    premium: "1 200 €",
    status: "normal",
    contact: "Marie Moreau",
    email: "m.moreau@boulangerie-moreau.fr",
    phone: "01 23 45 67 92",
  },
  {
    id: "REN-2023-005",
    company: "Green Energy",
    type: "RC Pro",
    expiryDate: "2023-06-05",
    premium: "2 400 €",
    status: "normal",
    contact: "Lucas Dubois",
    email: "l.dubois@greenenergy.fr",
    phone: "01 23 45 67 93",
  },
  {
    id: "REN-2023-006",
    company: "Transports Rapides",
    type: "Flotte Auto",
    expiryDate: "2023-06-12",
    premium: "8 500 €",
    status: "normal",
    contact: "Thomas Bernard",
    email: "t.bernard@transportsrapides.fr",
    phone: "01 23 45 67 94",
  },
  {
    id: "REN-2023-007",
    company: "Clinique du Parc",
    type: "RC Médicale",
    expiryDate: "2023-06-20",
    premium: "5 200 €",
    status: "normal",
    contact: "Dr. Claire Petit",
    email: "c.petit@clinique-parc.fr",
    phone: "01 23 45 67 95",
  },
  {
    id: "REN-2023-008",
    company: "Agence Immobilière Centrale",
    type: "RC Pro",
    expiryDate: "2023-07-05",
    premium: "2 100 €",
    status: "normal",
    contact: "Philippe Durand",
    email: "p.durand@immobiliere-centrale.fr",
    phone: "01 23 45 67 96",
  },
  {
    id: "REN-2023-009",
    company: "Restaurant Le Gourmet",
    type: "Multirisque",
    expiryDate: "2023-07-15",
    premium: "3 200 €",
    status: "normal",
    contact: "Antoine Lefebvre",
    email: "a.lefebvre@legourmet.fr",
    phone: "01 23 45 67 97",
  },
  {
    id: "REN-2023-010",
    company: "Cabinet Juridique Associés",
    type: "RC Pro",
    expiryDate: "2023-04-30",
    premium: "4 800 €",
    status: "processed",
    contact: "Maître Isabelle Laurent",
    email: "i.laurent@cabinet-juridique.fr",
    phone: "01 23 45 67 98",
  },
]
