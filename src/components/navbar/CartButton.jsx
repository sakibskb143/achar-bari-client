import { ShoppingBag } from 'lucide-react'

function CartButton({ itemCount = 0, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative rounded-full p-2 text-brand-primary transition hover:bg-brand-primary/10"
      aria-label={`Shopping cart with ${itemCount} items`}
    >
      <ShoppingBag
        size={22}
        strokeWidth={1.8}
        aria-hidden="true"
      />

      {itemCount > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-accent px-1 text-xs font-bold text-brand-text">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </button>
  )
}

export default CartButton
