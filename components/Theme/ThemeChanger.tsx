"use client"

import { useTheme } from "./theme-provider"
import { useState, useEffect } from "react"
import { Sun, Moon, Laptop } from "lucide-react"

export function ThemeChanger() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch by only rendering after component is mounted
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-background border border-muted rounded-lg p-1 shadow-md flex">
        <button
          onClick={() => setTheme("light")}
          className={`p-2 rounded-md ${
            theme === "light" ? "bg-primary text-background" : "text-foreground hover:bg-muted"
          }`}
          aria-label="Light mode"
        >
          <Sun size={18} />
        </button>
        
        <button
          onClick={() => setTheme("dark")}
          className={`p-2 rounded-md ${
            theme === "dark" ? "bg-primary text-background" : "text-foreground hover:bg-muted"
          }`}
          aria-label="Dark mode"
        >
          <Moon size={18} />
        </button>
        
        <button
          onClick={() => setTheme("system")}
          className={`p-2 rounded-md ${
            theme === "system" ? "bg-primary text-background" : "text-foreground hover:bg-muted"
          }`}
          aria-label="System preference"
        >
          <Laptop size={18} />
        </button>
      </div>
    </div>
  )
}
