// hooks/useToast.js
import { useState, useEffect } from 'react'

let count = 0
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

const TOAST_LIMIT = 3
const TOAST_REMOVE_DELAY = 4000

let listeners = []
let memoryState = { toasts: [] }

function dispatch(action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => listener(memoryState))
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }
    case 'DISMISS_TOAST':
      return {
        toasts: state.toasts.map((toast) =>
          toast.id === action.toastId ? { ...toast, open: false } : toast
        ),
      }
    case 'REMOVE_TOAST':
      return {
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
    default:
      return state
  }
}

export function toast({ message, severity = 'info' }) {
  const id = genId()

  dispatch({
    type: 'ADD_TOAST',
    toast: {
      id,
      message,
      severity,
      open: true,
    },
  })

  setTimeout(() => {
    dispatch({ type: 'DISMISS_TOAST', toastId: id })
  }, TOAST_REMOVE_DELAY)

  setTimeout(() => {
    dispatch({ type: 'REMOVE_TOAST', toastId: id })
  }, TOAST_REMOVE_DELAY + 300)
}

export function useToast() {
  const [state, setState] = useState(memoryState)

  useEffect(() => {
    listeners.push(setState)
    return () => {
      listeners = listeners.filter((l) => l !== setState)
    }
  }, [])

  return {
    toasts: state.toasts,
  }
}
