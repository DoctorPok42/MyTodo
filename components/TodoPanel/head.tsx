import { useState } from 'react'
import { formateDate } from './data'

import styles from './styles.module.scss'
import { Input } from '..'
import { CircularProgress } from '@mui/material'
import { UserProps } from '../../types/user'

interface HeadPanelProps {
  todoSelected: any
  setTodoSelected: (todos: any) => void
  setIsPanelOpen: (isPanelOpen: boolean) => void
  loading: boolean
  users: UserProps
}

const HeadPanel = ({
  todoSelected,
  setTodoSelected,
  setIsPanelOpen,
  loading,
  users
}: HeadPanelProps) => {
  const [isEditTitle, setIsEditTitle] = useState(false)
  const [newTitle, setNewTitle] = useState<string>(todoSelected.title)

  if (!isEditTitle && newTitle !== todoSelected.title) {
    setTodoSelected({
      ...todoSelected,
      title: newTitle
    })
  }

    return (
        <div className={styles.head}>
          <div className={styles.close}>
            <div className={styles.icon} onClick={() => setIsPanelOpen(false)}>
              <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 16 16" width="16" height="16" fill="currentColor"><path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L9.06 8l3.22 3.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L8 9.06l-3.22 3.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z"></path></svg>
            </div>
          </div>
          <div className={styles.title}>
            {isEditTitle ? (
              <Input
                name="Title"
                text={newTitle}
                setText={setNewTitle}
                isTextArea={false}
                isTitle={true}
              />
            ) : (
              <h2>{todoSelected.title} <span>#{todoSelected.id}</span></h2>
            )}
            <div className={styles.edit} onClick={() => setIsEditTitle(!isEditTitle)}>
              <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path d="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Zm.176 4.823L9.75 4.81l-6.286 6.287a.253.253 0 0 0-.064.108l-.558 1.953 1.953-.558a.253.253 0 0 0 .108-.064Zm1.238-3.763a.25.25 0 0 0-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 0 0 0-.354Z"></path></svg>
              <span>
                {isEditTitle ? 'Save' : 'Edit'}
              </span>
            </div>
          </div>
          <div className={styles.infos}>
            <div className={styles.info}>
              {todoSelected.status === 'done' ? (
                <div className={styles.status} style={{
                  backgroundColor: '#8250df',
                }}>
                  <svg aria-hidden="false" focusable="false" aria-label="Done" role="img" viewBox="0 0 16 16" width="16" height="16" fill="#ffffff">
                    <path d="M11.28 6.78a.75.75 0 0 0-1.06-1.06L7.25 8.69 5.78 7.22a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l3.5-3.5Z"></path>
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0Zm-1.5 0a6.5 6.5 0 1 0-13 0 6.5 6.5 0 0 0 13 0Z"></path>
                  </svg>
                  <span>Done</span>
                  </div>
              ) : (
                <div className={styles.status} style={{
                  backgroundColor: '#dd7815',
                }}>
                  <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 16 16" width="16" height="16" fill="#ffffff"><path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z"></path></svg>
                  <span>Pending</span>
                </div>
              )}
            </div>
            <div className={styles.info}>
              <div className={styles.date}>
                <span>{users.firstname} <span id={styles.dateformat}>opened on {formateDate(todoSelected.created_at)}</span></span>
              </div>

              {loading && (
                <div className={styles.loading}>
                    <CircularProgress size={15} color='inherit' />
                    <span>Saving</span>
                </div>
              )}
            </div>
          </div>
        </div>
    )
}

export default HeadPanel