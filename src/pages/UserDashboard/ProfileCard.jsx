import { Mail, UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/common'
import { useAuth } from '../../context/AuthContext'

function ProfileCard() {
  const { currentUser } = useAuth()

  return (
    <div className="rounded-2xl border border-brand-secondary/15 bg-brand-surface p-6 shadow-sm">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-primary text-2xl font-bold text-white">
            {(
              currentUser?.displayName ||
              currentUser?.email ||
              'A'
            )
              .charAt(0)
              .toUpperCase()}
          </div>

          <div>
            <p className="text-xl font-bold text-brand-primary">
              {currentUser?.displayName || 'AcharBari customer'}
            </p>

            <div className="mt-2 flex items-center gap-2 text-sm text-brand-muted">
              <Mail size={16} aria-hidden="true" />
              {currentUser?.email}
            </div>
          </div>
        </div>

        <Link to="/dashboard/profile">
          <Button variant="outline">
            <UserRound size={17} aria-hidden="true" />
            Edit Profile
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default ProfileCard
