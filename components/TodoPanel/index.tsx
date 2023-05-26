import HeadPanel from './head'
import DescriptionPanel from './description'
import InfoPanel from './info'

import styles from './styles.module.scss'
import { TodoProps } from '../../types/todo'
import { UserProps } from '../../types/user'

interface TodoPanelProps {
  todoSelected: any
  setIsPanelOpen: (isPanelOpen: boolean) => void
  setTodoSelected: (todos: any) => void
  loading: boolean
  todos: TodoProps[]
  setTodos: (todos: TodoProps[]) => void
  users: UserProps
}

const TodoPanel = ({
  todoSelected,
  setIsPanelOpen,
  setTodoSelected,
  loading,
  todos,
  setTodos,
  users,
}: TodoPanelProps) => {
  return (
    <main className={styles.containertodopanel}
      onKeyDown={(e) => e.key === 'Escape' && setIsPanelOpen(false)}
      tabIndex={0}>
      <div className={styles.contenttodopanel}>
      <HeadPanel
        todoSelected={todoSelected}
        setTodoSelected={setTodoSelected}
        setIsPanelOpen={setIsPanelOpen}
        loading={loading}
        users={users}
      />
      <DescriptionPanel
        todoSelected={todoSelected}
        setTodoSelected={setTodoSelected}
      />
      <InfoPanel
        todoSelected={todoSelected}
        setTodoSelected={setTodoSelected}
        setIsPanelOpen={setIsPanelOpen}
        todos={todos}
        setTodos={setTodos}
      />
      </div>
    </main>
  )
}

export default TodoPanel
