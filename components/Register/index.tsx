import { useState } from 'react'
import styles from './styles.module.scss'
import router from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Alert } from "@mui/material";

interface RegisterProps {
  setHaveAccount: (have_account: boolean) => void
}

const Register = ({ setHaveAccount }: RegisterProps) => {
  const [firstname, setFirstname] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handlSubmit = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, firstname, name }),
      })
      const data = await res.json()
      if (data.error) {
        setError(data.error)
      }
      if (data.token) {
        localStorage.setItem('token', data.token)
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
    <main className={styles.containerregister}>
      <div className={styles.goback}>
        <FontAwesomeIcon
          onClick={() => {
            javascript: history.back()
          }}
          icon={faCircleArrowLeft}
        />
      </div>
      <div className={styles.register}>
        <div className={styles.register_title}>
          <h2>Register - MyTodo</h2>
        </div>

        {error !== '' && (
          <Alert
            className={styles.alert}
            severity="error"
            onClose={() => setError("")}>
            {error}
          </Alert>
        )}

        <div className={styles.register_form}>
          <div className={styles.register_form_input}>
            <label htmlFor="username">Firstname</label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
          <div className={styles.register_form_input}>
            <label htmlFor="username">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.register_form_input}>
            <label htmlFor="username">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.register_form_input}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={styles.register_form_button}>
            <button
              className={styles.register_form_button_submit}
              onClick={handlSubmit}
              style={{
                backgroundColor: loading ? 'var(--blue-dark)' : error === '' ? 'var(--blue)' : 'var(--red)',
                cursor: loading ? 'not-allowed' : 'pointer',
                animation: error != "" ? "shake 0.5s" : "",
              }}
            >
              {loading ? 'Loading...' : 'Register'}
            </button>
          </div>
          <span>Already have an account ? <a onClick={() => setHaveAccount(true)}>Login</a></span>
        </div>
      </div>
    </main>
  )
}

export default Register
