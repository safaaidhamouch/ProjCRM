"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowUp,
  Eye,
  Filter,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Trash2,
  Mail,
  MousePointer,
  Users,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
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

export default function EmailsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedEmail, setSelectedEmail] = useState<any>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const itemsPerPage = 10

  const filteredEmails = emails.filter((email) => {
    const matchesSearch = email.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || email.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentEmails = filteredEmails.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredEmails.length / itemsPerPage)

  const handleView = (email: any) => {
    setSelectedEmail(email)
    setIsViewDialogOpen(true)
  }

  const handleEdit = (email: any) => {
    setSelectedEmail(email)
    setIsEditDialogOpen(true)
  }

  const handleDelete = (email: any) => {
    setSelectedEmail(email)
    setIsDeleteDialogOpen(true)
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Gestion des Emails</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-sky-500 hover:bg-sky-600">
              <Plus className="mr-2 h-4 w-4" /> Nouvel email
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Créer un nouvel email</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="subject" className="text-right">
                  Sujet
                </Label>
                <Input id="subject" className="col-span-3" placeholder="Sujet de l'email" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="campaign" className="text-right">
                  Campagne
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Sélectionner une campagne" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="summer">Offre Spéciale Été</SelectItem>
                    <SelectItem value="newsletter">Newsletter Mensuelle</SelectItem>
                    <SelectItem value="webinar">Webinaire Assurance Habitation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="recipients" className="text-right">
                  Destinataires
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Sélectionner un groupe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les clients</SelectItem>
                    <SelectItem value="prospects">Prospects</SelectItem>
                    <SelectItem value="active">Clients actifs</SelectItem>
                    <SelectItem value="inactive">Clients inactifs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="sendDate" className="text-right">
                  Date d'envoi
                </Label>
                <Input id="sendDate" type="datetime-local" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="content" className="text-right">
                  Contenu
                </Label>
                <Textarea id="content" className="col-span-3" placeholder="Contenu de l'email" rows={10} />
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Emails envoyés</CardTitle>
            <Mail className="h-4 w-4 text-sky-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,543</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <span className="text-green-500 flex items-center mr-1">
                <ArrowUp className="h-3 w-3 mr-1" />
                18%
              </span>
              depuis le mois dernier
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux d'ouverture</CardTitle>
            <Eye className="h-4 w-4 text-sky-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.8%</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <span className="text-green-500 flex items-center mr-1">
                <ArrowUp className="h-3 w-3 mr-1" />
                3.2%
              </span>
              depuis le mois dernier
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de clic</CardTitle>
            <MousePointer className="h-4 w-4 text-sky-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.7%</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <span className="text-green-500 flex items-center mr-1">
                <ArrowUp className="h-3 w-3 mr-1" />
                1.5%
              </span>
              depuis le mois dernier
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Destinataires</CardTitle>
            <Users className="h-4 w-4 text-sky-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,280</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <span className="text-green-500 flex items-center mr-1">
                <ArrowUp className="h-3 w-3 mr-1" />
                12%
              </span>
              depuis le mois dernier
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-2 md:justify-between">
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher un email..."
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
              <SelectItem value="sent">Envoyé</SelectItem>
              <SelectItem value="scheduled">Programmé</SelectItem>
              <SelectItem value="draft">Brouillon</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="p-4 font-medium">Sujet</th>
                  <th className="p-4 font-medium">Campagne</th>
                  <th className="p-4 font-medium">Date d'envoi</th>
                  <th className="p-4 font-medium">Taux d'ouverture</th>
                  <th className="p-4 font-medium">Taux de clic</th>
                  <th className="p-4 font-medium">Statut</th>
                  <th className="p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentEmails.map((email, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-4">{email.subject}</td>
                    <td className="p-4">{email.campaign}</td>
                    <td className="p-4">{email.sendDate}</td>
                    <td className="p-4">{email.openRate}</td>
                    <td className="p-4">{email.clickRate}</td>
                    <td className="p-4">
                      <Badge
                        variant="outline"
                        className={
                          email.status === "sent"
                            ? "bg-green-100 text-green-700 hover:bg-green-100"
                            : email.status === "scheduled"
                              ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-100"
                        }
                      >
                        {email.statusLabel}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" title="Voir" onClick={() => handleView(email)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Modifier" onClick={() => handleEdit(email)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Dupliquer</DropdownMenuItem>
                            <DropdownMenuItem>Voir les statistiques</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(email)}>
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
          <div className="p-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  const pageNumber = i + 1
                  return (
                    <PaginationItem key={i}>
                      <PaginationLink isActive={currentPage === pageNumber} onClick={() => setCurrentPage(pageNumber)}>
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  )
                })}
                {totalPages > 5 && (
                  <>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink onClick={() => setCurrentPage(totalPages)}>{totalPages}</PaginationLink>
                    </PaginationItem>
                  </>
                )}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>

      {/* Dialogue de visualisation d'email */}
      {selectedEmail && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>{selectedEmail.subject}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-[100px_1fr] gap-2">
                <div className="font-medium">Campagne:</div>
                <div>{selectedEmail.campaign}</div>
              </div>
              <div className="grid grid-cols-[100px_1fr] gap-2">
                <div className="font-medium">Date d'envoi:</div>
                <div>{selectedEmail.sendDate}</div>
              </div>
              <div className="grid grid-cols-[100px_1fr] gap-2">
                <div className="font-medium">Statut:</div>
                <div>
                  <Badge
                    variant="outline"
                    className={
                      selectedEmail.status === "sent"
                        ? "bg-green-100 text-green-700 hover:bg-green-100"
                        : selectedEmail.status === "scheduled"
                          ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-100"
                    }
                  >
                    {selectedEmail.statusLabel}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-[100px_1fr] gap-2">
                <div className="font-medium">Taux d'ouverture:</div>
                <div>{selectedEmail.openRate}</div>
              </div>
              <div className="grid grid-cols-[100px_1fr] gap-2">
                <div className="font-medium">Taux de clic:</div>
                <div>{selectedEmail.clickRate}</div>
              </div>
              <div className="mt-4">
                <div className="font-medium mb-2">Contenu de l'email:</div>
                <div className="border rounded-md p-4 bg-gray-50 min-h-[200px]">
                  {/* Contenu de l'email - pour la démo, on affiche juste le sujet */}
                  <p>Contenu de l'email: {selectedEmail.subject}</p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                Fermer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Dialogue de modification d'email */}
      {selectedEmail && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Modifier l'email</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-subject" className="text-right">
                  Sujet
                </Label>
                <Input id="edit-subject" className="col-span-3" defaultValue={selectedEmail.subject} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-campaign" className="text-right">
                  Campagne
                </Label>
                <Select defaultValue="newsletter">
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="summer">Offre Spéciale Été</SelectItem>
                    <SelectItem value="newsletter">Newsletter Mensuelle</SelectItem>
                    <SelectItem value="webinar">Webinaire Assurance Habitation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-sendDate" className="text-right">
                  Date d'envoi
                </Label>
                <Input
                  id="edit-sendDate"
                  type="datetime-local"
                  className="col-span-3"
                  defaultValue={selectedEmail.status !== "sent" ? "2023-05-15T10:00" : undefined}
                  disabled={selectedEmail.status === "sent"}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-content" className="text-right">
                  Contenu
                </Label>
                <Textarea
                  id="edit-content"
                  className="col-span-3"
                  rows={10}
                  defaultValue={`Contenu de l'email: ${selectedEmail.subject}`}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Annuler
              </Button>
              <Button
                className="bg-sky-500 hover:bg-sky-600"
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
      {selectedEmail && (
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer cet email ?</AlertDialogTitle>
              <AlertDialogDescription>
                Cette action est irréversible. L'email "{selectedEmail.subject}" sera définitivement supprimé.
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

const emails = [
  {
    subject: "Offre spéciale assurance auto - Économisez jusqu'à 30%",
    campaign: "Offre Spéciale Été",
    sendDate: "05/05/2023",
    openRate: "28.4%",
    clickRate: "12.1%",
    status: "sent",
    statusLabel: "Envoyé",
  },
  {
    subject: "Découvrez nos nouvelles garanties habitation",
    campaign: "Newsletter Mensuelle",
    sendDate: "01/05/2023",
    openRate: "32.7%",
    clickRate: "15.3%",
    status: "sent",
    statusLabel: "Envoyé",
  },
  {
    subject: "Invitation : Webinaire sur l'assurance habitation",
    campaign: "Webinaire Assurance Habitation",
    sendDate: "10/06/2023",
    openRate: "-",
    clickRate: "-",
    status: "scheduled",
    statusLabel: "Programmé",
  },
  {
    subject: "Votre assurance santé évolue - Nouvelles prestations",
    campaign: "Newsletter Mensuelle",
    sendDate: "15/04/2023",
    openRate: "25.8%",
    clickRate: "9.2%",
    status: "sent",
    statusLabel: "Envoyé",
  },
  {
    subject: "Rappel : Renouvellement de votre contrat",
    campaign: "Renouvellements",
    sendDate: "20/04/2023",
    openRate: "45.2%",
    clickRate: "22.8%",
    status: "sent",
    statusLabel: "Envoyé",
  },
  {
    subject: "Conseils pour sécuriser votre domicile",
    campaign: "Newsletter Mensuelle",
    sendDate: "25/05/2023",
    openRate: "-",
    clickRate: "-",
    status: "scheduled",
    statusLabel: "Programmé",
  },
  {
    subject: "Votre devis personnalisé",
    campaign: "Prospects",
    sendDate: "-",
    openRate: "-",
    clickRate: "-",
    status: "draft",
    statusLabel: "Brouillon",
  },
  {
    subject: "Confirmation de votre rendez-vous",
    campaign: "Automatique",
    sendDate: "02/05/2023",
    openRate: "62.1%",
    clickRate: "18.5%",
    status: "sent",
    statusLabel: "Envoyé",
  },
  {
    subject: "Enquête de satisfaction",
    campaign: "Satisfaction Client",
    sendDate: "10/05/2023",
    openRate: "31.4%",
    clickRate: "14.2%",
    status: "sent",
    statusLabel: "Envoyé",
  },
  {
    subject: "Nouveautés dans votre espace client",
    campaign: "Newsletter Mensuelle",
    sendDate: "15/06/2023",
    openRate: "-",
    clickRate: "-",
    status: "scheduled",
    statusLabel: "Programmé",
  },
  {
    subject: "Offre parrainage - Recevez 50€ par filleul",
    campaign: "Parrainage",
    sendDate: "18/05/2023",
    openRate: "-",
    clickRate: "-",
    status: "scheduled",
    statusLabel: "Programmé",
  },
  {
    subject: "Votre attestation d'assurance",
    campaign: "Automatique",
    sendDate: "03/05/2023",
    openRate: "58.7%",
    clickRate: "12.3%",
    status: "sent",
    statusLabel: "Envoyé",
  },
  {
    subject: "Conseils pour préparer l'hiver",
    campaign: "Newsletter Mensuelle",
    sendDate: "-",
    openRate: "-",
    clickRate: "-",
    status: "draft",
    statusLabel: "Brouillon",
  },
  {
    subject: "Invitation au salon de l'assurance",
    campaign: "Salon de l'Assurance",
    sendDate: "12/05/2023",
    openRate: "22.5%",
    clickRate: "8.7%",
    status: "sent",
    statusLabel: "Envoyé",
  },
  {
    subject: "Votre facture du mois de mai",
    campaign: "Automatique",
    sendDate: "05/05/2023",
    openRate: "42.3%",
    clickRate: "5.1%",
    status: "sent",
    statusLabel: "Envoyé",
  },
]
