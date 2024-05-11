import React from 'react';
import {createBrowserRouter, Route, Routes} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import DomesticIndexList from "./pages/DomesticIndexList";

const routes = createBrowserRouter([
    {
        path: "/panel/v1",
        element: <Dashboard />,
        children: [
            {
                path: "domestic/index/",
                element: <DomesticIndexList />
            }
        ]
    }
])

export default routes;
