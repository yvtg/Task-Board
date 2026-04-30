import axios from "axios"

export const axiosClient = axios.create({
    // Use relative path so nginx can proxy /api -> backend in Docker.
    baseURL: "/api",
    timeout: 5000,
    headers: {'Content-Type': 'application/json'}
});