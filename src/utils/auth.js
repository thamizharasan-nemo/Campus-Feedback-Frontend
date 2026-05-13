
import {jwtDecode} from "jwt-decode";

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export const getInstitutionId = () => {
  return localStorage.getItem("institutionId");
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("institutionId");
};

export const getUserFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    console.log(token);
    return jwtDecode(token);
  } catch (e) {
    console.error("Invalid token");
    return null;
  }
};