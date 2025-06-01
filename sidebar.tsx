import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ChevronLeft, ChevronRight, LucideIcon } from "lucide-react"

import { cn } from "../../lib/utils"
import { Button } from "./button"
import { Input } from "./input"

const sidebarVariants = cva(
  "fixed top-0 h-screen bg-background transition-all duration-300 ease-in-out",
  {
    variants: {
      position: {
        left: "left-0 border-r",
        right: "right-0 border-l",
      },
      size: {
        sm: "w-64",
        default: "w-72",
        lg: "w-80",
      },
      collapsed: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        position: "left",
        collapsed: true,
        className: "translate-x-[-100%] sm:translate-x-[-80%]",
      },
      {
        position: "right",
        collapsed: true,
        className: "translate-x-[100%] sm:translate-x-[80%]",
      },
    ],
    defaultVariants: {
      position: "left",
      size: "default",
      collapsed: false,
    },
  }
)

interface SidebarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarVariants> {
  icon?: LucideIcon
  defaultCollapsed?: boolean
  collapsible?: boolean
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      className,
      position,
      size,
      collapsed: controlledCollapsed,
      defaultCollapsed = false,
      collapsible = true,
      icon: Icon,
      children,
      ...props
    },
    ref
  ) => {
    const [collapsed, setCollapsed] = React.useState(defaultCollapsed)

    React.useEffect(() => {
      if (controlledCollapsed !== undefined) {
        setCollapsed(!!controlledCollapsed)
      }
    }, [controlledCollapsed])

    return (
      <div
        ref={ref}
        data-collapsed={collapsed}
        className={cn(
          sidebarVariants({ position, size, collapsed }),
          "z-50",
          className
        )}
        {...props}
      >
        <div className="h-full w-full overflow-y-auto">
          <div className="h-full w-full px-4 py-6">{children}</div>
        </div>
        {collapsible && (
          <div
            className={cn(
              "absolute top-3 z-50 flex h-6 w-6 items-center justify-center rounded-sm bg-background",
              position === "left"
                ? "right-[-12px] border-r"
                : "left-[-12px] border-l"
            )}
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4"
              onClick={() => setCollapsed(!collapsed)}
            >
              {position === "left" ? (
                collapsed ? (
                  <ChevronRight className="h-3 w-3" />
                ) : (
                  <ChevronLeft className="h-3 w-3" />
                )
              ) : collapsed ? (
                <ChevronLeft className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
              <span className="sr-only">Toggle Sidebar</span>
            </Button>
          </div>
        )}
      </div>
    )
  }
)
Sidebar.displayName = "Sidebar"

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mb-2 flex items-center justify-between", className)}
    {...props}
  />
))
SidebarHeader.displayName = "SidebarHeader"

const SidebarHeaderTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-lg font-semibold tracking-tight", className)}
    {...props}
  />
))
SidebarHeaderTitle.displayName = "SidebarHeaderTitle"

const SidebarSearch = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("mb-2", className)} {...props} />
))
SidebarSearch.displayName = "SidebarSearch"

const SidebarSearchInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <Input
    ref={ref}
    className={cn("h-8 w-full", className)}
    placeholder="Search..."
    {...props}
  />
))
SidebarSearchInput.displayName = "SidebarSearchInput"

const SidebarSection = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("pb-4 pt-2", className)}
    {...props}
  />
))
SidebarSection.displayName = "SidebarSection"

const SidebarSectionTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mb-2 text-xs font-medium text-muted-foreground", className)}
    {...props}
  />
))
SidebarSectionTitle.displayName = "SidebarSectionTitle"

const SidebarNav = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("grid gap-1", className)}
    {...props}
  />
))
SidebarNav.displayName = "SidebarNav"

interface SidebarNavItemProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean
  icon?: LucideIcon
}

const SidebarNavItem = React.forwardRef<HTMLAnchorElement, SidebarNavItemProps>(
  ({ className, children, icon: Icon, active, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(
          "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
          active
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
          className
        )}
        {...props}
      >
        {Icon && <Icon className="h-4 w-4" />}
        <span>{children}</span>
      </a>
    )
  }
)
SidebarNavItem.displayName = "SidebarNavItem"

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mt-auto", className)}
    {...props}
  />
))
SidebarFooter.displayName = "SidebarFooter"

export {
  Sidebar,
  SidebarHeader,
  SidebarHeaderTitle,
  SidebarSearch,
  SidebarSearchInput,
  SidebarSection,
  SidebarSectionTitle,
  SidebarNav,
  SidebarNavItem,
  SidebarFooter,
}
