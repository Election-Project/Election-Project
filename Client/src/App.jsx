import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BillboardDesignPage from "./pages/Advertisement";
import { Nav } from "./components/header";
import { Foot } from "./components/footer";
import ContactForm from "./pages/contact";
import Voting from "./pages/voting";
import Home from "./pages/Home";
import LoginOTP from "./pages/LoginOTP";
import VerifyOTP from "./pages/VerifuOTP";
import CheckEmail from "./pages/CheckEmail";
import SetNewPassword from "./pages/SetNewPassword";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/Advertisement" element={<BillboardDesignPage />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/" element={<Home />} />
          <Route path="/login-otp" element={<LoginOTP />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/check-email" element={<CheckEmail />} />
          <Route path="/set-new-password" element={<SetNewPassword />} />
          <Route path="/voting" element={<Voting listType="party" />} />{" "}
        </Routes>
        <Foot />
      </div>
    </Router>
  );
}

export default App;
