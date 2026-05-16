// InstitutionRegister.jsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerInstitution } from "../../../services/AuthService";
import "../../../styles/institution/InstitutionRegister.css";

function InstitutionRegister() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    institutionName: "",
    institutionCode: "",
    institutionEmail: "",
    address: "",
    adminName: "",
    adminEmail: "",
    password: "",
    identityNo: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    try {

      setLoading(true);

      await registerInstitution(
        formData.institutionName,
        formData.institutionCode,
        formData.institutionEmail,
        formData.address,
        formData.adminName,
        formData.adminEmail,
        formData.password,
        formData.identityNo
      );

      alert("Institution created successfully");

      navigate("/login");

    } catch (err) {

      console.log(err);

      setError(
        err?.response?.data?.message ||
        "Failed to create institution"
      );

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="institution-register-page">

      {/* HERO */}
      <section className="register-hero">
        <div className="container">

          <div className="register-wrapper">

            {/* LEFT */}
            <div className="register-info">

              <h1>Create Your Institution</h1>

              <p>
                Setup your institution, create your admin account,
                and start collecting student feedback securely.
              </p>

              <div className="register-points">

                <div className="point-card">
                  <span>🏫</span>
                  <div>
                    <h6>Institution Management</h6>
                    <p>Create courses and manage instructors.</p>
                  </div>
                </div>

                <div className="point-card">
                  <span>📊</span>
                  <div>
                    <h6>Analytics Dashboard</h6>
                    <p>Track feedback trends and teaching quality.</p>
                  </div>
                </div>

                <div className="point-card">
                  <span>🔐</span>
                  <div>
                    <h6>Secure Access</h6>
                    <p>JWT authentication with role-based access.</p>
                  </div>
                </div>

              </div>

            </div>

            {/* RIGHT */}
            <div className="register-form-container">

              <form onSubmit={handleSubmit} className="register-form">

                <h3>Create Institution</h3>

                {error && (
                  <div className="error-box">
                    {error}
                  </div>
                )}

                <div className="form-group">
                  <label>Institution Name</label>

                  <input
                    type="text"
                    name="institutionName"
                    placeholder="Enter institution name"
                    value={formData.institutionName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Institution Code</label>

                  <input
                    type="text"
                    name="institutionCode"
                    placeholder="Ex: CIT2026"
                    value={formData.institutionCode}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Institution Email</label>

                  <input
                    type="email"
                    name="institutionEmail"
                    placeholder="institution@email.com"
                    value={formData.institutionEmail}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Address</label>

                  <textarea
                    name="address"
                    rows="3"
                    placeholder="Institution address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                <hr />

                <div className="form-group">
                  <label>Admin Name</label>

                  <input
                    type="text"
                    name="adminName"
                    placeholder="Enter admin name"
                    value={formData.adminName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Admin Email</label>

                  <input
                    type="email"
                    name="adminEmail"
                    placeholder="admin@email.com"
                    value={formData.adminEmail}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Identity Number</label>

                  <input
                    type="text"
                    name="identityNo"
                    placeholder="Enter admin identity number"
                    value={formData.identityNo}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Password</label>

                  <input
                    type="password"
                    name="password"
                    placeholder="Create password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="register-btn"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Institution"}
                </button>

                <p className="login-link">
                  Already have an account?
                  <Link to="/login"> Login</Link>
                </p>

              </form>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}

export default InstitutionRegister;