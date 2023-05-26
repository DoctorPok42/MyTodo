import { UserProps } from '../../types/user'
import { Input } from '../../components'
import styles from './styles.module.scss'

interface UserCardProps {
  user: UserProps
  setUser: (user: UserProps) => void
}

const UserCard = ({
  user,
  setUser,
}: UserCardProps) => {
  return (
    <main className={styles.container_user_card}>
      <div className={styles.content_user_card}>
        <div className={styles.color_user_card}>
          <div className={styles.img_user_card}>
            <img
              alt={user.name}
              src={`https://api.dicebear.com/6.x/identicon/png?seed=${user.name}`}
            />
          </div>
        </div>
        <div className={styles.info_user_card}>
            <Input
              name="Name"
              text={user.name}
              setText={(text: string) => {
                setUser({
                  ...user,
                  name: text,
                })
              }}
            />
            <Input
              name='First Name'
              text={user.firstname}
              setText={(text: string) => {
                setUser({
                  ...user,
                  firstname: text,
                })
              }}
            />
            <Input
              name='Email'
              text={user.email}
              setText={(text: string) => {
                setUser({
                  ...user,
                  email: text,
                })
              }}
            />
            <Input
              name='Password'
              text={""}
              setText={(text: string) => {
                setUser({
                  ...user,
                  password: text,
                })
              }}
            />
        </div>
      </div>
    </main>
  )
}

export default UserCard
