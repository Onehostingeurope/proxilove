import type { User } from '@supabase/supabase-js'
import type { ReactNode } from 'react'
import Sidebar from './Sidebar'

interface LayoutProps {
  user: User
  children: ReactNode
}

export default function Layout({ user, children }: LayoutProps) {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar user={user} />
      <main
        style={{
          marginLeft: 'var(--sidebar-width)',
          flex: 1,
          overflowY: 'auto',
          background: 'var(--color-bg)',
          position: 'relative',
        }}
      >
        {/* Subtle radial gradient overlay */}
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 'var(--sidebar-width)',
            right: 0,
            height: '40vh',
            background:
              'radial-gradient(ellipse 60% 40% at 70% 0%, rgba(0,240,255,0.04) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
        <div style={{ position: 'relative', zIndex: 1, padding: '40px 48px' }}>
          {children}
        </div>
      </main>
    </div>
  )
}
