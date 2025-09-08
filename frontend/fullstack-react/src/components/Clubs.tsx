import { useEffect, useState, type FunctionComponent } from "react";
import type { Club } from "../interfaces/clubs/Club";
import { getAllClubs } from "../services/clubsService";

interface ClubsProps {}

const Clubs: FunctionComponent<ClubsProps> = () => {
  const [clubs, setClubs] = useState<Club[]>([]);

  useEffect(() => {
    getAllClubs()
      .then((res) => setClubs(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      {clubs.map((club: Club) => (
        <ul key={club._id}>
          <li>{club.name}</li>
          <li>{club.description}</li>
        </ul>
      ))}
    </>
  );
};

export default Clubs;
