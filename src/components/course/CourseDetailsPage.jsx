import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getCourseById } from "../../services/CourseService";
import {
  getEnrollmentStatus,
} from "../../services/EnrollmentService";
import { getFeedbacksByCourse } from "../../services/FeedbackService";

import "../../styles/CourseDetailsPage.css";
import StarRating from "../StarRating";

function CourseDetailsPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [enrolled, setEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourseDetails();
  }, [courseId]);

  const loadCourseDetails = async () => {
    try {
      setLoading(true);

      const courseRes = await getCourseById(courseId);
      setCourse(courseRes);

      const enrollRes = await getEnrollmentStatus(courseId);
      setEnrolled(enrollRes);

      const feedbackRes = await getFeedbacksByCourse({
        courseId,
        page: 0,
        size: 10,
      });
      setFeedbacks(feedbackRes.content);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="course-loader">
        <div className="spinner" />
      </div>
    );
  }

  if (!course) {
    return <p className="center-text">Course not found</p>;
  }

  return (
    <div className="course-page">
      {/* Course Header */}
      <div className="course-card">
        <h2 className="course-title">📘 {course.courseName}</h2>

        <p className="course-instructor">
          👩‍🏫 Instructor:{" "}
          <strong>{course.instructorName || "Not Assigned"}</strong>
        </p>

        <div className="course-stats">
          <span className="stat-badge">
            ⭐ {course.avgRating?.toFixed(1) || "N/A"}
          </span>
          <span className="stat-badge secondary">
            💬 {course.feedbackCount || 0} Feedbacks
          </span>
        </div>
      </div>
      <div className="course-card">
        <h4>Description</h4>
        <p className="muted-text">
          {course.courseDescription || "No description available"}
        </p>
      </div>

      <div className="course-action">
        {enrolled ? (
          <button
            className="primary-btn success"
            onClick={() => navigate(`/feedback/submit`)}
          >
            Submit Feedback
          </button>
        ) : (
          <button
            className="primary-btn"
            onClick={() => navigate("/student/dashboard")}
          >
            ➕ Enroll to Course
          </button>
        )}
      </div>

      {/* Feedbacks */}
      <h3 className="section-title">Student Feedbacks</h3>

      {feedbacks.length === 0 ? (
        <p className="muted-text">
          No feedback yet. Be the first to share your thoughts!
        </p>
      ) : (
        <div className="feedback-list">
          {feedbacks.map((feedback) => (
            <div key={feedback.feedbackId} className="feedback-card">
              <div className="feedback-header">
                <div className="feedback-user">
                  <div className="avatar">
                    {feedback.anonymous ? "👤" : feedback.studentName.charAt(0)}
                  </div>
                  <div>
                    <p className="username">
                      {feedback.anonymous ? "Anonymous Student" : feedback.studentName}
                    </p>
                    <p className="date-text">
                      {new Date(feedback.submittedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="rating-box">
                  <div>
                    <span className="rating-label">Course</span>
                    <StarRating rating={feedback.courseRating} readOnly />
                  </div>

                  <div>
                    <span className="rating-label">Instructor</span>
                    <StarRating rating={feedback.instructorRating} readOnly />
                  </div>
                </div>
              </div>

              <div className="feedback-body">
                <div className="comment-section">
                  <h5>Course Feedback</h5>
                  <p>{feedback.courseComment}</p>
                </div>

                {feedback.instructorComment && (
                  <div className="comment-section instructor">
                    <h5>Instructor Feedback</h5>
                    <p>{feedback.instructorComment}</p>
                  </div>
                )}
              </div>

              <div className="feedback-footer">
                <span>
                  Instructor: <strong>{feedback.instructorName}</strong>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CourseDetailsPage;
