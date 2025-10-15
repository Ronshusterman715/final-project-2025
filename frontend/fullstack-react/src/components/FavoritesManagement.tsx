import { useMemo, type FunctionComponent } from "react";
import type { Club } from "../interfaces/clubs/Club";
import { useNavigate } from "react-router-dom";
import { errorMessage } from "../utils/ui/alert";
import { useClubActions } from "../hooks/useClubActions";
import ClubCard from "./clubs/ClubCard";

interface FavoritesManagementProps {
  clubs: Club[];
  isClubsLoading: boolean;
  onRemoveFromView: (clubId: string) => void;
  onLikeToggle: (clubId: string, isLiked: boolean) => void;
  ranking?: number;
}

const FavoritesManagement: FunctionComponent<FavoritesManagementProps> = ({
  clubs,
  isClubsLoading,
  onRemoveFromView,
  onLikeToggle,
  ranking,
}) => {
  const navigate = useNavigate();
  const userString = sessionStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  if (!user || !user.isAdmin) {
    errorMessage("Access Denied. You are not an admin.");
    navigate("/");
  }

  const {
    handleClubClick,
    handleClubDelete,
    handleClubEditClick,
    handleLikeUnlikeClick,
  } = useClubActions({
    onRemoveFromView,
    onLikeToggle,
  });

  const sortedClubsByFavorites = useMemo(() => {
    return [...clubs].sort(
      (a, b) => (b.likes?.length || 0) - (a.likes?.length || 0)
    );
  }, [clubs]);

  if (isClubsLoading) {
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
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">
          <i className="fas fa-heart text-danger me-3"></i>
          Favorites Management
        </h1>
        <p className="lead text-muted">
          All clubs sorted by popularity (number of favorites)
        </p>
        <p className="text-muted">
          Total Clubs: <strong>{clubs.length}</strong>
        </p>
      </div>

      {sortedClubsByFavorites.length === 0 ? (
        <div className="text-center py-5">
          <i className="fas fa-inbox fa-3x text-muted mb-3"></i>
          <p className="lead text-muted">No clubs available yet.</p>
        </div>
      ) : (
        <div className="row d-flex justify-content-center">
          {sortedClubsByFavorites.map((club, index) => (
            <ClubCard
              key={club._id}
              club={club}
              ranking={index + 1}
              onClubClick={handleClubClick}
              onClubDelete={handleClubDelete}
              onClubEditClick={handleClubEditClick}
              onLikeUnlikeClick={handleLikeUnlikeClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesManagement;
