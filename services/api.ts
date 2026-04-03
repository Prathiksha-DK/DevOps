import axios from "axios";

const API = axios.create({
  baseURL: "http://192.168.31.249:8000/api/",
});

export default API;

// Login user
export async function loginUser(mobile: string, password: string) {
  try {
    const res = await API.post("login/", { mobile, password });
    return res.data;
  } catch (error: any) {
    // Optional: handle error and return message
    throw error.response?.data || { error: "Login failed" };
  }
}

// Signup user
export async function signupUser(data: { mobile: string; password: string;[key: string]: any }) {
  try {
    const res = await API.post("signup/", data);
    return res.data;
  } catch (error: any) {
    // Optional: handle error and return message
    throw error.response?.data || { error: "Signup failed" };
  }
}