import { fetchBlogPosts } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
  const imgEl = document.getElementById('carousel-img');
  const captionEl = document.getElementById('carousel-caption');
  const leftBtn = document.getElementById('left-btn');
  const rightBtn = document.getElementById('right-btn');
  let currentIdx = 0, posts = [];

  const updateCarousel = () => {
    if (!posts.length) return;
    const post = posts[currentIdx];
    imgEl.src = post.media.url;
    imgEl.alt = post.title;
    captionEl.textContent = post.title;
    // Attach click event to navigate to the post detail
    imgEl.onclick = () => {
      window.location.href = `/single-post.html?id=${post.id}`;
    };
  };

  leftBtn.addEventListener('click', () => {
    currentIdx = (currentIdx - 1 + posts.length) % posts.length;
    updateCarousel();
  });

  rightBtn.addEventListener('click', () => {
    currentIdx = (currentIdx + 1) % posts.length;
    updateCarousel();
  });

  fetchBlogPosts().then(fetchedPosts => {
    if (fetchedPosts && fetchedPosts.length > 0) {
      posts = fetchedPosts.slice(0, 3);
      updateCarousel();
    }
  });
});
