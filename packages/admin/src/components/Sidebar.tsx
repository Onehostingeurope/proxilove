import { NavLink, useNavigate } from 'react-router-dom'
import type { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

interface SidebarProps {
  user: User
}

type IconName = 'grid' | 'group' | 'insights' | 'shield' | 'activity' | 'logout'

function Icon({ name }: { name: IconName }) {
  const icons: Record<IconName, JSX.Element> = {
    grid: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    group: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="7" r="3" />
        <circle cx="17" cy="9" r="2.5" />
        <path d="M2 20c0-3.3 3.1-6 7-6s7 2.7 7 6" />
        <path d="M17 14c2.2.4 4 2.2 4 4.5" />
      </svg>
    ),
    insights: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    shield: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    activity: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
    logout: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </svg>
    ),
  }
  return icons[name]
}

const navItems = [
  { to: '/', label: 'Overview', icon: 'grid' as IconName, exact: true },
  { to: '/users', label: 'User Management', icon: 'group' as IconName },
  { to: '/subscriptions', label: 'Subscription Metrics', icon: 'insights' as IconName },
  { to: '/safety', label: 'Safety & Flags', icon: 'shield' as IconName },
  { to: '/system', label: 'System Health', icon: 'activity' as IconName },
]

export default function Sidebar({ user }: SidebarProps) {
  const navigate = useNavigate()

  const handleLogout = async () => {
    localStorage.removeItem('proxilove_admin_demo')
    await supabase.auth.signOut()
    navigate('/login')
  }

  const displayName = user.user_metadata?.full_name as string | undefined
    ?? user.email?.split('@')[0]
    ?? 'Admin'

  const initials = displayName
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <nav className="sidebar">
      {/* Logo */}
      <div
        style={{
          padding: '28px 24px 20px',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Brand icon */}
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: 'linear-gradient(135deg, rgba(0,240,255,0.2), rgba(0,240,255,0.05))',
              border: '1px solid rgba(0,240,255,0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--glow-cyan)',
              flexShrink: 0,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 3L4 7v5c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V7L12 3z" fill="rgba(0,240,255,0.15)" stroke="rgba(0,240,255,0.8)" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M9 12l2 2 4-4" stroke="rgba(0,240,255,0.9)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: 'var(--color-text)',
              }}
            >
              STITCH
            </div>
            <div
              style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--color-primary)',
                lineHeight: 1,
              }}
            >
              Admin Console
            </div>
          </div>
          {/* Live pulse */}
          <div style={{ marginLeft: 'auto' }}>
            <span className="pulse-dot" />
          </div>
        </div>
      </div>

      {/* Nav items */}
      <div style={{ flex: 1, padding: '16px 12px', overflowY: 'auto' }}>
        <div
          style={{
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--color-text-muted)',
            padding: '0 12px',
            marginBottom: 8,
            marginTop: 4,
          }}
        >
          Navigation
        </div>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.exact}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 12px',
                  borderRadius: 8,
                  borderLeft: isActive ? '3px solid var(--color-primary)' : '3px solid transparent',
                  paddingLeft: isActive ? 9 : 12,
                  background: isActive ? 'rgba(0,240,255,0.06)' : 'transparent',
                  color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
                  fontSize: 13,
                  fontWeight: isActive ? 700 : 500,
                  textDecoration: 'none',
                })}
              >
                {({ isActive }) => (
                  <>
                    <span style={{ opacity: isActive ? 1 : 0.7, flexShrink: 0 }}>
                      <Icon name={item.icon} />
                    </span>
                    <span>{item.label}</span>
                    {isActive && (
                      <span
                        style={{
                          marginLeft: 'auto',
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          background: 'var(--color-primary)',
                          boxShadow: 'var(--glow-cyan)',
                          flexShrink: 0,
                        }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* System status mini section */}
        <div
          style={{
            marginTop: 24,
            padding: '12px',
            borderRadius: 10,
            background: 'rgba(0,230,118,0.05)',
            border: '1px solid rgba(0,230,118,0.12)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span className="pulse-dot" />
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-green)' }}>All Systems Operational</span>
          </div>
          <div style={{ fontSize: 10, color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
            API 99.98% ↑ · DB 12ms
          </div>
        </div>
      </div>

      {/* User + Logout */}
      <div
        style={{
          padding: '16px 12px',
          borderTop: '1px solid var(--color-border)',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        {/* Admin user card */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '8px 12px',
            borderRadius: 10,
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(0,240,255,0.3), rgba(0,240,255,0.1))',
              border: '1px solid rgba(0,240,255,0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              fontWeight: 700,
              color: 'var(--color-primary)',
              flexShrink: 0,
            }}
          >
            {initials}
          </div>
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: 'var(--color-text)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {displayName}
            </div>
            <div
              style={{
                fontSize: 10,
                color: 'var(--color-primary)',
                fontWeight: 600,
                letterSpacing: '0.05em',
              }}
            >
              Super Admin
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="btn btn-ghost"
          style={{ width: '100%', justifyContent: 'center', gap: 8 }}
        >
          <Icon name="logout" />
          Sign Out
        </button>
      </div>
    </nav>
  )
}
