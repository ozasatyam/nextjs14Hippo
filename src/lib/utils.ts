import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function formatPrice(price: number | string, options: {
  currency?: "CAD" | "EUR" | "GBP" | "BDT",
  notation?: Intl.NumberFormatOptions["notation"]
} = {}) {
  const { currency = "CAD", notation = "compact" } = options
  const numericPrice = typeof price === "string" ? parseFloat(price) : price
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation,
    maximumSignificantDigits: 2
  })
  return formatter.format(numericPrice)
}