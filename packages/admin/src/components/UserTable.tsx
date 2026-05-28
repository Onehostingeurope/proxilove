import { useState } from 'react'
import type { Profile } from '@/types'

interface UserTableProps {
  users: Profile[]
  onSelect: (user: Profile) => void
  selectedId?: string
}

type FilterKey = 'all' | 'premium' | 'free' | 'flagged'

function FlagCount({ count }: { count: number }) {
  if (count === 0) {
    return (
      <span className="table-data" style={{ color: 'var(--color-text-muted)', fontSize: 12 }}>
        —
      </span>
    )
  }
  const color =
    count >= 5
      ? 'var(--color-coral)'
      : count >= 3
        ? '#ff8c00'
        : count >= 1
          ? 'var(--color-amber)'
          : 'var(--color-text-muted)'

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
      {count >= 3 && (
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill={color}
          style={{ flexShrink: 0 }}
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" stroke="white" strokeWidth="1.5" />
          <line x1="12" y1="17" x2="12.01" y2="17" stroke="white" strokeWidth="2" />
        </svg>
      )}
      <span className="table-data" style={{ color, fontWeight: 700, fontSize: 13 }}>
        {count}
      </span>
    </div>
  )
}

function StatusBadge({ status, isPremium }: { status: Profile['status']; isPremium: boolean }) {
  if (status === 'banned') {
    return (
      <span className="badge" style={{ background: 'rgba(255,90,95,0.2)', color: 'var(--color-coral)', border: '1px solid rgba(255,90,95,0.4)' }}>
        BANNED
      </span>
    )
  }
  if (status === 'suspended') {
    return (
      <span className="badge" style={{ background: 'rgba(255,179,0,0.15)', color: 'var(--color-amber)', border: '1px solid rgba(255,179,0,0.3)' }}>
        SUSPENDED
      </span>
    )
  }
  if (isPremium) {
    return (
      <span className="badge badge-premium">
        <svg width="9" height="9" viewBox="0 0 24 24" fill="var(--color-green)">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
        PREMIUM
      </span>
    )
  }
  return <span className="badge badge-free">FREE</span>
}

function truncateToken(token: string) {
  return `${token.slice(0, 8)}…${token.slice(-4)}`
}

export default function UserTable({ users, onSelect, selectedId }: UserTableProps) {
  const [filter, setFilter] = useState<FilterKey>('all')
  const [search, setSearch] = useState('')

  const filtered = users.filter((u) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'premium' && u.is_premium) ||
      (filter === 'free' && !u.is_premium) ||
      (filter === 'flagged' && u.flag_count > 0)

    const q = search.toLowerCase()
    const matchesSearch =
      !q ||
      u.username.toLowerCase().includes(q) ||
      u.id.toLowerCase().includes(q) ||
      u.location.toLowerCase().includes(q)

    return matchesFilter && matchesSearch
  })

  const filters: { key: FilterKey; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: users.length },
    { key: 'premium', label: 'Premium', count: users.filter((u) => u.is_premium).length },
    { key: 'free', label: 'Free', count: users.filter((u) => !u.is_premium).length },
    { key: 'flagged', label: 'Flagged', count: users.filter((u) => u.flag_count > 0).length },
  ]

  return (
    <div className="glass-panel" style={{ overflow: 'hidden' }}>
      {/* Toolbar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 24px',
          borderBottom: '1px solid var(--color-border)',
          gap: 16,
          flexWrap: 'wrap',
        }}
      >
        {/* Filter pills */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {filters.map((f) => (
            <button
              key={f.key}
              className={`pill ${filter === f.key ? 'pill-active' : 'pill-inactive'}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
              <span
                style={{
                  fontSize: 10,
                  opacity: 0.7,
                  fontFamily: 'var(--font-mono)',
                  marginLeft: 2,
                }}
              >
                {f.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div style={{ position: 'relative', minWidth: 220 }}>
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-text-muted)"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)' }}
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            className="input-ghost"
            placeholder="Search users…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: 22 }}
          />
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto', maxHeight: 360, overflowY: 'auto' }}>
        <table>
          <thead style={{ position: 'sticky', top: 0, background: 'var(--color-surface-card)', zIndex: 2 }}>
            <tr>
              <th>User</th>
              <th>Account Status</th>
              <th>Token Hash</th>
              <th style={{ textAlign: 'center' }}>Flags</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((user) => {
              const isSelected = user.id === selectedId
              return (
                <tr
                  key={user.id}
                  onClick={() => onSelect(user)}
                  style={{
                    cursor: 'pointer',
                    borderLeft: isSelected ? '3px solid var(--color-primary)' : '3px solid transparent',
                    background: isSelected ? 'rgba(0,240,255,0.04)' : 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected)
                      (e.currentTarget as HTMLTableRowElement).style.background = 'rgba(255,255,255,0.02)'
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected)
                      (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'
                  }}
                >
                  {/* User */}
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      {/* Avatar */}
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          background:
                            user.flag_count >= 3
                              ? 'linear-gradient(135deg, rgba(255,90,95,0.3), rgba(255,90,95,0.1))'
                              : 'linear-gradient(135deg, rgba(0,240,255,0.2), rgba(0,240,255,0.05))',
                          border: user.flag_count >= 3
                            ? '1px solid rgba(255,90,95,0.3)'
                            : '1px solid rgba(0,240,255,0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 11,
                          fontWeight: 700,
                          color: user.flag_count >= 3 ? 'var(--color-coral)' : 'var(--color-primary)',
                          flexShrink: 0,
                        }}
                      >
                        {user.username.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>{user.username}</div>
                        <div
                          className="table-data"
                          style={{ fontSize: 10, color: 'var(--color-text-muted)', marginTop: 1 }}
                        >
                          {user.id}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Status */}
                  <td>
                    <StatusBadge status={user.status} isPremium={user.is_premium} />
                  </td>

                  {/* Token */}
                  <td>
                    <span
                      className="table-data"
                      style={{
                        fontSize: 11,
                        color: 'var(--color-text-muted)',
                        background: 'var(--color-surface)',
                        padding: '3px 8px',
                        borderRadius: 5,
                        border: '1px solid var(--color-border)',
                        display: 'inline-block',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {truncateToken(user.bluetooth_token)}
                    </span>
                  </td>

                  {/* Flags */}
                  <td style={{ textAlign: 'center' }}>
                    <FlagCount count={user.flag_count} />
                  </td>

                  {/* Actions */}
                  <td>
                    <div
                      style={{ display: 'flex', gap: 5 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => onSelect(user)}
                        title="View user"
                      >
                        View
                      </button>
                      {user.flag_count >= 1 && (
                        <button className="btn btn-sm btn-outline-amber" title="Warn user">
                          Warn
                        </button>
                      )}
                      {user.flag_count >= 3 && user.status === 'active' && (
                        <button className="btn btn-sm btn-outline-coral" title="Suspend user">
                          Suspend
                        </button>
                      )}
                      {user.flag_count >= 5 && (
                        <button className="btn btn-sm btn-danger" title="Permaban user">
                          Ban
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div
            style={{
              padding: '40px',
              textAlign: 'center',
              color: 'var(--color-text-muted)',
              fontSize: 13,
            }}
          >
            No users match this filter
          </div>
        )}
      </div>
    </div>
  )
}
