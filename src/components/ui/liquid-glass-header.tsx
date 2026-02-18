"use client"

import { useEffect, useRef, useState, useCallback } from "react"

interface NavSection {
    label: string
    href?: string
}

interface LiquidGlassHeaderProps {
    logoSrc?: string
    title?: string
    sections?: NavSection[]
    version?: string
}

const DEFAULT_SECTIONS: NavSection[] = [
    { label: "Features", href: "#features" },
    { label: "Gallery", href: "#gallery" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Download", href: "#download" },
]

const GLASS = {
    height: 52,
    radius: 26,
    border: 0.06,
    lightness: 54,
    alpha: 0.88,
    blur: 14,
    frost: 0.04,
    scale: -140,
    saturation: 1.6,
    blend: "difference" as const,
    r: 0,
    g: 8,
    b: 16,
    displace: 0.18,
}

function buildDisplacementUri(width: number, id: string) {
    const c = GLASS
    const h = c.height
    const b = Math.min(width, h) * (c.border * 0.5)
    return `data:image/svg+xml,${encodeURIComponent(
        `<svg viewBox="0 0 ${width} ${h}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="${id}-r" x1="100%" y1="0%" x2="0%" y2="0%"><stop offset="0%" stop-color="#000"/><stop offset="100%" stop-color="red"/></linearGradient>
        <linearGradient id="${id}-b" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#000"/><stop offset="100%" stop-color="blue"/></linearGradient>
      </defs>
      <rect width="${width}" height="${h}" fill="black"/>
      <rect width="${width}" height="${h}" rx="${c.radius}" fill="url(#${id}-r)"/>
      <rect width="${width}" height="${h}" rx="${c.radius}" fill="url(#${id}-b)" style="mix-blend-mode:${c.blend}"/>
      <rect x="${b}" y="${b}" width="${width - b * 2}" height="${h - b * 2}" rx="${c.radius}" fill="hsl(0 0% ${c.lightness}% / ${c.alpha})" style="filter:blur(${c.blur}px)"/>
    </svg>`
    )}`
}

function GlassFilter({ id, svgRef }: { id: string; svgRef: React.RefObject<SVGSVGElement | null> }) {
    const c = GLASS
    return (
        <svg ref={svgRef} xmlns="http://www.w3.org/2000/svg"
            style={{ width: "100%", height: "100%", pointerEvents: "none", position: "absolute", inset: 0 }}>
            <defs>
                <filter id={id} colorInterpolationFilters="sRGB">
                    <feImage x="0" y="0" width="100%" height="100%" result="map" />
                    <feDisplacementMap in="SourceGraphic" in2="map" xChannelSelector="R" yChannelSelector="G" scale={c.scale + c.r} result="dR" />
                    <feColorMatrix in="dR" type="matrix" values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" result="red" />
                    <feDisplacementMap in="SourceGraphic" in2="map" xChannelSelector="R" yChannelSelector="G" scale={c.scale + c.g} result="dG" />
                    <feColorMatrix in="dG" type="matrix" values="0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0" result="green" />
                    <feDisplacementMap in="SourceGraphic" in2="map" xChannelSelector="R" yChannelSelector="G" scale={c.scale + c.b} result="dB" />
                    <feColorMatrix in="dB" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0" result="blue" />
                    <feBlend in="red" in2="green" mode="screen" result="rg" />
                    <feBlend in="rg" in2="blue" mode="screen" result="out" />
                    <feGaussianBlur in="out" stdDeviation={c.displace} />
                </filter>
            </defs>
        </svg>
    )
}

function Specular() {
    return (
        <div style={{
            position: "absolute", top: "1px", left: "15%", right: "15%", height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)",
            borderRadius: "999px", pointerEvents: "none",
        }} />
    )
}

const pillStyle = (scrolled: boolean): React.CSSProperties => ({
    height: `${GLASS.height}px`,
    borderRadius: `${GLASS.radius}px`,
    background: `hsl(0 0% 100% / ${scrolled ? 0.07 : GLASS.frost})`,
    boxShadow: scrolled
        ? `0 0 0 0.5px rgba(255,255,255,0.35) inset, 0 0 2px 1px rgba(0,0,0,0.10) inset,
           0 0 10px 4px rgba(0,0,0,0.05) inset, 0 4px 20px rgba(17,17,26,0.08),
           0 8px 32px rgba(17,17,26,0.06), 0 16px 48px rgba(17,17,26,0.04)`
        : `0 0 0 0.5px rgba(255,255,255,0.3) inset, 0 0 2px 1px rgba(0,0,0,0.08) inset,
           0 0 10px 4px rgba(0,0,0,0.04) inset, 0 4px 16px rgba(17,17,26,0.05),
           0 8px 24px rgba(17,17,26,0.04), 0 16px 56px rgba(17,17,26,0.03)`,
    transition: "box-shadow 0.4s cubic-bezier(.4,0,.2,1), background 0.4s cubic-bezier(.4,0,.2,1)",
    position: "relative" as const,
    overflow: "hidden",
})

