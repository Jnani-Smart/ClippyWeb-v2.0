"use client"

import { useEffect, useRef, useState } from "react"

interface LiquidGlassDockProps {
    icons?: { src: string; label: string }[]
    position?: "bottom" | "top"
    className?: string
}

const DEFAULT_ICONS = [
    { src: "https://assets.codepen.io/605876/finder.png", label: "Finder" },
    { src: "https://assets.codepen.io/605876/safari.png", label: "Safari" },
    { src: "https://assets.codepen.io/605876/launch-control.png", label: "Launchpad" },
    { src: "https://assets.codepen.io/605876/calendar.png", label: "Calendar" },
    { src: "https://assets.codepen.io/605876/photos.png", label: "Photos" },
    { src: "https://assets.codepen.io/605876/spotify.png", label: "Spotify" },
    { src: "https://assets.codepen.io/605876/cursor.png", label: "Cursor" },
    { src: "https://assets.codepen.io/605876/raycast.png", label: "Raycast" },
]

const DOCK_CONFIG = {
    height: 96,
    radius: 22,
    border: 0.07,
    lightness: 50,
    alpha: 0.93,
    blur: 11,
    frost: 0.05,
    scale: -180,
    saturation: 1.5,
    blend: "difference",
    x: "R",
    y: "B",
    r: 0,
    g: 10,
    b: 20,
    displace: 0.2,
}

