import { Link } from "react-router-dom";
import "../../styles/public/Features.css";

const features = [
  {
    icon: "🎯",
    title: "Anonymous Feedback",
    text: "Students can safely submit honest feedback without fear of identification.",
  },
  {
    icon: "🏫",
    title: "Multi-Institution Support",
    text: "Each institution operates inside its own isolated and secure environment.",
  },
  {
    icon: "📊",
    title: "Analytics Dashboard",
    text: "Track ratings, instructor performance, and course feedback trends.",
  },
  {
    icon: "🔐",
    title: "JWT Authentication",
    text: "Secure authentication using access tokens and refresh tokens.",
  },
  {
    icon: "🔍",
    title: "Search & Filtering",
    text: "Filter courses, instructors, and feedback using dynamic APIs.",
  },
  {
    icon: "⚡",
    title: "Role-Based Access",
    text: "Admins, instructors, and students only access what belongs to them.",
  },
];

const security = [
  "JWT Authentication",
  "Refresh Token Rotation",
  "Spring Security Integration",
  "Institution Scoped Access",
  "Role-Based Authorization",
  "Secure REST APIs",
];

function Features() {
  return (
    <div className="features-page">

      <section className="features-hero text-white text-center">
        <div className="container">
          <h1 className="display-5 fw-bold">Platform Features</h1>

          <p className="lead mt-3">
            Everything institutions need to collect, manage,
            and analyze academic feedback securely.
          </p>

          <p className="hero-desc">
            Built for scalability, security, and clean role-based workflows.
          </p>
        </div>
      </section>

      <section className="section-light">
        <div className="container">

          <div className="text-center mb-5">
            <h2 className="fw-bold">Core Features</h2>
            <p className="text-muted">
              The foundation of the CampusFeedbacks platform.
            </p>
          </div>

          <div className="row g-4">
            {features.map((f) => (
              <div className="col-md-6 col-lg-4" key={f.title}>
                <div className="feature-box h-100">
                  <div className="feature-icon">{f.icon}</div>

                  <h5>{f.title}</h5>

                  <p>{f.text}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <section className="section-grey">
        <div className="container">

          <div className="text-center mb-5">
            <h2 className="fw-bold">Security & Architecture</h2>

            <p className="text-muted">
              Backend architecture designed using real-world security practices.
            </p>
          </div>

          <div className="row align-items-center g-5">

            <div className="col-lg-6">
              <div className="security-panel">
                {security.map((item) => (
                  <div className="security-item" key={item}>
                    ✓ {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-6">
              <h4 className="fw-bold mb-3">
                Clean Backend Architecture
              </h4>

              <p className="section-text">
                The backend follows a layered architecture using
                Controller, Service, Repository, DTO, and Entity layers.
              </p>

              <p className="section-text">
                APIs are secured with Spring Security and JWT-based
                authentication while maintaining strict institution-level isolation.
              </p>

              <p className="section-text mb-0">
                Pagination, filtering, JPQL analytics queries,
                and scalable role management are built directly
                into the platform architecture.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="section-light">
        <div className="container">

          <div className="text-center mb-5">
            <h2 className="fw-bold">Platform Workflow</h2>

            <p className="text-muted">
              Simple workflow designed for institutions and students.
            </p>
          </div>

          <div className="row g-4">

            <div className="col-md-4">
              <div className="workflow-card h-100">
                <div className="workflow-icon">🏫</div>
                <h5>Create Institution</h5>

                <p>
                  Admins create institutions, add instructors,
                  manage courses, and onboard students.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="workflow-card h-100">
                <div className="workflow-icon">📝</div>
                <h5>Collect Feedback</h5>

                <p>
                  Students submit course and instructor
                  feedback anonymously or publicly.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="workflow-card h-100">
                <div className="workflow-icon">📈</div>
                <h5>Analyze Insights</h5>

                <p>
                  Institutions use analytics dashboards
                  to monitor teaching quality and trends.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      <section className="features-cta-section text-white text-center">
        <div className="container">

          <h2 className="fw-bold mb-3">
            Start Using Campus Feedbacks
          </h2>

          <p className="cta-text">
            Join your institution and experience a secure
            feedback and analytics platform built for modern education.
          </p>

          <Link to="/register" className="btn btn-warning btn-lg mt-3">
            Create Account
          </Link>

        </div>
      </section>

    </div>
  );
}

export default Features;