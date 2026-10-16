import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, ErrorMessage, SectionHeading } from "../../components/common";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { getProductById } from "../../services/productService";
import { createOrder } from "../../services/orderService";
import { calculateShipping } from "../../utils/calculateShipping";
import { calculateOrderTotals } from "../../utils/calculateTotals";
import CouponInput from "./CouponInput";
import OrderSummary from "./OrderSummary";
import PaymentInstructions from "./PaymentInstructions";
import PaymentMethodSelector from "./PaymentMethodSelector";
import ShippingAddressForm from "./ShippingAddressForm";

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();
  const { cartItems, clearCart } = useCart();

  const buyNowProductId = location.state?.productId;
  const buyNowQuantity = location.state?.quantity || 1;
  const buyNowProduct = buyNowProductId
    ? getProductById(buyNowProductId)
    : null;

  const checkoutItems = useMemo(() => {
    if (buyNowProduct) {
      return [
        {
          product: buyNowProduct,
          quantity: Math.min(buyNowQuantity, buyNowProduct.stock),
        },
      ];
    }

    return cartItems;
  }, [buyNowProduct, buyNowQuantity, cartItems]);

  const checkoutSubtotal = useMemo(
    () =>
      checkoutItems.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0,
      ),
    [checkoutItems],
  );

  const [formData, setFormData] = useState({
    name: currentUser?.displayName || "",
    email: currentUser?.email || "",
    phone: "",
    location: "",
    address: "",
    transactionId: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const shipping = calculateShipping(formData.location);

  const totals = calculateOrderTotals({
    subtotal: checkoutSubtotal,
    shipping,
    discount: appliedCoupon?.discountAmount || 0,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
  };

  const handleApplyCoupon = (coupon) => {
    setAppliedCoupon(coupon);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (checkoutItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    if (paymentMethod === "bkash" && !formData.transactionId.trim()) {
      setError("Please enter your bKash transaction ID.");
      return;
    }

    setIsSubmitting(true);

    try {
      const order = createOrder({
        customer: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
        },
        shippingAddress: {
          location: formData.location,
          address: formData.address.trim(),
        },
        items: checkoutItems,
        subtotal: totals.subtotal,
        shipping: totals.shipping,
        discount: totals.discount,
        total: totals.total,
        coupon: appliedCoupon
          ? {
              code: appliedCoupon.code,
              discountAmount: appliedCoupon.discountAmount,
            }
          : null,
        paymentMethod,
        transactionId:
          paymentMethod === "bkash" ? formData.transactionId.trim() : null,
      });

      if (!buyNowProduct) {
        clearCart();
      }

      navigate(`/order-confirmation/${order.id}`, {
        replace: true,
      });
    } catch {
      setError("The order could not be created. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (checkoutItems.length === 0) {
    return (
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="Checkout"
            title="Your Cart Is Empty"
            description="Add at least one product before continuing to checkout."
          />

          <div className="text-center">
            <Button onClick={() => navigate("/shop")}>Continue Shopping</Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Secure Checkout"
          title="Complete Your Order"
          description="Provide your delivery details and choose a payment method."
        />

        <form
          onSubmit={handleSubmit}
          className="grid gap-8 lg:grid-cols-[1fr_380px]"
        >
          <div className="rounded-3xl bg-brand-surface p-6 shadow-sm sm:p-8">
            <ErrorMessage message={error} />

            <ShippingAddressForm
              formData={formData}
              onChange={handleChange}
              disabled={isSubmitting}
            />

            <CouponInput
              subtotal={checkoutSubtotal}
              appliedCoupon={appliedCoupon}
              onApply={handleApplyCoupon}
              onRemove={handleRemoveCoupon}
            />

            <PaymentMethodSelector
              value={paymentMethod}
              onChange={setPaymentMethod}
              disabled={isSubmitting}
            />

            <PaymentInstructions
              paymentMethod={paymentMethod}
              customerPhone={formData.phone}
            />

            {paymentMethod === "bkash" && (
              <label className="mt-5 block">
                <span className="mb-2 block text-sm font-semibold text-brand-text">
                  bKash transaction ID
                  <span className="ml-1 text-red-600" aria-hidden="true">
                    *
                  </span>
                </span>

                <input
                  type="text"
                  name="transactionId"
                  value={formData.transactionId}
                  onChange={handleChange}
                  placeholder="Enter transaction ID"
                  required
                  disabled={isSubmitting}
                  className="input input-bordered w-full border-brand-secondary/25 bg-brand-surface text-brand-text focus:border-brand-primary"
                />
              </label>
            )}

            <Button
              type="submit"
              fullWidth
              className="mt-8"
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              Place Order
            </Button>

            <p className="mt-4 text-center text-xs leading-5 text-brand-muted">
              This is a demo order flow. No real payment will be processed.
            </p>
          </div>

          <OrderSummary
            cartItems={checkoutItems}
            totals={totals}
            appliedCoupon={appliedCoupon}
          />
        </form>
      </div>
    </section>
  );
}

export default Checkout;
