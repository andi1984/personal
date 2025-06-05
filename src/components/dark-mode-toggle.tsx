'use client'

import { useEffect, useState } from 'react'
import { Button } from './ui/button'

const DarkModeToggle = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const current: 'light' | 'dark' = stored ?? (prefersDark ? 'dark' : 'light')
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(current)
    setTheme(current)
  }, [])

  const toggle = () => {
    const newTheme: 'light' | 'dark' = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(newTheme)
    localStorage.setItem('theme', newTheme)
    setTheme(newTheme)
  }

  return (
    <Button variant="ghost" onClick={toggle} className="mt-2 md:mt-0">
      {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
    </Button>
  )
}

export default DarkModeToggle
