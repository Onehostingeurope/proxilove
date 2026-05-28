'use client'

import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import RadarOrb from '@/components/RadarOrb'
import ProfileCapsule from '@/components/ProfileCapsule'
import StatsCounter from '@/components/StatsCounter'

const MapBackground = dynamic(() => import('@/components/MapBackground'), { ssr: false })

/* ============================================================
   Inline styles — all vanilla CSS via style objects / className
   ============================================================ */

export default function HomePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* ------------------------------------------------------------------ */}
      {/* NAV                                                                  */}
      {/* ------------------------------------------------------------------ */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: '0 24px',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(10,15,36,0.8)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0,240,255,0.08)',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'rgba(0,240,255,0.12)',
              border: '1.5px solid rgba(0,240,255,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 12px rgba(0,240,255,0.3)',
            }}
          >
            <div className="live-dot" style={{ width: 10, height: 10 }} />
          </div>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1.25rem',
              fontWeight: 800,
              color: '#fff',
              letterSpacing: '-0.02em',
            }}
          >
            PROXILOVE
          </span>
        </div>

        {/* Nav links */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 32,
          }}
        >
          <a
            href="#how-it-works"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.88rem',
              fontWeight: 500,
              color: 'var(--color-muted)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#fff')}
            onMouseOut={(e) => (e.currentTarget.style.color = 'var(--color-muted)')}
          >
            How It Works
          </a>
          <a
            href="#pricing"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.88rem',
              fontWeight: 500,
              color: 'var(--color-muted)',
              textDecoration: 'none',
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#fff')}
            onMouseOut={(e) => (e.currentTarget.style.color = 'var(--color-muted)')}
          >
            Pricing
          </a>
          <a href="#download" className="btn-primary" style={{ padding: '9px 22px', fontSize: '0.82rem' }}>
            Get App
          </a>
        </div>
      </nav>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 1 — HERO                                                     */}
      {/* ------------------------------------------------------------------ */}
      <section
        id="hero"
        style={{
          height: '100vh',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Live Map Background — centers on real GPS position */}
        <MapBackground />

        {/* Minimal vignette — barely darkens edges, map visible everywhere */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background:
              'linear-gradient(to bottom, rgba(10,15,36,0.3) 0%, rgba(10,15,36,0.0) 15%, rgba(10,15,36,0.0) 70%, rgba(10,15,36,0.2) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Dot grid overlay */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(circle, rgba(0,240,255,0.08) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            animation: 'drift 8s linear infinite',
            zIndex: 2,
            opacity: 0.3,
            pointerEvents: 'none',
          }}
        />

        {/* ── RADAR ORB — higher to give text space below ── */}
        <div
          style={{
            position: 'absolute',
            top: '33%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
            width: 520,
            height: 520,
            animation: mounted ? 'fade-in 0.8s ease both' : 'none',
          }}
        >
          <RadarOrb size={520} showLabel />

          {/* Floating profile capsules */}
          <ProfileCapsule
            name="Sarah"
            age={24}
            distance="12m away"
            avatarColor="linear-gradient(135deg, #FF6B9D, #FF8E53)"
            animationDelay="0s"
            animationName="float"
            style={{ top: 20, right: -160 }}
          />
          <ProfileCapsule
            name="Mike"
            age={29}
            distance="8m away"
            avatarColor="linear-gradient(135deg, #4FACFE, #00F2FE)"
            animationDelay="0.8s"
            animationName="float-reverse"
            style={{ bottom: 60, right: -140 }}
          />
          <ProfileCapsule
            name="Jess"
            age={27}
            distance="20m away"
            avatarColor="linear-gradient(135deg, #43E97B, #38F9D7)"
            animationDelay="1.6s"
            animationName="float"
            style={{ top: 40, left: -155 }}
          />
          <ProfileCapsule
            name="Alex"
            age={31}
            distance="5m away"
            avatarColor="linear-gradient(135deg, #FA709A, #FEE140)"
            animationDelay="2.4s"
            animationName="float-reverse"
            style={{ bottom: 70, left: -130 }}
          />
        </div>

        {/* ── TEXT + CTA — pushed lower so capsules never overlap ── */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '200px 24px 36px',
            background: 'none',
            backdropFilter: 'none',
          }}
        >
          {/* Headline */}
          <h1
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(2rem, 5vw, 3.8rem)',
              fontWeight: 900,
              color: '#fff',
              letterSpacing: '-0.03em',
              textAlign: 'center',
              lineHeight: 1.08,
              maxWidth: 780,
              marginBottom: 16,
              textShadow: '0 2px 20px rgba(0,0,0,0.9), 0 0 60px rgba(0,0,0,0.7)',
              animation: mounted ? 'fade-in-up 0.8s ease 0.2s both' : 'none',
            }}
          >
            Find Who&apos;s Near You,
            <br />
            <span
              style={{
                color: 'var(--color-cyan)',
                textShadow: '0 0 40px rgba(0,240,255,0.5)',
              }}
            >
              Right Now.
            </span>
          </h1>

          {/* Subheadline */}
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
              fontWeight: 400,
              color: 'var(--color-muted)',
              textAlign: 'center',
              maxWidth: 560,
              lineHeight: 1.7,
              marginBottom: 28,
              animation: mounted ? 'fade-in-up 0.8s ease 0.35s both' : 'none',
            }}
          >
            PROXILOVE uses Bluetooth proximity to show you real people, in real locations,
            right now.{' '}
            <span style={{ color: 'var(--color-text)' }}>
              No algorithms. Just distance.
            </span>
          </p>

          {/* CTA buttons */}
          <div
            style={{
              display: 'flex',
              gap: 16,
              flexWrap: 'wrap',
              justifyContent: 'center',
              marginBottom: 28,
              animation: mounted ? 'fade-in-up 0.8s ease 0.5s both' : 'none',
            }}
          >
            <a href="#download" className="btn-glass">
              <span style={{ fontSize: '1.1rem' }}>📱</span>
              Download for iOS
            </a>
            <a href="#download" className="btn-glass">
              <span style={{ fontSize: '1.1rem' }}>🤖</span>
              Download for Android
            </a>
          </div>

          {/* Badge strip */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 24,
              opacity: 0.6,
              animation: mounted ? 'fade-in 1s ease 0.8s both' : 'none',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div className="live-dot" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-green)' }}>
                LIVE
              </span>
            </div>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-muted)' }}>
              2,847 radars active
            </span>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-muted)' }}>
              Bluetooth · Ultra-Wideband
            </span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 12,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            opacity: 0.6,
            animation: 'scroll-bounce 2s ease-in-out infinite',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.65rem',
              color: 'rgba(255,255,255,0.6)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              textShadow: '0 1px 8px rgba(0,0,0,0.8)',
            }}
          >
            Scroll
          </div>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
            <rect x="1" y="1" width="14" height="22" rx="7" stroke="rgba(0,240,255,0.5)" strokeWidth="1.5" />
            <circle cx="8" cy="8" r="2.5" fill="#00F0FF" style={{ animation: 'scroll-bounce 2s ease-in-out infinite' }} />
          </svg>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 2 — HOW IT WORKS                                            */}
      {/* ------------------------------------------------------------------ */}
      <section
        id="how-it-works"
        style={{
          padding: '100px 24px',
          background: 'linear-gradient(180deg, #0A0F24 0%, #0D1228 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background accent */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 800,
            height: 2,
            background: 'linear-gradient(90deg, transparent, rgba(0,240,255,0.3), transparent)',
          }}
        />

        <div className="container">
          <div className="section-header">
            <h2>
              How <span className="cyan-underline">PROXILOVE</span> Works
            </h2>
            <p>Three simple steps to find someone incredible right around the corner.</p>
          </div>

          {/* Steps grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 24,
            }}
          >
            {[
              {
                step: '01',
                title: 'Enable Radar',
                desc: 'Turn on your PROXILOVE radar and let our Bluetooth & Ultra-Wideband technology silently scan for other PROXILOVE users within your immediate proximity. Your exact location is never shared.',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="3" fill="#00F0FF" />
                    <path d="M6.3 6.3a7 7 0 000 11.4M17.7 17.7a7 7 0 000-11.4" stroke="#00F0FF" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M3 12A9 9 0 0021 12" stroke="#00F0FF" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" />
                  </svg>
                ),
              },
              {
                step: '02',
                title: 'See Who\'s Nearby',
                desc: 'Watch real people appear on your radar in real-time. See their distance in meters, their profile photo, and whether they\'re actively looking — no swiping, no matching queue, just proximity.',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="8" r="4" stroke="#00F0FF" strokeWidth="1.5" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#00F0FF" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="20" cy="4" r="2" fill="#00E676" />
                  </svg>
                ),
              },
              {
                step: '03',
                title: 'Send a Love',
                desc: 'Like what you see? Send a Love — a gentle, anonymous signal of interest. If they send one back, you\'re instantly connected. Message, meet, and make something real happen.',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke="#00F0FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <div
                key={i}
                className="glass-card"
                style={{
                  padding: '40px 32px',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(0,240,255,0.2), 0 20px 60px rgba(0,0,0,0.3)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.borderColor = 'rgba(0,240,255,0.3)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow = ''
                  e.currentTarget.style.transform = ''
                  e.currentTarget.style.borderColor = ''
                }}
              >
                {/* Step number */}
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    color: 'rgba(0,240,255,0.4)',
                    letterSpacing: '0.2em',
                    marginBottom: 24,
                  }}
                >
                  STEP {item.step}
                </div>

                {/* Icon */}
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: '14px',
                    background: 'rgba(0,240,255,0.1)',
                    border: '1px solid rgba(0,240,255,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 24,
                    boxShadow: '0 0 20px rgba(0,240,255,0.1)',
                  }}
                >
                  {item.icon}
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#fff',
                    marginBottom: 12,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.95rem',
                    color: 'var(--color-muted)',
                    lineHeight: 1.7,
                  }}
                >
                  {item.desc}
                </p>

                {/* Bottom accent line */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: 'linear-gradient(90deg, rgba(0,240,255,0.5), transparent)',
                    borderRadius: '0 0 16px 16px',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 3 — PROXIMITY PAYWALL TEASER                               */}
      {/* ------------------------------------------------------------------ */}
      <section
        id="pricing"
        style={{
          padding: '100px 24px',
          background: 'linear-gradient(180deg, #0D1228 0%, #0A0F24 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Large blurred cyan sphere bg */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: '-10%',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,240,255,0.04) 0%, transparent 70%)',
            filter: 'blur(60px)',
            zIndex: 0,
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: 48,
              alignItems: 'center',
            }}
          >
            {/* LEFT — Description + blurred cards */}
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '6px 14px',
                  background: 'rgba(255,90,95,0.1)',
                  border: '1px solid rgba(255,90,95,0.3)',
                  borderRadius: '999px',
                  marginBottom: 24,
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: 'var(--color-coral)',
                    animation: 'pulse-dot 1.5s ease-in-out infinite',
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    color: 'var(--color-coral)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  Premium Feature
                </span>
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                  fontWeight: 800,
                  color: '#fff',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.15,
                  marginBottom: 20,
                }}
              >
                See Crystal-Clear{' '}
                <span style={{ color: 'var(--color-cyan)' }}>Proximity Photos</span>
              </h2>

              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.05rem',
                  color: 'var(--color-muted)',
                  lineHeight: 1.7,
                  marginBottom: 40,
                  maxWidth: 480,
                }}
              >
                Unlock full profile photos of everyone within 50 meters for just{' '}
                <strong style={{ color: 'var(--color-text)' }}>€9/month</strong>. See
                exactly who&apos;s on the beach with you right now. No guessing.
              </p>

              {/* Blurred profile cards */}
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                {[
                  { color: 'linear-gradient(135deg, #FF6B9D, #FF8E53)', dist: '4m' },
                  { color: 'linear-gradient(135deg, #4FACFE, #00F2FE)', dist: '11m' },
                  { color: 'linear-gradient(135deg, #A18CD1, #FBC2EB)', dist: '23m' },
                ].map((card, i) => (
                  <div
                    key={i}
                    className="glass-card"
                    style={{
                      width: 120,
                      padding: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 10,
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Avatar */}
                    <div
                      style={{
                        width: 64,
                        height: 64,
                        borderRadius: '50%',
                        background: card.color,
                        filter: 'blur(6px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    />
                    {/* Lock overlay */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 16,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 64,
                        height: 64,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(10,15,36,0.5)',
                      }}
                    >
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="#00F0FF">
                        <path d="M18 10H17V7C17 4.24 14.76 2 12 2C9.24 2 7 4.24 7 7V10H6C4.9 10 4 10.9 4 12V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V12C20 10.9 19.1 10 18 10ZM12 17C10.9 17 10 16.1 10 15C10 13.9 10.9 13 12 13C13.1 13 14 13.9 14 15C14 16.1 13.1 17 12 17ZM15.1 10H8.9V7C8.9 5.29 10.29 3.9 12 3.9C13.71 3.9 15.1 5.29 15.1 7V10Z" />
                      </svg>
                    </div>
                    {/* Blurred name lines */}
                    <div
                      style={{
                        width: '70%',
                        height: 8,
                        background: 'rgba(255,255,255,0.15)',
                        borderRadius: 4,
                        filter: 'blur(3px)',
                      }}
                    />
                    {/* Distance */}
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        color: 'var(--color-cyan)',
                        fontWeight: 600,
                      }}
                    >
                      {card.dist} away
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — Pricing card */}
            <div
              className="glass-card"
              style={{
                padding: '44px 40px',
                border: '1px solid rgba(255,90,95,0.2)',
                boxShadow: '0 0 60px rgba(255,90,95,0.08), 0 30px 80px rgba(0,0,0,0.4)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Top glow accent */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '80%',
                  height: 1,
                  background: 'linear-gradient(90deg, transparent, rgba(255,90,95,0.6), transparent)',
                }}
              />

              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--color-coral)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: 16,
                  fontWeight: 600,
                }}
              >
                Proximity Unlock
              </div>

              {/* Price */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 8 }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '4rem',
                    fontWeight: 700,
                    color: '#fff',
                    lineHeight: 1,
                  }}
                >
                  €9
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '1rem',
                    color: 'var(--color-muted)',
                  }}
                >
                  / month
                </span>
              </div>

              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.85rem',
                  color: 'var(--color-muted)',
                  marginBottom: 32,
                }}
              >
                Cancel anytime. No hidden fees.
              </p>

              {/* Feature list */}
              <ul className="feature-list" style={{ marginBottom: 36 }}>
                {[
                  'Unlock all proximity photos',
                  'Unlimited Proxilove Requests',
                  'See exact distance in meters',
                  'Priority visibility on radars',
                  'Advanced radar filters',
                  'Beach & venue hotspot alerts',
                ].map((feat, i) => (
                  <li key={i}>{feat}</li>
                ))}
              </ul>

              <a href="#download" className="btn-coral" style={{ width: '100%', justifyContent: 'center' }}>
                Unlock Full Access — €9/mo
              </a>

              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.75rem',
                  color: 'rgba(255,255,255,0.3)',
                  textAlign: 'center',
                  marginTop: 16,
                }}
              >
                🔒 Secure payment · Stripe encrypted
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 4 — LIVE STATS STRIP                                        */}
      {/* ------------------------------------------------------------------ */}
      <section
        style={{
          padding: '80px 24px',
          background: 'linear-gradient(135deg, rgba(0,240,255,0.03) 0%, rgba(10,15,36,1) 50%, rgba(0,240,255,0.03) 100%)',
          borderTop: '1px solid rgba(0,240,255,0.08)',
          borderBottom: '1px solid rgba(0,240,255,0.08)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Scan line effect */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '100%',
            background:
              'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,240,255,0.015) 2px, rgba(0,240,255,0.015) 4px)',
            pointerEvents: 'none',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          {/* Live badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              marginBottom: 56,
            }}
          >
            <div className="live-dot" />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'var(--color-green)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                textShadow: '0 0 10px rgba(0,230,118,0.5)',
              }}
            >
              Live Global Stats
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 40,
            }}
          >
            <StatsCounter target={2847} label="Active Radars Right Now" duration={2200} />
            <StatsCounter target={342}  label="PROXILOVE Matches Today" duration={1800} />
            <StatsCounter target={48}   label="Live Beach Hotspots" duration={1400} />
          </div>

          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'rgba(255,255,255,0.2)',
              textAlign: 'center',
              marginTop: 48,
              letterSpacing: '0.1em',
            }}
          >
            Stats update every 30 seconds · All times UTC
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 5 — TESTIMONIALS                                            */}
      {/* ------------------------------------------------------------------ */}
      <section
        style={{
          padding: '100px 24px',
          background: 'linear-gradient(180deg, #0A0F24 0%, #0D1228 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="container">
          <div className="section-header">
            <h2>
              Real Connections,{' '}
              <span className="cyan-underline">Real Proximity</span>
            </h2>
            <p>
              People are already finding each other with PROXILOVE. Here&apos;s what they say.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 24,
            }}
          >
            {[
              {
                quote:
                  'Met someone 8 meters away at Bondi Beach. We grabbed coffee the same afternoon. PROXILOVE is the only app that actually works.',
                name: 'Jake T.',
                location: 'Bondi Beach, AU',
                avatar: 'linear-gradient(135deg, #4FACFE, #00F2FE)',
              },
              {
                quote:
                  'This is the only dating app that actually matters — you\'re already in the same place as the other person. That changes everything.',
                name: 'Maria S.',
                location: 'Barcelona, ES',
                avatar: 'linear-gradient(135deg, #FA709A, #FEE140)',
              },
              {
                quote:
                  'Finally, no ghosting. If they\'re nearby, they\'re real. I\'ve had more genuine conversations in one week than in a year of Tinder.',
                name: 'Tom K.',
                location: 'Santa Monica, US',
                avatar: 'linear-gradient(135deg, #43E97B, #38F9D7)',
              },
            ].map((t, i) => (
              <div
                key={i}
                className="glass-card"
                style={{
                  padding: '36px 32px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 20,
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(0,240,255,0.12), 0 20px 60px rgba(0,0,0,0.3)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = ''
                  e.currentTarget.style.boxShadow = ''
                }}
              >
                <div className="stars">★★★★★</div>

                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '1rem',
                    color: 'var(--color-text)',
                    lineHeight: 1.75,
                    fontStyle: 'italic',
                    flex: 1,
                  }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      background: t.avatar,
                      border: '2px solid rgba(0,240,255,0.3)',
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="8" r="4" fill="rgba(255,255,255,0.7)" />
                      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        color: '#fff',
                      }}
                    >
                      {t.name}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        color: 'var(--color-cyan)',
                        opacity: 0.8,
                      }}
                    >
                      📍 {t.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 6 — APP DOWNLOAD CTA                                        */}
      {/* ------------------------------------------------------------------ */}
      <section
        id="download"
        style={{
          padding: '120px 24px',
          background: 'linear-gradient(180deg, #0D1228 0%, #0A0F24 100%)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {/* Background radar orb */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: 0.08,
            pointerEvents: 'none',
          }}
        >
          <RadarOrb size={600} showLabel={false} />
        </div>

        {/* Glow blob */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 700,
            height: 700,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,240,255,0.05) 0%, transparent 70%)',
            filter: 'blur(40px)',
            zIndex: 0,
          }}
        />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 720 }}>
          {/* Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 16px',
              background: 'rgba(0,240,255,0.08)',
              border: '1px solid rgba(0,240,255,0.25)',
              borderRadius: '999px',
              marginBottom: 32,
            }}
          >
            <div className="live-dot" />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--color-cyan)',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Available Now
            </span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(2rem, 5vw, 3.8rem)',
              fontWeight: 900,
              color: '#fff',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: 24,
            }}
          >
            Ready to Scan{' '}
            <span
              style={{
                color: 'var(--color-cyan)',
                textShadow: '0 0 40px rgba(0,240,255,0.5)',
              }}
            >
              Your Beach?
            </span>
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1.1rem',
              color: 'var(--color-muted)',
              lineHeight: 1.7,
              marginBottom: 48,
              maxWidth: 520,
              margin: '0 auto 48px',
            }}
          >
            Download PROXILOVE and start discovering real people in your proximity.
            Free to download. Start stitching in 60 seconds.
          </p>

          {/* Download buttons */}
          <div
            style={{
              display: 'flex',
              gap: 20,
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: 40,
            }}
          >
            {/* App Store */}
            <a
              href="#"
              className="glass-card"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '16px 32px',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                border: '1px solid rgba(0,240,255,0.2)',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)'
                e.currentTarget.style.boxShadow = '0 0 30px rgba(0,240,255,0.2)'
                e.currentTarget.style.borderColor = 'rgba(0,240,255,0.4)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = ''
                e.currentTarget.style.boxShadow = ''
                e.currentTarget.style.borderColor = 'rgba(0,240,255,0.2)'
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#E5E1E4">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div style={{ textAlign: 'left' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.68rem',
                    color: 'var(--color-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  Download on the
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: '#fff',
                    lineHeight: 1.2,
                  }}
                >
                  App Store
                </div>
              </div>
            </a>

            {/* Google Play */}
            <a
              href="#"
              className="glass-card"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '16px 32px',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                border: '1px solid rgba(0,240,255,0.2)',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)'
                e.currentTarget.style.boxShadow = '0 0 30px rgba(0,240,255,0.2)'
                e.currentTarget.style.borderColor = 'rgba(0,240,255,0.4)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = ''
                e.currentTarget.style.boxShadow = ''
                e.currentTarget.style.borderColor = 'rgba(0,240,255,0.2)'
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M3 20.5v-17c0-.83.94-1.3 1.6-.8l15 8.5c.63.35.63 1.25 0 1.6l-15 8.5c-.66.5-1.6.03-1.6-.8z" fill="#00F0FF" opacity="0.8" />
                <path d="M3 3.5l9.5 9.5L3 20.5V3.5z" fill="#00E676" opacity="0.6" />
                <path d="M12.5 13l6 3.5-6-3.5z" fill="#FF5A5F" opacity="0.6" />
              </svg>
              <div style={{ textAlign: 'left' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.68rem',
                    color: 'var(--color-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  Get it on
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: '#fff',
                    lineHeight: 1.2,
                  }}
                >
                  Google Play
                </div>
              </div>
            </a>
          </div>

          {/* Small print */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 20,
              flexWrap: 'wrap',
            }}
          >
            {['Free to download', 'iOS 16+ · Android 12+', 'Bluetooth required'].map((item, i) => (
              <span
                key={i}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'rgba(255,255,255,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <span style={{ color: 'var(--color-cyan)', opacity: 0.6 }}>✓</span>
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* FOOTER                                                               */}
      {/* ------------------------------------------------------------------ */}
      <footer
        style={{
          padding: '48px 24px 36px',
          background: '#060910',
          borderTop: '1px solid rgba(0,240,255,0.06)',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 32,
          }}
        >
          {/* Top row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 24,
            }}
          >
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: 'rgba(0,240,255,0.1)',
                  border: '1.5px solid rgba(0,240,255,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div className="live-dot" style={{ width: 8, height: 8 }} />
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.1rem',
                  fontWeight: 800,
                  color: '#fff',
                  letterSpacing: '-0.02em',
                }}
              >
                PROXILOVE
              </span>
            </div>

            {/* Footer links */}
            <nav
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 24,
                flexWrap: 'wrap',
              }}
              aria-label="Footer navigation"
            >
              {[
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms of Service', href: '/terms' },
                { label: 'Admin Login', href: '/admin' },
                { label: 'Contact', href: 'mailto:hello@PROXILOVE.app' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.85rem',
                    color: 'rgba(255,255,255,0.35)',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = 'var(--color-cyan)')}
                  onMouseOut={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Divider */}
          <div
            style={{
              height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(0,240,255,0.1), transparent)',
            }}
          />

          {/* Bottom row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 12,
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8rem',
                color: 'rgba(255,255,255,0.2)',
              }}
            >
              © 2026 PROXILOVE — Proximity Dating. All rights reserved.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div className="live-dot" style={{ width: 6, height: 6 }} />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: 'rgba(0,230,118,0.6)',
                  letterSpacing: '0.1em',
                }}
              >
                SYSTEMS ONLINE
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
