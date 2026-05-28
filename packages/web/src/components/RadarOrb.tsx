'use client'

import React from 'react'

interface RadarOrbProps {
  size?: number
  showLabel?: boolean
  className?: string
}

export default function RadarOrb({
  size = 320,
  showLabel = true,
  className = '',
}: RadarOrbProps) {
  const center = size / 2
  const rings = [
    { delay: '0s',    duration: '2.4s', opacity: 0.7 },
    { delay: '0.6s',  duration: '2.4s', opacity: 0.55 },
    { delay: '1.2s',  duration: '2.4s', opacity: 0.4 },
    { delay: '1.8s',  duration: '2.4s', opacity: 0.25 },
  ]

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* SVG radar rings */}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ position: 'absolute', inset: 0, overflow: 'visible' }}
        aria-hidden="true"
      >
        {/* Static concentric guide rings */}
        {[0.2, 0.38, 0.56, 0.74].map((ratio, i) => (
          <circle
            key={`guide-${i}`}
            cx={center}
            cy={center}
            r={center * ratio}
            fill="none"
            stroke="rgba(0, 240, 255, 0.08)"
            strokeWidth="1"
          />
        ))}

        {/* Cross hair lines */}
        <line
          x1={center} y1={0}
          x2={center} y2={size}
          stroke="rgba(0,240,255,0.06)"
          strokeWidth="1"
          strokeDasharray="4 8"
        />
        <line
          x1={0} y1={center}
          x2={size} y2={center}
          stroke="rgba(0,240,255,0.06)"
          strokeWidth="1"
          strokeDasharray="4 8"
        />

        {/* Radar sweep — rotating gradient wedge */}
        <defs>
          <radialGradient id="sweep-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#00F0FF" stopOpacity="0" />
            <stop offset="100%" stopColor="#00F0FF" stopOpacity="0.18" />
          </radialGradient>
          <linearGradient id="sweep-line" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#00F0FF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#00F0FF" stopOpacity="0" />
          </linearGradient>
          <filter id="orb-glow">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="outer-glow">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Sweep cone */}
        <g
          style={{
            transformOrigin: `${center}px ${center}px`,
            animation: 'radar-sweep 3s linear infinite',
          }}
        >
          <path
            d={`M ${center} ${center} L ${center} ${center - center * 0.85} A ${center * 0.85} ${center * 0.85} 0 0 1 ${center + center * 0.85 * Math.sin((Math.PI / 180) * 60)} ${center - center * 0.85 * Math.cos((Math.PI / 180) * 60)} Z`}
            fill="url(#sweep-grad)"
          />
          {/* Leading edge line */}
          <line
            x1={center}
            y1={center}
            x2={center}
            y2={center - center * 0.85}
            stroke="#00F0FF"
            strokeWidth="1.5"
            strokeOpacity="0.5"
          />
        </g>

        {/* Pulsing rings */}
        {rings.map((ring, i) => (
          <circle
            key={`pulse-${i}`}
            cx={center}
            cy={center}
            r={center * 0.18}
            fill="none"
            stroke="#00F0FF"
            strokeWidth="1.5"
            style={{
              transformOrigin: `${center}px ${center}px`,
              animation: `radar-pulse ${ring.duration} ease-out infinite`,
              animationDelay: ring.delay,
              opacity: ring.opacity,
            }}
          />
        ))}

        {/* Outer glow ring */}
        <circle
          cx={center}
          cy={center}
          r={center * 0.84}
          fill="none"
          stroke="rgba(0,240,255,0.12)"
          strokeWidth="1"
        />

        {/* Central orb outer halo */}
        <circle
          cx={center}
          cy={center}
          r={28}
          fill="rgba(0,240,255,0.08)"
          filter="url(#outer-glow)"
        />

        {/* Central orb */}
        <circle
          cx={center}
          cy={center}
          r={18}
          fill="#00F0FF"
          filter="url(#orb-glow)"
          style={{ animation: 'glow-pulse 2s ease-in-out infinite' }}
        />

        {/* Inner orb highlight */}
        <circle
          cx={center - 5}
          cy={center - 5}
          r={5}
          fill="rgba(255,255,255,0.6)"
        />
      </svg>

      {/* YOU label */}
      {showLabel && (
        <div
          style={{
            position: 'absolute',
            bottom: center - 48,
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            fontWeight: 600,
            color: '#00F0FF',
            letterSpacing: '0.15em',
            textShadow: '0 0 10px rgba(0,240,255,0.8)',
            pointerEvents: 'none',
          }}
        >
          YOU
        </div>
      )}
    </div>
  )
}
