/* CourseTable.jsx */

function CourseTable({ courses, sortBy, sortDir, onSort }) {
  const arrow = (col) => {
    if (sortBy !== col) return " ↕";
    return sortDir === "ASC" ? " ↑" : " ↓";
  };

  return (
    <div className="courses-table-wrap">
      <table className="courses-table">
        <thead>
          <tr>
            <th className="sortable" onClick={() => onSort("courseName")}>
              Course Name{arrow("courseName")}
            </th>
            <th>Instructor</th>
            <th>Description</th>
            <th className="sortable" onClick={() => onSort("avgRating")}>
              Rating{arrow("avgRating")}
            </th>
            <th className="sortable" onClick={() => onSort("feedbackCount")}>
              Feedbacks{arrow("feedbackCount")}
            </th>
          </tr>
        </thead>

        <tbody>
          {courses.length === 0 ? (
            <tr className="courses-empty-row">
              <td colSpan="5">No courses found.</td>
            </tr>
          ) : (
            courses.map((course) => (
              <tr key={course.courseId}>
                <td style={{ fontWeight: 600 }}>{course.courseName}</td>

                <td>
                  {course.instructorName ? (
                    <span className="instructor-badge assigned">
                      {course.instructorName}
                    </span>
                  ) : (
                    <span className="instructor-badge unassigned">Unassigned</span>
                  )}
                </td>

                <td style={{ color: "#6c757d", fontSize: 13 }}>
                  {course.courseDescription
                    ? course.courseDescription.length > 50
                      ? course.courseDescription.slice(0, 50) + "…"
                      : course.courseDescription
                    : "—"}
                </td>

                <td>
                  {course.avgRating > 0 ? (
                    <span className="rating-pill">
                      ⭐ {course.avgRating.toFixed(1)}
                    </span>
                  ) : (
                    <span style={{ color: "#9ca3af", fontSize: 13 }}>No rating</span>
                  )}
                </td>

                <td style={{ color: "#374151" }}>{course.feedbackCount ?? 0}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CourseTable;