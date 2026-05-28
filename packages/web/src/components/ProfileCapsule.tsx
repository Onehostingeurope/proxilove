'use client'

import React from 'react'

interface ProfileCapsuleProps {
  name: string
  age: number
  distance: string
  locked?: boolean
  avatarColor?: string
  style?: React.CSSProperties
  animationDelay?: string
  animationName?: string
}

const AVATAR_COLORS = [
  'linear-gradient(135deg, #FF6B9D, #FF8E53)',
  'linear-gradient(135deg, #4FACFE, #00F2FE)',
  'linear-gradient(135deg, #43E97B, #38F9D7)',
  'linear-gradient(135deg, #FA709A, #FEE140)',
  'linear-gradient(135deg, #A18CD1, #FBC2EB)',
]

export default function ProfileCapsule({
  name,
  age,
  distance,
  locked = false,
  avatarColor,
  style = {},
  animationDelay = '0s',
  animationName = 'float',
}: ProfileCapsuleProps) {
  const gradient = avatarColor ?? AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)]

  return (
    <div
      style={{
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px 16px 10px 10px',
        background: 'rgba(10, 15, 36, 0.75)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(0, 240, 255, 0.25)',
        borderRadius: '999px',
        boxShadow: '0 4px 30px rgba(0,0,0,0.4), 0 0 15px rgba(0,240,255,0.15)',
        animation: `${animationName} 4s ease-in-out infinite`,
        animationDelay,
        cursor: 'default',
        zIndex: 10,
        ...style,
      }}
      aria-label={`${name}, ${age}, ${distance}`}
    >
      {/* Avatar circle */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: gradient,
            border: '2px solid rgba(0, 240, 255, 0.5)',
            boxShadow: '0 0 10px rgba(0,240,255,0.3)',
            filter: locked ? 'blur(4px)' : 'none',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Silhouette icon */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="8" r="4" fill="rgba(255,255,255,0.7)" />
            <path
              d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Lock overlay */}
        {locked && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(10,15,36,0.5)',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#00F0FF" aria-hidden="true">
              <path d="M18 10H17V7C17 4.24 14.76 2 12 2C9.24 2 7 4.24 7 7V10H6C4.9 10 4 10.9 4 12V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V12C20 10.9 19.1 10 18 10ZM12 17C10.9 17 10 16.1 10 15C10 13.9 10.9 13 12 13C13.1 13 14 13.9 14 15C14 16.1 13.1 17 12 17ZM15.1 10H8.9V7C8.9 5.29 10.29 3.9 12 3.9C13.71 3.9 15.1 5.29 15.1 7V10Z" />
            </svg>
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.82rem',
            fontWeight: 600,
            color: '#E5E1E4',
            whiteSpace: 'nowrap',
          }}
        >
          {name}, {age}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            fontWeight: 500,
            color: '#00F0FF',
            opacity: 0.9,
            whiteSpace: 'nowrap',
          }}
        >
          📍 {distance}
        </div>
      </div>
    </div>
  )
}
