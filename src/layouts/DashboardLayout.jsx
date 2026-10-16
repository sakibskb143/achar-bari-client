import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  Heart,
  LogOut,
  MapPin,
  Package,
  UserRound,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { Button } from '../components/common'

const dashboardLinks = [
  {
    label: 'Overview',
    path: '/dashboard',
    icon: UserRound,
    end: true,
  },
  {
    label: 'My Orders',
    path: '/dashboard/orders',
    icon: Package,
  },
  {
    label: 'Wishlist',
    path: '/dashboard/wishlist',
    icon: Heart,
  },
  {
    label: 'Saved Addresses',
    path: '/dashboard/addresses',
    icon: MapPin,
  },
]

function DashboardLayout() {
  const navigate = useNavigate()
  const { currentUser, logoutUser } = useAuth()

  const handleLogout = async () => {
    await logoutUser()
    navigate('/login', { replace: true })
  }

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-secondary">
            My Account
          </p>

          <h1 className="mt-2 text-3xl font-bold text-brand-primary sm:text-4xl">
            Welcome, {currentUser?.displayName || 'AcharBari customer'}
          </h1>

          <p className="mt-3 text-brand-muted">
            Manage your profile, orders, wishlist, and saved addresses.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[250px_1fr]">
          <aside className="h-fit rounded-2xl border border-brand-secondary/15 bg-brand-surface p-4 shadow-sm">
            <nav
              className="flex flex-col gap-2"
              aria-label="Dashboard navigation"
            >
              {dashboardLinks.map((link) => {
                const Icon = link.icon

                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    end={link.end}
                    className={({ isActive }) =>
                      [
                        'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition',
                        isActive
                          ? 'bg-brand-primary text-white'
                          : 'text-brand-text hover:bg-brand-primary/10 hover:text-brand-primary',
                      ].join(' ')
                    }
                  >
                    <Icon size={18} aria-hidden="true" />
                    {link.label}
                  </NavLink>
                )
              })}
            </nav>

            <div className="mt-5 border-t border-brand-secondary/15 pt-5">
              <Button
                fullWidth
                variant="outline"
                onClick={handleLogout}
              >
                <LogOut size={17} aria-hidden="true" />
                Logout
              </Button>
            </div>
          </aside>

          <div className="min-w-0">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  )
}

export default DashboardLayout
