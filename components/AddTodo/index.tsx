import { TodoProps } from '../../types/todo'
import { UserProps } from '../../types/user'
import styles from './styles.module.scss'

interface AddTodoProps {
  todos: TodoProps[]
  todoSelected: TodoProps
  setTodoSelected: (todos: any) => void
  setIsPanelOpen: (isPanelOpen: boolean) => void
  users: UserProps
}

const AddTodo = ({
  todos,
  todoSelected,
  setTodoSelected,
  setIsPanelOpen,
  users,
}: AddTodoProps) => {

  const handleAddTodo = () => {
    var newId;
    if (todos.length === 0) {
      newId = 1;
    } else {
      newId = Math.max.apply(Math, todos.map((todo: any) => { return todo.id; })) + 1;
    }
    setTodoSelected({
      todoId: 0,
      id: newId,
      title: '',
      description: '',
      created_at: JSON.stringify(new Date()).slice(1, 11),
      due_date: JSON.stringify(new Date()).slice(1, 11),
      status: '',
      user_id: JSON.stringify(users.id),
    });
    setIsPanelOpen(true);
  }

  return (
    <main className={styles.container_input}>
      <div className={styles.edit} onClick={() => handleAddTodo()}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={16} height={16} fill='currentColor'><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
        <span>
          Add Todo
        </span>
      </div>
    </main>
  )
}

export default AddTodo
