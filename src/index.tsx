import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';
import { registerSW } from 'virtual:pwa-register';

const updateSW = registerSW({
  onNeedRefresh() {
    console.log('onNeedRefresh');

    updateSW(true);
  },
});

createRoot(document.getElementById('app') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
