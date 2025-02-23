import { fetchBlogPosts } from './api.js';
import { createCard } from './cards.js';

const renderCards = (posts, containerSelector) => {
  const container = document.querySelector(containerSelector);
  const fragment = document.createDocumentFragment();

  posts.forEach(post => {
    const card = createCard(post.id, post.title, post.media.url, post.body);
    fragment.appendChild(card);
  });

  container.appendChild(fragment);
};

document.addEventListener('DOMContentLoaded', async () => {
  const posts = await fetchBlogPosts()
  renderCards(posts.slice(0, 12), '#posts-cards-container');
});