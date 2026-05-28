import { useState } from 'react'
import UserTable from '../components/UserTable'
import ModerationPanel from '../components/ModerationPanel'
import { Profile } from '../types'

const MOCK_USERS: Profile[] = [
  {
    id: '1',
    username: 'usr_00421',
    display_name: 'Alex K.',
    age: 28,
    bio: 'Surfer, beach lover.',
    location: 'Bondi Beach, AU',
    bluetooth_token: 'BT-7f4a2c',
    is_premium: true,
    flag_count: 0,
    status: 'active',
    created_at: '2026-01-10T10:00:00Z',
  },
  {
    id: '2',
    username: 'usr_00389',
    display_name: 'Sam R.',
    age: 32,
    bio: 'Coffee addict.',
    location: 'Santa Monica, US',
    bluetooth_token: 'BT-3d9b1e',
    is_premium: false,
    flag_count: 2,
    status: 'active',
    created_at: '2026-02-14T09:30:00Z',
  },
  {
    id: '3',
    username: 'usr_00156',
    display_name: 'Mia T.',
    age: 25,
    bio: 'Adventure seeker.',
    location: 'Barcelona, ES',
    bluetooth_token: 'BT-8a5f3d',
    is_premium: true,
    flag_count: 0,
    status: 'active',
    created_at: '2026-03-01T14:00:00Z',
  },
  {
    id: '4',
    username: 'usr_00734',
    display_name: 'Jake M.',
    age: 28,
    bio: 'Looking for connections nearby...',
    location: 'Bondi Beach, AU',
    bluetooth_token: 'BT-2c8e4f',
    is_premium: false,
    flag_count: 5,
    status: 'active',
    created_at: '2026-01-20T08:00:00Z',
  },
  {
    id: '5',
    username: 'usr_00892',
    display_name: 'Priya N.',
    age: 30,
    bio: 'Yoga and sunsets.',
    location: 'Copacabana, BR',
    bluetooth_token: 'BT-6d1a7b',
    is_premium: false,
    flag_count: 1,
    status: 'active',
    created_at: '2026-04-05T11:00:00Z',
  },
]

export default function Users() {
  const [selectedUser, setSelectedUser] = useState<Profile>(MOCK_USERS[3])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', height: '100%' }}>
      <header>
        <h1 style={{ fontSize: '32px', fontWeight: 700, color: 'var(--color-text)', marginBottom: '4px' }}>
          User Management
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '16px' }}>
          Monitor, moderate, and manage user accounts and proximity tokens.
        </p>
      </header>

      <UserTable
        users={MOCK_USERS}
        onSelect={setSelectedUser}
        selectedId={selectedUser?.id}
      />

      <ModerationPanel user={selectedUser} />
    </div>
  )
}
