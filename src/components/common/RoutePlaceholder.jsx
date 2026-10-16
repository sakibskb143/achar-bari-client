import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from './Button'
import SectionHeading from './SectionHeading'

function RoutePlaceholder({
  eyebrow = 'AcharBari',
  title,
  description,
  actionLabel = 'Back to Home',
  actionPath = '/',
}) {
  return (
    <section className="flex min-h-[65vh] items-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-3xl text-center">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <Link to={actionPath}>
          <Button>
            {actionLabel}
            <ArrowRight
              size={18}
              aria-hidden="true"
            />
          </Button>
        </Link>
      </div>
    </section>
  )
}

export default RoutePlaceholder
