import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import { searchCourses } from "../../services/CourseService";
import CourseSearchBar from "../../components/course/CourseSearchBar";
import "../../styles/course/StudentCourses.css";

function StudentCourses() {
  const [courses, setCourses] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [sortBy, setSortBy] = useState("courseName");
  const [sortDir, setSortDir] = useState("ASC");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    loadCourses();
  }, [keyword, sortBy, sortDir]);

  const loadCourses = () => {
    setLoading(true);

    searchCourses({
      keyword,
      sortBy,
      sortDirection: sortDir,
      page: 0,
      size: 50,
    })
      .then((res) => setCourses(res.content))
      .finally(() => setLoading(false));
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortDir(sortDir === "ASC" ? "DESC" : "ASC");
    } else {
      setSortBy(field);
      setSortDir("ASC");
    }
  };

  if (loading) {
    return (
      <div className="courses-loading">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div className="container courses-page">
      {/* Header */}
      <div className="courses-header">
        <div>
          <h2 className="courses-title">Available Courses</h2>
          <p className="courses-subtitle">
            Explore courses, ratings, and feedback
          </p>
        </div>

        <CourseSearchBar onSearch={(value) => setKeyword(value)} />
      </div>

      {/* Sort Controls */}
      <div className="courses-sort">
        <button onClick={() => handleSort("courseName")}>
          Sort by Name
        </button>
        <button onClick={() => handleSort("avgRating")}>
          Sort by Rating
        </button>
      </div>

      {/* Courses Grid */}
      <div className="row g-4">
        {courses.map((course) => (
          <div key={course.courseId} className="col-md-6 col-lg-4">
            <div
              className="course-card"
              onClick={() => navigate(`/courses/${course.courseId}`)}
            >
              <div className="course-card-header">
                📘 {course.courseName}
              </div>

              <div className="course-card-body">
                <p>
                  👩‍🏫 <span>Instructor:</span>{" "}
                  {course.instructorName || "Not Assigned"}
                </p>

                <p>
                  ⭐ <span>Rating:</span>{" "}
                  {course.avgRating ? course.avgRating.toFixed(1) : "0.0"}
                </p>

                <p className="muted">
                  💬 {course.feedbackCount || 0} feedbacks
                </p>
              </div>

              <div className="course-card-footer">
                View Details →
              </div>
            </div>
          </div>
        ))}
      </div>

      {courses.length === 0 && (
        <p className="empty-text">No courses found.</p>
      )}
    </div>
  );
}

export default StudentCourses;
