/**
 * good-component.jsx
 *
 * CSC 436 — Week 2 Sample
 *
 * A well-structured React component demonstrating proper patterns:
 * - Custom hook for state logic
 * - Controlled form inputs
 * - Immutable state updates
 * - Proper key props
 * - Component composition
 * - Event handling patterns
 */
import { useState, useMemo } from 'react';
import './TaskManager.css';

// Custom hook — encapsulates all task state logic
function useTasks(initialTasks = []) {
  const [tasks, setTasks] = useState(initialTasks);

  const addTask = (title, priority = 'medium') => {
    setTasks(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title,
        priority,
        completed: false,
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  const toggleTask = (id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const stats = useMemo(() => ({
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    remaining: tasks.filter(t => !t.completed).length,
  }), [tasks]);

  return { tasks, addTask, toggleTask, deleteTask, stats };
}

// Presentational component — displays a single task
function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <label className="task-label">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span className="task-title">{task.title}</span>
      </label>
      <span className={`priority priority-${task.priority}`}>
        {task.priority}
      </span>
      <button
        className="delete-btn"
        onClick={() => onDelete(task.id)}
        aria-label={`Delete "${task.title}"`}
      >
        ✕
      </button>
    </li>
  );
}

// Presentational component — renders list of tasks
function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return (
      <p className="empty-state">
        No tasks yet. Add one above!
      </p>
    );
  }

  return (
    <ul className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

// Controlled form component
function AddTaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    onAdd(trimmed, priority);
    setTitle('');
    setPriority('medium');
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="What needs to be done?"
        aria-label="Task title"
        className="task-input"
      />
      <select
        value={priority}
        onChange={e => setPriority(e.target.value)}
        aria-label="Task priority"
        className="priority-select"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit" className="add-btn">
        Add Task
      </button>
    </form>
  );
}

// Stats display component
function TaskStats({ stats }) {
  return (
    <div className="task-stats">
      <span>{stats.total} total</span>
      <span>{stats.completed} done</span>
      <span>{stats.remaining} remaining</span>
    </div>
  );
}

// Container component — composes everything together
function TaskManager() {
  const { tasks, addTask, toggleTask, deleteTask, stats } = useTasks();
  const [filter, setFilter] = useState('all');

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'active': return tasks.filter(t => !t.completed);
      case 'completed': return tasks.filter(t => t.completed);
      default: return tasks;
    }
  }, [tasks, filter]);

  return (
    <div className="task-manager">
      <h1>Task Manager</h1>
      <AddTaskForm onAdd={addTask} />
      <TaskStats stats={stats} />
      <nav className="filter-nav" aria-label="Task filters">
        {['all', 'active', 'completed'].map(f => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </nav>
      <TaskList
        tasks={filteredTasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
      />
    </div>
  );
}

export default TaskManager;
