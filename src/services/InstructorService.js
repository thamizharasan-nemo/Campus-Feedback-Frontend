import api from "../api/api";

const INSTRUCTORS = "/instructors";

// ── READ ──────────────────────────────────────────────────────────────────────

/** All instructors scoped to the current institution (JWT-based) */
export const getInstructorsByInstitution = () =>
    api.get(`${INSTRUCTORS}/institution`);

/** Single instructor DTO */
export const getInstructorById = (instructorId) =>
    api.get(`${INSTRUCTORS}/${instructorId}`);

/** Raw Instructor entity — admin only */
export const getInstructorEntityById = (instructorId) =>
    api.get(`${INSTRUCTORS}/admin/${instructorId}`);

/** Instructors not yet assigned to any course */
export const getUnassignedInstructors = () =>
    api.get(`${INSTRUCTORS}/unassigned`);

/** List of course names assigned to a specific instructor */
export const getAssignedCourses = (instructorId) =>
    api.get(`${INSTRUCTORS}/assigned/courses/${instructorId}`);

/** Top-rated instructors */
export const getTopRatedInstructors = () =>
    api.get(`${INSTRUCTORS}/top`);

/** Total instructor count for the institution */
export const getInstructorCount = () =>
    api.get(`${INSTRUCTORS}/count`);

/** Feedback summary grouped by instructor */
export const getFeedbacksByInstructor = () =>
    api.get(`${INSTRUCTORS}/feedbacks`);

/** Soft-deleted instructors */
export const getSoftDeletedInstructors = () =>
    api.get(`${INSTRUCTORS}/soft/deleted`);

/**
 * Search instructors
 * @param {{ instructorId?: number, instructorName?: string, courseName?: string }} params
 */
export const searchInstructors = ({ instructorId, instructorName, courseName } = {}) =>
    api.get(`${INSTRUCTORS}/search`, {
        params: {
            instructorId:   instructorId   || undefined,
            instructorName: instructorName || undefined,
            courseName:     courseName     || undefined,
        },
    });

// ── CREATE / UPDATE ───────────────────────────────────────────────────────────

/** Add a new instructor — ADMIN only. requestDTO: { userId } */
export const addInstructor = (requestDTO) =>
    api.post(INSTRUCTORS, requestDTO);

/** Update an instructor — ADMIN only */
export const updateInstructor = (instructorId, requestDTO) =>
    api.put(`${INSTRUCTORS}/${instructorId}`, requestDTO);

// ── DELETE / RESTORE ──────────────────────────────────────────────────────────

/** Soft-delete — ADMIN only */
export const deleteInstructor = (instructorId) =>
    api.delete(`${INSTRUCTORS}/${instructorId}`);

/** Permanent delete — ADMIN only */
export const deleteInstructorPermanently = (instructorId) =>
    api.delete(`${INSTRUCTORS}/${instructorId}/deleted`);

/** Restore soft-deleted instructor */
export const restoreInstructor = (instructorId) =>
    api.put(`${INSTRUCTORS}/${instructorId}/restore`);

/** Unassign instructor from institution — ADMIN only */
export const unassignInstructorFromInstitution = (instructorId) =>
    api.delete(`${INSTRUCTORS}/institution/${instructorId}`);

// ── COURSE ASSIGNMENT ─────────────────────────────────────────────────────────

/**
 * Assign a course to an instructor — ADMIN only
 * PUT /instructors/course/{courseId}/instructor/{instructorId}
 */
export const assignCourseToInstructor = (instructorId, courseId) =>
    api.put(`${INSTRUCTORS}/course/${courseId}/instructor/${instructorId}`);

/**
 * Unassign a course from an instructor
 * DELETE /instructors/courses/{courseId}/instructor/{instructorId}
 */
export const unassignCourseFromInstructor = (instructorId, courseId) =>
    api.delete(`${INSTRUCTORS}/courses/${courseId}/instructor/${instructorId}`);