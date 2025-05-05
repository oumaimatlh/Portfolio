import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store/Reducer';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

// Créer un routeur avec React Router v6+ (future-proof)
const router = createBrowserRouter([
  {
    path: '/*',
    element: <App />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    />
  </Provider>
);

reportWebVitals();
