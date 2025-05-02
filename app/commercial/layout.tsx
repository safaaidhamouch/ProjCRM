import type React from "react"
import { Sidebar } from "@/components/sidebar"

export default function CommercialLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar role="commercial" />
      <div className="flex-1">{children}</div>
    </div>
  )
}
