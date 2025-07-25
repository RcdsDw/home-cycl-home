/* eslint-disable no-throw-literal */
const API_URL = process.env.REACT_APP_API_URL;

export async function createZone(values) {
    try {
        const response = await fetch(`${API_URL}/zones/new`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });

        const data = await response.json();

        if (!response.ok) {
            throw {
                status: response.status,
                data: data,
            };
        }

        return data;
    } catch (error) {
        throw error;
    }
}

export async function updateZone(id, values) {
    try {
        const response = await fetch(`${API_URL}/zones/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });

        const data = await response.json();

        if (!response.ok) {
            throw {
                status: response.status,
                data: data,
            };
        }

        return data;
    } catch (error) {
        throw error;
    }
}

export async function deleteZone(id) {
    try {
        const response = await fetch(`${API_URL}/zones/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw {
                status: response.status,
                data: data,
            };
        }

        return data;
    } catch (error) {
        throw error;
    }
}

export async function getZoneById(id) {
    try {
        const response = await fetch(`${API_URL}/zones/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw {
                status: response.status,
                data: data,
            };
        }

        return data;
    } catch (error) {
        throw error;
    }
}

export async function getZones() {
    try {
        const response = await fetch(`${API_URL}/zones`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw {
                status: response.status,
                data: data,
            };
        }

        return data;
    } catch (error) {
        throw error;
    }
}
