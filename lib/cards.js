import { deleteBlogPost } from './api.js';

export function createCard(id, title, imageUrl, content) {
  const card = document.createElement('div');
  card.className = 'blog-card';

  const titleElement = document.createElement('h3');
  titleElement.textContent = title;

  const image = document.createElement('img');
  image.src = imageUrl;
  image.alt = title;

  const contentContainer = document.createElement('p');
  contentContainer.textContent = content;

  // Create a container for the read more link and the arrow image
  const readMoreContainer = document.createElement('div');
  readMoreContainer.className = 'read-more-container';

  const readMoreLink = document.createElement('a');
  readMoreLink.textContent = 'Read more';
  readMoreLink.href = '/post/single-post.html?id=' + id;

  const arrowImage = document.createElement('img');
  arrowImage.src = '../assets/arrow-right.svg';
  arrowImage.alt = 'arrow';
  arrowImage.className = 'read-more-arrow';

  readMoreLink.appendChild(arrowImage);
  readMoreContainer.appendChild(readMoreLink);

  card.appendChild(titleElement);
  card.appendChild(image);
  card.appendChild(contentContainer);
  card.appendChild(readMoreContainer);

  return card;
}

export function createAdminCard(id, title, imageUrl, content) {
  const card = document.createElement('div');
  card.className = 'blog-card';

  const titleElement = document.createElement('h3');
  titleElement.textContent = title;

  const image = document.createElement('img');
  image.src = imageUrl;
  image.alt = title;

  const contentContainer = document.createElement('p');
  contentContainer.textContent = content;

  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'button-container';

  const editLink = document.createElement('a');
  editLink.href = '/post/edit.html?id=' + id;

  const editButton = document.createElement('button');
  editButton.textContent = 'EDIT';
  editButton.className = 'edit-btn';

  editLink.appendChild(editButton);

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'DELETE';
  deleteButton.className = 'delete-btn';
  deleteButton.dataset.id = id;

  deleteButton.addEventListener('click', async () => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    const success = await deleteBlogPost(id);
    if (success) {
      card.remove();
      alert('Post deleted successfully');
    } else {
      alert('Failed to delete post');
    }
  });

  buttonContainer.appendChild(editLink);
  buttonContainer.appendChild(deleteButton);

  card.appendChild(titleElement);
  card.appendChild(image);
  card.appendChild(contentContainer);
  card.appendChild(buttonContainer);

  return card;
}