import React from "react";
import StudentAnalytics from "./StudentAnalytics";
import EnrolledCourses from "./EnrolledCourses";
import AvailableCourses from "./AvailableCourses";
import MyFeedbacks from "./MyFeedbacks";

const StudentDashboard = () => {
  return (
    <div className="min-vh-100 bg-light">
      {/* Header */}
      <header className="bg-primary text-white py-4 shadow-sm">
        <div className="container">
          <h2 className="fw-bold mb-1">🎓 Student Dashboard</h2>
          <p className="mb-0 text-white-50">
            View courses, feedback, and institution insights
          </p>
        </div>
      </header>

    
      <section className="py-4">
        <div className="container">
          <StudentAnalytics />
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-4">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-6">
              <EnrolledCourses />
            </div>
            <div className="col-md-6">
              <AvailableCourses />
            </div>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="py-4 pb-5">
        <div className="container">
          <MyFeedbacks />
        </div>
      </section>
    </div>
  );
};

export default StudentDashboard;
