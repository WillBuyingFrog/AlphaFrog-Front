import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

const routes = (
    <Routes>
        <Route path="/" element={<Dashboard />} />
    </Routes>
);

export default routes;