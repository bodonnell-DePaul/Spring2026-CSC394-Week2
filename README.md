# React and TypeScript for Computer Science Graduate Students
## Comprehensive Learning Guide for Web Development

---

## Table of Contents
1. [Introduction to React](#introduction-to-react)
2. [Setting Up Your Development Environment](#setting-up-your-development-environment)
3. [Understanding Components](#understanding-components)
4. [Working with Props and State](#working-with-props-and-state)
5. [Event Handling in React](#event-handling-in-react)
6. [React Hooks Deep Dive](#react-hooks-deep-dive)
7. [Context API for State Management](#context-api-for-state-management)
8. [Best Practices and Code Quality](#best-practices-and-code-quality)
9. [Sample Application Components](#sample-application-components)
10. [Building Towards a Complete Application](#building-towards-a-complete-application)

---

## Introduction to React

### What is React?
React is a JavaScript library developed by Facebook (now Meta) for building user interfaces, particularly for web applications. It follows a **component-based architecture** where the UI is broken down into independent, reusable pieces called components.

### Why React?
1. **Component-Based Architecture**: Build encapsulated components that manage their own state
2. **Virtual DOM**: Efficient rendering through a virtual representation of the DOM
3. **Declarative Programming**: Describe what the UI should look like, not how to achieve it
4. **Strong Ecosystem**: Vast community support and extensive third-party libraries
5. **Industry Standard**: Used by major companies like Facebook, Netflix, Airbnb, and many others

### React Philosophy
React encourages thinking about UIs as a function of state. When state changes, React automatically updates the UI to reflect those changes. This approach simplifies reasoning about your application's behavior.

### TypeScript Integration
TypeScript adds static type checking to JavaScript, providing:
- **Type Safety**: Catch errors at compile time
- **Better IDE Support**: Enhanced autocomplete and refactoring
- **Self-Documenting Code**: Types serve as inline documentation
- **Improved Developer Experience**: Easier debugging and maintenance

**In React with TypeScript:**
- We use `.tsx` files instead of `.jsx`
- All React components, props, and state are fully typed
- Event handlers receive proper type information
- TSX (TypeScript + JSX) provides the same syntax as JSX but with type checking

```tsx
// TypeScript interface for component props
interface WelcomeProps {
  name: string;
  age?: number; // Optional prop
}

// Fully typed React component
const Welcome: React.FC<WelcomeProps> = ({ name, age }) => {
  return (
    <div>
      <h1>Welcome, {name}!</h1>
      {age && <p>Age: {age}</p>}
    </div>
  );
};

// TypeScript catches errors at compile time
<Welcome name="John" age="twenty" /> // Error: age should be number, not string
<Welcome /> // Error: name prop is required
```

---

## Setting Up Your Development Environment

### Project Initialization
```bash
# Create a new React project with Vite (recommended)
npm create vite@latest my-react-app
# Select 'React' as framework
# Select 'TypeScript' as variant

# Navigate to project directory
cd my-react-app

# Install dependencies
npm install

# Start development server
npm run dev
```

### Understanding the Project Structure
```
my-react-app/
├── public/             # Static assets
├── src/               # Source code
│   ├── components/    # React components (we'll create this)
│   ├── context/       # Context providers (we'll create this)
│   ├── hooks/         # Custom hooks (we'll create this)
│   ├── types/         # TypeScript type definitions
│   ├── App.tsx        # Main application component
│   ├── main.tsx       # Application entry point
│   └── index.css      # Global styles
├── package.json       # Dependencies and scripts
├── tsconfig.json      # TypeScript configuration
└── vite.config.ts     # Vite configuration
```

### Essential Development Tools
- **VS Code**: Primary code editor with React extensions
- **React Developer Tools**: Browser extension for debugging React applications
- **TypeScript**: For type checking and enhanced development experience

---

## Understanding Components

### The Component Concept
Components are the fundamental building blocks of React applications. Think of them as custom HTML elements that you can create and reuse throughout your application.

### Functional Components
Functional components are TypeScript functions that return TSX (TypeScript XML). These are the modern way to write React components and what we'll use throughout this course.

```tsx
// Import React library to use React features
import React from 'react';

// Define a functional component using TypeScript
// React.FC means "React Functional Component" - this tells TypeScript this is a React component
const WelcomeMessage: React.FC = () => {
  // This function returns TSX (TypeScript + JSX)
  // The <h1> tag is TSX - it looks like HTML but it's actually TypeScript
  return <h1>Welcome to React!</h1>;
};

// Export the component so it can be used in other files
export default WelcomeMessage;
```

**Key Points about Functional Components:**
- They are just TypeScript functions that return TSX
- TSX looks like HTML but is actually TypeScript code
- The function name becomes the component name
- `React.FC` is a TypeScript type that tells the compiler this is a React component

### JSX and TSX Fundamentals
JSX (JavaScript XML) is a syntax extension that allows you to write HTML-like syntax in your JavaScript code. When using TypeScript with React, we use **TSX** (TypeScript XML), which is JSX with TypeScript type checking.

**Why JSX/TSX is essential even with TypeScript:**
- TSX is the standard way to write React components in TypeScript
- It provides type safety for React elements and props
- TypeScript enhances JSX with compile-time type checking
- All React documentation and examples use JSX/TSX syntax

```tsx
// TSX (TypeScript + JSX)
const element: JSX.Element = <h1>Hello, World!</h1>;

// This transpiles to:
const element = React.createElement('h1', null, 'Hello, World!');

// TypeScript provides type safety:
interface Props {
  name: string;
  age: number;
}

const greeting: JSX.Element = <Greeting name="John" age={25} />; // Type-checked!
```

#### Understanding Curly Braces in TSX - The Most Important Concept

**This is the #1 concept students must understand**: In TSX, you switch between HTML-like markup and TypeScript code using curly braces `{}`.

```tsx
// First, let's define some TypeScript variables (just like normal TypeScript)
const userName: string = 'Alice';           // A string variable
const userAge: number = 28;                 // A number variable  
const isLoggedIn: boolean = true;           // A boolean variable
const score: number = 95;                   // Another number for calculations

// Now let's create TSX that mixes HTML-like tags with TypeScript expressions
const userInfo: JSX.Element = (
  <div>
    {/* 
      CRITICAL RULE: 
      - Outside curly braces {} = HTML-like markup (tags, text, attributes)
      - Inside curly braces {} = TypeScript code (variables, expressions, calculations)
    */}
    
    {/* Example 1: Displaying a simple variable */}
    <h1>Welcome, {userName}!</h1>
    {/* This creates: <h1>Welcome, Alice!</h1> */}
    
    {/* Example 2: Displaying numbers */}
    <p>Your age is: {userAge}</p>
    {/* This creates: <p>Your age is: 28</p> */}
    
    {/* Example 3: Conditional expressions (ternary operator) */}
    <p>Status: {isLoggedIn ? 'Logged In' : 'Logged Out'}</p>
    {/* This creates: <p>Status: Logged In</p> (since isLoggedIn is true) */}
    
    {/* Example 4: Mathematical operations */}
    <p>Next year you'll be: {userAge + 1} years old</p>
    {/* This creates: <p>Next year you'll be: 29 years old</p> */}
    
    {/* Example 5: String concatenation */}
    <p>Grade: {score >= 90 ? 'A' : score >= 80 ? 'B' : 'C'}</p>
    {/* This creates: <p>Grade: A</p> */}
    
    {/* Example 6: Calling string methods */}
    <p>Username in caps: {userName.toUpperCase()}</p>
    {/* This creates: <p>Username in caps: ALICE</p> */}
  </div>
);
```

**Important TSX Rules:**

1. **Single Parent Element**: Every TSX return must have one parent element
```tsx
// ❌ INCORRECT - Multiple parent elements
return (
  <h1>Title</h1>
  <p>Paragraph</p>
);

// ✅ CORRECT - Wrapped in a single parent div
return (
  <div>
    <h1>Title</h1>
    <p>Paragraph</p>
  </div>
);

// ✅ ALSO CORRECT - Using React Fragment (empty tags)
return (
  <>
    <h1>Title</h1>
    <p>Paragraph</p>
  </>
);
```

2. **Attribute Names Use camelCase** (different from regular HTML)
```tsx
// ❌ INCORRECT - HTML style (lowercase with dashes)
<button class="my-button" onclick="handleClick">Click</button>

// ✅ CORRECT - React/TSX style (camelCase)
<button className="my-button" onClick={handleClick}>Click</button>
{/*         ^^^^^^^^^^                ^^^^^^^^
    className instead of class    onClick instead of onclick */}
```

3. **Event Handlers Must Be Functions** (not strings like in HTML)
```tsx
// Define a TypeScript function for handling clicks
const handleButtonClick = () => {
  console.log('Button was clicked!');
};

// ❌ INCORRECT - String like in HTML
<button onClick="handleButtonClick()">Click me</button>

// ✅ CORRECT - Function reference in curly braces
<button onClick={handleButtonClick}>Click me</button>
{/*             ^^^^^^^^^^^^^^^^^^^
          Function reference inside curly braces */}
```

### Component Composition with Detailed Explanations
Components can be combined together to build complex UIs. Think of components like LEGO blocks - you create small pieces and combine them into larger structures.

```tsx
// Import React to use React features
import React from 'react';

// Component 1: A simple header component
const Header: React.FC = () => {
  return (
    <header>
      {/* Regular HTML-like markup outside curly braces */}
      <h1>My Application</h1>
      <nav>
        {/* 
          Note: In TSX we use # for href since we're not doing real navigation yet
          In a real app, you'd use React Router for navigation
        */}
        <a href="#home">Home</a>
        <a href="#about">About</a>
      </nav>
    </header>
  );
};

// Component 2: A footer component  
const Footer: React.FC = () => {
  // You can define variables inside the component function
  const currentYear: number = new Date().getFullYear();
  
  return (
    <footer>
      {/* Using curly braces to embed the TypeScript variable */}
      <p>&copy; {currentYear} My Application</p>
      {/* This will display: © 2025 My Application */}
    </footer>
  );
};

// Component 3: Main content area
const MainContent: React.FC = () => {
  // Define some data that we'll display
  const features: string[] = ['Fast', 'Reliable', 'User-friendly'];
  
  return (
    <main>
      <p>This is the main content area.</p>
      
      {/* Displaying an array using map() inside curly braces */}
      <ul>
        {features.map((feature: string, index: number) => (
          <li key={index}>{feature}</li>
          // map() creates a new <li> for each item in the features array
          // key={index} helps React track each list item (required for lists)
        ))}
      </ul>
    </main>
  );
};

// Component 4: The main App component that combines all others
const App: React.FC = () => {
  return (
    <div className="app">
      {/* 
        Here we're using our custom components just like HTML tags!
        Notice: 
        - Component names start with capital letters
        - They're self-closing tags (no separate closing tag needed)
        - These components will render their return value in this spot
      */}
      <Header />      {/* This renders the Header component's JSX here */}
      <MainContent /> {/* This renders the MainContent component's JSX here */}
      <Footer />      {/* This renders the Footer component's JSX here */}
    </div>
  );
};

// Export the App component so it can be used in other files
export default App;
```

**Key Concepts Explained:**
1. **Component Names**: Always start with a capital letter (`Header`, not `header`)
2. **Self-Closing Tags**: Components without children can be written as `<Header />`
3. **Composition**: Larger components are built by combining smaller components
4. **Reusability**: Each component can be used multiple times
5. **Array Rendering**: Use `.map()` inside curly braces to render lists of items

---

## Working with Props and State

### Understanding Props
Props (properties) are how data flows from parent components to child components. They are read-only and help make components reusable.

#### Basic Props Example with Verbose Explanations
```tsx
import React from 'react';

// Step 1: Define what data this component expects to receive
// This is called a "Props Interface" - it's like a contract
interface GreetingProps {
  name: string;        // Required: component MUST receive a name
  age?: number;        // Optional: the ? means this prop is optional
  isVip?: boolean;     // Optional: defaults to false if not provided
}

// Step 2: Create a component that accepts props
// Props are data passed from a parent component to a child component
const Greeting: React.FC<GreetingProps> = ({ name, age = 18, isVip = false }) => {
  /*
    EXPLANATION OF THE LINE ABOVE:
    - React.FC<GreetingProps> = This is a React Functional Component that expects GreetingProps
    - ({ name, age = 18, isVip = false }) = This is "destructuring" - it extracts props from an object
    - age = 18 = Default value if age prop is not provided
    - isVip = false = Default value if isVip prop is not provided
  */
  
  return (
    <div className={`greeting ${isVip ? 'vip' : 'regular'}`}>
      {/* 
        EXPLANATION OF className ABOVE:
        - We use template literals (backticks) to combine strings
        - ${isVip ? 'vip' : 'regular'} is a ternary operator inside curly braces
        - If isVip is true, className becomes "greeting vip"
        - If isVip is false, className becomes "greeting regular"
      */}
      
      {/* Display the name prop inside curly braces */}
      <h2>Hello, {name}!</h2>
      
      {/* Conditional rendering: only show age if it exists */}
      {age && <p>You are {age} years old.</p>}
      {/* 
        EXPLANATION: {age && <p>...}
        - This is called "short-circuit evaluation"
        - If age is truthy (exists and not 0), render the <p> tag
        - If age is falsy (undefined, null, 0), render nothing
      */}
      
      {/* Another conditional rendering example */}
      {isVip && <span className="vip-badge">VIP Member</span>}
      {/* Only shows the VIP badge if isVip is true */}
    </div>
  );
};

// Step 3: Use the component in a parent component and pass props
const App: React.FC = () => {
  return (
    <div>
      {/* 
        Each use of <Greeting> below passes different props:
        - Props are passed as attributes (like HTML attributes)
        - The values in quotes are strings
        - The values in curly braces are TypeScript expressions
      */}
      
      {/* Passing all props */}
      <Greeting name="Alice" age={25} isVip={true} />
      {/* 
        This creates a greeting for Alice, age 25, who is a VIP
        Note: age={25} and isVip={true} use curly braces because they're not strings
      */}
      
      {/* Passing only required and one optional prop */}
      <Greeting name="Bob" age={30} />
      {/* 
        This creates a greeting for Bob, age 30, who is not VIP (isVip defaults to false)
      */}
      
      {/* Passing only the required prop */}
      <Greeting name="Charlie" />
      {/* 
        This creates a greeting for Charlie
        - age defaults to 18 (from our default parameter)
        - isVip defaults to false (from our default parameter)
      */}
    </div>
  );
};

export default App;
```

**Props Concept Summary:**
1. **Props = Properties** - Data passed from parent to child components
2. **Props are Read-Only** - Child components cannot modify props
3. **Props Flow Downward** - Data flows from parent to child, never upward
4. **TypeScript Interfaces** - Define what props a component expects
5. **Default Values** - Use `= defaultValue` syntax for optional props

#### Advanced Props Patterns
```tsx
import React from 'react';

// Props with complex types
interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

interface UserCardProps {
  user: User;
  onEdit?: (user: User) => void;
  onDelete?: (userId: number) => void;
  showActions?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({ 
  user, 
  onEdit, 
  onDelete, 
  showActions = true 
}) => {
  return (
    <div className="user-card">
      {user.avatar && <img src={user.avatar} alt={`${user.name}'s avatar`} />}
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      
      {showActions && (
        <div className="user-actions">
          {onEdit && (
            <button onClick={() => onEdit(user)}>Edit</button>
          )}
          {onDelete && (
            <button onClick={() => onDelete(user.id)}>Delete</button>
          )}
        </div>
      )}
    </div>
  );
};

export default UserCard;
```

### Understanding State
State represents data that can change over time within a component. When state changes, React re-renders the component to reflect the new state.

#### useState Hook - Managing Component State
The `useState` hook is the primary way to add state to functional components. State represents data that can change over time within a component.

```tsx
import React, { useState } from 'react';

const Counter: React.FC = () => {
  // STEP 1: Create state using useState hook
  const [count, setCount] = useState<number>(0);
  /*
    EXPLANATION OF THE LINE ABOVE:
    - useState<number>(0) creates a state variable that holds a number, starting at 0
    - It returns an array with exactly 2 items:
      [0]: count = the current state value
      [1]: setCount = a function to update the state
    - We use "array destructuring" to get both items: [count, setCount]
    - When setCount is called, the component re-renders with the new value
  */
  
  const [step, setStep] = useState<number>(1);
  // Another state variable for how much to increment/decrement by

  // STEP 2: Create functions that update state
  const increment = () => {
    // Update count by adding step to the current count value
    setCount(prevCount => prevCount + step);
    /*
      EXPLANATION:
      - We pass a function to setCount instead of a direct value
      - prevCount represents the current value of count
      - This ensures we get the most up-to-date value
      - React will re-render the component with the new count value
    */
  };

  const decrement = () => {
    // Update count by subtracting step from current count
    setCount(prevCount => prevCount - step);
  };

  const reset = () => {
    // Reset count back to 0
    setCount(0);
    // We can pass the value directly when we don't need the previous value
  };

  // STEP 3: Return TSX that displays state and provides ways to change it
  return (
    <div className="counter">
      {/* Display the current count value using curly braces */}
      <h2>Counter: {count}</h2>
      
      <div className="step-control">
        <label>Step: </label>
        {/* 
          Controlled input: the input's value is controlled by React state
          - value={step} makes the input show the current step state
          - onChange updates the state when user types
        */}
        <input 
          type="number" 
          value={step}  {/* Display current step value */}
          onChange={(e) => setStep(parseInt(e.target.value) || 1)}
          /*
            EXPLANATION OF onChange:
            - (e) => this is an arrow function that receives an "event" object
            - e.target.value gets the text the user typed (always a string)
            - parseInt() converts the string to a number
            - || 1 means "or 1" - if parseInt fails, use 1 as default
            - setStep() updates the step state with the new number
          */
          min="1"  {/* HTML attribute to prevent negative steps */}
        />
      </div>

      <div className="counter-controls">
        {/* 
          Event handlers: functions that run when buttons are clicked
          Notice we pass function references, not function calls
          - onClick={decrement} = correct (function reference)
          - onClick={decrement()} = incorrect (calls function immediately)
        */}
        <button onClick={decrement}>- {step}</button>
        <button onClick={reset}>Reset</button>
        <button onClick={increment}>+ {step}</button>
        
        {/* The {step} inside the button text shows the current step value */}
      </div>
    </div>
  );
};

export default Counter;
```

**Key useState Concepts:**
1. **State Initialization**: `useState(initialValue)` sets the starting value
2. **State Update**: Use the setter function (like `setCount`) to change state
3. **Re-rendering**: When state changes, React automatically re-renders the component
4. **Previous Value Pattern**: Use `setState(prev => newValue)` when new value depends on old value
5. **Direct Value Pattern**: Use `setState(newValue)` when setting to a specific value

#### Complex State Management
```tsx
import React, { useState } from 'react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
}

const UserForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    age: 0
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const updateField = (field: keyof FormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (formData.age < 18) {
      newErrors.age = 'Must be at least 18 years old';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Form submitted:', formData);
      
      // Reset form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        age: 0
      });
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <h2>User Registration</h2>

      <div className="form-group">
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          value={formData.firstName}
          onChange={(e) => updateField('firstName', e.target.value)}
          className={errors.firstName ? 'error' : ''}
        />
        {errors.firstName && <span className="error-message">{errors.firstName}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={formData.lastName}
          onChange={(e) => updateField('lastName', e.target.value)}
          className={errors.lastName ? 'error' : ''}
        />
        {errors.lastName && <span className="error-message">{errors.lastName}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => updateField('email', e.target.value)}
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          value={formData.age}
          onChange={(e) => updateField('age', parseInt(e.target.value) || 0)}
          className={errors.age ? 'error' : ''}
          min="0"
        />
        {errors.age && <span className="error-message">{errors.age}</span>}
      </div>

      <button type="submit" disabled={isSubmitting} className="submit-button">
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default UserForm;
```

---

### Advanced TypeScript Concepts Explained

The UserForm example above introduces several important TypeScript and JavaScript concepts that are essential for React development. Let's break them down:

#### 1. The Spread Operator (`...`)

The **spread operator** (`...`) allows you to expand arrays, objects, or other iterables. In React, it's commonly used for creating new objects or arrays without mutating the original.

**Basic Spread Operator Examples:**

```tsx
// ARRAYS - Spread operator with arrays
const originalArray = [1, 2, 3];
const newArray = [...originalArray, 4, 5]; // Creates: [1, 2, 3, 4, 5]
console.log(originalArray); // Still [1, 2, 3] - unchanged!

// OBJECTS - Spread operator with objects  
const originalUser = { name: 'John', age: 25 };
const updatedUser = { ...originalUser, age: 26 }; // Creates: { name: 'John', age: 26 }
console.log(originalUser); // Still { name: 'John', age: 25 } - unchanged!
```

**Why Use Spread Operator in React State?**

React requires state updates to create new objects/arrays rather than modifying existing ones. This is called "immutability."

```tsx
// ❌ INCORRECT - Mutating state directly
const [user, setUser] = useState({ name: 'John', age: 25 });

const updateAge = () => {
  user.age = 26; // This modifies the original object
  setUser(user); // React won't detect the change!
};

// ✅ CORRECT - Using spread operator to create new object
const updateAge = () => {
  setUser(prevUser => ({
    ...prevUser, // Copy all existing properties
    age: 26      // Override the age property
  }));
  // React detects this as a new object and re-renders
};
```

**Spread Operator in the UserForm Example:**

```tsx
// From the UserForm example:
const updateField = (field: keyof FormData, value: string | number) => {
  setFormData(prev => ({
    ...prev,        // Copy all existing form data (firstName, lastName, email, age)
    [field]: value  // Update only the specific field that changed
  }));
};

// When called like: updateField('firstName', 'Alice')
// It creates: { ...prev, firstName: 'Alice' }
// Result: { firstName: 'Alice', lastName: '', email: '', age: 0 }
```

#### 2. Partial<T> - Making All Properties Optional

`Partial<T>` is a built-in TypeScript utility type that makes all properties of type `T` optional.

**Understanding Partial:**

```tsx
// Original interface
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Partial<User> is equivalent to:
interface PartialUser {
  id?: number;     // Optional
  name?: string;   // Optional  
  email?: string;  // Optional
  age?: number;    // Optional
}

// Usage examples:
const fullUser: User = {
  id: 1,
  name: 'John',
  email: 'john@example.com',
  age: 25
}; // All properties required

const partialUser: Partial<User> = {
  name: 'John'
  // id, email, and age are optional - no error!
};

const anotherPartialUser: Partial<User> = {}; // Empty object is valid!
```

**Why Use Partial in the UserForm Example?**

In the UserForm, we use `Partial<FormData>` for error handling because:
- Not all fields may have errors at the same time
- We want to store only the fields that currently have errors
- An empty error object `{}` should be valid (no errors)

```tsx
// From the UserForm example:
interface FormData {
  firstName: string;
  lastName: string;  
  email: string;
  age: number;
}

// Using Partial for errors - not all fields need to have errors
const [errors, setErrors] = useState<Partial<FormData>>({});

// Valid error states:
// {} - no errors
// { firstName: 'Required' } - only firstName has error
// { email: 'Invalid format', age: 'Must be 18+' } - multiple specific errors
```

**When to Use Partial:**
1. **Optional Updates**: When updating only some properties of an object
2. **Error Handling**: When not all fields may have errors
3. **API Responses**: When some data might be missing
4. **Form State**: For partially filled forms

```tsx
// Example: API update function
const updateUser = (userId: number, updates: Partial<User>) => {
  // Can update just name: { name: 'New Name' }
  // Or just email: { email: 'new@email.com' }
  // Or multiple fields: { name: 'New Name', age: 30 }
};
```

#### 3. keyof - Getting Keys of an Object Type

`keyof` is a TypeScript operator that creates a union type of all the keys in an object type.

**Understanding keyof:**

```tsx
interface User {
  id: number;
  name: string;
  email: string;
}

// keyof User creates a type that can only be: 'id' | 'name' | 'email'
type UserKeys = keyof User; // Type is: 'id' | 'name' | 'email'

// Usage in functions:
function getUserProperty(user: User, key: keyof User) {
  return user[key]; // TypeScript knows this is safe
}

// Valid calls:
getUserProperty(user, 'name');    // ✅ Valid - 'name' is a key of User
getUserProperty(user, 'email');   // ✅ Valid - 'email' is a key of User

// Invalid calls:
getUserProperty(user, 'address'); // ❌ Error - 'address' is not a key of User
getUserProperty(user, 'phone');   // ❌ Error - 'phone' is not a key of User
```

**keyof in the UserForm Example:**

```tsx
// From the UserForm example:
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
}

// keyof FormData = 'firstName' | 'lastName' | 'email' | 'age'

const updateField = (field: keyof FormData, value: string | number) => {
  //                      ^^^^^^^^^^^^^^
  //                      Only allows: 'firstName', 'lastName', 'email', 'age'
  
  setFormData(prev => ({
    ...prev,
    [field]: value // TypeScript knows 'field' is a valid key
  }));
};

// Valid calls:
updateField('firstName', 'Alice');  // ✅ 'firstName' is a valid key
updateField('age', 25);            // ✅ 'age' is a valid key

// Invalid calls:
updateField('address', 'Main St'); // ❌ Error - 'address' not in FormData
updateField('phone', '123-456');   // ❌ Error - 'phone' not in FormData
```

**When to Use keyof:**
1. **Dynamic Property Access**: When you need to access object properties dynamically
2. **Generic Functions**: For functions that work with any object property
3. **Form Handling**: For updating specific form fields
4. **Type Safety**: To ensure you only access valid object properties

**Advanced keyof Example:**

```tsx
// Generic function that works with any object type
function updateObjectProperty<T>(obj: T, key: keyof T, value: T[keyof T]): T {
  return {
    ...obj,
    [key]: value
  };
}

// Usage with different object types:
const user = { name: 'John', age: 25 };
const updatedUser = updateObjectProperty(user, 'age', 30); // Works!

const product = { title: 'Laptop', price: 999 };
const updatedProduct = updateObjectProperty(product, 'price', 899); // Works!
```

#### 4. Combining All Three Concepts

Here's how these concepts work together in a practical example:

```tsx
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  isActive: boolean;
}

const UserManager: React.FC = () => {
  const [user, setUser] = useState<User>({
    id: 1,
    name: 'John',
    email: 'john@example.com', 
    age: 25,
    isActive: true
  });

  const [errors, setErrors] = useState<Partial<User>>({});
  //                                   ^^^^^^^^^^^^^^
  //                                   Using Partial - not all fields need errors

  // Function using keyof to ensure type safety
  const updateUserField = (field: keyof User, value: User[keyof User]) => {
    //                           ^^^^^^^^^^        ^^^^^^^^^^^^^^^^
    //                           Using keyof       Value must match the field type
    
    setUser(prevUser => ({
      ...prevUser,  // Spread operator - copy existing user
      [field]: value // Update specific field
    }));

    // Clear error for this field
    if (errors[field]) {
      setErrors(prevErrors => ({
        ...prevErrors,  // Spread operator - copy existing errors
        [field]: undefined // Clear error for this field
      }));
    }
  };

  return (
    <div>
      <input
        value={user.name}
        onChange={(e) => updateUserField('name', e.target.value)}
        //                              ^^^^^^
        //                              keyof ensures 'name' is valid
      />
      
      <input
        type="number"
        value={user.age}
        onChange={(e) => updateUserField('age', parseInt(e.target.value))}
        //                              ^^^^^
        //                              keyof ensures 'age' is valid
      />
      
      {/* Display errors */}
      {errors.name && <span>{errors.name}</span>}
      {errors.age && <span>{errors.age}</span>}
    </div>
  );
};
```

**Key Takeaways:**
1. **Spread Operator (`...`)**: Creates new objects/arrays without mutating originals
2. **Partial<T>**: Makes all properties optional - useful for errors, updates, partial data
3. **keyof**: Provides type-safe access to object keys - prevents typos and invalid property access
4. **Together**: They enable type-safe, immutable state updates in React applications

---

## Event Handling in React

### React Event System
React uses a synthetic event system that wraps native DOM events, providing consistent behavior across different browsers.

#### Basic Event Handling
```tsx
import React, { useState } from 'react';

const EventExamples: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [clickCount, setClickCount] = useState<number>(0);

  // Mouse events
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Button clicked!', e);
    setClickCount(prev => prev + 1);
  };

  const handleDoubleClick = () => {
    setMessage('Double clicked!');
  };

  // Keyboard events
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setMessage(`You pressed Enter! Input value: ${e.currentTarget.value}`);
    }
  };

  // Form events
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    setMessage('Form submitted!');
  };

  // Input change events
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(`Current input: ${e.target.value}`);
  };

  return (
    <div className="event-examples">
      <h2>Event Handling Examples</h2>
      
      <div className="example-section">
        <h3>Mouse Events</h3>
        <button onClick={handleClick}>
          Click me (Clicked {clickCount} times)
        </button>
        <button onDoubleClick={handleDoubleClick}>
          Double click me
        </button>
      </div>

      <div className="example-section">
        <h3>Keyboard Events</h3>
        <input
          type="text"
          placeholder="Press Enter after typing"
          onKeyPress={handleKeyPress}
        />
      </div>

      <div className="example-section">
        <h3>Form Events</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type and see live changes"
            onChange={handleInputChange}
          />
          <button type="submit">Submit Form</button>
        </form>
      </div>

      {message && (
        <div className="message">
          <strong>Message:</strong> {message}
        </div>
      )}
    </div>
  );
};

