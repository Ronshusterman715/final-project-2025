import { useEffect, useState, type FunctionComponent } from "react";
import ClubCard from "./clubs/ClubCard";
import type { Club } from "../interfaces/clubs/Club";
import { getFavoriteClubs } from "../services/clubsService";
import { errorMessage } from "../utils/ui/alert";

interface FavoriteClubsProps {}

const FavoriteClubs: FunctionComponent<FavoriteClubsProps> = () => {
  const [favoriteClubs, setFavoriteClubs] = useState<Club[]>([]);
  const [isClubLoading, setIsClubLoading] = useState<boolean>(true);

  useEffect(() => {
    getFavoriteClubs()
      .then((res) => {
        setFavoriteClubs(res.data);
        setIsClubLoading(false);
      })
      .catch((err) => {
        console.log(err);
        errorMessage("failed to load favorite clubs");
        setIsClubLoading(false);
      });
  }, []);

  const onRemoveFromView = (cardId: string) => {
    setFavoriteClubs(favoriteClubs.filter((club) => club._id !== cardId));
  };

  //TODO make the loading function/logic the same everywhere.
  if (isClubLoading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h1 className="display-4 mb-4 text-center">My Favorite Clubs</h1>
      <div className="row d-flex justify-content-center">
        {favoriteClubs.map((club: Club) => (
          <ClubCard
            key={club._id}
            club={club}
            onRemoveFromView={onRemoveFromView}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoriteClubs;
