import { getCurrentUser } from "./auth.js";

export async function fetchBlogPosts() {
  try {
    const response = await fetch(`https://v2.api.noroff.dev/blog/posts/Ekrem`, {
      method: 'GET',
    });

    const { data, errors } = await response.json();

    if (errors) {
      throw new Error(errors[0].message);
    }

    return data;

  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return null
  }
}

export async function fetchSingleBlogPost(postId) {
  try {
    const response = await fetch(`https://v2.api.noroff.dev/blog/posts/Ekrem/${postId}`, {
      method: 'GET',
    });

    const { data, errors } = await response.json();

    if (errors) {
      throw new Error(errors[0].message);
    }

    return data;

  } catch (error) {
    console.error('Error fetching single blog post:', error);
    return null
  }
}

export async function updateBlogPost(postId, postData) {
  try {
    const user = getCurrentUser();
    if (!user) {
      throw new Error('No authenticated user found');
    }
    const { accessToken, name } = user;

    const response = await fetch(`https://v2.api.noroff.dev/blog/posts/${name}/${postId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    });

    const { data, errors } = await response.json();

    if (errors) {
      throw new Error(errors[0].message);
    }

    return data;

  } catch (error) {
    console.error('Error updating blog post:', error);
    return null;
  }
}

export async function deleteBlogPost(postId) {
  try {
    const user = getCurrentUser();
    if (!user) {
      throw new Error('No authenticated user found');
    }
    const { accessToken, name } = user;
    const response = await fetch(`https://v2.api.noroff.dev/blog/posts/${name}/${postId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    if (!response.ok) {
      throw new Error('Error deleting post');
    }
    return true;
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return false;
  }
}