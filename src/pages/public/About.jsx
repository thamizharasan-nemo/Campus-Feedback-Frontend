import { Link } from "react-router-dom";
import "../../styles/public/About.css";

const values = [
  {
    icon: "🔒",
    title: "Privacy First",
    text: "Anonymous feedback helps students share honest opinions without fear or pressure.",
  },
  {
    icon: "📊",
    title: "Analytics Driven",
    text: "Institutions get structured analytics instead of scattered manual feedback.",
  },
  {
    icon: "🏫",
    title: "Institution Scoped",
    text: "Every institution manages its own isolated data securely.",
  },
];

const stats = [
  { value: "3", label: "User Roles" },
  { value: "JWT", label: "Secure Authentication" },
  { value: "100%", label: "Institution Scoped" },
  { value: "∞", label: "Scalable Design" },
];

function About() {
  return (
    <div className="about-page">

      <section className="about-hero text-white text-center">
        <div className="container">
          <h1 className="display-5 fw-bold">About Campus Feedbacks</h1>

          <p className="lead mt-3">
            A secure multi-institution feedback and analytics platform
            designed to improve teaching quality using real student insights.
          </p>

          <p className="hero-desc">
            Built with Spring Boot, JWT security, role-based access control,
            and institution-level isolation.
          </p>
        </div>
      </section>

      <section className="section-light">
        <div className="container">
          <div className="row align-items-center g-5">

            <div className="col-lg-7">
              <h2 className="fw-bold mb-4">
                Why This Project Exists
              </h2>

              <p className="section-text">
                Most colleges still collect feedback manually or through
                disconnected systems. That creates incomplete data,
                biased responses, and very little visibility into how
                courses and instructors are actually performing.
              </p>

              <p className="section-text">
                CampusFeedbacks solves this by providing a centralized,
                institution-based feedback platform where students can
                safely submit feedback and institutions can analyze
                performance using structured analytics.
              </p>

              <p className="section-text mb-0">
                Instead of assumptions, institutions get real data to
                improve teaching quality and learning experience.
              </p>
            </div>

            <div className="col-lg-5">
              <div className="stats-grid">
                {stats.map((s) => (
                  <div className="stat-card" key={s.label}>
                    <h3>{s.value}</h3>
                    <p>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="section-grey">
        <div className="container">

          <div className="text-center mb-5">
            <h2 className="fw-bold">Core Principles</h2>
            <p className="text-muted">
              The ideas that shaped the platform architecture and design.
            </p>
          </div>

          <div className="row g-4">
            {values.map((v) => (
              <div className="col-md-4" key={v.title}>
                <div className="info-card h-100">
                  <div className="info-icon">{v.icon}</div>
                  <h5>{v.title}</h5>
                  <p>{v.text}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <section className="section-light">
        <div className="container">

          <div className="text-center mb-5">
            <h2 className="fw-bold">How The Platform Works</h2>
            <p className="text-muted">
              Simple role-based workflow for institutions, instructors, and students.
            </p>
          </div>

          <div className="row g-4">

            <div className="col-md-4">
              <div className="role-card h-100">
                <div className="role-icon">🏫</div>
                <h5>Admin</h5>

                <p>
                  Manages the institution, creates users,
                  assigns instructors, manages courses,
                  and views analytics.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="role-card h-100">
                <div className="role-icon">👨‍🏫</div>
                <h5>Instructor</h5>

                <p>
                  Views course feedback, tracks ratings,
                  and monitors performance analytics
                  for assigned courses.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="role-card h-100">
                <div className="role-icon">👨‍🎓</div>
                <h5>Student</h5>

                <p>
                  Enrolls in courses and submits
                  anonymous or public feedback
                  securely within the institution.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="section-grey">
        <div className="container">

          <div className="text-center mb-5">
            <h2 className="fw-bold">Tech Stack</h2>
            <p className="text-muted">
              Modern backend and frontend technologies powering the platform.
            </p>
          </div>

          <div className="tech-stack">
            <span>Java</span>
            <span>Spring Boot</span>
            <span>Spring Security</span>
            <span>JWT</span>
            <span>Hibernate</span>
            <span>MySQL</span>
            <span>React</span>
            <span>Bootstrap</span>
          </div>

        </div>
      </section>

      <section className="about-cta-section text-white text-center">
        <div className="container">
          <h2 className="fw-bold mb-3">
            Start Building Better Academic Insights
          </h2>

          <p className="cta-text">
            Join your institution and start collecting meaningful,
            data-driven student feedback.
          </p>

          <Link to="/login" className="btn btn-warning btn-lg mt-3">
            Get Started
          </Link>
        </div>
      </section>

    </div>
  );
}

export default About;