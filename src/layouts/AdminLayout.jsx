import {
  BadgePercent,
  BarChart3,
  ClipboardList,
  FolderTree,
  LayoutDashboard,
  MessageSquare,
  Package,
  Users,
} from 'lucide-react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Button } from '../components/common'

const adminLinks = [
  {
    label: 'Overview',
    path: '/admin',
    icon: LayoutDashboard,
    end: true,
  },
  {
    label: 'Products',
    path: '/admin/products',
    icon: Package,
  },
  {
    label: 'Categories',
    path: '/admin/categories',
    icon: FolderTree,
  },
  {
    label: 'Orders',
    path: '/admin/orders',
    icon: ClipboardList,
  },
  {
    label: 'Users',
    path: '/admin/users',
    icon: Users,
  },
  {
    label: 'Reviews',
    path: '/admin/reviews',
    icon: MessageSquare,
  },
  {
    label: 'Coupons',
    path: '/admin/coupons',
    icon: BadgePercent,
  },
]

function AdminLayout() {
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
            Administration
          </p>

          <h1 className="mt-2 text-3xl font-bold text-brand-primary sm:text-4xl">
            AcharBari Admin Panel
          </h1>

          <p className="mt-3 text-brand-muted">
            Manage products, orders, users, reviews, and coupons.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[250px_1fr]">
          <aside className="h-fit rounded-2xl border border-brand-secondary/15 bg-brand-surface p-4 shadow-sm">
            <div className="mb-5 rounded-xl bg-brand-primary/5 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-primary text-lg font-bold text-white">
                  {(
                    currentUser?.displayName ||
                    currentUser?.email ||
                    'A'
                  )
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div className="min-w-0">
                  <p className="truncate font-semibold text-brand-primary">
                    {currentUser?.displayName || 'Admin'}
                  </p>

                  <p className="truncate text-xs text-brand-muted">
                    {currentUser?.email}
                  </p>
                </div>
              </div>
            </div>

            <nav
              className="flex flex-col gap-2"
              aria-label="Admin navigation"
            >
              {adminLinks.map((link) => {
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

export default AdminLayout
