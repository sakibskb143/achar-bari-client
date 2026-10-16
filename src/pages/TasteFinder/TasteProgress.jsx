function TasteProgress({ currentStep, totalSteps }) {
  const progress = ((currentStep + 1) / totalSteps) * 100

  return (
    <div
      className="mb-8"
      aria-label={`Question ${currentStep + 1} of ${totalSteps}`}
    >
      <div className="mb-2 flex justify-between text-sm text-brand-muted">
        <span>
          Question {currentStep + 1} of {totalSteps}
        </span>

        <span>
          {Math.round(progress)}%
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-brand-secondary/15">
        <div
          className="h-full rounded-full bg-brand-primary transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

export default TasteProgress
