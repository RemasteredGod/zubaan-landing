'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

// ─── Design tokens ────────────────────────────────────────────────────────────
const Z = {
  bg: '#14102A',
  surface: '#221940',
  border: '#2A1F4A',
  text: '#F5F0EB',
  dim: '#8A84A8',
  gold: '#F4B942',
  goldDeep: '#D89A25',
  coral: '#E07C6E',
  sage: '#7BA89A',
} as const

// ─── ZubaanMark SVG ──────────────────────────────────────────────────────────
function ZubaanMark({ size = 56, animated = true }: { size?: number; animated?: boolean }) {
  const bars = [
    { x: 10, y: 19.5, h: 17, delay: '0ms' },
    { x: 23, y: 13, h: 30, delay: '120ms' },
    { x: 36, y: 16, h: 24, delay: '220ms' },
    { x: 49, y: 10, h: 36, delay: '160ms' },
    { x: 62, y: 18, h: 20, delay: '60ms' },
  ]
  return (
    <svg width={size} height={Math.round(size * (78 / 76))} viewBox="0 0 76 78" fill="none">
      <rect x="0" y="0" width="76" height="56" rx="12" fill="#F4B942" />
      <path d="M8 56 L2 74 L22 56 Z" fill="#F4B942" />
      {bars.map((b, i) => (
        <rect
          key={i}
          x={b.x}
          y={b.y}
          width="8"
          height={b.h}
          rx="4"
          fill="#14102A"
          className={animated ? 'zbar' : ''}
          style={animated ? { animationDelay: b.delay } : {}}
        />
      ))}
    </svg>
  )
}

