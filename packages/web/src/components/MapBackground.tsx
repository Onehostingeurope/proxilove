'use client'

import { useEffect, useRef } from 'react'

declare global {
  interface Window { L: any }
}

export default function MapBackground() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)

  useEffect(() => {
    // Load Leaflet CSS
    if (!document.querySelector('#leaflet-css')) {
      const link = document.createElement('link')
      link.id = 'leaflet-css'
      link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      document.head.appendChild(link)
    }

    // Load Leaflet JS
    if (window.L) {
      initMap()
      return
    }

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
      zoom: 14,
      zoomControl: false,
      attributionControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      touchZoom: false,
      keyboard: false,
    })

    mapInstanceRef.current = map

    // CartoDB Dark Matter — free, no API key, beautiful dark tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 20,
      subdomains: 'abcd',
    }).addTo(map)

    // NO markers — the React ProfileCapsule components handle that
  }

  const initMap = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => buildMap(coords.latitude, coords.longitude),
        ()           => buildMap(41.3851, 2.1734), // Barcelona fallback
        { timeout: 4000, enableHighAccuracy: false }
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
      <div
        ref={mapRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          // Very dark — street grid barely visible, just enough texture
          filter: 'brightness(0.28) saturate(0.6) hue-rotate(180deg)',
        }}
      />
    </>
  )
}
