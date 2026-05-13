import api from "../api/api";

const FEEDBACKS = "/feedbacks";

export const getMyFeedbacks = ({page, size}) => {
  return api.get(`${FEEDBACKS}/me`, {
    params: {
      page,
      size,
      sort: "submittedAt,DESC",
    },
  });
};


export const getFeedbacksByCourse = ({
  courseId,
  page = 0,
  size = 10,
  sort = "submittedAt,DESC",
}) => {
  return api.get(`${FEEDBACKS}/course/${courseId}`, {
    params: { page, size, sort },
  });
};

export const getAllFeedbacksToInstructor = ({instructorId, page = 0, size = 10}) => {
  return api.get(`${FEEDBACKS}/instructor`, {params: {instructorId, page, size}})
}

export const submitFeedback = (feedbackDTO) =>
  api.post(FEEDBACKS, feedbackDTO);

export const fetchFeedbacksByStudentAndCourse = (courseId) =>
  api.get(`${FEEDBACKS}/courses/${courseId}/feedbacks`);

export const deleteFeedback = (feedbackId) => {
   api.delete(`${FEEDBACKS}/${feedbackId}`);
};
