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

    // CartoDB Dark Matter — free, no API key
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 20,
      subdomains: 'abcd',
    }).addTo(map)

    // Pulsing YOU marker
    const youIcon = L.divIcon({
      html: `
        <div style="position:relative;width:60px;height:60px;display:flex;align-items:center;justify-content:center;">
          <div style="position:absolute;width:60px;height:60px;border-radius:50%;
            background:rgba(0,240,255,0.08);border:1.5px solid rgba(0,240,255,0.3);
            animation:ring1 2.4s ease-out infinite;"></div>
          <div style="position:absolute;width:40px;height:40px;border-radius:50%;
            background:rgba(0,240,255,0.12);border:1.5px solid rgba(0,240,255,0.5);
            animation:ring1 2.4s ease-out 0.6s infinite;"></div>
          <div style="position:absolute;width:22px;height:22px;border-radius:50%;
            background:rgba(0,240,255,0.25);border:2px solid #00F0FF;
            box-shadow:0 0 20px rgba(0,240,255,0.9),0 0 40px rgba(0,240,255,0.4);"></div>
          <div style="position:absolute;width:8px;height:8px;border-radius:50%;
            background:#00F0FF;box-shadow:0 0 12px #00F0FF,0 0 24px #00F0FF;"></div>
          <div style="position:absolute;bottom:-22px;left:50%;transform:translateX(-50%);
            background:rgba(10,15,36,0.85);border:1px solid rgba(0,240,255,0.4);
            border-radius:6px;padding:2px 8px;white-space:nowrap;
            font-family:Inter,sans-serif;font-size:10px;font-weight:700;
            color:#00F0FF;letter-spacing:0.06em;">YOU</div>
        </div>
        <style>
          @keyframes ring1{0%{transform:scale(0.6);opacity:0.8}100%{transform:scale(1.8);opacity:0}}
        </style>
      `,
      className: '',
      iconSize: [60, 60],
      iconAnchor: [30, 30],
    })

    L.marker([lat, lng], { icon: youIcon }).addTo(map)

    // Accuracy circle around user
    L.circle([lat, lng], {
      radius: 50,
      color: '#00F0FF',
      fillColor: '#00F0FF',
      fillOpacity: 0.04,
      weight: 1,
      opacity: 0.3,
      dashArray: '6 8',
    }).addTo(map)
  }

  const initMap = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => buildMap(coords.latitude, coords.longitude),
        ()           => buildMap(41.3851, 2.1734), // Barcelona fallback
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
      <div
        ref={mapRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          filter: 'brightness(0.55) saturate(0.8) hue-rotate(185deg)',
        }}
      />
    </>
  )
}
