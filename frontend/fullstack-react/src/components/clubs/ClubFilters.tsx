import { useState, type FunctionComponent } from "react";

interface ClubFiltersProps {
  onClose: () => void;
  availableTypes: string[];
  availableCountries: string[];
  availableCities: string[];
  availableAges: string[];
  onFilterChange: (filters: {
    type: string;
    country: string;
    city: string;
    ageRequirement: string;
  }) => void;
}

const ClubFilters: FunctionComponent<ClubFiltersProps> = ({
  onClose,
  availableTypes,
  availableCountries,
  availableCities,
  availableAges,
  onFilterChange,
}) => {
  const [type, setType] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [ageRequirement, setAgeRequirement] = useState("");

  const handleApplyFilters = () => {
    onFilterChange({ type, country, city, ageRequirement });
  };

  const handleResetFilters = () => {
    setType("");
    setCountry("");
    setCity("");
    setAgeRequirement("");

    onFilterChange({ type: "", country: "", city: "", ageRequirement: "" });
  };

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title mb-0">
            <i className="fas fa-filter me-2"></i>Filter Clubs
          </h5>
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={onClose}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="row g-3">
          {/* Type Filter */}
          <div className="col-md-4">
            <label htmlFor="typeFilter" className="form-label">
              Type
            </label>
            <select
              id="typeFilter"
              className="form-select"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">All Types</option>
              {availableTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* country Filter */}
          <div className="col-md-4">
            <label htmlFor="countryFilter" className="form-label">
              Country
            </label>
            <select
              id="cityFilter"
              className="form-select"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">All Countries</option>
              {availableCountries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* City Filter */}
          <div className="col-md-4">
            <label htmlFor="cityFilter" className="form-label">
              City
            </label>
            <select
              id="cityFilter"
              className="form-select"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="">All Cities</option>
              {availableCities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Age Requirement Filter */}
          <div className="col-md-4">
            <label htmlFor="ageFilter" className="form-label">
              Age Requirement
            </label>
            <select
              id="ageFilter"
              className="form-select"
              value={ageRequirement}
              onChange={(e) => setAgeRequirement(e.target.value)}
            >
              <option value="">All Ages</option>
              {availableAges.map((age) => (
                <option key={age} value={age}>
                  {age}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="d-flex gap-2 mt-3">
          <button className="btn btn-primary" onClick={handleApplyFilters}>
            <i className="fas fa-check me-2"></i>Apply Filters
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={handleResetFilters}
          >
            <i className="fas fa-undo me-2"></i>Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClubFilters;
