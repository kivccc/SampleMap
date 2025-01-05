import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Auth from "./components/Auth/index";
import Main from "./components/Main/index";
import Login from "./components/Login/index";
import reportWebVitals from './reportWebVitals';
import { Route, Routes, BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/main" element={<Main />}/>
      <Route path="/login/oauth2/callback/kakao" element={<Auth />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
