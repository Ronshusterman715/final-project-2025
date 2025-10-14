import type { FunctionComponent } from "react";
import type { Club } from "../../interfaces/clubs/Club";
import { buildCompleteUrl } from "../../utils/imageUrlResolver";

interface ClubTableProps {
  clubs: Club[];
  onClubClick: (club: Club) => void;
  onClubDelete: (club: Club) => void;
  onClubEditClick: (club: Club) => void;
  onLikeUnlikeClick: (club: Club) => void;
}

const ClubTable: FunctionComponent<ClubTableProps> = ({
  clubs,
  onClubClick,
  onClubDelete,
  onClubEditClick,
  onLikeUnlikeClick,
}) => {
  const userString = sessionStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Type</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Age</th>
            <th>Hours</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clubs.map((club) => {
            const isUserLiked = user && club.likes?.includes(user._id);

            return (
              <tr key={club._id}>
                <td>
                  <img
                    src={buildCompleteUrl(club.image.url)}
                    alt={club.image.alt}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </td>
                <td>
                  <strong>{club.name}</strong>
                </td>
                <td>{club.type}</td>
                <td>
                  <a
                    href={`tel:${club.phone}`}
                    className="text-decoration-none"
                  >
                    {club.phone}
                  </a>
                </td>
                <td>{`${club.address.city} ${club.address.country}`}</td>
                <td>{club.ageRequirement}</td>
                <td>{club.openHours}</td>
                <td>
                  <div className="d-flex gap-1">
                    <button
                      onClick={() => onClubClick(club)}
                      className="btn btn-sm btn-outline-primary"
                      title="View Details"
                      style={{ cursor: "pointer" }}
                    >
                      <i className="fa-solid fa-circle-info"></i>
                    </button>

                    <a
                      href={`tel:${club.phone}`}
                      className="btn btn-sm btn-outline-success"
                    >
                      <i className="fa-solid fa-phone"></i>
                    </a>

                    <a
                      href={`mailto:${club.email}`}
                      className="btn btn-sm btn-outline-success"
                    >
                      <i className="fa-solid fa-envelope"></i>
                    </a>

                    {user && (
                      <button
                        onClick={() => onLikeUnlikeClick(club)}
                        className={`btn btn-sm ${
                          isUserLiked
                            ? "btn-outline-danger"
                            : "btn-outline-secondary"
                        }`}
                        title={isUserLiked ? "Unlike Club" : "Like Club"}
                        style={{ cursor: "pointer" }}
                      >
                        <i className="fa-solid fa-heart"></i>
                      </button>
                    )}

                    {user && user.isAdmin && (
                      <>
                        <button
                          onClick={() => onClubEditClick(club)}
                          className="btn btn-sm btn-outline-warning"
                          title="Edit Club"
                          style={{ cursor: "pointer" }}
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button
                          onClick={() => onClubDelete(club)}
                          className="btn btn-sm btn-outline-danger"
                          title="Delete Club"
                          style={{ cursor: "pointer" }}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ClubTable;
