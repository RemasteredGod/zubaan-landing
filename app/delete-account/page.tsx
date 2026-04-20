import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Delete Account and Data — Zubaan',
  description: 'Request deletion of your Zubaan account and associated personal data.',
}

const Z = {
  bg: '#14102A',
  surface: '#221940',
  border: '#2A1F4A',
  text: '#F5F0EB',
  dim: '#8A84A8',
  gold: '#F4B942',
} as const

const SUPPORT_EMAIL = 'zubaan.live@gmail.com'

export default function DeleteAccountPage() {
  return (
    <div style={{ backgroundColor: Z.bg, minHeight: '100vh', color: Z.text }}>
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
          style={{
            fontFamily: 'var(--font-fraunces)',
            fontStyle: 'italic',
            fontSize: 22,
            color: Z.gold,
            textDecoration: 'none',
          }}
        >
          Zubaan
        </Link>
        <Link href="/" style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: Z.dim, textDecoration: 'none' }}>
          ← Back to home
        </Link>
      </nav>

      <main style={{ maxWidth: 760, margin: '0 auto', padding: '64px 24px 100px' }}>
        <p style={{ fontFamily: 'var(--font-inter)', fontWeight: 600, fontSize: 10, letterSpacing: 4, color: Z.gold, textTransform: 'uppercase', marginBottom: 16 }}>
          Account and data deletion
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-fraunces)',
            fontStyle: 'italic',
            fontSize: 'clamp(32px, 5vw, 52px)',
            color: Z.text,
            letterSpacing: '-1px',
            lineHeight: 1.1,
            marginBottom: 10,
          }}
        >
          Delete your Zubaan account
        </h1>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: 14, color: Z.dim, marginBottom: 44 }}>
          Last updated: April 20, 2026
        </p>

        <Section title="How to request deletion">
          <ol style={{ marginTop: 8, paddingLeft: 18, lineHeight: 1.8 }}>
            <li>Email us at <EmailLink email={SUPPORT_EMAIL} /> from the account email you use in Zubaan.</li>
            <li>Use the subject line: <strong>Delete my Zubaan account</strong>.</li>
            <li>Include your account email and, if possible, your user ID.</li>
          </ol>
        </Section>

        <Section title="What gets deleted">
          <BulletList
            items={[
              'Your account profile and authentication mapping.',
              'Saved conversation history associated with your account.',
              'Subscription linkage metadata retained in our app database.',
            ]}
          />
        </Section>

        <Section title="What may be retained">
          <BulletList
            items={[
              'Billing records required for legal, tax, or fraud-prevention obligations.',
              'Minimal security logs retained for a limited period where legally required.',
            ]}
          />
        </Section>

        <Section title="Deletion timeline">
          Most verified deletion requests are completed within <strong>7 business days</strong>. In exceptional
          cases requiring legal verification, completion may take up to <strong>30 days</strong>.
        </Section>

        <Section title="Need help?">
          If you face issues with deletion, contact <EmailLink email={SUPPORT_EMAIL} /> and we will assist you.
        </Section>
      </main>

      <footer style={{ borderTop: `1px solid ${Z.border}`, padding: '32px 24px', textAlign: 'center' }}>
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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <h2 style={{ fontFamily: 'var(--font-inter)', fontWeight: 600, fontSize: 17, color: Z.text, marginBottom: 10 }}>
        {title}
      </h2>
      <div style={{ fontFamily: 'var(--font-inter)', fontSize: 15, lineHeight: 1.75, color: Z.dim }}>
        {children}
      </div>
    </div>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul style={{ marginTop: 12, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: 'flex', gap: 10 }}>
          <span style={{ color: Z.gold, flexShrink: 0, marginTop: 2 }}>·</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function EmailLink({ email }: { email: string }) {
  return (
    <a href={`mailto:${email}`} style={{ color: Z.gold, textDecoration: 'none', fontWeight: 600 }}>
      {email}
    </a>
  )
}
