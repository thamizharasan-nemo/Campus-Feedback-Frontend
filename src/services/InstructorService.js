import api from "../api/api";

const INSTRUCTORS = "/instructors";

export const getInstructorsByInstitution = () =>
    api.get(`${INSTRUCTORS}/institution`);


export const getInstructorById = (instructorId) =>
    api.get(`${INSTRUCTORS}/${instructorId}`);


export const getInstructorEntityById = (instructorId) =>
    api.get(`${INSTRUCTORS}/admin/${instructorId}`);


export const getUnassignedInstructors = () =>
    api.get(`${INSTRUCTORS}/unassigned`);


export const getAssignedCourses = (instructorId) =>
    api.get(`${INSTRUCTORS}/assigned/courses/${instructorId}`);


export const getTopRatedInstructors = () =>
    api.get(`${INSTRUCTORS}/top`);


export const getInstructorCount = () =>
    api.get(`${INSTRUCTORS}/count`);


export const getFeedbacksByInstructor = () =>
    api.get(`${INSTRUCTORS}/feedbacks`);


export const getSoftDeletedInstructors = () =>
    api.get(`${INSTRUCTORS}/soft/deleted`);


export const searchInstructors = ({ instructorId, instructorName, courseName } = {}) =>
    api.get(`${INSTRUCTORS}/search`, {
        params: {
            instructorId:instructorId || undefined,
            instructorName:instructorName || undefined,
            courseName: courseName|| undefined,
        },
    });


export const addInstructor = (requestDTO) =>
    api.post(INSTRUCTORS, requestDTO);


export const updateInstructor = (instructorId, requestDTO) =>
    api.put(`${INSTRUCTORS}/${instructorId}`, requestDTO);

export const deleteInstructor = (instructorId) =>
    api.delete(`${INSTRUCTORS}/${instructorId}`);


export const deleteInstructorPermanently = (instructorId) =>
    api.delete(`${INSTRUCTORS}/${instructorId}/deleted`);


export const restoreInstructor = (instructorId) =>
    api.put(`${INSTRUCTORS}/${instructorId}/restore`);


export const unassignInstructorFromInstitution = (instructorId) =>
    api.delete(`${INSTRUCTORS}/institution/${instructorId}`);

export const assignCourseToInstructor = (instructorId, courseId) =>
    api.put(`${INSTRUCTORS}/course/${courseId}/instructor/${instructorId}`);


export const unassignCourseFromInstructor = (instructorId, courseId) =>
    api.delete(`${INSTRUCTORS}/courses/${courseId}/instructor/${instructorId}`);