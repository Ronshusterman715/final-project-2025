import { useEffect, useState, type FunctionComponent } from "react";
import type { Club } from "../interfaces/clubs/Club";
import { getAllClubs } from "../services/clubsService";
import ClubCard from "./clubs/ClubCard";
import { useSearchParams } from "react-router-dom";
import { errorMessage } from "../utils/ui/alert";

interface ClubsProps {}

const Clubs: FunctionComponent<ClubsProps> = () => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [filteredClubs, setFilteredClubs] = useState<Club[]>([]);
  const [isClubLoading, setIsClubLoading] = useState<boolean>(true);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    const loadAndFilterClubs = async () => {
      if (clubs.length === 0) {
        try {
          const res = await getAllClubs();
          if (searchQuery) {
            const filteredClubs = res.data.filter((club: Club) =>
              club.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setClubs(res.data);
            setFilteredClubs(filteredClubs);
          } else {
            setClubs(res.data);
            setFilteredClubs(res.data);
          }
          setIsClubLoading(false);
        } catch (error) {
          console.log("Error loading clubs:", error);
          errorMessage("failed to load clubs");
        }
      } else if (searchQuery) {
        const filteredClubs = clubs.filter((club: Club) =>
          club.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredClubs(filteredClubs);
      } else {
        setFilteredClubs(clubs);
      }
      setIsClubLoading(false);
    };
    loadAndFilterClubs();
  }, [searchQuery, clubs]);
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
            {filteredClubs.map((club) => (
              <ClubCard key={club._id} club={club} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Clubs;
