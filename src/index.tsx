import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

const domContainer = document.querySelector('#app-root');

if (domContainer) {
  const root = createRoot(domContainer);

  root.render(<App />);
}
