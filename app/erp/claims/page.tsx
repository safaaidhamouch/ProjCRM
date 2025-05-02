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
import { Eye, Filter, Plus, Search, Pencil } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

export default function ClaimsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredClaims = claims.filter((claim) => {
    const matchesSearch =
      claim.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.client.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || claim.status === statusFilter
    const matchesType = typeFilter === "all" || claim.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Gestion des Sinistres</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-violet-600 hover:bg-violet-700">
              <Plus className="mr-2 h-4 w-4" /> Nouveau sinistre
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Déclarer un nouveau sinistre</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="client" className="text-right">
                  Client
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Sélectionner un client" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="garage-auto">Garage Auto Plus</SelectItem>
                    <SelectItem value="cabinet-dentaire">Cabinet Dentaire Sourire</SelectItem>
                    <SelectItem value="restaurant">Restaurant La Bonne Table</SelectItem>
                    <SelectItem value="transport">Transport Express</SelectItem>
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
                    <SelectItem value="ctr-0453">CTR-2023-0453</SelectItem>
                    <SelectItem value="ctr-0452">CTR-2023-0452</SelectItem>
                    <SelectItem value="ctr-0451">CTR-2023-0451</SelectItem>
                    <SelectItem value="ctr-0450">CTR-2023-0450</SelectItem>
                  </SelectContent>
                </Select>
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
                    <SelectItem value="degat-eaux">Dégât des eaux</SelectItem>
                    <SelectItem value="vol">Vol</SelectItem>
                    <SelectItem value="incendie">Incendie</SelectItem>
                    <SelectItem value="accident">Accident</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date du sinistre
                </Label>
                <Input id="date" type="date" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Montant estimé
                </Label>
                <Input id="amount" className="col-span-3" placeholder="€" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea id="description" className="col-span-3" placeholder="Description du sinistre" />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" className="bg-violet-600 hover:bg-violet-700">
                Déclarer
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
            placeholder="Rechercher un sinistre..."
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
              <SelectItem value="En cours">En cours</SelectItem>
              <SelectItem value="Évaluation">Évaluation</SelectItem>
              <SelectItem value="Réglé">Réglé</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              <SelectItem value="Dégât des eaux">Dégât des eaux</SelectItem>
              <SelectItem value="Vol">Vol</SelectItem>
              <SelectItem value="Incendie">Incendie</SelectItem>
              <SelectItem value="Accident">Accident</SelectItem>
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
                      <th className="p-4 font-medium">Référence</th>
                      <th className="p-4 font-medium">Client</th>
                      <th className="p-4 font-medium">Type</th>
                      <th className="p-4 font-medium">Date</th>
                      <th className="p-4 font-medium">Montant</th>
                      <th className="p-4 font-medium">Statut</th>
                      <th className="p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredClaims.map((claim, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-4">{claim.reference}</td>
                        <td className="p-4">{claim.client}</td>
                        <td className="p-4">{claim.type}</td>
                        <td className="p-4">{claim.date}</td>
                        <td className="p-4">{claim.amount}</td>
                        <td className="p-4">
                          <Badge
                            variant="outline"
                            className={
                              claim.status === "En cours"
                                ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
                                : claim.status === "Évaluation"
                                  ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
                                  : "bg-green-100 text-green-700 hover:bg-green-100"
                            }
                          >
                            {claim.status}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" title="Voir">
                              <Eye className="h-4 w-4" />
                            </Button>
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
            {filteredClaims.map((claim, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{claim.reference}</CardTitle>
                    <Badge
                      variant="outline"
                      className={
                        claim.status === "En cours"
                          ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
                          : claim.status === "Évaluation"
                            ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
                            : "bg-green-100 text-green-700 hover:bg-green-100"
                      }
                    >
                      {claim.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Client:</span>
                      <span className="text-sm">{claim.client}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Type:</span>
                      <span className="text-sm">{claim.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Date:</span>
                      <span className="text-sm">{claim.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Montant:</span>
                      <span className="text-sm">{claim.amount}</span>
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

const claims = [
  {
    reference: "SIN-2023-0125",
    client: "Garage Auto Plus",
    type: "Dégât des eaux",
    date: "03/05/2023",
    amount: "12 500 €",
    status: "Évaluation",
  },
  {
    reference: "SIN-2023-0124",
    client: "Cabinet Dentaire Sourire",
    type: "Vol",
    date: "28/04/2023",
    amount: "8 750 €",
    status: "En cours",
  },
  {
    reference: "SIN-2023-0123",
    client: "Restaurant La Bonne Table",
    type: "Incendie",
    date: "25/04/2023",
    amount: "45 000 €",
    status: "En cours",
  },
  {
    reference: "SIN-2023-0122",
    client: "Transport Express",
    type: "Accident",
    date: "20/04/2023",
    amount: "18 500 €",
    status: "Réglé",
  },
  {
    reference: "SIN-2023-0121",
    client: "Boutique Mode & Style",
    type: "Dégât des eaux",
    date: "15/04/2023",
    amount: "5 250 €",
    status: "Réglé",
  },
  {
    reference: "SIN-2023-0120",
    client: "Clinique Vétérinaire Animalis",
    type: "Vol",
    date: "10/04/2023",
    amount: "7 800 €",
    status: "Évaluation",
  },
  {
    reference: "SIN-2023-0119",
    client: "Agence Immobilière Habitat",
    type: "Dégât des eaux",
    date: "05/04/2023",
    amount: "9 200 €",
    status: "En cours",
  },
  {
    reference: "SIN-2023-0118",
    client: "Pharmacie Centrale",
    type: "Incendie",
    date: "01/04/2023",
    amount: "32 000 €",
    status: "Réglé",
  },
]
