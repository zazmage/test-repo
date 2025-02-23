import { fetchBlogPosts } from './api.js';
import { createAdminCard } from './cards.js';
import { getCurrentUser } from './auth.js';

const user = getCurrentUser();

if (!user) {
  window.location.href = '/account/login.html';
}

const userName = document.getElementById('user-name');
const userAvatar = document.getElementById('user-avatar');

const renderCards = (posts, containerSelector) => {
  const container = document.querySelector(containerSelector);
  const fragment = document.createDocumentFragment();

  posts.forEach(post => {
    const card = createAdminCard(post.id, post.title, post.media.url, post.body);
    fragment.appendChild(card);
  });

  container.appendChild(fragment);
};

document.addEventListener('DOMContentLoaded', async () => {
  userName.textContent = user.name;
  userAvatar.src = user.avatar.url;
  userAvatar.alt = user.avatar.alt;
  const posts = await fetchBlogPosts()
  if (posts) renderCards(posts, '#admin-posts-cards-container');
});