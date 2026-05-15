import React, { useEffect, useState } from "react";
import { Row, Col, Card, ListGroup, Spinner } from "react-bootstrap";
import {
  getAvgCourseRatingLast7Days,
  getTopCourses,
} from "../../../services/AnalyticsService";
import {
  getTotalCourses,
  getTotalInstructors,
} from "../../../services/InstitutionService";

const StudentAnalytics = () => {
  const [avgRating, setAvgRating] = useState(null);
  const [topCourses, setTopCourses] = useState([]);
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalInstructors, setTotalInstructors] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const [
        avgRatingRes,
        topCoursesRes,
        coursesCount,
        instructorsCount,
      ] = await Promise.all([
        getAvgCourseRatingLast7Days(),
        getTopCourses(0, 3),
        getTotalCourses(),
        getTotalInstructors(),
      ]);

      setAvgRating(avgRatingRes);
      setTopCourses(topCoursesRes);
      setTotalCourses(coursesCount);
      setTotalInstructors(instructorsCount);
    } catch (err) {
      console.error("Failed to load student analytics", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <section className="my-4">
      <h4 className="fw-bold mb-3">📊 Institution Insights</h4>

      <Row className="g-4 mb-4">
        <Col md={3}>
          <StatCard
            title="Avg Rating"
            value={avgRating }
            emoji="⭐"
          />
        </Col>
        <Col md={3}>
          <StatCard title="Courses" value={totalCourses} emoji="📚" />
        </Col>
        <Col md={3}>
          <StatCard title="Instructors" value={totalInstructors} emoji="🧑‍🏫" />
        </Col>
        <Col md={3}>
          <StatCard title="Popularity" value="Trending" emoji="🔥" />
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <Card.Title className="fw-bold text-primary mb-3">
                🏆 Popular Courses
              </Card.Title>

              {topCourses.length > 0 ? (
                <ListGroup variant="flush">
                  {topCourses.map((course, index) => (
                    <ListGroup.Item
                      key={course.courseId}
                      className="d-flex justify-content-between align-items-center"
                    >
                      <div>
                        
                        <strong>{index + 1}. {course.courseName}</strong>
                        <div className="text-muted small">
                          Instructor: {course.instructorName || "No Name"}
                        </div>
                      </div>
                      <span className="badge bg-success rounded-pill">
                        ⭐ {course.avgRating?.toFixed(1) || "—"}
                      </span>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <p className="text-muted">No course analytics available.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </section>
  );
};

const StatCard = ({ title, value, emoji }) => (
  <Card className="shadow-sm border-0 text-center h-100">
    <Card.Body>
      <h6 className="text-muted">
        {emoji} {title}
      </h6>
      <div className="fs-4 fw-bold">{value}</div>
    </Card.Body>
  </Card>
);

export default StudentAnalytics;
