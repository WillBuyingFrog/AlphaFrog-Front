import React from 'react';
import {createBrowserRouter, Route, Routes} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import DomesticIndexList from "./pages/DomesticIndexList";
import AlphaRecord from "./pages/AlphaRecord";
import CreateRecord from "./pages/AlphaRecord/CreateRecord";

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
    },
    {
        path: "/record",
        element: <AlphaRecord />,
        children: [
            {
                path: "create-record",
                element: <CreateRecord />
            }
        ]
    }
])

export default routes;
