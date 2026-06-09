import React, { useState } from 'react'
import StartScreen from './components/StartScreen'
import QuestionCard from './components/QuestionCard'
import ProgressBar from './components/ProgressBar'
import ResultScreen from './components/ResultScreen'
import useQuiz from './hooks/useQuiz'
import styles from './App.module.css'

function QuizScreen({ category, onHome }) {
  const {
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
  } = useQuiz(category)

  if (status === 'finished') {
    return (
      <ResultScreen
        score={score}
        total={total}
        answers={answers}
        onRestart={restart}
        onHome={onHome}
      />
    )
  }

  return (
    <div className={styles.quizWrapper}>
      <ProgressBar current={currentIndex + 1} total={total} score={score} />
      <QuestionCard
        question={current}
        selectedAnswer={selectedAnswer}
        isAnswered={isAnswered}
        onSelect={selectAnswer}
      />
      {isAnswered && (
        <button className={styles.nextBtn} onClick={next}>
          {isLast ? 'See Results →' : 'Next Question →'}
        </button>
      )}
    </div>
  )
}

function App() {
  const [screen, setScreen] = useState('start') // 'start' | 'quiz'
  const [category, setCategory] = useState('All')

  const handleStart = (cat) => {
    setCategory(cat)
    setScreen('quiz')
  }

  return (
    <div className={styles.page}>
      {screen === 'start' && <StartScreen onStart={handleStart} />}
      {screen === 'quiz' && (
        <QuizScreen category={category} onHome={() => setScreen('start')} />
      )}
    </div>
  )
}

export default App
