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
import { Eye, Filter, MoreHorizontal, Pencil, Plus, Search, Trash2, Shield } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"

export default function CoveragesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredCoverages = coverages.filter((coverage) => {
    const matchesSearch =
      coverage.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coverage.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = typeFilter === "all" || coverage.type === typeFilter

    return matchesSearch && matchesType
  })

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Gestion des Couvertures</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-violet-600 hover:bg-violet-700">
              <Plus className="mr-2 h-4 w-4" /> Nouvelle couverture
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Ajouter une nouvelle couverture</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nom
                </Label>
                <Input id="name" className="col-span-3" placeholder="Nom de la couverture" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Sélectionner un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rc">Responsabilité Civile</SelectItem>
                    <SelectItem value="dommages">Dommages</SelectItem>
                    <SelectItem value="protection">Protection Juridique</SelectItem>
                    <SelectItem value="assistance">Assistance</SelectItem>
                    <SelectItem value="complementaire">Complémentaire</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea id="description" className="col-span-3" placeholder="Description de la couverture" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="limits" className="text-right">
                  Limites
                </Label>
                <Input id="limits" className="col-span-3" placeholder="Limites de couverture" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="exclusions" className="text-right">
                  Exclusions
                </Label>
                <Textarea id="exclusions" className="col-span-3" placeholder="Exclusions principales" />
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
            placeholder="Rechercher une couverture..."
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
              <SelectItem value="rc">Responsabilité Civile</SelectItem>
              <SelectItem value="dommages">Dommages</SelectItem>
              <SelectItem value="protection">Protection Juridique</SelectItem>
              <SelectItem value="assistance">Assistance</SelectItem>
              <SelectItem value="complementaire">Complémentaire</SelectItem>
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
                      <th className="p-4 font-medium">Type</th>
                      <th className="p-4 font-medium">Description</th>
                      <th className="p-4 font-medium">Limites</th>
                      <th className="p-4 font-medium">Contrats</th>
                      <th className="p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCoverages.map((coverage, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-4">{coverage.name}</td>
                        <td className="p-4">
                          <Badge variant="outline" className="bg-violet-100 text-violet-700 hover:bg-violet-100">
                            {coverage.typeLabel}
                          </Badge>
                        </td>
                        <td className="p-4">{coverage.description}</td>
                        <td className="p-4">{coverage.limits}</td>
                        <td className="p-4">{coverage.contracts}</td>
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
                                <DropdownMenuItem>Dupliquer</DropdownMenuItem>
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
            {filteredCoverages.map((coverage, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{coverage.name}</CardTitle>
                    <Badge variant="outline" className="bg-violet-100 text-violet-700 hover:bg-violet-100">
                      {coverage.typeLabel}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Shield className="mr-2 h-4 w-4 text-muted-foreground" />
                      {coverage.description}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Limites:</span> {coverage.limits}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Exclusions:</span> {coverage.exclusions}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Contrats:</span> {coverage.contracts}
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

const coverages = [
  {
    name: "RC Pro Standard",
    type: "rc",
    typeLabel: "Responsabilité Civile",
    description: "Couverture standard pour la responsabilité civile professionnelle",
    limits: "Jusqu'à 1 500 000 € par sinistre",
    exclusions: "Faute intentionnelle, dommages connus avant souscription",
    contracts: 45,
  },
  {
    name: "RC Pro Premium",
    type: "rc",
    typeLabel: "Responsabilité Civile",
    description: "Couverture étendue pour la responsabilité civile professionnelle",
    limits: "Jusqu'à 3 000 000 € par sinistre",
    exclusions: "Faute intentionnelle, dommages connus avant souscription",
    contracts: 28,
  },
  {
    name: "Multirisque Commerce",
    type: "dommages",
    typeLabel: "Dommages",
    description: "Protection complète pour les commerces",
    limits: "Valeur déclarée des biens",
    exclusions: "Usure normale, défaut d'entretien",
    contracts: 67,
  },
  {
    name: "Multirisque Immeuble",
    type: "dommages",
    typeLabel: "Dommages",
    description: "Protection complète pour les immeubles",
    limits: "Valeur de reconstruction à neuf",
    exclusions: "Défaut d'entretien, vice de construction connu",
    contracts: 32,
  },
  {
    name: "Protection Juridique Pro",
    type: "protection",
    typeLabel: "Protection Juridique",
    description: "Assistance juridique pour les professionnels",
    limits: "15 000 € par litige",
    exclusions: "Litiges connus avant souscription, amendes",
    contracts: 54,
  },
  {
    name: "Assistance Pro 24/7",
    type: "assistance",
    typeLabel: "Assistance",
    description: "Service d'assistance 24h/24 et 7j/7",
    limits: "5 interventions par an",
    exclusions: "Interventions non urgentes, pannes récurrentes",
    contracts: 78,
  },
  {
    name: "Complémentaire Santé Entreprise",
    type: "complementaire",
    typeLabel: "Complémentaire",
    description: "Couverture santé complémentaire pour les employés",
    limits: "Selon grille de garanties",
    exclusions: "Soins esthétiques, cures non prescrites",
    contracts: 23,
  },
  {
    name: "Flotte Auto Tous Risques",
    type: "dommages",
    typeLabel: "Dommages",
    description: "Couverture tous risques pour flottes automobiles",
    limits: "Valeur à neuf pendant 2 ans, puis valeur vénale",
    exclusions: "Conduite sans permis, état d'ivresse",
    contracts: 19,
  },
]
