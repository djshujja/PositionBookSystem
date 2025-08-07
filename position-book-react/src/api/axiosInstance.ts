import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL;
if (!baseURL) {
  throw new Error(
    "Missing REACT_APP_API_BASE_URL env var. Please define it in your .env file."
  );
}

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
