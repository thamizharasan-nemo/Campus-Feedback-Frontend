import { useEffect, useState } from "react";

import {
  searchCourses,
  getPopularCourses,
  getAllUnassignedCoursesByInstitution,
  getCoursesNotAssigned,
  getCoursesWithoutFeedback,
} from "../../../services/CourseService";

import {
  getTotalCourses,
  getTotalInstructors,
  getTotalFeedbacks,
} from "../../../services/InstitutionService";
import CourseTable from "../Components/CourseTable";
import CourseAnalytics from "../Components/CourseAnalytics";
import PopularCourses from "../Components/PopularCourses";

import "../../../styles/institution/InstitutionCourses.css";

const TABS = [
  { id: "all", label: "All Courses" },
  { id: "unassigned", label: "No Instructor" },
  { id: "no-feedback", label: "No Feedback" },
];

function InstitutionCourses() {
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalInstructors, setTotalInstructors] = useState(0);
  const [totalFeedbacks, setTotalFeedbacks] = useState(0);

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const PAGE_SIZE = 8;

  const [sortBy, setSortBy] = useState("courseName");
  const [sortDir, setSortDir] = useState("ASC");

  const [searchInput, setSearchInput] = useState("");
  const [keyword, setKeyword] = useState("");

  const [activeTab, setActiveTab] = useState("all");

  const [popularCourses, setPopularCourses] = useState([]);

  useEffect(() => {
    Promise.allSettled([
      getTotalCourses(),
      getTotalInstructors(),
      getTotalFeedbacks(),
    ]).then(([course, instructor, feedback]) => {
      setTotalCourses(course.status === "fulfilled" ? course.value : 0);
      setTotalInstructors(
        instructor.status === "fulfilled" ? instructor.value : 0,
      );
      setTotalFeedbacks(feedback.status === "fulfilled" ? feedback.value : 0);
    });

    getPopularCourses(0, 6)
      .then((result) => {
        console.log("Result data: ", result);
        setPopularCourses(result?.content ?? []);
      })
      .catch(() => setPopularCourses([]));
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [activeTab, page, sortBy, sortDir, keyword]);

  const fetchCourses = async () => {
    setLoading(true);
    setError("");
    try {
      if (activeTab === "all") {
        const res = await searchCourses({
          page,
          size: PAGE_SIZE,
          sortBy,
          sortDirection: sortDir,
          keyword,
        });
        setCourses(res?.content ?? []);
        setTotalPages(res?.totalPages ?? 0);
      } else if (activeTab === "unassigned") {
        const res = await getCoursesNotAssigned();
        setCourses(Array.isArray(res) ? res : []);
        setTotalPages(0);
      } else if (activeTab === "no-feedback") {
        const res = await getCoursesWithoutFeedback();
        setCourses(Array.isArray(res) ? res : []);
        setTotalPages(0);
      }
    } catch {
      setError("Failed to load courses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(0);
    setKeyword(searchInput.trim());
  };

  const handleClear = () => {
    setSearchInput("");
    setKeyword("");
    setPage(0);
  };

  const handleSort = (col) => {
    if (sortBy === col) {
      setSortDir((d) => (d === "ASC" ? "DESC" : "ASC"));
    } else {
      setSortBy(col);
      setSortDir("ASC");
    }
    setPage(0);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setPage(0);
    setKeyword("");
    setSearchInput("");
  };

  const isPaginated = activeTab === "all" && totalPages > 1;

  return (
    <div className="courses-page">
      <div className="courses-page-header">
        <h2>Institution Courses</h2>
        <p>Browse, search, and monitor all courses in your institution.</p>
      </div>

      <CourseAnalytics
        totalCourses={totalCourses}
        totalFeedbacks={totalFeedbacks}
        totalInstructors={totalInstructors}
      />

      <div className="courses-toolbar">
        {activeTab === "all" && (
          <form style={{ display: "flex", gap: 8 }} onSubmit={handleSearch}>
            <input
              className="courses-search-input"
              type="text"
              placeholder="Search by course name…"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit" className="btn-search">
              Search
            </button>
            {keyword && (
              <button type="button" className="btn-clear" onClick={handleClear}>
                Clear
              </button>
            )}
          </form>
        )}

        <div className="courses-tab-group">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`tab-btn ${activeTab === t.id ? "active" : ""}`}
              onClick={() => handleTabChange(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" style={{ marginBottom: 16 }}>
          {error}
        </div>
      )}

      {loading && (
        <div
          style={{
            padding: "40px 0",
            textAlign: "center",
            color: "#6c757d",
            fontSize: 14,
          }}
        >
          Loading courses…
        </div>
      )}

      {!loading && (
        <CourseTable
          courses={courses}
          sortBy={sortBy}
          sortDir={sortDir}
          onSort={handleSort}
        />
      )}

      {isPaginated && !loading && (
        <div className="courses-pagination">
          <button
            onClick={() => setPage((page) => page - 1)}
            disabled={page === 0}
          >
            ← Prev
          </button>
          <span className="page-info">
            Page {page + 1} of {totalPages}
          </span>
          <button
            onClick={() => setPage((page) => page + 1)}
            disabled={page >= totalPages - 1}
          >
            Next →
          </button>
        </div>
      )}

      {popularCourses.length > 0 && (
        <>
          <div className="courses-section-sep" />
          <PopularCourses courses={popularCourses} />
        </>
      )}
    </div>
  );
}

export default InstitutionCourses;
