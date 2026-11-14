import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/style.css';
import './styles/cinema.css';
import './styles/refinements.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);

/* The stylesheet's .loaded entrance states start two frames after first paint */
requestAnimationFrame(() => requestAnimationFrame(() => document.documentElement.classList.add('loaded')));
