import { useEffect, useState } from "react";
import AnalyticsDashboard from "../Analytics/AnalyticsDashboard"; // adjust path

import {
  getAvgCourseRatingLast7Days,
  getAvgInstructorRatingLast7Days,
  getTopCourses,
  getTopInstructors,
  getFeedbackRatings,
} from "../../services/AnalyticsService"; // adjust path

import {
  getInstitutionDashboard,
  getTotalStudents,
  getTotalCourses,
  getTotalInstructors,
  getTotalFeedbacks,
} from "../../services/InstitutionService"; // adjust path

import "../../styles/InstitutionDashboard.css";

// ── Sub-components ────────────────────────────────────────────────────────────

const InfoCard = ({ label, value }) => (
  <div className="inst-info-card">
    <div className="inst-info-label">{label}</div>
    <div className="inst-info-value">{value || "—"}</div>
  </div>
);

const STATS = [
  { key: "courses",     label: "Total Courses",     icon: "📚" },
  { key: "instructors", label: "Total Instructors",  icon: "👨‍🏫" },
  { key: "students",    label: "Total Students",     icon: "👨‍🎓" },
  { key: "feedbacks",   label: "Total Feedbacks",    icon: "💬" },
];

const StatCard = ({ icon, label, value }) => (
  <div className="inst-stat-card">
    <div className="inst-stat-icon">{icon}</div>
    <div className="inst-stat-body">
      <div className="inst-stat-label">{label}</div>
      <div className="inst-stat-value">{value ?? 0}</div>
    </div>
  </div>
);

// ── Main component ────────────────────────────────────────────────────────────

function InstitutionDashboard() {
  const [institution, setInstitution]           = useState(null);
  const [counts, setCounts]                     = useState({ courses: 0, instructors: 0, students: 0, feedbacks: 0 });

  const [avgCourseRating, setAvgCourseRating]       = useState(null);
  const [avgInstructorRating, setAvgInstructorRating] = useState(null);
  const [topCourses, setTopCourses]               = useState([]);
  const [topInstructors, setTopInstructors]       = useState([]);
  const [feedbackRatings, setFeedbackRatings]     = useState([]);

  useEffect(() => {
    // Institution info
    getInstitutionDashboard().then(setInstitution).catch(() => {});

    // Counts — run in parallel, each independent
    Promise.allSettled([
      getTotalCourses(),
      getTotalInstructors(),
      getTotalStudents(),
      getTotalFeedbacks(),
    ]).then(([c, i, s, f]) => {
      setCounts({
        courses:     c.status === "fulfilled" ? c.value : 0,
        instructors: i.status === "fulfilled" ? i.value : 0,
        students:    s.status === "fulfilled" ? s.value : 0,
        feedbacks:   f.status === "fulfilled" ? f.value : 0,
      });
    });

    // Analytics
    getAvgCourseRatingLast7Days().then(setAvgCourseRating).catch(() => {});
    getAvgInstructorRatingLast7Days().then(setAvgInstructorRating).catch(() => {});
    getTopCourses(0, 5).then(setTopCourses).catch(() => setTopCourses([]));
    getTopInstructors(0, 5).then(setTopInstructors).catch(() => setTopInstructors([]));
    getFeedbackRatings().then(setFeedbackRatings).catch(() => setFeedbackRatings([]));
  }, []);

  return (
    <div className="inst-dashboard">

      {/* Header */}
      <div className="inst-dash-header">
        <div>
          <h2>{institution?.institutionName || "Institution Dashboard"}</h2>
          <p>{institution?.email || "Loading institution details…"}</p>
        </div>
        {institution?.institutionCode && (
          <span className="inst-dash-badge">Code: {institution.institutionCode}</span>
        )}
      </div>

      {/* Institution info row */}
      <div className="inst-info-grid">
        <InfoCard label="Institution Code" value={institution?.institutionCode} />
        <InfoCard label="Email"            value={institution?.email} />
        <InfoCard label="Address"          value={institution?.address} />
        <InfoCard
          label="Created At"
          value={institution?.createdAt
            ? new Date(institution.createdAt).toLocaleDateString()
            : null}
        />
      </div>

      {/* Stat cards */}
      <div className="inst-stats-grid">
        {STATS.map((s) => (
          <StatCard key={s.key} icon={s.icon} label={s.label} value={counts[s.key]} />
        ))}
      </div>

      {/* Analytics */}
      <p className="inst-section-label">Analytics Overview</p>
      <div className="inst-analytics-wrap">
        <AnalyticsDashboard
          avgCourseRating={avgCourseRating}
          avgInstructorRating={avgInstructorRating}
          topCourses={topCourses}
          topInstructors={topInstructors}
          feedbackRatings={feedbackRatings}
          title="Institution Analytics"
          subtitle="Insights derived from real student feedback"
        />
      </div>

    </div>
  );
}

export default InstitutionDashboard;