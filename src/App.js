import React, { Component } from 'react'

import './App.css'
import './custom.css'

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import Home from './components/home'
import AOC from './components/aoc-hub'
import Photo from './components/photo'
import Navbar from "./components/navbar";
import Test from "./components/test";

function App(){

    return (
        <>
        <script data-goatcounter="https://bsumser.goatcounter.com/count"
        async src="//gc.zgo.at/count.js"></script>
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
                            path="/photo"
                            element={<Photo />}
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