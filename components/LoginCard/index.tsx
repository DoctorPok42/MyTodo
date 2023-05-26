import { useState } from 'react'
import styles from './styles.module.scss'
import router from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Alert } from "@mui/material";

interface LoginCardProps {
  setHaveAccount: (have_account: boolean) => void
}

const LoginCard = ({ setHaveAccount }: LoginCardProps) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handlSubmit = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (data.error) {
        setError(data.error)
      }
      if (data.token) {
        setLoading(false)
        router.push('/todo')
      }
    } catch (error) {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className={styles.containerLoginCard}>
      <div className={styles.goback}>
        <FontAwesomeIcon
          onClick={() => {
            javascript: history.back()
          }}
          icon={faCircleArrowLeft}
        />
      </div>
      <div className={styles.loginCard}>
        <div className={styles.loginCard_title}>
          <h2>Login - MyTodo</h2>
        </div>

        {error !== '' && (
          <Alert
            className={styles.alert}
            severity="error"
            onClose={() => setError("")}>
            {error}
          </Alert>
        )}

        <div className={styles.loginCard_form}>
          <div className={styles.loginCard_form_input}>
            <label htmlFor="username">Email</label>
            <input
              type="text"
              name="username"
              id="username"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.loginCard_form_input}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={styles.loginCard_form_button}>
            <button
              className={styles.loginCard_form_button_submit}
              onClick={handlSubmit}
              style={{
                backgroundColor: loading ? 'var(--blue-dark)' : error === '' ? 'var(--blue)' : 'var(--red)',
                cursor: loading ? 'not-allowed' : 'pointer',
                animation: error != "" ? "shake 0.5s" : "",
              }}
            >
              {loading ? 'Loading...' : 'Login'}
            </button>
          </div>
          <span>Don't have an account ? <a onClick={() => setHaveAccount(false)}>Register</a></span>
        </div>
      </div>
    </main>
  )
}

export default LoginCard
