// ============================================================
// DM Office West Tripura — Feedback Portal Shared Frontend Utility
// ============================================================

// Configuration: Replace with your deployed Google Apps Script Web App URL
const API_URL = "https://script.google.com/macros/s/AKfycbz0iLsi4-sPH0VlQ5m9GVlkSka_dF0k8Q8FHSpdCjPsVJmmqzkSGBTjUhVwM62zclyy/exec"; 

/**
 * Common POST JSON helper for Google Apps Script Web App.
 * Note: Google Apps Script Web App handles CORS by following redirects.
 */
async function apiPost(action, data = {}) {
  const payload = { action, ...data };
  
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8", // text/plain prevents CORS preflight issue with Apps Script
      },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      throw new Error(`Server returned status ${response.status}`);
    }
    
    const result = await response.json();
    return result;
  } catch (err) {
    console.error("API call error:", err);
    return { success: false, error: err.message || "Network error. Please check your connection." };
  }
}

/**
 * Session token management
 */
function getAuthToken() {
  return localStorage.getItem("feedback_token");
}

function setAuthToken(token) {
  localStorage.setItem("feedback_token", token);
}

function clearAuth() {
  localStorage.removeItem("feedback_token");
  localStorage.removeItem("feedback_role");
  localStorage.removeItem("feedback_office");
  localStorage.removeItem("feedback_email");
}

function saveUserInfo(email, role, office) {
  if (email) localStorage.setItem("feedback_email", email);
  if (role) localStorage.setItem("feedback_role", role);
  if (office) localStorage.setItem("feedback_office", office);
}

function checkAuthOrRedirect() {
  const token = getAuthToken();
  if (!token) {
    window.location.href = "login.html";
  }
  return token;
}
