function ProductSkeleton() {
  return (
    <article
      className="overflow-hidden rounded-2xl border border-brand-secondary/15 bg-brand-surface shadow-sm"
      aria-label="Loading product"
    >
      <div className="skeleton h-56 w-full bg-brand-secondary/15" />

      <div className="space-y-4 p-5">
        <div className="skeleton h-5 w-3/4 bg-brand-secondary/15" />

        <div className="skeleton h-4 w-1/2 bg-brand-secondary/15" />

        <div className="flex items-center justify-between">
          <div className="skeleton h-6 w-24 bg-brand-secondary/15" />
          <div className="skeleton h-10 w-28 rounded-lg bg-brand-secondary/15" />
        </div>
      </div>
    </article>
  )
}

export default ProductSkeleton
