import { useEffect, useState, type FunctionComponent } from "react";
import type { Club } from "../interfaces/clubs/Club";
import { getAllClubs } from "../services/clubsService";
import ClubCard from "./clubs/ClubCard";

interface ClubsProps {}

const Clubs: FunctionComponent<ClubsProps> = () => {
  const [clubs, setClubs] = useState<Club[]>([]);

  useEffect(() => {
    getAllClubs()
      .then((res) => setClubs(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        {clubs.map((club) => (
          <ClubCard key={club._id} club={club} />
        ))}
      </div>
    </div>
  );
};

export default Clubs;
