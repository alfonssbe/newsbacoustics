"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface Logo {
  id: string
  name: string
  svg?: string
  image?: string
  height: string
}

interface ScrollingLogosProps {
  logos: Logo[]
  speed?: "slow" | "normal" | "fast"
  direction?: "left" | "right"
  className?: string
}

const ScrollingLogos: React.FC<ScrollingLogosProps> = ({ logos, speed = "normal", direction = "left", className }) => {
  const speedMap = {
    slow: "30s",
    normal: "20s",
    fast: "10s",
  }

  const animationDirection = direction === "left" ? "reverse" : "normal"

  return (
    <div className="relative">
      <div
        className={cn("group flex overflow-hidden", className)}
        style={
          {
            "--duration": speedMap[speed],
          } as React.CSSProperties
        }
      >
        {/* Animated container with three sets of logos */}
        <div
          className="flex shrink-0 animate-marquee"
          style={{
            animationDirection: animationDirection,
            animationDuration: "var(--duration)",
          }}
        >
          {/* Generate three identical sets for seamless loop */}
          {[...Array(3)].map((_, setIndex) => (
            <div key={`set-${setIndex}`} className="flex shrink-0">
              {logos.map((logo) => (
                <div key={`${setIndex}-${logo.id}`} className="mx-8 flex items-center whitespace-nowrap">
                  {logo.svg ? (
                    <div className={cn("fill-current", logo.height)} dangerouslySetInnerHTML={{ __html: logo.svg }} />
                  ) : logo.image ? (
                    <img src={logo.image.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${logo.image}` : logo.image || "/placeholder.svg"} alt={logo.name} className={logo.height} />
                  ) : null}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Gradient fade overlays */}
      {/* <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-linear-to-r from-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-linear-to-l from-transparent to-transparent" /> */}
    </div>
  )
}

export default ScrollingLogos
