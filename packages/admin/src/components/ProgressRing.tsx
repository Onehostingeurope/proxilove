interface ProgressRingProps {
  percentage: number
  color: string
  size?: number
  strokeWidth?: number
  label?: string
}

export default function ProgressRing({
  percentage,
  color,
  size = 72,
  strokeWidth = 5,
  label,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const clampedPct = Math.min(100, Math.max(0, percentage))
  const offset = circumference - (clampedPct / 100) * circumference

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: 'rotate(-90deg)' }}
      >
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
        />
        {/* Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: 'stroke-dashoffset 0.6s ease',
            filter: `drop-shadow(0 0 6px ${color})`,
          }}
        />
      </svg>
      {/* Center label */}
      <div
        style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: size > 60 ? 13 : 10,
            fontWeight: 700,
            color,
            lineHeight: 1,
          }}
        >
          {clampedPct}%
        </span>
        {label && (
          <span style={{ fontSize: 8, color: 'var(--color-text-muted)', marginTop: 2 }}>
            {label}
          </span>
        )}
      </div>
    </div>
  )
}
