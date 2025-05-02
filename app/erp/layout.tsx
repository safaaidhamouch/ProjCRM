import type React from "react"
import { Sidebar } from "@/components/sidebar"

export default function ERPLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar role="erp" />
      <div className="flex-1">{children}</div>
    </div>
  )
}
