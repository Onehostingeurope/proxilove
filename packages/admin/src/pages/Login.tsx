import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      navigate('/')
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--color-bg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Radar background rings */}
      {[300, 500, 700, 900].map((size, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          border: '1px solid rgba(0,240,255,0.06)',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }} />
      ))}
      {/* Glow orb */}
      <div style={{
        position: 'absolute',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,240,255,0.07) 0%, transparent 70%)',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }} />

      {/* Login card */}
      <div className="glass-card" style={{ width: '100%', maxWidth: '420px', padding: '48px 40px', position: 'relative', zIndex: 1 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '8px' }}>
            <div style={{
              width: '12px', height: '12px', borderRadius: '50%',
              background: 'var(--color-primary)',
              boxShadow: '0 0 12px var(--color-primary)',
              animation: 'pulse-glow 2s infinite',
            }} />
            <span style={{ fontSize: '24px', fontWeight: 900, color: 'var(--color-primary)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              STITCH
            </span>
          </div>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>Admin Control Center</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="admin@stitch.app"
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                padding: '12px 16px',
                color: 'var(--color-text)',
                fontSize: '15px',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => { e.target.style.borderColor = 'var(--color-primary)' }}
              onBlur={e => { e.target.style.borderColor = 'var(--color-border)' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                padding: '12px 16px',
                color: 'var(--color-text)',
                fontSize: '15px',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => { e.target.style.borderColor = 'var(--color-primary)' }}
              onBlur={e => { e.target.style.borderColor = 'var(--color-border)' }}
            />
          </div>

          {error && (
            <div style={{
              background: 'rgba(255,90,95,0.1)',
              border: '1px solid rgba(255,90,95,0.3)',
              borderRadius: '8px',
              padding: '12px 16px',
              color: 'var(--color-coral)',
              fontSize: '14px',
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '15px',
              fontWeight: 700,
              marginTop: '8px',
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Signing in...' : 'Sign In to Admin'}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            localStorage.setItem('proxilove_admin_demo', 'true')
            window.location.href = window.location.pathname.startsWith('/admin') ? '/admin' : '/'
          }}
          style={{
            width: '100%',
            padding: '14px',
            fontSize: '15px',
            fontWeight: 700,
            marginTop: '12px',
            background: 'linear-gradient(135deg, rgba(0,240,255,0.08), rgba(0,240,255,0.01))',
            border: '1px solid rgba(0,240,255,0.3)',
            borderRadius: '8px',
            color: 'var(--color-cyan)',
            cursor: 'pointer',
            transition: 'all 0.2s',
            outline: 'none',
            boxSizing: 'border-box',
          }}
          onMouseOver={e => {
            e.currentTarget.style.borderColor = 'var(--color-cyan)'
            e.currentTarget.style.boxShadow = '0 0 15px rgba(0,240,255,0.3)'
          }}
          onMouseOut={e => {
            e.currentTarget.style.borderColor = 'rgba(0,240,255,0.3)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          ⚡ Sign In as Demo Admin
        </button>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '12px', color: 'var(--color-text-faint)' }}>
          Admin access only. Unauthorized access is prohibited.
        </p>
      </div>
    </div>
  )
}
