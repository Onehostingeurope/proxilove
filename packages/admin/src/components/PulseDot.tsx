interface PulseDotProps {
  color?: string
  size?: number
}

export default function PulseDot({ color = 'var(--color-green)', size = 8 }: PulseDotProps) {
  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      {/* Outer pulse ring */}
      <div
        style={{
          position: 'absolute',
          width: size * 2.5,
          height: size * 2.5,
          borderRadius: '50%',
          background: color,
          opacity: 0,
          animation: 'pulse-glow 1.8s ease-in-out infinite',
        }}
      />
      {/* Inner dot */}
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          background: color,
          position: 'relative',
          zIndex: 1,
        }}
      />
    </div>
  )
}
