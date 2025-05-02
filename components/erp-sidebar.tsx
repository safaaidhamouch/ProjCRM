"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Building2,
  FileText,
  ClipboardList,
  Shield,
  AlertTriangle,
  RefreshCw,
  PieChart,
  ChevronRight,
  ChevronDown,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

interface NavItemProps {
  href: string
  icon: React.ElementType
  title: string
  isActive?: boolean
  isExpanded?: boolean
  hasChildren?: boolean
  onClick?: () => void
}

const NavItem = ({
  href,
  icon: Icon,
  title,
  isActive = false,
  isExpanded = false,
  hasChildren = false,
  onClick,
}: NavItemProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
        isActive ? "bg-purple-100 text-purple-900 font-medium" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
      )}
      onClick={onClick}
    >
      <Icon className="h-5 w-5" />
      <span className="flex-1">{title}</span>
      {hasChildren && (isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />)}
    </Link>
  )
}

export default function ERPSidebar() {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    companies: true,
    contracts: true,
  })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  if (isMobile) {
    return null
  }

  return (
    <div className="hidden md:flex h-full w-56 flex-col border-r bg-white">
      <div className="flex flex-col gap-1 p-4">
        <h2 className="px-3 text-lg font-semibold tracking-tight">ERP Assurance</h2>

        <div className="mt-4 space-y-1">
          <NavItem
            href="/erp/dashboard"
            icon={BarChart3}
            title="Tableau de bord"
            isActive={pathname === "/erp/dashboard"}
          />

          {/* Entreprises & Contacts */}
          <NavItem
            href="#"
            icon={Building2}
            title="Entreprises & Contacts"
            isActive={pathname.includes("/erp/companies") || pathname.includes("/erp/contacts")}
            isExpanded={expandedSections.companies}
            hasChildren={true}
            onClick={() => toggleSection("companies")}
          />

          {expandedSections.companies && (
            <div className="ml-6 space-y-1 border-l border-gray-200 pl-2">
              <NavItem
                href="/erp/companies"
                icon={Building2}
                title="Entreprises"
                isActive={pathname === "/erp/companies"}
              />
              <NavItem href="/erp/contacts" icon={FileText} title="Contacts" isActive={pathname === "/erp/contacts"} />
            </div>
          )}

          {/* Contrats */}
          <NavItem
            href="#"
            icon={ClipboardList}
            title="Contrats"
            isActive={pathname.includes("/erp/contracts")}
            isExpanded={expandedSections.contracts}
            hasChildren={true}
            onClick={() => toggleSection("contracts")}
          />

          {expandedSections.contracts && (
            <div className="ml-6 space-y-1 border-l border-gray-200 pl-2">
              <NavItem
                href="/erp/contracts"
                icon={ClipboardList}
                title="Tous les contrats"
                isActive={pathname === "/erp/contracts"}
              />
              <NavItem
                href="/erp/contracts/new"
                icon={FileText}
                title="Nouveau contrat"
                isActive={pathname === "/erp/contracts/new"}
              />
            </div>
          )}

          <NavItem
            href="/erp/renewals"
            icon={RefreshCw}
            title="Renouvellements"
            isActive={pathname === "/erp/renewals"}
          />

          <NavItem href="/erp/coverages" icon={Shield} title="Couvertures" isActive={pathname === "/erp/coverages"} />

          <NavItem href="/erp/claims" icon={AlertTriangle} title="Sinistres" isActive={pathname === "/erp/claims"} />

          <NavItem href="/erp/reports" icon={PieChart} title="Rapports" isActive={pathname === "/erp/reports"} />
        </div>
      </div>
    </div>
  )
}
