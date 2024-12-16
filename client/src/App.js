import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from './component/Signup'; 
import Home from './component/Home'; 



import ReadPost from "./component/ReadQuote";
import Quotes from "./component/Quotes";

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} /> 
        <Route path="Quotes" element={<Quotes />} /> 
        <Route path="/home" element={<Home />} />
        
        <Route path="/read-post" element={<ReadPost />} /> 
        {/* <Route path="/Quote" element={<Quote />} /> 
        <Route path="/" element={<NewQuote />} /> 
        <Route path="/Data" element={<Data />} />  */}
       
      </Routes>
    </Router>
  );
}

export default App;
