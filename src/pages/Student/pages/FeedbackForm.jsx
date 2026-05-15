import React, { useEffect, useState } from "react";
import { getStudentEnrollments } from "../../../services/EnrollmentService";
import {
  submitFeedback,
  fetchFeedbacksByStudentAndCourse,
} from "../../../services/FeedbackService";
import StarRating from "../../../components/StarRating";

const FeedbackForm = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [selectedEnrollmentId, setSelectedEnrollmentId] = useState("");
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);

  const [courseRating, setCourseRating] = useState(0);
  const [instructorRating, setInstructorRating] = useState(0);
  const [courseComment, setCourseComment] = useState("");
  const [instructorComment, setInstructorComment] = useState("");
  const [anonymous, setAnonymous] = useState(false);

  const [pastFeedbacks, setPastFeedbacks] = useState([]);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    getStudentEnrollments()
      .then(setEnrollments)
      .catch(console.error);
  }, []);

  useEffect(() => {
    const enrollment = enrollments.find(
      (e) => e.enrollmentId === Number(selectedEnrollmentId)
    );
    setSelectedEnrollment(enrollment || null);
  }, [selectedEnrollmentId, enrollments]);

  useEffect(() => {
    if (!selectedEnrollment?.courseId) {
      setPastFeedbacks([]);
      return;
    }

    fetchFeedbacksByStudentAndCourse(selectedEnrollment.courseId)
      .then(setPastFeedbacks)
      .catch(console.error);
  }, [selectedEnrollment]);

  const validate = () => {
  const errs = {};

  if (!selectedEnrollmentId) {
    errs.enrollment = "Select a course";
  }

  if (!selectedEnrollment) {
    errs.enrollment = "Invalid course selection";
  }

  if (courseRating < 1) errs.courseRating = "Rate the course";
  if (instructorRating < 1) errs.instructorRating = "Rate the instructor";
  if (!courseComment.trim()) errs.courseComment = "Comment is required";

  setErrors(errs);
  return Object.keys(errs).length === 0;
};

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) return;

  if (!selectedEnrollment) {
    console.error("Selected enrollment is null");
    return;
  }

  const payload = {
    courseId: selectedEnrollment.courseId,
    instructorId: selectedEnrollment.instructorId,
    courseRating,
    instructorRating,
    courseComment,
    instructorComment,
    anonymous,
  };

    try {
      await submitFeedback(payload);
      setSuccessMessage("✅ Feedback submitted successfully");

      setCourseRating(0);
      setInstructorRating(0);
      setCourseComment("");
      setInstructorComment("");
      setAnonymous(false);

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container my-5">
      <div className="card shadow-lg rounded-4 border-0">
        <div className="card-body p-4">
          <h3 className="text-center text-primary mb-4">
            📋 Submit Course Feedback
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Course</label>
              <select
                className={`form-select ${
                  errors.enrollment ? "is-invalid" : ""
                }`}
                value={selectedEnrollmentId}
                onChange={(e) => setSelectedEnrollmentId(e.target.value)}
              >
                <option value="">-- Select Course --</option>
                {enrollments.map((e) => (
                  <option key={e.enrollmentId} value={e.enrollmentId}>
                    {e.courseName}
                  </option>
                ))}
              </select>
              {errors.enrollment && (
                <div className="invalid-feedback">{errors.enrollment}</div>
              )}
            </div>

            {selectedEnrollment && (
              <p className="text-muted mb-3">
                👨‍🏫 Instructor:{" "}
                <strong>{selectedEnrollment.instructorName}</strong>
              </p>
            )}

            <div className="mb-3">
              <label className="fw-semibold d-block mb-1">Course Rating</label>
              <StarRating rating={courseRating} setRating={setCourseRating} />
              {errors.courseRating && (
                <div className="text-danger">{errors.courseRating}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="fw-semibold d-block mb-1">
                Instructor Rating
              </label>
              <StarRating
                rating={instructorRating}
                setRating={setInstructorRating}
              />
              {errors.instructorRating && (
                <div className="text-danger">{errors.instructorRating}</div>
              )}
            </div>

            <textarea
              className="form-control mb-3"
              placeholder="Course feedback"
              value={courseComment}
              onChange={(e) => setCourseComment(e.target.value)}
            />

            <textarea
              className="form-control mb-3"
              placeholder="Instructor feedback"
              value={instructorComment}
              onChange={(e) => setInstructorComment(e.target.value)}
            />

            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                checked={anonymous}
                onChange={(e) => setAnonymous(e.target.checked)}
              />
              <label className="form-check-label">Submit anonymously</label>
            </div>

            <button
              className="btn btn-primary w-100"
              disabled={!selectedEnrollment}
            >
              🚀 Submit Feedback
            </button>

            {successMessage && (
              <div className="alert alert-success mt-3 text-center">
                {successMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
