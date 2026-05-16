import { useState } from "react";
import "../../styles/course/CourseSearchBar.css";

const CourseSearchBar = ({
  placeholder = "Search courses...",
  onSearch,
}) => {
  const [text, setText] = useState("");

  const handleSearch = () => {
    onSearch(text.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="course-search">
      <input
        type="text"
        className="course-search-input"
        placeholder={placeholder}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button className="course-search-btn" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default CourseSearchBar;
