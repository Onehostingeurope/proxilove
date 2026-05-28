import KPICard from '@/components/KPICard'
import SparkLine from '@/components/SparkLine'
import ProgressRing from '@/components/ProgressRing'
import PulseDot from '@/components/PulseDot'
import HotspotTable from '@/components/HotspotTable'

const RADAR_DATA = [312, 298, 345, 401, 387, 422, 476, 451, 498, 512, 487, 534]
const HANDSHAKE_DATA = [89, 102, 94, 118, 133, 127, 141, 156, 148, 163, 177, 192]

function BellIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  )
}

function RadarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="2" />
      <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
      <path d="M12 6a6 6 0 0 1 6 6" strokeLinecap="round" />
      <path d="M12 10a2 2 0 0 1 2 2" strokeLinecap="round" />
    </svg>
  )
}

function HandshakeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
    </svg>
  )
}

export default function Overview() {
  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Overview</h1>
          <p className="page-subtitle">Proximity Monitoring Panel · Real-time data</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 14px',
              borderRadius: 'var(--radius-pill)',
              background: 'rgba(0,230,118,0.08)',
              border: '1px solid rgba(0,230,118,0.2)',
              fontSize: 11,
              fontWeight: 700,
              color: 'var(--color-green)',
              letterSpacing: '0.06em',
            }}
          >
            <PulseDot size={6} />
            LIVE
          </div>
          <button
            className="btn btn-ghost"
            style={{ position: 'relative', padding: '8px 12px' }}
          >
            <BellIcon />
            <span
              style={{
                position: 'absolute',
                top: 4,
                right: 4,
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: 'var(--color-coral)',
                border: '1.5px solid var(--color-bg)',
              }}
            />
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'flex', gap: 20, marginBottom: 28 }}>
        {/* Active Radars */}
        <KPICard
          title="Active Radars"
          value="5,342"
          subtitle="+12% vs last hour"
          color="cyan"
          icon={<RadarIcon />}
        >
          <SparkLine data={RADAR_DATA} color="var(--color-primary)" />
        </KPICard>

        {/* Premium Conversions */}
        <KPICard
          title="Premium Conversions"
          value="68%"
          subtitle="Goal: 75% · 1,203 active"
          color="green"
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          }
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <ProgressRing percentage={68} color="var(--color-green)" size={64} />
            <div>
              <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginBottom: 4 }}>
                Monthly target
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div
                  style={{
                    height: 4,
                    width: 100,
                    background: 'rgba(255,255,255,0.08)',
                    borderRadius: 4,
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: '68%',
                      background: 'var(--color-green)',
                      borderRadius: 4,
                      boxShadow: '0 0 8px rgba(0,230,118,0.5)',
                    }}
                  />
                </div>
                <span style={{ fontSize: 10, color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
                  75%
                </span>
              </div>
            </div>
          </div>
        </KPICard>

        {/* Open Handshakes */}
        <KPICard
          title="Open Handshakes"
          value="192"
          subtitle="Active proximity connections"
          color="amber"
          icon={<HandshakeIcon />}
        >
          <SparkLine data={HANDSHAKE_DATA} color="var(--color-amber)" />
        </KPICard>
      </div>

      {/* Live Hotspots Table */}
      <HotspotTable />
    </div>
  )
}
