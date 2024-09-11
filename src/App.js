import './App.css';

import * as React from "react";
import {
 BrowserRouter as Router,
 Route,
 Routes
} from "react-router-dom";
import Home from './components/Home';
import Contact from './components/Contact';




function App() {
  return (
    <Router>
      <div className="App">
        
        <Routes> 
          <Route path='/' element={<Home />} />
          <Route path='/contact' element={<Contact />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
