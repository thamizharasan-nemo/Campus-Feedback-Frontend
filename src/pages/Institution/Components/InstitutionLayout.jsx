import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../../styles/institution/InstitutionLogin.css"


export function InstitutionLayout() {
  return (
    <div className="institution-layout">
      <Outlet />
    </div>
  );
}

export function InstitutionLanding() {
  const [identityId, setIdentityId] = useState("");

  const handleGoToInstitution = () => {
    if (!identityId.trim()) {
      alert("Please enter your Institution ID");
      return;
    }
    console.log("Entering institution with ID:", identityId);
  };

  return (
    <div className="institution-page">

      <section className="institution-hero">
        <div className="hero-grid">

          <div className="hero-image">
            <img src="./pic.jpg" alt="Institution Banner" />
          </div>

          <div className="hero-content">
            <h2>Access Your Institution</h2>

            <input
              type="text"
              placeholder="Enter Student / Instructor / Admin ID"
              value={identityId}
              onChange={(e) => setIdentityId(e.target.value)}
            />

            <button onClick={handleGoToInstitution}>
              Go to Institution
            </button>

            <p className="helper-text">
              Students, instructors, and admins access their institution using
              identity IDs.
            </p>
          </div>

        </div>
      </section>

      <section className="institution-how">
        <h3>How Institutions Work</h3>

        <div className="info-grid">
          <InfoCard
            title="Create Institution"
            text="Admins create an institution and become its primary managers."
          />
          <InfoCard
            title="Manage Courses & Instructors"
            text="Admins add courses, create instructors, and assign them."
          />
          <InfoCard
            title="Student & Instructor Access"
            text="Users join using assigned IDs linked to their institution."
          />
          <InfoCard
            title="Feedback & Analytics"
            text="Students submit feedback, admins and instructors view insights."
          />
        </div>
      </section>

      <section className="institution-cta">
        <h4>Are you an Admin?</h4>
        <p>Create and manage institutions with full control.</p>
        <Link to="/institution/register" className="outline-btn">
  Create New Institution
</Link>
      </section>

    </div>
  );
}

function InfoCard({ title, text }) {
  return (
    <div className="info-card">
      <h6>{title}</h6>
      <p>{text}</p>
    </div>
  );
}