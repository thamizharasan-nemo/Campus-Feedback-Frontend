
function PopularCourses({ courses }) {
  if (!courses || courses.length === 0) return null;

  return (
    <div className="popular-section">
      <p className="popular-section-title">Top Courses by Feedback</p>

      <div className="popular-grid">
        {courses.map((c) => (
          <div className="popular-card" key={c.courseId}>
            <div className="popular-card-name">{c.courseName}</div>
            <div className="popular-card-instructor">
              {c.instructorName || "No instructor assigned"}
            </div>
            <div className="popular-card-footer">
              <span className="rating-pill">⭐ {c.avgRating.toFixed(1) ?? "0"}</span>
              <span className="popular-card-feedback">
                💬 {c.feedbackCount ?? 0} feedbacks
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularCourses;