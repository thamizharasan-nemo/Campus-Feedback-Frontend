import React from "react";

const StarRating = ({
  rating = 0,
  setRating,
  size = "1.2rem",
  readOnly = false,
}) => {
  return (
    <div style={{ display: "inline-flex", alignItems: "center" }}>
      {[1, 2, 3, 4, 5].map((value) => {
        const filled = value <= rating;

        return (
          <span
            key={value}
            onClick={
              !readOnly && setRating ? () => setRating(value) : undefined
            }
            style={{
              cursor: readOnly ? "default" : "pointer",
              fontSize: size,
              color: filled ? "#fbbf24" : "#d1d5db",
              marginRight: "2px",
              userSelect: "none",
            }}
          >
            {filled ? "★" : "☆"}
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;


