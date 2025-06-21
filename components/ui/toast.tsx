"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const toastVariants = cva(
  "pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive:
          "destructive group border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {
  id: string
  title?: string
  description?: string
  action?: ToastActionElement
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export type ToastActionElement = React.ReactElement<{
  altText: string
  onClick?: () => void
}>

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ title, description, variant, className, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={cn(toastVariants({ variant, className }))}
        {...props}
      >
        <div className="grid gap-1">
          {title && <div className="text-sm font-semibold">{title}</div>}
          {description && (
            <div className="text-sm opacity-90">{description}</div>
          )}
        </div>
      </div>
    )
  }
)
Toast.displayName = "Toast"

export const ToastViewport = React.forwardRef<HTMLOListElement, React.ComponentPropsWithoutRef<"ol">>(
  ({ className, ...props }, ref) => (
    <ol
      ref={ref}
      className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]"
      {...props}
    />
  )
)
ToastViewport.displayName = "ToastViewport"

// Exportações adicionais para compatibilidade
export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

export const ToastTitle = ({ children }: { children: React.ReactNode }) => {
  return <div className="text-sm font-semibold">{children}</div>
}

export const ToastDescription = ({ children }: { children: React.ReactNode }) => {
  return <div className="text-sm opacity-90">{children}</div>
}

export const ToastAction = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<"button"> & { altText: string }>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className="inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium"
      {...props}
    />
  )
)
ToastAction.displayName = "ToastAction"

export const ToastClose = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<"button">>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className="absolute right-2 top-2 rounded-md p-1 opacity-70 hover:opacity-100"
      {...props}
    >
      ×
    </button>
  )
)
ToastClose.displayName = "ToastClose" 