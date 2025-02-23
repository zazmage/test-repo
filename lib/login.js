import { checkLoggedUser, loginUser } from "./auth.js";

checkLoggedUser();

const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(loginForm);
  const userData = Object.fromEntries(formData);

  const result = await loginUser(userData);
  const { data, errors } = result;

  if (data) {
    localStorage.setItem('currentUser', JSON.stringify({
      accessToken: data.accessToken,
      email: data.email,
      name: data.name,
      avatar: data.avatar,
    }));
    window.location.href = '/post/admin-posts.html';
  } else if (errors) {
    alert(`Error: ${errors[0].message}`);
  }
});

