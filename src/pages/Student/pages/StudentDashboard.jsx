import React from "react";
import StudentAnalytics from "./StudentAnalytics";
import EnrolledCourses from "../components/EnrolledCourses";
import AvailableCourses from "../components/AvailableCourses";
import MyFeedbacks from "./MyFeedbacks";

import "../../../styles/student/StudentDashboard.css";

const StudentDashboard = () => {
  return (
    <div className="min-vh-100 bg-light">
      <div className="student-dashboard-page min-vh-50 bg-light">
        <section className="dashboard-hero text-white">
          <div className="container">
            <div className="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-4">
              <div>
                <div className="dashboard-badge mb-3">Student Portal</div>

                <h1 className="dashboard-title fw-bold">
                  🎓 Student Dashboard
                </h1>

                <p className="dashboard-subtitle mb-0">
                  View enrolled courses, submit feedback, and track your
                  academic activity.
                </p>
              </div>

              <div className="dashboard-quick-card">
                <small className="text-white-50 d-block mb-1">
                  Institution Access
                </small>

                <div className="fw-semibold fs-5">Campus Feedbacks</div>

                <small className="text-white-50">
                  Feedback & Analytics Platform
                </small>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="py-4">
        <div className="container">
          <StudentAnalytics />
        </div>
      </section>

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

      <section className="py-4 pb-5">
        <div className="container">
          <MyFeedbacks />
        </div>
      </section>
    </div>
  );
};

export default StudentDashboard;
