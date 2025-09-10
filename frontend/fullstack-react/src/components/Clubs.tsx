import { useEffect, useState, type FunctionComponent } from "react";
import type { Club } from "../interfaces/clubs/Club";
import { getAllClubs } from "../services/clubsService";
import ClubCard from "./clubs/ClubCard";

interface ClubsProps {}

const Clubs: FunctionComponent<ClubsProps> = () => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [isClubLoading, setIsClubLoading] = useState<boolean>(true);

  useEffect(() => {
    getAllClubs()
      .then((res) => {
        setClubs(res.data);
        setIsClubLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      {isClubLoading ? (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="row d-flex justify-content-center">
            {clubs.map((club) => (
              <ClubCard key={club._id} club={club} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Clubs;
