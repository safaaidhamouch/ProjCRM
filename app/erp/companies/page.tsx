"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Building,
  Eye,
  Filter,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Trash2,
  Users,
  Phone,
  Mail,
  MapPin,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"

export default function CompaniesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sectorFilter, setSectorFilter] = useState("all")
  const [sizeFilter, setSizeFilter] = useState("all")

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.contact.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSector = sectorFilter === "all" || company.sector === sectorFilter
    const matchesSize = sizeFilter === "all" || company.size === sizeFilter

    return matchesSearch && matchesSector && matchesSize
  })

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Gestion des Entreprises</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-violet-600 hover:bg-violet-700">
              <Plus className="mr-2 h-4 w-4" /> Nouvelle entreprise
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Ajouter une nouvelle entreprise</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nom
                </Label>
                <Input id="name" className="col-span-3" placeholder="Nom de l'entreprise" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="sector" className="text-right">
                  Secteur
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Sélectionner un secteur" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="commerce">Commerce</SelectItem>
                    <SelectItem value="industrie">Industrie</SelectItem>
                    <SelectItem value="services">Services</SelectItem>
                    <SelectItem value="construction">Construction</SelectItem>
                    <SelectItem value="sante">Santé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="size" className="text-right">
                  Taille
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Sélectionner une taille" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tpe">TPE (1-9)</SelectItem>
                    <SelectItem value="pme">PME (10-249)</SelectItem>
                    <SelectItem value="eti">ETI (250-4999)</SelectItem>
                    <SelectItem value="ge">Grande Entreprise (5000+)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="contact" className="text-right">
                  Contact principal
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
                <Label htmlFor="address" className="text-right">
                  Adresse
                </Label>
                <Textarea id="address" className="col-span-3" placeholder="Adresse de l'entreprise" />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" className="bg-violet-600 hover:bg-violet-700">
                Ajouter
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-2 md:justify-between">
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher une entreprise..."
            className="pl-8 w-full md:w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Select value={sectorFilter} onValueChange={setSectorFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Secteur" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les secteurs</SelectItem>
              <SelectItem value="commerce">Commerce</SelectItem>
              <SelectItem value="industrie">Industrie</SelectItem>
              <SelectItem value="services">Services</SelectItem>
              <SelectItem value="construction">Construction</SelectItem>
              <SelectItem value="sante">Santé</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sizeFilter} onValueChange={setSizeFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Taille" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les tailles</SelectItem>
              <SelectItem value="tpe">TPE (1-9)</SelectItem>
              <SelectItem value="pme">PME (10-249)</SelectItem>
              <SelectItem value="eti">ETI (250-4999)</SelectItem>
              <SelectItem value="ge">Grande Entreprise (5000+)</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">Liste</TabsTrigger>
          <TabsTrigger value="grid">Grille</TabsTrigger>
        </TabsList>
        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="p-4 font-medium">Nom</th>
                      <th className="p-4 font-medium">Secteur</th>
                      <th className="p-4 font-medium">Taille</th>
                      <th className="p-4 font-medium">Contact</th>
                      <th className="p-4 font-medium">Email</th>
                      <th className="p-4 font-medium">Téléphone</th>
                      <th className="p-4 font-medium">Contrats</th>
                      <th className="p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCompanies.map((company, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-4">{company.name}</td>
                        <td className="p-4">{company.sectorLabel}</td>
                        <td className="p-4">{company.sizeLabel}</td>
                        <td className="p-4">{company.contact}</td>
                        <td className="p-4">{company.email}</td>
                        <td className="p-4">{company.phone}</td>
                        <td className="p-4">
                          <Badge variant="outline" className="bg-violet-100 text-violet-700 hover:bg-violet-100">
                            {company.contracts}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" title="Voir">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" title="Modifier">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Voir les contrats</DropdownMenuItem>
                                <DropdownMenuItem>Ajouter un contrat</DropdownMenuItem>
                                <DropdownMenuItem>Exporter</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Supprimer
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="grid" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredCompanies.map((company, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{company.name}</CardTitle>
                    <Badge variant="outline" className="bg-violet-100 text-violet-700 hover:bg-violet-100">
                      {company.contracts} contrats
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Building className="mr-2 h-4 w-4 text-muted-foreground" />
                      {company.sectorLabel} - {company.sizeLabel}
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                      {company.contact}
                    </div>
                    <div className="flex items-center text-sm">
                      <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                      {company.email}
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                      {company.phone}
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                      {company.address}
                    </div>
                  </div>
                  <div className="flex justify-end mt-4 gap-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Eye className="h-3.5 w-3.5" />
                      Voir
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Pencil className="h-3.5 w-3.5" />
                      Modifier
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const companies = [
  {
    name: "Entreprise Leroy",
    sector: "commerce",
    sectorLabel: "Commerce",
    size: "pme",
    sizeLabel: "PME (10-249)",
    contact: "Jean Leroy",
    email: "j.leroy@entreprise-leroy.fr",
    phone: "01 23 45 67 89",
    address: "15 rue du Commerce, 75001 Paris",
    contracts: 3,
  },
  {
    name: "SCI Immobilière du Centre",
    sector: "services",
    sectorLabel: "Services",
    size: "tpe",
    sizeLabel: "TPE (1-9)",
    contact: "Marie Dubois",
    email: "m.dubois@sci-centre.fr",
    phone: "01 34 56 78 90",
    address: "8 avenue des Immeubles, 69002 Lyon",
    contracts: 1,
  },
  {
    name: "Auto École Permis Express",
    sector: "services",
    sectorLabel: "Services",
    size: "tpe",
    sizeLabel: "TPE (1-9)",
    contact: "Pierre Martin",
    email: "p.martin@permis-express.fr",
    phone: "01 45 67 89 01",
    address: "25 boulevard des Conducteurs, 33000 Bordeaux",
    contracts: 2,
  },
  {
    name: "Boulangerie Maison Dupain",
    sector: "commerce",
    sectorLabel: "Commerce",
    size: "tpe",
    sizeLabel: "TPE (1-9)",
    contact: "Sophie Dupain",
    email: "s.dupain@maison-dupain.fr",
    phone: "01 56 78 90 12",
    address: "3 rue de la Farine, 44000 Nantes",
    contracts: 1,
  },
  {
    name: "Cabinet Médical Saint-Pierre",
    sector: "sante",
    sectorLabel: "Santé",
    size: "tpe",
    sizeLabel: "TPE (1-9)",
    contact: "Dr. Sophie Martin",
    email: "dr.martin@cabinet-stpierre.fr",
    phone: "01 67 89 01 23",
    address: "12 rue de la Santé, 13001 Marseille",
    contracts: 2,
  },
  {
    name: "Garage Auto Plus",
    sector: "services",
    sectorLabel: "Services",
    size: "tpe",
    sizeLabel: "TPE (1-9)",
    contact: "Thomas Petit",
    email: "t.petit@garage-autoplus.fr",
    phone: "01 78 90 12 34",
    address: "45 avenue des Mécaniciens, 59000 Lille",
    contracts: 1,
  },
  {
    name: "Restaurant La Bonne Table",
    sector: "commerce",
    sectorLabel: "Commerce",
    size: "tpe",
    sizeLabel: "TPE (1-9)",
    contact: "Julie Moreau",
    email: "j.moreau@labonnetable.fr",
    phone: "01 89 01 23 45",
    address: "7 place de la Gastronomie, 67000 Strasbourg",
    contracts: 1,
  },
  {
    name: "Transport Express",
    sector: "services",
    sectorLabel: "Services",
    size: "pme",
    sizeLabel: "PME (10-249)",
    contact: "Nicolas Dubois",
    email: "n.dubois@transport-express.fr",
    phone: "01 90 12 34 56",
    address: "18 rue de la Logistique, 31000 Toulouse",
    contracts: 2,
  },
  {
    name: "Constructions Bernard",
    sector: "construction",
    sectorLabel: "Construction",
    size: "pme",
    sizeLabel: "PME (10-249)",
    contact: "Philippe Bernard",
    email: "p.bernard@constructions-bernard.fr",
    phone: "01 01 23 45 67",
    address: "32 avenue du Bâtiment, 06000 Nice",
    contracts: 3,
  },
  {
    name: "Industrie Métallique du Nord",
    sector: "industrie",
    sectorLabel: "Industrie",
    size: "eti",
    sizeLabel: "ETI (250-4999)",
    contact: "François Lambert",
    email: "f.lambert@imn.fr",
    phone: "01 12 34 56 78",
    address: "5 zone industrielle Nord, 59160 Lille",
    contracts: 4,
  },
]
