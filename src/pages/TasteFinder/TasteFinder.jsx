import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useMemo, useState } from 'react'
import {
  Button,
  SectionHeading,
} from '../../components/common'
import TasteQuestion from './TasteQuestion'
import TasteProgress from './TasteProgress'
import TasteResults from './TasteResults'
import { getProducts } from '../../services/productService'
import { getTasteRecommendations } from '../../utils/tasteMatcher'

const questions = [
  {
    key: 'spiceLevel',
    question: 'How spicy do you like your pickle?',
    options: [
      {
        value: 'all',
        label: 'Any spice level',
        description: 'I enjoy exploring different flavors.',
      },
      {
        value: 'Mild',
        label: 'Mild',
        description: 'Gentle and family-friendly.',
      },
      {
        value: 'Medium',
        label: 'Medium',
        description: 'Balanced heat and flavor.',
      },
      {
        value: 'Hot',
        label: 'Hot',
        description: 'I love a strong spicy kick.',
      },
    ],
  },
  {
    key: 'taste',
    question: 'Which taste sounds best?',
    options: [
      {
        value: 'all',
        label: 'Surprise me',
      },
      {
        value: 'Tangy',
        label: 'Tangy',
        description: 'Bright and sharp.',
      },
      {
        value: 'Sour',
        label: 'Sour',
        description: 'Traditional and refreshing.',
      },
      {
        value: 'Sweet',
        label: 'Sweet',
        description: 'Sweet and gently spiced.',
      },
      {
        value: 'Spicy',
        label: 'Spicy',
        description: 'Bold and flavorful.',
      },
    ],
  },
  {
    key: 'category',
    question: 'Which pickle category do you prefer?',
    options: [
      {
        value: 'all',
        label: 'Any category',
      },
      {
        value: 'mango',
        label: 'Mango',
        description: 'A classic Bengali favorite.',
      },
      {
        value: 'chili',
        label: 'Chili',
        description: 'For bold spice lovers.',
      },
      {
        value: 'mixed',
        label: 'Mixed',
        description: 'A combination of flavors.',
      },
      {
        value: 'sweet',
        label: 'Sweet',
        description: 'Balanced and family-friendly.',
      },
      {
        value: 'olive',
        label: 'Olive',
        description: 'Sour and aromatic.',
      },
    ],
  },
  {
    key: 'pairing',
    question: 'What will you eat it with?',
    options: [
      {
        value: 'all',
        label: 'Anything',
      },
      {
        value: 'Rice',
        label: 'Rice',
      },
      {
        value: 'Khichuri',
        label: 'Khichuri',
      },
      {
        value: 'Paratha',
        label: 'Paratha',
      },
      {
        value: 'Dal',
        label: 'Dal',
      },
      {
        value: 'Snacks',
        label: 'Snacks',
      },
    ],
  },
  {
    key: 'budget',
    question: 'What is your preferred budget?',
    options: [
      {
        value: 'all',
        label: 'Any budget',
      },
      {
        value: 'under-250',
        label: 'Under ৳250',
      },
      {
        value: '250-350',
        label: '৳250–৳350',
      },
      {
        value: 'above-350',
        label: 'Above ৳350',
      },
    ],
  },
]

const initialAnswers = {
  spiceLevel: 'all',
  taste: 'all',
  category: 'all',
  pairing: 'all',
  budget: 'all',
}

function TasteFinder() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState(initialAnswers)
  const [showResults, setShowResults] = useState(false)

  const recommendations = useMemo(
    () => getTasteRecommendations(getProducts(), answers),
    [answers],
  )

  const currentQuestion = questions[currentStep]

  const updateAnswer = (value) => {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [currentQuestion.key]: value,
    }))
  }

  const goToNextStep = () => {
    if (currentStep === questions.length - 1) {
      setShowResults(true)
      return
    }

    setCurrentStep((step) => step + 1)
  }

  const goToPreviousStep = () => {
    setCurrentStep((step) => Math.max(step - 1, 0))
  }

  const restart = () => {
    setCurrentStep(0)
    setAnswers(initialAnswers)
    setShowResults(false)
  }

  if (showResults) {
    return (
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <TasteResults
            recommendations={recommendations}
            onRestart={restart}
          />
        </div>
      </section>
    )
  }

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="Personalized Recommendations"
          title="Find Your Perfect Pickle"
          description="Answer five quick questions and we will recommend flavors based on your preferences."
        />

        <div className="rounded-3xl bg-brand-surface p-6 shadow-sm sm:p-10">
          <TasteProgress
            currentStep={currentStep}
            totalSteps={questions.length}
          />

          <TasteQuestion
            question={currentQuestion.question}
            options={currentQuestion.options}
            value={answers[currentQuestion.key]}
            onChange={updateAnswer}
          />

          <div className="mt-10 flex items-center justify-between gap-4">
            <Button
              variant="outline"
              disabled={currentStep === 0}
              onClick={goToPreviousStep}
            >
              <ArrowLeft size={17} aria-hidden="true" />
              Back
            </Button>

            <Button onClick={goToNextStep}>
              {currentStep === questions.length - 1
                ? 'Show Results'
                : 'Next'}

              <ArrowRight size={17} aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TasteFinder
