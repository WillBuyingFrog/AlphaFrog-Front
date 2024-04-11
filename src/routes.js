import React from 'react';
import {createBrowserRouter, Route, Routes} from 'react-router-dom';
import Dashboard from './pages/Dashboard';

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard />
    }
])

export default routes;