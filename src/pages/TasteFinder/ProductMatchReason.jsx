import { Sparkles } from 'lucide-react'

function ProductMatchReason({ reason, score }) {
  return (
    <div className="mt-4 rounded-xl bg-brand-accent/15 p-4">
      <div className="flex items-start gap-3">
        <Sparkles
          size={19}
          className="mt-0.5 shrink-0 text-brand-primary"
          aria-hidden="true"
        />

        <div>
          <p className="text-sm font-semibold text-brand-primary">
            {score}% match
          </p>

          <p className="mt-1 text-sm leading-6 text-brand-muted">
            {reason}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProductMatchReason
