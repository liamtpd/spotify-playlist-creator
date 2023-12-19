import React from 'react';
import { createRoot } from 'react-dom/client'; // import createRoot
import App from './App';

const container = document.getElementById('root'); // Get the root element
const root = createRoot(container); // Create a root

root.render( // Use the render method on the root
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
