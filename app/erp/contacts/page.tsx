"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Filter, Pencil, Plus, Search, Trash2, Phone, Mail, Building, Briefcase, Calendar } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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

export default function ContactsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [companyFilter, setCompanyFilter] = useState("all")
  const [viewType, setViewType] = useState<"list" | "grid">("grid")
  const [selectedContact, setSelectedContact] = useState<any>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.includes(searchTerm)

    const matchesCompany = companyFilter === "all" || contact.companyId === companyFilter

    return matchesSearch && matchesCompany
  })

  const handleEdit = (contact: any) => {
    setSelectedContact(contact)
    setIsEditDialogOpen(true)
  }

  const handleDelete = (contact: any) => {
    setSelectedContact(contact)
    setIsDeleteDialogOpen(true)
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Gestion des Contacts</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-violet-600 hover:bg-violet-700">
              <Plus className="mr-2 h-4 w-4" /> Nouveau contact
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Ajouter un nouveau contact</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nom complet
                </Label>
                <Input id="name" className="col-span-3" placeholder="Nom et prénom" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="company" className="text-right">
                  Entreprise
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Sélectionner une entreprise" />
                  </SelectTrigger>
                  <SelectContent>
                    {companies.map((company) => (
                      <SelectItem key={company.id} value={company.id}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Fonction
                </Label>
                <Input id="role" className="col-span-3" placeholder="Titre ou fonction" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" type="email" className="col-span-3" placeholder="email@exemple.com" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Téléphone
                </Label>
                <Input id="phone" className="col-span-3" placeholder="06 12 34 56 78" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="mobile" className="text-right">
                  Mobile
                </Label>
                <Input id="mobile" className="col-span-3" placeholder="07 12 34 56 78" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="notes" className="text-right">
                  Notes
                </Label>
                <Input id="notes" className="col-span-3" placeholder="Informations supplémentaires" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {}}>
                Annuler
              </Button>
              <Button className="bg-violet-600 hover:bg-violet-700">Ajouter</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-2 md:justify-between">
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher un contact..."
            className="pl-8 w-full md:w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Select value={companyFilter} onValueChange={setCompanyFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Filtrer par entreprise" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les entreprises</SelectItem>
              {companies.map((company) => (
                <SelectItem key={company.id} value={company.id}>
                  {company.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs value={viewType} onValueChange={(v: string) => setViewType(v as "list" | "grid")}>
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="list">Liste</TabsTrigger>
            <TabsTrigger value="grid">Grille</TabsTrigger>
          </TabsList>
          <p className="text-sm text-muted-foreground">{filteredContacts.length} contacts</p>
        </div>
        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="p-4 font-medium">Nom</th>
                      <th className="p-4 font-medium">Entreprise</th>
                      <th className="p-4 font-medium">Fonction</th>
                      <th className="p-4 font-medium">Email</th>
                      <th className="p-4 font-medium">Téléphone</th>
                      <th className="p-4 font-medium">Dernière activité</th>
                      <th className="p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContacts.map((contact, index) => {
                      const company = companies.find((c) => c.id === contact.companyId)
                      return (
                        <tr key={index} className="border-b">
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={contact.name} />
                                <AvatarFallback>
                                  {contact.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span>{contact.name}</span>
                            </div>
                          </td>
                          <td className="p-4">{company?.name || "-"}</td>
                          <td className="p-4">{contact.role}</td>
                          <td className="p-4">
                            <a href={`mailto:${contact.email}`} className="text-violet-600 hover:underline">
                              {contact.email}
                            </a>
                          </td>
                          <td className="p-4">
                            <a href={`tel:${contact.phone}`} className="text-violet-600 hover:underline">
                              {contact.phone}
                            </a>
                          </td>
                          <td className="p-4">{contact.lastActivity}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon" title="Voir">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" title="Modifier" onClick={() => handleEdit(contact)}>
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                title="Supprimer"
                                onClick={() => handleDelete(contact)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="grid" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredContacts.map((contact, index) => {
              const company = companies.find((c) => c.id === contact.companyId)
              return (
                <Card key={index} className="overflow-hidden">
                  <div className="h-2 bg-violet-500 w-full"></div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <Avatar className="h-12 w-12 mb-2">
                        <AvatarImage src={`/placeholder.svg?height=48&width=48`} alt={contact.name} />
                        <AvatarFallback>
                          {contact.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          title="Modifier"
                          onClick={() => handleEdit(contact)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500"
                          title="Supprimer"
                          onClick={() => handleDelete(contact)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <CardTitle className="text-base">{contact.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Building className="h-4 w-4 text-muted-foreground mr-2" />
                        <span className="text-muted-foreground">{company?.name || "Sans entreprise"}</span>
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="h-4 w-4 text-muted-foreground mr-2" />
                        <span className="text-muted-foreground">{contact.role || "Sans fonction"}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-muted-foreground mr-2" />
                        <a href={`mailto:${contact.email}`} className="text-violet-600 hover:underline truncate">
                          {contact.email}
                        </a>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 text-muted-foreground mr-2" />
                        <a href={`tel:${contact.phone}`} className="text-violet-600 hover:underline">
                          {contact.phone}
                        </a>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                        <span className="text-muted-foreground">{contact.lastActivity}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>

      {/* Dialogue de modification */}
      {selectedContact && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Modifier le contact</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Nom complet
                </Label>
                <Input id="edit-name" className="col-span-3" defaultValue={selectedContact.name} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-company" className="text-right">
                  Entreprise
                </Label>
                <Select defaultValue={selectedContact.companyId}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {companies.map((company) => (
                      <SelectItem key={company.id} value={company.id}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-role" className="text-right">
                  Fonction
                </Label>
                <Input id="edit-role" className="col-span-3" defaultValue={selectedContact.role || ""} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-email" className="text-right">
                  Email
                </Label>
                <Input id="edit-email" type="email" className="col-span-3" defaultValue={selectedContact.email} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-phone" className="text-right">
                  Téléphone
                </Label>
                <Input id="edit-phone" className="col-span-3" defaultValue={selectedContact.phone} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-mobile" className="text-right">
                  Mobile
                </Label>
                <Input id="edit-mobile" className="col-span-3" defaultValue={selectedContact.mobile || ""} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-notes" className="text-right">
                  Notes
                </Label>
                <Input id="edit-notes" className="col-span-3" defaultValue={selectedContact.notes || ""} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Annuler
              </Button>
              <Button
                className="bg-violet-600 hover:bg-violet-700"
                onClick={() => {
                  // Logique de sauvegarde
                  setIsEditDialogOpen(false)
                }}
              >
                Enregistrer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Dialogue de suppression */}
      {selectedContact && (
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer ce contact ?</AlertDialogTitle>
              <AlertDialogDescription>
                Cette action est irréversible. Le contact {selectedContact.name} sera définitivement supprimé du
                système.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-500 hover:bg-red-600"
                onClick={() => {
                  // Logique de suppression
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

// Données de démonstration
const companies = [
  { id: "comp1", name: "Entreprise Leroy" },
  { id: "comp2", name: "SCI Immobilière du Centre" },
  { id: "comp3", name: "Auto École Permis Express" },
  { id: "comp4", name: "Boulangerie Maison Dupain" },
  { id: "comp5", name: "Cabinet Médical Saint-Pierre" },
]

const contacts = [
  {
    id: "1",
    name: "Jean Dupont",
    companyId: "comp1",
    role: "Directeur Général",
    email: "jean.dupont@entreprise-leroy.fr",
    phone: "01 23 45 67 89",
    mobile: "06 12 34 56 78",
    lastActivity: "Hier à 14:30",
    notes: "Contact principal pour les renouvellements",
  },
  {
    id: "2",
    name: "Marie Lecomte",
    companyId: "comp1",
    role: "Responsable RH",
    email: "m.lecomte@entreprise-leroy.fr",
    phone: "01 23 45 67 90",
    mobile: "06 23 45 67 89",
    lastActivity: "Il y a 2 jours",
    notes: "",
  },
  {
    id: "3",
    name: "Pierre Martin",
    companyId: "comp2",
    role: "Gérant",
    email: "p.martin@sci-centre.fr",
    phone: "01 34 56 78 90",
    mobile: "06 34 56 78 90",
    lastActivity: "Il y a 3 jours",
    notes: "Préfère être contacté par email",
  },
  {
    id: "4",
    name: "Sophie Dubois",
    companyId: "comp3",
    role: "Directrice",
    email: "s.dubois@permis-express.fr",
    phone: "01 45 67 89 01",
    mobile: "06 45 67 89 01",
    lastActivity: "Aujourd'hui à 10:15",
    notes: "",
  },
  {
    id: "5",
    name: "Nicolas Bernard",
    companyId: "comp4",
    role: "Propriétaire",
    email: "n.bernard@maison-dupain.fr",
    phone: "01 56 78 90 12",
    mobile: "06 56 78 90 12",
    lastActivity: "Il y a 1 semaine",
    notes: "Disponible en soirée uniquement",
  },
  {
    id: "6",
    name: "Dr. Christine Petit",
    companyId: "comp5",
    role: "Médecin chef",
    email: "dr.petit@cabinet-stpierre.fr",
    phone: "01 67 89 01 23",
    mobile: "06 67 89 01 23",
    lastActivity: "Il y a 2 semaines",
    notes: "Préfère être contactée entre 12h et 14h",
  },
  {
    id: "7",
    name: "Laurent Moreau",
    companyId: "comp5",
    role: "Administrateur",
    email: "l.moreau@cabinet-stpierre.fr",
    phone: "01 67 89 01 24",
    mobile: "06 78 90 12 34",
    lastActivity: "Hier à 09:45",
    notes: "",
  },
  {
    id: "8",
    name: "Émilie Lambert",
    companyId: "comp2",
    role: "Comptable",
    email: "e.lambert@sci-centre.fr",
    phone: "01 34 56 78 91",
    mobile: "06 89 01 23 45",
    lastActivity: "Aujourd'hui à 08:30",
    notes: "Contact pour les factures",
  },
]
