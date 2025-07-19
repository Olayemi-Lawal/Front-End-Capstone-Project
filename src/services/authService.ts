private storageKey = 'moviehub_user'; // define this at the top of your class

async login(email: string, password: string): Promise<User> {
  const response = await fetch('https://capstone-back-end-1-bbvp.onrender.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }

  localStorage.setItem(this.storageKey, JSON.stringify(data));
  return data;
}

async register(name: string, email: string, password: string): Promise<User> {
  const response = await fetch('https://capstone-back-end-1-bbvp.onrender.com/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Registration failed');
  }

  localStorage.setItem(this.storageKey, JSON.stringify(data));
  return data;
}
