import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/AnalyticsDashboard.css";

function AnalyticsDashboard({
  avgCourseRating,
  avgInstructorRating,
  topCourses,
  topInstructors,
  feedbackRatings,
  title = "Live Analytics",
  subtitle = "Real-time insights collected from student feedback",
}) {
  const navigate = useNavigate();

  const goToCourse = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <section className="analytics-section">
      <div className="analytics-container">
        <header className="analytics-header">
          <h3 className="analytics-title">{title}</h3>
          <p className="analytics-subtitle">{subtitle}</p>
        </header>

        {/* Metric Cards */}
        <div className="analytics-metrics">
          <MetricCard
            title="Avg Course Rating (7 Days)"
            value={avgCourseRating?.toFixed(1) || "N/A"}
          />
          <MetricCard
            title="Avg Instructor Rating (7 Days)"
            value={avgInstructorRating?.toFixed(1) || "N/A"}
          />
        </div>

        {/* Top Courses */}
        <Section title="Top Courses">
          <div className="card-list">
            {(topCourses || []).map((c) => (
              <div
                key={c.courseId}
                className="data-card clickable"
                onClick={() => goToCourse(c.courseId)}
              >
                <h5>{c.courseName}</h5>
                <div className="card-meta">
                  <span>⭐ {c.avgRating?.toFixed(1)}</span>
                  <span>💬 {c.feedbackCount}</span>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Top Instructors */}
        <Section title="Top Instructors">
          <div className="card-list two-col">
            {(topInstructors || []).map((i) => (
              <div key={i.instructorId} className="data-card compact">
                <h5>{i.instructorName}</h5>
                <span className="rating-pill">
                  ⭐ {i.instructorRating?.toFixed(1)}
                </span>
              </div>
            ))}
          </div>
        </Section>

        {/* Feedback Distribution */}
        <Section title="Feedback Rating Distribution">
          <div className="rating-grid">
            {(feedbackRatings || []).map((r, idx) => (
              <div key={idx} className="rating-card">
                <div className="stars">{"★".repeat(r.rating)}</div>
                <span>{r.count} feedbacks</span>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </section>
  );
}


/* Reusable components */

const MetricCard = ({ title, value }) => (
  <div className="metric-card">
    <p>{title}</p>
    <h2>{value}</h2>
  </div>
);

const Section = ({ title, children }) => (
  <div className="analytics-block">
    <h4 className="section-title">{title}</h4>
    {children}
  </div>
);

export default AnalyticsDashboard;
