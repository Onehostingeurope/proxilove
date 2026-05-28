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

    // CartoDB Dark Matter — clear, free, no API key
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 20,
      subdomains: 'abcd',
    }).addTo(map)

    // Pulsing YOU marker
    const youIcon = L.divIcon({
      html: `
        <div style="position:relative;width:70px;height:70px;display:flex;align-items:center;justify-content:center;">
          <div style="position:absolute;width:70px;height:70px;border-radius:50%;
            border:1.5px solid rgba(0,240,255,0.4);
            animation:r1 2s ease-out infinite;"></div>
          <div style="position:absolute;width:46px;height:46px;border-radius:50%;
            border:1.5px solid rgba(0,240,255,0.6);
            animation:r1 2s ease-out 0.5s infinite;"></div>
          <div style="position:absolute;width:26px;height:26px;border-radius:50%;
            background:rgba(0,240,255,0.2);border:2px solid #00F0FF;
            box-shadow:0 0 24px rgba(0,240,255,1),0 0 48px rgba(0,240,255,0.5);"></div>
          <div style="position:absolute;width:10px;height:10px;border-radius:50%;
            background:#00F0FF;box-shadow:0 0 16px #00F0FF;"></div>
          <div style="position:absolute;top:72px;left:50%;transform:translateX(-50%);
            background:rgba(0,240,255,0.15);border:1px solid rgba(0,240,255,0.6);
            border-radius:6px;padding:3px 10px;white-space:nowrap;
            font-family:Inter,sans-serif;font-size:11px;font-weight:800;
            color:#00F0FF;letter-spacing:0.1em;text-shadow:0 0 8px #00F0FF;">YOU</div>
        </div>
        <style>
          @keyframes r1{0%{transform:scale(0.5);opacity:1}100%{transform:scale(1.5);opacity:0}}
        </style>
      `,
      className: '',
      iconSize: [70, 70],
      iconAnchor: [35, 35],
    })

    L.marker([lat, lng], { icon: youIcon }).addTo(map)

    // Accuracy circle
    L.circle([lat, lng], {
      radius: 80,
      color: '#00F0FF',
      fillColor: '#00F0FF',
      fillOpacity: 0.05,
      weight: 1.5,
      opacity: 0.4,
      dashArray: '6 8',
    }).addTo(map)
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

      {/* The actual map — full brightness, no filter */}
      <div
        ref={mapRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
        }}
      />

      {/* Only darken the BOTTOM 40% so text is readable, map stays visible */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background:
            'linear-gradient(to bottom, rgba(10,15,36,0.35) 0%, rgba(10,15,36,0.2) 30%, rgba(10,15,36,0.6) 60%, rgba(10,15,36,0.97) 100%)',
          pointerEvents: 'none',
        }}
      />
    </>
  )
}
