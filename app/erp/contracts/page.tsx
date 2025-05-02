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
import { Eye, Filter, MoreHorizontal, Pencil, Plus, Search, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"

export default function ContractsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredContracts = contracts.filter((contract) => {
    const matchesSearch =
      contract.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.client.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || contract.status === statusFilter
    const matchesType = typeFilter === "all" || contract.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Gestion des Contrats</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-violet-600 hover:bg-violet-700">
              <Plus className="mr-2 h-4 w-4" /> Nouveau contrat
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Créer un nouveau contrat</DialogTitle>
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
                    <SelectItem value="entreprise-leroy">Entreprise Leroy</SelectItem>
                    <SelectItem value="sci-immobiliere">SCI Immobilière du Centre</SelectItem>
                    <SelectItem value="auto-ecole">Auto École Permis Express</SelectItem>
                    <SelectItem value="boulangerie">Boulangerie Maison Dupain</SelectItem>
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
                    <SelectItem value="rc-pro">RC Pro</SelectItem>
                    <SelectItem value="multirisque">Multirisque Immeuble</SelectItem>
                    <SelectItem value="flotte-auto">Flotte Auto</SelectItem>
                    <SelectItem value="multirisque-commerce">Multirisque Commerce</SelectItem>
                    <SelectItem value="rc-medicale">RC Médicale</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="startDate" className="text-right">
                  Date d'effet
                </Label>
                <Input id="startDate" type="date" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="endDate" className="text-right">
                  Date d'échéance
                </Label>
                <Input id="endDate" type="date" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="premium" className="text-right">
                  Prime
                </Label>
                <Input id="premium" className="col-span-3" placeholder="€" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea id="description" className="col-span-3" placeholder="Description du contrat" />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" className="bg-violet-600 hover:bg-violet-700">
                Créer
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
            placeholder="Rechercher un contrat..."
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
              <SelectItem value="Actif">Actif</SelectItem>
              <SelectItem value="En attente">En attente</SelectItem>
              <SelectItem value="Résilié">Résilié</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              <SelectItem value="RC Pro">RC Pro</SelectItem>
              <SelectItem value="Multirisque Immeuble">Multirisque Immeuble</SelectItem>
              <SelectItem value="Flotte Auto">Flotte Auto</SelectItem>
              <SelectItem value="Multirisque Commerce">Multirisque Commerce</SelectItem>
              <SelectItem value="RC Médicale">RC Médicale</SelectItem>
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
                      <th className="p-4 font-medium">Date d'effet</th>
                      <th className="p-4 font-medium">Date d'échéance</th>
                      <th className="p-4 font-medium">Prime</th>
                      <th className="p-4 font-medium">Statut</th>
                      <th className="p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContracts.map((contract, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-4">{contract.reference}</td>
                        <td className="p-4">{contract.client}</td>
                        <td className="p-4">{contract.type}</td>
                        <td className="p-4">{contract.startDate}</td>
                        <td className="p-4">{contract.endDate}</td>
                        <td className="p-4">{contract.premium}</td>
                        <td className="p-4">
                          <Badge
                            variant="outline"
                            className={
                              contract.status === "Actif"
                                ? "bg-green-100 text-green-700 hover:bg-green-100"
                                : contract.status === "En attente"
                                  ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
                                  : "bg-red-100 text-red-700 hover:bg-red-100"
                            }
                          >
                            {contract.status}
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
                                <DropdownMenuItem>Renouveler</DropdownMenuItem>
                                <DropdownMenuItem>Ajouter un avenant</DropdownMenuItem>
                                <DropdownMenuItem>Imprimer</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Résilier
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
            {filteredContracts.map((contract, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{contract.reference}</CardTitle>
                    <Badge
                      variant="outline"
                      className={
                        contract.status === "Actif"
                          ? "bg-green-100 text-green-700 hover:bg-green-100"
                          : contract.status === "En attente"
                            ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
                            : "bg-red-100 text-red-700 hover:bg-red-100"
                      }
                    >
                      {contract.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Client:</span>
                      <span className="text-sm">{contract.client}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Type:</span>
                      <span className="text-sm">{contract.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Date d'effet:</span>
                      <span className="text-sm">{contract.startDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Date d'échéance:</span>
                      <span className="text-sm">{contract.endDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Prime:</span>
                      <span className="text-sm">{contract.premium}</span>
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

const contracts = [
  {
    reference: "CTR-2023-0458",
    client: "Entreprise Leroy",
    type: "RC Pro",
    startDate: "02/05/2023",
    endDate: "01/05/2024",
    premium: "4 850 €",
    status: "Actif",
  },
  {
    reference: "CTR-2023-0457",
    client: "SCI Immobilière du Centre",
    type: "Multirisque Immeuble",
    startDate: "28/04/2023",
    endDate: "27/04/2024",
    premium: "12 350 €",
    status: "Actif",
  },
  {
    reference: "CTR-2023-0456",
    client: "Auto École Permis Express",
    type: "Flotte Auto",
    startDate: "25/04/2023",
    endDate: "24/04/2024",
    premium: "8 750 €",
    status: "Actif",
  },
  {
    reference: "CTR-2023-0455",
    client: "Boulangerie Maison Dupain",
    type: "Multirisque Commerce",
    startDate: "20/04/2023",
    endDate: "19/04/2024",
    premium: "2 450 €",
    status: "En attente",
  },
  {
    reference: "CTR-2023-0454",
    client: "Dr. Sophie Martin",
    type: "RC Médicale",
    startDate: "18/04/2023",
    endDate: "17/04/2024",
    premium: "1 850 €",
    status: "Actif",
  },
  {
    reference: "CTR-2023-0453",
    client: "Garage Auto Plus",
    type: "Multirisque Commerce",
    startDate: "15/04/2023",
    endDate: "14/04/2024",
    premium: "3 250 €",
    status: "Actif",
  },
  {
    reference: "CTR-2023-0452",
    client: "Cabinet Dentaire Sourire",
    type: "RC Médicale",
    startDate: "10/04/2023",
    endDate: "09/04/2024",
    premium: "2 150 €",
    status: "Actif",
  },
  {
    reference: "CTR-2023-0451",
    client: "Restaurant La Bonne Table",
    type: "Multirisque Commerce",
    startDate: "05/04/2023",
    endDate: "04/04/2024",
    premium: "3 850 €",
    status: "Actif",
  },
  {
    reference: "CTR-2023-0450",
    client: "Transport Express",
    type: "Flotte Auto",
    startDate: "01/04/2023",
    endDate: "31/03/2024",
    premium: "15 750 €",
    status: "Actif",
  },
  {
    reference: "CTR-2023-0449",
    client: "Boutique Mode & Style",
    type: "Multirisque Commerce",
    startDate: "28/03/2023",
    endDate: "27/03/2024",
    premium: "2 950 €",
    status: "Actif",
  },
]
