import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import './install';
import '../css/style.css';

const main = document.querySelector('#main');
main.innerHTML = '';

const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

const editor = new Editor();

if (typeof editor === 'undefined') {
  loadSpinner();
}

// register a service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./src-sw.js')
    .then((register) => console.log(register));
}
