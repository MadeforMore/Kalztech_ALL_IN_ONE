import { useState } from 'react'
import TodoList from './components/TodoList'
import TodoForm from './components/TodoForm'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toLocaleString()
    }
    setTodos([...todos, newTodo])
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const editTodo = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText.trim() } : todo
    ))
  }

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed))
  }

  const completedCount = todos.filter(todo => todo.completed).length
  const totalCount = todos.length

  return (
    <div className="app">
      <header className="app-header">
        <h1>React Todo App</h1>
        <p>Components & State Management</p>
      </header>
      
      <main className="app-main">
        <TodoForm onAddTodo={addTodo} />
        
        <div className="todo-stats">
          <span>{totalCount} total</span>
          <span>{completedCount} completed</span>
          <span>{totalCount - completedCount} remaining</span>
        </div>

        <TodoList 
          todos={todos}
          onToggleTodo={toggleTodo}
          onDeleteTodo={deleteTodo}
          onEditTodo={editTodo}
        />

        {completedCount > 0 && (
          <button 
            className="clear-completed"
            onClick={clearCompleted}
          >
            Clear Completed ({completedCount})
          </button>
        )}
      </main>
    </div>
  )
}

export default App