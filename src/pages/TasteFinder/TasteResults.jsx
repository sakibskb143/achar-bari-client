import { RotateCcw } from 'lucide-react'
import { Button, SectionHeading } from '../../components/common'
import ProductCard from '../../components/products/ProductCard'
import ProductMatchReason from './ProductMatchReason'

function TasteResults({
  recommendations,
  onRestart,
}) {
  return (
    <section>
      <SectionHeading
        eyebrow="Your Results"
        title="These Pickles Match Your Taste"
        description="We matched your answers with our local product data."
      />

      {recommendations.length === 0 ? (
        <div className="rounded-2xl bg-brand-surface p-8 text-center">
          <p className="text-brand-muted">
            We could not find a matching product.
          </p>

          <Button
            className="mt-5"
            onClick={onRestart}
          >
            <RotateCcw size={17} aria-hidden="true" />
            Try Again
          </Button>
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2">
            {recommendations.map((recommendation) => (
              <div key={recommendation.product.id}>
                <ProductCard product={recommendation.product} />

                <ProductMatchReason
                  reason={recommendation.reason}
                  score={recommendation.score}
                />
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button
              variant="outline"
              onClick={onRestart}
            >
              <RotateCcw size={17} aria-hidden="true" />
              Start Again
            </Button>
          </div>
        </>
      )}
    </section>
  )
}

export default TasteResults
