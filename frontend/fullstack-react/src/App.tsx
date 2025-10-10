import "./App.css";
import Clubs from "./components/Clubs";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import { decodeToken } from "./hooks/useJwtDecoder";
import { useEffect, useState } from "react";
import ClubForm from "./components/ClubForm";
import ClubDetails from "./components/ClubDetails";
import FavoriteClubs from "./components/FavoriteClubs";
import MainPage from "./components/MainPage";
import { getAllClubs } from "./services/clubsService";
import { errorMessage } from "./utils/ui/alert";
import type { Club } from "./interfaces/clubs/Club";

function App() {
  const [jwtToken, setJwtToken] = useState<string | null>(
    sessionStorage.getItem("token")
  );
  const [clubs, setClubs] = useState<Club[]>([]);
  const [isClubsLoading, setIsClubsLoading] = useState<boolean>(true);

  useEffect(() => {
    getAllClubs()
      .then((res) => {
        setClubs(res.data);
        setIsClubsLoading(false);
      })
      .catch((err) => {
        console.log("Error loading clubs:", err);
        errorMessage("Failed to load clubs");
        setIsClubsLoading(false);
      });
  }, []);

  const onRemoveFromView = (clubId: string) => {
    setClubs(clubs.filter((club) => club._id !== clubId));
  };

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
            <Route
              path="/"
              element={
                <MainPage
                  clubs={clubs}
                  isClubsLoading={isClubsLoading}
                  onRemoveFromView={onRemoveFromView}
                />
              }
            />
            <Route
              path="/clubs"
              element={
                <Clubs
                  clubs={clubs}
                  isClubsLoading={isClubsLoading}
                  onRemoveFromView={onRemoveFromView}
                />
              }
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login loginEvent={loginEvent} />} />
            <Route path="/clubs/create" element={<ClubForm />} />
            <Route path="/clubs/:id/edit" element={<ClubForm />} />
            <Route path="/ClubDetails/:id/" element={<ClubDetails />} />
            <Route path="/favorites" element={<FavoriteClubs />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
