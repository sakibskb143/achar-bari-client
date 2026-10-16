import { X } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navigationLinks = [
  {
    label: 'Home',
    path: '/',
  },
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
  {
    label: 'Cart',
    path: '/cart',
  },
]

function MobileNavigation({ isOpen, onClose }) {
  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        type="button"
        className="absolute inset-0 h-full w-full cursor-default bg-brand-text/40"
        onClick={onClose}
        aria-label="Close navigation menu"
      />

      <aside className="relative ml-auto flex h-full w-[min(88%,380px)] flex-col bg-brand-surface p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-brand-secondary/15 pb-5">
          <div>
            <p className="font-bold text-brand-primary">
              AcharBari
            </p>

            <p className="font-bengali text-sm text-brand-secondary">
              ঘরের স্বাদ, এবার দ্বারে।
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-brand-muted transition hover:bg-brand-primary/10 hover:text-brand-primary"
            aria-label="Close navigation menu"
          >
            <X size={22} aria-hidden="true" />
          </button>
        </div>

        <nav
          className="mt-6 flex flex-col gap-2"
          aria-label="Mobile navigation"
        >
          {navigationLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={onClose}
              className={({ isActive }) =>
                [
                  'rounded-xl px-4 py-3 text-sm font-semibold transition',
                  isActive
                    ? 'bg-brand-primary text-white'
                    : 'text-brand-text hover:bg-brand-primary/10 hover:text-brand-primary',
                ].join(' ')
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto border-t border-brand-secondary/15 pt-5">
          <NavLink
            to="/login"
            onClick={onClose}
            className="flex items-center justify-center rounded-xl border border-brand-primary px-4 py-3 text-sm font-semibold text-brand-primary transition hover:bg-brand-primary hover:text-white"
          >
            Login / Register
          </NavLink>
        </div>
      </aside>
    </div>
  )
}

export default MobileNavigation
