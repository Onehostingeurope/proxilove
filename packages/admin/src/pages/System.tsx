const services = [
  {
    name: 'API Gateway',
    status: 'operational',
    uptime: '99.98%',
    latency: '42ms',
    description: 'REST API and WebSocket endpoints',
    color: 'var(--color-green)',
  },
  {
    name: 'Bluetooth Token Service',
    status: 'operational',
    uptime: '99.95%',
    latency: '18ms',
    description: 'BLE proximity token generation & validation',
    color: 'var(--color-green)',
  },
  {
    name: 'Supabase Database',
    status: 'operational',
    uptime: '100%',
    latency: '8ms',
    description: 'PostgreSQL + Realtime subscriptions',
    color: 'var(--color-green)',
  },
  {
    name: 'Media CDN',
    status: 'operational',
    uptime: '99.99%',
    latency: '23ms',
    description: 'Profile photo delivery & blur processing',
    color: 'var(--color-green)',
  },
  {
    name: 'Payment Gateway',
    status: 'operational',
    uptime: '99.97%',
    latency: '120ms',
    description: 'Stripe €9/mo subscription processing',
    color: 'var(--color-green)',
  },
  {
    name: 'Push Notifications',
    status: 'degraded',
    uptime: '97.2%',
    latency: '340ms',
    description: 'iOS APNs + Android FCM delivery',
    color: 'var(--color-amber)',
  },
]

const logs = [
  { time: '22:35:01', level: 'INFO', msg: 'Hotspot density updated: Bondi Beach → 342 radars' },
  { time: '22:34:47', level: 'INFO', msg: 'New premium subscription: USR-00421' },
  { time: '22:33:12', level: 'WARN', msg: 'Push notification latency elevated: p95=340ms' },
  { time: '22:31:05', level: 'INFO', msg: 'Proxilove handshake accepted: USR-00421 ↔ USR-00156' },
  { time: '22:28:44', level: 'INFO', msg: 'Flag created: USR-00734 reported by USR-00892' },
  { time: '22:25:30', level: 'INFO', msg: 'Bluetooth token refreshed: BT-2c8e4f → BT-7a3d1f' },
]

const levelColor: Record<string, string> = {
  INFO: 'var(--color-primary)',
  WARN: 'var(--color-amber)',
  ERROR: 'var(--color-coral)',
}

export default function System() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <header>
        <h1 style={{ fontSize: '32px', fontWeight: 700, color: 'var(--color-text)', marginBottom: '4px' }}>
          System Health
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '16px' }}>
          Real-time service status, uptime monitoring, and system logs.
        </p>
      </header>

      {/* Overall Status Banner */}
      <div style={{
        background: 'rgba(0,230,118,0.08)',
        border: '1px solid rgba(0,230,118,0.25)',
        borderRadius: '12px',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}>
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--color-green)', boxShadow: '0 0 8px var(--color-green)' }} />
        <span style={{ color: 'var(--color-green)', fontWeight: 700, fontSize: '15px' }}>All Systems Operational</span>
        <span style={{ color: 'var(--color-text-muted)', fontSize: '13px', marginLeft: 'auto' }}>Last checked: just now</span>
      </div>

      {/* Service Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        {services.map(svc => (
          <div key={svc.name} className="glass-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text)' }}>{svc.name}</span>
              <span style={{
                color: svc.color,
                background: `${svc.color}18`,
                border: `1px solid ${svc.color}40`,
                fontSize: '11px', fontWeight: 600, padding: '2px 10px', borderRadius: '999px', textTransform: 'capitalize',
              }}>
                {svc.status}
              </span>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '16px' }}>{svc.description}</p>
            <div style={{ display: 'flex', gap: '24px' }}>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--color-text-faint)', textTransform: 'uppercase', marginBottom: '2px' }}>Uptime</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '15px', fontWeight: 700, color: svc.color }}>{svc.uptime}</div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--color-text-faint)', textTransform: 'uppercase', marginBottom: '2px' }}>Latency</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '15px', fontWeight: 700, color: 'var(--color-text)' }}>{svc.latency}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* System Log */}
      <div className="glass-card" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text)' }}>System Log</h3>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-green)', background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.2)', padding: '2px 8px', borderRadius: '4px' }}>LIVE</span>
        </div>
        <div style={{ padding: '16px', fontFamily: 'var(--font-mono)', fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '240px', overflowY: 'auto' }}>
          {logs.map((log, i) => (
            <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--color-text-faint)', whiteSpace: 'nowrap' }}>{log.time}</span>
              <span style={{ color: levelColor[log.level], fontWeight: 700, minWidth: '40px' }}>{log.level}</span>
              <span style={{ color: 'var(--color-text-muted)' }}>{log.msg}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
