import { useState } from 'react'
import TodoCard from '../TodoCard'

import styles from './styles.module.scss'
import { NextApiResponse } from 'next'

const darkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)

  const toggle_light_mode = () => {
    var app = document.getElementsByTagName("BODY")[0];

    if (localStorage.lightMode == "dark") {
      localStorage.lightMode = "light";
      app.setAttribute("light-mode", "light");
      setIsDarkMode(false)
    } else {
      localStorage.lightMode = "dark";
      app.setAttribute("light-mode", "dark");
      setIsDarkMode(true)
    }
  }
  return (
    <main className={styles.containerdarkmode}>
      <div className={styles.button} onClick={() => toggle_light_mode()}>
        <span>
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </span>
      </div>
    </main>
  )
}

export default darkMode