// ─── Nav ─────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'all 0.3s ease',
        backgroundColor: scrolled ? 'rgba(20,16,42,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? `1px solid ${Z.border}` : '1px solid transparent',
      }}
    >
      <div
        style={{
          maxWidth: 1120,
          margin: '0 auto',
          padding: '0 24px',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <ZubaanMark size={36} animated={false} />
          <span
            style={{
              fontFamily: 'var(--font-fraunces)',
              fontStyle: 'italic',
              fontSize: 24,
              color: Z.gold,
              letterSpacing: '-0.5px',
            }}
          >
            Zubaan
          </span>
        </div>

        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <a
            href="#how-it-works"
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 13,
              color: Z.dim,
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => ((e.target as HTMLElement).style.color = Z.text)}
            onMouseLeave={e => ((e.target as HTMLElement).style.color = Z.dim)}
          >
            How it works
          </a>
          <a
            href="#pricing"
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 13,
              color: Z.dim,
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => ((e.target as HTMLElement).style.color = Z.text)}
            onMouseLeave={e => ((e.target as HTMLElement).style.color = Z.dim)}
          >
            Pricing
          </a>
          <a
            href="#download"
            style={{
              fontFamily: 'var(--font-inter)',
              fontWeight: 600,
              fontSize: 13,
              color: Z.bg,
              backgroundColor: Z.gold,
              borderRadius: 10,
              padding: '8px 18px',
              textDecoration: 'none',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={e => ((e.target as HTMLElement).style.backgroundColor = Z.goldDeep)}
            onMouseLeave={e => ((e.target as HTMLElement).style.backgroundColor = Z.gold)}
          >
            Download
          </a>
        </div>
      </div>
    </nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        paddingTop: 80,
      }}
    >
      {/* Gradient bg */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, #2D1B4E 0%, #14102A 60%)',
        }}
      />

      {/* Gold hairline top */}
      <div
        style={{
          position: 'absolute',
          top: 120,
          left: 40,
          right: 40,
          height: 1,
          backgroundColor: Z.gold,
          opacity: 0.2,
        }}
      />

      {/* Radial glow */}
      <div
        className="glow-pulse"
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(244,185,66,0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          maxWidth: 900,
          margin: '0 auto',
          padding: '80px 24px 100px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0,
        }}
      >
        {/* Mark */}
        <div style={{ marginBottom: 28 }}>
          <ZubaanMark size={72} animated />
        </div>

        {/* Scripts */}
        <p
          style={{
            fontFamily: 'var(--font-inter)',
            fontWeight: 600,
            fontSize: 10,
            letterSpacing: 4,
            color: Z.dim,
            textTransform: 'uppercase',
            marginBottom: 24,
          }}
        >
          ज़ुबान · زبان
        </p>

        {/* Main headline */}
        <h1
          style={{
            fontFamily: 'var(--font-fraunces)',
            fontStyle: 'italic',
            fontSize: 'clamp(42px, 7vw, 80px)',
            lineHeight: 1.08,
            color: Z.text,
            letterSpacing: '-1.5px',
            marginBottom: 12,
            maxWidth: 780,
          }}
        >
          Reply in your voice,{' '}
          <span style={{ color: Z.gold }}>not ChatGPT's.</span>
        </h1>

        {/* Sub headline */}
        <p
          style={{
            fontFamily: 'var(--font-fraunces)',
            fontStyle: 'italic',
            fontSize: 'clamp(18px, 2.5vw, 26px)',
            color: Z.dim,
            marginBottom: 32,
            marginTop: 8,
          }}
        >
          Koi screenshot lao. Baaki hum sambhaalte hain.
        </p>

        {/* Description */}
        <p
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 16,
            lineHeight: 1.6,
            color: Z.dim,
            maxWidth: 520,
            marginBottom: 48,
          }}
        >
          Upload any chat screenshot from WhatsApp, Instagram, or Bumble. Zubaan reads
          the vibe and writes three replies — in your tone, your language, your style.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 64 }}>
          <AppStoreBadge store="apple" />
          <AppStoreBadge store="google" />
        </div>

        {/* Gold hairline */}
        <div
          style={{
            width: '100%',
            maxWidth: 480,
            height: 1,
            backgroundColor: Z.gold,
            opacity: 0.12,
            marginBottom: 32,
          }}
        />

        {/* Works with */}
        <p
          style={{
            fontFamily: 'var(--font-inter)',
            fontWeight: 600,
            fontSize: 10,
            letterSpacing: 3,
            color: Z.dim,
            textTransform: 'uppercase',
            marginBottom: 16,
          }}
        >
          Works with
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          {['WhatsApp', 'Instagram', 'Bumble', 'Hinge', 'iMessage', 'Telegram'].map(app => (
            <span
              key={app}
              style={{
                fontFamily: 'var(--font-inter)',
                fontWeight: 600,
                fontSize: 12,
                color: Z.text,
                backgroundColor: Z.surface,
                border: `1px solid ${Z.border}`,
                borderRadius: 20,
                padding: '5px 14px',
              }}
            >
              {app}
            </span>
          ))}
        </div>
      </div>

      {/* Gold hairline bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 40,
          right: 40,
          height: 1,
          backgroundColor: Z.gold,
          opacity: 0.12,
        }}
      />
    </section>
  )
}

function AppStoreBadge({ store }: { store: 'apple' | 'google' }) {
  const isApple = store === 'apple'
  return (
    <a
      href="#download"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        backgroundColor: Z.surface,
        border: `1px solid ${Z.border}`,
        borderRadius: 12,
        padding: '12px 20px',
        textDecoration: 'none',
        transition: 'border-color 0.2s, background-color 0.2s',
        cursor: 'pointer',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'rgba(244,185,66,0.5)'
        el.style.backgroundColor = '#2A1F4A'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = Z.border
        el.style.backgroundColor = Z.surface
      }}
    >
      {isApple ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#F5F0EB">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#F5F0EB">
          <path d="M3.18 23.76c.3.17.64.2.96.08l12.45-7.19-2.73-2.73zM1.5 2.67C1.19 3 1 3.47 1 4.03v15.95c0 .56.19 1.03.5 1.36l.07.07 8.94-8.94v-.21zM20.37 10.22l-2.54-1.47-3.07 3.07 3.07 3.07 2.55-1.47c.73-.42.73-1.1 0-1.52zM4.14.24L16.59 7.43l-2.73 2.73L4.14.24C3.82.06 3.48.1 3.18.27" />
        </svg>
      )}
      <div>
        <p
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 9,
            color: Z.dim,
            letterSpacing: 0.5,
            textTransform: 'uppercase',
          }}
        >
          {isApple ? 'Download on the' : 'Get it on'}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-inter)',
            fontWeight: 600,
            fontSize: 14,
            color: Z.text,
            lineHeight: 1.2,
          }}
        >
          {isApple ? 'App Store' : 'Google Play'}
        </p>
      </div>
    </a>
  )
}

// ─── How it works ─────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    {
      num: '01',
      emoji: '📸',
      title: 'Screenshot drop karo',
      hinglish: 'Upload anywhere',
      desc: 'Share any chat screenshot directly from WhatsApp, Instagram, Bumble, or Hinge. One tap from your share sheet.',
    },
    {
      num: '02',
      emoji: '🧠',
      title: 'AI vibe detect karta hai',
      hinglish: 'Context is everything',
      desc: "Zubaan reads the tone — flirty, savage, chill, caring, or formal — and understands the conversation's context.",
    },
    {
      num: '03',
      emoji: '✨',
      title: 'Teen replies milte hain',
      hinglish: '3 options, your style',
      desc: 'Get three replies in your voice. Pick one, tune it, copy it, or convert it to a voice note and send it directly.',
    },
  ]

  return (
    <section
      id="how-it-works"
      style={{
        padding: '100px 24px',
        maxWidth: 1120,
        margin: '0 auto',
      }}
    >
      {/* Section label */}
      <p
        style={{
          fontFamily: 'var(--font-inter)',
          fontWeight: 600,
          fontSize: 10,
          letterSpacing: 4,
          color: Z.gold,
          textTransform: 'uppercase',
          textAlign: 'center',
          marginBottom: 16,
        }}
      >
        How it works
      </p>

      <h2
        style={{
          fontFamily: 'var(--font-fraunces)',
          fontStyle: 'italic',
          fontSize: 'clamp(32px, 5vw, 52px)',
          color: Z.text,
          textAlign: 'center',
          letterSpacing: '-1px',
          marginBottom: 64,
          lineHeight: 1.1,
        }}
      >
        Three steps. Zero cringe.
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24,
        }}
      >
        {steps.map((step, i) => (
          <div
            key={i}
            style={{
              backgroundColor: Z.surface,
              border: `1px solid ${Z.border}`,
              borderRadius: 16,
              padding: 32,
              position: 'relative',
              overflow: 'hidden',
              transition: 'border-color 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = 'rgba(244,185,66,0.35)'
              el.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = Z.border
              el.style.transform = 'translateY(0)'
            }}
          >
            {/* Step number watermark */}
            <div
              style={{
                position: 'absolute',
                top: -8,
                right: 16,
                fontFamily: 'var(--font-fraunces)',
                fontStyle: 'italic',
                fontSize: 80,
                color: 'rgba(244,185,66,0.06)',
                lineHeight: 1,
                userSelect: 'none',
              }}
            >
              {step.num}
            </div>

            {/* Emoji */}
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 12,
                backgroundColor: 'rgba(244,185,66,0.08)',
                border: '1px solid rgba(244,185,66,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
                marginBottom: 20,
              }}
            >
              {step.emoji}
            </div>

            {/* Number pill */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                marginBottom: 12,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontWeight: 600,
                  fontSize: 10,
                  letterSpacing: 2,
                  color: Z.gold,
                  textTransform: 'uppercase',
                }}
              >
                Step {step.num}
              </span>
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-fraunces)',
                fontStyle: 'italic',
                fontSize: 22,
                color: Z.text,
                marginBottom: 6,
                lineHeight: 1.2,
              }}
            >
              {step.title}
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontWeight: 600,
                fontSize: 10,
                letterSpacing: 2,
                color: Z.dim,
                textTransform: 'uppercase',
                marginBottom: 14,
              }}
            >
              {step.hinglish}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 14,
                lineHeight: 1.6,
                color: Z.dim,
              }}
            >
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Phone Mockup Section ─────────────────────────────────────────────────────
function PhoneMockup() {
  const [activeReply, setActiveReply] = useState(0)

  const replies = [
    { tone: 'FLIRTY', text: 'Acha? Toh kya plan hai tera aaj ke baad? 👀', color: Z.coral },
    { tone: 'CHILL', text: 'Haha nice — same, I was literally thinking that.', color: Z.sage },
    { tone: 'SAVAGE', text: 'Oh so NOW you reply? Typical lol.', color: '#9B8EFF' },
  ]

  return (
    <section
      style={{
        padding: '80px 24px',
        background: `linear-gradient(180deg, ${Z.bg} 0%, #1A1335 50%, ${Z.bg} 100%)`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 64,
        flexWrap: 'wrap',
      }}
    >
      {/* Left copy */}
      <div style={{ maxWidth: 400 }}>
        <p
          style={{
            fontFamily: 'var(--font-inter)',
            fontWeight: 600,
            fontSize: 10,
            letterSpacing: 4,
            color: Z.gold,
            textTransform: 'uppercase',
            marginBottom: 16,
          }}
        >
          Live demo
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-fraunces)',
            fontStyle: 'italic',
            fontSize: 'clamp(28px, 4vw, 44px)',
            color: Z.text,
            letterSpacing: '-0.8px',
            lineHeight: 1.1,
            marginBottom: 20,
          }}
        >
          Three vibes,<br />one screenshot.
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 15,
            lineHeight: 1.65,
            color: Z.dim,
            marginBottom: 32,
          }}
        >
          Zubaan gives you three distinct replies for every conversation — each tuned to a
          different energy. Pick the one that feels like you. Tune it further. Send.
        </p>

        {/* Tone pills */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {['Flirty', 'Chill', 'Savage', 'Caring', 'Formal', 'Funny'].map(tone => (
            <span
              key={tone}
              style={{
                fontFamily: 'var(--font-inter)',
                fontWeight: 600,
                fontSize: 11,
                color: Z.dim,
                backgroundColor: Z.surface,
                border: `1px solid ${Z.border}`,
                borderRadius: 20,
                padding: '4px 12px',
              }}
            >
              {tone}
            </span>
          ))}
        </div>
      </div>

      {/* Phone frame */}
      <div
        style={{
          width: 280,
          borderRadius: 36,
          border: `2px solid ${Z.border}`,
          backgroundColor: Z.bg,
          overflow: 'hidden',
          boxShadow: `0 0 80px rgba(244,185,66,0.08), 0 32px 64px rgba(0,0,0,0.4)`,
          flexShrink: 0,
        }}
      >
        {/* Phone top bar */}
        <div
          style={{
            backgroundColor: '#1A1335',
            padding: '16px 16px 8px',
            borderBottom: `1px solid ${Z.border}`,
          }}
        >
          {/* Notch */}
          <div
            style={{
              width: 80,
              height: 20,
              backgroundColor: Z.bg,
              borderRadius: 10,
              margin: '0 auto 12px',
            }}
          />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: Z.gold,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-fraunces)',
                fontStyle: 'italic',
                fontSize: 14,
                color: Z.bg,
              }}
            >
              A
            </div>
            <ZubaanMark size={28} animated={false} />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                backgroundColor: 'rgba(224,124,110,0.12)',
                border: '1px solid rgba(224,124,110,0.3)',
                borderRadius: 20,
                padding: '2px 8px',
              }}
            >
              <span style={{ fontSize: 10 }}>🔥</span>
              <span
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontWeight: 600,
                  fontSize: 10,
                  color: Z.coral,
                }}
              >
                3
              </span>
            </div>
          </div>
        </div>

        {/* Screenshot preview */}
        <div style={{ padding: '12px 12px 0' }}>
          <div
            style={{
              backgroundColor: Z.surface,
              borderRadius: 10,
              padding: 12,
              border: `1px solid ${Z.border}`,
              marginBottom: 10,
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontWeight: 600,
                fontSize: 8,
                letterSpacing: 1.5,
                color: Z.dim,
                textTransform: 'uppercase',
                marginBottom: 6,
              }}
            >
              Detected tone
            </p>
            <div style={{ display: 'flex', gap: 6 }}>
              {['Playful', 'Curious'].map(t => (
                <span
                  key={t}
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontWeight: 600,
                    fontSize: 9,
                    color: Z.gold,
                    backgroundColor: 'rgba(244,185,66,0.1)',
                    border: '1px solid rgba(244,185,66,0.25)',
                    borderRadius: 10,
                    padding: '2px 8px',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Reply cards */}
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontWeight: 600,
              fontSize: 8,
              letterSpacing: 2,
              color: Z.dim,
              textTransform: 'uppercase',
              marginBottom: 8,
            }}
          >
            Choose a reply
          </p>
          {replies.map((r, i) => (
            <div
              key={i}
              onClick={() => setActiveReply(i)}
              style={{
                backgroundColor: activeReply === i ? 'rgba(244,185,66,0.06)' : Z.surface,
                border: activeReply === i ? '1.5px solid rgba(244,185,66,0.45)' : `1px solid ${Z.border}`,
                borderRadius: 10,
                padding: '10px 10px',
                marginBottom: 8,
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontWeight: 600,
                  fontSize: 7,
                  letterSpacing: 1.5,
                  color: r.color,
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: 4,
                }}
              >
                {r.tone}
              </span>
              <p
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: 11,
                  color: Z.text,
                  lineHeight: 1.4,
                }}
              >
                {r.text}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom action */}
        <div style={{ padding: '8px 12px 20px' }}>
          <div
            style={{
              display: 'flex',
              gap: 8,
            }}
          >
            <div
              style={{
                flex: 1,
                backgroundColor: Z.gold,
                borderRadius: 10,
                padding: '9px 0',
                textAlign: 'center',
                fontFamily: 'var(--font-inter)',
                fontWeight: 600,
                fontSize: 11,
                color: Z.bg,
              }}
            >
              Copy reply
            </div>
            <div
              style={{
                width: 38,
                backgroundColor: Z.surface,
                border: `1px solid ${Z.border}`,
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
              }}
            >
              🎙️
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Features ─────────────────────────────────────────────────────────────────
function Features() {
  const features = [
    {
      icon: '🎯',
      title: 'Tone-Aware Replies',
      desc: 'Zubaan detects the emotional energy of every message — flirty, passive-aggressive, casual, or serious — and matches it.',
    },
    {
      icon: '🎙️',
      title: 'Voice Note Generator',
      desc: 'Convert any reply into a natural-sounding voice note. Your words, your vibe, delivered in audio. Pro feature.',
    },
    {
      icon: '🔄',
      title: 'Multi-Round Conversations',
      desc: 'Keep going. Upload their reply, get three more options. Zubaan remembers the full thread context.',
    },
    {
      icon: '🎛️',
      title: 'Tune & Adjust',
      desc: 'Too spicy? Not spicy enough? Hit "Tune" and tell Zubaan what to tweak. More savage. More sweet. More you.',
    },
    {
      icon: '📱',
      title: 'Works Everywhere',
      desc: 'WhatsApp, Instagram, Bumble, Hinge, Telegram — if you can screenshot it, Zubaan can read it.',
    },
    {
      icon: '🇮🇳',
      title: 'Hinglish Native',
      desc: 'Built for the way South Asians actually text. Hindi, English, Hinglish, and Romanised Urdu all work.',
    },
  ]

  return (
    <section
      style={{
        padding: '100px 24px',
        maxWidth: 1120,
        margin: '0 auto',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-inter)',
          fontWeight: 600,
          fontSize: 10,
          letterSpacing: 4,
          color: Z.gold,
          textTransform: 'uppercase',
          textAlign: 'center',
          marginBottom: 16,
        }}
      >
        Features
      </p>
      <h2
        style={{
          fontFamily: 'var(--font-fraunces)',
          fontStyle: 'italic',
          fontSize: 'clamp(30px, 5vw, 50px)',
          color: Z.text,
          textAlign: 'center',
          letterSpacing: '-0.8px',
          marginBottom: 64,
          lineHeight: 1.1,
        }}
      >
        Everything your texts were missing.
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 20,
        }}
      >
        {features.map((f, i) => (
          <div
            key={i}
            style={{
              backgroundColor: Z.surface,
              border: `1px solid ${Z.border}`,
              borderRadius: 14,
              padding: '28px 28px',
              transition: 'border-color 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = 'rgba(244,185,66,0.3)'
              el.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = Z.border
              el.style.transform = 'translateY(0)'
            }}
          >
            <div
              style={{
                fontSize: 28,
                marginBottom: 16,
              }}
            >
              {f.icon}
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-inter)',
                fontWeight: 600,
                fontSize: 16,
                color: Z.text,
                marginBottom: 10,
              }}
            >
              {f.title}
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 14,
                lineHeight: 1.6,
                color: Z.dim,
              }}
            >
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function Testimonials() {
  const quotes = [
    {
      text: '"Mujhe nahi pata tha main itna witty ho sakta tha tbh. This app is dangerous."',
      name: 'Rahul M.',
      sub: 'Delhi · Bumble user',
    },
    {
      text: '"Finally something that sounds like ME and not some formal AI robot. The flirty mode is 💀"',
      name: 'Priya S.',
      sub: 'Mumbai · Instagram',
    },
    {
      text: '"Bhai voice note feature is actually insane. Sent it directly, she thought I was being so smooth."',
      name: 'Arjun K.',
      sub: 'Bangalore · WhatsApp',
    },
  ]

  return (
    <section
      style={{
        padding: '80px 24px',
        background: `linear-gradient(180deg, ${Z.bg} 0%, #1C1338 100%)`,
      }}
    >
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <p
          style={{
            fontFamily: 'var(--font-inter)',
            fontWeight: 600,
            fontSize: 10,
            letterSpacing: 4,
            color: Z.gold,
            textTransform: 'uppercase',
            textAlign: 'center',
            marginBottom: 16,
          }}
        >
          Word on the street
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-fraunces)',
            fontStyle: 'italic',
            fontSize: 'clamp(28px, 4vw, 42px)',
            color: Z.text,
            textAlign: 'center',
            letterSpacing: '-0.8px',
            marginBottom: 48,
          }}
        >
          Log kya bol rahe hain.
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 20,
          }}
        >
          {quotes.map((q, i) => (
            <div
              key={i}
              style={{
                backgroundColor: Z.surface,
                border: `1px solid ${Z.border}`,
                borderRadius: 14,
                padding: 28,
              }}
            >
              {/* Stars */}
              <div style={{ marginBottom: 16, color: Z.gold, fontSize: 14 }}>★★★★★</div>
              <p
                style={{
                  fontFamily: 'var(--font-fraunces)',
                  fontStyle: 'italic',
                  fontSize: 16,
                  color: Z.text,
                  lineHeight: 1.55,
                  marginBottom: 20,
                }}
              >
                {q.text}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    backgroundColor: 'rgba(244,185,66,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-fraunces)',
                    fontStyle: 'italic',
                    fontSize: 16,
                    color: Z.gold,
                  }}
                >
                  {q.name[0]}
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontWeight: 600,
                      fontSize: 13,
                      color: Z.text,
                    }}
                  >
                    {q.name}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: 11,
                      color: Z.dim,
                    }}
                  >
                    {q.sub}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Pricing ─────────────────────────────────────────────────────────────────
