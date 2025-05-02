"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PipelinePage() {
  const [columns, setColumns] = useState(initialColumns)

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result

    // If there's no destination or if the item was dropped back to its original position
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return
    }

    const sourceColumn = columns[source.droppableId]
    const destColumn = columns[destination.droppableId]

    // If moving within the same column
    if (source.droppableId === destination.droppableId) {
      const newItems = Array.from(sourceColumn.items)
      const [movedItem] = newItems.splice(source.index, 1)
      newItems.splice(destination.index, 0, movedItem)

      const newColumn = {
        ...sourceColumn,
        items: newItems,
      }

      setColumns({
        ...columns,
        [source.droppableId]: newColumn,
      })
    } else {
      // Moving from one column to another
      const sourceItems = Array.from(sourceColumn.items)
      const destItems = Array.from(destColumn.items)
      const [movedItem] = sourceItems.splice(source.index, 1)

      // Update the status of the item to match the new column
      const updatedItem = {
        ...movedItem,
        status: destination.droppableId,
      }

      destItems.splice(destination.index, 0, updatedItem)

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      })
    }
  }

  const getColumnTotal = (columnId) => {
    return columns[columnId].items.reduce((total, item) => total + item.value, 0)
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Pipeline de Vente</h2>
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
                <Label htmlFor="company" className="text-right">
                  Entreprise
                </Label>
                <Input id="company" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="value" className="text-right">
                  Valeur estimée
                </Label>
                <Input id="value" className="col-span-3" placeholder="€" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="product" className="text-right">
                  Produit
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Sélectionner un produit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Assurance Auto</SelectItem>
                    <SelectItem value="habitation">Assurance Habitation</SelectItem>
                    <SelectItem value="sante">Assurance Santé</SelectItem>
                    <SelectItem value="vie">Assurance Vie</SelectItem>
                    <SelectItem value="entreprise">Assurance Entreprise</SelectItem>
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

      <div className="flex overflow-x-auto pb-4 space-x-4">
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.entries(columns).map(([columnId, column]) => (
            <div key={columnId} className="flex-shrink-0 w-80">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{column.name}</CardTitle>
                    <Badge variant="outline" className="bg-violet-100 text-violet-700 hover:bg-violet-100">
                      {column.items.length}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Valeur totale: {getColumnTotal(columnId).toLocaleString()} €
                  </div>
                </CardHeader>
                <CardContent className="p-2">
                  <Droppable droppableId={columnId}>
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef} className="min-h-[500px] space-y-2">
                        {column.items.map((item, index) => (
                          <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="border rounded-md p-3 bg-white shadow-sm"
                              >
                                <div className="font-medium">{item.name}</div>
                                <div className="text-sm text-muted-foreground">{item.company}</div>
                                <div className="flex justify-between items-center mt-2">
                                  <div className="text-sm">{item.value.toLocaleString()} €</div>
                                  <Badge
                                    variant="outline"
                                    className="text-xs bg-violet-50 text-violet-700 hover:bg-violet-50"
                                  >
                                    {item.product}
                                  </Badge>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </CardContent>
              </Card>
            </div>
          ))}
        </DragDropContext>
      </div>
    </div>
  )
}

const initialColumns = {
  nouveau: {
    name: "Nouveau",
    items: [
      {
        id: "1",
        name: "Jean Dupont",
        company: "Entreprise A",
        value: 15000,
        product: "Auto",
        status: "nouveau",
      },
      {
        id: "2",
        name: "Marie Leroy",
        company: "Entreprise B",
        value: 25000,
        product: "Habitation",
        status: "nouveau",
      },
      {
        id: "3",
        name: "Pierre Martin",
        company: "Entreprise C",
        value: 18000,
        product: "Santé",
        status: "nouveau",
      },
      {
        id: "4",
        name: "Sophie Bernard",
        company: "Entreprise D",
        value: 30000,
        product: "Entreprise",
        status: "nouveau",
      },
    ],
  },
  interet: {
    name: "Intérêt confirmé",
    items: [
      {
        id: "5",
        name: "Thomas Petit",
        company: "Entreprise E",
        value: 22000,
        product: "Auto",
        status: "interet",
      },
      {
        id: "6",
        name: "Julie Moreau",
        company: "Entreprise F",
        value: 35000,
        product: "Vie",
        status: "interet",
      },
      {
        id: "7",
        name: "Nicolas Dubois",
        company: "Entreprise G",
        value: 28000,
        product: "Habitation",
        status: "interet",
      },
    ],
  },
  negociation: {
    name: "En négociation",
    items: [
      {
        id: "8",
        name: "Camille Roux",
        company: "Entreprise H",
        value: 45000,
        product: "Entreprise",
        status: "negociation",
      },
      {
        id: "9",
        name: "Lucas Girard",
        company: "Entreprise I",
        value: 32000,
        product: "Santé",
        status: "negociation",
      },
    ],
  },
  proposition: {
    name: "Proposition",
    items: [
      {
        id: "10",
        name: "Emma Lambert",
        company: "Entreprise J",
        value: 55000,
        product: "Entreprise",
        status: "proposition",
      },
      {
        id: "11",
        name: "Hugo Fournier",
        company: "Entreprise K",
        value: 38000,
        product: "Auto",
        status: "proposition",
      },
    ],
  },
  contrat: {
    name: "Contrat",
    items: [
      {
        id: "12",
        name: "Léa Mercier",
        company: "Entreprise L",
        value: 65000,
        product: "Entreprise",
        status: "contrat",
      },
    ],
  },
}
