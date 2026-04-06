/**
 * bad-component.jsx
 *
 * CSC 436 — Week 2 Sample
 *
 * This component demonstrates common mistakes AI tools make when generating React code.
 * Each anti-pattern is annotated for teaching purposes.
 *
 * ANTI-PATTERNS IN THIS FILE:
 * 1. State mutation (lines 20-22, 26-27)
 * 2. Missing/incorrect key props (line 58)
 * 3. Stale closure in useEffect (lines 14-18)
 * 4. Missing useEffect cleanup (lines 14-18)
 * 5. Missing useEffect dependency array (line 18)
 * 6. Calling handler immediately instead of passing reference (line 68)
 * 7. No empty state handling
 * 8. Uncontrolled-to-controlled input switch (line 47)
 * 9. Direct DOM manipulation in React (line 35)
 */
import { useState, useEffect } from 'react';

function BadNotepad() {
  const [notes, setNotes] = useState([]);
  const [count, setCount] = useState(0);

  // MISTAKE 1: No dependency array → runs every render
  // MISTAKE 2: No cleanup → leaks intervals on every render
  // MISTAKE 3: Stale closure — `count` is always 0 in this callback
  useEffect(() => {
    setInterval(() => {
      console.log(`Note count: ${count}`);  // always logs 0
      setCount(count + 1);                  // always sets to 1
    }, 5000);
  });

  // MISTAKE 4: Mutating state directly
  const addNote = (text) => {
    notes.push({ text, date: new Date() });  // mutation!
    setNotes(notes);  // same reference — React may skip re-render
  };

  // MISTAKE 5: Mutating nested object in state
  const updateNote = (index, newText) => {
    notes[index].text = newText;  // mutating existing object
    setNotes([...notes]);          // new array but same objects
  };

  // MISTAKE 6: Direct DOM manipulation in React
  const highlightAll = () => {
    document.querySelectorAll('.note').forEach(el => {
      el.style.backgroundColor = 'yellow';  // bypasses React!
    });
  };

  // MISTAKE 7: No input default value — switches from uncontrolled to controlled
  const [searchText, setSearchText] = useState(undefined);

  return (
    <div>
      <h1>My Notes</h1>

      {/* MISTAKE 8: No form, no submit handler, no preventDefault */}
      <input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search..."
      />

      <button onClick={() => addNote(searchText)}>Add Note</button>
      <button onClick={highlightAll}>Highlight All</button>

      {/* No empty state — just renders nothing when notes is empty */}

      {/* MISTAKE 9: Using array index as key */}
      {notes.map((note, i) => (
        <div key={i} className="note">
          <p>{note.text}</p>
          <small>{note.date.toString()}</small>
          {/* MISTAKE 10: Calling handler immediately, not passing a function */}
          <button onClick={updateNote(i, 'EDITED')}>Edit</button>
        </div>
      ))}
    </div>
  );
}

export default BadNotepad;
