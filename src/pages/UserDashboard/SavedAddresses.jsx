import { MapPin, Trash2 } from 'lucide-react'
import { useState } from 'react'
import {
  Button,
  EmptyState,
  SectionHeading,
} from '../../components/common'
import { FormField } from '../../components/forms'
import { useAuth } from '../../context/AuthContext'
import { useSavedAddresses } from '../../hooks/useSavedAddresses'

function SavedAddresses() {
  const { currentUser } = useAuth()
  const {
    addresses,
    addAddress,
    removeAddress,
  } = useSavedAddresses(currentUser?.email)

  const [formData, setFormData] = useState({
    label: '',
    name: '',
    phone: '',
    location: '',
    address: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    addAddress(formData)

    setFormData({
      label: '',
      name: '',
      phone: '',
      location: '',
      address: '',
    })
  }

  return (
    <div>
      <SectionHeading
        align="left"
        eyebrow="Delivery Preferences"
        title="Saved Addresses"
        description="Save frequently used delivery addresses for faster checkout."
      />

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-brand-secondary/15 bg-brand-surface p-6 shadow-sm">
          <h2 className="text-xl font-bold text-brand-primary">
            Add New Address
          </h2>

          <form
            onSubmit={handleSubmit}
            className="mt-5 space-y-5"
          >
            <FormField
              label="Address label"
              name="label"
              value={formData.label}
              onChange={handleChange}
              placeholder="Home, Office, etc."
              required
            />

            <FormField
              label="Full name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Recipient name"
              required
            />

            <FormField
              label="Phone number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="01XXXXXXXXX"
              required
            />

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-brand-text">
                Delivery location
              </span>

              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="select select-bordered w-full border-brand-secondary/25 bg-brand-surface text-brand-text focus:border-brand-primary"
              >
                <option value="">
                  Select location
                </option>
                <option value="Inside Chattogram">
                  Inside Chattogram
                </option>
                <option value="Outside Chattogram">
                  Outside Chattogram
                </option>
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-brand-text">
                Full address
              </span>

              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="4"
                required
                placeholder="House, road, area, and other details"
                className="textarea textarea-bordered w-full border-brand-secondary/25 bg-brand-surface text-brand-text focus:border-brand-primary"
              />
            </label>

            <Button type="submit" fullWidth>
              Save Address
            </Button>
          </form>
        </div>

        <div>
          {addresses.length === 0 ? (
            <EmptyState
              icon={MapPin}
              title="No saved addresses"
              description="Your saved delivery addresses will appear here."
            />
          ) : (
            <div className="space-y-4">
              {addresses.map((address) => (
                <article
                  key={address.id}
                  className="rounded-2xl border border-brand-secondary/15 bg-brand-surface p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="rounded-xl bg-brand-primary/10 p-2 text-brand-primary">
                        <MapPin size={19} aria-hidden="true" />
                      </div>

                      <div>
                        <h2 className="font-bold text-brand-primary">
                          {address.label}
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-brand-muted">
                          {address.name}
                            

                          {address.phone}
                            

                          {address.address}
                            

                          {address.location}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeAddress(address.id)}
                      className="rounded-full p-2 text-red-600 transition hover:bg-red-50"
                      aria-label={`Remove ${address.label} address`}
                    >
                      <Trash2 size={18} aria-hidden="true" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SavedAddresses
