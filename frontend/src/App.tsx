import { useEffect, useState } from 'react';
import { getTodos, createTodo, toggleDone, deleteTodo } from './api';

type Todo = {
  id: number;
  title: string;
  description?: string;
  done: boolean;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  async function loadTodos() {
    const data = await getTodos();
    setTodos(data);
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return alert('Title required');

    await createTodo({ title, description });
    setTitle('');
    setDescription('');
    loadTodos();
  }

  async function handleToggle(id: number, done: boolean) {
    await toggleDone(id, !done);
    loadTodos();
  }

  async function handleDelete(id: number) {
    await deleteTodo(id);
    loadTodos();
  }

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '40px auto',
        fontFamily: 'sans-serif',
      }}
    >
      <h1>Todo App</h1>

      {/* Create Form */}
      <form onSubmit={handleCreate} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginRight: '10px', padding: '8px' }}
        />
        <input
          type="text"
          placeholder="Description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ marginRight: '10px', padding: '8px' }}
        />
        <button type="submit">Add</button>
      </form>

      {/* Todo List */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '10px',
              marginBottom: '10px',
              background: '#f4f4f4',
              borderRadius: '5px',
            }}
          >
            <div>
              <strong
                style={{ textDecoration: todo.done ? 'line-through' : '' }}
              >
                {todo.title}
              </strong>
              <div>{todo.description}</div>
            </div>
            <div>
              <button
                onClick={() => handleToggle(todo.id, todo.done)}
                style={{ marginRight: '10px' }}
              >
                {todo.done ? 'Undo' : 'Done'}
              </button>

              <button
                onClick={() => handleDelete(todo.id)}
                style={{ background: 'red', color: 'white' }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
