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
    // ── Step 1: Start GPS immediately — parallel with script loading ──
    let gpsCoords: { lat: number; lng: number; accuracy: number } | null = null
    let mapReady = false

    const tryBuildMap = () => {
      if (mapReady && gpsCoords) {
        buildMap(gpsCoords.lat, gpsCoords.lng, gpsCoords.accuracy)
      }
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          gpsCoords = { lat: coords.latitude, lng: coords.longitude, accuracy: coords.accuracy }
          setLocationInfo(`±${Math.round(coords.accuracy)}m accuracy`)
          tryBuildMap()
        },
        () => {
          gpsCoords = { lat: 41.3851, lng: 2.1734, accuracy: 9999 }
          setLocationInfo('Location denied — showing default')
          tryBuildMap()
        },
        // maximumAge:60000 = accept cached fix up to 60s old → instant if browser has recent fix
        // enableHighAccuracy:false = uses WiFi/cell, much faster than waiting for GPS chip
        { timeout: 8000, enableHighAccuracy: false, maximumAge: 60000 }
      )
    } else {
      gpsCoords = { lat: 41.3851, lng: 2.1734, accuracy: 9999 }
      setLocationInfo('GPS unavailable — showing default')
    }

    // ── Step 2: Load Leaflet CSS ──
    if (!document.querySelector('#leaflet-css')) {
      const link = document.createElement('link')
      link.id = 'leaflet-css'
      link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      document.head.appendChild(link)
    }

    // ── Step 3: Load Leaflet JS — map builds as soon as BOTH GPS + script are ready ──
    if (window.L) {
      mapReady = true
      tryBuildMap()
    } else {
      const script = document.createElement('script')
      script.id = 'leaflet-js'
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
      script.async = true
      script.onload = () => {
        mapReady = true
        tryBuildMap()
      }
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

    // NO accuracy circle — RadarOrb React component handles all visual rings
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
