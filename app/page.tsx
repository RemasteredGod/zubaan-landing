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
    <div className="fixed top-0 left-0 right-0 z-[200] pointer-events-none">
      <div className="flex items-center justify-center gap-2 py-2 px-4 bg-[rgba(244,185,66,0.12)] border-b border-[var(--accent-gold-glow)] backdrop-blur-md pointer-events-auto">
        <span className="text-[14px]">✨</span>
        <p className="font-[family-name:var(--font-inter)] text-[12px] text-[var(--text-main)]">
          <span className="font-bold text-[var(--accent-gold)] mr-2">Beta Preview</span>
          Zubaan is in active development — this showcases our vision.
        </p>
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
      className={`fixed top-8 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-nav' : 'bg-transparent border-transparent'}`}
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
          <a href="#waitlist" className="font-[family-name:var(--font-inter)] font-semibold text-[13px] text-[var(--bg-deep)] bg-[var(--accent-gold)] flex items-center justify-center min-h-[44px] rounded-full px-6 py-2 no-underline transition-transform hover:scale-105 active:scale-95">
            Join Waitlist
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
    [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1], 
    ['rgba(244,185,66,0.15)', 'rgba(255,107,107,0.15)', 'rgba(152,193,164,0.15)', 'rgba(244,185,66,0.15)', 'rgba(152,193,164,0.15)', 'rgba(255,107,107,0.15)', 'rgba(244,185,66,0.15)', 'rgba(152,193,164,0.15)']
  )
  
  const phoneScale = useTransform(scrollYProgress, [0, 0.05], [0.82, 1])
  
  // ── Text Overlays (Outside Phone) ──
  const text1Op = useTransform(scrollYProgress, [0, 0.05, 0.1, 0.12], [0, 1, 1, 0])
  const text2Op = useTransform(scrollYProgress, [0.12, 0.16, 0.22, 0.26], [0, 1, 1, 0])
  const text3Op = useTransform(scrollYProgress, [0.26, 0.3, 0.36, 0.4], [0, 1, 1, 0])
  const text4Op = useTransform(scrollYProgress, [0.4, 0.44, 0.52, 0.56], [0, 1, 1, 0])
  const text5Op = useTransform(scrollYProgress, [0.56, 0.6, 0.68, 0.72], [0, 1, 1, 0])
  const text6Op = useTransform(scrollYProgress, [0.72, 0.76, 0.84, 0.88], [0, 1, 1, 0])
  const text7Op = useTransform(scrollYProgress, [0.88, 0.92, 1], [0, 1, 1])

  // ── Phone Internal Phases ──
  const splashOp = useTransform(scrollYProgress, [0, 0.05, 0.08], [1, 1, 0])
  const setupOp = useTransform(scrollYProgress, [0.08, 0.1, 0.12, 0.14], [0, 1, 1, 0])
  
  const homeOp = useTransform(scrollYProgress, [0.14, 0.16, 0.24, 0.26], [0, 1, 1, 0])
  const screenshotY = useTransform(scrollYProgress, [0.16, 0.2], [200, 0])
  const screenshotOp = useTransform(scrollYProgress, [0.16, 0.2, 0.24, 0.26], [0, 1, 1, 0])

  const processingOp = useTransform(scrollYProgress, [0.26, 0.28, 0.36, 0.4], [0, 1, 1, 0])
  const spinnerRot = useTransform(scrollYProgress, [0.26, 0.4], [0, 720])

  const repliesOp = useTransform(scrollYProgress, [0.4, 0.42, 0.52, 0.56], [0, 1, 1, 0])
  const replyFlirtyOp = useTransform(scrollYProgress, [0.42, 0.44, 0.56], [0, 1, 0])
  const replySavageOp = useTransform(scrollYProgress, [0.45, 0.47, 0.56], [0, 1, 0])
  const replyChillOp = useTransform(scrollYProgress, [0.48, 0.5, 0.56], [0, 1, 1]) 

  const tuneOp = useTransform(scrollYProgress, [0.56, 0.58, 0.68, 0.72], [0, 1, 1, 0])
  const sliderX = useTransform(scrollYProgress, [0.6, 0.65], [0, 80])

  const coachingOp = useTransform(scrollYProgress, [0.72, 0.74, 0.84, 0.88], [0, 1, 1, 0])
  const recordOp = useTransform(scrollYProgress, [0.75, 0.78], [0, 1])
  const scoreOp = useTransform(scrollYProgress, [0.79, 0.82], [0, 1])

  const shareOp = useTransform(scrollYProgress, [0.88, 0.9, 1], [0, 1, 1])
  const voiceNoteY = useTransform(scrollYProgress, [0.92, 0.96], [50, 0])
  const voiceNoteOp = useTransform(scrollYProgress, [0.92, 0.96], [0, 1])

  const textBase = "absolute z-30 font-[family-name:var(--font-fraunces)] italic tracking-tight leading-tight "
  const textMobile = "bottom-[12vh] left-1/2 -translate-x-1/2 w-[88%] text-[1.6rem] text-center bg-[rgba(10,8,25,0.82)] backdrop-blur-lg border border-white/10 px-5 py-4 rounded-2xl shadow-2xl "
  const textDesktop = "md:bottom-auto md:left-auto md:translate-x-0 md:w-auto md:text-[clamp(2.2rem,4vw,4rem)] md:text-left md:bg-transparent md:backdrop-blur-none md:border-none md:px-0 md:py-0 md:rounded-none md:shadow-none md:z-10 "
  const textClassesBoth = textBase + textMobile + textDesktop

  const springTransition = { type: "spring" as const, stiffness: 400, damping: 30 }

  return (
    <div ref={containerRef} className="relative w-full h-[600vh] bg-[var(--bg-deep)]">
      <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden pt-24">
        
        <motion.div 
          className="absolute inset-0 pointer-events-none blur-[80px] rounded-full scale-150 transition-colors duration-300"
          style={{ background: glowColor, opacity: 0.5 }}
        />

        <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center z-10">
          <motion.h2 style={{ opacity: text1Op }} className={`${textClassesBoth} md:-translate-x-[35vw]`}>
            Pick your <br/><span className="text-[var(--accent-gold)]">Zubaan.</span>
          </motion.h2>
          <motion.h2 style={{ opacity: text2Op }} className={`${textClassesBoth} md:translate-x-[35vw]`}>
            Drop any <br/>screenshot.
          </motion.h2>
          <motion.h2 style={{ opacity: text3Op }} className={`${textClassesBoth} md:-translate-x-[35vw]`}>
            AI reads the <br/><span className="text-[var(--accent-coral)]">Vibe.</span>
          </motion.h2>
          <motion.h2 style={{ opacity: text4Op }} className={`${textClassesBoth} md:translate-x-[35vw]`}>
            Three replies, <br/>your voice.
          </motion.h2>
          <motion.h2 style={{ opacity: text5Op }} className={`${textClassesBoth} md:-translate-x-[35vw]`}>
            Too spicy? <br/><span className="text-[var(--accent-gold)]">Tune it.</span>
          </motion.h2>
          <motion.h2 style={{ opacity: text6Op }} className={`${textClassesBoth} md:translate-x-[35vw]`}>
            Nail the <br/><span className="text-[var(--accent-sage)]">Delivery.</span>
          </motion.h2>
          <motion.h2 style={{ opacity: text7Op }} className={`${textClassesBoth} md:-translate-x-[35vw]`}>
            Send the <br/><span className="text-[#25D366]">Voice Note.</span>
          </motion.h2>
        </div>

        <motion.div 
          className="relative z-20 w-[min(320px,72vw)] aspect-[1/2.15] bg-[var(--bg-deep)] rounded-[48px] border-4 border-white/10 shadow-[0_32px_100px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(255,255,255,0.05)] overflow-hidden flex flex-col items-center"
          style={{ scale: phoneScale }}
          transition={springTransition}
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
               <motion.div style={{ y: screenshotY, opacity: screenshotOp }} transition={springTransition} className="absolute inset-4 rounded-xl bg-[var(--bg-surface)] p-3 border border-white/10 flex flex-col gap-2">
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
            <div className="flex-1 flex flex-col gap-3 p-4 pt-5 overflow-hidden">
              <motion.div style={{ opacity: replyFlirtyOp }} className="bg-white/5 rounded-2xl rounded-tr-sm p-4 self-end w-[88%] border border-[var(--accent-coral)]/30 shadow-lg shrink-0">
                <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-[var(--accent-coral)] mb-1 uppercase tracking-widest">Flirty</p>
                <p className="font-[family-name:var(--font-inter)] text-[13px]">Acha? Toh kya plan hai tera aaj ke baad? 👀</p>
              </motion.div>
              <motion.div style={{ opacity: replySavageOp }} className="bg-[var(--bg-deep)] rounded-2xl rounded-tr-sm p-4 self-end w-[88%] border border-[var(--accent-gold)] shadow-lg shrink-0">
                <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-[var(--accent-gold)] mb-1 uppercase tracking-widest">Savage</p>
                <p className="font-[family-name:var(--font-inter)] text-[13px]">Oh so NOW you reply? Typical lol.</p>
              </motion.div>
              <motion.div style={{ opacity: replyChillOp }} className="bg-white/5 rounded-2xl rounded-tr-sm p-4 self-end w-[88%] border border-[var(--accent-sage)]/30 shadow-lg shrink-0">
                <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-[var(--accent-sage)] mb-1 uppercase tracking-widest">Chill</p>
                <p className="font-[family-name:var(--font-inter)] text-[13px]">Haha nice — same, I was literally thinking that.</p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div style={{ opacity: tuneOp }} className="absolute inset-0 flex flex-col p-6 pt-20 bg-[var(--bg-deep)]">
            <h3 className="font-[family-name:var(--font-fraunces)] italic text-2xl mb-8">Tune & Adjust</h3>
            <div className="glass-panel p-4 rounded-xl border border-[var(--accent-gold)]/30 mb-8 bg-[rgba(244,185,66,0.05)]">
              <p className="font-[family-name:var(--font-inter)] text-[13px]">"Oh so NOW you reply? Typical lol."</p>
            </div>
            <div className="flex flex-col gap-2 mb-8">
              <div className="flex justify-between font-[family-name:var(--font-inter)] text-[10px] uppercase text-[var(--text-dim)]">
                <span>Sweet</span>
                <span className="text-[var(--accent-coral)]">Spicy</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full relative">
                <motion.div style={{ x: sliderX }} className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-[var(--accent-gold)] rounded-full shadow-[0_0_10px_var(--accent-gold)]" />
              </div>
            </div>
            <div className="glass-panel p-4 rounded-xl border border-[var(--accent-coral)]/30 bg-[rgba(255,107,107,0.05)] opacity-80">
              <p className="font-[family-name:var(--font-inter)] text-xs text-[var(--accent-coral)] mb-1">Updated Reply</p>
              <p className="font-[family-name:var(--font-inter)] text-[13px]">"Wow, an hour later. Your thumbs must be exhausted."</p>
            </div>
          </motion.div>

          <motion.div style={{ opacity: coachingOp }} className="absolute inset-0 flex flex-col p-6 pt-20 bg-[var(--bg-deep)]">
            <h3 className="font-[family-name:var(--font-fraunces)] italic text-2xl mb-6">Polish Delivery</h3>
            <div className="glass-panel p-4 rounded-xl border border-[var(--accent-sage)]/30 mb-6 bg-[rgba(152,193,164,0.05)]">
              <p className="font-[family-name:var(--font-inter)] text-xs text-[var(--accent-sage)] mb-1">Target Reply</p>
              <p className="font-[family-name:var(--font-inter)] text-[13px]">"Wow, an hour later..."</p>
            </div>
            <motion.div style={{ opacity: recordOp }} className="flex-1 flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-[var(--accent-coral)]/20 border border-[var(--accent-coral)] flex items-center justify-center">
                 <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-6 h-6 rounded-sm bg-[var(--accent-coral)]"></motion.div>
              </div>
              <p className="mt-4 font-[family-name:var(--font-inter)] text-xs text-[var(--text-dim)]">Recording your voice...</p>
            </motion.div>
            <motion.div style={{ opacity: scoreOp }} className="absolute inset-0 bg-[var(--bg-deep)] p-6 pt-20 flex flex-col">
              <h3 className="font-[family-name:var(--font-fraunces)] italic text-2xl mb-8">AI Feedback</h3>
              <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded-xl border-l-4 border-[var(--accent-gold)]">
                  <p className="font-[family-name:var(--font-inter)] text-[10px] uppercase text-[var(--text-dim)]">Sarcasm</p>
                  <p className="font-[family-name:var(--font-inter)] font-semibold text-[14px]">Perfect bite. Send it.</p>
                </div>
              </div>
              <button className="mt-auto w-full py-3 bg-[var(--accent-gold)] text-[var(--bg-deep)] font-[family-name:var(--font-inter)] font-bold rounded-full">Share Voice Note</button>
            </motion.div>
          </motion.div>

          <motion.div style={{ opacity: shareOp }} className="absolute inset-0 flex flex-col p-6 pt-20 bg-[var(--bg-surface)]">
            <h3 className="font-[family-name:var(--font-fraunces)] italic text-2xl mb-8 text-center text-[#25D366]">Sent via WhatsApp</h3>
            <div className="flex-1 flex flex-col gap-4">
               <div className="bg-white/5 rounded-2xl p-3 self-start w-[75%] border border-white/10 text-sm">
                 Where were you?
               </div>
               <motion.div style={{ y: voiceNoteY, opacity: voiceNoteOp }} transition={springTransition} className="bg-[#005c4b] rounded-2xl rounded-tr-sm p-3 self-end w-[85%] flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                   <div className="w-3 h-3 bg-[#005c4b] rounded-[2px] ml-1"></div>
                 </div>
                 <div className="flex-1 flex items-center gap-1">
                   {[1,2,3,4,5,4,2,3,4,5,3,1].map((h, i) => (
                     <div key={i} className="w-1 bg-[#25D366] rounded-full" style={{ height: `${h * 4}px` }}></div>
                   ))}
                 </div>
                 <span className="text-[10px] text-white/70">0:04</span>
               </motion.div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  )
}

