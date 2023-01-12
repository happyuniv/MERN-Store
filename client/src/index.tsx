import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import App from './App';
import store from './redux/store';

const GLobalStyle = createGlobalStyle`

  :root {
    --theme: #f5eaea51;
    --theme-dark: #c6c3c376;
    --dark: black;
  }
  * {
    box-sizing: border-box;
    margin: 0;
    font-size: 62.5%;
    font-family: 'Roboto', sans-serif;
  }

  body {
    min-width: 36rem;
  }

`;
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <GLobalStyle />
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
