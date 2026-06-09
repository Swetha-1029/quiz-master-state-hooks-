import React from 'react'
import styles from './QuestionCard.module.css'

const DIFFICULTY_COLOR = {
  easy: styles.easy,
  medium: styles.medium,
  hard: styles.hard,
}

function QuestionCard({ question, selectedAnswer, isAnswered, onSelect }) {
  return (
    <div className={styles.card}>
      <div className={styles.meta}>
        <span className={styles.category}>{question.category}</span>
        <span className={`${styles.difficulty} ${DIFFICULTY_COLOR[question.difficulty]}`}>
          {question.difficulty}
        </span>
      </div>

      <h2 className={styles.question}>{question.question}</h2>

      <div className={styles.options}>
        {question.options.map((option) => {
          let optClass = styles.option
          if (isAnswered) {
            if (option === question.answer) optClass += ` ${styles.correct}`
            else if (option === selectedAnswer) optClass += ` ${styles.wrong}`
            else optClass += ` ${styles.dimmed}`
          }
          return (
            <button
              key={option}
              className={optClass}
              onClick={() => onSelect(option)}
              disabled={isAnswered}
            >
              <span className={styles.optionText}>{option}</span>
              {isAnswered && option === question.answer && (
                <span className={styles.icon}>✓</span>
              )}
              {isAnswered && option === selectedAnswer && option !== question.answer && (
                <span className={styles.icon}>✗</span>
              )}
            </button>
          )
        })}
      </div>

      {isAnswered && (
        <div className={`${styles.feedback} ${selectedAnswer === question.answer ? styles.feedbackCorrect : styles.feedbackWrong}`}>
          {selectedAnswer === question.answer
            ? '🎉 Correct!'
            : `❌ Wrong! The answer is: ${question.answer}`}
        </div>
      )}
    </div>
  )
}

export default QuestionCard
