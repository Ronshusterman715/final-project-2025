import { useMemo, type FunctionComponent } from "react";
import type { Club } from "../interfaces/clubs/Club";
import ClubCard from "./clubs/ClubCard";
import { useClubActions } from "../hooks/useClubActions";

interface MainPage {
  clubs: Club[];
  isClubsLoading: boolean;
  onRemoveFromView: (clubId: string) => void;
  onLikeToggle: (clubId: string, isLiked: boolean) => void;
}

const MainPage: FunctionComponent<MainPage> = ({
  clubs,
  isClubsLoading,
  onRemoveFromView,
  onLikeToggle,
}) => {
  const {
    handleClubClick,
    handleClubDelete,
    handleClubEditClick,
    handleLikeUnlikeClick,
  } = useClubActions({
    onRemoveFromView,
    onLikeToggle,
  });

  const topClubs = useMemo(() => {
    return [...clubs]
      .sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0))
      .slice(0, 3);
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
        <h1 className="display-3 fw-bold mb-3">Discover Your Perfect Club</h1>
        <h2 className="h4 text-muted mb-4">
          Connect with the best clubs in Israel - Find your community today
        </h2>
        <p className="lead mx-auto" style={{ maxWidth: "800px" }}>
          Welcome to Club Finder - your gateway to discovering amazing clubs
          across Israel. Whether you're looking for sports, arts, music, or
          social clubs, we help you connect with communities that match your
          interests. Browse our most popular clubs below and start your journey
          today!
        </p>
      </div>

      <div className="mt-5">
        <h3 className="text-center mb-4">
          <i className="fas fa-star text-warning me-2"></i>
          Most Popular Clubs
        </h3>

        {topClubs.length === 0 ? (
          <div className="text-center py-5">
            <i className="fas fa-search fa-3x text-muted mb-3"></i>
            <p className="lead text-muted">
              No clubs available yet. Be the first to create one!
            </p>
          </div>
        ) : (
          <>
            <div className="row d-flex justify-content-center">
              {topClubs.map((club) => (
                <ClubCard
                  key={club._id}
                  club={club}
                  onClubClick={handleClubClick}
                  onClubDelete={handleClubDelete}
                  onClubEditClick={handleClubEditClick}
                  onLikeUnlikeClick={handleLikeUnlikeClick}
                />
              ))}
            </div>

            {topClubs.length < 3 && (
              <div className="text-center mt-4">
                <p className="text-muted">
                  More clubs are being added. Check back soon!
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MainPage;
