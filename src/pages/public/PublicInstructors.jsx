import React, { useEffect, useState } from "react";
import { getTopInstructors } from "../../services/AnalyticsService";

function Instructors() {
  const [topInstructors, setTopInstructors] = useState([]);

  useEffect(() => {
    loadInstructors();
  }, []);

  const loadInstructors = () => {
    getTopInstructors(0, 5)
      .then((result) => setTopInstructors(result.data))
      .catch(console.error);
  };

  return (
    <>
      <div className="bg-primary text-white text-center py-5">
        <h1 className="fw-bold">Instructor Management</h1>
        <p className="mt-3">
          Institutions manage instructors, assign courses, and analyze teaching
          feedback to improve learning outcomes.
        </p>
      </div>

      <div className="container my-5">

        <Section title="How Instructors Work in the System">
          <p>
            Instructors are added by institution administrators and assigned to
            one or more courses. Students submit feedback for instructors based
            on course experience, and aggregated ratings help instructors
            improve their teaching methods.
          </p>
        </Section>

        <Section title="Example Instructors">
          <div className="row">
            <InstructorCard
              name="Dr. Rajesh Kumar"
              courses="Data Structures, Algorithms"
            />
            <InstructorCard
              name="Prof. Anitha Sharma"
              courses="Database Management Systems"
            />
            <InstructorCard
              name="Dr. Suresh Iyer"
              courses="Operating Systems, Computer Networks"
            />
          </div>
        </Section>

        <Section title="Top Rated Instructors (Based on Feedback)">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Instructor</th>
                <th>Average Rating</th>
              </tr>
            </thead>
            <tbody>
              {(topInstructors || []).map((instructor) => (
                <tr key={instructor.instructorId}>
                  <td>{instructor.instructorName}</td>
                  <td>{instructor.instructorRating?.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>
      </div>
    </>
  );
}


function InstructorCard({ name, courses }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow-sm h-100">
        <div
          className="bg-light d-flex align-items-center justify-content-center"
          style={{ height: "150px" }}
        >
          <span className="text-muted">Instructor Image</span>
        </div>

        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">
            <strong>Courses:</strong> {courses}
          </p>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-5">
      <h4 className="mb-3">{title}</h4>
      {children}
    </div>
  );
}

export default Instructors;
