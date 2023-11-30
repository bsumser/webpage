import React, { Component } from 'react'

import './App.css'

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import Home from './components/home'
import AOC from './components/aoc-hub'
import Navbar from "./components/navbar";
import Test from "./components/test";

function App(){

    return (
        <>
            {
                <Router>
                    <Navbar />
                    <Routes>
                        <Route
                            exact
                            path="/"
                            element={<Home />}
                        />
                        <Route
                            exact
                            path="/aoc-hub"
                            element={<AOC />}
                        />
                        <Route
                            exact
                            path="/test"
                            element={<Test />}
                        />
                        <Route
                            path="*"
                            element={<Navigate to="NotFound" />}
                        />
                    </Routes>
                </Router>
            }
            </>

    );

}

export default App