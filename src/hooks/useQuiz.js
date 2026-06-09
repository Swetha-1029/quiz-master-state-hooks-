import { useState, useCallback } from 'react'
import questions from '../data/questions'

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

function useQuiz(category) {
  const filtered = category === 'All'
    ? questions
    : questions.filter((q) => q.category === category)

  const [quizQuestions] = useState(() => shuffle(filtered))
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState([])
  const [status, setStatus] = useState('playing') // 'playing' | 'finished'

  const current = quizQuestions[currentIndex]
  const total = quizQuestions.length
  const isLast = currentIndex === total - 1

  const selectAnswer = useCallback((option) => {
    if (isAnswered) return
    setSelectedAnswer(option)
    setIsAnswered(true)
    const correct = option === current.answer
    if (correct) setScore((s) => s + 1)
    setAnswers((prev) => [
      ...prev,
      {
        question: current.question,
        selected: option,
        correct: current.answer,
        isCorrect: correct,
      },
    ])
  }, [isAnswered, current])

  const next = useCallback(() => {
    if (isLast) {
      setStatus('finished')
    } else {
      setCurrentIndex((i) => i + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
    }
  }, [isLast])

  const restart = useCallback(() => {
    setCurrentIndex(0)
    setSelectedAnswer(null)
    setIsAnswered(false)
    setScore(0)
    setAnswers([])
    setStatus('playing')
  }, [])

  return {
    current,
    currentIndex,
    total,
    selectedAnswer,
    isAnswered,
    isLast,
    score,
    answers,
    status,
    selectAnswer,
    next,
    restart,
  }
}

export default useQuiz
