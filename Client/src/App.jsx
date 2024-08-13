import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BillboardDesignPage from "./pages/Advertisement";
import { Nav } from "./components/header";
import { Foot } from './components/footer';
import ContactForm from "./pages/contact";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/Advertisement" element={<BillboardDesignPage />} />
          <Route path="/contact" element={<ContactForm />} />

          
        </Routes>
        <Foot />
      </div>
    </Router>
  );
}

export default App;
