"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { LiquidGlassHeader } from "@/components/ui/liquid-glass-header"

/* ═══════════════════════════════════════════════════════════════
   GITHUB VERSION HOOK — fetches latest release tag
   ═══════════════════════════════════════════════════════════════ */

function useLatestVersion() {
  const [version, setVersion] = useState<string | null>(null)
  useEffect(() => {
    fetch("https://api.github.com/repos/Jnani-Smart/Clippy/releases/latest")
      .then(r => r.json())
      .then(data => {
        if (data?.tag_name) setVersion(data.tag_name)
      })
      .catch(() => {/* fallback to default */ })
  }, [])
  return version
}

/* ═══════════════════════════════════════════════════════════════
   SVG ICONS — Apple SF Symbols–inspired, monoline style
   ═══════════════════════════════════════════════════════════════ */

const I = {
  clipboard: (s = 44) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    </svg>
  ),
  search: (s = 44) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  pin: (s = 44) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="17" x2="12" y2="22" />
      <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z" />
    </svg>
  ),
  bolt: (s = 44) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  globe: (s = 44) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  shield: (s = 44) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  layout: (s = 44) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" />
    </svg>
  ),
  terminal: (s = 44) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  ),
  apple: (s = 20) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  ),
  github: (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  x: (s = 20) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  discord: (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  ),
  star: (s = 16) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  download: (s = 20) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  sparkle: (s = 44) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v18M3 12h18M5.636 5.636l12.728 12.728M18.364 5.636L5.636 18.364" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  paperclip: (s = 44) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  ),
  image: (s = 44) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  ),
  code: (s = 44) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  eye: (s = 44) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  keyboard: (s = 44) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <line x1="6" y1="8" x2="6" y2="8" /><line x1="10" y1="8" x2="10" y2="8" />
      <line x1="14" y1="8" x2="14" y2="8" /><line x1="18" y1="8" x2="18" y2="8" />
      <line x1="6" y1="12" x2="6" y2="12" /><line x1="10" y1="12" x2="10" y2="12" />
      <line x1="14" y1="12" x2="14" y2="12" /><line x1="18" y1="12" x2="18" y2="12" />
      <line x1="8" y1="16" x2="16" y2="16" />
    </svg>
  ),
  filter: (s = 44) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  ),
  app: (s = 44) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <line x1="2" y1="8" x2="22" y2="8" />
      <line x1="6" y1="5" x2="6" y2="5" />
      <line x1="9" y1="5" x2="9" y2="5" />
    </svg>
  ),
}

/* ═══════════════════════════════════════════════════════════════
   INTERSECTION OBSERVER — scroll-driven animations
   ═══════════════════════════════════════════════════════════════ */

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold, rootMargin: "-30px 0px" }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref: ref as React.RefObject<any>, visible }
}

/* ═══════════════════════════════════════════════════════════════
   ANIMATED HIGHLIGHT — pink sweep that slides in on scroll
   ═══════════════════════════════════════════════════════════════ */

function AnimatedHighlight({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        // Respect additional delay for cascade coordination
        if (delay > 0) {
          setTimeout(() => setInView(true), delay)
        } else {
          setInView(true)
        }
        obs.disconnect()
      }
    }, { threshold: 0.3, rootMargin: "-40px 0px" })
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])
  return (
    <span ref={ref} className={`highlight-pink ${inView ? "animate-in" : ""} ${className}`}>
      {children}
    </span>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SCRIBBLE OVAL — hand-drawn circle that draws itself on scroll
   Uses JS-driven animation to avoid CSS specificity issues
   ═══════════════════════════════════════════════════════════════ */

function ScribbleOval({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  const containerRef = useRef<HTMLSpanElement>(null)
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const path = pathRef.current
    if (!container || !path) return

    // Get actual path length for accurate dash animation
    const len = path.getTotalLength()
    path.style.strokeDasharray = `${len}`
    path.style.strokeDashoffset = `${len}`
    path.style.opacity = "0"

    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        // Delay to coordinate with parent section entrance
        const totalDelay = 400 + delay
        setTimeout(() => {
          // Use rAF to ensure initial state is painted before animating
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              // Fade in the stroke first, then draw
              path.style.transition = "opacity 0.3s ease, stroke-dashoffset 1.8s cubic-bezier(0.33, 1, 0.68, 1)"
              path.style.opacity = "0.75"
              path.style.strokeDashoffset = "0"
            })
          })
        }, totalDelay)
        obs.disconnect()
      }
    }, { threshold: 0.3, rootMargin: "-40px 0px" })
    obs.observe(container)
    return () => obs.disconnect()
  }, [delay])

  return (
    <span ref={containerRef} className="circle-accent" style={{ position: "relative", display: "inline-block" }}>
      {children}
      <svg
        viewBox="0 0 200 80"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          top: "-14px",
          left: "-18px",
          right: "-18px",
          bottom: "-12px",
          width: "calc(100% + 36px)",
          height: "calc(100% + 26px)",
          pointerEvents: "none",
          overflow: "visible",
        }}
      >
        <path
          ref={pathRef}
          d="M 100 10 C 155 8, 192 22, 190 40 C 188 58, 150 72, 100 70 C 50 72, 12 58, 10 40 C 8 22, 45 8, 100 10 Z"
          fill="none"
          stroke="var(--accent-lavender)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0"
        />
      </svg>
    </span>
  )
}

