'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

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
      <rect x="0" y="0" width="76" height="56" rx="12" fill="var(--accent-gold)" />
      <path d="M8 56 L2 74 L22 56 Z" fill="var(--accent-gold)" />
      {bars.map((b, i) => (
        <rect
          key={i}
          x={b.x}
          y={b.y}
          width="8"
          height={b.h}
          rx="4"
          fill="var(--bg-deep)"
          className={animated ? 'zbar' : ''}
          style={animated ? { animationDelay: b.delay } : {}}
        />
      ))}
    </svg>
  )
}

// ─── Founders Note ─────────────────────────────────────────────────────────────
function FoundersNote() {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] px-4 w-full max-w-md pointer-events-none">
      <div className="glass-panel border border-[var(--accent-gold-glow)] bg-[rgba(20,16,42,0.85)] rounded-2xl p-4 flex gap-4 items-start shadow-[0_8px_32px_rgba(0,0,0,0.4)] pointer-events-auto transition-transform hover:-translate-y-1">
        <div className="text-[20px] shrink-0">✨</div>
        <div className="flex-1 text-left">
          <p className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-[var(--accent-gold)] uppercase tracking-widest mb-1">
            Beta Preview
          </p>
          <p className="font-[family-name:var(--font-inter)] text-[13px] leading-relaxed text-[var(--text-main)]">
            Zubaan is currently an incomplete work in progress. This site showcases our vision for the future of authentic AI communication.
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Nav ─────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-nav' : 'bg-transparent border-transparent'}`}
      style={{ borderBottomWidth: scrolled ? '1px' : '0px' }}
    >
      <div className="max-w-[1120px] mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ZubaanMark size={32} animated={false} />
          <span className="font-[family-name:var(--font-fraunces)] italic text-2xl text-[var(--accent-gold)] tracking-[-0.5px]">
            Zubaan
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#features" className="font-[family-name:var(--font-inter)] font-medium text-[13px] text-[var(--text-dim)] no-underline hidden md:block hover:text-[var(--text-main)] transition-colors">
            Features
          </a>
          <a href="#testimonials" className="font-[family-name:var(--font-inter)] font-medium text-[13px] text-[var(--text-dim)] no-underline hidden md:block hover:text-[var(--text-main)] transition-colors">
            Reviews
          </a>
          <a href="#pricing" className="font-[family-name:var(--font-inter)] font-medium text-[13px] text-[var(--text-dim)] no-underline hidden sm:block hover:text-[var(--text-main)] transition-colors">
            Pricing
          </a>
          <a href="#download" className="font-[family-name:var(--font-inter)] font-semibold text-[13px] text-[var(--bg-deep)] bg-[var(--accent-gold)] flex items-center justify-center min-h-[44px] rounded-full px-6 py-2 no-underline transition-transform hover:scale-105 active:scale-95">
            Download
          </a>
        </div>
      </div>
    </nav>
  )
}

