import { Home, SearchX } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button, SectionHeading } from '../../components/common'

function NotFound() {
  return (
    <section className="flex min-h-[65vh] items-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-3xl text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-brand-primary/10">
          <SearchX
            size={38}
            className="text-brand-primary"
            aria-hidden="true"
          />
        </div>

        <SectionHeading
          eyebrow="404 Error"
          title="Page Not Found"
          description="The page you are looking for does not exist or may have been moved."
        />

        <Link to="/">
          <Button>
            <Home
              size={18}
              aria-hidden="true"
            />
            Back to Home
          </Button>
        </Link>
      </div>
    </section>
  )
}

export default NotFound
