import React from 'react'
import { BrowserRouter } from "react-router-dom";
import { GlobalProvider } from './context/GlobalContext';
import MainRouter from './MainRouter';
import 'antd/dist/antd.css';
import './assets/css/style.css'

export default function App() {
    return (
        <GlobalProvider>
            <BrowserRouter>
                <MainRouter />
            </BrowserRouter>
        </GlobalProvider>
    )
}
