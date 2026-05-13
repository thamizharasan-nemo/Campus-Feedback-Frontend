function StudentPagination({ page, totalPages, setPage }) {
  return (
    <div className="d-flex justify-content-center gap-3 mt-4">
      <button
        className="btn btn-outline-primary"
        disabled={page === 0}
        onClick={() => setPage(page - 1)}
      >
        Prev
      </button>

      <span className="align-self-center">
        Page {page + 1} of {totalPages}
      </span>

      <button
        className="btn btn-outline-primary"
        disabled={page === totalPages - 1}
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default StudentPagination;
