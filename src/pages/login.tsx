import Head from 'next/head'
import { LoginCard, Register } from '../../components'
import { useState } from 'react'

const Login = () => {
  const [have_account, setHaveAccount] = useState<boolean>(true)
  return (
    <>
      <Head>
        <title>Login | MyTodo</title>
        <meta name="description" content="MyTodo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="login">
        <p></p>
        <p></p>

        {have_account ? (
          <LoginCard setHaveAccount={setHaveAccount} />
        ) : (
          <Register setHaveAccount={setHaveAccount} />
        )}
      </section>
    </>
  )
}

export default Login
