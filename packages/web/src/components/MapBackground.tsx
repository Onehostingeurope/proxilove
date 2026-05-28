'use client'

import { useEffect, useRef } from 'react'

interface NearbyUser {
  name: string
  age: number
  distance: string
  color: string
  offsetLat: number
  offsetLng: number
}

const NEARBY_USERS: NearbyUser[] = [
  { name: 'Sarah', age: 24, distance: '12m', color: '#FF6B9D', offsetLat: 0.00011, offsetLng: 0.00014 },
  { name: 'Mike', age: 29, distance: '8m',  color: '#4FACFE', offsetLat: -0.00008, offsetLng: 0.00018 },
  { name: 'Jess', age: 27, distance: '20m', color: '#43E97B', offsetLat: 0.00019, offsetLng: -0.00012 },
  { name: 'Alex', age: 31, distance: '5m',  color: '#FA709A', offsetLat: -0.00015, offsetLng: -0.00009 },
  { name: 'Kai',  age: 26, distance: '35m', color: '#A18CD1', offsetLat: 0.00032,  offsetLng: 0.00025 },
  { name: 'Mia',  age: 23, distance: '28m', color: '#FEE140', offsetLat: -0.00028, offsetLng: 0.00031 },
]

declare global {
  interface Window {
    L: any
  }
}

export default function MapBackground() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)

  useEffect(() => {
    // Load Leaflet CSS
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
    document.head.appendChild(link)

    // Load Leaflet JS
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
    script.async = true
    document.head.appendChild(script)

    script.onload = () => {
      initMap()
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  const initMap = (lat = 48.8566, lng = 2.3522) => {
    if (!mapRef.current || mapInstanceRef.current) return
    const L = window.L

    const map = L.map(mapRef.current, {
      center: [lat, lng],
      zoom: 17,
      zoomControl: false,
      attributionControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      touchZoom: false,
    })

    mapInstanceRef.current = map

    // Dark CartoDB tiles — free, no API key
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 20,
    }).addTo(map)

    // YOU marker
    const youIcon = L.divIcon({
      html: `
        <div style="position:relative;width:40px;height:40px;display:flex;align-items:center;justify-content:center;">
          <div style="position:absolute;width:40px;height:40px;border-radius:50%;background:rgba(0,240,255,0.15);border:2px solid rgba(0,240,255,0.6);animation:ping 1.8s ease-in-out infinite;"></div>
          <div style="position:absolute;width:24px;height:24px;border-radius:50%;background:rgba(0,240,255,0.25);border:2px solid #00F0FF;box-shadow:0 0 16px rgba(0,240,255,0.8);"></div>
          <div style="position:absolute;width:10px;height:10px;border-radius:50%;background:#00F0FF;box-shadow:0 0 8px #00F0FF;"></div>
        </div>
        <style>@keyframes ping{0%,100%{transform:scale(1);opacity:0.8}50%{transform:scale(1.8);opacity:0}}</style>
      `,
      className: '',
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    })
    L.marker([lat, lng], { icon: youIcon }).addTo(map)

    // Nearby user markers
    NEARBY_USERS.forEach((user) => {
      const userLat = lat + user.offsetLat
      const userLng = lng + user.offsetLng

      const userIcon = L.divIcon({
        html: `
          <div style="position:relative;display:flex;flex-direction:column;align-items:center;gap:3px;cursor:pointer;">
            <div style="position:relative;">
              <div style="position:absolute;inset:-4px;border-radius:50%;background:${user.color}22;animation:pulse2 2s ease-in-out infinite;"></div>
              <div style="width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,${user.color},${user.color}aa);border:2px solid ${user.color};box-shadow:0 0 12px ${user.color}88;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;color:white;font-family:Inter,sans-serif;">
                ${user.name[0]}
              </div>
            </div>
            <div style="background:rgba(10,15,36,0.9);border:1px solid ${user.color}55;border-radius:8px;padding:2px 7px;white-space:nowrap;backdrop-filter:blur(8px);">
              <span style="color:white;font-size:10px;font-weight:600;font-family:Inter,sans-serif;">${user.name}, ${user.age}</span>
              <span style="color:${user.color};font-size:9px;font-family:monospace;margin-left:4px;">${user.distance}</span>
            </div>
          </div>
          <style>@keyframes pulse2{0%,100%{transform:scale(1);opacity:0.5}50%{transform:scale(1.6);opacity:0}}</style>
        `,
        className: '',
        iconSize: [60, 60],
        iconAnchor: [30, 48],
      })

      L.marker([userLat, userLng], { icon: userIcon }).addTo(map)

      // Draw distance line
      L.polyline([[lat, lng], [userLat, userLng]], {
        color: user.color,
        weight: 1,
        opacity: 0.25,
        dashArray: '4 6',
      }).addTo(map)
    })

    // Try to get real geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords
          map.setView([latitude, longitude], 17)

          // Re-center all markers to real location
          map.eachLayer((layer: any) => {
            if (layer instanceof window.L.Marker || layer instanceof window.L.Polyline) {
              map.removeLayer(layer)
            }
          })

          // Re-add YOU marker at real location
          L.marker([latitude, longitude], { icon: youIcon }).addTo(map)

          // Re-add nearby users
          NEARBY_USERS.forEach((user) => {
            const uLat = latitude + user.offsetLat
            const uLng = longitude + user.offsetLng

            const uIcon = L.divIcon({
              html: `
                <div style="position:relative;display:flex;flex-direction:column;align-items:center;gap:3px;cursor:pointer;">
                  <div style="position:relative;">
                    <div style="position:absolute;inset:-4px;border-radius:50%;background:${user.color}22;animation:pulse2 2s ease-in-out infinite;"></div>
                    <div style="width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,${user.color},${user.color}aa);border:2px solid ${user.color};box-shadow:0 0 12px ${user.color}88;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;color:white;font-family:Inter,sans-serif;">
                      ${user.name[0]}
                    </div>
                  </div>
                  <div style="background:rgba(10,15,36,0.9);border:1px solid ${user.color}55;border-radius:8px;padding:2px 7px;white-space:nowrap;backdrop-filter:blur(8px);">
                    <span style="color:white;font-size:10px;font-weight:600;font-family:Inter,sans-serif;">${user.name}, ${user.age}</span>
                    <span style="color:${user.color};font-size:9px;font-family:monospace;margin-left:4px;">${user.distance}</span>
                  </div>
                </div>
              `,
              className: '',
              iconSize: [60, 60],
              iconAnchor: [30, 48],
            })

            L.marker([uLat, uLng], { icon: uIcon }).addTo(map)

            L.polyline([[latitude, longitude], [uLat, uLng]], {
              color: user.color,
              weight: 1,
              opacity: 0.25,
              dashArray: '4 6',
            }).addTo(map)
          })
        },
        () => {
          // Permission denied — keep default Paris coords
        },
        { timeout: 5000, enableHighAccuracy: true }
      )
    }
  }

  return (
    <div
      ref={mapRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        filter: 'brightness(0.55) saturate(1.2)',
      }}
    />
  )
}
