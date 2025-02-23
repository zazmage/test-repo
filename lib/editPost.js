import { fetchSingleBlogPost, updateBlogPost } from './api.js';
import { getCurrentUser } from './auth.js';

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

const form = document.getElementById('edit-post-form');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const imageInput = document.getElementById('image');
const imageAltInput = document.getElementById('image-alt');
const tagsInput = document.getElementById('tags');
const content = document.getElementById('content');
const charCount = document.getElementById('char-count');

document.addEventListener('DOMContentLoaded', async () => {
  const user = getCurrentUser();

  if (!user) {
    window.location.href = '/login.html';
  }

  if (!postId) {
    window.location.href = '/home.html';
    return;
  }

  const post = await fetchSingleBlogPost(postId);
  if (!post) {
    window.location.href = '/home.html';
    return;
  }

  titleInput.value = post.title;
  contentInput.value = post.body;
  imageInput.value = post.media.url;
  imageAltInput.value = post.media.alt;
  tagsInput.value = post.tags.join(', ');
  charCount.textContent = `${contentInput.value.length}/10000`;
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  try {
    const updatedPost = {
      title: titleInput.value.trim(),
      body: contentInput.value.trim(),
      media: {
        url: imageInput.value.trim(),
        alt: imageAltInput.value.trim()
      },
      tags: tagsInput.value.split(',').map(tag => tag.trim())
    };

    const result = await updateBlogPost(postId, updatedPost);
    if (result) {
      window.location.href = '/admin-posts.html';
    } else {
      throw new Error('Failed to update post');
    }
  } catch (error) {
    console.error('Error updating post:', error);
    alert(`Failed to update post: ${error.message}`);
  }
});

content.addEventListener('input', () => {
  charCount.textContent = `${content.value.length}/10000`;
});