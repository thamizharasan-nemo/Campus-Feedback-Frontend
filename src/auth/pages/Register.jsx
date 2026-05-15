import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../services/AuthService"; 
import "../../styles/auth/Auth.css";

const INITIAL_FORM = {
  username: "",
  identityNo: "",
  email: "",
  password: "",
  role: "STUDENT",
  institutionId: "",
};

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(INITIAL_FORM);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ 
      ...prev, 
      [e.target.name]: e.target.value 
    }));
    setError("");
    setSuccess("");
  };

  
  const validate = () => {
    const { username, identityNo, email, password, institutionId } = formData;

    if (!username.trim() || !identityNo.trim() || !email.trim() || !password || !institutionId) {
      return "Please fill in all fields.";
    }
    if (username.trim().length < 3 || username.trim().length > 50) {
      return "Full name must be 3–50 characters.";
    }
    
    if (!/^(([123]\d[A-Za-z]{2}\d{2,3})|([0-9]{4}admin[0-9]{2,3}))$/.test(identityNo.trim())) {
      return "Identity No is invalid. Students: e.g. 21CS001  ·  Admins: e.g. 2023admin01";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return "Enter a valid email address.";
    }
    if (password.length < 6 || password.length > 20) {
      return "Password must be 6–20 characters.";
    }
    if (isNaN(Number(institutionId)) || Number(institutionId) <= 0) {
      return "Institution ID must be a valid number.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }

    setLoading(true);
    try {
      const { username, identityNo, role, email, password, institutionId } = formData;
      
      await register(
        username.trim(),
        identityNo.trim(),
        role,
        email.trim(),
        password,
        Number(institutionId)
      );
      setSuccess("Account created! Redirecting to login…");
      setTimeout(() => navigate("/login"), 2000);
    } 
    
    catch (err) {
      setError(
        typeof err === "string"
          ? err
          : err?.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-card-header">
          <span className="auth-brand">Campus Feedbacks</span>
          <h2>Create your account</h2>
          <p>Register under your institution to get started</p>
        </div>

        {error && <div className="alert alert-danger  auth-alert">{error}</div>}
        {success && <div className="alert alert-success auth-alert">{success}</div>}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>

          <div className="mb-3">
            <label className="form-label" htmlFor="institutionId">Institution ID</label>
            <input
              id="institutionId" name="institutionId" type="number"
              className="form-control" placeholder="e.g. 1"
              value={formData.institutionId} onChange={handleChange}
            />
            <div className="form-text">Ask your institution's admin for this number.</div>
          </div>

          <div className="field-divider">Personal Info</div>

          <div className="mb-3">
            <label className="form-label" htmlFor="username">Full name</label>
            <input
              id="username" name="username" type="text"
              className="form-control" placeholder="e.g. Your Name"
              value={formData.username} onChange={handleChange}
              autoComplete="name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="identityNo">Identity No</label>
            <input
              id="identityNo" name="identityNo" type="text"
              className="form-control" placeholder="e.g. 21CS001"
              value={formData.identityNo} onChange={handleChange}
            />
            <div className="form-text">
              Students: roll no (21CS001) &nbsp;·&nbsp; Admins: 2026admin01
            </div>
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label" htmlFor="email">Email address</label>
            <input
              id="email" name="email" type="email"
              className="form-control" placeholder="your_mail@mail.com"
              value={formData.email} onChange={handleChange}
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label" htmlFor="password">Password</label>
            <div className="password-wrap">
              <input
                id="password" name="password"
                type={showPassword ? "text" : "password"}
                className="form-control" placeholder="Min. 6 characters"
                value={formData.password} onChange={handleChange}
                autoComplete="new-password"
              />
              <button
                type="button" className="toggle-pwd"
                onClick={() => setShowPassword((show) => !show)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label" htmlFor="role">Role</label>
            <select id="role" name="role" className="form-select" value={formData.role} onChange={handleChange}>
              <option value="STUDENT">Student</option>
              <option value="TEACHER">Teacher</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
            {loading
              ? <><span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />Registering…</>
              : "Create account"
            }
          </button>
        </form>

        <div className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>

      </div>
    </div>
  );
}

export default Register;