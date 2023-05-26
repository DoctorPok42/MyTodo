export type Todo = {
  id: number
  title: string
  description: string
  created_at: Date
  due_time: Date
  user_id: number
  status: 'not started' | 'todo' | 'in progress' | 'done'
}

export type TodoProps = {
  todoId: number
  id: number
  title: string
  description: string
  created_at: Date
  due_date: Date
  user_id: number
  status: 'not started' | 'todo' | 'in progress' | 'done'
}
