import { backend } from 'declarations/backend';

let quill, updateQuill;

document.addEventListener('DOMContentLoaded', async () => {
    quill = new Quill('#editor', {
        theme: 'snow'
    });

    updateQuill = new Quill('#updateEditor', {
        theme: 'snow'
    });

    const newPostBtn = document.getElementById('newPostBtn');
    const newPostForm = document.getElementById('newPostForm');
    const postForm = document.getElementById('postForm');
    const updatePostForm = document.getElementById('updatePostForm');
    const updateForm = document.getElementById('updateForm');

    newPostBtn.addEventListener('click', () => {
        newPostForm.style.display = newPostForm.style.display === 'none' ? 'block' : 'none';
        updatePostForm.style.display = 'none';
    });

    postForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const body = quill.root.innerHTML;

        await backend.addPost(title, body, author);
        postForm.reset();
        quill.setContents([]);
        newPostForm.style.display = 'none';
        await fetchAndDisplayPosts();
    });

    updateForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = Number(document.getElementById('updateId').value);
        const title = document.getElementById('updateTitle').value;
        const body = updateQuill.root.innerHTML;

        await backend.updatePost(id, title, body);
        updateForm.reset();
        updateQuill.setContents([]);
        updatePostForm.style.display = 'none';
        await fetchAndDisplayPosts();
    });

    await fetchAndDisplayPosts();
});

async function fetchAndDisplayPosts() {
    const posts = await backend.getPosts();
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = '';

    posts.reverse().forEach(post => {
        const postElement = document.createElement('article');
        postElement.className = 'post';
        postElement.innerHTML = `
            <h2>${post.title}</h2>
            <div class="post-meta">
                <span>${post.author}</span> | 
                <span>${new Date(Number(post.timestamp) / 1000000).toLocaleString()}</span>
            </div>
            <div class="post-body">${post.body}</div>
            <div class="post-actions">
                <button class="update-btn" data-id="${post.id}">Update</button>
                <button class="delete-btn" data-id="${post.id}">Delete</button>
            </div>
        `;
        postsContainer.appendChild(postElement);

        const updateBtn = postElement.querySelector('.update-btn');
        updateBtn.addEventListener('click', () => showUpdateForm(post));

        const deleteBtn = postElement.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => deletePost(post.id));
    });
}

function showUpdateForm(post) {
    const updatePostForm = document.getElementById('updatePostForm');
    const updateId = document.getElementById('updateId');
    const updateTitle = document.getElementById('updateTitle');

    updateId.value = post.id;
    updateTitle.value = post.title;
    updateQuill.root.innerHTML = post.body;

    updatePostForm.style.display = 'block';
    document.getElementById('newPostForm').style.display = 'none';
}

async function deletePost(id) {
    if (confirm('Are you sure you want to delete this post?')) {
        await backend.deletePost(id);
        await fetchAndDisplayPosts();
    }
}
