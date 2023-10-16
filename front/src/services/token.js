const BASE_URL = 'https://localhost/token'

const refresh = async (refreshToken) => {
    const response = await fetch(`${BASE_URL}/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: refreshToken }),
    });
    const data = await response.json();
    return data;
};

export { refresh };