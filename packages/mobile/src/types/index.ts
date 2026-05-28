export interface Profile {
  id: string
  name: string
  age: number
  bio: string
  location: string
  distance_meters: number
  avatar_url: string | null
  interests: string[]
  is_locked: boolean
  is_online: boolean
  created_at: string
  updated_at: string
}

export interface Match {
  id: string
  user_id: string
  matched_user_id: string
  status: 'pending' | 'accepted' | 'declined' | 'severed'
  created_at: string
  updated_at: string
  profile?: Profile
}

export interface Message {
  id: string
  match_id: string
  sender_id: string
  text: string
  created_at: string
  is_read: boolean
}

export interface Flag {
  id: string
  reporter_id: string
  reported_user_id: string
  reason: 'harassment' | 'inappropriate_content' | 'spam' | 'fake_profile' | 'other'
  description?: string
  created_at: string
}

export interface StitchRequest {
  id: string
  from_user_id: string
  to_user_id: string
  distance_at_request: number
  status: 'pending' | 'accepted' | 'declined'
  created_at: string
  from_profile?: Profile
}

export interface RadarSignal {
  profile_id: string
  name: string
  age: number
  distance_meters: number
  bearing_degrees: number
  is_locked: boolean
  last_seen: string
}

export interface UserSession {
  user_id: string
  email: string
  is_premium: boolean
  premium_expires_at: string | null
  is_stealth: boolean
  radar_active: boolean
}
