import "./App.css";
import Clubs from "./components/Clubs";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <ToastContainer />
      <div>
        <Router>
          <Navbar />
          <Routes>
            {/* TODO: create main page based on the instructions make its path "/" and change the clubs route to path "/clubs" */}
            <Route path="/" element={<Clubs />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
