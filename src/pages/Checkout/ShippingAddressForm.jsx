import { FormField } from '../../components/forms'

function ShippingAddressForm({
  formData,
  onChange,
  disabled = false,
}) {
  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold text-brand-primary">
        Delivery Information
      </h2>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          label="Full name"
          name="name"
          value={formData.name}
          onChange={onChange}
          placeholder="Customer name"
          autoComplete="name"
          required
          disabled={disabled}
        />

        <FormField
          label="Phone number"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={onChange}
          placeholder="01XXXXXXXXX"
          autoComplete="tel"
          required
          disabled={disabled}
        />
      </div>

      <FormField
        label="Email address"
        name="email"
        type="email"
        value={formData.email}
        onChange={onChange}
        placeholder="you@example.com"
        autoComplete="email"
        required
        disabled={disabled}
      />

      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-brand-text">
          Delivery location
          <span className="ml-1 text-red-600" aria-hidden="true">
            *
          </span>
        </span>

        <select
          name="location"
          value={formData.location}
          onChange={onChange}
          required
          disabled={disabled}
          className="select select-bordered w-full border-brand-secondary/25 bg-brand-surface text-brand-text focus:border-brand-primary"
        >
          <option value="">
            Select delivery location
          </option>
          <option value="Inside Chattogram">
            Inside Chattogram — ৳60 delivery
          </option>
          <option value="Outside Chattogram">
            Outside Chattogram — ৳120 delivery
          </option>
        </select>
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-brand-text">
          Full delivery address
          <span className="ml-1 text-red-600" aria-hidden="true">
            *
          </span>
        </span>

        <textarea
          name="address"
          value={formData.address}
          onChange={onChange}
          placeholder="House, road, area, and other delivery details"
          rows="4"
          required
          disabled={disabled}
          className="textarea textarea-bordered w-full border-brand-secondary/25 bg-brand-surface text-brand-text focus:border-brand-primary"
        />
      </label>
    </div>
  )
}

export default ShippingAddressForm
