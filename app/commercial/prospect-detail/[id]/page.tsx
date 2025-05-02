"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Calendar, Mail, Phone, ArrowLeft, FileText, Clock, Building, MapPin } from "lucide-react"
import Link from "next/link"

export default function ProspectDetailPage() {
  const params = useParams()
  const id = params.id

  // Trouver le prospect correspondant à l'ID
  const prospect = prospects.find((p) => p.id === id) || prospects[0]

  const [activeTab, setActiveTab] = useState("interactions")
  const [editingNote, setEditingNote] = useState<any>(null)
  const [isEditNoteDialogOpen, setIsEditNoteDialogOpen] = useState(false)
  const [isAddDocumentDialogOpen, setIsAddDocumentDialogOpen] = useState(false)

  // Calculer la progression dans le pipeline
  const getPipelineProgress = () => {
    switch (prospect.status) {
      case "nouveau":
        return 20
      case "interet":
        return 40
      case "negociation":
        return 60
      case "proposition":
        return 80
      case "contrat":
        return 100
      default:
        return 0
    }
  }

  const handleEditNote = (note: any) => {
    setEditingNote(note)
    setIsEditNoteDialogOpen(true)
  }

  return (
    <div className="flex-1 p-4 md:p-8 pt-6">
      <div className="flex items-center mb-6">
        <Link href="/commercial/prospects" className="mr-4">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h2 className="text-3xl font-bold tracking-tight">Détail du prospect</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar avec informations et actions rapides */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">{prospect.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
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
                    <Building className="mr-2 h-4 w-4 text-muted-foreground" />
                    {prospect.company || "Non renseigné"}
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                    {prospect.address || "Non renseigné"}
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    Dernière interaction: {prospect.lastInteraction}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Actions rapides</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full" variant="outline">
                      <Phone className="mr-2 h-4 w-4" /> Appeler
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
                    <Button className="w-full" variant="outline">
                      <Mail className="mr-2 h-4 w-4" /> Envoyer un email
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
                    <Button className="w-full" variant="outline">
                      <Calendar className="mr-2 h-4 w-4" /> Planifier un rendez-vous
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
                        <Input id="meeting-location" className="col-span-3" placeholder="Lieu du rendez-vous" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="meeting-notes" className="text-right">
                          Notes
                        </Label>
                        <Textarea id="meeting-notes" className="col-span-3" placeholder="Notes pour le rendez-vous" />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline">Annuler</Button>
                      <Button className="bg-violet-600 hover:bg-violet-700">Planifier</Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full" variant="outline">
                      <FileText className="mr-2 h-4 w-4" /> Créer une tâche
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Créer une tâche pour {prospect.name}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="task-title" className="text-right">
                          Titre
                        </Label>
                        <Input id="task-title" className="col-span-3" placeholder="Titre de la tâche" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="task-type" className="text-right">
                          Type
                        </Label>
                        <Select>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Sélectionner un type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="call">Appel</SelectItem>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="meeting">Rendez-vous</SelectItem>
                            <SelectItem value="follow-up">Suivi</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="task-due" className="text-right">
                          Échéance
                        </Label>
                        <Input id="task-due" type="date" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="task-description" className="text-right">
                          Description
                        </Label>
                        <Textarea id="task-description" className="col-span-3" placeholder="Description de la tâche" />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline">Annuler</Button>
                      <Button className="bg-violet-600 hover:bg-violet-700">Créer</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contenu principal avec onglets */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="pb-2">
              <h3 className="text-lg font-medium">Détails du prospect</h3>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="interactions" onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="interactions">Historique des interactions</TabsTrigger>
                  <TabsTrigger value="pipeline">Position dans le pipeline</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                </TabsList>
                <TabsContent value="interactions" className="mt-0">
                  <div className="space-y-4">
                    {interactions
                      .filter((interaction) => interaction.prospectId === prospect.id)
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .map((interaction, index) => (
                        <Card
                          key={index}
                          className="border-l-4"
                          style={{ borderLeftColor: getInteractionColor(interaction.type) }}
                        >
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{interaction.title}</h4>
                                <p className="text-sm text-muted-foreground">{interaction.description}</p>
                              </div>
                              <div className="text-right">
                                <Badge variant="outline">{interaction.type}</Badge>
                                <p className="text-xs text-muted-foreground mt-1">{interaction.date}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </TabsContent>
                <TabsContent value="pipeline" className="mt-0">
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Progression dans le pipeline</span>
                        <span className="text-sm font-medium">{getPipelineProgress()}%</span>
                      </div>
                      <Progress value={getPipelineProgress()} className="h-2" />
                    </div>

                    <div className="grid grid-cols-5 gap-2">
                      {["Nouveau", "Intérêt confirmé", "En négociation", "Proposition", "Contrat"].map(
                        (stage, index) => {
                          const isActive =
                            (prospect.status === "nouveau" && index === 0) ||
                            (prospect.status === "interet" && index === 1) ||
                            (prospect.status === "negociation" && index === 2) ||
                            (prospect.status === "proposition" && index === 3) ||
                            (prospect.status === "contrat" && index === 4)

                          return (
                            <div
                              key={index}
                              className={`p-3 text-center rounded-md text-sm ${
                                isActive
                                  ? "bg-violet-100 text-violet-700 border border-violet-300"
                                  : "bg-gray-100 text-gray-500"
                              }`}
                            >
                              {stage}
                            </div>
                          )
                        },
                      )}
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Changer le statut</h4>
                      <Select defaultValue={prospect.status}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="nouveau">Nouveau</SelectItem>
                          <SelectItem value="interet">Intérêt confirmé</SelectItem>
                          <SelectItem value="negociation">En négociation</SelectItem>
                          <SelectItem value="proposition">Proposition</SelectItem>
                          <SelectItem value="contrat">Contrat</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Informations sur l'opportunité</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Produit d'intérêt:</span>
                          <span className="text-sm font-medium">{prospect.product || "Non défini"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Valeur estimée:</span>
                          <span className="text-sm font-medium">{prospect.value || "Non définie"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Probabilité de conversion:</span>
                          <span className="text-sm font-medium">{prospect.probability || "Non définie"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Date de clôture prévue:</span>
                          <span className="text-sm font-medium">{prospect.closingDate || "Non définie"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="notes" className="mt-0">
                  <div className="space-y-4">
                    <Textarea placeholder="Ajouter une nouvelle note..." className="min-h-[100px]" />
                    <Button className="bg-violet-600 hover:bg-violet-700">Enregistrer</Button>

                    <div className="space-y-4 mt-6">
                      {notes
                        .filter((note) => note.prospectId === prospect.id)
                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                        .map((note, index) => (
                          <Card key={index}>
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium">{note.title}</h4>
                                <p className="text-xs text-muted-foreground">{note.date}</p>
                              </div>
                              <p className="text-sm">{note.content}</p>
                              <div className="flex justify-end mt-2">
                                <Button variant="ghost" size="sm" onClick={() => handleEditNote(note)}>
                                  Modifier
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="documents" className="mt-0">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Documents partagés</h4>
                      <Button
                        className="bg-violet-600 hover:bg-violet-700"
                        onClick={() => setIsAddDocumentDialogOpen(true)}
                      >
                        Ajouter un document
                      </Button>
                    </div>

                    <div className="space-y-2">
                      {documents
                        .filter((doc) => doc.prospectId === prospect.id)
                        .map((doc, index) => (
                          <Card key={index}>
                            <CardContent className="p-4">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                  <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                                  <div>
                                    <p className="font-medium">{doc.name}</p>
                                    <p className="text-xs text-muted-foreground">Partagé le {doc.date}</p>
                                  </div>
                                </div>
                                <div>
                                  <Button variant="outline" size="sm">
                                    Télécharger
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}

                      {documents.filter((doc) => doc.prospectId === prospect.id).length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          <FileText className="h-12 w-12 mx-auto mb-2 opacity-20" />
                          <p>Aucun document partagé</p>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Dialogue de modification de note */}
      {editingNote && (
        <Dialog open={isEditNoteDialogOpen} onOpenChange={setIsEditNoteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Modifier la note</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="note-title" className="text-right">
                  Titre
                </Label>
                <Input id="note-title" className="col-span-3" defaultValue={editingNote.title} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="note-content" className="text-right">
                  Contenu
                </Label>
                <Textarea id="note-content" className="col-span-3" defaultValue={editingNote.content} rows={5} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditNoteDialogOpen(false)}>
                Annuler
              </Button>
              <Button
                className="bg-violet-600 hover:bg-violet-700"
                onClick={() => {
                  // Logique de sauvegarde ici
                  setIsEditNoteDialogOpen(false)
                }}
              >
                Enregistrer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Dialogue d'ajout de document */}
      <Dialog open={isAddDocumentDialogOpen} onOpenChange={setIsAddDocumentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter un document</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="document-name" className="text-right">
                Nom
              </Label>
              <Input id="document-name" className="col-span-3" placeholder="Nom du document" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="document-type" className="text-right">
                Type
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="devis">Devis</SelectItem>
                  <SelectItem value="contrat">Contrat</SelectItem>
                  <SelectItem value="brochure">Brochure</SelectItem>
                  <SelectItem value="autre">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="document-file" className="text-right">
                Fichier
              </Label>
              <Input id="document-file" type="file" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="document-description" className="text-right">
                Description
              </Label>
              <Textarea id="document-description" className="col-span-3" placeholder="Description du document" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDocumentDialogOpen(false)}>
              Annuler
            </Button>
            <Button
              className="bg-violet-600 hover:bg-violet-700"
              onClick={() => {
                // Logique d'ajout de document ici
                setIsAddDocumentDialogOpen(false)
              }}
            >
              Ajouter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Fonction pour obtenir la couleur de la bordure en fonction du type d'interaction
function getInteractionColor(type) {
  switch (type) {
    case "Appel":
      return "#3b82f6" // blue
    case "Email":
      return "#10b981" // green
    case "Rendez-vous":
      return "#8b5cf6" // violet
    case "Note":
      return "#f59e0b" // amber
    default:
      return "#6b7280" // gray
  }
}

// Données de démonstration
const prospects = [
  {
    id: "1",
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    phone: "06 12 34 56 78",
    company: "Entreprise A",
    address: "15 rue du Commerce, 75001 Paris",
    status: "nouveau",
    statusLabel: "Nouveau",
    lastInteraction: "05/05/2023",
    product: "Assurance Auto",
    value: "15 000 €",
    probability: "25%",
    closingDate: "30/06/2023",
  },
  {
    id: "2",
    name: "Marie Leroy",
    email: "marie.leroy@example.com",
    phone: "06 23 45 67 89",
    company: "Entreprise B",
    address: "8 avenue des Champs-Élysées, 75008 Paris",
    status: "interet",
    statusLabel: "Intérêt confirmé",
    lastInteraction: "03/05/2023",
    product: "Assurance Habitation",
    value: "25 000 €",
    probability: "40%",
    closingDate: "15/06/2023",
  },
  {
    id: "3",
    name: "Pierre Martin",
    email: "pierre.martin@example.com",
    phone: "06 34 56 78 90",
    company: "Entreprise C",
    address: "22 boulevard Haussmann, 75009 Paris",
    status: "negociation",
    statusLabel: "En négociation",
    lastInteraction: "28/04/2023",
    product: "Assurance Santé",
    value: "18 000 €",
    probability: "60%",
    closingDate: "10/06/2023",
  },
]

const interactions = [
  {
    prospectId: "1",
    type: "Appel",
    title: "Premier contact téléphonique",
    description: "Discussion sur les besoins en assurance auto. Client intéressé par une formule tous risques.",
    date: "05/05/2023",
  },
  {
    prospectId: "1",
    type: "Email",
    title: "Envoi de documentation",
    description: "Envoi des brochures sur nos offres d'assurance auto.",
    date: "03/05/2023",
  },
  {
    prospectId: "1",
    type: "Note",
    title: "Informations complémentaires",
    description: "Le client possède deux véhicules et souhaite une offre groupée.",
    date: "03/05/2023",
  },
  {
    prospectId: "2",
    type: "Rendez-vous",
    title: "Rendez-vous en agence",
    description: "Présentation détaillée de nos offres d'assurance habitation.",
    date: "03/05/2023",
  },
  {
    prospectId: "2",
    type: "Email",
    title: "Envoi de devis",
    description: "Envoi du devis personnalisé suite à notre rendez-vous.",
    date: "01/05/2023",
  },
  {
    prospectId: "3",
    type: "Appel",
    title: "Négociation tarifaire",
    description: "Discussion sur les options de l'assurance santé et négociation du tarif.",
    date: "28/04/2023",
  },
]

const notes = [
  {
    prospectId: "1",
    title: "Préférences du client",
    content:
      "Le client préfère être contacté par téléphone en fin de journée. Il est particulièrement sensible aux garanties d'assistance.",
    date: "04/05/2023",
  },
  {
    prospectId: "1",
    title: "Historique d'assurance",
    content: "Client assuré depuis 5 ans chez un concurrent. Aucun sinistre déclaré.",
    date: "03/05/2023",
  },
  {
    prospectId: "2",
    title: "Points d'attention",
    content:
      "La cliente a mentionné qu'elle avait des objets de valeur à son domicile. Penser à proposer une option objets de valeur.",
    date: "02/05/2023",
  },
]

const documents = [
  {
    prospectId: "1",
    name: "Devis_Assurance_Auto.pdf",
    date: "05/05/2023",
  },
  {
    prospectId: "1",
    name: "Brochure_Garanties.pdf",
    date: "03/05/2023",
  },
  {
    prospectId: "2",
    name: "Devis_Assurance_Habitation.pdf",
    date: "03/05/2023",
  },
]