// ─── Features (Scroll-driven alternating blocks) ─────────────────────────────
function FeatureBlock({ feature, index, isLast }: { feature: { title: string; desc: string; accent: string; number: string }; index: number; isLast: boolean }) {
  const isEven = index % 2 === 0
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [80, 0, -30])
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0.3])
  const lineScale = useTransform(scrollYProgress, [0.1, 0.45], [0, 1])

  return (
    <div ref={ref} className={`relative ${isLast ? '' : 'mb-8 md:mb-0'}`}>
      <motion.div
        style={{ y, opacity }}
        className={`max-w-[1120px] mx-auto px-6 py-16 md:py-28 flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-start md:items-center gap-8 md:gap-16`}
      >
        {/* Accent indicator */}
        <div className="flex flex-col items-center gap-4 shrink-0">
          <span
            className="font-[family-name:var(--font-fraunces)] italic text-[clamp(4rem,8vw,7rem)] leading-none tracking-tighter"
            style={{ color: feature.accent, opacity: 0.15 }}
          >
            {feature.number}
          </span>
          <motion.div
            style={{ scaleY: lineScale, background: feature.accent }}
            className="w-[2px] h-16 origin-top hidden md:block rounded-full"
          />
        </div>

        {/* Text content */}
        <div className={`flex-1 ${isEven ? 'md:text-left' : 'md:text-right'}`}>
          <motion.div
            initial={{ opacity: 0, x: isEven ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              className="font-[family-name:var(--font-inter)] font-bold text-[10px] tracking-[4px] uppercase mb-4"
              style={{ color: feature.accent }}
            >
              0{feature.number}
            </p>
            <h3 className="font-[family-name:var(--font-fraunces)] italic text-[clamp(2rem,4vw,3.2rem)] text-[var(--text-main)] leading-[1.1] tracking-[-0.5px] mb-5">
              {feature.title}
            </h3>
            <p className="font-[family-name:var(--font-inter)] text-[15px] md:text-[17px] text-[var(--text-dim)] leading-relaxed max-w-[520px]" style={isEven ? {} : { marginLeft: 'auto' }}>
              {feature.desc}
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Subtle divider */}
      {!isLast && (
        <div className="max-w-[1120px] mx-auto px-6">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-[var(--border-glass)] to-transparent" />
        </div>
      )}
    </div>
  )
}

