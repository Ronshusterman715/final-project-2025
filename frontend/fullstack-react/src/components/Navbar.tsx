import type { FunctionComponent } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";

interface NavbarProps {
  logoutEvent: () => void;
}

const Navbar: FunctionComponent<NavbarProps> = ({ logoutEvent }) => {
  const userString = sessionStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const logout = () => {
    logoutEvent();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.trim()) {
      navigate(`/?search=${value}`);
    } else {
      navigate("/");
    }
  };
  return (
    <>
      <nav
        className={`navbar navbar-expand-lg`}
        style={{
          backgroundColor: "#1976d2",
          color: "white",
          padding: "0.5rem 1rem",
        }}
      >
        <div className="container-fluid">
          {/* Brand */}
          <NavLink className="navbar-brand" to="/">
            Club
          </NavLink>

          {/* Hamburger toggle (for mobile) */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapsible Content */}
          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? " active" : "")
                  }
                >
                  ABOUT
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/clubs"
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? " active" : "")
                  }
                >
                  Clubs
                </NavLink>
              </li>
              {user ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      to="/favorites"
                      className={({ isActive }) =>
                        "nav-link" + (isActive ? " active" : "")
                      }
                    >
                      Fav Clubs
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to={`/users/${user._id}/edit`}
                      className={({ isActive }) =>
                        "nav-link" + (isActive ? " active" : "")
                      }
                    >
                      Account Details
                    </NavLink>
                  </li>
                  {user.isAdmin && (
                    <>
                      <li className="nav-item">
                        <NavLink
                          to="/clubs/create"
                          className={({ isActive }) =>
                            "nav-link" + (isActive ? " active" : "")
                          }
                        >
                          Create Club
                        </NavLink>
                      </li>
                    </>
                  )}
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink
                      to="/register"
                      className={({ isActive }) =>
                        "nav-link" + (isActive ? " active" : "")
                      }
                    >
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/login"
                      className={({ isActive }) =>
                        "nav-link" + (isActive ? " active" : "")
                      }
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              )}
            </ul>

            {/* Search Form */}

            <div className="d-flex me-2">
              <div className="input-group" style={{ width: "180px" }}>
                <input
                  className="form-control form-control-sm"
                  type="search"
                  placeholder="Search..."
                  aria-label="Search"
                  value={searchParams.get("search") || ""}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            {/* <button
              className={`btn ${
                context.theme === "dark" ? "btn-light" : "btn-outline-light"
              } me-2`}
              onClick={context.toggleTheme}
              title={`Switch to ${
                context.theme === "dark" ? "light" : "dark"
              } mode`}
            >
              <i
                className={`fas fa-${
                  context.theme === "dark" ? "sun" : "moon"
                }`}
              ></i>
            </button> */}

            {/* User Avatar */}
            {user && (
              <div className="d-flex align-items-center">
                <div className="me-2">
                  <img
                    src="/images/profile-image.png"
                    alt="User Avatar"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                    }}
                  />
                </div>
                <NavLink
                  className="btn btn-outline-danger btn-sm"
                  onClick={logout}
                  title="Logout"
                  to="/login"
                >
                  <i className="fas fa-sign-out-alt"></i>
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
