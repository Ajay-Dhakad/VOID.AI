"use client"

import { memo } from "react"

const FloatingParticles = memo(() => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23e2e8f0' fillOpacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10 10-4.5 10-10 10-10-4.5-10-10 4.5-10 10-10 10 4.5 10 10z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
})

FloatingParticles.displayName = "FloatingParticles"

export { FloatingParticles }
