import { useDrop } from 'react-dnd';
import { ItemTypes } from '../TodoCard/constants';

import TodoCard from '../TodoCard'
import { TodoProps } from '../../types/todo';

import styles from './styles.module.scss'

interface ColumnProps {
  title: string;
  subtitle: string;
  description: string;
  color: string;
  nb_tasks: number;
  todos?: TodoProps[];
  todoSelected: any;
  setTodoSelected: (todo: any) => void;
  setIsPanelOpen: (isPanelOpen: boolean) => void;
}

const Column = ({
  title,
  subtitle,
  description,
  color,
  nb_tasks,
  todos,
  todoSelected,
  setTodoSelected,
  setIsPanelOpen,
}: ColumnProps) => {

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.TODO_CARD,
    drop: (item) => {
      changeStatus(item.todo);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const changeStatus = (todo: any) => {
    setTodoSelected({
      todoId: todo.todoId,
      id: todo.id,
      title: todo.title,
      description: todo.description,
      created_at: todo.created_at,
      due_date: todo.due_date,
      status: subtitle,
      user_id: todo.user_id,
    });
  }

  return (
    <main className={styles.containercolumn} ref={drop}>
      <div className={styles.head}>
        <p style={{
          backgroundColor: color,
        }}></p>
        <div className={styles.title}>
          <h1>{title}</h1>
        </div>
        <div className={styles.nb_tasks}>
          <span>{nb_tasks}</span>
        </div>
        <div className={styles.description}>
          <span>{description}</span>
        </div>
      </div>

      <div className={styles.todos}>
        {isOver && <div className={styles.dropzone}></div>}
        {todos && todos.map((todo: any) => (
          <TodoCard
            key={todo.todoId}
            todoId={todo.todoId}
            id={todo.id}
            title={todo.title}
            description={todo.description}
            created_at={todo.created_at}
            due_date={todo.due_date}
            status={todo.status}
            user_id={todo.user_id}
            todoSelected={todoSelected}
            setTodoSelected={setTodoSelected}
            setIsPanelOpen={setIsPanelOpen}
            isOverlay={false}
          />
        ))}
      </div>
    </main>
  )
}

export default Column
