function PaymentInstructions({
  paymentMethod,
  customerPhone,
}) {
  if (paymentMethod !== 'bkash') {
    return (
      <div className="mt-5 rounded-xl bg-brand-primary/5 p-4 text-sm leading-7 text-brand-muted">
        You will pay in cash when the order is delivered.
      </div>
    )
  }

  return (
    <div className="mt-5 rounded-xl border border-brand-accent/50 bg-brand-accent/15 p-5">
      <h3 className="font-semibold text-brand-primary">
        Manual bKash Instructions
      </h3>

      <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6 text-brand-muted">
        <li>
          Send the payment to bKash number:
          <strong className="ml-1 text-brand-text">
            01XXXXXXXXX
          </strong>
        </li>

        <li>
          Use your order phone number as the payment reference:
          <strong className="ml-1 text-brand-text">
            {customerPhone || 'your phone number'}
          </strong>
        </li>

        <li>
          Enter the bKash transaction ID below.
        </li>
      </ol>

      <p className="mt-4 text-xs font-semibold text-brand-secondary">
        Your payment will remain pending until manually verified.
      </p>
    </div>
  )
}

export default PaymentInstructions
