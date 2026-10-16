import { PackageOpen } from 'lucide-react'
import Button from './Button'

function EmptyState({
  icon: Icon = PackageOpen,
  title = 'Nothing here yet',
  description = 'There is currently no information to display.',
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-brand-secondary/30 bg-brand-surface px-6 py-14 text-center">
      <div className="mb-4 rounded-full bg-brand-primary/10 p-4">
        <Icon
          size={32}
          className="text-brand-primary"
          aria-hidden="true"
        />
      </div>

      <h2 className="text-xl font-semibold text-brand-primary">
        {title}
      </h2>

      <p className="mt-2 max-w-md leading-7 text-brand-muted">
        {description}
      </p>

      {actionLabel && onAction && (
        <Button
          className="mt-6"
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  )
}

export default EmptyState
