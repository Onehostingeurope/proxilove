import KPICard from '../components/KPICard'
import SparkLine from '../components/SparkLine'

const monthlyRevenue = [6200, 7100, 7800, 8400, 8900, 9200, 9600, 9800, 10100, 10400, 10700, 10827]
const churnData = [4.1, 3.9, 3.8, 3.6, 3.5, 3.4, 3.3, 3.2, 3.2, 3.1, 3.2, 3.2]

const recentSubs = [
  { id: 'USR-00421', name: 'Alex K.', location: 'Bondi Beach, AU', date: '2026-05-27', amount: '€9.00', status: 'active' },
  { id: 'USR-00156', name: 'Mia T.', location: 'Barcelona, ES', date: '2026-05-26', amount: '€9.00', status: 'active' },
  { id: 'USR-00913', name: 'Sam R.', location: 'Miami, US', date: '2026-05-25', amount: '€9.00', status: 'active' },
  { id: 'USR-00674', name: 'Liu W.', location: 'Sydney, AU', date: '2026-05-24', amount: '€9.00', status: 'promo' },
  { id: 'USR-00285', name: 'Carla M.', location: 'Barcelona, ES', date: '2026-05-23', amount: '€9.00', status: 'cancelled' },
]

const MONTHS = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May']

export default function Subscriptions() {
  const maxRev = Math.max(...monthlyRevenue)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <header>
        <h1 style={{ fontSize: '32px', fontWeight: 700, color: 'var(--color-text)', marginBottom: '4px' }}>
          Subscription Metrics
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '16px' }}>
          Revenue tracking, conversion rates, and subscription lifecycle.
        </p>
      </header>

      {/* KPI Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        <KPICard title="Monthly Revenue" value="€10,827" subtitle="+12% vs last month" color="green">
          <SparkLine data={monthlyRevenue} color="var(--color-green)" />
        </KPICard>
        <KPICard title="Active Premium" value="1,203" subtitle="of 1,500 goal · 80.2%" color="cyan">
          <SparkLine data={[900, 950, 1010, 1050, 1100, 1150, 1180, 1203]} color="var(--color-primary)" />
        </KPICard>
        <KPICard title="Churn Rate" value="3.2%" subtitle="Down 0.9% this quarter" color="coral">
          <SparkLine data={churnData} color="var(--color-coral)" />
        </KPICard>
        <KPICard title="MRR Growth" value="+12%" subtitle="Month over month" color="green" />
      </div>

      {/* Revenue Bar Chart */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text)', marginBottom: '24px' }}>
          Monthly Recurring Revenue (€)
        </h3>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '160px' }}>
          {monthlyRevenue.map((val, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', height: '100%' }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', width: '100%' }}>
                <div
                  style={{
                    width: '100%',
                    height: `${(val / maxRev) * 100}%`,
                    background: i === monthlyRevenue.length - 1
                      ? 'var(--color-primary)'
                      : 'rgba(0,240,255,0.25)',
                    borderRadius: '4px 4px 0 0',
                    boxShadow: i === monthlyRevenue.length - 1 ? 'var(--shadow-cyan)' : 'none',
                    transition: 'height 0.6s ease',
                  }}
                />
              </div>
              <span style={{ fontSize: '11px', color: 'var(--color-text-faint)', fontFamily: 'var(--font-mono)' }}>
                {MONTHS[i]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Subscriptions Table */}
      <div className="glass-card" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text)' }}>Recent Activations</h3>
          <button className="btn btn-outline" style={{ fontSize: '12px', padding: '6px 16px' }}>Export CSV</button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid var(--color-border)' }}>
              {['User ID', 'Name', 'Location', 'Date', 'Amount', 'Status'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentSubs.map((sub, i) => (
              <tr key={sub.id} style={{ borderBottom: '1px solid var(--color-border)', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                <td style={{ padding: '14px 16px', fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--color-primary)' }}>{sub.id}</td>
                <td style={{ padding: '14px 16px', color: 'var(--color-text)', fontSize: '14px' }}>{sub.name}</td>
                <td style={{ padding: '14px 16px', color: 'var(--color-text-muted)', fontSize: '13px' }}>{sub.location}</td>
                <td style={{ padding: '14px 16px', fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--color-text-muted)' }}>{sub.date}</td>
                <td style={{ padding: '14px 16px', fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--color-green)', fontWeight: 600 }}>{sub.amount}</td>
                <td style={{ padding: '14px 16px' }}>
                  <span className={`badge ${sub.status === 'active' ? 'badge-premium' : sub.status === 'cancelled' ? 'badge-flagged' : 'badge-free'}`}>
                    {sub.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