function Features() {
  const features = [
    {
      title: "Reads the vibe,\nnails the reply.",
      desc: "Zubaan detects tone — flirty, passive-aggressive, casual, or dead serious — and crafts replies that match the energy. Not generic. Not robotic. Yours.",
      accent: "var(--accent-coral)",
      number: "1",
    },
    {
      title: "Your voice,\nnot a voice note from a stranger.",
      desc: "Turn any reply into a voice note that sounds like you delivered it. Pick a reply, hit record, get AI coaching on your delivery, then send.",
      accent: "var(--accent-gold)",
      number: "2",
    },
    {
      title: "Dial the spice\nup or down.",
      desc: "Every reply can be tuned — sweeter, sharper, more savage, more chill. Slide a slider. Tell Zubaan what's off. It adjusts on the spot.",
      accent: "var(--accent-sage)",
      number: "3",
    },
    {
      title: "Screenshot any app.\nZubaan handles the rest.",
      desc: "WhatsApp, Instagram, Bumble, Hinge, Telegram — if you can screenshot it, Zubaan reads it. Share directly or drop from your gallery.",
      accent: "var(--accent-coral)",
      number: "4",
    },
    {
      title: "Hinglish native.\nBuilt for how you actually text.",
      desc: "Hindi, English, Hinglish, Romanised Urdu — Zubaan speaks the way South Asians actually talk. No stiff translations. No formal nonsense.",
      accent: "var(--accent-gold)",
      number: "5",
    },
  ]

  return (
    <section id="features" className="relative py-16 md:py-24">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-8 md:mb-16 px-6"
      >
        <p className="font-[family-name:var(--font-inter)] font-semibold text-[10px] tracking-[4px] text-[var(--accent-coral)] uppercase mb-4">What makes it different</p>
        <h2 className="font-[family-name:var(--font-fraunces)] italic text-[clamp(2.5rem,5vw,4rem)] text-[var(--text-main)] leading-[1.05] tracking-[-1px]">
          Everything your texts<br />were missing.
        </h2>
      </motion.div>

      {/* Feature blocks */}
      {features.map((f, i) => (
        <FeatureBlock key={i} feature={f} index={i} isLast={i === features.length - 1} />
      ))}
    </section>
  )
}

