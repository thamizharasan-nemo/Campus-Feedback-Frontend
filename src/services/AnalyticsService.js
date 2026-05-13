import api from "../api/api";

const ANALYTICS = "/analytics";

export const getAvgCourseRatingLast7Days = () =>
  api.get(`${ANALYTICS}/courses/rating/last-7-days`);

export const getAvgInstructorRatingLast7Days = () =>
  api.get(`${ANALYTICS}/instructors/rating/last-7-days`);

export const getTopCourses = (page = 0, size = 5) =>
  api.get(`${ANALYTICS}/courses/top`, { params: { page, size } });

export const getTopInstructors = (page = 0, size = 5) =>
  api.get(`${ANALYTICS}/instructors/top`, { params: { page, size } });

export const getFeedbackRatings = () =>
  api.get(`${ANALYTICS}/feedbacks/ratings`);
