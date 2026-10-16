import { Mail } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../../components/common'

function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!email.trim()) {
      return
    }

    setSubmitted(true)
    setEmail('')
  }

  return (
    <section className="px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-3xl bg-brand-primary px-6 py-12 text-center sm:px-12">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-brand-accent text-brand-text">
          <Mail
            size={25}
            aria-hidden="true"
          />
        </div>

        <h2 className="text-3xl font-bold text-white">
          Stay close to the taste of home.
        </h2>

        <p className="mx-auto mt-4 max-w-xl leading-7 text-white/75">
          Subscribe for new flavors, special offers, and delicious updates from AcharBari.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-7 flex max-w-lg flex-col gap-3 sm:flex-row"
        >
          <label
            htmlFor="newsletter-email"
            className="sr-only"
          >
            Email address
          </label>

          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)
              setSubmitted(false)
            }}
            placeholder="Enter your email address"
            required
            className="min-h-12 flex-1 rounded-xl border border-white/20 bg-white px-4 text-sm text-brand-text outline-none ring-brand-accent placeholder:text-brand-muted focus:ring-2"
          />

          <Button
            type="submit"
            variant="accent"
          >
            Subscribe
          </Button>
        </form>

        {submitted && (
          <p
            className="mt-4 text-sm font-semibold text-brand-accent"
            role="status"
          >
            Thank you for subscribing to AcharBari.
          </p>
        )}
      </div>
    </section>
  )
}

export default NewsletterSection
