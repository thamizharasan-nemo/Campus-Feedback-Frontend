import React, { useEffect, useState } from "react";
import { Card, ListGroup, Button, Alert, Spinner } from "react-bootstrap";
import { getAllCourses } from "../../../services/CourseService";
import {
  getStudentEnrollments,
  enrollToCourse,
} from "../../../services/EnrollmentService";

const MAX_ENROLLMENTS = 10;

const AvailableCourses = () => {
  const [availableCourses, setAvailableCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [enrollingId, setEnrollingId] = useState(null);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {


    try {
      const [allCourses, enrolled] = await Promise.all([
        getAllCourses(),
        getStudentEnrollments(),
      ]);

      setEnrolledCourses(enrolled);

      const enrolledIds = enrolled.map((e) => e.courseId);
      const filtered = allCourses.filter(
        (c) => !enrolledIds.includes(c.courseId)
      );

      setAvailableCourses(filtered);
    } catch (err) {
      console.error("Failed to load courses", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (courseId) => {
    if (enrolledCourses.length >= MAX_ENROLLMENTS) {
      setMessage("❌ You can enroll in a maximum of 10 courses.");
      return;
    }

    setEnrollingId(courseId);
    setMessage(null);

    try {
      await enrollToCourse(courseId);
      setMessage("✅ Enrolled successfully!");
      loadCourses(); 
    } catch (err) {
      console.error("Enrollment failed", err);
      setMessage("⚠️ Enrollment failed. Try again.");
    } finally {
      setEnrollingId(null);
    }
  };

  return (
    <Card className="shadow-sm border-0 h-100">
      <Card.Body>
        <Card.Title className="fw-bold text-info mb-3">
          ➕ Available Courses
        </Card.Title>

        {message && <Alert variant="info">{message}</Alert>}

        {loading ? (
          <div className="text-center py-4">
            <Spinner animation="border" size="sm" />
          </div>
        ) : availableCourses.length > 0 ? (
          <ListGroup variant="flush">
            {availableCourses.map((course) => (
              <ListGroup.Item
                key={course.courseId}
                className="d-flex justify-content-between align-items-center"
              >
                <div>
                  <div className="fw-semibold">{course.courseName}</div>
                  <small className="text-muted">
                    Instructor: {course.instructorName || "Not Assigned"}
                  </small>
                </div>

                <Button
                  size="sm"
                  variant="success"
                  disabled={enrollingId === course.courseId}
                  onClick={() => handleEnroll(course.courseId)}
                >
                  {enrollingId === course.courseId ? "Enrolling..." : "Enroll"}
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p className="text-muted mb-0">
            🎉 You are enrolled in all available courses!
          </p>
        )}
      </Card.Body>
    </Card>
  );
};

export default AvailableCourses;
