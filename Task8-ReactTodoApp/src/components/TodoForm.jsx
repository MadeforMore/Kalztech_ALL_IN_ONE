import { useState } from 'react'
import './TodoForm.css'

function TodoForm({ onAddTodo }) {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputValue.trim()) {
      onAddTodo(inputValue)
      setInputValue('')
    }
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        placeholder="Add a new todo..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit" className="add-button">
        Add Todo
      </button>
    </form>
  )
}

export default TodoForm