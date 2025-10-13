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
                Secure registration and login with authentication and user
                privacy protection.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body text-center">
              <i className="fas fa-search text-info fa-2x mb-3"></i>
              <h4 className="h5 card-title">Advanced Search</h4>
              <p className="card-text">
                Smart search engine to find clubs by name, category, and various
                attributes.
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
                Save your favorite clubs for quick and easy access anytime,
                anywhere.
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
                Advanced management tools for administrators to add, edit, and
                delete content.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutFeatures;
