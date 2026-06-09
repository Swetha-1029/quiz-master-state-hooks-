import React from 'react'
import styles from './ProgressBar.module.css'

function ProgressBar({ current, total, score }) {
  const percent = Math.round((current / total) * 100)

  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <span className={styles.qNum}>Question {current} of {total}</span>
        <span className={styles.scoreLabel}>Score: <strong>{score}</strong></span>
      </div>
      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}

export default ProgressBar
