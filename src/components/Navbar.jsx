import { Link, NavLink, useNavigate } from "react-router-dom";
import { getUserFromToken } from "../utils/auth";
import "../styles/navbar/Navbar.css";

function Navbar({ isAuthenticated, onLogout }) {
  const user = getUserFromToken();
  const navigate = useNavigate();
  const isAdmin = user?.roles?.includes("ADMIN") === true;
  const isStudent = user?.roles?.includes("STUDENT") === true;

  console.log("User role in Navbar:", user);

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-navbar px-4">

      <Link className="navbar-brand fw-bold text-primary" to="/">
        CampusFeedbacks
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto align-items-center">

          {!isAuthenticated && (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/" end>Dashboard</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">About</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/features">Features</NavLink>
              </li>
            </>
          )}

          {isAuthenticated && isAdmin && (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/institution/dashboard">Dashboard</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/institution/courses">Courses</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/institution/instructors">Instructors</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/institution/manage">Manage Institution</NavLink>
              </li>
            </>
          )}

          {/* Student */}
          {isAuthenticated && isStudent && (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/student/dashboard">Dashboard</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/student/courses">Courses</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/student/instructors">Instructors</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/student/feedback">Feedback</NavLink>
              </li>
            </>
          )}

          {/* Auth buttons */}
          <li className="nav-item ms-2">
            {!isAuthenticated ? (
              <div className="d-flex gap-2">
                <Link className="btn btn-outline-primary btn-sm px-3" to="/login">Login</Link>
                <Link className="btn btn-primary btn-sm px-3" to="/register">Register</Link>
              </div>
            ) : (
              <button className="btn btn-outline-danger btn-sm px-3" onClick={handleLogout}>
                Logout
              </button>
            )}
          </li>

        </ul>
      </div>
    </nav>
  );
}

export default Navbar;