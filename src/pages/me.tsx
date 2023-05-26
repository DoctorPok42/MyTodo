import { useEffect, useState } from "react";
import { NavBar, UserCard } from "../../components";
import { connectToDatabase } from "../../lib/db";
import { NextPageContext } from "next";
import { parse } from "path";

const Todo = (props: any) => {
  const { users } = props;
  const [user, setUser] = useState(users[0]);
  const [is_connected] = useState<boolean>(props.is_connected);

  const updateUser = async () => {
    const response = await fetch(`/api/user/updateUser`, {
      method: "PUT",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  useEffect(() => {
    updateUser();
  }, [user]);
  var app = process.browser ? document.getElementsByTagName("BODY")[0] : null;
  if (app) {
    if (localStorage.lightMode == "dark") {
      app.setAttribute("light-mode", "dark");
    } else {
      app.setAttribute("light-mode", "light");
    }
  }
  return (
    <main className="container_user">
      <NavBar is_connected={is_connected} />
      <UserCard user={user} setUser={setUser} />
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

  const users = await db.collection("users")
    .find({
      id: parseInt(data.token.split("-")[0]),
    }).toArray();

  return {
    props: {
      is_connected: true,
      users: JSON.parse(JSON.stringify(users)),
    },
  };
}
