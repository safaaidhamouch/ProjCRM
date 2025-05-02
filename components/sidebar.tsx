"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  BarChart3,
  ChevronRight,
  FileText,
  Home,
  LineChart,
  LogOut,
  Menu,
  PieChart,
  Settings,
  Target,
  Users,
  Calendar,
  Mail,
  Share2,
  Building,
  Shield,
  AlertTriangle,
  RefreshCw,
  ChevronLeft,
  LayoutDashboard,
  Phone,
  Briefcase,
  FileBarChart,
  CircleDollarSign,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useMobile } from "@/hooks/use-mobile"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface SidebarProps {
  role: "ceo" | "commercial" | "marketing" | "erp"
}

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [open, setOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [autoCollapse, setAutoCollapse] = useState(false)

  // Timer for auto-collapse
  useEffect(() => {
    let timer: NodeJS.Timeout

    if (autoCollapse) {
      timer = setTimeout(() => {
        setCollapsed(true)
      }, 3000) // Auto-collapse after 3 seconds of inactivity
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [autoCollapse])

  // Mouse enter/leave handlers
  const handleMouseEnter = () => {
    setAutoCollapse(false)
    if (collapsed) setCollapsed(false)
  }

  const handleMouseLeave = () => {
    setAutoCollapse(true)
  }

  const getRoleTitle = () => {
    switch (role) {
      case "ceo":
        return "Direction Générale"
      case "commercial":
        return "Commercial"
      case "marketing":
        return "Marketing"
      case "erp":
        return "ERP Assurance"
      default:
        return "Direction Générale"
    }
  }

  const getNavItems = () => {
    switch (role) {
      case "ceo":
        return [
          {
            title: "Tableau de Bord",
            href: `/ceo/dashboard`,
            icon: Home,
          },
          {
            title: "Performances",
            href: `/ceo/performance`,
            icon: BarChart3,
          },
          {
            title: "Objectifs",
            href: `/ceo/goals`,
            icon: Target,
          },
          {
            title: "Paramètres",
            href: `/ceo/settings`,
            icon: Settings,
          },
        ]
      case "commercial":
        return [
          {
            title: "Tableau de Bord",
            href: `/commercial/dashboard`,
            icon: Home,
          },
          {
            title: "Prospects",
            href: `/commercial/prospects`,
            icon: Users,
          },
          {
            title: "Pipeline",
            href: `/commercial/pipeline`,
            icon: PieChart,
          },
          {
            title: "Clients",
            href: `/commercial/clients`,
            icon: Building,
          },
          {
            title: "Paramètres",
            href: `/commercial/settings`,
            icon: Settings,
          },
        ]
      case "marketing":
        return [
          {
            title: "Tableau de Bord",
            href: `/marketing/dashboard`,
            icon: Home,
          },
          {
            title: "Campagnes",
            href: `/marketing/campaigns`,
            icon: Target,
          },
          {
            title: "Emails",
            href: `/marketing/emails`,
            icon: Mail,
          },
          {
            title: "Réseaux Sociaux",
            href: `/marketing/social`,
            icon: Share2,
          },
          {
            title: "Contenus",
            href: `/marketing/content`,
            icon: FileText,
          },
          {
            title: "Événements",
            href: `/marketing/events`,
            icon: Calendar,
          },
          {
            title: "KPIs",
            href: `/marketing/kpis`,
            icon: LineChart,
          },
          {
            title: "Paramètres",
            href: `/marketing/settings`,
            icon: Settings,
          },
        ]
      case "erp":
        return [
          // Section Tableau de bord
          {
            title: "Tableau de Bord",
            href: `/erp/dashboard`,
            icon: LayoutDashboard,
            section: "dashboard",
          },

          // Section Entreprises et Contacts
          {
            title: "Entreprises",
            href: `/erp/companies`,
            icon: Building,
            section: "clients",
          },
          {
            title: "Contacts",
            href: `/erp/contacts`,
            icon: Phone,
            section: "clients",
          },

          // Section Contrats et Renouvellements
          {
            title: "Contrats",
            href: `/erp/contracts`,
            icon: FileText,
            section: "contracts",
          },
          {
            title: "Renouvellements",
            href: `/erp/renewals`,
            icon: RefreshCw,
            section: "contracts",
          },
          {
            title: "Couvertures",
            href: `/erp/coverages`,
            icon: Shield,
            section: "contracts",
          },
          {
            title: "Sinistres",
            href: `/erp/claims`,
            icon: AlertTriangle,
            section: "contracts",
          },

          // Section Rapports
          {
            title: "Types de contrats",
            href: `/erp/reports/contract-types`,
            icon: PieChart,
            section: "reports",
          },
          {
            title: "Contrats récents",
            href: `/erp/reports/recent-contracts`,
            icon: FileText,
            section: "reports",
          },
          {
            title: "Sinistres récents",
            href: `/erp/reports/recent-claims`,
            icon: AlertTriangle,
            section: "reports",
          },

          // Section ERP
          {
            title: "Inventaire",
            href: `/erp/inventory`,
            icon: Briefcase,
            section: "erp",
          },
          {
            title: "Achats",
            href: `/erp/purchasing`,
            icon: CircleDollarSign,
            section: "erp",
          },
          {
            title: "Finance",
            href: `/erp/finance`,
            icon: FileBarChart,
            section: "erp",
          },
          {
            title: "Ressources Humaines",
            href: `/erp/hr`,
            icon: Users,
            section: "erp",
          },

          // Section Paramètres
          {
            title: "Paramètres",
            href: `/erp/settings`,
            icon: Settings,
            section: "settings",
          },
        ]
      default:
        return []
    }
  }

  const navItems = getNavItems()

  // Group ERP items by section
  const sections = role === "erp" ? Array.from(new Set(navItems.map((item) => item.section))) : []

  const SidebarContent = (
    <div className="flex h-full flex-col" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="flex h-14 items-center border-b px-4">
        <Link href={`/${role}/dashboard`} className="flex items-center gap-2 font-semibold text-lg text-violet-900">
          <Shield className="h-6 w-6 text-violet-600" />
          {!collapsed && <span>AssurCRM</span>}
        </Link>
        {!collapsed && !isMobile && (
          <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setCollapsed(true)}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
        )}
        {collapsed && !isMobile && (
          <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setCollapsed(false)}>
            <ChevronRight className="h-5 w-5" />
          </Button>
        )}
      </div>
      <ScrollArea className="flex-1 py-4">
        <nav className="grid gap-2 px-2">
          {role === "erp"
            ? // Grouped navigation for ERP
              sections.map((section) => (
                <div key={section} className="mb-4">
                  {!collapsed && (
                    <div className="mb-2 px-3 text-xs font-semibold uppercase text-muted-foreground">
                      {section === "dashboard"
                        ? "Tableau de bord"
                        : section === "clients"
                          ? "Clients"
                          : section === "contracts"
                            ? "Contrats"
                            : section === "erp"
                              ? "Système ERP"
                              : section === "reports"
                                ? "Rapports"
                                : "Paramètres"}
                    </div>
                  )}
                  {navItems
                    .filter((item) => item.section === section)
                    .map((item, index) => (
                      <TooltipProvider key={index} delayDuration={0}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link
                              href={item.href}
                              onClick={() => setOpen(false)}
                              className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-violet-100 hover:text-violet-900 transition-colors",
                                pathname === item.href ? "bg-violet-100 text-violet-900" : "text-gray-500",
                              )}
                            >
                              <item.icon className="h-5 w-5" />
                              {!collapsed && (
                                <>
                                  {item.title}
                                  {pathname === item.href && <ChevronRight className="ml-auto h-4 w-4" />}
                                </>
                              )}
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent side="right" className={cn("z-50", !collapsed && "hidden")}>
                            {item.title}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                </div>
              ))
            : // Regular navigation for other roles
              navItems.map((item, index) => (
                <TooltipProvider key={index} delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-violet-100 hover:text-violet-900 transition-colors",
                          pathname === item.href ? "bg-violet-100 text-violet-900" : "text-gray-500",
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                        {!collapsed && (
                          <>
                            {item.title}
                            {pathname === item.href && <ChevronRight className="ml-auto h-4 w-4" />}
                          </>
                        )}
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right" className={cn("z-50", !collapsed && "hidden")}>
                      {item.title}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
        </nav>
      </ScrollArea>
      <div className="mt-auto border-t p-4">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="text-sm">
              <div className="font-medium">Utilisateur</div>
              <div className="text-xs text-gray-500">{getRoleTitle()}</div>
            </div>
          )}
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className={collapsed ? "" : "ml-auto"} asChild>
                  <Link href="/">
                    <LogOut className="h-5 w-5" />
                    <span className="sr-only">Déconnexion</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className={cn("z-50", !collapsed && "hidden")}>
                Déconnexion
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  )

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="fixed left-4 top-4 z-40 lg:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          {SidebarContent}
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div
      className={cn(
        "hidden border-r bg-white lg:block transition-all duration-300 ease-in-out",
        collapsed ? "lg:w-16" : "lg:w-64",
      )}
    >
      {SidebarContent}
    </div>
  )
}
