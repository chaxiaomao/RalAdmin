/// libraries
import React from 'react';
import ReactDOM from 'react-dom/client';
import {Route, Routes, BrowserRouter, RouterProvider, LoaderFunctionArgs, redirect, Navigate} from "react-router-dom";

/// css
import './assets/css/bluma.min.css';
import './assets/css/app.scss';

/// routes
import App from './App.tsx';

// document.title = 'RA Bluma';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
        {/*<BrowserRouter>*/}
        {/*    <Routes>*/}
        {/*        <Route path="/*" element={<Admin />} />*/}
        {/*        <Route path="/" element={<Navigate to="/dashboard" replace />} />*/}
        {/*    </Routes>*/}
        {/*</BrowserRouter>*/}
    </React.StrictMode>
);