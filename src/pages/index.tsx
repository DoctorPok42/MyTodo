import Head from 'next/head'
import { NavBar } from '../../components'
import { useState } from 'react'
import Link from 'next/link'
import { NextPageContext } from 'next'

const Home = (props: any) => {
  const [is_connected, setIsConnected] = useState<boolean>(props.is_connected)
  const [is_loading, setIsLoading] = useState<boolean>(false)
  return (
    <>
      <Head>
        <title>MyTodo</title>
        <meta name="description" content="MyTodo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar is_connected={is_connected} is_loading={is_loading} />

      <section className="container1">
        <p></p>
        <p></p>
        <div className="container1_title">
          <h2>MyTodo</h2>
        </div>
        <div className="container1_text">
          <h4>
            An app to manage your <span>tasks</span>, <span>projects</span> and
            your <span>life</span>
          </h4>
          <h4>
            It's <span>free</span> and <span>open source</span>
          </h4>
        </div>

        <div className="container1_button">
          <Link href={'/login'} className="button_start">
            Get Started
          </Link>
        </div>
      </section>
    </>
  )
}

export const getServerSideProps = async (ctx: NextPageContext) => {
  if (!ctx.req)
    return {
      props: {},
  };

  if (!ctx.res)
    return {
      props: {},
  };

  const cookies = ctx.req.headers.cookie;

  if (!cookies) {
    return {
      props: {},
    }
  }

  const res = await fetch('http://localhost:3000/api/user/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: cookies.split("=")[1] }),
  })
  const data = await res.json()
  if (data.error) {
    return { props: {} };
  }
  return {
    props: {
      is_connected: true,
    },
  }
}

export default Home
