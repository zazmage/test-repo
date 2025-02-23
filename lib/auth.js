export function getCurrentUser() {
  const userJson = localStorage.getItem('currentUser');
  return userJson ? JSON.parse(userJson) : null;
}

export async function registerUser(userData) {
  try {
    const res = await fetch('https://v2.api.noroff.dev/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return await res.json();
  } catch (error) {
    console.error("Registration error:", error);
    return { errors: [{ message: 'Unexpected error.' }] };
  }
}

export async function loginUser(userData) {
  try {
    const res = await fetch('https://v2.api.noroff.dev/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return await res.json();
  } catch (error) {
    console.error("Login error:", error);
    return { errors: [{ message: "Unexpected error." }] };
  }
}

export function logoutUser() {
  if (confirm('Are you sure you want to logout?')) {
    localStorage.removeItem('currentUser');
    window.location.href = '/account/login.html';
  }
}

export const checkLoggedUser = () => {
  if (getCurrentUser()) {
    window.location.href = '/post/admin-posts.html';
  }
}