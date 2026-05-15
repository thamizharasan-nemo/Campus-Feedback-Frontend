
function StudentCourseTable({ courses, onSort, sortBy, sortDir }) {
  const arrow = sortDir === "ASC" ? "⬆" : "⬇";

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover mt-3">
        <thead className="table-light">
          <tr>
            <th
              role="button"
              onClick={() => onSort("courseName")}
            >
              Course Name {sortBy === "courseName" && arrow}
            </th>

            <th>Description</th>

            <th
              role="button"
              onClick={() => onSort("avgRating")}
            >
              Avg Rating {sortBy === "avgRating" && arrow}
            </th>

            <th>Feedback Count</th>
          </tr>
        </thead>

        <tbody>
          {!courses || courses.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">
                No courses found
              </td>
            </tr>
          ) : (
            courses.map((course) => (
              <tr key={course.courseId}>
                <td>{course.courseName}</td>
                <td>{course.courseDescription || "—"}</td>
                <td>{course.avgRating?.toFixed(1) || "—"}</td>
                <td>{course.feedbackCount || 0}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StudentCourseTable;
