import { useState } from 'react'
import {
  Badge,
  Button,
  EmptyState,
  ErrorMessage,
  Modal,
  QuantitySelector,
  SectionHeading,
} from './components/common'

function App() {
  const [quantity, setQuantity] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <main className="min-h-screen bg-brand-background px-6 py-12 text-brand-text">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="AcharBari UI"
          title="Shared Components"
          description="Reusable interface components for the AcharBari shopping experience."
        />

        <div className="grid gap-6 md:grid-cols-2">
          <section className="rounded-2xl bg-brand-surface p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-brand-primary">
              Buttons
            </h2>

            <div className="flex flex-wrap gap-3">
              <Button>
                Primary
              </Button>

              <Button variant="secondary">
                Secondary
              </Button>

              <Button variant="accent">
                Accent
              </Button>

              <Button variant="outline">
                Outline
              </Button>

              <Button variant="danger">
                Delete
              </Button>

              <Button loading>
                Save
              </Button>
            </div>
          </section>

          <section className="rounded-2xl bg-brand-surface p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-brand-primary">
              Badges
            </h2>

            <div className="flex flex-wrap gap-3">
              <Badge variant="primary">
                Mango Pickle
              </Badge>

              <Badge variant="success">
                In Stock
              </Badge>

              <Badge variant="warning">
                Low Stock
              </Badge>

              <Badge variant="danger">
                Out of Stock
              </Badge>
            </div>
          </section>

          <section className="rounded-2xl bg-brand-surface p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-brand-primary">
              Quantity Selector
            </h2>

            <QuantitySelector
              value={quantity}
              onChange={setQuantity}
              min={1}
              max={5}
            />

            <p className="mt-3 text-sm text-brand-muted">
              Selected quantity: {quantity}
            </p>
          </section>

          <section className="rounded-2xl bg-brand-surface p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-brand-primary">
              Error Message
            </h2>

            <ErrorMessage
              message="This is an example error message."
            />
          </section>

          <section className="rounded-2xl bg-brand-surface p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-brand-primary">
              Modal
            </h2>

            <Button onClick={() => setIsModalOpen(true)}>
              Open Modal
            </Button>

            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="AcharBari Modal"
            >
              <p className="leading-7 text-brand-muted">
                This modal can be reused for confirmations, product previews,
                login prompts, and other dialogs.
              </p>

              <Button
                className="mt-5"
                onClick={() => setIsModalOpen(false)}
              >
                Close Modal
              </Button>
            </Modal>
          </section>

          <section className="rounded-2xl bg-brand-surface p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-brand-primary">
              Empty State
            </h2>

            <EmptyState
              title="No products found"
              description="Try changing your filters or search for another pickle."
              actionLabel="Reset Filters"
              onAction={() => alert('Filters reset')}
            />
          </section>
        </div>
      </div>
    </main>
  )
}

export default App
