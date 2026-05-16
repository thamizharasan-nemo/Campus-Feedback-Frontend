import React from "react";
import { Link } from "react-router-dom";
import { Card, ProgressBar } from "react-bootstrap";
import "../../styles/analytics/AnalyticsSection.css";

function PublicDashboard() {
  const avgCourseRating = 4.2;
  const avgInstructorRating = 4.4;

  const topCourses = [
    {
      courseId: 1,
      courseName: "Data Structures",
      avgRating: 4.6,
      feedbackCount: 320,
    },
    {
      courseId: 2,
      courseName: "Database Management Systems",
      avgRating: 4.4,
      feedbackCount: 280,
    },
    {
      courseId: 3,
      courseName: "Operating Systems",
      avgRating: 4.2,
      feedbackCount: 250,
    },
  ];

  const topInstructors = [
    {
      instructorId: 1,
      instructorName: "Dr. Praveen",
      instructorRating: 4.7,
    },
    {
      instructorId: 2,
      instructorName: "Prof. Divya",
      instructorRating: 4.5,
    },
    {
      instructorId: 3,
      instructorName: "Prof. Rajesh",
      instructorRating: 4.3,
    },
  ];

  const feedbackRatings = [
    { rating: 5, count: 420 },
    { rating: 4, count: 310 },
    { rating: 3, count: 160 },
    { rating: 2, count: 60 },
    { rating: 1, count: 30 },
  ];

  const totalFeedback = feedbackRatings.reduce((s, r) => s + r.count, 0);

  return (
    <div className="public-dashboard">
      {/* HERO */}
      <section className="hero-section text-white text-center">
        <div className="container">
          <h1 className="display-5 fw-bold">Campus Feedbacks</h1>
          <p className="lead mt-3">
            Secure, institution-based student feedback & analytics platform
          </p>

          <p className="hero-desc">
            Collect feedback, analyze instructor performance, and
            improve academic quality using real data.
          </p>

          <div className="mt-4 d-flex flex-column flex-sm-row justify-content-center gap-3">
            <Link to="/institution" className="btn btn-warning btn-lg mx-2">
              Institution Access
            </Link>
            <a href="#analytics" className="btn btn-outline-light btn-lg mx-2">
              View Analytics
            </a>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="section-light text-center">
        <div className="container">
          <h2 className="fw-bold mb-4">Why Campus Feedbacks?</h2>

          <div className="row g-4">
            <FeatureCard
              title="🎯 Anonymous Feedback"
              text="Students submit honest feedback without fear or bias."
            />
            <FeatureCard
              title="📊 Centralized Analytics"
              text="Actionable insights across courses and instructors."
            />
            <FeatureCard
              title="🏫 Institution Control"
              text="Each institution manages its own data securely."
            />
          </div>
        </div>
      </section>

      {/* ANALYTICS */}
      <section id="analytics" className="analytics-section">
        <div className="container">
          <div className="text-center mb-5">
            <h3 className="fw-bold">Analytics Preview</h3>
            <p className="text-muted">Snapshot of real feedback insights</p>
          </div>

          {/* METRICS */}
          <div className="row g-4 mb-5">
            <MetricCard
              title="Average Course Rating"
              value={avgCourseRating}
              subtitle="Last 7 days"
              icon="📘"
            />
            <MetricCard
              title="Average Instructor Rating"
              value={avgInstructorRating}
              subtitle="Last 7 days"
              icon="👨‍🏫"
            />
          </div>

          {/* COURSES */}
          <AnalyticsBlock title="Top Performing Courses">
            <div className="row g-3">
              {topCourses.map((course) => (
                <div key={course.courseId} className="col-12 col-sm-6 col-md-4">
                  <Card className="analytics-card analytics-card--course premium h-100">
                    <Card.Body>
                      <div className="premium-accent" />

                      <div className="card-header">
                        <h6 className="fw-semibold">{course.courseName}</h6>
                        <span className="rank-chip">Top</span>
                      </div>

                      <div className="card-meta">
                        <div className="rating">
                          ⭐ <span>{course.avgRating}</span>
                        </div>

                        <span className="feedback-pill">
                          {course.feedbackCount} feedbacks
                        </span>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          </AnalyticsBlock>

          {/* INSTRUCTORS */}
          <AnalyticsBlock title="Top Rated Instructors">
            <div className="row g-3">
              {topInstructors.map((instructor) => (
                <div key={instructor.instructorId} className="col-12 col-sm-6 col-md-4">
                  <Card className="analytics-card analytics-card--instructor premium h-100">
                    <Card.Body>
                      <div className="premium-accent" />

                      <div className="card-header">
                        <h6 className="fw-semibold">{instructor.instructorName}</h6>
                        <span className="rank-chip">★</span>
                      </div>

                      <div className="card-meta">
                        <div className="rating">
                          ⭐ <span>{instructor.instructorRating}</span>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          </AnalyticsBlock>

          {/* DISTRIBUTION */}
          <AnalyticsBlock title="Rating Distribution">
            <Card className="analytics-card">
              <Card.Body>
                {feedbackRatings.map((rating) => (
                  <div key={rating.rating} className="mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <span>{"⭐".repeat(rating.rating)}</span>
                      <span className="text-muted">{rating.count}</span>
                    </div>
                    <ProgressBar
                      now={totalFeedback ? (rating.count / totalFeedback) * 100 : 0}
                      variant="warning"
                    />
                  </div>
                ))}
              </Card.Body>
            </Card>
          </AnalyticsBlock>
        </div>
      </section>

      <section className="how-section text-white text-center">
        <div className="container">
          <h2 className="fw-bold mb-4">How Institutions Use It</h2>

          <div className="row g-4">
            <HowCard
              icon="🏫"
              title="Create Institution"
              text="Admins manage courses and instructors."
            />
            <HowCard
              icon="👨‍🎓"
              title="Students Submit Feedback"
              text="Anonymous feedback using institution ID."
            />
            <HowCard
              icon="📈"
              title="Analyze & Improve"
              text="Use analytics to improve teaching quality."
            />
          </div>
        </div>
      </section>
    </div>
  );
}


const FeatureCard = ({ title, text }) => (
  <div className="col-12 col-sm-6 col-md-4">
    <div className="feature-card">
      <h5>{title}</h5>
      <p>{text}</p>
    </div>
  </div>
);

const MetricCard = ({ title, value, subtitle, icon }) => (
  <div className="col-12 col-md-6">
    <div className="metric-card">
      <div className="metric-icon">{icon}</div>
      <h6>{title}</h6>
      <div className="metric-value">{value}</div>
      <small>{subtitle}</small>
    </div>
  </div>
);

const AnalyticsBlock = ({ title, children }) => (
  <div className="analytics-block mb-5">
    <h5 className="fw-bold mb-3">{title}</h5>
    {children}
  </div>
);

const HowCard = ({ icon, title, text }) => (
  <div className="col-12 col-sm-6 col-md-4">
    <div className="how-card">
      <div className="how-icon">{icon}</div>
      <h5>{title}</h5>
      <p>{text}</p>
    </div>
  </div>
);

export default PublicDashboard;
