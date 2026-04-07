// ============================================================
// 3️⃣  StateDemo — useState Hook & State Management
// ============================================================
// Topics from the notes:
//   • useState<T>() — primitive, array, and object state
//   • Setter with direct value vs functional updater
//   • Spread operator for immutable updates
//   • Controlled inputs
//   • Complex form state with validation
//   • Partial<T> for error maps, keyof for dynamic field access
// ============================================================

import React, { useState } from 'react';
import type { FormData } from '../types';

// ---------- Counter ----------
const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [step, setStep] = useState<number>(1);

  return (
    <div>
      <h3>Counter (Primitive State)</h3>
      <p className="big-number">{count}</p>
      <div className="flex-row">
        <button className="btn" onClick={() => setCount(prev => prev - step)}>
          − {step}
        </button>
        <button className="btn" onClick={() => setCount(0)}>Reset</button>
        <button className="btn btn-primary" onClick={() => setCount(prev => prev + step)}>
          + {step}
        </button>
      </div>
      <label style={{ marginTop: 8, display: 'block' }}>
        Step:&nbsp;
        <input
          type="number"
          min={1}
          value={step}
          onChange={(e) => setStep(parseInt(e.target.value) || 1)}
          style={{ width: 60 }}
        />
      </label>
    </div>
  );
};

// ---------- Array State ----------
const ArrayState: React.FC = () => {
  const [items, setItems] = useState<string[]>(['Apple', 'Banana', 'Cherry']);
  const [newItem, setNewItem] = useState('');

  const addItem = () => {
    if (!newItem.trim()) return;
    setItems(prev => [...prev, newItem.trim()]); // spread to create new array
    setNewItem('');
  };

  const removeItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h3>Array State (Immutable Updates)</h3>
      <ul>
        {items.map((item, i) => (
          <li key={i}>
            {item}{' '}
            <button className="btn btn-small btn-danger" onClick={() => removeItem(i)}>✕</button>
          </li>
        ))}
      </ul>
      <div className="flex-row">
        <input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addItem()}
          placeholder="New item…"
        />
        <button className="btn btn-primary" onClick={addItem}>Add</button>
      </div>
    </div>
  );
};

// ---------- Form with Validation ----------
const FormState: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    age: 0,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  // Dynamic field updater using keyof + spread
  const updateField = (field: keyof FormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    if (formData.age < 18) newErrors.age = 'Must be 18+';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  return (
    <div>
      <h3>Complex Form State (Partial, keyof, Spread)</h3>
      {submitted ? (
        <div className="success-box">
          ✅ Submitted: {formData.firstName} {formData.lastName}, {formData.email}, age {formData.age}
          <br />
          <button className="btn btn-small" onClick={() => { setSubmitted(false); setFormData({ firstName: '', lastName: '', email: '', age: 0 }); }}>
            Reset
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {(['firstName', 'lastName', 'email'] as const).map(field => (
            <div className="form-group" key={field}>
              <label>{field}:</label>
              <input
                value={formData[field]}
                onChange={(e) => updateField(field, e.target.value)}
                className={errors[field] ? 'input-error' : ''}
              />
              {errors[field] && <span className="error-msg">{errors[field]}</span>}
            </div>
          ))}
          <div className="form-group">
            <label>age:</label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => updateField('age', parseInt(e.target.value) || 0)}
              className={errors.age ? 'input-error' : ''}
            />
            {errors.age && <span className="error-msg">{errors.age}</span>}
          </div>
          <button className="btn btn-primary" type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

// ---------- Main demo ----------
const StateDemo: React.FC = () => {
  return (
    <div>
      <h2>3. State (useState Hook)</h2>

      <section className="demo-card"><Counter /></section>
      <section className="demo-card"><ArrayState /></section>
      <section className="demo-card"><FormState /></section>

      <section className="demo-card without-card">
        <h3>⚠️ What Would Happen Without These Features?</h3>
        <ul>
          <li>
            <strong>Without useState:</strong> The component would have no
            way to remember data between renders. Clicking "+" on the counter
            wouldn't change anything — the UI would be completely static,
            like a plain HTML page.
          </li>
          <li>
            <strong>Without immutable updates (spread operator):</strong>{' '}
            Mutating state directly (<code>items.push(x)</code>) doesn't
            trigger a re-render because React compares object references.
            The state changes internally, but the UI never updates — a
            very confusing bug.
          </li>
          <li>
            <strong>Without the functional updater (<code>prev =&gt;</code>):</strong>{' '}
            Rapid clicks could use a stale value. Two quick clicks on "+1"
            might only increment once because both reads saw the same old
            value. The functional form always gets the latest state.
          </li>
          <li>
            <strong>Without Partial&lt;T&gt; / keyof:</strong> Error handling
            would require a separate state variable per field, or an
            untyped <code>any</code> object — losing TypeScript's safety.
            Typos in field names would not be caught.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default StateDemo;
