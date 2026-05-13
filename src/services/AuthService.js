import api from "../api/api";

const AUTH = "/auth";

export const login = (email, password) => {
  return api.post(`${AUTH}/login`, {
    email,
    password,
  });
}

export const register = (username, identityNo, role, email, password, institutionId) => {
  return api.post(`${AUTH}/register/${institutionId}`, {
    username,
    identityNo,
    role,
    email,
    password,
  });
}

export const registerInstitution = (institutionName, institutionCode, institutionEmail, address, adminName, adminEmail, password, identityNo) => {
  return api.post(`${AUTH}/register/institution`, {
    institutionName,
    institutionCode,
    institutionEmail,
    address,
    adminName,
    adminEmail,
    password,
    identityNo
  });
}

export const refreshToken = () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) return Promise.reject("No refresh token available");
  return api.post(`${AUTH}/refresh`, {
    refreshToken
  });
}