/* ═══════════════════════════════════════════════════════════════
   ICON DRAW WRAPPER — SVG strokes draw themselves on scroll
   Uses JS to get actual path lengths and animate each stroke
   ═══════════════════════════════════════════════════════════════ */

function IconDrawWrapper({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const svgEl = el.querySelector("svg")
    if (!svgEl) return

    // Get all stroke-able SVG elements
    const strokes = svgEl.querySelectorAll("path, polyline, line, rect, circle, polygon")

    // Setup: measure each path and hide it
    strokes.forEach((s) => {
      const stroke = s as SVGGeometryElement
      try {
        const len = stroke.getTotalLength()
        stroke.style.strokeDasharray = `${len}`
        stroke.style.strokeDashoffset = `${len}`
        stroke.style.opacity = "0"
      } catch {
        // Some elements (e.g. zero-length lines) don't support getTotalLength
        stroke.style.strokeDasharray = "100"
        stroke.style.strokeDashoffset = "100"
        stroke.style.opacity = "0"
      }
    })

    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        // Stagger: 120ms between strokes, with 200ms base delay for smooth cascade
        const baseDelay = 200 + delay * 1000
        setTimeout(() => {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              strokes.forEach((s, i) => {
                const stroke = s as SVGElement
                const stagger = i * 0.12
                stroke.style.transition = `opacity 0.4s ease ${stagger}s, stroke-dashoffset 1.2s cubic-bezier(0.33, 1, 0.68, 1) ${stagger}s`
                stroke.style.opacity = "1"
                stroke.style.strokeDashoffset = "0"
              })
            })
          })
        }, baseDelay)
        obs.disconnect()
      }
    }, { threshold: 0.25, rootMargin: "-20px 0px" })
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])

  return <div ref={ref}>{children}</div>
}

/* ═══════════════════════════════════════════════════════════════
   MAGNETIC CURSOR EFFECT — icons follow the cursor subtly
   ═══════════════════════════════════════════════════════════════ */

function useMagnetic() {
  const ref = useRef<HTMLDivElement>(null)
  const handleMove = useCallback((e: MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) * 0.2
    const dy = (e.clientY - cy) * 0.2
    el.style.transform = `translate(${dx}px, ${dy}px)`
  }, [])
  const handleLeave = useCallback(() => {
    const el = ref.current
    if (el) el.style.transform = "translate(0,0)"
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.addEventListener("mousemove", handleMove)
    el.addEventListener("mouseleave", handleLeave)
    return () => {
      el.removeEventListener("mousemove", handleMove)
      el.removeEventListener("mouseleave", handleLeave)
    }
  }, [handleMove, handleLeave])
  return ref
}

/* ═══════════════════════════════════════════════════════════════
   PARALLAX TILT CARD
   ═══════════════════════════════════════════════════════════════ */

