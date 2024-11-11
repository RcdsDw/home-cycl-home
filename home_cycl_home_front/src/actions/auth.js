export async function authRegister(values) {
    try {
      const response = await fetch('http://localhost:3333/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

export async function authLogin(values) {
    try {
      const response = await fetch('http://localhost:3333/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
  
  