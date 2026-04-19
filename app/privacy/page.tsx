import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — Zubaan',
  description: 'How Zubaan collects, uses, and protects your data.',
}

const Z = {
  bg: '#14102A',
  surface: '#221940',
  border: '#2A1F4A',
  text: '#F5F0EB',
  dim: '#8A84A8',
  gold: '#F4B942',
} as const

export default function PrivacyPage() {
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
          backgroundColor: Z.bg,
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
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 13,
            color: Z.dim,
            textDecoration: 'none',
          }}
        >
          ← Back to home
        </Link>
      </nav>

      {/* Content */}
      <main
        style={{
          maxWidth: 740,
          margin: '0 auto',
          padding: '64px 24px 100px',
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
            marginBottom: 16,
          }}
        >
          Legal
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-fraunces)',
            fontStyle: 'italic',
            fontSize: 'clamp(32px, 5vw, 52px)',
            color: Z.text,
            letterSpacing: '-1px',
            marginBottom: 8,
            lineHeight: 1.1,
          }}
        >
          Privacy Policy
        </h1>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: Z.dim, marginBottom: 48 }}>
          Last updated: April 19, 2026
        </p>

        <div
          style={{
            height: 1,
            backgroundColor: Z.border,
            marginBottom: 48,
          }}
        />

        <Section title="Overview">
          Zubaan (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to protecting your privacy. This
          policy explains what information we collect, how we use it, and your rights around
          that data. By using Zubaan, you agree to the practices described here.
        </Section>

        <Section title="Information We Collect">
          <BulletList
            items={[
              'Account data: email address and password (hashed) when you sign up.',
              'Chat screenshots: images you upload to generate replies. These are processed and then deleted — we do not store your screenshots.',
              'Generated replies: the reply text produced by the AI, saved to your session history if you are signed in.',
              'Usage data: reply count, subscription status, streak information.',
              'Device data: app version, OS, and crash logs for debugging purposes.',
            ]}
          />
        </Section>

        <Section title="How We Use Your Data">
          <BulletList
            items={[
              'To generate contextually relevant replies from your screenshots.',
              'To enforce free-tier limits and manage your Pro subscription.',
              'To save your session history so you can continue conversations.',
              'To improve the AI model quality using anonymised, aggregated signals — never your raw screenshots or personal messages.',
              'To send transactional emails (e.g., receipt, password reset) — no marketing without explicit consent.',
            ]}
          />
        </Section>

        <Section title="Screenshot Processing">
          Your screenshots are sent to our AI processing pipeline solely to generate reply
          suggestions. They are not stored on our servers after processing is complete, not
          used to train models without explicit opt-in, and never shared with third parties
          for advertising or profiling.
        </Section>

        <Section title="Third-Party Services">
          We use the following third parties to operate Zubaan:
          <BulletList
            items={[
              'Supabase — authentication and database (EU region).',
              'Google Gemini API — AI reply and voice generation.',
              'RevenueCat — subscription and billing management.',
              'Expo / EAS — mobile app build and delivery.',
            ]}
          />
          Each service operates under its own privacy policy. We share only the minimum data
          necessary for each service to function.
        </Section>

        <Section title="Data Retention">
          Account data is retained while your account is active. Session history is kept for
          30 days, after which it is automatically deleted. You may delete your account and
          all associated data at any time from the Settings screen or by emailing us.
        </Section>

        <Section title="Your Rights">
          Depending on your location, you may have rights under GDPR, CCPA, or other laws:
          <BulletList
            items={[
              'Access — request a copy of the data we hold about you.',
              'Correction — ask us to fix inaccurate data.',
              'Deletion — request your account and data be permanently deleted.',
              'Portability — receive your data in a machine-readable format.',
              'Objection — opt out of certain processing activities.',
            ]}
          />
          To exercise any of these rights, email us at{' '}
          <EmailLink email="apadhi6638@gmail.com" />.
        </Section>

        <Section title="Children">
          Zubaan is not directed to children under 13. We do not knowingly collect data from
          children. If you believe a child has provided us personal information, contact us
          and we will delete it promptly.
        </Section>

        <Section title="Changes to This Policy">
          We may update this policy as the product evolves. We will notify you of material
          changes via in-app notification or email. Continued use after changes constitutes
          acceptance.
        </Section>

        <Section title="Contact">
          Questions about this policy? Reach us at{' '}
          <EmailLink email="apadhi6638@gmail.com" />.
        </Section>
      </main>

      <Footer />
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h2
        style={{
          fontFamily: 'var(--font-inter)',
          fontWeight: 600,
          fontSize: 16,
          color: '#F5F0EB',
          marginBottom: 12,
        }}
      >
        {title}
      </h2>
      <div
        style={{
          fontFamily: 'var(--font-inter)',
          fontSize: 15,
          lineHeight: 1.75,
          color: '#8A84A8',
        }}
      >
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
          <span style={{ color: '#F4B942', flexShrink: 0, marginTop: 2 }}>·</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function EmailLink({ email }: { email: string }) {
  return (
    <a
      href={`mailto:${email}`}
      style={{ color: '#F4B942', textDecoration: 'none', fontWeight: 600 }}
    >
      {email}
    </a>
  )
}

function Footer() {
  return (
    <footer
      style={{
        borderTop: `1px solid #2A1F4A`,
        padding: '32px 24px',
        textAlign: 'center',
      }}
    >
      <p style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: '#8A84A8' }}>
        © 2026 Zubaan ·{' '}
        <Link href="/privacy" style={{ color: '#8A84A8', textDecoration: 'none' }}>Privacy</Link>
        {' · '}
        <Link href="/terms" style={{ color: '#8A84A8', textDecoration: 'none' }}>Terms</Link>
        {' · '}
        <Link href="/contact" style={{ color: '#8A84A8', textDecoration: 'none' }}>Contact</Link>
      </p>
    </footer>
  )
}