function TiltCard({ children, className = "", style = {} }: { children: React.ReactNode, className?: string, style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(800px) rotateX(${y * -6}deg) rotateY(${x * 6}deg) scale(1.02)`
  }

  const handleLeave = () => {
    const el = ref.current
    if (el) el.style.transform = "perspective(800px) rotateX(0) rotateY(0) scale(1)"
  }

  return (
    <div ref={ref} className={className} style={{ ...style, transition: "transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)", willChange: "transform" }}
      onMouseMove={handleMove} onMouseLeave={handleLeave}>
      {children}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   ANIMATED COUNTER
   ═══════════════════════════════════════════════════════════════ */

function Counter({ end, suffix = "", duration = 2000 }: { end: number, suffix?: string, duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        const start = performance.now()
        const animate = (now: number) => {
          const progress = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 4) // ease-out quart
          setCount(Math.round(eased * end))
          if (progress < 1) requestAnimationFrame(animate)
        }
        requestAnimationFrame(animate)
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [end, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

/* ═══════════════════════════════════════════════════════════════
   1 · HERO
   ═══════════════════════════════════════════════════════════════ */

function HeroSection() {
  const { ref, visible } = useInView(0.05)

  return (
    <section id="hero" ref={ref} style={{
      minHeight: "100vh",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "140px 32px 80px",
      textAlign: "center",
      position: "relative",
    }}>


      {/* HEADLINE — massive, with pink highlight */}
      <h1 className="text-hero" style={{
        marginBottom: "24px",
        maxWidth: "900px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 1.2s cubic-bezier(0.33, 1, 0.68, 1) 0.1s, transform 1.4s cubic-bezier(0.33, 1, 0.68, 1) 0.1s",
      }}>
        Your clipboard,{" "}
        <br />
        <AnimatedHighlight className="" delay={200}>reimagined</AnimatedHighlight>
      </h1>

      {/* Subtitle */}
      <p className="text-body" style={{
        maxWidth: "560px",
        textAlign: "center",
        marginBottom: "40px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: "opacity 1.1s cubic-bezier(0.33, 1, 0.68, 1) 0.3s, transform 1.3s cubic-bezier(0.33, 1, 0.68, 1) 0.3s",
        fontSize: "18px",
        lineHeight: 1.6,
      }}>
        A lightweight, elegant clipboard manager for{" "}
        <span style={{ display: "inline-flex", alignItems: "baseline", gap: "3px" }}><span style={{ display: "inline-block", verticalAlign: "-0.1em" }}>{I.apple(16)}</span> macOS</span>.
        Access your clipboard history instantly with{" "}
        <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>⌘⇧V</span>.
      </p>

      {/* CTA BUTTONS — Alcove style: dark + frosted */}
      <div style={{
        display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 1.0s cubic-bezier(0.33, 1, 0.68, 1) 0.5s, transform 1.2s cubic-bezier(0.33, 1, 0.68, 1) 0.5s",
      }}>
        <a href="https://github.com/Jnani-Smart/Clippy/releases/download/v1.9.0/Clippy.app.zip" className="btn-dark">
          {I.apple(18)}
          Download for Mac
        </a>
        <a href="https://github.com/Jnani-Smart/Clippy" target="_blank" rel="noopener noreferrer" className="btn-frosted">
          {I.github(18)}
          View on GitHub
        </a>
      </div>

      {/* PRODUCT MOCKUP — Large app screenshot */}
      <div
        className="mockup-float-container"
        style={{
          marginTop: "72px", width: "100%", maxWidth: "960px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0) scale(1)" : "translateY(50px) scale(0.97)",
          transition: "opacity 1.2s cubic-bezier(0.33, 1, 0.68, 1) 0.7s, transform 1.6s cubic-bezier(0.33, 1, 0.68, 1) 0.7s",
        }}
      >
        <img
          src="/Silver.svg"
          alt="Clippy App Screenshot"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.12))",
            transition: "transform 0.5s ease-out",
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-12px)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
        />
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   2 · FEATURES GRID — Alcove-style icon + bold label
   ═══════════════════════════════════════════════════════════════ */

function FeatureItem({ icon, label, accent, visible, index }: { icon: (s?: number) => React.ReactNode, label: string, accent: string | null, visible: boolean, index: number }) {
  const magnetRef = useMagnetic()
  // Stagger: 100ms between items, with a gentle ease-out for a wave-like entrance
  const staggerDelay = 0.08 + index * 0.1
  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0) scale(1)" : "translateY(36px) scale(0.97)",
      transition: `opacity 0.9s cubic-bezier(0.33, 1, 0.68, 1) ${staggerDelay}s, transform 1.1s cubic-bezier(0.33, 1, 0.68, 1) ${staggerDelay}s`,
      cursor: "default",
      willChange: "opacity, transform",
    }}>
      <IconDrawWrapper delay={staggerDelay}>
        <div
          ref={magnetRef}
          className="feature-icon"
          style={{ transition: "transform 0.5s cubic-bezier(0.34,1.56,0.64,1)" }}
        >
          {icon(44)}
        </div>
      </IconDrawWrapper>
      {accent === "circle" ? (
        <h3 className="text-title" style={{ whiteSpace: "pre-line", lineHeight: 1.2 }}>
          Blazing fast<br />
          <ScribbleOval>native app</ScribbleOval>
        </h3>
      ) : (
        <h3 className="text-title" style={{ whiteSpace: "pre-line", lineHeight: 1.2 }}>
          {label}
        </h3>
      )}
    </div>
  )
}

function FeaturesSection() {
  const { ref, visible } = useInView()

  const features = [
    { icon: I.keyboard, label: "Instant\nAccess ⌘⇧V", accent: null },
    { icon: I.search, label: "Quick\nSearch", accent: null },
    { icon: I.clipboard, label: "Rich\nHistory", accent: null },
    { icon: I.pin, label: "Pin\nImportant", accent: null },
    { icon: I.filter, label: "Category\nFiltering", accent: null },
    { icon: I.code, label: "Syntax\nHighlighting", accent: null },
    { icon: I.eye, label: "Quick Look\nPreview", accent: null },
    { icon: I.shield, label: "Privacy\nFirst", accent: null },
  ]

  return (
    <section id="features" ref={ref} className="section" style={{ paddingTop: "40px" }}>
      <div className="grid-features">
        {features.map((f, i) => (
          <FeatureItem key={i} icon={f.icon} label={f.label} accent={f.accent} visible={visible} index={i} />
        ))}
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   3 · SHOWCASE — Large feature cards with demos
   ═══════════════════════════════════════════════════════════════ */

function ShowcaseSection() {
  const { ref: ref1, visible: v1 } = useInView()
  const { ref: ref2, visible: v2 } = useInView()
  const { ref: ref3, visible: v3 } = useInView()

  return (
    <div className="section-wide" style={{ paddingTop: 0 }}>
      {/* Card 1: Smart Search */}
      <div ref={ref1} style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px",
        alignItems: "center", marginBottom: "100px",
        opacity: v1 ? 1 : 0, transform: v1 ? "translateY(0)" : "translateY(36px)",
        transition: "opacity 1.0s cubic-bezier(0.33, 1, 0.68, 1) 0.1s, transform 1.3s cubic-bezier(0.33, 1, 0.68, 1) 0.1s",
      }}>
        <div>
          <p className="text-label" style={{ marginBottom: "16px", color: "var(--accent-blue)" }}>QUICK SEARCH</p>
          <h2 className="text-headline" style={{ marginBottom: "20px" }}>
            Find anything,{" "}
            <AnimatedHighlight delay={300}>instantly</AnimatedHighlight>
          </h2>
          <p className="text-body" style={{ marginBottom: "28px" }}>
            Search across your entire clipboard history in milliseconds. Filter by category — text, code, URLs, or images. See which app each item came from.
          </p>
          <div style={{ display: "flex", gap: "32px" }}>
            <div>
              <div style={{ fontSize: "32px", fontWeight: 800, letterSpacing: "-0.04em", color: "var(--text-primary)" }}>
                <Counter end={50} suffix="ms" />
              </div>
              <div style={{ fontSize: "13px", color: "var(--text-tertiary)", fontWeight: 500 }}>avg search time</div>
            </div>
            <div>
              <div style={{ fontSize: "32px", fontWeight: 800, letterSpacing: "-0.04em", color: "var(--text-primary)" }}>
                <Counter end={100} suffix="K+" />
              </div>
              <div style={{ fontSize: "13px", color: "var(--text-tertiary)", fontWeight: 500 }}>entries supported</div>
            </div>
          </div>
        </div>
        <TiltCard className="glass-warm" style={{ padding: "32px", minHeight: "320px" }}>
          {/* Search demo */}
          <div style={{
            background: "rgba(28, 28, 30, 0.04)", borderRadius: "14px", padding: "14px 18px",
            marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px",
          }}>
            {I.search(18)}
            <span style={{ color: "var(--text-primary)", fontWeight: 500, fontSize: "15px" }}>deploy script</span>
            <span style={{ marginLeft: "auto", fontSize: "11px", color: "var(--text-tertiary)", fontWeight: 600 }}>⌘F</span>
          </div>
          {[
            { text: "deploy-production.sh — ./scripts/", match: "deploy", time: "2h" },
            { text: "git push origin deploy-branch", match: "deploy", time: "4h" },
            { text: "Deployment checklist for v2.0 release", match: "Deploy", time: "1d" },
          ].map((r, i) => (
            <div key={i} style={{
              padding: "14px 16px", borderRadius: "12px",
              background: i === 0 ? "rgba(91,156,245,0.06)" : "transparent",
              border: i === 0 ? "1px solid rgba(91,156,245,0.15)" : "1px solid transparent",
              marginBottom: "6px",
              display: "flex", alignItems: "center",
              transition: "all 0.25s",
            }}>
              <span style={{ fontSize: "14px", color: "var(--text-primary)", flex: 1 }}>
                {r.text}
              </span>
              <span style={{ fontSize: "12px", color: "var(--text-tertiary)", fontWeight: 500 }}>{r.time}</span>
            </div>
          ))}
        </TiltCard>
      </div>

      {/* Card 2: Pin & Organize */}
      <div ref={ref2} style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px",
        alignItems: "center", marginBottom: "100px",
        opacity: v2 ? 1 : 0, transform: v2 ? "translateY(0)" : "translateY(36px)",
        transition: "opacity 1.0s cubic-bezier(0.33, 1, 0.68, 1) 0.1s, transform 1.3s cubic-bezier(0.33, 1, 0.68, 1) 0.1s",
      }}>
        <TiltCard className="glass-warm" style={{ padding: "32px", minHeight: "320px" }}>
          {/* Pinned items demo */}
          <div style={{ marginBottom: "16px", fontWeight: 700, fontSize: "15px", color: "var(--text-primary)" }}>
            📌 Pinned
          </div>
          {[
            { emoji: "🔑", text: "API_KEY=sk-proj-abc123...", color: "#F78C6C" },
            { emoji: "📧", text: "team@company.com", color: "#5B9CF5" },
            { emoji: "🔗", text: "https://figma.com/file/design-system", color: "#C3E88D" },
            { emoji: "💳", text: "4242 •••• •••• 4242", color: "#c792ea" },
          ].map((item, i) => (
            <div key={i} style={{
              padding: "14px 16px", borderRadius: "12px",
              background: "rgba(28, 28, 30, 0.025)",
              border: "1px solid rgba(28, 28, 30, 0.04)",
              marginBottom: "8px",
              display: "flex", alignItems: "center", gap: "12px",
              transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
              cursor: "pointer",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateX(4px)"; e.currentTarget.style.background = "rgba(28,28,30,0.04)" }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateX(0)"; e.currentTarget.style.background = "rgba(28,28,30,0.025)" }}
            >
              <span style={{ fontSize: "18px" }}>{item.emoji}</span>
              <span style={{ fontSize: "14px", color: "var(--text-primary)", fontFamily: "monospace", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {item.text}
              </span>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: item.color }} />
            </div>
          ))}
        </TiltCard>
        <div>
          <p className="text-label" style={{ marginBottom: "16px", color: "var(--accent-lavender)" }}>ORGANIZE</p>
          <h2 className="text-headline" style={{ marginBottom: "20px" }}>
            Pin what{" "}
            <ScribbleOval delay={200}>matters</ScribbleOval>
          </h2>
          <p className="text-body" style={{ marginBottom: "28px" }}>
            Keep frequently used items readily available. API keys, email templates, code blocks — pinned items stay accessible across sessions, always one shortcut away.
          </p>
          <div style={{ display: "flex", gap: "32px" }}>
            <div>
              <div style={{ fontSize: "32px", fontWeight: 800, letterSpacing: "-0.04em", color: "var(--text-primary)" }}>∞</div>
              <div style={{ fontSize: "13px", color: "var(--text-tertiary)", fontWeight: 500 }}>pinned items</div>
            </div>
            <div>
              <div style={{ fontSize: "32px", fontWeight: 800, letterSpacing: "-0.04em", color: "var(--text-primary)" }}>
                <Counter end={12} />
              </div>
              <div style={{ fontSize: "13px", color: "var(--text-tertiary)", fontWeight: 500 }}>custom groups</div>
            </div>
          </div>
        </div>
      </div>

      {/* Card 3: Privacy */}
      <div ref={ref3} style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px",
        alignItems: "center",
        opacity: v3 ? 1 : 0, transform: v3 ? "translateY(0)" : "translateY(36px)",
        transition: "opacity 1.0s cubic-bezier(0.33, 1, 0.68, 1) 0.1s, transform 1.3s cubic-bezier(0.33, 1, 0.68, 1) 0.1s",
      }}>
        <div>
          <p className="text-label" style={{ marginBottom: "16px", color: "#C3E88D" }}>PRIVACY</p>
          <h2 className="text-headline" style={{ marginBottom: "20px" }}>
            Your data stays{" "}
            <AnimatedHighlight delay={300}>yours</AnimatedHighlight>
          </h2>
          <p className="text-body" style={{ marginBottom: "28px" }}>
            Your clipboard data never leaves your device. Zero cloud dependency, zero tracking. Import and export your clipboard history anytime. Minimal CPU and memory footprint.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {["100% Local", "Import/Export", "Minimal Footprint", "Data Management"].map((tag) => (
              <span key={tag} style={{
                padding: "8px 16px", borderRadius: "100px",
                background: "rgba(28,28,30,0.05)",
                fontSize: "13px", fontWeight: 600,
                color: "var(--text-secondary)",
                border: "1px solid rgba(28,28,30,0.04)",
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
        <TiltCard className="glass-warm" style={{ padding: "40px", minHeight: "320px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{
              width: "80px", height: "80px", borderRadius: "50%",
              background: "linear-gradient(135deg, rgba(195,232,141,0.2), rgba(91,156,245,0.1))",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px",
              animation: "gentlePulse 3s ease-in-out infinite",
            }}>
              {I.shield(40)}
            </div>
            <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "6px" }}>
              100% Local
            </div>
            <div style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>
              No servers. No tracking. No compromise.
            </div>
          </div>
        </TiltCard>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
                @media (max-width: 768px) {
                    .section-wide > div[style*="grid-template-columns"] {
                        grid-template-columns: 1fr !important;
                    }
                }
            ` }} />
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   4 · TESTIMONIALS
   ═══════════════════════════════════════════════════════════════ */

