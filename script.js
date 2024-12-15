const postsContainer = document.getElementById('posts');
const apiUrl = 'https://jsonplaceholder.typicode.com/posts'; // Replace with your API endpoint

// Fetch all posts from the API
async function fetchPosts() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Failed to fetch posts');
        
        const posts = await response.json();
        
        posts.forEach(post => {
            displayPost(post.id, post.title, post.body);
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

// Add a new post via API
async function addPost() {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    if (title === '' || content === '') {
        alert('Please fill out both fields!');
        return;
    }

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, body: content }),
        });

        if (!response.ok) throw new Error('Failed to create post');
        
        const newPost = await response.json();
        displayPost(newPost.id, newPost.title, newPost.body);

        // Clear the form fields
        document.getElementById('title').value = '';
        document.getElementById('content').value = '';
    } catch (error) {
        console.error('Error creating post:', error);
    }
}

// Delete a post via API
async function deletePost(postId, postElement) {
    try {
        const response = await fetch(`${apiUrl}/${postId}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete post');

        postElement.remove();
    } catch (error) {
        console.error('Error deleting post:', error);
    }
}

// Edit a post via API
async function editPost(postId, postElement, titleElement, contentElement) {
    const newTitle = postElement.querySelector('textarea.title-edit').value;
    const newContent = postElement.querySelector('textarea.content-edit').value;

    try {
        const response = await fetch(`${apiUrl}/${postId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: newTitle, body: newContent }),
        });

        if (!response.ok) throw new Error('Failed to update post');

        titleElement.textContent = newTitle;
        contentElement.textContent = newContent;

        postElement.classList.remove('editing');
        postElement.querySelectorAll('textarea').forEach(textarea => textarea.remove());
    } catch (error) {
        console.error('Error updating post:', error);
    }
}

// Display a post on the page
function displayPost(postId, title, content) {
    const postDiv = document.createElement('div');
    postDiv.classList.add('post');

    const postTitle = document.createElement('h2');
    postTitle.textContent = title;

 const postContent = document.createElement('p');
    postContent.textContent = content;

    postDiv.appendChild(postTitle);
    postDiv.appendChild(postContent);

    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('actions');

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = () => {
        if (postDiv.classList.contains('editing')) {
            editPost(postId, postDiv, postTitle, postContent);
        } else {
            postDiv.classList.add('editing');

            const titleEdit = document.createElement('textarea');
            titleEdit.classList.add('title-edit');
            titleEdit.value = postTitle.textContent;

            const contentEdit = document.createElement('textarea');
            contentEdit.classList.add('content-edit');
            contentEdit.value = postContent.textContent;

            postDiv.insertBefore(titleEdit, postTitle);
            postDiv.insertBefore(contentEdit, postContent);

            postTitle.style.display = 'none';
            postContent.style.display = 'none';
        }
    };

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deletePost(postId, postDiv);

    actionsDiv.appendChild(editButton);
    actionsDiv.appendChild(deleteButton);

    postDiv.appendChild(actionsDiv);

    postsContainer.insertBefore(postDiv, postsContainer.firstChild);
}

// Load posts on page load
window.onload = fetchPosts;

// Light/Dark Mode Toggle
const toggleButton = document.getElementById('toggleTheme');

toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark'); // Toggle the 'dark' class on the body
});

 // Search for user blogs
 async function searchUserBlogs() {
    const userInput = document.getElementById('search-user').value;
    if (!userInput) {
        alert('Please enter a user ID or name to search.');
        return;
    }

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userInput}`);
        const blogs = await response.json();
        if (blogs.length > 0) {
            alert(`Found ${blogs.length} blogs for user ID: ${userInput}`);
            console.log(blogs); // For demonstration, display blogs in console
        } else {
            alert('No blogs found for this user.');
        }
    } catch (error) {
        console.error('Error fetching blogs:', error);
        alert('Failed to fetch blogs. Please try again later.');
    }
 }