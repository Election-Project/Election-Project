import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import BillboardDesignPage from "./pages/Advertisement";
import { Nav } from "./components/header";
import { Foot } from "./components/footer";
import ContactForm from "./pages/contact";
import Voting from "./pages/voting";
import Home from "./pages/Home";
import LoginOTP from "./pages/LoginOTP";
import VerifyOTP from "./pages/VerifuOTP";
import CheckEmail from "./pages/CheckEmail";
import SetNewPassword from "./pages/SetNewPassword";
import VoterListSelection from "./pages/TypesOfElection";
import LoginWithPass from "./pages/LoginWithPass";
import ChatWidget from "./pages/ChatWidget";
import PasswordResetRequest from "./pages/PasswordResetRequest";
import PasswordReset from "./pages/PasswordReset";
import ElectionResults from './pages/result';
function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          {/* <Route path="/Advertisement" element={<BillboardDesignPage />} /> */}
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/voting/:listtype" element={<Voting />} />
          <Route path="/votinglist" element={<VoterListSelection />} />
          <Route path="/" element={<Home />} />
          <Route path="/login-otp" element={<LoginOTP />} />
          <Route path="/login-with-password" element={<LoginWithPass />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/check-email" element={<CheckEmail />} />
          <Route path="/set-new-password" element={<SetNewPassword />} />
          <Route
            path="/request-password-reset"
            element={<PasswordResetRequest />}
          />
          <Route path="/reset-password" element={<PasswordReset />} />
          <Route path="/result" element={<ElectionResults />} />
        </Routes>
        <ChatWidget />

        <Foot />
      </div>
    </Router>
  );
}

export default App;
