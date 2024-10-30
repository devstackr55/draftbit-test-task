import axios from "axios";

const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000/api/v1/"

const api = axios.create({
  baseURL: BACKEND_BASE_URL, 
});

export default api;
