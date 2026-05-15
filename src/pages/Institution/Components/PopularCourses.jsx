
function PopularCourses({ courses }) {
  if (!courses || courses.length === 0) return null;

  return (
    <div className="popular-section">
      <p className="popular-section-title">Top Courses by Feedback</p>

      <div className="popular-grid">
        {courses.map((course) => (
          <div className="popular-card" key={course.courseId}>
            <div className="popular-card-name">{course.courseName}</div>
            <div className="popular-card-instructor">
              {course.instructorName || "No instructor assigned"}
            </div>
            <div className="popular-card-footer">
              <span className="rating-pill">⭐ {course.avgRating.toFixed(1) ?? "0"}</span>
              <span className="popular-card-feedback">
                💬 {course.feedbackCount ?? 0} feedbacks
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularCourses;