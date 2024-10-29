import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api/v1/", // Replace with your actual API base URL
});

export default api;
