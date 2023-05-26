import { useEffect, useState } from "react";
import { NavBar, Column, TodoPanel, DarkMode, AddTodo } from "../../components";
import { connectToDatabase } from "../../lib/db";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TodoProps } from "../../types/todo";
import { NextPageContext } from "next";

const Todo = (props: any) => {
  var one = true;
  const [todoSelected, setTodoSelected] = useState<TodoProps>({} as TodoProps);
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [todos, setTodos] = useState<TodoProps[]>(props.todos);

  const updateTodo = async () => {
    const response = await fetch(`/api/todos/updateTodo`, {
      method: "PUT",
      body: JSON.stringify(todoSelected),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  useEffect(() => {
    one = true;
    setLoading(true);
    const newwID = Math.max.apply(Math, todos.map((todo: any) => { return todo.id; })) + 1;
    setTodos(
      todos.map((todo: any) => {
        if (todo.id === todoSelected.id && one) {
          one = false;
          return todoSelected;
        }
        return todo;
      })
    );

    if (todoSelected.id === newwID) {
      setTodos([
        ...todos,
        {
          todoId: todoSelected.todoId,
          id: todoSelected.id,
          title: todoSelected.title,
          description: todoSelected.description,
          created_at: todoSelected.created_at,
          due_date: todoSelected.due_date,
          status: todoSelected.status,
          user_id: todoSelected.user_id,
        },
      ]);
    }

    todos.map((todo) => {
      if (todo.title === '') {
        const todoToDelete = todo.id;
        setTodos(todos.filter((todo) => todo.id !== todoToDelete));
      }
    })

    todos.sort((a: any, b: any) => {
      return b.id - a.id;
    });
    updateTodo();
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, [todoSelected]);

  var app = process.browser ? document.getElementsByTagName("BODY")[0] : null;
  if (app) {
    if (localStorage.lightMode == "dark") {
      app.setAttribute("light-mode", "dark");
    } else {
      app.setAttribute("light-mode", "light");
    }
  }

  return (
    <main>
      <NavBar is_connected={true} />
    <DndProvider backend={HTML5Backend}>
      <div className="todos">
    <AddTodo
      todos={todos}
      todoSelected={todoSelected}
      setTodoSelected={setTodoSelected}
      setIsPanelOpen={setIsPanelOpen}
      users={props.users[0]}
      />
      <DarkMode />
        <Column
          title="No started"
          subtitle="no_started"
          description="This item hasn't been started"
          color="#9e9e9e"
          nb_tasks={todos.filter((todo: any) => todo.status === "no_started").length}
          todos={todos.filter((todo: any) => todo.status === "no_started")}
          todoSelected={todoSelected}
          setTodoSelected={setTodoSelected}
          setIsPanelOpen={setIsPanelOpen}
        />
        <Column
          title="Todo"
          subtitle="todo"
          description="This item hasn't been started"
          color="#1f883d"
          nb_tasks={todos.filter((todo: any) => todo.status === "todo").length}
          todos={todos.filter((todo: any) => todo.status === "todo")}
          todoSelected={todoSelected}
          setTodoSelected={setTodoSelected}
          setIsPanelOpen={setIsPanelOpen}
        />
        <Column
          title="In progress"
          subtitle="in_progress"
          description="This is actively being worked on"
          color="#9a6700"
          nb_tasks={todos.filter((todo: any) => todo.status === "in_progress").length}
          todos={todos.filter((todo: any) => todo.status === "in_progress")}
          todoSelected={todoSelected}
          setTodoSelected={setTodoSelected}
          setIsPanelOpen={setIsPanelOpen}
        />
        <Column
          title="Done"
          subtitle="done"
          description="This has been completed"
          color="#8250df"
          nb_tasks={todos.filter((todo: any) => todo.status === "done").length}
          todos={todos.filter((todo: any) => todo.status === "done")}
          todoSelected={todoSelected}
          setTodoSelected={setTodoSelected}
          setIsPanelOpen={setIsPanelOpen}
        />
      </div>
    </DndProvider>
      {isPanelOpen && <TodoPanel
        todoSelected={todoSelected}
        setIsPanelOpen={setIsPanelOpen}
        setTodoSelected={setTodoSelected}
        loading={loading}
        todos={todos}
        setTodos={setTodos}
        users={props.users[0]}
        />
      }
    </main>
  );
};

export default Todo;

export async function getServerSideProps(ctx: NextPageContext) {
  if (!ctx.req || !ctx.res)
    return {
      props: {},
  };

  const cookies = ctx.req.headers.cookie;
  if (!cookies) {
    ctx.res.writeHead(302, { Location: "/login" });
    ctx.res.end();
    return { props: {} };
  }

  const res = await fetch('http://localhost:3000/api/user/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: cookies.split("=")[1] }),
  })
  let data = await res.json()
  if (data.error) {
    ctx.res.writeHead(302, { Location: "/login" });
    ctx.res.end();
    return { props: {} };
  }

  const { db } = await connectToDatabase();
  const todos = await db.collection("todo").find({
    user_id: data.token,
  }).toArray();

  const users = await db.collection("users").find({
    id: parseInt(data.token.split("-")[0]),
  }).toArray();

  return {
    props: {
      todos: JSON.parse(JSON.stringify(todos)),
      users: JSON.parse(JSON.stringify(users)),
    },
  };
}