import axios from 'axios';
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';
export async function createApplication(payload){const res=await axios.post(`${API_BASE}/api/applications`, payload);return res.data}
export async function listApplications(){const res=await axios.get(`${API_BASE}/api/applications`);return res.data}
