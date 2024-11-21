import './App.css';

import * as React from "react";
import {
 BrowserRouter as Router,
 Route,
 Routes
} from "react-router-dom";
import Home from './components/Home';
import Contact from './components/Contact';
import Malware from './components/Malware';




function App() {
  return (
    <Router>
      <div className="App">
        
        <Routes> 
          <Route path='/' element={<Home />} />
          <Route path='/contact' element={<Contact />} /> 
          <Route path='/malware' element={<Malware />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
