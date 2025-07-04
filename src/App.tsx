import './App.css';
import { Navigate, Route, Routes } from 'react-router';
import Layout from './layout/Layout';
import CheapTicketsPage from './pages/CheapTicketsPage';
import FastTicketsPage from './pages/FastTicketsPage';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Navigate to="/cheap" replace />} />
                <Route path="cheap" element={<CheapTicketsPage />} />
                <Route path="fast" element={<FastTicketsPage />} />
            </Route>
        </Routes>
    );
}

export default App;
