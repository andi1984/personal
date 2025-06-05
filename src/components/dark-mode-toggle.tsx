'use client'

import { useEffect, useState } from 'react'
import { Button } from './ui/button'

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const enabled = stored ? stored === 'dark' : prefersDark
    document.documentElement.classList.toggle('dark', enabled)
    setIsDark(enabled)
  }, [])

  const toggle = () => {
    const newDark = !isDark
    document.documentElement.classList.toggle('dark', newDark)
    localStorage.setItem('theme', newDark ? 'dark' : 'light')
    setIsDark(newDark)
  }

  return (
    <Button variant="ghost" onClick={toggle} className="mt-2 md:mt-0">
      {isDark ? 'Light Mode' : 'Dark Mode'}
    </Button>
  )
}

export default DarkModeToggle
