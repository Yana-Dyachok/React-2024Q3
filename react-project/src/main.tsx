import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router/router';
import './index.css';
import './styles/colors.css';
import store from './redux/store/store';
import { Provider } from 'react-redux';
import { ThemeProvider } from './redux/toggle-theme/theme-provider/theme-provider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
