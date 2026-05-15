import { useState, useEffect } from "react";
import { getAllFeedbacksToInstructor } from "../../../services/FeedbackService";
import {
  assignCourseToInstructor,
  unassignCourseFromInstructor,
} from "../../../services/InstructorService";
import { getAllUnassignedCoursesByInstitution } from "../../../services/CourseService";
import { getUserFromToken } from "../../../utils/auth";

function getInitials(name = "") {
  return name
    .split(" ")
    .map((w) => w[0] ?? "")
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function renderStars(rating) {
  const filled = Math.round(rating ?? 0);
  return "★".repeat(filled) + "☆".repeat(5 - filled);
}

function getPerfBadge(rating) {
  if (rating == null || rating === 0) {
    return {
      label: "No Data",
      cls: "average",
    };
  }
  if (rating >= 4.5) {
    return {
      label: "⭐ Best Performer",
      cls: "best",
    };
  }
  if (rating >= 3.5) {
    return {
      label: "👍 Good",
      cls: "good",
    };
  }
  if (rating >= 2.5) {
    return {
      label: "📊 Average",
      cls: "average",
    };
  }
  return {
    label: "⚠ Needs Work",
    cls: "low",
  };
}

function FeedbackPanel({ instructorId }) {
  const [feedbacks, setFeedbacks] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const PAGE_SIZE = 4;

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    getAllFeedbacksToInstructor({ instructorId, page, size: PAGE_SIZE })
      .then((data) => {
        if (cancelled) return;
        if (data && "content" in data) {
          setFeedbacks(data.content ?? []);
          setTotalPages(data.totalPages ?? 0);
        } else {
          setFeedbacks(Array.isArray(data) ? data : []);
          setTotalPages(1);
        }
      })
      .catch(() => setFeedbacks([]))
      .finally(() => !cancelled && setLoading(false));

    return () => {
      cancelled = true;
    };
  }, [instructorId, page]);

  return (
    <div className="feedback-panel">
      <div className="feedback-panel-title">Student Feedback</div>

      {loading && <p className="feedback-empty">Loading…</p>}

      {!loading && feedbacks.length === 0 && (
        <p className="feedback-empty">No feedback yet.</p>
      )}

      {!loading &&
        feedbacks.map((feedback, i) => (
          <div key={feedback.feedbackId ?? i} className="feedback-item">
            <div className="feedback-item-top">
              <span className="feedback-stars">
                {renderStars(feedback.instructorRating ?? 0)}
              </span>
              <span className="feedback-date">
                {feedback.submittedAt
                  ? new Date(feedback.submittedAt).toLocaleDateString()
                  : ""}
              </span>
            </div>
            {feedback.instructorComment && (
              <p className="feedback-comment">{feedback.instructorComment}</p>
            )}
            {feedback.anonymous && (
              <div className="feedback-anon">Anonymous</div>
            )}
          </div>
        ))}

      {totalPages > 1 && (
        <div className="feedback-pages">
          <button onClick={() => setPage((p) => p - 1)} disabled={page === 0}>
            Prev
          </button>
          <span className="pg-info">
            {page + 1} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page >= totalPages - 1}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}


function AssignPanel({ instructor }) {
  const { instructorId } = instructor;

  const [assignedCourses, setAssignedCourses] = useState(
    instructor.assignedCourses ?? [],
  );
  const [unassignedCourses, setUnassignedCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [msg, setMsg] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    getAllUnassignedCoursesByInstitution()
      .then((data) => setUnassignedCourses(Array.isArray(data) ? data : []))
      .catch(() => setUnassignedCourses([]));
  }, []);

  const flash = (text, type = "success") => {
    setMsg({ text, type });
    setTimeout(() => setMsg(null), 2500);
  };

  const handleAssign = async () => {
    if (!selectedCourseId) return;
    setBusy(true);
    try {
      await assignCourseToInstructor(instructorId, Number(selectedCourseId));
      const course = unassignedCourses.find(
        (c) => c.courseId === Number(selectedCourseId),
      );
      if (course) {
        setAssignedCourses((prev) => [...prev, course]);
        setUnassignedCourses((prev) =>
          prev.filter((c) => c.courseId !== Number(selectedCourseId)),
        );
      }
      setSelectedCourseId("");
      flash("Course assigned successfully.");
    } catch {
      flash("Failed to assign course.", "danger");
    } finally {
      setBusy(false);
    }
  };

  const handleUnassign = async (courseName) => {
    setBusy(true);
    try {
      const courseObj = assignedCourses.find(
        (c) => c.courseName === courseName,
      );
      const courseId = courseObj?.courseId;

      if (!courseId) {
        flash("Could not find course ID to unassign.", "danger");
        return;
      }

      await unassignCourseFromInstructor(instructorId, courseId);
      setAssignedCourses((prev) => prev.filter((c) => c.courseId !== courseId));
      setUnassignedCourses((prev) => [...prev, courseObj]);
      flash("Course unassigned.");
    } catch {
      flash("Failed to unassign.", "danger");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="assign-panel">
      <div className="assign-panel-title">Manage Courses</div>

      {assignedCourses.length > 0 && (
        <div className="assigned-tags">
          {assignedCourses.map((course, i) => (
            <span key={course.courseId || i} className="assigned-tag">
              {course.courseName}
              <button
                onClick={() => handleUnassign(course.courseName)}
                title="Unassign"
                disabled={busy}
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      )}

      {unassignedCourses.length > 0 && (
        <div className="assign-row">
          <select
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
          >
            <option value="">— Select a course to assign —</option>
            {unassignedCourses.map((course) => (
              <option key={course.courseId} value={course.courseId}>
                {course.courseName}
              </option>
            ))}
          </select>
          <button
            className="btn btn-primary btn-sm"
            onClick={handleAssign}
            disabled={!selectedCourseId || busy}
          >
            Assign
          </button>
        </div>
      )}

      {unassignedCourses.length === 0 && assignedCourses.length === 0 && (
        <p style={{ fontSize: 13, color: "#6c757d", margin: 0 }}>
          No courses available to assign.
        </p>
      )}

      {unassignedCourses.length === 0 && assignedCourses.length > 0 && (
        <p
          style={{
            fontSize: 12.5,
            color: "#6c757d",
            marginTop: 8,
            marginBottom: 0,
          }}
        >
          All available courses are already assigned.
        </p>
      )}

      {msg && (
        <div className={`assign-msg alert alert-${msg.type}`}>{msg.text}</div>
      )}
    </div>
  );
}


function InstructorCard({ instructor, isAdmin = false }) {
  const [open, setOpen] = useState(false);

  const { instructorId, instructorName, avgRating, feedbackCount } = instructor;
  const badge = getPerfBadge(avgRating);
  const user = getUserFromToken();

  user?.role === "ADMIN" && console.log("Current user is admin.");
  user?.role !== "ADMIN" && console.log("Current user is NOT admin.");

  return (
    <div className="instructor-card">
      <div className="instructor-card-body">
        <div className="instructor-card-top">
          <div className="instructor-avatar">{getInitials(instructorName)}</div>
          <div>
            <div className="instructor-name">{instructorName}</div>
            <div className="instructor-meta">
              {feedbackCount ?? 0} feedbacks
            </div>
          </div>
        </div>

        <div className="star-row">
          <span className="stars">{renderStars(avgRating)}</span>
          <span className="star-value">
            {avgRating != null && avgRating > 0 ? avgRating.toFixed(1) : "—"}
          </span>
        </div>

        <span className={`perf-badge ${badge.cls}`}>{badge.label}</span>
      </div>

      <button
        className="instructor-expand-btn"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "▲ Hide Feedback" : "▼ View Feedback"}
      </button>

      {open && <FeedbackPanel instructorId={instructorId} />}


      {console.log("IS ADMIN: ", isAdmin)}

      {open && isAdmin && <AssignPanel instructor={instructor} />}
    </div>
  );
}

export default InstructorCard;
