'use client'

import React, { useEffect, useRef, useState } from 'react'

interface StatsCounterProps {
  target: number
  duration?: number
  prefix?: string
  suffix?: string
  label: string
  className?: string
}

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

export default function StatsCounter({
  target,
  duration = 2000,
  prefix = '',
  suffix = '',
  label,
  className = '',
}: StatsCounterProps) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [hasStarted])

  useEffect(() => {
    if (!hasStarted) return

    const startTime = performance.now()

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutExpo(progress)
      setCount(Math.round(easedProgress * target))

      if (progress < 1) {
        requestAnimationFrame(tick)
      }
    }

    const raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [hasStarted, target, duration])

  const formatted = count.toLocaleString('en-US')

  return (
    <div
      ref={ref}
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: 700,
          color: '#00F0FF',
          textShadow: '0 0 30px rgba(0,240,255,0.5)',
          lineHeight: 1,
          letterSpacing: '-0.02em',
          animation: hasStarted ? 'count-flicker 0.1s ease-in-out' : 'none',
        }}
      >
        {prefix}{formatted}{suffix}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.9rem',
          fontWeight: 500,
          color: 'var(--color-muted)',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </div>
    </div>
  )
}
