import { getCurrentUser, logoutUser } from "./auth.js";

const authOptions = document.getElementById('auth-options');
const user = getCurrentUser();

function createNavLink(text, href, clickHandler = null) {
  const li = document.createElement('li');
  const link = document.createElement('a');
  link.href = href;
  link.textContent = text;

  if (clickHandler) {
    link.addEventListener('click', clickHandler);
  }

  li.appendChild(link);
  return li;
}

function createAuthenticatedNav() {
  const profileLink = createNavLink('Profile', '/post/admin-posts.html');
  const logoutLink = createNavLink('Logout', '#', (e) => {
    e.preventDefault();
    logoutUser();
  });

  return [profileLink, logoutLink];
}

function createUnauthenticatedNav() {
  const loginLink = createNavLink('Login', '/account/login.html');
  const registerLink = createNavLink('Register', '/account/register.html');

  return [loginLink, registerLink];
}

document.addEventListener('DOMContentLoaded', () => {
  authOptions.innerHTML = '';

  let navElements;
  if (user) {
    navElements = createAuthenticatedNav();
  } else {
    navElements = createUnauthenticatedNav();
  }
  navElements.forEach(element => authOptions.appendChild(element));
});