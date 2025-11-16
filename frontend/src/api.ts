const API_URL = "http://localhost:3000";

export async function getTodos() {
  const res = await fetch(`${API_URL}/todos`);
  return res.json();
}

export async function createTodo(data: { title: string; description?: string }) {
  const res = await fetch(`${API_URL}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function toggleDone(id: number, done: boolean) {
  const res = await fetch(`${API_URL}/todos/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ done }),
  });
  return res.json();
}

export async function deleteTodo(id: number) {
  const res = await fetch(`${API_URL}/todos/${id}`, {
    method: "DELETE",
  });
  return res.json();
}