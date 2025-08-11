const BASE_URL = 'http://localhost:5000/api';


export async function fetchBlogs() {
  try {
    const response = await fetch(`${BASE_URL}/blogs`);
    if (!response.ok) {
      throw new Error('Failed to fetch blogs');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

export async function deleteBlog(id) {
  try {
    const response = await fetch(`${BASE_URL}/blogs/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete blog');
    }

    return true;
  } catch (error) {
    console.error('Error deleting blog:', error);
    return false;
  }
}



export async function createBlog(blogData) {
  try {
    const response = await fetch(`${BASE_URL}/blogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blogData),
    });

    if (!response.ok) {
      throw new Error('Failed to create blog');
    }

    return await response.json(); // return the created blog
  } catch (error) {
    console.error('Error creating blog:', error);
    return null;
  }
}

export async function updateBlog( updatedData) {
  try {
    const response = await fetch(`${BASE_URL}/blogs/${updatedData._id}`, {
      method: 'PUT', // or 'PATCH' if your backend uses it
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error('Failed to update blog');
    }

    return await response.json(); // return the updated blog
  } catch (error) {
    console.error('Error updating blog:', error);
    return null;
  }
}
