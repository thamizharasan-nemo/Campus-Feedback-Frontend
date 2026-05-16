import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";
import PublicCourses from "./pages/public/PublicCourses";
import PublicInstructors from "./pages/public/PublicInstructors";
import Login from "./auth/pages/Login";
import Register from "./auth/pages/Register";
import InstitutionLogin from "./pages/Institution/pages/InstitutionLogin";

import { InstitutionLayout } from "./pages/Institution/Components/InstitutionLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
import DashboardRouter from "./routes/DashboardRouter";

import InstitutionDashboard from "./pages/Institution/pages/InstitutionDashboard";
import InstitutionCourses from "./pages/Institution/pages/InstitutionCourses";
import InstitutionManagement from "./pages/Institution/pages/InstitutionManagement";

import StudentDashboard from "./pages/Student/pages/StudentDashboard";
import StudentCourses from "./pages/Student/pages/StudentCourses";
import FeedbackForm from "./pages/Student/pages/FeedbackForm";
import CourseDetailsPage from "./components/course/CourseDetailsPage";
import { logout as authLogout } from "./utils/auth";
import AdminInstructors from "./pages/Instructor/pages/AdminInstructors";
import StudentInstructors from "./pages/Instructor/pages/StudentInstructors";
import About from "./pages/public/About";
import Features from "./pages/public/Features";
import InstitutionRegister from "./pages/Institution/pages/InstitutionRegister";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem("token")
    );

    const handleLogout = () => {
        authLogout();
        setIsAuthenticated(false);
    };

    return (
        <div className="app-layout">
            <BrowserRouter>
                <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />

                <main className="app-content">
                    <Routes>

                        {/* Root */}
                        <Route path="/" element={<DashboardRouter />} />

                        {/* Public */}
                        <Route path="/courses" element={<PublicCourses />} />
                        <Route path="/courses/:courseId" element={<CourseDetailsPage />} />
                        <Route path="/instructors" element={<PublicInstructors />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/features" element={<Features />} />

                        {/* Auth */}
                        <Route
                            path="/login"
                            element={<Login setIsAuthenticated={setIsAuthenticated} />}
                        />
                        <Route path="/register" element={<Register />} />

                        {/* Institution */}
                        <Route path="/institution" element={<InstitutionLayout />}>
                            <Route index element={<InstitutionLogin />} />


            <Route path="/institution/register" element={<InstitutionRegister />} />

                            <Route
                                path="dashboard"
                                element={
                                    <ProtectedRoute role="ADMIN">
                                        <InstitutionDashboard />
                                    </ProtectedRoute>
                                }
                            />

                            <Route
                                path="courses"
                                element={
                                    <ProtectedRoute role="ADMIN">
                                        <InstitutionCourses />
                                    </ProtectedRoute>
                                }
                            />

                            <Route
                                path="instructors"
                                element={
                                    <ProtectedRoute role="ADMIN">
                                        <AdminInstructors />
                                    </ProtectedRoute>
                                }
                            />

                            <Route
                                path="manage"
                                element={
                                    <ProtectedRoute>
                                        <InstitutionManagement />
                                    </ProtectedRoute>
                                }
                            />
                        </Route>

                        {/* Student */}
                        <Route path="/student">
                            <Route
                                path="dashboard"
                                element={
                                    <ProtectedRoute role="STUDENT">
                                        <StudentDashboard />
                                    </ProtectedRoute>
                                }
                            />

                            <Route
                                path="courses"
                                element={
                                    <ProtectedRoute role="STUDENT">
                                        <StudentCourses/>
                                    </ProtectedRoute>
                                }
                            />

                            <Route path={"instructors"} element={
                                <ProtectedRoute role="STUDENT">
                                    <StudentInstructors/>
                                </ProtectedRoute>
                            }
                            />

                            <Route
                                path="feedback"
                                element={
                                    <ProtectedRoute role="STUDENT">
                                        <FeedbackForm/>
                                    </ProtectedRoute>
                                }
                            />
                        </Route>

                    </Routes>
                </main>

                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;