export default EventExamples;
```

#### Understanding e.preventDefault()
The `preventDefault()` method stops the default behavior of an event.

```tsx
import React, { useState } from 'react';

const PreventDefaultExamples: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  // Prevent link navigation
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    addLog('Link click prevented - would have navigated to external site');
  };

  // Prevent form submission (page reload)
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addLog('Form submission prevented - handling with JavaScript instead');
  };

  // Prevent context menu
  const handleRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    addLog('Context menu prevented on right click');
  };

  return (
    <div className="prevent-default-examples">
      <h2>preventDefault() Examples</h2>

      <div className="example">
        <h3>Prevented Link Navigation</h3>
        <a href="https://example.com" onClick={handleLinkClick}>
          Click this link (navigation prevented)
        </a>
      </div>

      <div className="example">
        <h3>Prevented Form Submission</h3>
        <form onSubmit={handleFormSubmit}>
          <input type="text" placeholder="Enter some text" />
          <button type="submit">Submit (prevented)</button>
        </form>
      </div>

      <div className="example">
        <h3>Prevented Context Menu</h3>
        <div 
          onContextMenu={handleRightClick}
          style={{
            padding: '20px',
            backgroundColor: '#f0f0f0',
            border: '1px solid #ccc',
            cursor: 'pointer'
          }}
        >
          Right-click me (context menu prevented)
        </div>
      </div>

      <div className="logs">
        <h3>Event Logs:</h3>
        <ul>
          {logs.map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
        <button onClick={() => setLogs([])}>Clear Logs</button>
      </div>
    </div>
  );
};

export default PreventDefaultExamples;
```

---

## React Hooks Deep Dive

### useState Hook
The `useState` hook manages local component state.

#### Basic Usage Patterns
```tsx
import React, { useState } from 'react';

const UseStateExamples: React.FC = () => {
  // Primitive state
  const [count, setCount] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(true);

  // Array state
  const [items, setItems] = useState<string[]>(['item1', 'item2']);

  // Object state
  const [user, setUser] = useState<{name: string; age: number}>({
    name: 'John',
    age: 30
  });

  // Adding items to array
  const addItem = () => {
    const newItem = `item${items.length + 1}`;
    setItems(prevItems => [...prevItems, newItem]);
  };

  // Removing items from array
  const removeItem = (index: number) => {
    setItems(prevItems => prevItems.filter((_, i) => i !== index));
  };

  // Updating object state
  const updateUser = (field: 'name' | 'age', value: string | number) => {
    setUser(prevUser => ({
      ...prevUser,
      [field]: value
    }));
  };

  return (
    <div className="usestate-examples">
      <h2>useState Hook Examples</h2>

      <div className="section">
        <h3>Primitive State</h3>
        <p>Count: {count}</p>
        <button onClick={() => setCount(prev => prev + 1)}>Increment</button>
        <button onClick={() => setCount(prev => prev - 1)}>Decrement</button>
      </div>

      <div className="section">
        <h3>Array State</h3>
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              {item}
              <button onClick={() => removeItem(index)}>Remove</button>
            </li>
          ))}
        </ul>
        <button onClick={addItem}>Add Item</button>
      </div>

      <div className="section">
        <h3>Object State</h3>
        <p>Name: {user.name}, Age: {user.age}</p>
        <input
          type="text"
          value={user.name}
          onChange={(e) => updateUser('name', e.target.value)}
          placeholder="Name"
        />
        <input
          type="number"
          value={user.age}
          onChange={(e) => updateUser('age', parseInt(e.target.value) || 0)}
          placeholder="Age"
        />
      </div>
    </div>
  );
};

export default UseStateExamples;
```

### useEffect Hook
The `useEffect` hook handles side effects in functional components.

#### useEffect Patterns
```tsx
import React, { useState, useEffect } from 'react';

const UseEffectExamples: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [data, setData] = useState<any>(null);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  // Effect that runs on every render
  useEffect(() => {
    console.log('Component rendered or updated');
  });

  // Effect that runs only once (on mount)
  useEffect(() => {
    console.log('Component mounted');
    
    // Fetch initial data
    const fetchData = async () => {
      try {
        // Simulate API call
        const response = await fetch('/api/data');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array

  // Effect that runs when count changes
  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]); // Effect depends on count

  // Effect with cleanup
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array for mount/unmount only

  // Effect that depends on multiple values
  useEffect(() => {
    if (count > 0 && data) {
      console.log(`Count is ${count} and we have data:`, data);
    }
  }, [count, data]); // Effect depends on both count and data

  return (
    <div className="useeffect-examples">
      <h2>useEffect Hook Examples</h2>

      <div className="section">
        <p>Count: {count}</p>
        <button onClick={() => setCount(prev => prev + 1)}>Increment</button>
      </div>

      <div className="section">
        <p>Window Width: {windowWidth}px</p>
        <p>Try resizing the window!</p>
      </div>

      <div className="section">
        <p>Data: {data ? JSON.stringify(data) : 'Loading...'}</p>
      </div>
    </div>
  );
};

export default UseEffectExamples;
```

### Custom Hooks
Custom hooks allow you to extract and reuse stateful logic between components.

```tsx
import React, { useState, useEffect } from 'react';

// Custom hook for fetching data
/*
  UNDERSTANDING GENERICS: <T,>
  
  The <T,> syntax is called "TypeScript Generics"
  
  Think of T as a "placeholder" for a type that will be specified later.
  It's like saying "this function works with SOME type, but I don't know what type yet"
  
  When someone uses this hook, they specify what T should be:
  - useFetch<string>(url) - T becomes string
  - useFetch<User>(url) - T becomes User interface
  - useFetch<{name: string}>(url) - T becomes object with name property
  
  The comma after T (<T,>) is TypeScript syntax to tell the compiler
  this is a generic, not JSX syntax (which also uses < >)
*/
const useFetch = <T,>(url: string) => {
  /*
    STATE EXPLANATIONS:
    
    - data: T | null
      This means data can be either:
      * Type T (whatever the user specified)
      * null (if no data loaded yet)
    
    - loading: boolean
      Simple true/false for loading state
    
    - error: string | null  
      Either an error message (string) or null (no error)
  */
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // This function runs whenever the URL changes
    const fetchData = async () => {
      try {
        setLoading(true);   // Show loading state
        setError(null);     // Clear any previous errors
        
        // Make the HTTP request
        const response = await fetch(url);
        
        // Check if the request was successful (status 200-299)
        if (!response.ok) {
          // If not successful, throw an error with the status code
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Convert response to JSON
        const result = await response.json();
        
        // Save the data - TypeScript knows 'result' should match type T
        setData(result);
        
      } catch (err) {
        // Handle any errors that occurred during fetching
        
        // Check if err is actually an Error object (has .message property)
        // If so, use its message; otherwise use a generic message
        setError(err instanceof Error ? err.message : 'An error occurred');
        
      } finally {
        // This runs whether the try or catch block executed
        // Always stop the loading state
        setLoading(false);
      }
    };

    // Call the fetch function
    fetchData();
  }, [url]); // This effect runs whenever 'url' changes

  // Return an object with the three state values
  // Other components can destructure this: { data, loading, error }
  return { data, loading, error };
};

// Custom hook for local storage
/*
  GENERICS EXPLANATION FOR useLocalStorage:
  
  This hook can store ANY type of data in localStorage:
  - useLocalStorage<string>('username', '') - stores strings
  - useLocalStorage<number>('count', 0) - stores numbers  
  - useLocalStorage<User>('user', defaultUser) - stores User objects
  - useLocalStorage<{theme: string}>('settings', {theme: 'light'}) - stores objects
  
  The T type ensures that:
  1. initialValue must match type T
  2. The returned value is type T
  3. setValue accepts type T
  4. Everything stays type-safe!
*/
const useLocalStorage = <T,>(key: string, initialValue: T) => {
  /*
    LAZY INITIAL STATE:
    
    useState(() => { ... }) is called "lazy initial state"
    The function only runs ONCE when the component first mounts
    This is important because localStorage.getItem() is expensive
    We don't want to call it on every render!
  */
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Try to get the item from localStorage
      const item = window.localStorage.getItem(key);
      
      // If item exists, parse it as JSON and return it
      // If item doesn't exist (null), return the initialValue
      return item ? JSON.parse(item) : initialValue;
      
    } catch (error) {
      // If localStorage is not available or JSON.parse fails
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  /*
    FLEXIBLE setValue FUNCTION:
    
    value: T | ((val: T) => T)
    This means setValue can accept either:
    1. A direct value: setValue('new theme')
    2. A function: setValue(prev => prev === 'light' ? 'dark' : 'light')
    
    This matches how React's setState works!
  */
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Check if 'value' is a function
      // If it is, call it with the current stored value
      // If it's not, just use the value directly
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Update React state
      setStoredValue(valueToStore);
      
      // Update localStorage (convert to JSON string)
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      
    } catch (error) {
      // Handle errors (localStorage full, JSON.stringify failed, etc.)
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  /*
    RETURN AS CONST:
    
    [storedValue, setValue] as const
    
    This tells TypeScript that we're returning a specific tuple:
    [T, (value: T | ((val: T) => T)) => void]
    
    Without 'as const', TypeScript thinks we're returning:
    (T | ((value: T | ((val: T) => T)) => void))[]
    
    'as const' makes the types more precise and matches useState's return type
  */
  return [storedValue, setValue] as const;
};

// Custom hook for window dimensions
/*
  NO GENERICS HERE:
  
  This hook doesn't need generics because it always returns the same shape:
  { width: number, height: number }
  
  We know exactly what type it returns, so no need for placeholder types
*/
const useWindowDimensions = () => {
  // Initialize state with current window dimensions
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,   // Current window width in pixels
    height: window.innerHeight, // Current window height in pixels
  });

  useEffect(() => {
    // Function that updates state when window is resized
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Add event listener for resize events
    window.addEventListener('resize', handleResize);
    
    // Cleanup function: remove event listener when component unmounts
    // This prevents memory leaks!
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty dependency array = only run on mount/unmount

  // Return the current window dimensions
  return windowDimensions;
};

// Component using custom hooks
const CustomHookExamples: React.FC = () => {
  /*
    USING GENERIC HOOKS:
    
    useFetch<{name: string; value: number}>('/api/example')
    
    Here we specify that T = {name: string; value: number}
    This means:
    - data will be {name: string; value: number} | null
    - TypeScript will ensure we only access .name and .value on data
    - We get autocomplete and error checking!
  */
  const { data, loading, error } = useFetch<{name: string; value: number}>('/api/example');
  
  /*
    USING useLocalStorage WITH OBJECT TYPE:
    
    The type is inferred from the initialValue:
    {theme: 'light', language: 'en'} 
    
    So T becomes {theme: string; language: string}
    TypeScript knows preferences has these exact properties
  */
  const [preferences, setPreferences] = useLocalStorage('userPreferences', {
    theme: 'light',
    language: 'en'
  });
  
  /*
    NO GENERICS NEEDED:
    
    useWindowDimensions() always returns {width: number; height: number}
    So we can destructure width and height directly
  */
  const { width, height } = useWindowDimensions();

  // Early returns for loading and error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="custom-hook-examples">
      <h2>Custom Hook Examples</h2>

      <div className="section">
        <h3>Fetched Data</h3>
        {/* 
          JSON.stringify(data, null, 2) converts object to formatted JSON string
          - data: the object to stringify
          - null: replacer function (we don't need one)
          - 2: number of spaces for indentation (makes it readable)
        */}
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>

      <div className="section">
        <h3>Local Storage Preferences</h3>
        {/* Access properties directly - TypeScript knows they exist! */}
        <p>Theme: {preferences.theme}</p>
        <p>Language: {preferences.language}</p>
        
        <button 
          onClick={() => setPreferences(prev => ({
            ...prev,  // Copy existing preferences (spread operator)
            // Toggle theme between 'light' and 'dark'
            theme: prev.theme === 'light' ? 'dark' : 'light'
          }))}
        >
          Toggle Theme
        </button>
      </div>

      <div className="section">
        <h3>Window Dimensions</h3>
        {/* Display current window size */}
        <p>Width: {width}px</p>
        <p>Height: {height}px</p>
      </div>
    </div>
  );
};

export default CustomHookExamples;
```

---

## Context API for State Management

### Understanding the Context API
The Context API provides a way to pass data through the component tree without having to pass props down manually at every level.

#### Creating a Context
```tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of our context data
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

// Create the context with undefined as default
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
    // Here you might also save to localStorage, send to analytics, etc.
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const isAuthenticated = user !== null;
  const isAdmin = user?.role === 'admin';

  // Load user from localStorage on mount
  React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse saved user:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated,
    isAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

#### Using Context in Components
```tsx
import React from 'react';
import { useAuth } from './AuthContext';

// Login component
const LoginForm: React.FC = () => {
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate login process
    const mockUser = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user' as const
    };
    
    login(mockUser);
  };

  return (
    <form onSubmit={handleLogin} className="login-form">
      <h2>Login</h2>
      <input type="email" placeholder="Email" required />
      <input type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
};

// User profile component
const UserProfile: React.FC = () => {
  const { user, logout, isAdmin } = useAuth();

  if (!user) {
    return <div>Not logged in</div>;
  }

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      {isAdmin && <p className="admin-badge">Admin User</p>}
      <button onClick={logout}>Logout</button>
    </div>
  );
};

// Navigation component
const Navigation: React.FC = () => {
  const { isAuthenticated, isAdmin, user } = useAuth();

  return (
    <nav className="navigation">
      <div className="nav-brand">My App</div>
      <div className="nav-links">
        <a href="#home">Home</a>
        {isAuthenticated ? (
          <>
            <a href="#profile">Profile</a>
            {isAdmin && <a href="#admin">Admin</a>}
            <span>Welcome, {user?.name}!</span>
          </>
        ) : (
          <a href="#login">Login</a>
        )}
      </div>
    </nav>
  );
};

// Main app component
const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="app">
      <Navigation />
      <main>
        {isAuthenticated ? <UserProfile /> : <LoginForm />}
      </main>
    </div>
  );
};

// Root component with provider
const AppWithAuth: React.FC = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

export default AppWithAuth;
```

#### Multiple Contexts
You can use multiple contexts for different concerns:

```tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Theme Context
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Notification Context
interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (message: string, type: Notification['type']) => void;
  removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (message: string, type: Notification['type']) => {
    const id = Date.now().toString();
    const notification: Notification = { id, message, type };
    
    setNotifications(prev => [...prev, notification]);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
      removeNotification(id);
    }, 3000);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

// Combined providers
export const AppProviders: React.FC<{children: ReactNode}> = ({ children }) => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};
```

---

## Best Practices and Code Quality

### Component Organization
```tsx
// Good: Small, focused component
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger';
  size: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant, 
  size, 
  disabled = false, 
  onClick, 
  children 
}) => {
  const baseClasses = 'btn';
  const variantClasses = `btn-${variant}`;
  const sizeClasses = `btn-${size}`;
  const className = `${baseClasses} ${variantClasses} ${sizeClasses}`;

  return (
    <button
      className={className}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
};

export default Button;
```

### TypeScript Best Practices
```tsx
// Define clear interfaces
interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  preferences: UserPreferences;
}

interface UserPreferences {
  theme: 'light' | 'dark';
  notifications: boolean;
  language: string;
}

// Use generic types for reusable components
interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T) => string | number;
  emptyMessage?: string;
}

function List<T>({ items, renderItem, keyExtractor, emptyMessage = 'No items' }: ListProps<T>) {
  if (items.length === 0) {
    return <div className="empty-list">{emptyMessage}</div>;
  }

  return (
    <ul className="list">
      {items.map((item, index) => (
        <li key={keyExtractor(item)}>
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  );
}

// Usage
const UserList: React.FC = () => {
  const users: User[] = []; // Your user data

  return (
    <List
      items={users}
      keyExtractor={(user) => user.id}
      renderItem={(user) => (
        <div>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      )}
      emptyMessage="No users found"
    />
  );
};
```

### Performance Best Practices
```tsx
import React, { memo, useMemo, useCallback } from 'react';

// Memoized component to prevent unnecessary re-renders
const ExpensiveComponent = memo<{data: any[]; onItemClick: (id: number) => void}>(
  ({ data, onItemClick }) => {
    // Expensive calculation
    const processedData = useMemo(() => {
      return data.map(item => ({
        ...item,
        processed: expensiveCalculation(item)
      }));
    }, [data]);

    return (
      <div>
        {processedData.map(item => (
          <div key={item.id} onClick={() => onItemClick(item.id)}>
            {item.processed}
          </div>
        ))}
      </div>
    );
  }
);

const ParentComponent: React.FC = () => {
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // useCallback to prevent function recreation on every render
  const handleItemClick = useCallback((id: number) => {
    setSelectedId(id);
  }, []);

  return (
    <ExpensiveComponent 
      data={data} 
      onItemClick={handleItemClick} 
    />
  );
};

function expensiveCalculation(item: any) {
  // Simulate expensive operation
  return item.value * 2;
}
```

---

## Sample Application Components

### User Dashboard Components
These components can be combined to create a comprehensive user dashboard application:

