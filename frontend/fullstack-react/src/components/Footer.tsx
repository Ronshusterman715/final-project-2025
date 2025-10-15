import type { FunctionComponent } from "react";

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
  const userString = sessionStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>About Us</h5>
            <p>
              A comprehensive platform for discovering and connecting with local
              clubs. Find sports clubs, hobby groups, social clubs and more in
              your area.
            </p>
          </div>
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-light">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-light">
                  About
                </a>
              </li>
              {user && (
                <>
                  <li>
                    <a href="/favorites" className="text-light">
                      Fav Cards
                    </a>
                  </li>
                  <li>
                    <a href={`/users/${user._id}/edit`} className="text-light">
                      Account Details
                    </a>
                  </li>
                </>
              )}
              {user && user.isAdmin && (
                <>
                  <li>
                    <a href="/cards/create" className="text-light">
                      Create Card
                    </a>
                  </li>
                </>
              )}
              {!user && (
                <>
                  <li>
                    <a href="/login" className="text-light">
                      Login
                    </a>
                  </li>
                  <li>
                    <a href="/register" className="text-light">
                      Register
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li>
                <i className="fas fa-phone me-2"></i> 054-123-4567
              </li>
              <li>
                <i className="fas fa-envelope me-2"></i> support@clubs.com
              </li>
            </ul>
          </div>
        </div>
        <hr className="border-light" />
        <div className="row">
          <div className="col-md-6">
            <p>
              <img
                src="/images/club-finder-logo.png"
                alt="Club Finder Logo"
                style={{ width: "60px", marginBottom: "15px" }}
              />
              &copy; {new Date().getFullYear()} Club Finder. All rights
              reserved.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <a href="#" className="text-light me-3">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-light me-3">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-light me-3">
              <i className="fab fa-instagram"></i>
            </a>
            <li className="list-unstyled">
              <i className="fas fa-clock me-2"></i> Sun-Fri: 9:00 AM - 6:00 PM
            </li>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
