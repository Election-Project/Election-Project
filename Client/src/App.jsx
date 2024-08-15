import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import BillboardDesignPage from "./pages/Advertisement";
import { Nav } from "./components/header";
import { Foot } from "./components/footer";
import ContactForm from "./pages/contact";
import Voting from "./pages/voting";
import Home from "./pages/Home";
import LoginOTP from "./pages/LoginOTP";
import VerifyOTP from "./pages/VerifyOTP";
import CheckEmail from "./pages/CheckEmail";
import SetNewPassword from "./pages/SetNewPassword";
import VoterListSelection from "./pages/TypesOfElection";
import LoginWithPass from "./pages/LoginWithPass";
import ChatWidget from "./pages/ChatWidget";
import PasswordResetRequest from "./pages/PasswordResetRequest";
import PasswordReset from "./pages/PasswordReset";

import { useAuth } from "./context/AuthContext";
import PublicRoute from "./components/PublicRoute";

function App() {
  const { login } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      login(token);
    }
  }, [login]);

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
          {/* Public Routes for non-authenticated users */}
          <Route
            path="/login-otp"
            element={<PublicRoute element={<LoginOTP />} />}
          />
          <Route
            path="/login-with-password"
            element={<PublicRoute element={<LoginWithPass />} />}
          />
          <Route
            path="/verify-otp"
            element={<PublicRoute element={<VerifyOTP />} />}
          />
          <Route
            path="/check-email"
            element={<PublicRoute element={<CheckEmail />} />}
          />
          <Route path="/set-new-password" element={<SetNewPassword />} />
          <Route
            path="/request-password-reset"
            element={<PublicRoute element={<PasswordResetRequest />} />}
          />
          <Route
            path="/reset-password"
            element={<PublicRoute element={<PasswordReset />} />}
          />
        </Routes>
        <ChatWidget />

        <Foot />
      </div>
    </Router>
  );
}

export default App;
