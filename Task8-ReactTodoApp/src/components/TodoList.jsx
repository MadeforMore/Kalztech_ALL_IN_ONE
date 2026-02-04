import TodoItem from './TodoItem'
import './TodoList.css'

function TodoList({ todos, onToggleTodo, onDeleteTodo, onEditTodo }) {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <p>No todos yet. Add one above!</p>
      </div>
    )
  }

  return (
    <div className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={() => onToggleTodo(todo.id)}
          onDelete={() => onDeleteTodo(todo.id)}
          onEdit={(newText) => onEditTodo(todo.id, newText)}
        />
      ))}
    </div>
  )
}

export default TodoList