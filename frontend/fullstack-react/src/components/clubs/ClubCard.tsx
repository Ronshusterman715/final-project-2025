import { useState, type FunctionComponent } from "react";
import type { Club } from "../../interfaces/clubs/Club";
import { buildCompleteUrl } from "../../utils/imageUrlResolver";
import { errorMessage, successMessage } from "../../utils/ui/alert";
import { deleteClub, likeUnlikeClub } from "../../services/clubsService";
import { useNavigate } from "react-router-dom";

interface ClubCardProps {
  club: Club;
  onRemoveFromView: (cardId: string) => void;
}

const ClubCard: FunctionComponent<ClubCardProps> = ({
  club,
  onRemoveFromView,
}) => {
  const navigate = useNavigate();
  const userString = sessionStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const [isUserLiked, setIsUserLiked] = useState<boolean>(
    user && club.likes?.includes(user._id || false)
  );

  const handleClubClick = () => {
    navigate(`/ClubDetails/${club._id}`, { state: club });
  };
  const handleClubDelete = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this club?"
    );

    if (!isConfirmed) return;

    try {
      const deleteClubResponse = await deleteClub(club._id!);
      onRemoveFromView(club._id!);
      successMessage(`${deleteClubResponse.data.name} deleted successfully`);
    } catch (error: any) {
      if (error.response.data) {
        errorMessage(`Failed to delete club: ${error.response.data}`);
      } else {
        errorMessage("Failed to delete club");
      }
    }
  };

  const handleClubEditClick = () => {
    navigate(`/clubs/${club._id}/edit`, { state: club });
  };

  const handleLikeUnlikeClick = async () => {
    try {
      const wasLiked = isUserLiked;
      await likeUnlikeClub(club._id!);
      setIsUserLiked(!isUserLiked);

      if (wasLiked) {
        onRemoveFromView(club._id!);
      }
    } catch (error: any) {
      if (error.response.data) {
        errorMessage(`Failed to like/unlike club: ${error.response.data}`);
      } else {
        errorMessage("Failed to like/unlike club");
      }
    }
  };
  return (
    <div
      className="card m-3 shadow-sm club-card"
      style={{ width: "18rem", height: "100%" }}
    >
      <div onClick={handleClubClick} style={{ cursor: "pointer" }}>
        <div
          className="card-image-container"
          style={{ height: "180px", overflow: "hidden" }}
        >
          <img
            className="card-img-top"
            src={buildCompleteUrl(club.image.url)}
            alt={club.image.alt}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </div>

        <div className="card-body">
          <h5 className="card-title text-truncate">{club.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted text-truncate">
            {club.type}
          </h6>
          <p className="card-text text-truncate">{club.description}</p>
        </div>

        <ul className="list-group list-group-flush">
          <li className="list-group-item px-3 py-2">
            <div className="d-flex mb-1">
              <span className="me-2">
                <i className="fa-solid fa-phone fa-sm text-primary"></i>
              </span>
              <span className="text-truncate">{club.phone}</span>
            </div>
            <div className="d-flex mb-1">
              <span className="me-2">
                <i className="fa-solid fa-location-dot fa-sm text-primary"></i>
              </span>
              <span
                className="text-truncate"
                title={`${club.address.street} ${club.address.houseNumber}, ${club.address.city}, ${club.address.country}`}
              >
                {`${club.address.street} ${club.address.houseNumber}, ${club.address.city}`}
              </span>
            </div>
            <div className="d-flex mb-1">
              <span className="me-2">
                <i className="fa-solid fa-calendar fa-sm text-primary"></i>
              </span>
              <span className="text-truncate small" title={club.openDays}>
                {club.openDays}
              </span>
            </div>
            <div className="d-flex mb-1">
              <span className="me-2">
                <i className="fa-solid fa-clock fa-sm text-primary"></i>
              </span>
              <span className="text-truncate">{club.openHours}</span>
            </div>
            <div className="d-flex">
              <span className="me-2">
                <i className="fa-solid fa-users fa-sm text-primary"></i>
              </span>
              <span className="text-truncate">Age: {club.ageRequirement}</span>
            </div>
          </li>
        </ul>
      </div>
      <div className="card-footer bg-white d-flex justify-content-around py-2 mt-auto">
        <a
          href={`tel:${club.phone}`}
          className="btn btn-sm btn-outline-success"
        >
          <i className="fa-solid fa-phone"></i>
        </a>
        <a
          href={`mailto:${club.email}`}
          className="btn btn-sm btn-outline-info"
        >
          <i className="fa-solid fa-envelope"></i>
        </a>

        {user && isUserLiked && (
          <a
            onClick={handleLikeUnlikeClick}
            className="btn btn-sm btn-outline-danger"
            title="Unlike Club"
            style={{ cursor: "pointer" }}
          >
            <i className="fa-solid fa-heart"></i>
          </a>
        )}

        {user && !isUserLiked && (
          <a
            onClick={handleLikeUnlikeClick}
            className="btn btn-sm btn-outline-secondary"
            title="Like Club"
            style={{ cursor: "pointer" }}
          >
            <i className="fa-solid fa-heart"></i>
          </a>
        )}

        {user && user.isAdmin && (
          <>
            <a
              onClick={handleClubEditClick}
              className="btn btn-sm btn-outline-warning"
              title="Edit Club"
              style={{ cursor: "pointer" }}
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </a>
            <a
              onClick={handleClubDelete}
              className="btn btn-sm btn-outline-danger"
              title="Delete Club"
              style={{ cursor: "pointer" }}
            >
              <i className="fa-solid fa-trash"></i>
            </a>
          </>
        )}
      </div>
    </div>
  );
};
export default ClubCard;
