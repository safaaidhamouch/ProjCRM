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
import { Eye, Filter, Pencil, Plus, Search, Trash2 } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

export default function CampaignsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || campaign.status === statusFilter
    const matchesType = typeFilter === "all" || campaign.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Campagnes Marketing</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-sky-500 hover:bg-sky-600">
              <Plus className="mr-2 h-4 w-4" /> Nouvelle campagne
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Créer une nouvelle campagne</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nom
                </Label>
                <Input id="name" className="col-span-3" placeholder="Nom de la campagne" />
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
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="social">Réseaux Sociaux</SelectItem>
                    <SelectItem value="event">Événement</SelectItem>
                    <SelectItem value="ppc">PPC</SelectItem>
                    <SelectItem value="display">Display</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="startDate" className="text-right">
                  Date de début
                </Label>
                <Input id="startDate" type="date" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="endDate" className="text-right">
                  Date de fin
                </Label>
                <Input id="endDate" type="date" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="budget" className="text-right">
                  Budget
                </Label>
                <Input id="budget" className="col-span-3" placeholder="€" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea id="description" className="col-span-3" placeholder="Description de la campagne" />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" className="bg-sky-500 hover:bg-sky-600">
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
            placeholder="Rechercher une campagne..."
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
              <SelectItem value="active">En cours</SelectItem>
              <SelectItem value="planned">Planifiée</SelectItem>
              <SelectItem value="completed">Terminée</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="social">Réseaux Sociaux</SelectItem>
              <SelectItem value="event">Événement</SelectItem>
              <SelectItem value="ppc">PPC</SelectItem>
              <SelectItem value="display">Display</SelectItem>
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
          <TabsTrigger value="calendar">Calendrier</TabsTrigger>
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
                      <th className="p-4 font-medium">Date de début</th>
                      <th className="p-4 font-medium">Date de fin</th>
                      <th className="p-4 font-medium">Revenus</th>
                      <th className="p-4 font-medium">Statut</th>
                      <th className="p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCampaigns.map((campaign, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-4">{campaign.name}</td>
                        <td className="p-4">{campaign.type}</td>
                        <td className="p-4">{campaign.startDate}</td>
                        <td className="p-4">{campaign.endDate}</td>
                        <td className="p-4">{campaign.revenue}</td>
                        <td className="p-4">
                          <Badge
                            variant="outline"
                            className={
                              campaign.status === "active"
                                ? "bg-green-100 text-green-700 hover:bg-green-100"
                                : campaign.status === "planned"
                                  ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-100"
                            }
                          >
                            {campaign.statusLabel}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="icon" title="Voir">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[600px]">
                                <DialogHeader>
                                  <DialogTitle>Détails de la campagne</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right font-medium">Nom</Label>
                                    <div className="col-span-3">{campaign.name}</div>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right font-medium">Type</Label>
                                    <div className="col-span-3">{campaign.type}</div>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right font-medium">Date de début</Label>
                                    <div className="col-span-3">{campaign.startDate}</div>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right font-medium">Date de fin</Label>
                                    <div className="col-span-3">{campaign.endDate}</div>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right font-medium">Revenus</Label>
                                    <div className="col-span-3">{campaign.revenue}</div>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right font-medium">Statut</Label>
                                    <div className="col-span-3">
                                      <Badge
                                        variant="outline"
                                        className={
                                          campaign.status === "active"
                                            ? "bg-green-100 text-green-700 hover:bg-green-100"
                                            : campaign.status === "planned"
                                              ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
                                              : "bg-gray-100 text-gray-700 hover:bg-gray-100"
                                        }
                                      >
                                        {campaign.statusLabel}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="icon" title="Modifier">
                                  <Pencil className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[600px]">
                                <DialogHeader>
                                  <DialogTitle>Modifier la campagne</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-name" className="text-right">
                                      Nom
                                    </Label>
                                    <Input id="edit-name" className="col-span-3" defaultValue={campaign.name} />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-type" className="text-right">
                                      Type
                                    </Label>
                                    <Select defaultValue={campaign.type}>
                                      <SelectTrigger className="col-span-3">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="Email">Email</SelectItem>
                                        <SelectItem value="Social">Réseaux Sociaux</SelectItem>
                                        <SelectItem value="Événement">Événement</SelectItem>
                                        <SelectItem value="PPC">PPC</SelectItem>
                                        <SelectItem value="Display">Display</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-startDate" className="text-right">
                                      Date de début
                                    </Label>
                                    <Input id="edit-startDate" type="date" className="col-span-3" />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-endDate" className="text-right">
                                      Date de fin
                                    </Label>
                                    <Input id="edit-endDate" type="date" className="col-span-3" />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-revenue" className="text-right">
                                      Revenus
                                    </Label>
                                    <Input id="edit-revenue" className="col-span-3" defaultValue={campaign.revenue} />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-status" className="text-right">
                                      Statut
                                    </Label>
                                    <Select defaultValue={campaign.status}>
                                      <SelectTrigger className="col-span-3">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="active">En cours</SelectItem>
                                        <SelectItem value="planned">Planifiée</SelectItem>
                                        <SelectItem value="completed">Terminée</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                                <div className="flex justify-end">
                                  <Button type="submit" className="bg-sky-500 hover:bg-sky-600">
                                    Enregistrer
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-red-500" title="Supprimer">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[400px]">
                                <DialogHeader>
                                  <DialogTitle>Confirmer la suppression</DialogTitle>
                                </DialogHeader>
                                <div className="py-4">
                                  <p>Êtes-vous sûr de vouloir supprimer la campagne "{campaign.name}" ?</p>
                                  <p className="text-sm text-muted-foreground mt-2">Cette action est irréversible.</p>
                                </div>
                                <div className="flex justify-end gap-2">
                                  <Button variant="outline">Annuler</Button>
                                  <Button variant="destructive">Supprimer</Button>
                                </div>
                              </DialogContent>
                            </Dialog>
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
        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Calendrier des Campagnes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredCampaigns.map((campaign, index) => (
                  <Card
                    key={index}
                    className="border-l-4"
                    style={{
                      borderLeftColor:
                        campaign.status === "active"
                          ? "#10b981"
                          : campaign.status === "planned"
                            ? "#3b82f6"
                            : "#9ca3af",
                    }}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">{campaign.name}</CardTitle>
                        <Badge
                          variant="outline"
                          className={
                            campaign.status === "active"
                              ? "bg-green-100 text-green-700 hover:bg-green-100"
                              : campaign.status === "planned"
                                ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-100"
                          }
                        >
                          {campaign.statusLabel}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Type:</span>
                          <span className="text-sm">{campaign.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Début:</span>
                          <span className="text-sm">{campaign.startDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Fin:</span>
                          <span className="text-sm">{campaign.endDate}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const campaigns = [
  {
    name: "Offre Spéciale Été",
    type: "Email",
    startDate: "01/05/2023",
    endDate: "31/05/2023",
    revenue: "45 000 €",
    status: "active",
    statusLabel: "En cours",
  },
  {
    name: "Campagne Réseaux Sociaux",
    type: "Social",
    startDate: "15/04/2023",
    endDate: "15/05/2023",
    revenue: "32 000 €",
    status: "active",
    statusLabel: "En cours",
  },
  {
    name: "Webinaire Assurance Habitation",
    type: "Événement",
    startDate: "10/06/2023",
    endDate: "10/06/2023",
    revenue: "0 €",
    status: "planned",
    statusLabel: "Planifiée",
  },
  {
    name: "Campagne Google Ads",
    type: "PPC",
    startDate: "01/04/2023",
    endDate: "30/04/2023",
    revenue: "28 000 €",
    status: "completed",
    statusLabel: "Terminée",
  },
  {
    name: "Newsletter Mensuelle",
    type: "Email",
    startDate: "01/05/2023",
    endDate: "31/05/2023",
    revenue: "15 000 €",
    status: "active",
    statusLabel: "En cours",
  },
  {
    name: "Bannières Display",
    type: "Display",
    startDate: "15/03/2023",
    endDate: "15/04/2023",
    revenue: "22 000 €",
    status: "completed",
    statusLabel: "Terminée",
  },
  {
    name: "Salon de l'Assurance",
    type: "Événement",
    startDate: "15/05/2023",
    endDate: "17/05/2023",
    revenue: "0 €",
    status: "planned",
    statusLabel: "Planifiée",
  },
  {
    name: "Campagne LinkedIn",
    type: "Social",
    startDate: "01/06/2023",
    endDate: "30/06/2023",
    revenue: "0 €",
    status: "planned",
    statusLabel: "Planifiée",
  },
]
