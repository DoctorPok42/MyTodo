import '@/styles/globals.scss'
import '@/styles/login.scss'
import '@/styles/todo.scss'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
