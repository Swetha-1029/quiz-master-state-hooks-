import React, { useState } from 'react'
import styles from './StartScreen.module.css'

const CATEGORIES = ['All', 'JavaScript', 'React', 'General Web']

function StartScreen({ onStart }) {
  const [selected, setSelected] = useState('All')

  return (
    <div className={styles.screen}>
      <div className={styles.badge}>🧠 Quiz Master</div>
      <h1 className={styles.title}>Test Your Web Dev Knowledge</h1>
      <p className={styles.sub}>15 questions across JavaScript, React & Web fundamentals. Pick a category and go!</p>

      <div className={styles.section}>
        <p className={styles.label}>Choose Category</p>
        <div className={styles.categories}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`${styles.catBtn} ${selected === cat ? styles.active : ''}`}
              onClick={() => setSelected(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statNum}>15</span>
          <span className={styles.statLabel}>Questions</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.stat}>
          <span className={styles.statNum}>3</span>
          <span className={styles.statLabel}>Categories</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.stat}>
          <span className={styles.statNum}>∞</span>
          <span className={styles.statLabel}>Attempts</span>
        </div>
      </div>

      <button className={styles.startBtn} onClick={() => onStart(selected)}>
        Start Quiz →
      </button>
    </div>
  )
}

export default StartScreen
