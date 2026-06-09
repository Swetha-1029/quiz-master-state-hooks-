import React, { useState } from 'react'
import styles from './ResultScreen.module.css'

function ResultScreen({ score, total, answers, onRestart, onHome }) {
  const [showReview, setShowReview] = useState(false)
  const percent = Math.round((score / total) * 100)

  const getMessage = () => {
    if (percent === 100) return { text: 'Perfect Score! 🏆', sub: 'Outstanding! You nailed every single question.' }
    if (percent >= 80) return { text: 'Excellent! 🎉', sub: 'Great work! You really know your stuff.' }
    if (percent >= 60) return { text: 'Good Job! 👍', sub: 'Solid performance. A little more practice and you\'ll ace it.' }
    if (percent >= 40) return { text: 'Keep Going! 💪', sub: 'You\'re getting there. Review the answers and try again.' }
    return { text: 'Keep Studying! 📚', sub: 'Don\'t give up! Review the material and give it another shot.' }
  }

  const { text, sub } = getMessage()

  return (
    <div className={styles.screen}>
      <div className={styles.scoreCircle}>
        <span className={styles.scoreNum}>{percent}%</span>
        <span className={styles.scoreLabel}>Score</span>
      </div>

      <h2 className={styles.message}>{text}</h2>
      <p className={styles.sub}>{sub}</p>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statNum} style={{ color: 'var(--success)' }}>{score}</span>
          <span className={styles.statLabel}>Correct</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.stat}>
          <span className={styles.statNum} style={{ color: 'var(--danger)' }}>{total - score}</span>
          <span className={styles.statLabel}>Wrong</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.stat}>
          <span className={styles.statNum}>{total}</span>
          <span className={styles.statLabel}>Total</span>
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.reviewBtn} onClick={() => setShowReview(!showReview)}>
          {showReview ? 'Hide Review' : 'Review Answers'}
        </button>
        <button className={styles.restartBtn} onClick={onRestart}>Try Again</button>
        <button className={styles.homeBtn} onClick={onHome}>Home</button>
      </div>

      {showReview && (
        <div className={styles.review}>
          {answers.map((a, i) => (
            <div key={i} className={`${styles.reviewItem} ${a.isCorrect ? styles.reviewCorrect : styles.reviewWrong}`}>
              <p className={styles.reviewQ}>{i + 1}. {a.question}</p>
              <p className={styles.reviewA}>
                Your answer: <strong>{a.selected}</strong>
              </p>
              {!a.isCorrect && (
                <p className={styles.reviewC}>Correct: <strong>{a.correct}</strong></p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ResultScreen
