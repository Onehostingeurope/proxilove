import KPICard from '../components/KPICard'

const flags = [
  { id: 'FLG-001', reporter: 'USR-00421', reported: 'USR-00734', reason: 'Inappropriate proximity behavior', date: '3 days ago', status: 'open' },
  { id: 'FLG-002', reporter: 'USR-00892', reported: 'USR-00734', reason: 'Harassment via Proxilove Request', date: '1 week ago', status: 'open' },
  { id: 'FLG-003', reporter: 'USR-00156', reported: 'USR-00734', reason: 'Spam Proxilove Requests', date: '2 weeks ago', status: 'open' },
  { id: 'FLG-004', reporter: 'USR-00389', reported: 'USR-00285', reason: 'Fake profile', date: '1 day ago', status: 'resolved' },
  { id: 'FLG-005', reporter: 'USR-00913', reported: 'USR-00674', reason: 'Inappropriate content', date: '4 days ago', status: 'reviewed' },
]

const statusColor: Record<string, string> = {
  open: 'var(--color-coral)',
  reviewed: 'var(--color-amber)',
  resolved: 'var(--color-green)',
}

export default function Safety() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <header>
        <h1 style={{ fontSize: '32px', fontWeight: 700, color: 'var(--color-text)', marginBottom: '4px' }}>
          Safety & Flags
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '16px' }}>
          Review and action user reports and content violations.
        </p>
      </header>

      {/* KPI Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        <KPICard title="Open Reports" value="47" subtitle="Requires review" color="coral" />
        <KPICard title="Resolved Today" value="12" subtitle="Avg 2.4h resolution time" color="green" />
        <KPICard title="Permabanned" value="3" subtitle="Device IDs this month" color="coral" />
      </div>

      {/* Flags Queue */}
      <div className="glass-card" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text)' }}>Active Flag Queue</h3>
            <span style={{ background: 'rgba(255,90,95,0.15)', color: 'var(--color-coral)', fontSize: '12px', fontWeight: 700, padding: '2px 10px', borderRadius: '999px', border: '1px solid rgba(255,90,95,0.3)' }}>
              47 open
            </span>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['All', 'Open', 'Reviewed', 'Resolved'].map(f => (
              <button key={f} className="btn btn-ghost" style={{ fontSize: '12px', padding: '4px 12px' }}>{f}</button>
            ))}
          </div>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid var(--color-border)' }}>
              {['Flag ID', 'Reporter', 'Reported User', 'Reason', 'Date', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {flags.map((flag, i) => (
              <tr key={flag.id} style={{ borderBottom: '1px solid var(--color-border)', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                <td style={{ padding: '14px 16px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-text-muted)' }}>{flag.id}</td>
                <td style={{ padding: '14px 16px', fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--color-primary)' }}>{flag.reporter}</td>
                <td style={{ padding: '14px 16px', fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--color-coral)' }}>{flag.reported}</td>
                <td style={{ padding: '14px 16px', color: 'var(--color-text)', fontSize: '13px' }}>{flag.reason}</td>
                <td style={{ padding: '14px 16px', color: 'var(--color-text-muted)', fontSize: '12px' }}>{flag.date}</td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{
                    color: statusColor[flag.status],
                    background: `${statusColor[flag.status]}18`,
                    border: `1px solid ${statusColor[flag.status]}40`,
                    fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '999px', textTransform: 'capitalize'
                  }}>
                    {flag.status}
                  </span>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn btn-outline" style={{ fontSize: '11px', padding: '4px 10px' }}>Review</button>
                    <button className="btn" style={{ fontSize: '11px', padding: '4px 10px', background: 'rgba(255,90,95,0.15)', color: 'var(--color-coral)', border: '1px solid rgba(255,90,95,0.3)' }}>Dismiss</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
