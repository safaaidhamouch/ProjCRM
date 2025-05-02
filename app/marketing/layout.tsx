import type React from "react"
import { Sidebar } from "@/components/sidebar"

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar role="marketing" />
      <div className="flex-1">{children}</div>
    </div>
  )
}
