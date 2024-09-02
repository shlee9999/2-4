import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import HomePage from './pages/HomePage';
import './reset.css';
import './global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HomePage />
  </StrictMode>
);
