const BASE_URL = 'https://localhost/auth'

const login = async (email, password) => {
    const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    return data;
};

const register = async (lastname, firstname, email, password) => {
    const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lastname, firstname, email, password }),
    });
    const data = await response.json();
    return data;
};

const getCurrentUser = async (token) => {
    const response = await fetch(`${BASE_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    return data;
};

export { login, register, getCurrentUser };