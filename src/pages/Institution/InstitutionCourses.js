import { useEffect, useState } from "react";

import {
  searchCourses,
  getPopularCourses,
  getAllUnassignedCoursesByInstitution,
  getCoursesNotAssigned,
  getCoursesWithoutFeedback,
} from "../../services/CourseService"; // adjust path

import {
  getTotalCourses,
  getTotalInstructors,
  getTotalFeedbacks,
} from "../../services/InstitutionService"; // adjust path

import CourseTable    from "./Components/CourseTable";    // adjust path
import CourseAnalytics from "./Components/CourseAnalytics"; // adjust path
import PopularCourses from "./Components/PopularCourses";   // adjust path

import "../../styles/InstitutionCourses.css";

/*
  Tabs:
    "all"         — paginated search (GET /courses/institution/search)
    "unassigned"  — no instructor yet (GET /courses/instructor)
    "no-feedback" — no feedback yet  (GET /courses/feedbacks)
*/

const TABS = [
  { id: "all",         label: "All Courses" },
  { id: "unassigned",  label: "No Instructor" },
  { id: "no-feedback", label: "No Feedback" },
];

function InstitutionCourses() {
  // ── Stats ──
  const [totalCourses, setTotalCourses]         = useState(0);
  const [totalInstructors, setTotalInstructors] = useState(0);
  const [totalFeedbacks, setTotalFeedbacks]     = useState(0);

  // ── Main table ──
  const [courses, setCourses]     = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState("");

  // ── Pagination ──
  const [page, setPage]           = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const PAGE_SIZE = 8;

  // ── Sort ──
  const [sortBy, setSortBy]       = useState("courseName");
  const [sortDir, setSortDir]     = useState("ASC");

  // ── Search ──
  const [searchInput, setSearchInput] = useState("");
  const [keyword, setKeyword]         = useState("");

  // ── Tab ──
  const [activeTab, setActiveTab]   = useState("all");

  // ── Popular courses ──
  const [popularCourses, setPopularCourses] = useState([]);

  // ── Load stats once ──
  useEffect(() => {
    Promise.allSettled([
      getTotalCourses(),
      getTotalInstructors(),
      getTotalFeedbacks(),
    ]).then(([c, i, f]) => {
      setTotalCourses(c.status === "fulfilled" ? c.value : 0);
      setTotalInstructors(i.status === "fulfilled" ? i.value : 0);
      setTotalFeedbacks(f.status === "fulfilled" ? f.value : 0);
    });

    getPopularCourses(0, 6)
      .then((res) => {
        console.log("Result data: ", res);
        setPopularCourses(res?.content ?? []);
      })
      .catch(() => setPopularCourses([]));
  }, []);

  // ── Load courses on tab / page / sort / keyword change ──
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
        // res is PageResponseDTO: { content, totalPages, ... }
        setCourses(res?.content ?? []);
        setTotalPages(res?.totalPages ?? 0);

      } else if (activeTab === "unassigned") {
        // GET /courses/instructor — courses without any instructor
        const res = await getCoursesNotAssigned();
        setCourses(Array.isArray(res) ? res : []);
        setTotalPages(0);

      } else if (activeTab === "no-feedback") {
        // GET /courses/feedbacks — courses that have no feedback
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

  // ── Handlers ──
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

      {/* Page header */}
      <div className="courses-page-header">
        <h2>Institution Courses</h2>
        <p>Browse, search, and monitor all courses in your institution.</p>
      </div>

      {/* Stat strip */}
      <CourseAnalytics
        totalCourses={totalCourses}
        totalFeedbacks={totalFeedbacks}
        totalInstructors={totalInstructors}
      />

      {/* Toolbar */}
      <div className="courses-toolbar">
        {/* Search (only for "all" tab) */}
        {activeTab === "all" && (
          <form style={{ display: "flex", gap: 8 }} onSubmit={handleSearch}>
            <input
              className="courses-search-input"
              type="text"
              placeholder="Search by course name…"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit" className="btn-search">Search</button>
            {keyword && (
              <button type="button" className="btn-clear" onClick={handleClear}>Clear</button>
            )}
          </form>
        )}

        {/* Tab group */}
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

      {/* Error */}
      {error && (
        <div className="alert alert-danger" style={{ marginBottom: 16 }}>{error}</div>
      )}

      {/* Loading */}
      {loading && (
        <div style={{ padding: "40px 0", textAlign: "center", color: "#6c757d", fontSize: 14 }}>
          Loading courses…
        </div>
      )}

      {/* Table */}
      {!loading && (
        <CourseTable
          courses={courses}
          sortBy={sortBy}
          sortDir={sortDir}
          onSort={handleSort}
        />
      )}

      {/* Pagination (only for "all" tab) */}
      {isPaginated && !loading && (
        <div className="courses-pagination">
          <button onClick={() => setPage((p) => p - 1)} disabled={page === 0}>
            ← Prev
          </button>
          <span className="page-info">Page {page + 1} of {totalPages}</span>
          <button onClick={() => setPage((p) => p + 1)} disabled={page >= totalPages - 1}>
            Next →
          </button>
        </div>
      )}

      {/* Popular courses */}
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