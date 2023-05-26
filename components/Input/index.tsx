import styles from './styles.module.scss'

interface TodoCardProps {
  name: string
  text: string
  setText?: (text: string) => void
  isTextArea?: boolean
  isTitle?: boolean
  isDate?: boolean
}

const TodoCard = ({
  name,
  text,
  setText,
  isTextArea,
  isTitle,
  isDate,
}: TodoCardProps) => {
  return (
    <main className={styles.container_input}>
      {(!isTextArea && !isTitle) && ( <div className={styles.title}>
        <h2>{name}</h2>
      </div>
      )}
      <div className={styles.content}>
        <div className={styles.display_text}>
          {isTextArea ? (
            <textarea
              className={styles.textarea}
              value={text}
              onChange={(event) => {
                setText && setText(event.target.value)
              }}
            />
          ) : (
            <input
              {...(isDate ? { type: 'date' } : { type: 'text' })}
              {...(isDate
                ? { min: JSON.stringify(text).slice(1, 11) }
                : {})}
              className={styles.input}
              style={{
                ...(isTitle ? { width: '80%' } : {}),
              }}
              {...(isDate ? { value: text.slice(0, 10) } : { value: text })}
              onChange={(event) => {
                setText && setText(event.target.value)
              }}
            />
          )}
        </div>
      </div>
    </main>
  )
}

export default TodoCard
