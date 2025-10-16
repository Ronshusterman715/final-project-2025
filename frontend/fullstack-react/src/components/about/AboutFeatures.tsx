import type { FunctionComponent } from "react";

interface AboutFeaturesProps {}

const AboutFeatures: FunctionComponent<AboutFeaturesProps> = () => {
  return (
    <section className="mb-4">
      <h2 className="h3 border-bottom pb-2 mb-3">Key Features</h2>

      <div className="row g-4">
        <div className="col-md-6 col-lg-3">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body text-center">
              <i className="fas fa-users text-primary fa-2x mb-3"></i>
              <h4 className="h5 card-title">User Management</h4>
              <p className="card-text">
                Secure registration and login with JWT authentication and
                "Remember Me" functionality for persistent sessions.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body text-center">
              <i className="fas fa-search text-info fa-2x mb-3"></i>
              <h4 className="h5 card-title">Search & Filter</h4>
              <p className="card-text">
                Search clubs by name and apply filters by type, location
                (country/city), and age requirements.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body text-center">
              <i className="fas fa-heart text-danger fa-2x mb-3"></i>
              <h4 className="h5 card-title">Personal Favorites</h4>
              <p className="card-text">
                Save your favorite clubs with persistent storage across devices
                for quick access anytime, anywhere.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body text-center">
              <i className="fas fa-cog text-success fa-2x mb-3"></i>
              <h4 className="h5 card-title">Admin Panel</h4>
              <p className="card-text">
                Complete CRUD operations for administrators with user management
                and favorites monitoring capabilities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutFeatures;
