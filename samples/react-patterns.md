# React Patterns: What AI Gets Right vs Wrong

## CSC 436 — Week 2 Reference

A practical guide to evaluating AI-generated React code.

---

## Patterns AI Gets RIGHT ✅

### 1. Basic Component Structure

AI reliably generates clean functional components with proper JSX:

```jsx
function UserCard({ name, email, avatar }) {
  return (
    <div className="user-card">
      <img src={avatar} alt={`${name}'s avatar`} />
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  );
}
```

**Why it works:** This is the most common pattern in React codebases. AI has seen millions of examples.

### 2. useState for Simple State

AI handles simple state well — counters, toggles, text inputs:

```jsx
const [isOpen, setIsOpen] = useState(false);
const [name, setName] = useState('');
const [count, setCount] = useState(0);
```

### 3. Conditional Rendering

AI is good at conditional rendering patterns:

```jsx
// Short-circuit
{isLoggedIn && <Dashboard />}

// Ternary
{loading ? <Spinner /> : <Content data={data} />}

// Early return
if (error) return <ErrorMessage error={error} />;
```

### 4. Event Handling Basics

Simple event handlers are usually correct:

```jsx
<button onClick={() => setCount(count + 1)}>Increment</button>
<input onChange={(e) => setName(e.target.value)} />
```

### 5. List Rendering

AI knows the `.map()` pattern (though it may get keys wrong — see below):

```jsx
{items.map(item => (
  <ListItem key={item.id} item={item} />
))}
```

---

## Patterns AI Gets WRONG ❌

### 1. State Mutation

**The problem:** AI often mutates state directly instead of creating new references.

```jsx
// ❌ AI generates this
const addItem = (item) => {
  items.push(item);          // mutation!
  setItems(items);           // same reference
};

// ✅ Correct
const addItem = (item) => {
  setItems(prev => [...prev, item]);
};
```

**Why AI does this:** Mutation code is shorter and looks correct. In vanilla JS, `push` is normal. AI doesn't always distinguish React's immutability requirement.

**How to spot it:** Look for `.push()`, `.splice()`, `.sort()` on state, or direct property assignment (`obj.key = value`).

### 2. Key Props

**The problem:** AI uses array indices as keys, or omits keys entirely.

```jsx
// ❌ Index keys — break with reorder/delete
{todos.map((todo, index) => (
  <TodoItem key={index} todo={todo} />
))}

// ✅ Stable unique IDs
{todos.map(todo => (
  <TodoItem key={todo.id} todo={todo} />
))}
```

**Why AI does this:** Index keys suppress the React warning, and many tutorial examples use them.

**When index keys ARE okay:** Static lists that never reorder, filter, or change length.

### 3. useEffect Dependencies

**The problem:** AI omits dependencies, adds wrong ones, or suggests suppressing the ESLint rule.

```jsx
// ❌ Missing dependency
useEffect(() => {
  fetchData(userId);
}, []); // userId is used but not in deps!

// ❌ AI suggests
// eslint-disable-next-line react-hooks/exhaustive-deps

// ✅ Correct
useEffect(() => {
  fetchData(userId);
}, [userId]);
```

**Why AI does this:** The empty dependency array (`[]`) is a common pattern for "run once." AI doesn't always analyze which variables are used inside the effect.

**Rule of thumb:** Trust the ESLint `exhaustive-deps` rule over AI's suggestion to suppress it.

### 4. Stale Closures

**The problem:** State values captured in closures become stale.

```jsx
// ❌ count is captured at mount time
useEffect(() => {
  const id = setInterval(() => {
    setCount(count + 1); // always uses initial count (0)
  }, 1000);
  return () => clearInterval(id);
}, []);

// ✅ Functional updater avoids the closure issue
useEffect(() => {
  const id = setInterval(() => {
    setCount(prev => prev + 1);
  }, 1000);
  return () => clearInterval(id);
}, []);
```

**Why AI does this:** Both versions look correct at a glance. AI doesn't model closure semantics well.

### 5. Missing useEffect Cleanup

**The problem:** AI creates subscriptions, timers, or event listeners without cleanup.

```jsx
// ❌ Interval leaks on unmount
useEffect(() => {
  setInterval(() => setTime(new Date()), 1000);
}, []);

// ✅ Cleanup prevents memory leak
useEffect(() => {
  const id = setInterval(() => setTime(new Date()), 1000);
  return () => clearInterval(id);
}, []);
```

### 6. Prop Drilling Over Context

**The problem:** AI passes props through many intermediate components.

```jsx
// ❌ Theme prop drilled through 4 layers
<App theme={theme}>
  <Layout theme={theme}>
    <Sidebar theme={theme}>
      <MenuItem theme={theme} />

// ✅ Use Context for widely-shared state
const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Layout>
        <Sidebar>
          <MenuItem /> {/* accesses theme via useContext */}
```

**When prop drilling IS okay:** 2-3 levels, or when only a few components need the data.

### 7. Premature useCallback/useMemo

**The problem:** AI wraps everything in `useCallback` and `useMemo` unnecessarily.

```jsx
// ❌ Unnecessary — this function is cheap to create
const handleClick = useCallback(() => {
  setCount(prev => prev + 1);
}, []);

// ✅ Just use a plain function
const handleClick = () => {
  setCount(prev => prev + 1);
};
```

**When to use `useCallback`:** When passing callbacks to memoized child components (`React.memo`) and you've measured a performance issue.

**When to use `useMemo`:** When computing a value is genuinely expensive (sorting large arrays, complex calculations).

### 8. Missing Error/Loading States

**The problem:** AI generates the happy path but forgets error handling.

```jsx
// ❌ No loading or error state
function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users').then(r => r.json()).then(setUsers);
  }, []);

  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}

// ✅ Handle all states
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/users')
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(setUsers)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (users.length === 0) return <p>No users found.</p>;

  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}
```

---

## AI Prompting Tips for Better React Code

### Be specific about patterns you want:

> "Use the functional updater form for all setState calls that depend on previous state."

> "Include loading, error, and empty states for any component that fetches data."

> "Use crypto.randomUUID() for IDs, not Date.now() or array indices."

### Ask AI to review its own code:

> "Review this component for: state mutation, missing keys, incorrect useEffect dependencies, missing cleanup, and accessibility issues."

### Request specific patterns:

> "Extract the state logic into a custom hook called useNotes."

> "Use Context API instead of prop drilling for the theme."

> "Add a cleanup function to the useEffect that clears the interval."

---

## Quick Reference: React Code Review Checklist

- [ ] Every `.map()` has a unique, stable `key` prop (not index)
- [ ] State updates are immutable (no `.push()`, `.splice()`, direct assignment)
- [ ] `useEffect` has correct dependency array
- [ ] `useEffect` cleanup function for timers, subscriptions, listeners
- [ ] Functional updater (`prev => ...`) when state depends on previous value
- [ ] Controlled inputs have both `value` and `onChange`
- [ ] Forms use `onSubmit` with `e.preventDefault()`
- [ ] Loading, error, and empty states are handled
- [ ] Components follow single responsibility principle
- [ ] No direct DOM manipulation (`document.querySelector`, etc.)
