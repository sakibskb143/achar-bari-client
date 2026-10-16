import { AlertCircle } from 'lucide-react'

function ErrorMessage({
  message,
  title = 'Something went wrong',
}) {
  if (!message) {
    return null
  }

  return (
    <div
      className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700"
      role="alert"
    >
      <AlertCircle
        size={20}
        className="mt-0.5 shrink-0"
        aria-hidden="true"
      />

      <div>
        <p className="font-semibold">
          {title}
        </p>

        <p className="mt-1 text-sm leading-6">
          {message}
        </p>
      </div>
    </div>
  )
}

export default ErrorMessage