export function LiquidGlassDock({
    icons = DEFAULT_ICONS,
    position = "bottom",
    className = "",
}: LiquidGlassDockProps) {
    const effectRef = useRef<HTMLDivElement>(null)
    const filterRef = useRef<SVGSVGElement>(null)
    const [ready, setReady] = useState(false)
    const draggableInstanceRef = useRef<any[]>([])

    const dockWidth = 96 + icons.length * 72

    // Build SVG displacement map image
    const buildDisplacementDataUri = () => {
        const config = DOCK_CONFIG
        const width = dockWidth
        const height = config.height
        const border = Math.min(width, height) * (config.border * 0.5)

        const svgMarkup = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="dock-red" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stop-color="#000"/>
          <stop offset="100%" stop-color="red"/>
        </linearGradient>
        <linearGradient id="dock-blue" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#000"/>
          <stop offset="100%" stop-color="blue"/>
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="${width}" height="${height}" fill="black"/>
      <rect x="0" y="0" width="${width}" height="${height}" rx="${config.radius}" fill="url(#dock-red)"/>
      <rect x="0" y="0" width="${width}" height="${height}" rx="${config.radius}" fill="url(#dock-blue)" style="mix-blend-mode:${config.blend}"/>
      <rect x="${border}" y="${border}" width="${width - border * 2}" height="${height - border * 2}" rx="${config.radius}" fill="hsl(0 0% ${config.lightness}% / ${config.alpha})" style="filter:blur(${config.blur}px)"/>
    </svg>`

        return `data:image/svg+xml,${encodeURIComponent(svgMarkup)}`
    }

    useEffect(() => {
        let mounted = true

        const init = async () => {
            try {
                const gsapModule = await import("gsap")
                const gsap = gsapModule.default
                const DraggableModule = await import("gsap/Draggable" as string)
                const Draggable = DraggableModule.Draggable || DraggableModule.default
                gsap.registerPlugin(Draggable)

                if (!mounted || !effectRef.current || !filterRef.current) return

                const el = effectRef.current
                const config = DOCK_CONFIG
                const width = dockWidth

                // Set the displacement image on SVG feImage
                const dataUri = buildDisplacementDataUri()
                const feImages = filterRef.current.querySelectorAll("feImage")
                feImages.forEach((img) => img.setAttribute("href", dataUri))

                // Position the dock initially using top/left (NOT transforms)
                const vw = window.innerWidth
                const vh = window.innerHeight
                gsap.set(el, {
                    top: position === "bottom" ? vh - config.height - 40 : 40,
                    left: (vw - width) / 2,
                    opacity: 0,
                })

                // Create Draggable — completely free, no bounds
                draggableInstanceRef.current = Draggable.create(el, {
                    type: "x,y",
                    // No bounds = totally free dragging
                    cursor: "grab",
                    activeCursor: "grabbing",
                    zIndexBoost: false,
                })

                // Animate in
                gsap.to(el, {
                    opacity: 1,
                    duration: 0.6,
                    ease: "power2.out",
                    delay: 1.0,
                    onComplete: () => {
                        if (mounted) setReady(true)
                    },
                })
            } catch (err) {
                console.error("Failed to init liquid glass dock:", err)
            }
        }

        init()

        return () => {
            mounted = false
            draggableInstanceRef.current.forEach((d: any) => d?.kill?.())
            draggableInstanceRef.current = []
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Re-center on resize (debounced)
    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>
        const handleResize = () => {
            clearTimeout(timer)
            timer = setTimeout(() => {
                if (!effectRef.current) return
                draggableInstanceRef.current.forEach((d: any) => {
                    if (d) d.update()
                })
            }, 150)
        }
        window.addEventListener("resize", handleResize, { passive: true })
        return () => {
            clearTimeout(timer)
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    const config = DOCK_CONFIG

    return (
        <div
            ref={effectRef}
            className={`liquid-glass-dock-effect ${className}`}
            style={{
                position: "fixed",
                zIndex: 999999,
                width: `${dockWidth}px`,
                height: `${config.height}px`,
                borderRadius: `${config.radius}px`,
                opacity: 0,
                // Glass background
                background: `hsl(0 0% 100% / ${config.frost})`,
                backdropFilter: `url(#dock-filter) brightness(1.1) saturate(${config.saturation})`,
                WebkitBackdropFilter: `url(#dock-filter) brightness(1.1) saturate(${config.saturation})`,
                boxShadow: `
          0 0 2px 1px rgba(0, 0, 0, 0.12) inset,
          0 0 10px 4px rgba(0, 0, 0, 0.06) inset,
          0px 4px 16px rgba(17, 17, 26, 0.06),
          0px 8px 24px rgba(17, 17, 26, 0.06),
          0px 16px 56px rgba(17, 17, 26, 0.06),
          0px 4px 16px rgba(17, 17, 26, 0.04) inset,
          0px 8px 24px rgba(17, 17, 26, 0.04) inset,
          0px 16px 56px rgba(17, 17, 26, 0.04) inset
        `,
                touchAction: "none",
                userSelect: "none",
            }}
        >
            {/* Nav icons wrap — overflow hidden with inherited border radius */}
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    borderRadius: "inherit",
                    pointerEvents: "none",
                }}
            >
                <nav
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "4px",
                        padding: "8px 16px",
                        opacity: ready ? 1 : 0,
                        transition: "opacity 0.4s ease-out",
                        overflow: "hidden",
                        borderRadius: "inherit",
                        pointerEvents: "none",
                    }}
                >
                    {icons.map((icon, idx) => (
                        <div
                            key={idx}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                pointerEvents: "none",
                            }}
                        >
                            <img
                                src={icon.src}
                                alt={icon.label}
                                style={{
                                    width: "64px",
                                    height: "64px",
                                    objectFit: "contain",
                                    pointerEvents: "none",
                                    borderRadius: "12px",
                                }}
                                draggable={false}
                            />
                        </div>
                    ))}
                </nav>
            </div>

            {/* SVG Filter for glass displacement effect */}
            <svg
                ref={filterRef}
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none",
                    position: "absolute",
                    inset: 0,
                }}
            >
                <defs>
                    <filter id="dock-filter" colorInterpolationFilters="sRGB">
                        <feImage x="0" y="0" width="100%" height="100%" result="map" />
                        {/* RED channel — strongest displacement */}
                        <feDisplacementMap
                            in="SourceGraphic"
                            in2="map"
                            id="dock-redchannel"
                            xChannelSelector="R"
                            yChannelSelector="G"
                            scale={config.scale + config.r}
                            result="dispRed"
                        />
                        <feColorMatrix
                            in="dispRed"
                            type="matrix"
                            values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
                            result="red"
                        />
                        {/* GREEN channel */}
                        <feDisplacementMap
                            in="SourceGraphic"
                            in2="map"
                            id="dock-greenchannel"
                            xChannelSelector="R"
                            yChannelSelector="G"
                            scale={config.scale + config.g}
                            result="dispGreen"
                        />
                        <feColorMatrix
                            in="dispGreen"
                            type="matrix"
                            values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
                            result="green"
                        />
                        {/* BLUE channel — medium displacement */}
                        <feDisplacementMap
                            in="SourceGraphic"
                            in2="map"
                            id="dock-bluechannel"
                            xChannelSelector="R"
                            yChannelSelector="G"
                            scale={config.scale + config.b}
                            result="dispBlue"
                        />
                        <feColorMatrix
                            in="dispBlue"
                            type="matrix"
                            values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
                            result="blue"
                        />
                        {/* Blend channels together */}
                        <feBlend in="red" in2="green" mode="screen" result="rg" />
                        <feBlend in="rg" in2="blue" mode="screen" result="output" />
                        <feGaussianBlur in="output" stdDeviation={config.displace} />
                    </filter>
                </defs>
            </svg>
        </div>
    )
}
