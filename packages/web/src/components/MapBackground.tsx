'use client'

import { useEffect, useRef, useState } from 'react'

declare global {
  interface Window { L: any }
}

export default function MapBackground() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const [locationInfo, setLocationInfo] = useState<string>('Locating…')

  useEffect(() => {
    // Load Leaflet CSS
    if (!document.querySelector('#leaflet-css')) {
      const link = document.createElement('link')
      link.id = 'leaflet-css'
      link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      document.head.appendChild(link)
    }

    // Load Leaflet JS then get position
    const loadLeafletAndInit = () => {
      // Always get position first, THEN build map — never build with fallback first
      if (!navigator.geolocation) {
        setLocationInfo('GPS unavailable — showing default')
        buildMap(41.3851, 2.1734, 9999)
        return
      }

      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const { latitude, longitude, accuracy } = coords
          setLocationInfo(`±${Math.round(accuracy)}m accuracy`)
          buildMap(latitude, longitude, accuracy)
        },
        (err) => {
          setLocationInfo('Location denied — showing default')
          buildMap(41.3851, 2.1734, 9999)
        },
        { timeout: 10000, enableHighAccuracy: true, maximumAge: 0 }
      )
    }

    if (window.L) {
      loadLeafletAndInit()
    } else {
      const script = document.createElement('script')
      script.id = 'leaflet-js'
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
      script.async = true
      script.onload = loadLeafletAndInit
      document.head.appendChild(script)
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  const buildMap = (lat: number, lng: number, accuracy: number) => {
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

    // CartoDB Dark Matter — free, no API key
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 20,
      subdomains: 'abcd',
    }).addTo(map)

    // Pan map DOWN so the GPS center sits at top:38% of viewport
    // (radar is at top:38%, map center is at top:50%, difference = 12% of viewport height)
    map.whenReady(() => {
      const offsetPx = Math.round(window.innerHeight * 0.12)
      map.panBy([0, offsetPx], { animate: false })
    })

    // Accuracy circle
    if (accuracy < 500) {
      L.circle([lat, lng], {
        radius: accuracy,
        color: '#00F0FF',
        fillColor: '#00F0FF',
        fillOpacity: 0.04,
        weight: 1,
        opacity: 0.35,
        dashArray: '5 8',
      }).addTo(map)
    }
  }

  return (
    <>
      <style>{`
        .leaflet-container { background: #0A0F24 !important; }
      `}</style>

      {/* Map tiles — brightness boosted for visibility */}
      <div
        ref={mapRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          filter: 'brightness(2.5) contrast(0.85) saturate(0.7)',
        }}
      />

      {/* Gradient: fully transparent at top → dark at bottom for text */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background:
            'linear-gradient(to bottom, rgba(10,15,36,0.0) 0%, rgba(10,15,36,0.05) 30%, rgba(10,15,36,0.5) 60%, rgba(10,15,36,0.96) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* GPS accuracy badge — bottom left */}
      <div
        style={{
          position: 'absolute',
          bottom: 16,
          left: 16,
          zIndex: 20,
          background: 'rgba(10,15,36,0.75)',
          border: '1px solid rgba(0,240,255,0.3)',
          borderRadius: 8,
          padding: '4px 10px',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          backdropFilter: 'blur(8px)',
          pointerEvents: 'none',
        }}
      >
        <div style={{
          width: 6, height: 6, borderRadius: '50%',
          background: locationInfo.includes('denied') || locationInfo.includes('unavailable')
            ? '#FF5A5F' : '#00E676',
          boxShadow: `0 0 6px ${locationInfo.includes('denied') ? '#FF5A5F' : '#00E676'}`,
        }} />
        <span style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 11,
          fontWeight: 600,
          color: 'rgba(255,255,255,0.7)',
          letterSpacing: '0.04em',
        }}>
          📍 {locationInfo}
        </span>
      </div>
    </>
  )
}