function Pricing() {
  const freeFeatures = [
    '2 reply sets per day',
    'Basic tone detection',
    'All chat apps supported',
    'Copy to clipboard',
  ]
  const proFeatures = [
    'Unlimited reply sets',
    'Advanced tone tuning',
    'Voice note generation',
    'Multi-round conversations',
    'Priority AI processing',
    'All Free features',
  ]

  return (
    <section
      id="pricing"
      style={{
        padding: '100px 24px',
        maxWidth: 900,
        margin: '0 auto',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-inter)',
          fontWeight: 600,
          fontSize: 10,
          letterSpacing: 4,
          color: Z.gold,
          textTransform: 'uppercase',
          textAlign: 'center',
          marginBottom: 16,
        }}
      >
        Pricing
      </p>
      <h2
        style={{
          fontFamily: 'var(--font-fraunces)',
          fontStyle: 'italic',
          fontSize: 'clamp(30px, 5vw, 48px)',
          color: Z.text,
          textAlign: 'center',
          letterSpacing: '-0.8px',
          marginBottom: 12,
        }}
      >
        Simple. No subscription games.
      </h2>
      <p
        style={{
          fontFamily: 'var(--font-inter)',
          fontSize: 15,
          color: Z.dim,
          textAlign: 'center',
          marginBottom: 56,
        }}
      >
        Start free. Upgrade when you are ready.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 24,
          alignItems: 'start',
        }}
      >
        {/* Free */}
        <div
          style={{
            backgroundColor: Z.surface,
            border: `1px solid ${Z.border}`,
            borderRadius: 16,
            padding: 32,
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-inter)',
              fontWeight: 600,
              fontSize: 14,
              color: Z.dim,
              letterSpacing: 2,
              textTransform: 'uppercase',
              marginBottom: 12,
            }}
          >
            Free
          </h3>
          <div style={{ marginBottom: 4 }}>
            <span
              style={{
                fontFamily: 'var(--font-fraunces)',
                fontStyle: 'italic',
                fontSize: 48,
                color: Z.text,
                letterSpacing: '-1px',
              }}
            >
              ₹0
            </span>
          </div>
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 13,
              color: Z.dim,
              marginBottom: 28,
            }}
          >
            Per month. Always free.
          </p>

          <div
            style={{
              height: 1,
              backgroundColor: Z.border,
              marginBottom: 24,
            }}
          />

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {freeFeatures.map((f, i) => (
              <li
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  fontFamily: 'var(--font-inter)',
                  fontSize: 14,
                  color: Z.text,
                }}
              >
                <span style={{ color: Z.gold, fontSize: 14 }}>✓</span>
                {f}
              </li>
            ))}
          </ul>

          <div
            style={{
              marginTop: 32,
              border: `1px solid ${Z.border}`,
              borderRadius: 12,
              padding: '13px 0',
              textAlign: 'center',
              fontFamily: 'var(--font-inter)',
              fontWeight: 600,
              fontSize: 14,
              color: Z.dim,
              cursor: 'pointer',
            }}
          >
            Get started free
          </div>
        </div>

        {/* Pro */}
        <div
          style={{
            backgroundColor: Z.surface,
            border: `1.5px solid rgba(244,185,66,0.5)`,
            borderRadius: 16,
            padding: 32,
            position: 'relative',
            boxShadow: '0 0 40px rgba(244,185,66,0.08)',
          }}
        >
          {/* Popular badge */}
          <div
            style={{
              position: 'absolute',
              top: -14,
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: Z.gold,
              color: Z.bg,
              fontFamily: 'var(--font-inter)',
              fontWeight: 600,
              fontSize: 11,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              borderRadius: 20,
              padding: '4px 14px',
              whiteSpace: 'nowrap',
            }}
          >
            Most Popular
          </div>

          <h3
            style={{
              fontFamily: 'var(--font-inter)',
              fontWeight: 600,
              fontSize: 14,
              color: Z.gold,
              letterSpacing: 2,
              textTransform: 'uppercase',
              marginBottom: 12,
            }}
          >
            Zubaan Pro
          </h3>
          <div style={{ marginBottom: 4 }}>
            <span
              style={{
                fontFamily: 'var(--font-fraunces)',
                fontStyle: 'italic',
                fontSize: 48,
                color: Z.gold,
                letterSpacing: '-1px',
              }}
            >
              ₹299
            </span>
            <span
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 14,
                color: Z.dim,
                marginLeft: 6,
              }}
            >
              /month
            </span>
          </div>
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 13,
              color: Z.dim,
              marginBottom: 28,
            }}
          >
            Billed monthly. Cancel anytime.
          </p>

          <div
            style={{
              height: 1,
              backgroundColor: 'rgba(244,185,66,0.2)',
              marginBottom: 24,
            }}
          />

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {proFeatures.map((f, i) => (
              <li
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  fontFamily: 'var(--font-inter)',
                  fontSize: 14,
                  color: Z.text,
                }}
              >
                <span style={{ color: Z.gold, fontSize: 14 }}>✓</span>
                {f}
              </li>
            ))}
          </ul>

          <a
            href="#download"
            style={{
              display: 'block',
              marginTop: 32,
              backgroundColor: Z.gold,
              borderRadius: 12,
              padding: '13px 0',
              textAlign: 'center',
              fontFamily: 'var(--font-inter)',
              fontWeight: 600,
              fontSize: 14,
              color: Z.bg,
              textDecoration: 'none',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.backgroundColor = Z.goldDeep)}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.backgroundColor = Z.gold)}
          >
            Go Pro — ₹299/mo
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── CTA Section ──────────────────────────────────────────────────────────────
function CtaSection() {
  return (
    <section
      id="download"
      style={{
        padding: '100px 24px',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(244,185,66,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Gold hairlines */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 40,
          right: 40,
          height: 1,
          backgroundColor: Z.gold,
          opacity: 0.15,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 40,
          right: 40,
          height: 1,
          backgroundColor: Z.gold,
          opacity: 0.1,
        }}
      />

      <div style={{ position: 'relative', maxWidth: 600, margin: '0 auto' }}>
        <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'center' }}>
          <ZubaanMark size={56} animated />
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-fraunces)',
            fontStyle: 'italic',
            fontSize: 'clamp(36px, 6vw, 64px)',
            color: Z.text,
            letterSpacing: '-1.5px',
            lineHeight: 1.05,
            marginBottom: 20,
          }}
        >
          Kya scene hai?
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 16,
            color: Z.dim,
            lineHeight: 1.6,
            marginBottom: 48,
          }}
        >
          Stop leaving chats on read because you don't know what to say.
          Download Zubaan and reply like you meant it.
        </p>

        <div
          style={{
            display: 'flex',
            gap: 14,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <AppStoreBadge store="apple" />
          <AppStoreBadge store="google" />
        </div>

        <p
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 12,
            color: Z.dim,
            marginTop: 24,
          }}
        >
          Free to download · iOS & Android
        </p>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const links = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Delete account', href: '/delete-account' },
    { label: 'Support', href: '/contact' },
  ]

  return (
    <footer
      style={{
        borderTop: `1px solid ${Z.border}`,
        padding: '40px 24px',
        backgroundColor: Z.bg,
      }}
    >
      <div
        style={{
          maxWidth: 1120,
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <ZubaanMark size={28} animated={false} />
          <span
            style={{
              fontFamily: 'var(--font-fraunces)',
              fontStyle: 'italic',
              fontSize: 20,
              color: Z.gold,
            }}
          >
            Zubaan
          </span>
          <span
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 10,
              color: Z.dim,
              letterSpacing: 3,
              textTransform: 'uppercase',
              marginLeft: 4,
            }}
          >
            ज़ुबान · زبان
          </span>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {links.map(l => (
            <Link
              key={l.label}
              href={l.href}
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 13,
                color: Z.dim,
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => ((e.target as HTMLElement).style.color = Z.text)}
              onMouseLeave={e => ((e.target as HTMLElement).style.color = Z.dim)}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Copy */}
        <p
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 12,
            color: Z.dim,
          }}
        >
          © 2026 Zubaan. Reply in your voice.
        </p>
      </div>
    </footer>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <div style={{ backgroundColor: Z.bg, minHeight: '100vh' }}>
      <Nav />
      <Hero />
      <HowItWorks />
      <PhoneMockup />
      <Features />
      <Testimonials />
      <Pricing />
      <CtaSection />
      <Footer />
    </div>
  )
}