// ─── Sticky Story Sequence (App Flow) ────────────────────────────────────────
function AppFlowStory() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] })

  // ── Background & Phone Scale ──
  const glowColor = useTransform(scrollYProgress, 
    [0, 0.2, 0.4, 0.6, 0.8, 1], 
    ['rgba(244,185,66,0.15)', 'rgba(255,107,107,0.15)', 'rgba(152,193,164,0.15)', 'rgba(244,185,66,0.15)', 'rgba(152,193,164,0.15)', 'rgba(244,185,66,0.15)']
  )
  const phoneScale = useTransform(scrollYProgress, [0, 0.05], [0.8, 1])
  
  // ── Text Overlays (Outside Phone) ──
  const text1Op = useTransform(scrollYProgress, [0, 0.05, 0.15, 0.2], [0, 1, 1, 0])
  const text2Op = useTransform(scrollYProgress, [0.2, 0.25, 0.35, 0.4], [0, 1, 1, 0])
  const text3Op = useTransform(scrollYProgress, [0.4, 0.45, 0.55, 0.6], [0, 1, 1, 0])
  const text4Op = useTransform(scrollYProgress, [0.6, 0.65, 0.8, 0.85], [0, 1, 1, 0])
  const text5Op = useTransform(scrollYProgress, [0.85, 0.9, 1], [0, 1, 1])

  // ── Phone Internal Phases ──
  const splashOp = useTransform(scrollYProgress, [0, 0.08, 0.1], [1, 1, 0])
  const setupOp = useTransform(scrollYProgress, [0.1, 0.12, 0.18, 0.2], [0, 1, 1, 0])
  
  const homeOp = useTransform(scrollYProgress, [0.2, 0.22, 0.38, 0.4], [0, 1, 1, 0])
  const screenshotY = useTransform(scrollYProgress, [0.25, 0.3], [200, 0])
  const screenshotOp = useTransform(scrollYProgress, [0.25, 0.3, 0.38, 0.4], [0, 1, 1, 0])

  const processingOp = useTransform(scrollYProgress, [0.4, 0.42, 0.48, 0.5], [0, 1, 1, 0])
  const spinnerRot = useTransform(scrollYProgress, [0.4, 0.5], [0, 360])

  const repliesOp = useTransform(scrollYProgress, [0.5, 0.52, 0.78, 0.8], [0, 1, 1, 0])
  const replyFlirtyOp = useTransform(scrollYProgress, [0.5, 0.55, 0.6], [0, 1, 0])
  const replySavageOp = useTransform(scrollYProgress, [0.6, 0.65, 0.7], [0, 1, 0])
  const replyChillOp = useTransform(scrollYProgress, [0.7, 0.75, 0.8], [0, 1, 1]) 

  const coachingOp = useTransform(scrollYProgress, [0.8, 0.82, 1], [0, 1, 1])
  const recordOp = useTransform(scrollYProgress, [0.85, 0.9], [0, 1])
  const scoreOp = useTransform(scrollYProgress, [0.9, 0.95], [0, 1])

  return (
    <div ref={containerRef} className="relative w-full h-[500vh] bg-[var(--bg-deep)]">
      <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden pt-16">
        
        <motion.div 
          className="absolute inset-0 pointer-events-none blur-[80px] rounded-full scale-150 transition-colors duration-300"
          style={{ background: glowColor, opacity: 0.5 }}
        />

        <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center z-10">
          <motion.h2 style={{ opacity: text1Op }} className="absolute text-center px-4 font-[family-name:var(--font-fraunces)] italic text-[clamp(2.5rem,6vw,5rem)] text-[var(--text-main)] max-w-4xl tracking-tight leading-tight -translate-y-[40vh] md:translate-y-0 md:-translate-x-[35vw]">
            Pick your <br/><span className="text-[var(--accent-gold)]">Zubaan.</span>
          </motion.h2>
          <motion.h2 style={{ opacity: text2Op }} className="absolute text-center px-4 font-[family-name:var(--font-fraunces)] italic text-[clamp(2rem,5vw,4rem)] text-[var(--text-main)] max-w-lg tracking-tight leading-tight -translate-y-[40vh] md:translate-y-0 md:translate-x-[35vw]">
            Drop any <br/>screenshot.
          </motion.h2>
          <motion.h2 style={{ opacity: text3Op }} className="absolute text-center px-4 font-[family-name:var(--font-fraunces)] italic text-[clamp(2rem,5vw,4rem)] text-[var(--text-main)] max-w-lg tracking-tight leading-tight -translate-y-[40vh] md:translate-y-0 md:-translate-x-[35vw]">
            AI reads the <br/><span className="text-[var(--accent-coral)]">Vibe.</span>
          </motion.h2>
          <motion.h2 style={{ opacity: text4Op }} className="absolute text-center px-4 font-[family-name:var(--font-fraunces)] italic text-[clamp(2.5rem,6vw,4.5rem)] text-[var(--text-main)] max-w-lg tracking-tight leading-tight -translate-y-[40vh] md:translate-y-0 md:translate-x-[35vw]">
            Three replies, <br/>your voice.
          </motion.h2>
          <motion.h2 style={{ opacity: text5Op }} className="absolute text-center px-4 font-[family-name:var(--font-fraunces)] italic text-[clamp(2rem,5vw,4rem)] text-[var(--text-main)] max-w-lg tracking-tight leading-tight -translate-y-[40vh] md:translate-y-0 md:-translate-x-[35vw]">
            Nail the <br/><span className="text-[var(--accent-sage)]">Delivery.</span>
          </motion.h2>
        </div>

        <motion.div 
          className="relative z-20 w-full max-w-[320px] aspect-[1/2.15] bg-[var(--bg-deep)] rounded-[48px] border-4 border-white/10 shadow-[0_32px_100px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(255,255,255,0.05)] overflow-hidden flex flex-col items-center"
          style={{ scale: phoneScale }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-3xl z-50 flex items-center justify-center gap-2 px-2 border-b border-white/5">
             <div className="w-2 h-2 rounded-full bg-white/20"></div>
          </div>

          <motion.div style={{ opacity: splashOp }} className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--bg-surface)]">
            <ZubaanMark size={80} animated={false} />
            <p className="mt-6 font-[family-name:var(--font-fraunces)] italic text-2xl text-[var(--accent-gold)]">Zubaan</p>
          </motion.div>

          <motion.div style={{ opacity: setupOp }} className="absolute inset-0 flex flex-col p-6 pt-20 bg-[var(--bg-surface)]">
            <p className="font-[family-name:var(--font-inter)] text-xs text-[var(--text-dim)] uppercase tracking-widest mb-2">Setup</p>
            <h3 className="font-[family-name:var(--font-fraunces)] italic text-3xl mb-8">Your Persona</h3>
            <div className="space-y-3">
              {['Delhi Flirt', 'Bombay Chill', 'South Soft'].map((p, i) => (
                <div key={p} className={`p-4 rounded-2xl border ${i===0 ? 'border-[var(--accent-gold)] bg-[rgba(244,185,66,0.1)]' : 'border-white/10 bg-white/5'}`}>
                  <p className="font-[family-name:var(--font-inter)] font-semibold text-sm">{p}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div style={{ opacity: homeOp }} className="absolute inset-0 flex flex-col p-6 pt-20 bg-[var(--bg-deep)]">
            <h3 className="font-[family-name:var(--font-fraunces)] italic text-2xl mb-8">Drop Chat</h3>
            <div className="flex-1 rounded-2xl border-2 border-dashed border-white/20 flex items-center justify-center bg-white/5 relative overflow-hidden">
               <span className="text-4xl opacity-50">+</span>
               <motion.div style={{ y: screenshotY, opacity: screenshotOp }} className="absolute inset-4 rounded-xl bg-[var(--bg-surface)] p-3 border border-white/10 flex flex-col gap-2">
                 <div className="w-1/2 h-6 bg-white/10 rounded-md self-end"></div>
                 <div className="w-3/4 h-8 bg-[var(--accent-coral)]/20 rounded-md rounded-tl-sm self-start"></div>
                 <div className="w-2/3 h-10 bg-[var(--accent-coral)]/20 rounded-md rounded-tl-sm self-start"></div>
               </motion.div>
            </div>
            <p className="font-[family-name:var(--font-inter)] text-center text-xs text-[var(--text-dim)] mt-6">Share direct from WhatsApp</p>
          </motion.div>

          <motion.div style={{ opacity: processingOp }} className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md">
            <motion.div style={{ rotate: spinnerRot }} className="w-16 h-16 rounded-full border-4 border-white/10 border-t-[var(--accent-gold)] mb-6"></motion.div>
            <h3 className="font-[family-name:var(--font-fraunces)] italic text-xl text-[var(--accent-gold)]">Reading the vibe...</h3>
            <p className="font-[family-name:var(--font-inter)] text-xs text-[var(--text-dim)] mt-2">Detecting context & tone</p>
          </motion.div>

          <motion.div style={{ opacity: repliesOp }} className="absolute inset-0 flex flex-col bg-[var(--bg-surface)]">
            <div className="px-5 py-4 pt-12 border-b border-white/10 flex items-center justify-between">
              <ZubaanMark size={20} animated={false} />
              <div className="flex gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-coral)]"></span>
                <span className="w-2 h-2 rounded-full bg-[var(--accent-gold)]"></span>
                <span className="w-2 h-2 rounded-full bg-[var(--accent-sage)]"></span>
              </div>
            </div>
            <div className="flex-1 relative p-5">
              <motion.div style={{ opacity: replyFlirtyOp }} className="absolute inset-x-5 top-5 flex flex-col gap-4">
                 <div className="bg-white/5 rounded-2xl rounded-tr-sm p-4 self-end w-[85%] border border-[var(--accent-coral)]/30">
                   <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-[var(--accent-coral)] mb-1 uppercase tracking-widest">Flirty</p>
                   <p className="font-[family-name:var(--font-inter)] text-[13px]">Acha? Toh kya plan hai tera aaj ke baad? 👀</p>
                 </div>
              </motion.div>
              <motion.div style={{ opacity: replySavageOp }} className="absolute inset-x-5 top-5 flex flex-col gap-4">
                 <div className="bg-white/5 rounded-2xl rounded-tr-sm p-4 self-end w-[85%] border border-[var(--accent-gold)]/30">
                   <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-[var(--accent-gold)] mb-1 uppercase tracking-widest">Savage</p>
                   <p className="font-[family-name:var(--font-inter)] text-[13px]">Oh so NOW you reply? Typical lol.</p>
                 </div>
              </motion.div>
              <motion.div style={{ opacity: replyChillOp }} className="absolute inset-x-5 top-5 flex flex-col gap-4">
                 <div className="bg-white/5 rounded-2xl rounded-tr-sm p-4 self-end w-[85%] border border-[var(--accent-sage)]/30">
                   <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-[var(--accent-sage)] mb-1 uppercase tracking-widest">Chill</p>
                   <p className="font-[family-name:var(--font-inter)] text-[13px]">Haha nice — same, I was literally thinking that.</p>
                 </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div style={{ opacity: coachingOp }} className="absolute inset-0 flex flex-col p-6 pt-20 bg-[var(--bg-deep)]">
            <h3 className="font-[family-name:var(--font-fraunces)] italic text-2xl mb-6">Polish Delivery</h3>
            <div className="glass-panel p-4 rounded-xl border border-[var(--accent-sage)]/30 mb-6 bg-[rgba(152,193,164,0.05)]">
              <p className="font-[family-name:var(--font-inter)] text-xs text-[var(--accent-sage)] mb-1">Target Reply</p>
              <p className="font-[family-name:var(--font-inter)] text-[13px]">"Haha nice — same..."</p>
            </div>
            <motion.div style={{ opacity: recordOp }} className="flex-1 flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-[var(--accent-coral)]/20 border border-[var(--accent-coral)] flex items-center justify-center">
                 <div className="w-6 h-6 rounded-sm bg-[var(--accent-coral)]"></div>
              </div>
              <p className="mt-4 font-[family-name:var(--font-inter)] text-xs text-[var(--text-dim)]">Recording your voice...</p>
            </motion.div>
            <motion.div style={{ opacity: scoreOp }} className="absolute inset-0 bg-[var(--bg-deep)] p-6 pt-20 flex flex-col">
              <h3 className="font-[family-name:var(--font-fraunces)] italic text-2xl mb-8">AI Feedback</h3>
              <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded-xl border-l-4 border-[var(--accent-gold)]">
                  <p className="font-[family-name:var(--font-inter)] text-[10px] uppercase text-[var(--text-dim)]">Pace</p>
                  <p className="font-[family-name:var(--font-inter)] font-semibold text-[14px]">Slightly too fast. Slow down.</p>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border-l-4 border-[var(--accent-sage)]">
                  <p className="font-[family-name:var(--font-inter)] text-[10px] uppercase text-[var(--text-dim)]">Pitch</p>
                  <p className="font-[family-name:var(--font-inter)] font-semibold text-[14px]">Perfectly chill.</p>
                </div>
              </div>
              <button className="mt-auto w-full py-3 bg-[var(--accent-gold)] text-[var(--bg-deep)] font-[family-name:var(--font-inter)] font-bold rounded-full">Share Voice Note</button>
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  )
}

// ─── Features ─────────────────────────────────────────────────────────────────
function Features() {
  const features = [
    { title: "Tone-Aware Replies", desc: "Zubaan detects the emotional energy of every message — flirty, passive-aggressive, casual, or serious — and matches it.", emoji: "🎯" },
    { title: "Voice Note Generator", desc: "Convert any reply into a natural-sounding voice note. Your words, your vibe, delivered in audio. Pro feature.", emoji: "🎙️" },
    { title: "Multi-Round Conversations", desc: "Keep going. Upload their reply, get three more options. Zubaan remembers the full thread context.", emoji: "🔄" },
    { title: "Tune & Adjust", desc: "Too spicy? Not spicy enough? Hit 'Tune' and tell Zubaan what to tweak. More savage. More sweet. More you.", emoji: "🎛️" },
    { title: "Works Everywhere", desc: "WhatsApp, Instagram, Bumble, Hinge, Telegram — if you can screenshot it, Zubaan can read it.", emoji: "📱" },
    { title: "Hinglish Native", desc: "Built for the way South Asians actually text. Hindi, English, Hinglish, and Romanised Urdu all work.", emoji: "🇮🇳" }
  ]

  return (
    <section id="features" className="py-32 px-6 max-w-[1120px] mx-auto">
      <div className="text-center mb-16">
        <p className="font-[family-name:var(--font-inter)] font-semibold text-[10px] tracking-[4px] text-[var(--accent-coral)] uppercase mb-4">Features</p>
        <h2 className="font-[family-name:var(--font-fraunces)] italic text-[clamp(2.5rem,5vw,4rem)] text-[var(--text-main)] leading-[1.1] tracking-[-1px]">
          Everything your texts were missing.
        </h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div key={i} className="glass-panel p-8 rounded-3xl hover:border-[var(--accent-coral)] transition-colors group">
            <div className="text-3xl mb-6 group-hover:scale-110 transition-transform origin-left">{f.emoji}</div>
            <h3 className="font-[family-name:var(--font-inter)] font-bold text-[18px] text-[var(--text-main)] mb-3">{f.title}</h3>
            <p className="font-[family-name:var(--font-inter)] text-sm text-[var(--text-dim)] leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function Testimonials() {
  const reviews = [
    { text: "Mujhe nahi pata tha main itna witty ho sakta tha tbh. This app is dangerous.", name: "Rahul M.", context: "Delhi · Bumble user" },
    { text: "Finally something that sounds like ME and not some formal AI robot. The flirty mode is 💀", name: "Priya S.", context: "Mumbai · Instagram" },
    { text: "Bhai voice note feature is actually insane. Sent it directly, she thought I was being so smooth.", name: "Arjun K.", context: "Bangalore · WhatsApp" }
  ]

  return (
    <section id="testimonials" className="py-32 px-6 bg-black/20 border-y border-[var(--border-glass)]">
      <div className="max-w-[1120px] mx-auto">
        <div className="text-center mb-16">
          <p className="font-[family-name:var(--font-inter)] font-semibold text-[10px] tracking-[4px] text-[var(--accent-sage)] uppercase mb-4">Word on the street</p>
          <h2 className="font-[family-name:var(--font-fraunces)] italic text-[clamp(2.5rem,5vw,4rem)] text-[var(--text-main)] leading-[1.1] tracking-[-1px]">
            Log kya bol rahe hain.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div key={i} className="glass-panel p-8 rounded-3xl flex flex-col relative overflow-hidden">
              <div className="text-4xl text-[var(--accent-sage)] opacity-20 font-[family-name:var(--font-fraunces)] absolute top-6 right-6">"</div>
              <p className="font-[family-name:var(--font-inter)] text-[15px] leading-relaxed text-[var(--text-main)] italic mb-8 flex-1">"{r.text}"</p>
              <div>
                <p className="font-[family-name:var(--font-inter)] font-bold text-[14px] text-[var(--text-main)]">{r.name}</p>
                <p className="font-[family-name:var(--font-inter)] text-[12px] text-[var(--text-dim)] mt-1">{r.context}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Pricing ──────────────────────────────────────────────────────────────────
function Pricing() {
  return (
    <section id="pricing" className="py-32 px-6 max-w-[1120px] mx-auto">
      <div className="text-center mb-16">
        <p className="font-[family-name:var(--font-inter)] font-semibold text-[10px] tracking-[4px] text-[var(--accent-gold)] uppercase mb-4">Pricing</p>
        <h2 className="font-[family-name:var(--font-fraunces)] italic text-[clamp(2.5rem,5vw,4rem)] text-[var(--text-main)] leading-[1.1] tracking-[-1px] mb-4">
          Simple. No subscription games.
        </h2>
        <p className="font-[family-name:var(--font-inter)] text-[var(--text-dim)]">Start free. Upgrade when you are ready.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-8 max-w-[800px] mx-auto">
        <div className="glass-panel p-8 rounded-3xl flex flex-col">
          <h3 className="font-[family-name:var(--font-inter)] font-bold text-xl text-[var(--text-main)] mb-2">Free</h3>
          <p className="font-[family-name:var(--font-inter)] text-[var(--text-dim)] mb-6 text-sm">Per month. Always free.</p>
          <div className="text-4xl font-[family-name:var(--font-fraunces)] italic text-[var(--text-main)] mb-8">₹0</div>
          <ul className="flex flex-col gap-4 font-[family-name:var(--font-inter)] text-sm text-[var(--text-dim)] mb-10 flex-1">
            <li className="flex items-center gap-3"><span className="text-[var(--accent-sage)]">✓</span> 2 reply sets per day</li>
            <li className="flex items-center gap-3"><span className="text-[var(--accent-sage)]">✓</span> Basic tone detection</li>
            <li className="flex items-center gap-3"><span className="text-[var(--accent-sage)]">✓</span> All chat apps supported</li>
            <li className="flex items-center gap-3"><span className="text-[var(--accent-sage)]">✓</span> Copy to clipboard</li>
          </ul>
        </div>
        
        <div className="glass-panel p-8 rounded-3xl flex flex-col border-[var(--accent-gold)] relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--accent-gold)]" />
          <h3 className="font-[family-name:var(--font-inter)] font-bold text-xl text-[var(--text-main)] mb-2">Zubaan Pro</h3>
          <p className="font-[family-name:var(--font-inter)] text-[var(--text-dim)] mb-6 text-sm">Billed monthly. Cancel anytime.</p>
          <div className="text-4xl font-[family-name:var(--font-fraunces)] italic text-[var(--accent-gold)] mb-8">₹299<span className="text-sm text-[var(--text-dim)] not-italic font-[family-name:var(--font-inter)] font-normal">/mo</span></div>
          <ul className="flex flex-col gap-4 font-[family-name:var(--font-inter)] text-sm text-[var(--text-dim)] mb-10 flex-1">
            <li className="flex items-center gap-3"><span className="text-[var(--accent-gold)]">✓</span> Unlimited reply sets</li>
            <li className="flex items-center gap-3"><span className="text-[var(--accent-gold)]">✓</span> Advanced tone tuning</li>
            <li className="flex items-center gap-3"><span className="text-[var(--accent-gold)]">✓</span> Voice note generation</li>
            <li className="flex items-center gap-3"><span className="text-[var(--accent-gold)]">✓</span> Multi-round conversations</li>
            <li className="flex items-center gap-3"><span className="text-[var(--accent-gold)]">✓</span> Priority AI processing</li>
          </ul>
          <button className="w-full font-[family-name:var(--font-inter)] font-semibold text-[13px] text-[var(--bg-deep)] bg-[var(--accent-gold)] rounded-full py-3 hover:scale-105 transition-transform shadow-[0_0_20px_rgba(244,185,66,0.4)]">Go Pro</button>
        </div>
      </div>
    </section>
  )
}

// ─── CTA Footer ─────────────────────────────────────────────────────────────
function FooterCTA() {
  return (
    <footer id="download" className="relative py-32 px-6 flex flex-col items-center justify-center text-center overflow-hidden border-t border-[var(--border-glass)] bg-[var(--bg-surface)]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--accent-gold-glow),transparent_60%)] pointer-events-none" />
      <div className="relative z-10 w-full max-w-[1120px] mx-auto">
        <div className="flex flex-col items-center">
          <ZubaanMark size={48} animated />
          <h2 className="font-[family-name:var(--font-fraunces)] italic text-[clamp(2.5rem,5vw,4rem)] text-[var(--text-main)] mt-8 mb-4 tracking-[-1px]">
            Kya scene hai?
          </h2>
          <p className="font-[family-name:var(--font-inter)] text-base text-[var(--text-dim)] max-w-[400px] mx-auto mb-10">
            Stop leaving chats on read because you don't know what to say. Download Zubaan and reply like you meant it.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-20">
            <a href="#" className="glass-panel flex items-center gap-3 rounded-xl px-5 py-3 hover:border-[var(--accent-gold-glow)] transition-colors">
              <p className="font-[family-name:var(--font-inter)] font-semibold text-[15px]">Download on App Store</p>
            </a>
            <a href="#" className="glass-panel flex items-center gap-3 rounded-xl px-5 py-3 hover:border-[var(--accent-gold-glow)] transition-colors">
              <p className="font-[family-name:var(--font-inter)] font-semibold text-[15px]">Get it on Google Play</p>
            </a>
          </div>
        </div>
        
        {/* Footer Links */}
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-white/10 pt-8 mt-8">
          <p className="font-[family-name:var(--font-inter)] text-[12px] text-[var(--text-dim)] mb-4 md:mb-0">
            © 2026 Zubaan. Reply in your voice.
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            <a href="/privacy" className="font-[family-name:var(--font-inter)] text-[12px] text-[var(--text-dim)] hover:text-[var(--text-main)] transition-colors">Privacy Policy</a>
            <a href="/terms" className="font-[family-name:var(--font-inter)] text-[12px] text-[var(--text-dim)] hover:text-[var(--text-main)] transition-colors">Terms of Service</a>
            <a href="/contact" className="font-[family-name:var(--font-inter)] text-[12px] text-[var(--text-dim)] hover:text-[var(--text-main)] transition-colors">Support</a>
            <a href="/delete-account" className="font-[family-name:var(--font-inter)] text-[12px] text-[var(--text-dim)] hover:text-[var(--accent-coral)] transition-colors">Delete account</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function LandingPage() {
  return (
    <main className="selection:bg-[var(--accent-gold)] selection:text-[var(--bg-deep)] overflow-clip relative bg-[var(--bg-deep)]">
      <FoundersNote />
      <Nav />
      <AppFlowStory />
      <Features />
      <Testimonials />
      <Pricing />
      <FooterCTA />
    </main>
  )
}
