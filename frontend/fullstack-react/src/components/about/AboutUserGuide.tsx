import type { FunctionComponent } from "react";

interface AboutUserGuideProps {}

const AboutUserGuide: FunctionComponent<AboutUserGuideProps> = () => {
  return (
    <section className="mb-4">
      <h2 className="h3 border-bottom pb-2 mb-3">How to Use Club Manager</h2>

      <div className="accordion" id="userGuideAccordion">
        <div className="accordion-item border mb-3">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              <i className="fas fa-user-plus me-2"></i> Getting Started
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#userGuideAccordion"
          >
            <div className="accordion-body">
              <ol className="list-group list-group-numbered">
                <li className="list-group-item d-flex justify-content-between align-items-start bg-transparent">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Register</div>
                    Click "Register" in the navigation menu and fill in the
                    required details. Make sure to enter a strong password
                    containing uppercase and lowercase letters, at least 4
                    numbers, and a special character.
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start bg-transparent">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Login</div>
                    Existing users can click "Login" and enter their email
                    address and password to access their account.
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>

        <div className="accordion-item border mb-3">
          <h2 className="accordion-header" id="headingTwo">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              <i className="fas fa-search me-2"></i> Browsing Clubs
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#userGuideAccordion"
          >
            <div className="accordion-body">
              <ol className="list-group list-group-numbered">
                <li className="list-group-item d-flex justify-content-between align-items-start bg-transparent">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Home Page</div>
                    View the most popular and newest clubs on the homepage
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start bg-transparent">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Clubs Page</div>
                    Click "Clubs" in the menu to see all available clubs
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start bg-transparent">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Search</div>
                    Use the search bar at the top to find specific clubs by name
                    or keywords
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>

        <div className="accordion-item border mb-3">
          <h2 className="accordion-header" id="headingThree">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              <i className="fas fa-heart me-2"></i> Managing Favorites
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="headingThree"
            data-bs-parent="#userGuideAccordion"
          >
            <div className="accordion-body">
              <ol className="list-group list-group-numbered">
                <li className="list-group-item d-flex justify-content-between align-items-start bg-transparent">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Add to Favorites</div>
                    Click the heart icon on any club card to add it to your
                    favorites
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start bg-transparent">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">View Favorites</div>
                    Access all your favorite clubs through the "Fav Clubs" link
                    in the navigation menu
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start bg-transparent">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Remove from Favorites</div>
                    Click the heart icon again to remove a club from your
                    favorites
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>

        <div className="accordion-item border">
          <h2 className="accordion-header" id="headingFour">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFour"
              aria-expanded="false"
              aria-controls="collapseFour"
            >
              <i className="fas fa-user-edit me-2"></i> Account Management
            </button>
          </h2>
          <div
            id="collapseFour"
            className="accordion-collapse collapse"
            aria-labelledby="headingFour"
            data-bs-parent="#userGuideAccordion"
          >
            <div className="accordion-body">
              <ol className="list-group list-group-numbered">
                <li className="list-group-item d-flex justify-content-between align-items-start bg-transparent">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Edit Profile</div>
                    Click on your username in the navigation menu to edit your
                    personal details
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start bg-transparent">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Change Password</div>
                    Update your password through the account settings page
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start bg-transparent">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Logout</div>
                    Click the logout button to securely end your session
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUserGuide;
