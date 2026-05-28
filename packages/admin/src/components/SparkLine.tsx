interface SparkLineProps {
  data: number[]
  color: string
  height?: number
  width?: number
}

export default function SparkLine({ data, color, height = 40, width = 120 }: SparkLineProps) {
  if (data.length < 2) return null

  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1

  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - ((val - min) / range) * (height * 0.85) - height * 0.075
    return `${x.toFixed(1)},${y.toFixed(1)}`
  })

  const polyline = points.join(' ')

  // Area fill path
  const areaPoints = [
    `0,${height}`,
    ...points,
    `${width},${height}`,
  ].join(' ')

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ overflow: 'visible', display: 'block' }}
    >
      <defs>
        <linearGradient id={`spark-fill-${color.replace(/[^a-z0-9]/gi, '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Area */}
      <polygon
        points={areaPoints}
        fill={`url(#spark-fill-${color.replace(/[^a-z0-9]/gi, '')})`}
      />
      {/* Line */}
      <polyline
        points={polyline}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* End dot */}
      {points.length > 0 && (() => {
        const last = points[points.length - 1].split(',')
        return (
          <circle
            cx={last[0]}
            cy={last[1]}
            r="2.5"
            fill={color}
            style={{ filter: `drop-shadow(0 0 4px ${color})` }}
          />
        )
      })()}
    </svg>
  )
}
