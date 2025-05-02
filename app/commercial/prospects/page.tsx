"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Phone, Mail, Calendar, Plus, Search, Filter, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function ProspectsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedProspect, setSelectedProspect] = useState<any>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const filteredProspects = prospects.filter((prospect) => {
    const matchesSearch =
      prospect.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prospect.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prospect.phone.includes(searchTerm)

    const matchesStatus = statusFilter === "all" || prospect.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleEdit = (prospect: any) => {
    setSelectedProspect(prospect)
    setIsEditDialogOpen(true)
  }

  const handleDelete = (prospect: any) => {
    setSelectedProspect(prospect)
    setIsDeleteDialogOpen(true)
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Gestion des Prospects</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-violet-600 hover:bg-violet-700">
              <Plus className="mr-2 h-4 w-4" /> Nouveau prospect
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Ajouter un nouveau prospect</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nom
                </Label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" type="email" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Téléphone
                </Label>
                <Input id="phone" className="col-span-3" />
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
                    <SelectItem value="nouveau">Nouveau</SelectItem>
                    <SelectItem value="interet">Intérêt confirmé</SelectItem>
                    <SelectItem value="negociation">En négociation</SelectItem>
                    <SelectItem value="proposition">Proposition</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="value" className="text-right">
                  Valeur estimée
                </Label>
                <Input id="value" className="col-span-3" placeholder="€" />
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

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher un prospect..."
            className="pl-8 w-full md:max-w-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrer par statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="nouveau">Nouveau</SelectItem>
            <SelectItem value="interet">Intérêt confirmé</SelectItem>
            <SelectItem value="negociation">En négociation</SelectItem>
            <SelectItem value="proposition">Proposition</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">Liste</TabsTrigger>
          <TabsTrigger value="cards">Cartes</TabsTrigger>
        </TabsList>
        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="p-4 font-medium">Nom</th>
                      <th className="p-4 font-medium">Email</th>
                      <th className="p-4 font-medium">Téléphone</th>
                      <th className="p-4 font-medium">Statut</th>
                      <th className="p-4 font-medium">Dernière interaction</th>
                      <th className="p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProspects.map((prospect, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-4">{prospect.name}</td>
                        <td className="p-4">{prospect.email}</td>
                        <td className="p-4">{prospect.phone}</td>
                        <td className="p-4">
                          <Badge
                            variant="outline"
                            className={
                              prospect.status === "nouveau"
                                ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
                                : prospect.status === "interet"
                                  ? "bg-green-100 text-green-700 hover:bg-green-100"
                                  : prospect.status === "negociation"
                                    ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
                                    : "bg-violet-100 text-violet-700 hover:bg-violet-100"
                            }
                          >
                            {prospect.statusLabel}
                          </Badge>
                        </td>
                        <td className="p-4">{prospect.lastInteraction}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="icon" title="Appeler">
                                  <Phone className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Appeler {prospect.name}</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div className="text-center mb-4">
                                    <p className="text-lg font-medium">{prospect.phone}</p>
                                  </div>
                                  <div className="grid gap-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="call-notes" className="text-right">
                                        Notes d'appel
                                      </Label>
                                      <Textarea
                                        id="call-notes"
                                        className="col-span-3"
                                        placeholder="Saisissez vos notes d'appel..."
                                      />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="call-outcome" className="text-right">
                                        Résultat
                                      </Label>
                                      <Select>
                                        <SelectTrigger className="col-span-3">
                                          <SelectValue placeholder="Sélectionner un résultat" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="contacted">Contact établi</SelectItem>
                                          <SelectItem value="voicemail">Message vocal</SelectItem>
                                          <SelectItem value="no-answer">Pas de réponse</SelectItem>
                                          <SelectItem value="callback">Rappel prévu</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="call-followup" className="text-right">
                                        Suivi prévu
                                      </Label>
                                      <Input id="call-followup" type="date" className="col-span-3" />
                                    </div>
                                  </div>
                                </div>
                                <div className="flex justify-end gap-2">
                                  <Button variant="outline">Annuler</Button>
                                  <Button className="bg-violet-600 hover:bg-violet-700">Enregistrer</Button>
                                </div>
                              </DialogContent>
                            </Dialog>

                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="icon" title="Envoyer un email">
                                  <Mail className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[600px]">
                                <DialogHeader>
                                  <DialogTitle>Envoyer un email à {prospect.name}</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="email-to" className="text-right">
                                      À
                                    </Label>
                                    <Input id="email-to" value={prospect.email} readOnly className="col-span-3" />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="email-subject" className="text-right">
                                      Sujet
                                    </Label>
                                    <Input id="email-subject" className="col-span-3" placeholder="Sujet de l'email" />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="email-template" className="text-right">
                                      Modèle
                                    </Label>
                                    <Select>
                                      <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Sélectionner un modèle" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="intro">Introduction</SelectItem>
                                        <SelectItem value="follow-up">Suivi</SelectItem>
                                        <SelectItem value="quote">Devis</SelectItem>
                                        <SelectItem value="meeting">Confirmation de rendez-vous</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="email-content" className="text-right">
                                      Contenu
                                    </Label>
                                    <Textarea
                                      id="email-content"
                                      className="col-span-3"
                                      rows={10}
                                      placeholder="Contenu de l'email"
                                    />
                                  </div>
                                </div>
                                <div className="flex justify-end gap-2">
                                  <Button variant="outline">Annuler</Button>
                                  <Button className="bg-violet-600 hover:bg-violet-700">Envoyer</Button>
                                </div>
                              </DialogContent>
                            </Dialog>

                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="icon" title="Planifier un rendez-vous">
                                  <Calendar className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Planifier un rendez-vous avec {prospect.name}</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="meeting-date" className="text-right">
                                      Date
                                    </Label>
                                    <Input id="meeting-date" type="date" className="col-span-3" />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="meeting-time" className="text-right">
                                      Heure
                                    </Label>
                                    <Input id="meeting-time" type="time" className="col-span-3" />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="meeting-type" className="text-right">
                                      Type
                                    </Label>
                                    <Select>
                                      <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Sélectionner un type" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="in-person">En personne</SelectItem>
                                        <SelectItem value="video">Visioconférence</SelectItem>
                                        <SelectItem value="phone">Téléphone</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="meeting-location" className="text-right">
                                      Lieu
                                    </Label>
                                    <Input
                                      id="meeting-location"
                                      className="col-span-3"
                                      placeholder="Lieu du rendez-vous"
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="meeting-notes" className="text-right">
                                      Notes
                                    </Label>
                                    <Textarea
                                      id="meeting-notes"
                                      className="col-span-3"
                                      placeholder="Notes pour le rendez-vous"
                                    />
                                  </div>
                                </div>
                                <div className="flex justify-end gap-2">
                                  <Button variant="outline">Annuler</Button>
                                  <Button className="bg-violet-600 hover:bg-violet-700">Planifier</Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                  <Link href={`/commercial/prospect-detail/${prospect.id}`}>Voir détails</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleEdit(prospect)}>Modifier</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDelete(prospect)}>Supprimer</DropdownMenuItem>
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
        <TabsContent value="cards" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredProspects.map((prospect, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">
                      <Link href={`/commercial/prospect-detail/${prospect.id}`} className="hover:underline">
                        {prospect.name}
                      </Link>
                    </CardTitle>
                    <Badge
                      variant="outline"
                      className={
                        prospect.status === "nouveau"
                          ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
                          : prospect.status === "interet"
                            ? "bg-green-100 text-green-700 hover:bg-green-100"
                            : prospect.status === "negociation"
                              ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
                              : "bg-violet-100 text-violet-700 hover:bg-violet-100"
                      }
                    >
                      {prospect.statusLabel}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                      {prospect.email}
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                      {prospect.phone}
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      Dernière interaction: {prospect.lastInteraction}
                    </div>
                  </div>
                  <div className="flex justify-between mt-4">
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Phone className="h-3.5 w-3.5" />
                      Appeler
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Mail className="h-3.5 w-3.5" />
                      Email
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      RDV
                    </Button>
                  </div>
                  <div className="flex justify-end mt-2 gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => handleEdit(prospect)}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Modifier
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1 text-red-600 hover:text-red-700"
                      onClick={() => handleDelete(prospect)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Supprimer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Dialogue de modification */}
      {selectedProspect && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Modifier le prospect</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Nom
                </Label>
                <Input id="edit-name" className="col-span-3" defaultValue={selectedProspect.name} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-email" className="text-right">
                  Email
                </Label>
                <Input id="edit-email" type="email" className="col-span-3" defaultValue={selectedProspect.email} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-phone" className="text-right">
                  Téléphone
                </Label>
                <Input id="edit-phone" className="col-span-3" defaultValue={selectedProspect.phone} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">
                  Statut
                </Label>
                <Select defaultValue={selectedProspect.status}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nouveau">Nouveau</SelectItem>
                    <SelectItem value="interet">Intérêt confirmé</SelectItem>
                    <SelectItem value="negociation">En négociation</SelectItem>
                    <SelectItem value="proposition">Proposition</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Annuler
              </Button>
              <Button
                className="bg-violet-600 hover:bg-violet-700"
                onClick={() => {
                  // Logique de sauvegarde ici
                  setIsEditDialogOpen(false)
                }}
              >
                Enregistrer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Dialogue de confirmation de suppression */}
      {selectedProspect && (
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer ce prospect ?</AlertDialogTitle>
              <AlertDialogDescription>
                Cette action est irréversible. Le prospect {selectedProspect.name} sera définitivement supprimé du
                système.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 hover:bg-red-700"
                onClick={() => {
                  // Logique de suppression ici
                  setIsDeleteDialogOpen(false)
                }}
              >
                Supprimer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  )
}

const prospects = [
  {
    id: "1",
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    phone: "06 12 34 56 78",
    status: "nouveau",
    statusLabel: "Nouveau",
    lastInteraction: "05/05/2023",
  },
  {
    id: "2",
    name: "Marie Leroy",
    email: "marie.leroy@example.com",
    phone: "06 23 45 67 89",
    status: "interet",
    statusLabel: "Intérêt confirmé",
    lastInteraction: "03/05/2023",
  },
  {
    id: "3",
    name: "Pierre Martin",
    email: "pierre.martin@example.com",
    phone: "06 34 56 78 90",
    status: "negociation",
    statusLabel: "En négociation",
    lastInteraction: "28/04/2023",
  },
  {
    id: "4",
    name: "Sophie Bernard",
    email: "sophie.bernard@example.com",
    phone: "06 45 67 89 01",
    status: "proposition",
    statusLabel: "Proposition",
    lastInteraction: "25/04/2023",
  },
  {
    id: "5",
    name: "Thomas Petit",
    email: "thomas.petit@example.com",
    phone: "06 56 78 90 12",
    status: "interet",
    statusLabel: "Intérêt confirmé",
    lastInteraction: "02/05/2023",
  },
  {
    id: "6",
    name: "Julie Moreau",
    email: "julie.moreau@example.com",
    phone: "06 67 89 01 23",
    status: "nouveau",
    statusLabel: "Nouveau",
    lastInteraction: "04/05/2023",
  },
  {
    id: "7",
    name: "Nicolas Dubois",
    email: "nicolas.dubois@example.com",
    phone: "06 78 90 12 34",
    status: "negociation",
    statusLabel: "En négociation",
    lastInteraction: "30/04/2023",
  },
  {
    id: "8",
    name: "Camille Roux",
    email: "camille.roux@example.com",
    phone: "06 89 01 23 45",
    status: "proposition",
    statusLabel: "Proposition",
    lastInteraction: "27/04/2023",
  },
]
