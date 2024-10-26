import axios from "axios";

const api = axios.create({
  baseURL: "https://api.example.com", // Replace with your actual API base URL
});

export default api;
