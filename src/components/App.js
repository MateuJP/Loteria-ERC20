import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Tokens from './Tokens';
import Loteria from './Loteria';
import Boletos from './Boletos';
import '../css/main.css'

class App extends Component {
    
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <div>
                        <Routes>
                            <Route path="/" element={<Tokens />} />
                            <Route path="/loteria" element={<Loteria />} />
                            <Route path="/misBoletos" element={<Boletos />} />



                        </Routes>
                    </div>
                </div>
            </BrowserRouter>
        );
    }

}

export default App;