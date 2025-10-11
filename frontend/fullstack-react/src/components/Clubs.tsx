import { useEffect, useState, type FunctionComponent } from "react";
import type { Club } from "../interfaces/clubs/Club";
import ClubCard from "./clubs/ClubCard";
import { useSearchParams } from "react-router-dom";
import { errorMessage } from "../utils/ui/alert";
import ClubFilters from "./clubs/ClubFilters";

interface ClubsProps {
  clubs: Club[];
  isClubsLoading: boolean;
  onRemoveFromView: (clubId: string) => void;
  onLikeToggle: (clubId: string, isLiked: boolean) => void;
}

const Clubs: FunctionComponent<ClubsProps> = ({
  clubs,
  onRemoveFromView,
  isClubsLoading,
  onLikeToggle,
}) => {
  const [filteredClubs, setFilteredClubs] = useState<Club[]>([]);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const [showFilters, setShowFilters] = useState<boolean>(false);
  const uniqueTypes = [...new Set(clubs.map((club) => club.type))];
  const uniqueCountries = [
    ...new Set(clubs.map((club) => club.address.country)),
  ];
  const uniqueCities = [...new Set(clubs.map((club) => club.address.city))];
  const uniqueAgeRequirements = [
    ...new Set(clubs.map((club) => club.ageRequirement)),
  ];

  useEffect(() => {
    try {
      if (searchQuery) {
        const filteredClubs = clubs.filter((club: Club) =>
          club.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredClubs(filteredClubs);
      } else {
        setFilteredClubs(clubs);
      }
    } catch (error) {
      console.log("Error loading clubs:", error);
      errorMessage("failed to load clubs");
    }
  }, [searchQuery, clubs]);

  const handleFilterChange = (filters: {
    type: string;
    country: string;
    city: string;
    ageRequirement: string;
  }) => {
    let result = [...clubs];

    if (searchQuery) {
      result = result.filter((club) =>
        club.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.type) {
      result = result.filter(
        (club) => club.type.toLowerCase() === filters.type.toLowerCase()
      );
    }

    if (filters.country) {
      result = result.filter(
        (club) =>
          club.address.country.toLowerCase() === filters.country.toLowerCase()
      );
    }

    if (filters.city) {
      result = result.filter(
        (club) => club.address.city.toLowerCase() === filters.city.toLowerCase()
      );
    }

    if (filters.ageRequirement) {
      result = result.filter(
        (club) => club.ageRequirement === filters.ageRequirement
      );
    }
    setFilteredClubs(result);
  };
  return (
    <>
      {showFilters && (
        <ClubFilters
          onClose={() => setShowFilters(false)}
          availableTypes={uniqueTypes}
          availableCountries={uniqueCountries}
          availableCities={uniqueCities}
          availableAges={uniqueAgeRequirements}
          onFilterChange={handleFilterChange}
        />
      )}
      {isClubsLoading ? (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="container my-3">
          <div className="d-flex justify-content-center align-items-center mb-4 position-relative">
            <h1 className="mb-0">Clubs</h1>
            <button
              className="btn btn-outline-primary position-absolute end-0"
              onClick={() => setShowFilters(!showFilters)}
            >
              <i className="fas fa-filter me-2"></i>
              Filters
            </button>
          </div>
          <div className="row d-flex justify-content-center">
            {filteredClubs.map((club) => (
              <ClubCard
                key={club._id}
                club={club}
                onRemoveFromView={onRemoveFromView}
                onLikeToggle={onLikeToggle}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Clubs;
