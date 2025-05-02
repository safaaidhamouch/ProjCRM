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
import { Eye, Filter, MoreHorizontal, Pencil, Plus, Search, Trash2, Phone, Mail, Building } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm)

    const matchesStatus = statusFilter === "all" || client.paymentStatus === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Gestion des Clients</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-violet-600 hover:bg-violet-700">
              <Plus className="mr-2 h-4 w-4" /> Nouveau client
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Ajouter un nouveau client</DialogTitle>
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
                <Label htmlFor="company" className="text-right">
                  Entreprise
                </Label>
                <Input id="company" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="contractDate" className="text-right">
                  Date du contrat
                </Label>
                <Input id="contractDate" type="date" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="contractAmount" className="text-right">
                  Montant du contrat
                </Label>
                <Input id="contractAmount" className="col-span-3" placeholder="€" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="paymentStatus" className="text-right">
                  Statut paiement
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Sélectionner un statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upToDate">À jour</SelectItem>
                    <SelectItem value="late">En retard</SelectItem>
                  </SelectContent>
                </Select>
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
            placeholder="Rechercher un client..."
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
            <SelectItem value="upToDate">À jour</SelectItem>
            <SelectItem value="late">En retard</SelectItem>
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
                      <th className="p-4 font-medium">Entreprise</th>
                      <th className="p-4 font-medium">Date du contrat</th>
                      <th className="p-4 font-medium">Montant</th>
                      <th className="p-4 font-medium">Statut paiement</th>
                      <th className="p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredClients.map((client, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-4">{client.name}</td>
                        <td className="p-4">{client.email}</td>
                        <td className="p-4">{client.phone}</td>
                        <td className="p-4">{client.company}</td>
                        <td className="p-4">{client.contractDate}</td>
                        <td className="p-4">{client.contractAmount}</td>
                        <td className="p-4">
                          <Badge
                            variant="outline"
                            className={
                              client.paymentStatus === "upToDate"
                                ? "bg-green-100 text-green-700 hover:bg-green-100"
                                : "bg-red-100 text-red-700 hover:bg-red-100"
                            }
                          >
                            {client.paymentStatusLabel}
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
                                  <DialogTitle>Détails du client</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right font-medium">Nom</Label>
                                    <div className="col-span-3">{client.name}</div>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right font-medium">Email</Label>
                                    <div className="col-span-3">{client.email}</div>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right font-medium">Téléphone</Label>
                                    <div className="col-span-3">{client.phone}</div>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right font-medium">Entreprise</Label>
                                    <div className="col-span-3">{client.company}</div>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right font-medium">Date du contrat</Label>
                                    <div className="col-span-3">{client.contractDate}</div>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right font-medium">Montant</Label>
                                    <div className="col-span-3">{client.contractAmount}</div>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right font-medium">Statut paiement</Label>
                                    <div className="col-span-3">
                                      <Badge
                                        variant="outline"
                                        className={
                                          client.paymentStatus === "upToDate"
                                            ? "bg-green-100 text-green-700 hover:bg-green-100"
                                            : "bg-red-100 text-red-700 hover:bg-red-100"
                                        }
                                      >
                                        {client.paymentStatusLabel}
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
                                  <DialogTitle>Modifier le client</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-name" className="text-right">
                                      Nom
                                    </Label>
                                    <Input id="edit-name" className="col-span-3" defaultValue={client.name} />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-email" className="text-right">
                                      Email
                                    </Label>
                                    <Input
                                      id="edit-email"
                                      type="email"
                                      className="col-span-3"
                                      defaultValue={client.email}
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-phone" className="text-right">
                                      Téléphone
                                    </Label>
                                    <Input id="edit-phone" className="col-span-3" defaultValue={client.phone} />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-company" className="text-right">
                                      Entreprise
                                    </Label>
                                    <Input id="edit-company" className="col-span-3" defaultValue={client.company} />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-contractDate" className="text-right">
                                      Date du contrat
                                    </Label>
                                    <Input id="edit-contractDate" type="date" className="col-span-3" />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-contractAmount" className="text-right">
                                      Montant
                                    </Label>
                                    <Input
                                      id="edit-contractAmount"
                                      className="col-span-3"
                                      defaultValue={client.contractAmount}
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-paymentStatus" className="text-right">
                                      Statut paiement
                                    </Label>
                                    <Select defaultValue={client.paymentStatus}>
                                      <SelectTrigger className="col-span-3">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="upToDate">À jour</SelectItem>
                                        <SelectItem value="late">En retard</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                                <div className="flex justify-end">
                                  <Button type="submit" className="bg-violet-600 hover:bg-violet-700">
                                    Enregistrer
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>

                            <Button variant="ghost" size="icon" className="text-red-500" title="Supprimer">
                              <Trash2 className="h-4 w-4" />
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
                                <DropdownMenuItem>Historique des paiements</DropdownMenuItem>
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
            {filteredClients.map((client, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{client.name}</CardTitle>
                    <Badge
                      variant="outline"
                      className={
                        client.paymentStatus === "upToDate"
                          ? "bg-green-100 text-green-700 hover:bg-green-100"
                          : "bg-red-100 text-red-700 hover:bg-red-100"
                      }
                    >
                      {client.paymentStatusLabel}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                      {client.email}
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                      {client.phone}
                    </div>
                    <div className="flex items-center text-sm">
                      <Building className="mr-2 h-4 w-4 text-muted-foreground" />
                      {client.company}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Date du contrat:</span> {client.contractDate}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Montant:</span> {client.contractAmount}
                    </div>
                  </div>
                  <div className="flex justify-end mt-4 gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Eye className="h-3.5 w-3.5" />
                          Voir
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>Détails du client</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right font-medium">Nom</Label>
                            <div className="col-span-3">{client.name}</div>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right font-medium">Email</Label>
                            <div className="col-span-3">{client.email}</div>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right font-medium">Téléphone</Label>
                            <div className="col-span-3">{client.phone}</div>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right font-medium">Entreprise</Label>
                            <div className="col-span-3">{client.company}</div>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right font-medium">Date du contrat</Label>
                            <div className="col-span-3">{client.contractDate}</div>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right font-medium">Montant</Label>
                            <div className="col-span-3">{client.contractAmount}</div>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right font-medium">Statut paiement</Label>
                            <div className="col-span-3">
                              <Badge
                                variant="outline"
                                className={
                                  client.paymentStatus === "upToDate"
                                    ? "bg-green-100 text-green-700 hover:bg-green-100"
                                    : "bg-red-100 text-red-700 hover:bg-red-100"
                                }
                              >
                                {client.paymentStatusLabel}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Pencil className="h-3.5 w-3.5" />
                          Modifier
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>Modifier le client</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-name-card" className="text-right">
                              Nom
                            </Label>
                            <Input id="edit-name-card" className="col-span-3" defaultValue={client.name} />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-email-card" className="text-right">
                              Email
                            </Label>
                            <Input
                              id="edit-email-card"
                              type="email"
                              className="col-span-3"
                              defaultValue={client.email}
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-phone-card" className="text-right">
                              Téléphone
                            </Label>
                            <Input id="edit-phone-card" className="col-span-3" defaultValue={client.phone} />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-company-card" className="text-right">
                              Entreprise
                            </Label>
                            <Input id="edit-company-card" className="col-span-3" defaultValue={client.company} />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-contractDate-card" className="text-right">
                              Date du contrat
                            </Label>
                            <Input id="edit-contractDate-card" type="date" className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-contractAmount-card" className="text-right">
                              Montant
                            </Label>
                            <Input
                              id="edit-contractAmount-card"
                              className="col-span-3"
                              defaultValue={client.contractAmount}
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-paymentStatus-card" className="text-right">
                              Statut paiement
                            </Label>
                            <Select defaultValue={client.paymentStatus}>
                              <SelectTrigger className="col-span-3">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="upToDate">À jour</SelectItem>
                                <SelectItem value="late">En retard</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <Button type="submit" className="bg-violet-600 hover:bg-violet-700">
                            Enregistrer
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button variant="outline" size="sm" className="flex items-center gap-1 text-red-500">
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
    </div>
  )
}

const clients = [
  {
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    phone: "06 12 34 56 78",
    company: "Entreprise Dupont",
    contractDate: "15/03/2023",
    contractAmount: "12 500 €",
    paymentStatus: "upToDate",
    paymentStatusLabel: "À jour",
  },
  {
    name: "Marie Leroy",
    email: "marie.leroy@example.com",
    phone: "06 23 45 67 89",
    company: "Société Leroy",
    contractDate: "02/04/2023",
    contractAmount: "8 750 €",
    paymentStatus: "upToDate",
    paymentStatusLabel: "À jour",
  },
  {
    name: "Pierre Martin",
    email: "pierre.martin@example.com",
    phone: "06 34 56 78 90",
    company: "Martin & Associés",
    contractDate: "10/02/2023",
    contractAmount: "15 000 €",
    paymentStatus: "late",
    paymentStatusLabel: "En retard",
  },
  {
    name: "Sophie Bernard",
    email: "sophie.bernard@example.com",
    phone: "06 45 67 89 01",
    company: "Bernard SARL",
    contractDate: "22/04/2023",
    contractAmount: "9 800 €",
    paymentStatus: "upToDate",
    paymentStatusLabel: "À jour",
  },
  {
    name: "Thomas Petit",
    email: "thomas.petit@example.com",
    phone: "06 56 78 90 12",
    company: "Petit Entreprise",
    contractDate: "05/01/2023",
    contractAmount: "22 500 €",
    paymentStatus: "late",
    paymentStatusLabel: "En retard",
  },
  {
    name: "Julie Moreau",
    email: "julie.moreau@example.com",
    phone: "06 67 89 01 23",
    company: "Moreau & Fils",
    contractDate: "18/03/2023",
    contractAmount: "7 500 €",
    paymentStatus: "upToDate",
    paymentStatusLabel: "À jour",
  },
]
