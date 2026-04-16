// ============================================================
// 🔟  UseReducerDemo — Complex state with useReducer
// ============================================================
// Topics:
//   • useReducer vs useState
//   • Reducer functions (state, action) => newState
//   • Discriminated union action types
//   • dispatch has a stable identity (no useCallback needed)
//   • Combining useReducer with useMemo for derived state
// ============================================================

import React, { useReducer, useMemo } from 'react';

// ---------- Types ----------
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

// Discriminated union — TypeScript narrows payload type per action
type CartAction =
  | { type: 'ADD_ITEM'; payload: { id: number; name: string; price: number } }
  | { type: 'REMOVE_ITEM'; payload: { id: number } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; delta: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' };

// ---------- Reducer ----------
const initialState: CartState = { items: [], isOpen: true };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }

    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.payload.id) };

    case 'UPDATE_QUANTITY': {
      return {
        ...state,
        items: state.items
          .map(i =>
            i.id === action.payload.id
              ? { ...i, quantity: i.quantity + action.payload.delta }
              : i
          )
          .filter(i => i.quantity > 0), // remove if quantity drops to 0
      };
    }

    case 'CLEAR_CART':
      return { ...state, items: [] };

    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };

    default:
      return state;
  }
}

// ---------- Sample catalog ----------
const CATALOG = [
  { id: 1, name: 'React Fundamentals Book', price: 29.99 },
  { id: 2, name: 'TypeScript Masterclass', price: 34.99 },
  { id: 3, name: 'Node.js Handbook', price: 24.99 },
  { id: 4, name: 'CSS Grid Poster', price: 14.99 },
  { id: 5, name: 'Developer Sticker Pack', price: 9.99 },
];

// ---------- Component ----------
const UseReducerDemo: React.FC = () => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  // Derived values via useMemo
  const summary = useMemo(() => ({
    totalItems: cart.items.reduce((sum, i) => sum + i.quantity, 0),
    totalPrice: cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0),
  }), [cart.items]);

  return (
    <div>
      <h2>10. useReducer — Complex State Management</h2>

      {/* Explanation */}
      <section className="demo-card">
        <h3>Why useReducer?</h3>
        <p className="explanation">
          <code>useReducer</code> is ideal when state transitions are complex or
          involve multiple sub-values that change together. Instead of calling
          several <code>setState</code> functions, you <strong>dispatch</strong> a
          descriptive action and a single reducer function decides the new state.
        </p>
        <p className="explanation" style={{ marginTop: 8 }}>
          The shopping cart below has five action types:
          <code>ADD_ITEM</code>, <code>REMOVE_ITEM</code>,
          <code>UPDATE_QUANTITY</code>, <code>CLEAR_CART</code>, and
          <code>TOGGLE_CART</code>. All state logic lives in one predictable,
          testable reducer function.
        </p>
      </section>

      {/* Product catalog */}
      <section className="demo-card">
        <h3>Product Catalog</h3>
        <p className="explanation">
          Click <strong>Add to Cart</strong> to dispatch an <code>ADD_ITEM</code> action.
          If the product is already in the cart, the reducer increments its quantity instead
          of adding a duplicate.
        </p>
        <div style={{ display: 'grid', gap: 8 }}>
          {CATALOG.map(product => {
            const inCart = cart.items.find(i => i.id === product.id);
            return (
              <div
                key={product.id}
                style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '8px 12px', borderRadius: 6, border: '1px solid var(--border)',
                }}
              >
                <span>{product.name} — <strong>${product.price.toFixed(2)}</strong></span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {inCart && (
                    <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
                      ×{inCart.quantity} in cart
                    </span>
                  )}
                  <button
                    className="btn btn-primary btn-small"
                    onClick={() => dispatch({ type: 'ADD_ITEM', payload: product })}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Cart */}
      <section className="demo-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>🛒 Cart ({summary.totalItems} items)</h3>
          <button className="btn btn-small" onClick={() => dispatch({ type: 'TOGGLE_CART' })}>
            {cart.isOpen ? 'Hide' : 'Show'} Cart
          </button>
        </div>

        {cart.isOpen && (
          <div style={{ marginTop: 12 }}>
            {cart.items.length === 0 ? (
              <p style={{ color: 'var(--muted)' }}>Your cart is empty. Add some products above!</p>
            ) : (
              <>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--border)' }}>
                      <th style={{ padding: '6px 8px' }}>Product</th>
                      <th style={{ padding: '6px 8px' }}>Price</th>
                      <th style={{ padding: '6px 8px' }}>Qty</th>
                      <th style={{ padding: '6px 8px' }}>Subtotal</th>
                      <th style={{ padding: '6px 8px' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.items.map(item => (
                      <tr key={item.id} style={{ borderBottom: '1px solid var(--border)' }}>
                        <td style={{ padding: '6px 8px' }}>{item.name}</td>
                        <td style={{ padding: '6px 8px' }}>${item.price.toFixed(2)}</td>
                        <td style={{ padding: '6px 8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <button
                              className="btn btn-small"
                              onClick={() => dispatch({
                                type: 'UPDATE_QUANTITY',
                                payload: { id: item.id, delta: -1 },
                              })}
                            >
                              −
                            </button>
                            <span style={{ minWidth: 20, textAlign: 'center' }}>{item.quantity}</span>
                            <button
                              className="btn btn-small"
                              onClick={() => dispatch({
                                type: 'UPDATE_QUANTITY',
                                payload: { id: item.id, delta: 1 },
                              })}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td style={{ padding: '6px 8px' }}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                        <td style={{ padding: '6px 8px' }}>
                          <button
                            className="btn btn-danger btn-small"
                            onClick={() => dispatch({
                              type: 'REMOVE_ITEM',
                              payload: { id: item.id },
                            })}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  marginTop: 12, padding: '8px 0', borderTop: '2px solid var(--border)',
                }}>
                  <strong>Total: ${summary.totalPrice.toFixed(2)}</strong>
                  <button
                    className="btn btn-danger"
                    onClick={() => dispatch({ type: 'CLEAR_CART' })}
                  >
                    Clear Cart
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </section>

      {/* When to use */}
      <section className="demo-card without-card">
        <h3>⚠️ useReducer vs useState — When to Choose Which?</h3>
        <ul>
          <li>
            <strong>Use <code>useState</code></strong> for simple, independent
            values — a boolean toggle, a text input, a counter. One setter per value is
            clear and easy.
          </li>
          <li>
            <strong>Use <code>useReducer</code></strong> when you have multiple
            related state values that change together (like this cart), when the
            next state depends on the previous state in non-trivial ways, or when
            you want a centralised, testable state machine.
          </li>
          <li>
            <strong>Bonus:</strong> <code>dispatch</code> has a <strong>stable
            identity</strong> — React guarantees it never changes between renders.
            You can pass it to child components without <code>useCallback</code>,
            and memoised children won't re-render because of it.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default UseReducerDemo;
