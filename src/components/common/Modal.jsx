import { useEffect } from 'react'
import { X } from 'lucide-react'

function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
}) {
  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = originalOverflow
    }
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  }

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-brand-text/50 p-4"
      role="presentation"
      onMouseDown={handleBackdropClick}
    >
      <div
        className={[
          'w-full overflow-hidden rounded-2xl bg-brand-surface shadow-2xl',
          sizeClasses[size] || sizeClasses.md,
        ].join(' ')}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="flex items-center justify-between border-b border-brand-secondary/15 px-5 py-4">
          <h2
            id="modal-title"
            className="text-lg font-semibold text-brand-primary"
          >
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-brand-muted transition hover:bg-brand-primary/10 hover:text-brand-primary"
            aria-label="Close dialog"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <div className="max-h-[75vh] overflow-y-auto p-5">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
