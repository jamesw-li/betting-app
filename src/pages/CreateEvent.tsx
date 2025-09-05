import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card'
import { CreateEventData, QuestionType } from '../types'
import { generateEventCode } from '../lib/utils'
import { 
  Plus, 
  Trash2, 
  Calendar, 
  DollarSign,
  HelpCircle,
  CheckCircle,
  Hash,
  Type
} from 'lucide-react'

const questionSchema = z.object({
  text: z.string().min(5, 'Question must be at least 5 characters'),
  type: z.enum(['multiple_choice', 'yes_no', 'numeric', 'free_text']),
  options: z.array(z.string()).optional(),
  cutoffTime: z.string().min(1, 'Cutoff time is required')
})

const eventSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  date: z.string().min(1, 'Event date is required'),
  minBetAmount: z.number().min(1, 'Minimum bet must be at least $1'),
  maxBetAmount: z.number().min(1, 'Maximum bet must be at least $1'),
  questions: z.array(questionSchema).min(1, 'At least one question is required')
}).refine((data) => data.maxBetAmount >= data.minBetAmount, {
  message: "Maximum bet must be greater than or equal to minimum bet",
  path: ["maxBetAmount"]
})

type EventForm = z.infer<typeof eventSchema>

export function CreateEvent() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const { register, control, handleSubmit, watch, setValue, formState: { errors } } = useForm<EventForm>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      minBetAmount: 5,
      maxBetAmount: 100,
      questions: [{
        text: '',
        type: 'yes_no',
        cutoffTime: ''
      }]
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions'
  })

  const watchedQuestions = watch('questions')

  const questionTypes = [
    { value: 'yes_no', label: 'Yes/No', icon: CheckCircle, description: 'Simple yes or no question' },
    { value: 'multiple_choice', label: 'Multiple Choice', icon: HelpCircle, description: 'Choose from several options' },
    { value: 'numeric', label: 'Numeric Guess', icon: Hash, description: 'Guess a number' },
    { value: 'free_text', label: 'Free Text', icon: Type, description: 'Open text answer' }
  ]

  const onSubmit = async (data: EventForm) => {
    setLoading(true)
    
    try {
      // Mock event creation
      const eventCode = generateEventCode()
      console.log('Creating event:', { ...data, eventCode })
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Redirect to events page
      navigate('/events')
    } catch (error) {
      console.error('Error creating event:', error)
    } finally {
      setLoading(false)
    }
  }

  const addQuestion = () => {
    append({
      text: '',
      type: 'yes_no',
      cutoffTime: ''
    })
  }

  const addOption = (questionIndex: number) => {
    const currentOptions = watchedQuestions[questionIndex]?.options || []
    setValue(`questions.${questionIndex}.options`, [...currentOptions, ''])
  }

  const removeOption = (questionIndex: number, optionIndex: number) => {
    const currentOptions = watchedQuestions[questionIndex]?.options || []
    const newOptions = currentOptions.filter((_, i) => i !== optionIndex)
    setValue(`questions.${questionIndex}.options`, newOptions)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create New Event</h1>
        <p className="text-gray-600 mt-1">
          Set up your betting event with custom questions and rules
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Event Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Event Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Input
              label="Event Title"
              placeholder="e.g., Sarah & Mike's Wedding"
              {...register('title')}
              error={errors.title?.message}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 shadow-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                rows={3}
                placeholder="Describe your event and what people will be betting on..."
                {...register('description')}
              />
              {errors.description && (
                <p className="text-sm text-red-600 mt-1">{errors.description.message}</p>
              )}
            </div>

            <Input
              label="Event Date & Time"
              type="datetime-local"
              {...register('date')}
              error={errors.date?.message}
            />

            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Minimum Bet Amount"
                type="number"
                min="1"
                step="0.01"
                icon={<DollarSign className="w-4 h-4" />}
                {...register('minBetAmount', { valueAsNumber: true })}
                error={errors.minBetAmount?.message}
              />

              <Input
                label="Maximum Bet Amount"
                type="number"
                min="1"
                step="0.01"
                icon={<DollarSign className="w-4 h-4" />}
                {...register('maxBetAmount', { valueAsNumber: true })}
                error={errors.maxBetAmount?.message}
              />
            </div>
          </CardContent>
        </Card>

        {/* Questions */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center">
                <HelpCircle className="w-5 h-5 mr-2" />
                Betting Questions
              </CardTitle>
              <Button type="button" variant="outline" onClick={addQuestion}>
                <Plus className="w-4 h-4 mr-2" />
                Add Question
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {fields.map((field, questionIndex) => (
              <div key={field.id} className="p-6 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-medium text-gray-900">Question {questionIndex + 1}</h4>
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => remove(questionIndex)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                <div className="space-y-4">
                  <Input
                    label="Question Text"
                    placeholder="e.g., Will the groom cry during the vows?"
                    {...register(`questions.${questionIndex}.text`)}
                    error={errors.questions?.[questionIndex]?.text?.message}
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Question Type
                    </label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {questionTypes.map((type) => {
                        const Icon = type.icon
                        return (
                          <label
                            key={type.value}
                            className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                              watchedQuestions[questionIndex]?.type === type.value
                                ? 'border-primary-500 bg-primary-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <input
                              type="radio"
                              value={type.value}
                              {...register(`questions.${questionIndex}.type`)}
                              className="sr-only"
                            />
                            <Icon className="w-5 h-5 mr-3 text-gray-400" />
                            <div>
                              <div className="font-medium text-gray-900">{type.label}</div>
                              <div className="text-sm text-gray-500">{type.description}</div>
                            </div>
                          </label>
                        )
                      })}
                    </div>
                  </div>

                  {/* Multiple Choice Options */}
                  {watchedQuestions[questionIndex]?.type === 'multiple_choice' && (
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <label className="block text-sm font-medium text-gray-700">
                          Answer Options
                        </label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addOption(questionIndex)}
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add Option
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {(watchedQuestions[questionIndex]?.options || []).map((_, optionIndex) => (
                          <div key={optionIndex} className="flex gap-2">
                            <Input
                              placeholder={`Option ${optionIndex + 1}`}
                              {...register(`questions.${questionIndex}.options.${optionIndex}`)}
                              className="flex-1"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeOption(questionIndex, optionIndex)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Input
                    label="Betting Cutoff Time"
                    type="datetime-local"
                    {...register(`questions.${questionIndex}.cutoffTime`)}
                    error={errors.questions?.[questionIndex]?.cutoffTime?.message}
                  />
                </div>
              </div>
            ))}

            {errors.questions && (
              <p className="text-sm text-red-600">{errors.questions.message}</p>
            )}
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/events')}
          >
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            Create Event
          </Button>
        </div>
      </form>

      {/* Disclaimer */}
      <Card className="mt-8 bg-yellow-50 border-yellow-200">
        <CardContent>
          <div className="flex items-start">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mr-3">
              <DollarSign className="w-4 h-4 text-yellow-600" />
            </div>
            <div>
              <h3 className="font-medium text-yellow-800 mb-1">Important Reminder</h3>
              <p className="text-sm text-yellow-700">
                This platform tracks bets for entertainment purposes only and does not process real money. 
                All settlements must be handled directly between participants via Venmo, PayPal, cash, or other methods.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}