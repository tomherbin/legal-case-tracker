// apiService.js
import axios from "axios";

const API_URL = "http://localhost:3000/api/cases";

export default {
  // Get all cases
  getCases() {
    return axios.get(API_URL);
  },

  // Get a single case by ID
  getCaseById(caseId) {
    return axios.get(`${API_URL}/${caseId}`);
  },

  // Create a new case
  createCase(newCaseData) {
    return axios.post(API_URL, newCaseData);
  },

  // Update an existing case by ID
  updateCase(caseId, updatedCaseData) {
    return axios.put(`${API_URL}/${caseId}`, updatedCaseData);
  },

  // Delete a case by ID
  deleteCase(caseId) {
    return axios.delete(`${API_URL}/${caseId}`);
  },

  // Add any other API calls related to cases here
};
