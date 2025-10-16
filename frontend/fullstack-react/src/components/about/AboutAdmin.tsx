import type { FunctionComponent } from "react";

interface AboutAdminProps {}

const AboutAdmin: FunctionComponent<AboutAdminProps> = () => {
  return (
    <section className="mb-4">
      <h2 className="h3 border-bottom pb-2 mb-3">Admin Panel Guide</h2>
      <p className="text-muted mb-4">
        Administrators have access to powerful tools for managing clubs and
        monitoring platform activity.
      </p>

      <div className="accordion" id="adminGuideAccordion">
        <div className="accordion-item border mb-3">
          <h2 className="accordion-header" id="headingAdminOne">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseAdminOne"
              aria-expanded="true"
              aria-controls="collapseAdminOne"
            >
              <i className="fas fa-shield-alt me-2"></i> Accessing Admin Panel
            </button>
          </h2>
          <div
            id="collapseAdminOne"
            className="accordion-collapse collapse show"
            aria-labelledby="headingAdminOne"
            data-bs-parent="#adminGuideAccordion"
          >
            <div className="accordion-body">
              <p className="mb-3">
                Admin accounts have special privileges for managing the
                platform's content.
              </p>
              <ol className="list-group list-group-numbered">
                <li className="list-group-item d-flex justify-content-between align-items-start bg-transparent">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Login as Admin</div>
                    Log in using your administrator credentials. The navigation
                    menu will display admin-only options like "Create Club" and
                    "Favorites Management".
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start bg-transparent">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Admin Navigation</div>
                    Once logged in as admin, you'll see: Profile Image, App
                    Name, About, Create Club, Favorites Management, Logout, and
                    Search Bar.
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>

        <div className="accordion-item border mb-3">
          <h2 className="accordion-header" id="headingAdminTwo">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseAdminTwo"
              aria-expanded="false"
              aria-controls="collapseAdminTwo"
            >
              <i className="fas fa-users-cog me-2"></i> Managing Clubs
            </button>
          </h2>
          <div
            id="collapseAdminTwo"
            className="accordion-collapse collapse"
            aria-labelledby="headingAdminTwo"
            data-bs-parent="#adminGuideAccordion"
          >
            <div className="accordion-body">
              <p className="mb-3">
                Admins have full CRUD (Create, Read, Update, Delete) operations
                for clubs.
              </p>
              <ol className="list-group list-group-numbered">
                <li className="list-group-item d-flex justify-content-between align-items-start bg-transparent">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Create New Clubs</div>
                    Click "Create Club" in the navigation menu. Fill in all
                    required information including name, description, type, age
                    requirement, contact details, location, and opening hours.
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start bg-transparent">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Edit Club Information</div>
                    On any club card or detail page, click the "Edit" button
                    (visible only to admins) to update club details and keep
                    information current.
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start bg-transparent">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Delete Clubs</div>
                    On any club card or detail page, click the "Delete" button
                    (visible only to admins) to remove clubs that are no longer
                    active.
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start bg-transparent">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">View All Clubs</div>
                    Access the complete list of clubs on the main page with both
                    card and table view options, including all club statistics.
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>

        <div className="accordion-item border">
          <h2 className="accordion-header" id="headingAdminThree">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseAdminThree"
              aria-expanded="false"
              aria-controls="collapseAdminThree"
            >
              <i className="fas fa-chart-line me-2"></i> Favorites Monitoring
            </button>
          </h2>
          <div
            id="collapseAdminThree"
            className="accordion-collapse collapse"
            aria-labelledby="headingAdminThree"
            data-bs-parent="#adminGuideAccordion"
          >
            <div className="accordion-body">
              <p className="mb-3">
                Track which clubs are most popular with users through the
                Favorites Management page.
              </p>
              <ol className="list-group list-group-numbered">
                <li className="list-group-item d-flex justify-content-between align-items-start bg-transparent">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Access Favorites Management</div>
                    Click "Favorites Management" in the admin navigation menu to
                    view all clubs with their favorite counts.
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start bg-transparent">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Track Popular Clubs</div>
                    See which clubs are most favorited by users to understand
                    platform trends and user preferences.
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start bg-transparent">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Monitor Engagement</div>
                    Use favorite counts to identify popular clubs and understand
                    what types of clubs users are most interested in.
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="alert alert-warning border-warning mt-4">
        <div className="d-flex align-items-center">
          <i className="fas fa-exclamation-triangle text-warning fa-2x me-3"></i>
          <div>
            <strong>Important:</strong> Admin privileges come with
            responsibility. Always ensure data accuracy when managing clubs.
            Users rely on up-to-date and correct information.
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutAdmin;
