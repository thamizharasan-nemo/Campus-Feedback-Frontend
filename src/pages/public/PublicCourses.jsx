import React from "react";
import "../../styles/public/PublicCourses.css";

const PublicCourses = () => {
  return (
    
    <div className="public-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Smart Course Feedback System</h1>
          <p>
            Empower institutions with structured student feedback and
            data-driven academic insights.
          </p>

          <div className="hero-actions">
            <button className="btn-primary">View Courses</button>
            <button className="btn-secondary">View Demo</button>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">How It Works</h2>

        <div className="steps-grid">
          <StepCard
            step="1"
            title="Create Courses"
            text="Institutions create courses and assign instructors."
            icon="🏫"
          />
          <StepCard
            step="2"
            title="Collect Feedback"
            text="Students submit course and instructor feedback."
            icon="🧑‍🎓"
          />
          <StepCard
            step="3"
            title="Analyze Insights"
            text="Admins analyze ratings and trends via dashboards."
            icon="📊"
          />
        </div>
      </section>

      <section className="section muted-bg">
        <h2 className="section-title">Example Courses</h2>

        <div className="course-grid">
          <CourseCard
            title="Introduction to Data Science"
            desc="Fundamentals of data analysis, visualization, and ML."
            icon="📘"
          />
          <CourseCard
            title="Advanced AI Programming"
            desc="Deep learning, neural networks, and model training."
            icon="🤖"
          />
          <CourseCard
            title="Digital Design Principles"
            desc="User experience, interface design, and storytelling."
            icon="🎨"
          />
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Top Rated Courses</h2>

        <div className="top-course-grid">
          <TopCourseCard
            title="Machine Learning Fundamentals"
            rating={4.9}
            reviews={430}
          />
          <TopCourseCard
            title="Modern Web Development"
            rating={4.7}
            reviews={320}
          />
          <TopCourseCard
            title="Financial Modeling & Valuation"
            rating={4.5}
            reviews={280}
          />
        </div>
      </section>

      <footer className="footer">
        <p>© 2026 Smart Course Feedback System</p>
        <div className="footer-links">
          <span>Privacy</span>
          <span>Terms</span>
          <span>Contact</span>
        </div>
      </footer>
    </div>
  );
};

const StepCard = ({ step, title, text, icon }) => (
  <div className="step-card">
    <div className="step-icon">{icon}</div>
    <span className="step-number">{step}</span>
    <h4>{title}</h4>
    <p>{text}</p>
  </div>
);

const CourseCard = ({ title, desc, icon }) => (
  <div className="course-card">
    <div className="course-icon">{icon}</div>
    <h4>{title}</h4>
    <p>{desc}</p>
  </div>
);

const TopCourseCard = ({ title, rating, reviews }) => (
  <div className="top-course-card">
    <h4>{title}</h4>
    <div className="stars">
      {"⭐".repeat(Math.round(rating))}
    </div>
    <p className="rating-text">
      {rating}/5 • {reviews} reviews
    </p>
  </div>
);

export default PublicCourses;
