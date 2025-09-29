import { cn } from "@/lib/utils"

interface ProductBadgeProps {
  type: "new" | "sold-out" | "sale"
  savings?: number
  className?: string
}

export function ProductBadge({ type, savings, className }: ProductBadgeProps) {
  const getBadgeContent = () => {
    switch (type) {
      case "new":
        return { text: "NEW", bgColor: "bg-primary", textColor: "text-primary-foreground" }
      case "sold-out":
        return { text: "SOLD OUT", bgColor: "bg-destructive", textColor: "text-destructive-foreground" }
      case "sale":
        return {
          text: savings ? `Save ₹${savings}` : "SALE",
          bgColor: "bg-green-600",
          textColor: "text-white",
        }
      default:
        return { text: "", bgColor: "", textColor: "" }
    }
  }

  const { text, bgColor, textColor } = getBadgeContent()

  return (
    <div
      className={cn("absolute top-2 left-2 z-10 px-2 py-1 text-xs font-bold rounded-md", bgColor, textColor, className)}
    >
      {text}
    </div>
  )
}
