'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { Metadata } from 'next'

const Z = {
  bg: '#14102A',
  surface: '#221940',
  border: '#2A1F4A',
  text: '#F5F0EB',
  dim: '#8A84A8',
  gold: '#F4B942',
  goldDeep: '#D89A25',
  coral: '#E07C6E',
} as const

const CONTACT_EMAIL = 'apadhi6638@gmail.com'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: 'General', message: '' })
  const [sent, setSent] = useState(false)

  const subjects = ['General', 'Bug Report', 'Feature Request', 'Billing & Pro', 'Privacy / Data', 'Other']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nSubject: ${form.subject}\n\n${form.message}`
    )
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`[Zubaan] ${form.subject}`)}&body=${body}`
    setSent(true)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: Z.surface,
    border: `1px solid ${Z.border}`,
    borderRadius: 10,
    padding: '12px 14px',
    fontFamily: 'var(--font-inter)',
    fontSize: 14,
    color: Z.text,
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  }

  return (
    <div style={{ backgroundColor: Z.bg, minHeight: '100vh', color: Z.text }}>
      {/* Nav */}
      <nav
        style={{
          borderBottom: `1px solid ${Z.border}`,
          padding: '0 24px',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Link
          href="/"
          style={{ fontFamily: 'var(--font-fraunces)', fontStyle: 'italic', fontSize: 22, color: Z.gold, textDecoration: 'none' }}
        >
          Zubaan
        </Link>
        <Link href="/" style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: Z.dim, textDecoration: 'none' }}>
          ← Back to home
        </Link>
      </nav>

      <main style={{ maxWidth: 960, margin: '0 auto', padding: '64px 24px 100px' }}>
        <p style={{ fontFamily: 'var(--font-inter)', fontWeight: 600, fontSize: 10, letterSpacing: 4, color: Z.gold, textTransform: 'uppercase', marginBottom: 16 }}>
          Get in touch
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-fraunces)',
            fontStyle: 'italic',
            fontSize: 'clamp(32px, 5vw, 52px)',
            color: Z.text,
            letterSpacing: '-1px',
            marginBottom: 16,
            lineHeight: 1.1,
          }}
        >
          Baat karo.
        </h1>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: 15, color: Z.dim, marginBottom: 56, maxWidth: 480, lineHeight: 1.6 }}>
          Bug mila? Feature chahiye? Bas bol do. We read every message.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 48,
            alignItems: 'start',
          }}
        >
          {/* Contact form */}
          <div>
            {sent ? (
              <div
                style={{
                  backgroundColor: Z.surface,
                  border: `1.5px solid rgba(244,185,66,0.4)`,
                  borderRadius: 14,
                  padding: 40,
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 40, marginBottom: 16 }}>✉️</div>
                <h2 style={{ fontFamily: 'var(--font-fraunces)', fontStyle: 'italic', fontSize: 26, color: Z.gold, marginBottom: 10 }}>
                  Mail client khul gaya!
                </h2>
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: 14, color: Z.dim, lineHeight: 1.6 }}>
                  Your default mail app should have opened with the message pre-filled.
                  If not, email us directly at{' '}
                  <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: Z.gold, fontWeight: 600 }}>{CONTACT_EMAIL}</a>.
                </p>
                <button
                  onClick={() => setSent(false)}
                  style={{
                    marginTop: 24,
                    fontFamily: 'var(--font-inter)',
                    fontWeight: 600,
                    fontSize: 13,
                    color: Z.dim,
                    background: 'none',
                    border: `1px solid ${Z.border}`,
                    borderRadius: 10,
                    padding: '8px 20px',
                    cursor: 'pointer',
                  }}
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* Name */}
                <div>
                  <label style={{ fontFamily: 'var(--font-inter)', fontWeight: 600, fontSize: 12, color: Z.dim, display: 'block', marginBottom: 6, letterSpacing: 0.5 }}>
                    Your name
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Rahul M."
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = 'rgba(244,185,66,0.5)')}
                    onBlur={e => (e.target.style.borderColor = Z.border)}
                  />
                </div>

                {/* Email */}
                <div>
                  <label style={{ fontFamily: 'var(--font-inter)', fontWeight: 600, fontSize: 12, color: Z.dim, display: 'block', marginBottom: 6, letterSpacing: 0.5 }}>
                    Your email
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = 'rgba(244,185,66,0.5)')}
                    onBlur={e => (e.target.style.borderColor = Z.border)}
                  />
                </div>

                {/* Subject */}
                <div>
                  <label style={{ fontFamily: 'var(--font-inter)', fontWeight: 600, fontSize: 12, color: Z.dim, display: 'block', marginBottom: 6, letterSpacing: 0.5 }}>
                    Subject
                  </label>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {subjects.map(s => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setForm(f => ({ ...f, subject: s }))}
                        style={{
                          fontFamily: 'var(--font-inter)',
                          fontWeight: 600,
                          fontSize: 12,
                          color: form.subject === s ? '#14102A' : Z.dim,
                          backgroundColor: form.subject === s ? Z.gold : Z.surface,
                          border: `1px solid ${form.subject === s ? Z.gold : Z.border}`,
                          borderRadius: 20,
                          padding: '5px 13px',
                          cursor: 'pointer',
                          transition: 'all 0.15s',
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label style={{ fontFamily: 'var(--font-inter)', fontWeight: 600, fontSize: 12, color: Z.dim, display: 'block', marginBottom: 6, letterSpacing: 0.5 }}>
                    Message
                  </label>
                  <textarea
                    required
                    rows={6}
                    placeholder="Bata kya scene hai..."
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.55 }}
                    onFocus={e => (e.target.style.borderColor = 'rgba(244,185,66,0.5)')}
                    onBlur={e => (e.target.style.borderColor = Z.border)}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    backgroundColor: Z.gold,
                    color: '#14102A',
                    fontFamily: 'var(--font-inter)',
                    fontWeight: 600,
                    fontSize: 14,
                    border: 'none',
                    borderRadius: 12,
                    padding: '14px 0',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    width: '100%',
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.backgroundColor = Z.goldDeep)}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.backgroundColor = Z.gold)}
                >
                  Send message →
                </button>

                <p style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: Z.dim, textAlign: 'center', lineHeight: 1.5 }}>
                  This opens your mail client with the message pre-filled.
                </p>
              </form>
            )}
          </div>

          {/* Right info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <InfoCard
              emoji="📧"
              title="Email"
              desc="The fastest way to reach us."
              action={<a href={`mailto:${CONTACT_EMAIL}`} style={{ fontFamily: 'var(--font-inter)', fontWeight: 600, fontSize: 14, color: Z.gold, textDecoration: 'none' }}>{CONTACT_EMAIL}</a>}
            />
            <InfoCard
              emoji="🐛"
              title="Bug Reports"
              desc="Found something broken? Include your device model, OS version, and steps to reproduce. Screenshots welcome."
              action={null}
            />
            <InfoCard
              emoji="💡"
              title="Feature Requests"
              desc="We ship fast. If enough people want something, it goes on the roadmap. Tell us what's missing."
              action={null}
            />
            <InfoCard
              emoji="💳"
              title="Billing Issues"
              desc="Subscription issues are handled through the App Store or Google Play. For anything else, email us directly."
              action={null}
            />
            <InfoCard
              emoji="⏱️"
              title="Response Time"
              desc="We typically reply within 24–48 hours on weekdays."
              action={null}
            />
          </div>
        </div>
      </main>

      <footer style={{ borderTop: '1px solid #2A1F4A', padding: '32px 24px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: Z.dim }}>
          © 2026 Zubaan ·{' '}
          <Link href="/privacy" style={{ color: Z.dim, textDecoration: 'none' }}>Privacy</Link>
          {' · '}
          <Link href="/terms" style={{ color: Z.dim, textDecoration: 'none' }}>Terms</Link>
          {' · '}
          <Link href="/contact" style={{ color: Z.dim, textDecoration: 'none' }}>Contact</Link>
        </p>
      </footer>
    </div>
  )
}

function InfoCard({
  emoji,
  title,
  desc,
  action,
}: {
  emoji: string
  title: string
  desc: string
  action: React.ReactNode
}) {
  return (
    <div
      style={{
        backgroundColor: '#221940',
        border: '1px solid #2A1F4A',
        borderRadius: 12,
        padding: '20px 20px',
        display: 'flex',
        gap: 14,
      }}
    >
      <span style={{ fontSize: 22, flexShrink: 0 }}>{emoji}</span>
      <div>
        <p style={{ fontFamily: 'var(--font-inter)', fontWeight: 600, fontSize: 14, color: '#F5F0EB', marginBottom: 4 }}>
          {title}
        </p>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: '#8A84A8', lineHeight: 1.55, marginBottom: action ? 10 : 0 }}>
          {desc}
        </p>
        {action}
      </div>
    </div>
  )
}
