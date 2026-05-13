import React, { useEffect, useState } from "react";
import { Card, ListGroup, Spinner } from "react-bootstrap";
import { getStudentEnrollments } from "../../services/EnrollmentService";

const EnrolledCourses = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEnrollments();
  }, []);

  const loadEnrollments = async () => {
    try {
      const res = await getStudentEnrollments();
      setEnrollments(res || []);
    } catch (err) {
      console.error("Failed to fetch enrollments", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-sm border-0 h-100">
      <Card.Body>
        <Card.Title className="fw-bold text-primary mb-3">
          📚 My Enrolled Courses
        </Card.Title>

        {loading ? (
          <div className="text-center py-4">
            <Spinner animation="border" size="sm" />
          </div>
        ) : enrollments.length > 0 ? (
          <ListGroup variant="flush">
            {enrollments.map((enroll) => (
              <ListGroup.Item key={enroll.enrollmentId}>
                <div className="fw-semibold">{enroll.courseName}</div>

                <small className="text-muted">
                  Instructor: {enroll.instructorName || "Not Assigned"}
                </small>

                <br />

                <small className="text-muted">
                  Enrolled on:{" "}
                  {
                  enroll.enrolledDate
                    ? new Date(enroll.enrolledDate).toLocaleDateString()
                    : "—"}
                </small>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p className="text-muted mb-0">
            You are not enrolled in any courses yet.
          </p>
        )}
      </Card.Body>
    </Card>
  );
};

export default EnrolledCourses;
