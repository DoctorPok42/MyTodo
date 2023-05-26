import { useDrag } from 'react-dnd';
import { ItemTypes } from './constants';
import styles from "./styles.module.scss";
import { TodoProps } from '../../types/todo';

interface TodoCardProps {
  todoId: number;
  id: number;
  title: string;
  description: string;
  created_at: string;
  due_date: string;
  status: string;
  user_id: string;
  todoSelected: TodoProps;
  setTodoSelected: (todo: any) => void;
  setIsPanelOpen: (isPanelOpen: boolean) => void;
  isOverlay?: boolean;
}

const TodoCard = ({
  todoId,
  id,
  title,
  description,
  created_at,
  due_date,
  status,
  user_id,
  todoSelected,
  setTodoSelected,
  setIsPanelOpen,
  isOverlay = false,
}: TodoCardProps) => {

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TODO_CARD,
    item: { todo: {
      todoId: todoId,
      id: id,
      title: title,
      description: description,
      created_at: created_at,
      due_date: due_date,
      status: status,
      user_id: user_id,
    }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <main className={styles.containercard}
      ref={drag}
      style={{
        cursor: isDragging ? "grabbing" : "grab",
        opacity: isDragging ? 0.5 : 1,
      }}>
      <div className={styles.contentcard}>
        <div className={styles.headcard}>
          {status === "done" ? (
            <svg aria-hidden="false" focusable="false" aria-label="Done" role="img" viewBox="0 0 16 16" width="16" height="16" fill="#8250df">
                    <path d="M11.28 6.78a.75.75 0 0 0-1.06-1.06L7.25 8.69 5.78 7.22a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l3.5-3.5Z"></path>
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0Zm-1.5 0a6.5 6.5 0 1 0-13 0 6.5 6.5 0 0 0 13 0Z"></path>
                  </svg>
                  ) : (
                    <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 16 16" width="16" height="16" fill="#dd7815"><path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z"></path></svg>
                  )}
          <h4>#{id}</h4>
        </div>
        <div className={styles.titlecard}>
          <span
            onClick={() => {
              setTodoSelected({
                todoId: todoId,
                id: id,
                title: title,
                description: description,
                created_at: created_at,
                due_date: due_date,
                status: status,
                user_id: user_id,
              });
              setIsPanelOpen(true);
            }}>
            {title}
          </span>
        </div>
      </div>
    </main>
  );
};

export default TodoCard;
