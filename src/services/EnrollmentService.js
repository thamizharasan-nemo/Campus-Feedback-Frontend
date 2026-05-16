import api from "../api/api";

const ENROLLMENTS = "/enrollments";

export const getEnrollmentStatus = (courseId) => {
  return api.get(`${ENROLLMENTS}/${courseId}/enrollment-status`);
};

export const getStudentEnrollments = () =>
  api.get(`${ENROLLMENTS}/student`);

export const enrollToCourse = (courseId) => {
  return api.post(`${ENROLLMENTS}`, {
    courseId,
  });
};

export const unrollFromCourse = (courseId) => {
  return api.delete(`${ENROLLMENTS}/${courseId}`);
};
