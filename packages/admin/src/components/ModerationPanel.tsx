import { useState } from 'react'
import type { Profile } from '@/types'

interface ModerationPanelProps {
  user: Profile | null
}

const MOCK_FLAGS = [
  { icon: '⚠️', reason: 'Inappropriate profile photo', time: '2h ago' },
  { icon: '🚫', reason: 'Harassment via proximity chat', time: '1d ago' },
  { icon: '📍', reason: 'Fake location broadcasting', time: '3d ago' },
]

function ActionButton({
  icon,
  label,
  variant,
  onClick,
}: {
  icon: string
  label: string
  variant: 'outline' | 'outline-amber' | 'danger' | 'ghost' | 'outline-cyan'
  onClick?: () => void
}) {
  const classMap: Record<string, string> = {
    outline: 'btn btn-outline',
    'outline-amber': 'btn btn-outline-amber',
    danger: 'btn btn-danger',
    ghost: 'btn btn-ghost',
    'outline-cyan': 'btn btn-outline',
  }
  return (
    <button className={classMap[variant]} style={{ width: '100%', justifyContent: 'flex-start' }} onClick={onClick}>
      <span>{icon}</span>
      {label}
    </button>
  )
}

export default function ModerationPanel({ user }: ModerationPanelProps) {
  const [paymentGateway, setPaymentGateway] = useState(true)
  const [actioned, setActioned] = useState<string | null>(null)

  const handleAction = (action: string) => {
    setActioned(action)
    setTimeout(() => setActioned(null), 2000)
  }

  if (!user) {
    return (
      <div
        className="glass-panel"
        style={{
          padding: '60px 40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          minHeight: 320,
          textAlign: 'center',
        }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        <div style={{ color: 'var(--color-text-muted)', fontSize: 14 }}>
          Select a user to open the moderation panel
        </div>
      </div>
    )
  }

  const initials = user.username.slice(0, 2).toUpperCase()

  return (
    <div
      className="glass-panel"
      style={{ overflow: 'hidden', display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 380 }}
    >
      {/* ── LEFT: Flagged Profile Review ── */}
      <div style={{ borderRight: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column' }}>
        {/* Alert header */}
        <div
          style={{
            background: 'rgba(255,90,95,0.12)',
            borderBottom: '1px solid rgba(255,90,95,0.2)',
            padding: '10px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--color-coral)">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          </svg>
          <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-coral)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Flagged Profile Review
          </span>
          {user.flag_count > 0 && (
            <span
              className="badge badge-flagged"
              style={{ marginLeft: 'auto', fontSize: 10 }}
            >
              {user.flag_count} FLAG{user.flag_count > 1 ? 'S' : ''}
            </span>
          )}
        </div>

        <div style={{ padding: '24px 24px', flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Profile card */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* Avatar */}
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(255,90,95,0.3) 0%, rgba(255,90,95,0.08) 100%)',
                border: '2px solid rgba(255,90,95,0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
                fontWeight: 700,
                color: 'var(--color-coral)',
                flexShrink: 0,
                boxShadow: 'var(--glow-coral)',
              }}
            >
              {initials}
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text)' }}>
                {user.username}
              </div>
              <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 2 }}>
                Age {user.age} · {user.location}
              </div>
              <div
                className="table-data"
                style={{ fontSize: 10, color: 'var(--color-text-muted)', marginTop: 4, opacity: 0.6 }}
              >
                {user.id}
              </div>
            </div>
          </div>

          {/* Bio */}
          {user.bio && (
            <div
              style={{
                background: 'rgba(255,255,255,0.03)',
                borderRadius: 8,
                padding: '10px 14px',
                borderLeft: '3px solid rgba(255,90,95,0.4)',
              }}
            >
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 5 }}>
                Bio
              </div>
              <p style={{ fontSize: 12, color: 'var(--color-text-muted)', lineHeight: 1.6, fontStyle: 'italic' }}>
                "{user.bio}"
              </p>
            </div>
          )}

          {/* Flag history */}
          {user.flag_count > 0 && (
            <div>
              <div className="section-label">Flag History</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {MOCK_FLAGS.slice(0, user.flag_count).map((flag, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '8px 12px',
                      borderRadius: 8,
                      background: 'rgba(255,90,95,0.05)',
                      border: '1px solid rgba(255,90,95,0.1)',
                    }}
                  >
                    <span style={{ fontSize: 14 }}>{flag.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, color: 'var(--color-text)' }}>{flag.reason}</div>
                    </div>
                    <span style={{ fontSize: 10, color: 'var(--color-text-muted)', whiteSpace: 'nowrap' }}>
                      {flag.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {user.flag_count === 0 && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px',
                borderRadius: 8,
                background: 'rgba(0,230,118,0.06)',
                border: '1px solid rgba(0,230,118,0.15)',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-green)" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span style={{ fontSize: 12, color: 'var(--color-green)' }}>Clean record — no flags reported</span>
            </div>
          )}
        </div>
      </div>

      {/* ── RIGHT: Admin Actions ── */}
      <div style={{ padding: '24px' }}>
        <div className="section-label" style={{ marginBottom: 14 }}>Admin Actions</div>

        {/* Safety section */}
        <div style={{ marginBottom: 4 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(0,240,255,0.5)', marginBottom: 10 }}>
            Safety Controls
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <ActionButton
              icon="⚠️"
              label="Warning: System Token"
              variant="outline"
              onClick={() => handleAction('warn')}
            />
            <ActionButton
              icon="👁"
              label="Force Stealth Mode"
              variant="outline-amber"
              onClick={() => handleAction('stealth')}
            />
            <button
              className="btn btn-danger"
              style={{ width: '100%', justifyContent: 'flex-start' }}
              onClick={() => handleAction('ban')}
            >
              <span>⛔</span>
              Permaban Device ID
            </button>
          </div>
        </div>

        {/* Action feedback */}
        {actioned && (
          <div
            style={{
              marginTop: 10,
              padding: '8px 12px',
              borderRadius: 8,
              background: 'rgba(0,240,255,0.08)',
              border: '1px solid rgba(0,240,255,0.2)',
              fontSize: 12,
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Action queued: {actioned === 'ban' ? 'Permaban initiated' : actioned === 'stealth' ? 'Stealth mode enabled' : 'Warning issued'}
          </div>
        )}

        <div className="divider" />

        {/* Revenue / Subscription section */}
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(0,240,255,0.5)', marginBottom: 10 }}>
            Subscription Controls
          </div>

          {/* Payment Gateway Toggle */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px',
              borderRadius: 8,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--color-border)',
              marginBottom: 12,
            }}
          >
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text)' }}>
                Payment Gateway
              </div>
              <div style={{ fontSize: 11, color: paymentGateway ? 'var(--color-green)' : 'var(--color-text-muted)', marginTop: 1 }}>
                {paymentGateway ? '● Active' : '○ Disabled'}
              </div>
            </div>
            <label className="toggle">
              <input
                type="checkbox"
                checked={paymentGateway}
                onChange={(e) => setPaymentGateway(e.target.checked)}
              />
              <span className="toggle-slider" />
            </label>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <ActionButton
              icon="↩"
              label="Refund €9 Charge"
              variant="ghost"
              onClick={() => handleAction('refund')}
            />
            <ActionButton
              icon="★"
              label="Grant Promo Premium"
              variant="outline-cyan"
              onClick={() => handleAction('promo')}
            />
          </div>
        </div>

        {/* Device token */}
        <div className="divider" />
        <div>
          <div className="section-label" style={{ marginBottom: 6 }}>Device Token</div>
          <div
            className="table-data"
            style={{
              fontSize: 10,
              color: 'var(--color-text-muted)',
              background: 'var(--color-surface)',
              padding: '8px 12px',
              borderRadius: 8,
              border: '1px solid var(--color-border)',
              wordBreak: 'break-all',
              letterSpacing: '0.04em',
              lineHeight: 1.6,
            }}
          >
            {user.bluetooth_token}
          </div>
        </div>
      </div>
    </div>
  )
}
