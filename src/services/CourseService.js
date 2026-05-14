import api from "../api/api";

const COURSES = "/courses";

export const getCourseById = (courseId) =>
  api.get(`${COURSES}/${courseId}`);

export const getCourseEntityById = (courseId) =>
  api.get(`${COURSES}/id/${courseId}`);

export const getAllCourses = ({ sortBy = "courseName", sortDirection = "ASC" } = {}) =>
  api.get(`${COURSES}/all/sorted`, { params: { sortBy, sortDirection } });

export const getAllCoursesPublic = () =>
  api.get(`${COURSES}/all`);

export const getCoursesByInstitution = () =>
  api.get(`${COURSES}/all/institution`);

export const getAllUnassignedCoursesByInstitution = () =>
  api.get(`${COURSES}/all/unassigned/institution`);

export const getSoftDeletedCourses = () =>
  api.get(`${COURSES}/soft/deleted`);


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
      courseName: keyword || undefined,
      courseId: courseId || undefined,
      instructorId: instructorId || undefined,
      instructorName:instructorName || undefined,
    },
  });

export const searchCoursesParam = ({ courseId, instructorId, courseName, instructorName } = {}) =>
  api.get(`${COURSES}/param`, {
    params: {
      courseId: courseId || undefined,
      instructorId: instructorId || undefined,
      courseName: courseName || undefined,
      instructorName: instructorName || undefined,
    },
  });

export const searchCoursesByName = (courseName) =>
  api.get(`${COURSES}/name`, { params: { courseName } });

export const getCourseRatingsAnalytics = () =>
  api.get(`${COURSES}/counts/ratings`);

export const getPopularCourses = (pageNumber = 0, pageSize = 5) =>
  api.get(`${COURSES}/popular`, { params: { pageNumber, pageSize } });


export const getUnpopularCourses = (pageNumber = 0, pageSize = 5) =>
  api.get(`${COURSES}/unpopular`, { params: { pageNumber, pageSize } });


export const getCoursesFilteredByRating = (avgRating = 2.5) =>
  api.get(`${COURSES}/average`, { params: { avgRating } });

export const getCoursesWithoutFeedback = () =>
  api.get(`${COURSES}/feedbacks`);

export const getCoursesNotAssigned = () =>
  api.get(`${COURSES}/instructor`);


export const addCourse = (requestDTO) =>
  api.post(COURSES, requestDTO);

export const updateCourse = (courseId, requestDTO) =>
  api.put(`${COURSES}/${courseId}`, requestDTO);


export const assignInstructorToCourse = (courseId, instructorId) =>
  api.put(`${COURSES}/${courseId}/instructor/${instructorId}`);

export const unassignInstructorFromCourse = (courseId) =>
  api.put(`${COURSES}/${courseId}/instructor`);


export const deleteCourse = (courseId) =>
  api.delete(`${COURSES}/${courseId}`);

export const deleteCoursePermanently = (courseId) =>
  api.delete(`${COURSES}/${courseId}/deleted`);

export const restoreCourse = (courseId) =>
  api.put(`${COURSES}/${courseId}/restore`);

export const getAllCoursesSorted = getAllCourses;
export const getAllCoursesForStudents = getAllCoursesPublic;
export const getStudentEnrolledCourses = () => 
  api.get(`/enrollments${COURSES}/student/enrolled`);