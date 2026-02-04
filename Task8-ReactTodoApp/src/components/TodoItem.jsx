import { useState } from 'react'
import './TodoItem.css'

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const handleEdit = () => {
    if (isEditing && editText.trim()) {
      onEdit(editText)
    }
    setIsEditing(!isEditing)
  }

  const handleCancel = () => {
    setEditText(todo.text)
    setIsEditing(false)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEdit()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        className="todo-checkbox"
        checked={todo.completed}
        onChange={onToggle}
      />
      
      <div className="todo-content">
        {isEditing ? (
          <input
            type="text"
            className="edit-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyPress}
            onBlur={handleEdit}
            autoFocus
          />
        ) : (
          <div className="todo-text-container">
            <span className="todo-text">{todo.text}</span>
            <small className="todo-date">{todo.createdAt}</small>
          </div>
        )}
      </div>

      <div className="todo-actions">
        {isEditing ? (
          <>
            <button 
              className="save-button"
              onClick={handleEdit}
            >
              ✓
            </button>
            <button 
              className="cancel-button"
              onClick={handleCancel}
            >
              ✕
            </button>
          </>
        ) : (
          <>
            <button 
              className="edit-button"
              onClick={() => setIsEditing(true)}
              disabled={todo.completed}
            >
              ✏️
            </button>
            <button 
              className="delete-button"
              onClick={onDelete}
            >
              🗑️
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default TodoItem