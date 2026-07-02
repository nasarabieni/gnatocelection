import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL ||
        (window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1' ? 'http://127.0.0.1:8000/api'
            : 'https://gnat-production.up.railway.app/api'),
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const checkElectionRegister = (staffId) => {
    return api.post('/elections/check/', {staff_id: staffId});
};

export const uploadElectionRegister = (formData) => {
    return api.post('/elections/upload_excel/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export default api;
