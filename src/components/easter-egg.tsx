'use client'

import { useEffect } from 'react'

const SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
]

export default function EasterEgg() {
  useEffect(() => {
    let index = 0
    const handler = (e: KeyboardEvent) => {
      if (e.key === SEQUENCE[index]) {
        index += 1
        if (index === SEQUENCE.length) {
          alert("You've found the secret garden! 🌼")
          index = 0
        }
      } else {
        index = 0
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return null
}
