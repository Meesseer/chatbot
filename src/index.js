// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Home from './Pages/Home/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // Main layout component
    children: [
      {
        path: '/',
        element: <Home /> // Home page rendered within App layout
      },
    
    ],
  },
]);

// Render the router with RouterProvider
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
