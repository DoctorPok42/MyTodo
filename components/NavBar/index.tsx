import styles from './styles.module.scss'

interface NavBarProps {
  is_connected: boolean
  is_loading?: boolean
}

const NavBar = ({ is_connected, is_loading }: NavBarProps) => {
  return (
    <main className={styles.containernavbar}>
      <div className={styles.containerlogo}>
        <img
          src="/favicon.ico"
          alt="logo"
          style={{
            animation: is_loading
              ? 'spin 3s infinite cubic-bezier(0.25, 0.72, 0.53, 0.99)'
              : '',
          }}
        />
        <h2>MyTodo</h2>
      </div>

      <div className={styles.navabarbuttons}>
        <a href='/'>Home</a>
        <a href='/todo'>Tasks</a>
        <a href={
          is_connected ? '/me' : '/login'
        }>{is_connected ? 'Profile' : 'Login'}</a>
      </div>
    </main>
  )
}

export default NavBar
