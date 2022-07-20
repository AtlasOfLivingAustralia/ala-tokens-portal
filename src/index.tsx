import React from 'react';
import ReactDOM from 'react-dom/client';

// Styles
import './index.css';

// Local components
import App from './App';

const root = document.getElementById('root');

if (root) {
  // Render the React application
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
