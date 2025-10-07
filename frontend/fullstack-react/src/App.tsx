import "./App.css";
import Clubs from "./components/Clubs";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import { decodeToken } from "./hooks/useJwtDecoder";
import { useState } from "react";
import CreateClub from "./components/CreateClub";
import ClubDetails from "./components/ClubDetails";

function App() {
  const [jwtToken, setJwtToken] = useState<string | null>(
    sessionStorage.getItem("token")
  );

  decodeToken(jwtToken);

  const loginEvent = () => {
    const token = sessionStorage.getItem("token");
    setJwtToken(token);
  };

  const logoutEvent = () => {
    setJwtToken(null);
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
  };

  return (
    <>
      <ToastContainer />
      <div>
        <Router>
          <Navbar logoutEvent={logoutEvent} />
          <Routes>
            {/* TODO: create main page based on the instructions make its path "/" and change the clubs route to path "/clubs" */}
            <Route path="/" element={<Clubs />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login loginEvent={loginEvent} />} />
            <Route path="/clubs/create" element={<CreateClub />} />
            <Route path="/ClubDetails/:id/" element={<ClubDetails />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
