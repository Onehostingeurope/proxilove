import type { Hotspot } from '@/types'
import PulseDot from './PulseDot'

const MOCK_HOTSPOTS: Hotspot[] = [
  {
    id: '1',
    name: 'Bondi Beach',
    location: 'AU',
    active_radars: 342,
    premium_users: 89,
    peak_hour: '14:00–17:00',
    status: 'live',
  },
  {
    id: '2',
    name: 'Santa Monica Pier',
    location: 'US',
    active_radars: 189,
    premium_users: 67,
    peak_hour: '12:00–15:00',
    status: 'live',
  },
  {
    id: '3',
    name: 'Barceloneta Beach',
    location: 'ES',
    active_radars: 156,
    premium_users: 44,
    peak_hour: '16:00–20:00',
    status: 'live',
  },
  {
    id: '4',
    name: 'Brighton Beach',
    location: 'UK',
    active_radars: 98,
    premium_users: 31,
    peak_hour: '13:00–16:00',
    status: 'low',
  },
  {
    id: '5',
    name: 'Copacabana',
    location: 'BR',
    active_radars: 287,
    premium_users: 76,
    peak_hour: '10:00–13:00',
    status: 'live',
  },
]

interface HotspotTableProps {
  data?: Hotspot[]
}

function StatusBadge({ status }: { status: Hotspot['status'] }) {
  if (status === 'live') {
    return (
      <span className="badge badge-live" style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
        <PulseDot color="var(--color-green)" size={6} />
        LIVE
      </span>
    )
  }
  if (status === 'low') {
    return <span className="badge badge-low">LOW</span>
  }
  return <span className="badge badge-offline">OFFLINE</span>
}

const FLAG_ICONS: Record<string, string> = {
  AU: '🇦🇺',
  US: '🇺🇸',
  ES: '🇪🇸',
  UK: '🇬🇧',
  BR: '🇧🇷',
}

export default function HotspotTable({ data = MOCK_HOTSPOTS }: HotspotTableProps) {
  return (
    <div className="glass-panel" style={{ overflow: 'hidden' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 24px',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <PulseDot />
          <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--color-text)' }}>
            Live Proximity Hotspots
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: 'var(--color-text-muted)',
              background: 'var(--color-surface-high)',
              padding: '2px 8px',
              borderRadius: 6,
            }}
          >
            {data.filter((h) => h.status === 'live').length}/{data.length} LIVE
          </span>
        </div>
        <button className="btn btn-ghost btn-sm">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          Filter
        </button>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr>
              <th>Location</th>
              <th style={{ textAlign: 'right' }}>Active Radars</th>
              <th style={{ textAlign: 'right' }}>Premium Users</th>
              <th>Peak Hours</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((hotspot) => (
              <tr
                key={hotspot.id}
                style={{ cursor: 'default' }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLTableRowElement).style.background = 'rgba(255,255,255,0.02)'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLTableRowElement).style.background = 'transparent'
                }}
              >
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 18 }}>{FLAG_ICONS[hotspot.location] ?? '🌍'}</span>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--color-text)' }}>
                        {hotspot.name}
                      </div>
                      <div style={{ fontSize: 10, color: 'var(--color-text-muted)', marginTop: 1 }}>
                        {hotspot.location}
                      </div>
                    </div>
                  </div>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <span
                    className="table-data"
                    style={{ color: 'var(--color-primary)', fontWeight: 600 }}
                  >
                    {hotspot.active_radars.toLocaleString()}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <span
                    className="table-data"
                    style={{ color: 'var(--color-green)', fontWeight: 600 }}
                  >
                    {hotspot.premium_users}
                  </span>
                </td>
                <td>
                  <span
                    className="table-data"
                    style={{ color: 'var(--color-text-muted)', fontSize: 11 }}
                  >
                    {hotspot.peak_hour}
                  </span>
                </td>
                <td>
                  <StatusBadge status={hotspot.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
