"use client"
import { Home, User, BarChart3, Play } from 'lucide-react'
import { NavBar } from "@/components/ui/tubelight-navbar"

export function NavBarDemo() {
  const navItems = [
    { name: 'Home', url: '#hero', icon: Home },
    { name: 'Features', url: '#features', icon: User },
    { name: 'Statistics', url: '#statistics', icon: BarChart3 },
    { name: 'Demo', url: '#demo', icon: Play },
  ]

  return <NavBar items={navItems} />
} 