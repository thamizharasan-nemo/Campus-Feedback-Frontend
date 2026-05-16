function CourseAnalytics({ totalCourses, totalFeedbacks, totalInstructors }) {
  const stats = [
    { label: "Total Courses", value: totalCourses, emoji: "📚" },
    { label: "Total Feedbacks", value: totalFeedbacks, emoji: "💬" },
    { label: "Total Instructors", value: totalInstructors, emoji: "👨‍🏫" },
  ];

  return (
    <div className="courses-stat-strip">
      {stats.map((s) => (
        <div className="courses-stat-box" key={s.label}>
          <span style={{ fontSize: 22 }}>{s.emoji}</span>
          <span className="stat-num">{s.value ?? 0}</span>
          <div className="stat-lbl">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

export default CourseAnalytics;
