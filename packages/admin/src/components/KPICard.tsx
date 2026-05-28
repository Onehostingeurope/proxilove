import type { ReactNode } from 'react'

type ColorKey = 'cyan' | 'coral' | 'green' | 'amber'

const colorMap: Record<ColorKey, string> = {
  cyan: 'var(--color-primary)',
  coral: 'var(--color-coral)',
  green: 'var(--color-green)',
  amber: 'var(--color-amber)',
}

const glowMap: Record<ColorKey, string> = {
  cyan: 'var(--glow-cyan)',
  coral: 'var(--glow-coral)',
  green: 'var(--glow-green)',
  amber: 'var(--glow-amber)',
}

interface KPICardProps {
  title: string
  value: string | number
  subtitle: string
  color: ColorKey
  icon?: ReactNode
  children?: ReactNode
}

export default function KPICard({ title, value, subtitle, color, icon, children }: KPICardProps) {
  const c = colorMap[color]
  const g = glowMap[color]

  return (
    <div
      className="glass-card"
      style={{
        padding: '28px',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        flex: 1,
        minWidth: 0,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = g
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
      }}
    >
      {/* Subtle color accent in top right */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${c}12 0%, transparent 70%)`,
          pointerEvents: 'none',
          transform: 'translate(30%, -30%)',
        }}
      />

      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--color-text-muted)',
          }}
        >
          {title}
        </span>
        {icon && (
          <span style={{ color: c, opacity: 0.8 }}>
            {icon}
          </span>
        )}
      </div>

      {/* Value */}
      <div
        className="table-data"
        style={{
          fontSize: 44,
          fontWeight: 700,
          color: c,
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
        }}
      >
        {value}
      </div>

      {/* Subtitle */}
      <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: -2 }}>
        {subtitle}
      </div>

      {/* Optional children (charts, rings, etc.) */}
      {children && (
        <div style={{ marginTop: 8 }}>
          {children}
        </div>
      )}
    </div>
  )
}
