export interface Profile {
  id: string
  username: string
  display_name: string
  age: number
  bio: string
  location: string
  is_premium: boolean
  bluetooth_token: string
  flag_count: number
  created_at: string
  status: 'active' | 'suspended' | 'banned'
}

export interface Flag {
  id: string
  reporter_id: string
  reported_id: string
  reason: string
  created_at: string
}

export interface Hotspot {
  id: string
  name: string
  location: string
  active_radars: number
  premium_users: number
  peak_hour: string
  status: 'live' | 'low' | 'offline'
}

export interface KPIData {
  total_active_radars: number
  premium_conversions: number
  premium_goal: number
  open_handshakes: number
}
