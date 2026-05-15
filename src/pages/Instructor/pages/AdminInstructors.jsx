import { useState, useEffect } from "react";
import {
  getInstructorsByInstitution,
  searchInstructors,
} from "../../../services/InstructorService";
import InstructorCard from "../components/InstructorCard";
import "../../../styles/instructors/Instructors.css";


function AdminInstructors() {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [keyword, setKeyword]         = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");

    const request = keyword.trim()
      ? searchInstructors({ instructorName: keyword.trim() })
      : getInstructorsByInstitution();

    request
      .then((data) => {
        if (!cancelled) setInstructors(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (!cancelled) setError("Failed to load instructors.");
      })
      .finally(() => !cancelled && setLoading(false));

    return () => { cancelled = true; };
  }, [keyword]);

  const handleSearch = (e) => {
    e.preventDefault();
    setKeyword(searchInput);
  };

  const handleClear = () => {
    setSearchInput("");
    setKeyword("");
  };

  return (
    <div className="instructors-page container">

      <h3 className="fw-bold">Manage Instructors</h3>
      <p className="page-sub">View feedback and assign or unassign courses for each instructor.</p>

      {/* Search */}
      <form className="instructor-search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by name…"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button type="submit" className="btn btn-primary btn-sm">Search</button>
        {keyword && (
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={handleClear}
          >
            Clear
          </button>
        )}
      </form>

      {/* States */}
      {loading && <div className="instructors-state">Loading instructors…</div>}

      {error && (
        <div className="alert alert-danger" style={{ maxWidth: 440 }}>{error}</div>
      )}

      {!loading && !error && instructors.length === 0 && (
        <div className="instructors-state">
          {keyword
            ? `No instructors found for "${keyword}".`
            : "No instructors found in your institution."}
        </div>
      )}

      {/* Grid */}
      {!loading && !error && instructors.length > 0 && (
        <div className="instructor-grid">
          {instructors.map((inst) => (
            <InstructorCard
              key={inst.instructorId}
              instructor={inst}
              isAdmin={true}
            />
          ))}
        </div>
      )}

    </div>
  );
}

export default AdminInstructors;