// ─── Waitlist ─────────────────────────────────────────────────────────────────
function WaitlistSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.')
      setStatus('error')
      return
    }
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('https://reachify.quest/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.message || 'Something went wrong.')
      }
      setStatus('success')
      setEmail('')
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Could not connect. Try again.'
      setErrorMsg(message)
      setStatus('error')
    }
  }

  return (
    <section id="waitlist" className="relative py-32 px-6 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(244,185,66,0.08),transparent)] pointer-events-none" />
      <div className="relative z-10 max-w-[680px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-[family-name:var(--font-inter)] font-semibold text-[10px] tracking-[4px] text-[var(--accent-gold)] uppercase mb-6">
            Early Access
          </p>
          <h2 className="font-[family-name:var(--font-fraunces)] italic text-[clamp(2.5rem,5vw,4rem)] text-[var(--text-main)] leading-[1.05] tracking-[-1px] mb-6">
            Be first in line.<br />
            <span className="text-[var(--accent-gold)]">Zubaan is almost ready.</span>
          </h2>
          <p className="font-[family-name:var(--font-inter)] text-[var(--text-dim)] text-base leading-relaxed max-w-[480px] mx-auto mb-12">
            We're putting the finishing touches on something special. Drop your email and we'll ping you the moment doors open.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="glass-panel border border-[var(--accent-gold)] rounded-3xl p-10 flex flex-col items-center gap-4"
            >
              <div className="text-5xl">🎉</div>
              <h3 className="font-[family-name:var(--font-fraunces)] italic text-2xl text-[var(--accent-gold)]">You're on the list!</h3>
              <p className="font-[family-name:var(--font-inter)] text-sm text-[var(--text-dim)] max-w-xs">
                We'll reach out to <span className="text-[var(--text-main)] font-medium">{email || 'you'}</span> as soon as Zubaan launches. Sit tight. 🔥
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="glass-panel border border-[var(--border-glass)] rounded-3xl p-8 flex flex-col gap-5 text-left">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="waitlist-email"
                  className="font-[family-name:var(--font-inter)] text-[11px] font-semibold tracking-[3px] uppercase text-[var(--text-dim)]"
                >
                  Your Email
                </label>
                <input
                  id="waitlist-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setStatus('idle'); setErrorMsg('') }}
                  disabled={status === 'loading'}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 font-[family-name:var(--font-inter)] text-[15px] text-[var(--text-main)] placeholder:text-[var(--text-dim)] outline-none focus:border-[var(--accent-gold)] focus:ring-2 focus:ring-[rgba(244,185,66,0.2)] transition-all disabled:opacity-50"
                />
                {status === 'error' && errorMsg && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-[family-name:var(--font-inter)] text-[12px] text-[var(--accent-coral)] mt-1"
                  >
                    {errorMsg}
                  </motion.p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={status !== 'loading' ? { scale: 1.02 } : {}}
                whileTap={status !== 'loading' ? { scale: 0.97 } : {}}
                className="w-full font-[family-name:var(--font-inter)] font-semibold text-[14px] text-[var(--bg-deep)] bg-[var(--accent-gold)] rounded-full py-4 shadow-[0_0_30px_rgba(244,185,66,0.35)] transition-opacity disabled:opacity-60 disabled:cursor-not-allowed relative overflow-hidden"
              >
                {status === 'loading' ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Saving your spot...
                  </span>
                ) : (
                  'Notify Me at Launch →'
                )}
              </motion.button>

              <p className="font-[family-name:var(--font-inter)] text-[11px] text-[var(--text-dim)] text-center">
                No spam. No subscriptions. Just one message when we're live.
              </p>
            </form>
          )}
        </motion.div>


      </div>
    </section>
  )
}

