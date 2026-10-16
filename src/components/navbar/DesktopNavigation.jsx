import { NavLink } from 'react-router-dom'

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
  return (
    <nav
      className="hidden items-center gap-6 lg:flex"
      aria-label="Main navigation"
    >
      {navigationLinks.map((link) => (
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
