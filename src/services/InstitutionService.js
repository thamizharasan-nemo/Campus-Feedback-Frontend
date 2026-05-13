import api from "../api/api";

const INSTITUTION = "/institutions";

export const getInstitutionDashboard = () =>
  // api.get(`${INSTITUTION}/${institutionId}`);
api.get(`${INSTITUTION}/current`);


export const getTotalStudents = () =>
  api.get("/users/institution/students/count");

export const getTotalCourses = () =>
  api.get(`${INSTITUTION}/total/courses`)


export const getTotalInstructors = () =>
  api.get("instructors/count")

export const getTotalFeedbacks = () =>
  api.get("/feedbacks/count")

export const updateInstitution = (institutionData) =>
  api.put(INSTITUTION, institutionData)