// ─── Footer ──────────────────────────────────────────────────────────────────
function FooterCTA() {
  return (
    <footer className="relative py-16 px-6 border-t border-[var(--border-glass)] bg-[var(--bg-surface)]">
      <div className="relative z-10 w-full max-w-[1120px] mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <ZubaanMark size={28} animated={false} />
            <span className="font-[family-name:var(--font-fraunces)] italic text-xl text-[var(--accent-gold)]">Zubaan</span>
            <span className="font-[family-name:var(--font-inter)] text-[11px] text-[var(--text-dim)] ml-1">Beta Preview</span>
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            <a href="/privacy" className="font-[family-name:var(--font-inter)] text-[12px] text-[var(--text-dim)] hover:text-[var(--text-main)] transition-colors">Privacy Policy</a>
            <a href="/terms" className="font-[family-name:var(--font-inter)] text-[12px] text-[var(--text-dim)] hover:text-[var(--text-main)] transition-colors">Terms of Service</a>
            <a href="/contact" className="font-[family-name:var(--font-inter)] text-[12px] text-[var(--text-dim)] hover:text-[var(--text-main)] transition-colors">Support</a>
            <a href="/delete-account" className="font-[family-name:var(--font-inter)] text-[12px] text-[var(--text-dim)] hover:text-[var(--accent-coral)] transition-colors">Delete account</a>
          </div>
          <p className="font-[family-name:var(--font-inter)] text-[12px] text-[var(--text-dim)]">
            © 2026 Zubaan. Reply in your voice.
          </p>
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
      <WaitlistSection />
      <FooterCTA />
    </main>
  )
}