export function LiquidGlassHeader({
    logoSrc,
    title = "Clippy",
    sections = DEFAULT_SECTIONS,
    version,
}: LiquidGlassHeaderProps) {
    const leftRef = useRef<HTMLDivElement>(null)
    const rightRef = useRef<HTMLDivElement>(null)
    const leftSvgRef = useRef<SVGSVGElement>(null)
    const rightSvgRef = useRef<SVGSVGElement>(null)
    const [ready, setReady] = useState(false)
    const [hovered, setHovered] = useState<number | null>(null)
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const mobileMenuRef = useRef<HTMLDivElement>(null)
    const mobileFilterRef = useRef<SVGSVGElement>(null)

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 10)
        window.addEventListener("scroll", fn, { passive: true })
        return () => window.removeEventListener("scroll", fn)
    }, [])

    const applyMaps = useCallback(() => {
        if (leftRef.current && leftSvgRef.current) {
            const w = leftRef.current.getBoundingClientRect().width
            leftSvgRef.current.querySelectorAll("feImage")
                .forEach((img) => img.setAttribute("href", buildDisplacementUri(w, "hdr-l")))
        }
        if (rightRef.current && rightSvgRef.current) {
            const w = rightRef.current.getBoundingClientRect().width
            rightSvgRef.current.querySelectorAll("feImage")
                .forEach((img) => img.setAttribute("href", buildDisplacementUri(w, "hdr-r")))
        }
        if (mobileMenuRef.current && mobileFilterRef.current) {
            const w = mobileMenuRef.current.getBoundingClientRect().width
            mobileFilterRef.current.querySelectorAll("feImage")
                .forEach((img) => img.setAttribute("href", buildDisplacementUri(w, "hdr-m")))
        }
    }, [])

    useEffect(() => {
        let mounted = true
        const init = async () => {
            try {
                const gsapModule = await import("gsap")
                const gsap = gsapModule.default
                if (!mounted) return
                applyMaps()
                const targets = [leftRef.current, rightRef.current].filter(Boolean)
                gsap.fromTo(targets, { y: -20, opacity: 0 }, {
                    y: 0, opacity: 1, duration: 0.65, ease: "power3.out", delay: 0.2, stagger: 0.06,
                    onComplete: () => { if (mounted) setReady(true) },
                })
            } catch (err) { console.error("Header init error:", err) }
        }
        init()
        return () => { mounted = false }
    }, [applyMaps])

    useEffect(() => {
        const fn = () => applyMaps()
        window.addEventListener("resize", fn)
        return () => window.removeEventListener("resize", fn)
    }, [applyMaps])

    // Close mobile menu when clicking a link
    const handleNavClick = () => setMobileOpen(false)

    const c = GLASS

    return (
        <>
            <div style={{
                position: "fixed", top: "16px", left: 0, right: 0, zIndex: 999998,
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "0 24px", pointerEvents: "none", gap: "16px",
            }}>
                {/* ══ LEFT PILL: Logo + Title ══ */}
                <div ref={leftRef} style={{
                    ...pillStyle(scrolled),
                    display: "flex", alignItems: "center", padding: "0 20px", gap: "10px",
                    opacity: 0, pointerEvents: "auto", flexShrink: 0, cursor: "default",
                    backdropFilter: `url(#hdr-l) brightness(1.12) saturate(${c.saturation})`,
                    WebkitBackdropFilter: `url(#hdr-l) brightness(1.12) saturate(${c.saturation})`,
                }}>
                    {logoSrc ? (
                        <img src={logoSrc} alt={`${title} logo`} draggable={false}
                            style={{ width: "28px", height: "28px", objectFit: "contain", borderRadius: "7px" }} />
                    ) : (
                        <div style={{
                            width: "28px", height: "28px", borderRadius: "8px",
                            background: "linear-gradient(145deg, rgba(100,100,100,0.12) 0%, rgba(160,160,160,0.06) 100%)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            boxShadow: "0 0 0 0.5px rgba(255,255,255,0.2) inset, 0 1px 3px rgba(0,0,0,0.06)",
                            flexShrink: 0,
                        }}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(60,60,60,0.7)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                            </svg>
                        </div>
                    )}
                    <span style={{
                        fontSize: "16px", fontWeight: 600, letterSpacing: "-0.015em",
                        color: "rgba(29,29,31,0.88)", lineHeight: 1, whiteSpace: "nowrap",
                        fontFamily: '-apple-system, "SF Pro Display", "Helvetica Neue", sans-serif',
                    }}>{title}</span>
                    <span style={{
                        padding: "2px 8px", fontSize: "10px", fontWeight: 600,
                        color: "rgba(29,29,31,0.4)", background: "rgba(29,29,31,0.05)",
                        borderRadius: "5px", letterSpacing: "0.02em", lineHeight: 1.2,
                    }}>{version || "v2.0"}</span>
                    <Specular />
                    <GlassFilter id="hdr-l" svgRef={leftSvgRef} />
                </div>

                {/* ══ RIGHT PILL: Nav (desktop) ══ */}
                <div ref={rightRef} className="header-nav-desktop" style={{
                    ...pillStyle(scrolled),
                    display: "flex", alignItems: "center", padding: "0 6px",
                    opacity: 0, pointerEvents: "auto", flexShrink: 0,
                    backdropFilter: `url(#hdr-r) brightness(1.12) saturate(${c.saturation})`,
                    WebkitBackdropFilter: `url(#hdr-r) brightness(1.12) saturate(${c.saturation})`,
                }}>
                    <nav style={{
                        display: "flex", alignItems: "center", gap: "2px",
                        opacity: ready ? 1 : 0, transition: "opacity 0.4s ease-out",
                    }}>
                        {sections.map((s, i) => (
                            <a key={i} href={s.href || "#"} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
                                style={{
                                    fontSize: "13px", fontWeight: 500, letterSpacing: "0.005em",
                                    color: hovered === i ? "rgba(29,29,31,0.95)" : "rgba(29,29,31,0.55)",
                                    fontFamily: '-apple-system, "SF Pro Text", "Helvetica Neue", sans-serif',
                                    textDecoration: "none", padding: "8px 16px", borderRadius: "20px",
                                    background: hovered === i ? "rgba(0,0,0,0.045)" : "transparent",
                                    transition: "color 0.22s ease, background 0.22s ease",
                                    cursor: "pointer", whiteSpace: "nowrap", lineHeight: 1,
                                }}>
                                {s.label}
                            </a>
                        ))}
                    </nav>
                    <Specular />
                    <GlassFilter id="hdr-r" svgRef={rightSvgRef} />
                </div>

                {/* ══ HAMBURGER (mobile) ══ */}
                <button className="header-hamburger" onClick={() => setMobileOpen(!mobileOpen)} style={{
                    ...pillStyle(scrolled),
                    width: `${GLASS.height}px`, display: "none", alignItems: "center", justifyContent: "center",
                    opacity: ready ? 1 : 0, pointerEvents: "auto", border: "none", cursor: "pointer",
                    backdropFilter: `brightness(1.12) saturate(${c.saturation}) blur(40px)`,
                    WebkitBackdropFilter: `brightness(1.12) saturate(${c.saturation}) blur(40px)`,
                }}>
                    <div style={{ width: "18px", display: "flex", flexDirection: "column", gap: mobileOpen ? "0px" : "5px", alignItems: "center", transition: "gap 0.3s ease" }}>
                        <span style={{
                            display: "block", width: "18px", height: "1.5px", background: "rgba(29,29,31,0.7)", borderRadius: "2px",
                            transform: mobileOpen ? "translateY(0.75px) rotate(45deg)" : "none", transition: "transform 0.3s ease",
                        }} />
                        <span style={{
                            display: "block", width: "18px", height: "1.5px", background: "rgba(29,29,31,0.7)", borderRadius: "2px",
                            opacity: mobileOpen ? 0 : 1, transition: "opacity 0.2s ease",
                        }} />
                        <span style={{
                            display: "block", width: "18px", height: "1.5px", background: "rgba(29,29,31,0.7)", borderRadius: "2px",
                            transform: mobileOpen ? "translateY(-0.75px) rotate(-45deg)" : "none", transition: "transform 0.3s ease",
                        }} />
                    </div>
                    <Specular />
                </button>
            </div>

            {/* ══ MOBILE NAV DROPDOWN ══ */}
            {mobileOpen && (
                <div ref={mobileMenuRef} style={{
                    position: "fixed", top: `${16 + GLASS.height + 12}px`, left: "24px", right: "24px",
                    zIndex: 999997,
                    ...pillStyle(scrolled),
                    height: "auto", borderRadius: "20px", padding: "12px 8px",
                    backdropFilter: `url(#hdr-m) brightness(1.12) saturate(${c.saturation}) blur(60px)`,
                    WebkitBackdropFilter: `url(#hdr-m) brightness(1.12) saturate(${c.saturation}) blur(60px)`,
                    opacity: 1,
                    animation: "fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                }}>
                    <nav style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                        {sections.map((s, i) => (
                            <a key={i} href={s.href || "#"} onClick={handleNavClick}
                                style={{
                                    fontSize: "15px", fontWeight: 500, color: "rgba(29,29,31,0.8)",
                                    fontFamily: '-apple-system, "SF Pro Text", sans-serif',
                                    textDecoration: "none", padding: "12px 16px", borderRadius: "14px",
                                    transition: "background 0.2s ease", cursor: "pointer", lineHeight: 1,
                                }}
                                onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,0,0,0.04)")}
                                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                                {s.label}
                            </a>
                        ))}
                    </nav>
                    <Specular />
                    <GlassFilter id="hdr-m" svgRef={mobileFilterRef} />
                </div>
            )}

            {/* Mobile backdrop */}
            {mobileOpen && (
                <div onClick={() => setMobileOpen(false)} style={{
                    position: "fixed", inset: 0, zIndex: 999996,
                    background: "rgba(0,0,0,0.08)", backdropFilter: "blur(2px)",
                }} />
            )}

            {/* Responsive styles */}
            <style>{`
                @media (max-width: 768px) {
                    .header-nav-desktop { display: none !important; }
                    .header-hamburger { display: flex !important; }
                }
            `}</style>
        </>
    )
}
