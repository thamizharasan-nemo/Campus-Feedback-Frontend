import api from "../api/api";

const COURSES = "/courses";

// ── FETCH ─────────────────────────────────────────────────────────────────────

/** GET /courses/{courseId} → CourseResponseDTO */
export const getCourseById = (courseId) =>
  api.get(`${COURSES}/${courseId}`);

/** GET /courses/id/{courseId} → Course entity (ADMIN | STUDENT) */
export const getCourseEntityById = (courseId) =>
  api.get(`${COURSES}/id/${courseId}`);

/** GET /courses/all/sorted?sortBy=&sortDirection= → List<CourseResponseDTO> */
export const getAllCourses = ({ sortBy = "courseName", sortDirection = "ASC" } = {}) =>
  api.get(`${COURSES}/all/sorted`, { params: { sortBy, sortDirection } });

/** GET /courses/all → List<CourseResponseDTO> (public, permitAll) */
export const getAllCoursesPublic = () =>
  api.get(`${COURSES}/all`);

/** GET /courses/all/institution → List<CourseResponseDTO> (ADMIN, JWT-scoped) */
export const getCoursesByInstitution = () =>
  api.get(`${COURSES}/all/institution`);

/** GET /courses/all/unassigned/institution → List<CourseResponseDTO> */
export const getAllUnassignedCoursesByInstitution = () =>
  api.get(`${COURSES}/all/unassigned/institution`);

/** GET /courses/soft/deleted → List<CourseResponseDTO> */
export const getSoftDeletedCourses = () =>
  api.get(`${COURSES}/soft/deleted`);

// ── SEARCH ────────────────────────────────────────────────────────────────────

/**
 * GET /courses/institution/search (pageable)
 * @param {{ page, size, sortBy, sortDirection, courseId, courseName, instructorId, instructorName }} params
 */
export const searchCourses = ({
  page = 0,
  size = 10,
  sortBy = "courseId",
  sortDirection = "ASC",
  keyword = "",
  courseId,
  instructorId,
  instructorName,
} = {}) =>
  api.get(`${COURSES}/institution/search`, {
    params: {
      page,
      size,
      sortBy,
      sortDirection,
      courseName:     keyword       || undefined,
      courseId:       courseId      || undefined,
      instructorId:   instructorId  || undefined,
      instructorName: instructorName || undefined,
    },
  });

/**
 * GET /courses/param — multi-param search, returns List<CourseResponseDTO>
 * @param {{ courseId, instructorId, courseName, instructorName }} params
 */
export const searchCoursesParam = ({ courseId, instructorId, courseName, instructorName } = {}) =>
  api.get(`${COURSES}/param`, {
    params: {
      courseId:       courseId       || undefined,
      instructorId:   instructorId   || undefined,
      courseName:     courseName     || undefined,
      instructorName: instructorName || undefined,
    },
  });

/** GET /courses/name?courseName= → List<CourseResponseDTO> */
export const searchCoursesByName = (courseName) =>
  api.get(`${COURSES}/name`, { params: { courseName } });

// ── ANALYTICS ─────────────────────────────────────────────────────────────────

/** GET /courses/counts/ratings → List<CourseFeedbackCountDTO> */
export const getCourseRatingsAnalytics = () =>
  api.get(`${COURSES}/counts/ratings`);

/**
 * GET /courses/popular?pageNumber=&pageSize= → PageResponseDTO<PopularCourseDTO>
 */
export const getPopularCourses = (pageNumber = 0, pageSize = 5) =>
  api.get(`${COURSES}/popular`, { params: { pageNumber, pageSize } });

/**
 * GET /courses/unpopular?pageNumber=&pageSize= → Slice<PopularCourseDTO>
 */
export const getUnpopularCourses = (pageNumber = 0, pageSize = 5) =>
  api.get(`${COURSES}/unpopular`, { params: { pageNumber, pageSize } });

/**
 * GET /courses/average?avgRating= → List<CourseResponseDTO>
 * Returns courses BELOW the given average (named "LessThan" in backend)
 */
export const getCoursesFilteredByRating = (avgRating = 2.5) =>
  api.get(`${COURSES}/average`, { params: { avgRating } });

/** GET /courses/feedbacks → List<CourseResponseDTO> (courses with no feedback) */
export const getCoursesWithoutFeedback = () =>
  api.get(`${COURSES}/feedbacks`);

/** GET /courses/instructor → List<CourseResponseDTO> (courses with no instructor) */
export const getCoursesNotAssigned = () =>
  api.get(`${COURSES}/instructor`);

// ── CREATE / UPDATE ───────────────────────────────────────────────────────────

/** POST /courses — ADMIN only. requestDTO: { courseName, courseDescription } */
export const addCourse = (requestDTO) =>
  api.post(COURSES, requestDTO);

/** PUT /courses/{courseId} — ADMIN only */
export const updateCourse = (courseId, requestDTO) =>
  api.put(`${COURSES}/${courseId}`, requestDTO);

// ── INSTRUCTOR ASSIGNMENT ─────────────────────────────────────────────────────

/** PUT /courses/{courseId}/instructor/{instructorId} — ADMIN only */
export const assignInstructorToCourse = (courseId, instructorId) =>
  api.put(`${COURSES}/${courseId}/instructor/${instructorId}`);

/** PUT /courses/{courseId}/instructor — unassign instructor */
export const unassignInstructorFromCourse = (courseId) =>
  api.put(`${COURSES}/${courseId}/instructor`);

// ── DELETE / RESTORE ──────────────────────────────────────────────────────────

/** DELETE /courses/{courseId} — soft delete */
export const deleteCourse = (courseId) =>
  api.delete(`${COURSES}/${courseId}`);

/** DELETE /courses/{courseId}/deleted — permanent delete */
export const deleteCoursePermanently = (courseId) =>
  api.delete(`${COURSES}/${courseId}/deleted`);

/** PUT /courses/{courseId}/restore */
export const restoreCourse = (courseId) =>
  api.put(`${COURSES}/${courseId}/restore`);

// ── LEGACY ALIASES (keeps existing callers working) ───────────────────────────
export const getAllCoursesSorted        = getAllCourses;
export const getAllCoursesForStudents   = getAllCoursesPublic;
export const getStudentEnrolledCourses  = () => api.get(`/enrollments${COURSES}/student/enrolled`);