function TestimonialsSection() {
  const { ref, visible } = useInView()

  const testimonials = [
    {
      name: "Saran Kathiravan",
      role: "Developer",
      quote: "Clippy has revolutionized my development workflow. The VisionOS-inspired interface is absolutely stunning.",
      avatar: "SK",
      color: "#007AFF",
      rating: 5,
    },
    {
      name: "Amranth Prakash",
      role: "Product Manager",
      quote: "I love that my data never leaves my device. The source app tracking shows exactly where each clip came from. Pin feature saves me hours weekly.",
      avatar: "AP",
      color: "#FF2D55",
      rating: 4.5,
    },
    {
      name: "Khyathi Jain",
      role: "Designer",
      quote: "The attention to detail in Clippy's interface is incredible. It feels like a native Apple application.",
      avatar: "KJ",
      color: "#AF52DE",
      rating: 5,
    },
    {
      name: "Srikar K",
      role: "Power User",
      quote: "I can't imagine working without Clippy now. It's become an essential part of my daily workflow.",
      avatar: "SR",
      color: "#FF9500",
      rating: 4,
    },
  ]

  // Duplicate for infinite scroll
  const marqueeItems = [...testimonials, ...testimonials, ...testimonials]

  const Star = ({ fill }: { fill: number }) => (
    <div style={{ position: "relative", width: "14px", height: "14px", color: "#F5A623" }}>
      {/* Empty/Background Star */}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ position: "absolute", top: 0, left: 0, opacity: 0.3 }}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
      {/* Filled/Partial Star */}
      <div style={{ position: "absolute", top: 0, left: 0, width: `${fill * 100}%`, overflow: "hidden" }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{ minWidth: "14px" }}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      </div>
    </div>
  )

  return (
    <section id="testimonials" ref={ref} className="section" style={{ overflow: "hidden", padding: "100px 0" }}>
      <div style={{
        textAlign: "center", marginBottom: "64px",
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 1.0s cubic-bezier(0.33, 1, 0.68, 1), transform 1.2s cubic-bezier(0.33, 1, 0.68, 1)",
      }}>
        <h2 className="text-headline">
          Loved by <AnimatedHighlight delay={400}>professionals</AnimatedHighlight>
        </h2>
      </div>

      {/* Marquee Container with Gradient Mask */}
      <div style={{
        position: "relative",
        width: "100%",
        maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
      }}>
        <div className="marquee-track" style={{
          display: "flex",
          gap: "24px",
          width: "max-content",
          animation: "scroll 40s linear infinite",
          padding: "20px 0", // Space for shadows
          alignItems: "stretch", // Ensure equal height cards
        }}
          onMouseEnter={(e) => e.currentTarget.style.animationPlayState = "paused"}
          onMouseLeave={(e) => e.currentTarget.style.animationPlayState = "running"}
        >
          {marqueeItems.map((t, i) => (
            <TiltCard key={i} className="testimonial-card" style={{
              width: "380px",
              flexShrink: 0,
              opacity: visible ? 1 : 0,
              transform: visible ? "scale(1)" : "scale(0.95)",
              transition: `opacity 0.8s ease, transform 0.8s ease`,
              display: "flex", flexDirection: "column", height: "auto", // Enable flex layout for internal alignment
            }}>
              {/* Quote - Expands to fill space */}
              <p style={{
                fontSize: "15px", lineHeight: 1.6, color: "var(--text-primary)",
                marginBottom: "24px", position: "relative", zIndex: 1,
                flex: "1 1 auto", // Pushes footer to bottom
              }}>
                "{t.quote}"
              </p>

              {/* Footer: Author + Stars */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                marginTop: "auto", gap: "12px"
              }}>
                {/* Author (Left) */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{
                    width: "36px", height: "36px", borderRadius: "50%",
                    background: `linear-gradient(135deg, ${t.color}cc, ${t.color})`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "13px", fontWeight: 700, color: "white",
                    textShadow: "0 1px 2px rgba(0,0,0,0.1)", flexShrink: 0,
                  }}>
                    {t.avatar}
                  </div>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.2 }}>{t.name}</div>
                    <div style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>{t.role}</div>
                  </div>
                </div>

                {/* Stars (Right) */}
                <div style={{ display: "flex", gap: "2px" }}>
                  {Array.from({ length: 5 }).map((_, j) => {
                    // Calculate fill for this star (0 to 1)
                    const fill = Math.max(0, Math.min(1, t.rating - j))
                    return <Star key={j} fill={fill} />
                  })}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-100% / 3)); }
          }
        ` }} />
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   5 · DOWNLOAD CTA
   ═══════════════════════════════════════════════════════════════ */

function DownloadSection() {
  const { ref, visible } = useInView()

  return (
    <section id="download" ref={ref} className="section" style={{ textAlign: "center", paddingBottom: "60px" }}>
      <div style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.97)",
        transition: "opacity 1.0s cubic-bezier(0.33, 1, 0.68, 1) 0.1s, transform 1.3s cubic-bezier(0.33, 1, 0.68, 1) 0.1s",
      }}>
        <a href="https://github.com/Jnani-Smart/Clippy/releases/download/v1.9.0/Clippy.app.zip" className="btn-dark" style={{ padding: "22px 48px", fontSize: "18px" }}>
          {I.apple(20)}
          Download for Mac
        </a>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   6 · FOOTER — Social icons + watermark
   ═══════════════════════════════════════════════════════════════ */

function Footer() {
  return (
    <footer style={{ overflow: "hidden" }}>
      {/* Social icons */}
      <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "80px" }}>
        <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="social-icon">{I.x()}</a>
        <a href="https://github.com/Jnani-Smart/Clippy" target="_blank" rel="noopener noreferrer" className="social-icon">{I.github()}</a>
        <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="social-icon">{I.discord()}</a>
      </div>

      {/* Giant watermark — visible at top, fades to transparent at bottom like Alcove */}
      <div style={{
        overflow: "hidden",
        height: "clamp(160px, 20vw, 320px)",
        position: "relative",
        paddingTop: "12px",
        maskImage: "linear-gradient(to bottom, black 0%, black 40%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 40%, transparent 100%)",
      }}>
        <div className="watermark" style={{
          position: "absolute",
          left: "50%",
          top: "12px",
          transform: "translateX(-50%)",
        }}>
          Clippy
        </div>
      </div>
    </footer>
  )
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════ */

export default function Home() {
  const version = useLatestVersion()

  return (
    <main>
      <LiquidGlassHeader
        logoSrc="/logo.png"
        title="Clippy"
        version={version ?? undefined}
        sections={[
          { label: "Features", href: "#features" },
          { label: "Testimonials", href: "#testimonials" },
          { label: "Download", href: "#download" },
        ]}
      />

      <HeroSection />
      <FeaturesSection />
      <ShowcaseSection />

      <div className="divider" />
      <TestimonialsSection />

      <DownloadSection />
      <Footer />
    </main>
  )
}