#### 1. UserCard Component
```tsx
import React from 'react';

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user' | 'guest';
  lastActive: Date;
  isOnline: boolean;
}

interface UserCardProps {
  user: User;
  onEdit?: (user: User) => void;
  onDelete?: (userId: number) => void;
  onViewProfile?: (userId: number) => void;
  showActions?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({ 
  user, 
  onEdit, 
  onDelete, 
  onViewProfile,
  showActions = true 
}) => {
  const formatLastActive = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className={`user-card ${user.isOnline ? 'online' : 'offline'}`}>
      <div className="user-avatar">
        {user.avatar ? (
          <img src={user.avatar} alt={`${user.name}'s avatar`} />
        ) : (
          <div className="avatar-placeholder">
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}
        {user.isOnline && <div className="online-indicator" />}
      </div>
      
      <div className="user-info">
        <h3 className="user-name">{user.name}</h3>
        <p className="user-email">{user.email}</p>
        <div className="user-meta">
          <span className={`role-badge role-${user.role}`}>{user.role}</span>
          <span className="last-active">
            Last active: {formatLastActive(user.lastActive)}
          </span>
        </div>
      </div>

      {showActions && (
        <div className="user-actions">
          {onViewProfile && (
            <button 
              onClick={() => onViewProfile(user.id)}
              className="btn btn-secondary"
            >
              View
            </button>
          )}
          {onEdit && (
            <button 
              onClick={() => onEdit(user)}
              className="btn btn-primary"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button 
              onClick={() => onDelete(user.id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default UserCard;
```

#### 2. SearchAndFilter Component
```tsx
import React, { useState } from 'react';

interface SearchAndFilterProps {
  onSearch: (query: string) => void;
  onFilter: (filters: FilterOptions) => void;
  availableRoles: string[];
}

interface FilterOptions {
  role: string;
  isOnline: boolean | null;
  sortBy: 'name' | 'email' | 'lastActive';
  sortOrder: 'asc' | 'desc';
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  onSearch,
  onFilter,
  availableRoles
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    role: '',
    isOnline: null,
    sortBy: 'name',
    sortOrder: 'asc'
  });
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const clearFilters = () => {
    const defaultFilters: FilterOptions = {
      role: '',
      isOnline: null,
      sortBy: 'name',
      sortOrder: 'asc'
    };
    setFilters(defaultFilters);
    onFilter(defaultFilters);
    setSearchQuery('');
    onSearch('');
  };

  return (
    <div className="search-and-filter">
      <div className="search-section">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search users by name or email..."
          className="search-input"
        />
        <button
          onClick={() => setIsFilterExpanded(!isFilterExpanded)}
          className="filter-toggle-btn"
        >
          Filters {isFilterExpanded ? '▲' : '▼'}
        </button>
      </div>

      {isFilterExpanded && (
        <div className="filter-section">
          <div className="filter-group">
            <label>Role:</label>
            <select
              value={filters.role}
              onChange={(e) => handleFilterChange('role', e.target.value)}
            >
              <option value="">All Roles</option>
              {availableRoles.map(role => (
                <option key={role} value={role}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Status:</label>
            <select
              value={filters.isOnline === null ? '' : filters.isOnline.toString()}
              onChange={(e) => {
                const value = e.target.value;
                handleFilterChange('isOnline', value === '' ? null : value === 'true');
              }}
            >
              <option value="">All Users</option>
              <option value="true">Online Only</option>
              <option value="false">Offline Only</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Sort by:</label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            >
              <option value="name">Name</option>
              <option value="email">Email</option>
              <option value="lastActive">Last Active</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Order:</label>
            <select
              value={filters.sortOrder}
              onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>

          <button onClick={clearFilters} className="clear-filters-btn">
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchAndFilter;
```

#### 3. UserList Component
```tsx
import React, { useState, useMemo } from 'react';
import UserCard, { User } from './UserCard';
import SearchAndFilter from './SearchAndFilter';

interface UserListProps {
  users: User[];
  onEditUser: (user: User) => void;
  onDeleteUser: (userId: number) => void;
  onViewProfile: (userId: number) => void;
}

interface FilterOptions {
  role: string;
  isOnline: boolean | null;
  sortBy: 'name' | 'email' | 'lastActive';
  sortOrder: 'asc' | 'desc';
}

const UserList: React.FC<UserListProps> = ({
  users,
  onEditUser,
  onDeleteUser,
  onViewProfile
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    role: '',
    isOnline: null,
    sortBy: 'name',
    sortOrder: 'asc'
  });

  const availableRoles = useMemo(() => {
    return Array.from(new Set(users.map(user => user.role)));
  }, [users]);

  const filteredAndSortedUsers = useMemo(() => {
    let filtered = users;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply role filter
    if (filters.role) {
      filtered = filtered.filter(user => user.role === filters.role);
    }

    // Apply online status filter
    if (filters.isOnline !== null) {
      filtered = filtered.filter(user => user.isOnline === filters.isOnline);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (filters.sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'email':
          aValue = a.email.toLowerCase();
          bValue = b.email.toLowerCase();
          break;
        case 'lastActive':
          aValue = a.lastActive.getTime();
          bValue = b.lastActive.getTime();
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }

      if (aValue < bValue) return filters.sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return filters.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [users, searchQuery, filters]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilter = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  return (
    <div className="user-list">
      <div className="user-list-header">
        <h2>Users ({filteredAndSortedUsers.length})</h2>
        <SearchAndFilter
          onSearch={handleSearch}
          onFilter={handleFilter}
          availableRoles={availableRoles}
        />
      </div>

      <div className="user-grid">
        {filteredAndSortedUsers.length > 0 ? (
          filteredAndSortedUsers.map(user => (
            <UserCard
              key={user.id}
              user={user}
              onEdit={onEditUser}
              onDelete={onDeleteUser}
              onViewProfile={onViewProfile}
            />
          ))
        ) : (
          <div className="empty-state">
            <h3>No users found</h3>
            <p>Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
```

#### 4. NotificationSystem Component
```tsx
import React, { useState, useEffect } from 'react';

interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

interface NotificationSystemProps {
  notifications: Notification[];
  onRemove: (id: string) => void;
}

const NotificationItem: React.FC<{
  notification: Notification;
  onRemove: (id: string) => void;
}> = ({ notification, onRemove }) => {
  useEffect(() => {
    const duration = notification.duration || 5000;
    const timer = setTimeout(() => {
      onRemove(notification.id);
    }, duration);

    return () => clearTimeout(timer);
  }, [notification.id, notification.duration, onRemove]);

  return (
    <div className={`notification notification-${notification.type}`}>
      <div className="notification-content">
        <span className="notification-message">{notification.message}</span>
        <button
          onClick={() => onRemove(notification.id)}
          className="notification-close"
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    </div>
  );
};

const NotificationSystem: React.FC<NotificationSystemProps> = ({
  notifications,
  onRemove
}) => {
  return (
    <div className="notification-system">
      {notifications.map(notification => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

export default NotificationSystem;
```

---

## Building Towards a Complete Application

### Application Architecture Overview
When combining these components, consider this structure:

```
src/
├── components/           # Reusable UI components
│   ├── UserCard.tsx
│   ├── SearchAndFilter.tsx
│   ├── UserList.tsx
│   ├── NotificationSystem.tsx
│   └── Button.tsx
├── context/             # Context providers
│   ├── AuthContext.tsx
│   ├── ThemeContext.tsx
│   └── NotificationContext.tsx
├── hooks/               # Custom hooks
│   ├── useFetch.tsx
│   ├── useLocalStorage.tsx
│   └── useWindowDimensions.tsx
├── types/               # TypeScript type definitions
│   ├── User.ts
│   ├── Notification.ts
│   └── index.ts
├── utils/               # Utility functions
│   ├── api.ts
│   ├── formatters.ts
│   └── validators.ts
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── styles/             # CSS files
    ├── components.css
    ├── layout.css
    └── variables.css
```

### Integration Example
```tsx
import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';
import UserList from './components/UserList';
import NotificationSystem from './components/NotificationSystem';
import ErrorBoundary from './components/ErrorBoundary';
import { User } from './types/User';

// Main Dashboard Component
const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching users
    const fetchUsers = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        const mockUsers: User[] = [
          {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            role: 'admin',
            lastActive: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
            isOnline: true
          },
          {
            id: 2,
            name: 'Jane Smith',
            email: 'jane@example.com',
            role: 'user',
            lastActive: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
            isOnline: false
          },
          // More mock users...
        ];
        
        setTimeout(() => {
          setUsers(mockUsers);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Failed to fetch users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEditUser = (user: User) => {
    console.log('Edit user:', user);
    // Implement edit logic
  };

  const handleDeleteUser = (userId: number) => {
    console.log('Delete user:', userId);
    setUsers(prev => prev.filter(user => user.id !== userId));
  };

  const handleViewProfile = (userId: number) => {
    console.log('View profile:', userId);
    // Implement view profile logic
  };

  if (loading) {
    return <div className="loading">Loading users...</div>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>User Dashboard</h1>
      </header>
      
      <main className="dashboard-main">
        <UserList
          users={users}
          onEditUser={handleEditUser}
          onDeleteUser={handleDeleteUser}
          onViewProfile={handleViewProfile}
        />
      </main>
    </div>
  );
};

// Root App Component
const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ThemeProvider>
          <NotificationProvider>
            <div className="app">
              <Dashboard />
              <NotificationSystem />
            </div>
          </NotificationProvider>
        </ThemeProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
```

### Development Workflow
1. **Start with individual components**: Build and test each component in isolation
2. **Add state management**: Implement useState and useEffect as needed
3. **Introduce context**: Add Context API for shared state
4. **Combine components**: Integrate components into larger features
5. **Add error handling**: Implement ErrorBoundary and error states
6. **Optimize performance**: Add memoization and optimization as needed
7. **Test functionality**: Ensure all interactions work correctly

This comprehensive guide provides the foundation for understanding React and TypeScript development. Each concept builds upon the previous ones, creating a solid foundation for building modern web applications.
