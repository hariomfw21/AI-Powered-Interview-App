import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/registerPage';
import { ChakraProvider } from '@chakra-ui/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider>
    <BrowserRouter>
    <Routes>
      <Route path='/'element={<App/>}></Route>
      <Route path='/login'element={<LoginPage/>}></Route>
      <Route path='/register'element={<RegisterPage/>}></Route>
    </Routes>
    </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);


reportWebVitals();
