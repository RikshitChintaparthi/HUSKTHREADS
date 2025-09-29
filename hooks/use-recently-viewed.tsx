"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

interface RecentlyViewedItem {
  id: string
  name: string
  price: number
  image: string
  category: string
  viewedAt: number
}

interface RecentlyViewedContextType {
  recentlyViewed: RecentlyViewedItem[]
  addToRecentlyViewed: (item: Omit<RecentlyViewedItem, "viewedAt">) => void
  clearRecentlyViewed: () => void
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined)

export function RecentlyViewedProvider({ children }: { children: React.ReactNode }) {
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedItem[]>([])

  useEffect(() => {
    const legacy = localStorage.getItem("sareva-recently-viewed")
    if (legacy && !localStorage.getItem("huskthread-recently-viewed")) {
      localStorage.setItem("huskthread-recently-viewed", legacy)
      localStorage.removeItem("sareva-recently-viewed")
    }
    const saved = localStorage.getItem("huskthread-recently-viewed")
    if (saved) {
      setRecentlyViewed(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("huskthread-recently-viewed", JSON.stringify(recentlyViewed))
  }, [recentlyViewed])

  const addToRecentlyViewed = (item: Omit<RecentlyViewedItem, "viewedAt">) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((i) => i.id !== item.id)
      const newItem = { ...item, viewedAt: Date.now() }
      return [newItem, ...filtered].slice(0, 10) // Keep only last 10 items
    })
  }

  const clearRecentlyViewed = () => {
    setRecentlyViewed([])
  }

  return (
    <RecentlyViewedContext.Provider
      value={{
        recentlyViewed,
        addToRecentlyViewed,
        clearRecentlyViewed,
      }}
    >
      {children}
    </RecentlyViewedContext.Provider>
  )
}

export function useRecentlyViewed() {
  const context = useContext(RecentlyViewedContext)
  if (context === undefined) {
    throw new Error("useRecentlyViewed must be used within a RecentlyViewedProvider")
  }
  return context
}
