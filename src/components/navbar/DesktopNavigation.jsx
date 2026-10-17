import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { USER_ROLES } from '../../utils/userRole'

const navigationLinks = [
  {
    label: 'Shop',
    path: '/shop',
  },
  {
    label: 'Taste Finder',
    path: '/taste-finder',
  },
  {
    label: 'Build Your Own Achar Box',
    path: '/build-achar-box',
  },
]

function DesktopNavigation() {
  const { currentUser, userRole } = useAuth()

  const visibleLinks = [...navigationLinks]

  if (currentUser && userRole === USER_ROLES.USER) {
    visibleLinks.push({
      label: 'Dashboard',
      path: '/dashboard',
    })
  }

  if (currentUser && userRole === USER_ROLES.ADMIN) {
    visibleLinks.push({
      label: 'Admin Panel',
      path: '/admin',
    })
  }

  return (
    <nav
      className="hidden items-center gap-5 lg:flex"
      aria-label="Main navigation"
    >
      {visibleLinks.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) =>
            [
              'text-sm font-semibold transition',
              isActive
                ? 'text-brand-primary'
                : 'text-brand-muted hover:text-brand-primary',
            ].join(' ')
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  )
}

export default DesktopNavigation
