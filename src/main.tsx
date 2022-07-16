import React from 'react'
import ReactDOM from 'react-dom/client'
import Demo from './Demo'

const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <Demo />
    </React.StrictMode>
  )
}
