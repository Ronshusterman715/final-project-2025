import "./App.css";
import Clubs from "./components/Clubs";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterForm from "./components/Register";

function App() {
  return (
    <Router>
      <Routes>
        {/* TODO: create main page based on the instructions make its path "/" and change the clubs route to path "/clubs" */}
        <Route path="/" element={<Clubs />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </Router>
  );
}

export default App;
