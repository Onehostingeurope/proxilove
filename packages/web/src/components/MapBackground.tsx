'use client'

import { useEffect, useRef } from 'react'

declare global {
  interface Window { L: any }
}

export default function MapBackground() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)

  useEffect(() => {
    if (!document.querySelector('#leaflet-css')) {
      const link = document.createElement('link')
      link.id = 'leaflet-css'
      link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      document.head.appendChild(link)
    }

    if (window.L) { initMap(); return }

    const script = document.createElement('script')
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
    script.async = true
    script.onload = () => initMap()
    document.head.appendChild(script)

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  const buildMap = (lat: number, lng: number) => {
    if (!mapRef.current || mapInstanceRef.current) return
    const L = window.L

    const map = L.map(mapRef.current, {
      center: [lat, lng],
      zoom: 16,
      zoomControl: false,
      attributionControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      touchZoom: false,
      keyboard: false,
    })
    mapInstanceRef.current = map

    // CartoDB Dark Matter tiles — clean, dark, free
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 20,
      subdomains: 'abcd',
    }).addTo(map)

    // NO markers — the RadarOrb React component IS the YOU indicator
    // Map just provides real-location context beneath it
  }

  const initMap = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => buildMap(coords.latitude, coords.longitude),
        ()           => buildMap(41.3851, 2.1734),
        { timeout: 6000, enableHighAccuracy: true }
      )
    } else {
      buildMap(41.3851, 2.1734)
    }
  }

  return (
    <>
      <style>{`
        .leaflet-container { background: #0A0F24 !important; }
      `}</style>

      {/* Real map — no CSS filter, full clarity */}
      <div
        ref={mapRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
        }}
      />

      {/* Gradient: transparent top (map visible) → dark bottom (text readable) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background:
            'linear-gradient(to bottom, rgba(10,15,36,0.3) 0%, rgba(10,15,36,0.1) 25%, rgba(10,15,36,0.4) 55%, rgba(10,15,36,0.95) 100%)',
          pointerEvents: 'none',
        }}
      />
    </>
  )
}
