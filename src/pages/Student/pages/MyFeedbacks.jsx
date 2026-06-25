import React, { useEffect, useState, useCallback } from "react";
import { Card, Button, Spinner, Pagination } from "react-bootstrap";
import {
  getMyFeedbacks,
  deleteFeedback,
} from "../../../services/FeedbackService";

const MyFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

const loadFeedbacks = useCallback(async () => {
  setLoading(true);

    try {
      const res = await getMyFeedbacks(page, size);

      console.log("Feedbacks loaded:", res);

      setFeedbacks(res.content);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error("Failed to load feedbacks", err);
    } finally {
      setLoading(false);
    }
}, [page, size]);

  useEffect(() => {
  loadFeedbacks();
}, [loadFeedbacks]);

  const handleDelete = async (feedbackId) => {
    if (!window.confirm("Delete this feedback?")) return;

    setDeletingId(feedbackId);
    try {
      await deleteFeedback(feedbackId);
      loadFeedbacks();
    } catch (err) {
      console.error("Delete failed", err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <Card className="shadow-sm border-0">
      <Card.Body>
        <Card.Title className="fw-bold text-success mb-3">
          📝 My Feedbacks
        </Card.Title>

        {loading ? (
          <div className="text-center py-4">
            <Spinner animation="border" size="sm" />
          </div>
        ) : feedbacks.length > 0 ? (
          <>
            {feedbacks.map((feedback) => (
              <Card key={feedback.feedbackId} className="mb-3 border-light shadow-sm">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h6 className="fw-bold">{feedback.courseName}</h6>
                      <small className="text-muted">
                        Instructor: {feedback.instructorName || "No instructor assigned"}
                      </small>

                      <div className="mt-2">
                        {[...Array(feedback.courseRating)].map((_, i) => (
                          <span key={i} className="text-warning">
                            ★
                          </span>
                        ))}

                        {[...Array(5 - feedback.courseRating)].map((_, i) => (
                          <span key={i} className="text-secondary">
                            ☆
                          </span>
                        ))}
                      </div>

                      <p className="mt-2 mb-1">{feedback.courseComment}</p>
                      <small className="text-muted">
                        Submitted on{" "}
                        {new Date(feedback.submittedAt).toLocaleDateString()}
                      </small>
                    </div>

                    <Button
                      size="sm"
                      variant="outline-danger"
                      disabled={deletingId === feedback.feedbackId}
                      onClick={() => handleDelete(feedback.feedbackId)}
                    >
                      {deletingId === feedback.feedbackId ? "Deleting..." : "Delete"}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ))}

            <Pagination className="justify-content-center mt-3">
              <Pagination.Prev
                disabled={page === 0}
                onClick={() => setPage(page - 1)}
              />
              <Pagination.Item active>
                {page + 1} / {totalPages}
              </Pagination.Item>
              <Pagination.Next
                disabled={page === totalPages - 1}
                onClick={() => setPage(page + 1)}
              />
            </Pagination>
          </>
        ) : (
          <p className="text-muted mb-0">No feedback submitted yet.</p>
        )}
      </Card.Body>
    </Card>
  );
};

export default MyFeedbacks;
