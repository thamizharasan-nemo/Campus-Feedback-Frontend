import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserFromToken } from "../../../utils/auth";
import "../../../styles/institution/InstitutionLoginNew.css";

const HOW_CARDS = [
  {
    icon: "🏫",
    title: "Create Institution",
    text: "Admins create an institution and manage all members.",
  },
  {
    icon: "📚",
    title: "Manage Courses",
    text: "Add courses, assign teachers, and keep everything organised.",
  },
  {
    icon: "👨‍🎓",
    title: "Student Access",
    text: "Students enrol in courses and submit anonymous feedback.",
  },
  {
    icon: "📈",
    title: "View Analytics",
    text: "Admins and teachers track performance through real data.",
  },
];

function InstitutionLogin() {
  const navigate = useNavigate();
  const user = getUserFromToken();

  const [identityNo, setIdentityNo] = useState("");
  const [error, setError] = useState("");

  const isLoggedIn = !!user;

  const handleAccess = () => {
    if (!identityNo.trim()) {
      setError("Please enter your Identity No.");
      return;
    }
    setError("");
    navigate("/login", { state: { identityNo: identityNo.trim() } });
  };

  return (
    <div className="inst-login-page">
      <section className="inst-hero">
        <div className="inst-hero-inner">
          <div className="inst-hero-copy">
            <h1>
              Access Your
              <br />
              <span>Institution</span>
            </h1>
            <p>
              Students, teachers, and admins — enter your Identity No to reach
              your institution's workspace.
            </p>
            <div className="inst-mini-grid">
              <div className="inst-mini-card">
                <h5>JWT</h5>
                <p>Secure authentication with refresh tokens.</p>
              </div>

              <div className="inst-mini-card">
                <h5>Multi</h5>
                <p>Institution-based isolated architecture.</p>
              </div>

              <div className="inst-mini-card">
                <h5>Analytics</h5>
                <p>Track feedback and instructor performance.</p>
              </div>
            </div>
          </div>

          <div className="inst-access-card">
            {isLoggedIn ? (
              <>
                <p className="inst-logged-greeting">
                  You're signed in as <strong>{user.sub}</strong>.
                </p>
                <button
                  className="btn btn-primary inst-btn"
                  onClick={() => navigate("/institution/dashboard")}
                >
                  Go to Dashboard
                </button>
              </>
            ) : (
              <>
                <h2>Enter your Identity No</h2>
                <p className="inst-card-sub">
                  Your Identity No is assigned by your institution's admin.
                </p>

                {error && (
                  <div className="alert alert-danger inst-alert">{error}</div>
                )}

                <label className="inst-label" htmlFor="identityNo">
                  Identity No
                </label>
                <input
                  id="identityNo"
                  type="text"
                  className="form-control inst-input"
                  placeholder="e.g. 21CS001 or 2023admin01"
                  value={identityNo}
                  onChange={(e) => {
                    setIdentityNo(e.target.value);
                    setError("");
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleAccess()}
                />

                <button
                  className="btn btn-primary inst-btn"
                  onClick={handleAccess}
                >
                  Continue to Login
                </button>

                <div className="inst-divider">or</div>

                <Link
                  to="/login"
                  className="btn btn-outline-primary inst-btn-outline"
                >
                  Sign in with email
                </Link>

                <p className="inst-hint">
                  No account yet? <Link to="/register">Register here</Link>
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="inst-how">
        <div className="inst-how-inner">
          <h3>How It Works</h3>
          <p className="inst-how-sub">
            CampusFeedbacks helps institutions securely manage feedback,
            courses, instructors, and analytics in one centralized platform.
          </p>
          <div className="inst-how-grid">
            {HOW_CARDS.map((c) => (
              <div className="inst-how-card" key={c.title}>
                <div className="inst-how-icon">{c.icon}</div>
                <h6>{c.title}</h6>
                <p>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="inst-cta">
        <div className="inst-cta-inner">
          <h4>Are you an Admin?</h4>
          <p>
            Create and manage your institution with full control over users,
            courses, and feedback.
          </p>
          <Link
            to="/institution/register"
            className="btn btn-outline-light inst-cta-btn"
          >
            Create New Institution
          </Link>
        </div>
      </section>
    </div>
  );
}

export default InstitutionLogin;
