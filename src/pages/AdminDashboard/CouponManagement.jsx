import { Edit3, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import {
  Badge,
  Button,
  Modal,
  SectionHeading,
} from '../../components/common'
import { coupons as initialCoupons } from '../../data/coupons'

const emptyCoupon = {
  code: '',
  type: 'percentage',
  value: '',
  minimumOrder: '',
  description: '',
  active: true,
}

function CouponManagement() {
  const [coupons, setCoupons] = useState(initialCoupons)
  const [formData, setFormData] = useState(emptyCoupon)
  const [editingCode, setEditingCode] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [deletingCoupon, setDeletingCoupon] = useState(null)

  const openCreateForm = () => {
    setEditingCode(null)
    setFormData(emptyCoupon)
    setIsFormOpen(true)
  }

  const openEditForm = (coupon) => {
    setEditingCode(coupon.code)
    setFormData(coupon)
    setIsFormOpen(true)
  }

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target

    setFormData((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const nextCoupon = {
      ...formData,
      code: formData.code.toUpperCase(),
      value: Number(formData.value),
      minimumOrder: Number(formData.minimumOrder),
    }

    setCoupons((currentCoupons) => {
      if (editingCode) {
        return currentCoupons.map((coupon) =>
          coupon.code === editingCode
            ? nextCoupon
            : coupon,
        )
      }

      return [...currentCoupons, nextCoupon]
    })

    setIsFormOpen(false)
    setFormData(emptyCoupon)
    setEditingCode(null)
  }

  const deleteCoupon = () => {
    setCoupons((currentCoupons) =>
      currentCoupons.filter(
        (coupon) =>
          coupon.code !== deletingCoupon.code,
      ),
    )

    setDeletingCoupon(null)
  }

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <SectionHeading
          align="left"
          eyebrow="Promotions"
          title="Coupon Management"
          description="Create and manage promotional coupon codes."
          className="mb-0"
        />

        <Button onClick={openCreateForm}>
          <Plus size={18} aria-hidden="true" />
          Add Coupon
        </Button>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {coupons.map((coupon) => (
          <article
            key={coupon.code}
            className="rounded-2xl border border-brand-secondary/15 bg-brand-surface p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xl font-bold text-brand-primary">
                  {coupon.code}
                </p>

                <p className="mt-2 text-sm leading-6 text-brand-muted">
                  {coupon.description}
                </p>
              </div>

              <Badge
                variant={coupon.active ? 'success' : 'danger'}
              >
                {coupon.active ? 'Active' : 'Inactive'}
              </Badge>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-brand-muted">
                  Discount
                </p>

                <p className="mt-1 font-semibold text-brand-text">
                  {coupon.type === 'percentage'
                    ? `${coupon.value}%`
                    : `৳${coupon.value}`}
                </p>
              </div>

              <div>
                <p className="text-brand-muted">
                  Minimum order
                </p>

                <p className="mt-1 font-semibold text-brand-text">
                  ৳{coupon.minimumOrder}
                </p>
              </div>
            </div>

            <div className="mt-5 flex gap-3 border-t border-brand-secondary/15 pt-4">
              <button
                type="button"
                onClick={() => openEditForm(coupon)}
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary"
              >
                <Edit3 size={16} aria-hidden="true" />
                Edit
              </button>

              <button
                type="button"
                onClick={() => setDeletingCoupon(coupon)}
                className="inline-flex items-center gap-2 text-sm font-semibold text-red-600"
              >
                <Trash2 size={16} aria-hidden="true" />
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>

      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingCode ? 'Edit Coupon' : 'Add Coupon'}
        size="md"
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-brand-text">
              Coupon code
            </span>

            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              disabled={Boolean(editingCode)}
              required
              className="input input-bordered w-full uppercase disabled:opacity-60"
            />
          </label>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-brand-text">
                Discount type
              </span>

              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="percentage">
                  Percentage
                </option>
                <option value="fixed">
                  Fixed amount
                </option>
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-brand-text">
                Discount value
              </span>

              <input
                type="number"
                name="value"
                value={formData.value}
                onChange={handleChange}
                min="1"
                required
                className="input input-bordered w-full"
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-brand-text">
              Minimum order amount
            </span>

            <input
              type="number"
              name="minimumOrder"
              value={formData.minimumOrder}
              onChange={handleChange}
              min="0"
              required
              className="input input-bordered w-full"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-brand-text">
              Description
            </span>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              required
              className="textarea textarea-bordered w-full"
            />
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleChange}
              className="checkbox"
            />

            <span className="text-sm font-semibold text-brand-text">
              Active coupon
            </span>
          </label>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsFormOpen(false)}
            >
              Cancel
            </Button>

            <Button type="submit">
              {editingCode ? 'Save Changes' : 'Add Coupon'}
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={Boolean(deletingCoupon)}
        onClose={() => setDeletingCoupon(null)}
        title="Delete Coupon"
        size="sm"
      >
        <p className="leading-7 text-brand-muted">
          Delete coupon{' '}
          <strong className="text-brand-text">
            {deletingCoupon?.code}
          </strong>
          ?
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => setDeletingCoupon(null)}
          >
            Cancel
          </Button>

          <Button
            variant="danger"
            onClick={deleteCoupon}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default CouponManagement
