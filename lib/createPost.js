import { getCurrentUser } from "./auth.js";

const createPostForm = document.getElementById('create-post-form');
const content = document.getElementById('content');
const charCount = document.getElementById('char-count');

const user = getCurrentUser();

if (!user) {
  window.location.href = '/login.html';
}

createPostForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(createPostForm);
  const postData = Object.fromEntries(formData);
  const newPost = {
    title: postData.title.trim(),
    body: postData.content.trim(),
    tags: postData.tags.split(',').map(tag => tag.trim()),
    media: {
      url: postData.image.trim(),
      alt: postData['image-alt'].trim(),
    }
  };

  try {
    const res = await fetch(`https://v2.api.noroff.dev/blog/posts/${user.name}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify(newPost),
    });
    const { data, errors } = await res.json();

    if (data) {
      alert('Post created successfully!');
      createPostForm.reset();
    } else if (errors) {
      alert(`Error: ${errors[0].message}`);
    }
  } catch (error) {
    alert('Unexpected error during post creation.');
  }
});

content.addEventListener('input', () => {
  charCount.textContent = `${content.value.length}/10000`;
});


