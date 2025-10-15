import { useEffect, useState, type FunctionComponent } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import type { Club } from "../interfaces/clubs/Club";
import { getClubById } from "../services/clubsService";
import { buildCompleteUrl } from "../utils/imageUrlResolver";

interface ClubDetailsProps {}

const ClubDetails: FunctionComponent<ClubDetailsProps> = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [club, setClub] = useState<Club | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadClub = async () => {
      if (id && location.state) {
        setClub(location.state);
        setIsLoading(false);
      } else if (id) {
        try {
          const res = await getClubById(id);
          setClub(res.data);
          setIsLoading(false);
        } catch (err) {
          console.log(err);
          setIsLoading(false);
        }
      } else {
        navigate("/");
      }
    };
    loadClub();
  }, [id, location.state, navigate]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!club) {
    return <div className="alert alert-danger">Club not found</div>;
  }

  return (
    <div className="container my-5">
      <div className="row g-4">
        <div className="col-lg-5">
          <div
            className="rounded shadow overflow-hidden"
            style={{
              height: "400px",
              width: "100%",
              position: "relative",
            }}
          >
            <img
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
        </div>

        <div className="col-lg-7">
          <h1 className="display-4 mb-2">{club.name}</h1>
          <h4 className="text-muted mb-4">{club.type}</h4>
          <div className="mb-4">
            <h5 className="fw-bold">Description</h5>
            <p className="text-secondary">{club.description}</p>
          </div>

          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title mb-3">
                    <i className="fas fa-address-card text-primary me-2"></i>
                    Contact Information
                  </h5>
                  <p className="mb-2">
                    <i className="fas fa-phone text-primary me-2"></i>
                    {club.phone}
                  </p>
                  <p className="mb-0">
                    <i className="fas fa-envelope text-primary me-2"></i>
                    <span className="text-break">{club.email}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title mb-3">
                    <i className="fas fa-map-marker-alt text-primary me-2"></i>
                    Address
                  </h5>
                  <p className="mb-0">
                    {club.address.street} {club.address.houseNumber}
                    <br />
                    {club.address.city}, {club.address.country}
                    {club.address.floor && (
                      <>
                        <br />
                        Floor {club.address.floor}
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <h5 className="card-title mb-3">
                <i className="fas fa-info-circle text-primary me-2"></i>
                Club Information
              </h5>
              <div className="row">
                <div className="col-12 mb-2">
                  <i className="fas fa-users text-primary me-2"></i>
                  <strong>Age Requirement:</strong> {club.ageRequirement}
                </div>
                <div className="col-12 mb-2">
                  <i className="fas fa-calendar text-primary me-2"></i>
                  <strong>Open Days:</strong>
                  <br />
                  <span className="ms-4">{club.openDays}</span>
                </div>
                <div className="col-12">
                  <i className="fas fa-clock text-primary me-2"></i>
                  <strong>Hours:</strong> {club.openHours}
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex flex-wrap gap-2">
            <button
              className="btn btn-primary"
              onClick={() => window.open(`tel:${club.phone}`)}
            >
              <i className="fas fa-phone me-2"></i>Call
            </button>
            <button
              className="btn btn-primary"
              onClick={() => window.open(`mailto:${club.email}`)}
            >
              <i className="fas fa-envelope me-2"></i>Email
            </button>
            <button
              className="btn btn-outline-secondary"
              onClick={() => navigate(-1)}
            >
              <i className="fas fa-arrow-left me-2"></i>Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubDetails;
