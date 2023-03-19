// This file is used to handle the add post form by inserting the post title and post content to the database.
async function newFormHandler(event) {
	event.preventDefault();
	const title = document.querySelector('input[name="post-title"]').value;
	const post_content = document.querySelector('input[name="post-content"]').value;
	const response = await fetch(`/api/posts`, {
		method: 'POST',
		body: JSON.stringify({ title, post_content }),
		headers: { 'Content-Type': 'application/json' }
	});
	if (response.ok) {
		document.location.replace('/dashboard');
	} else {
		alert(response.statusText);
	}
}

document.querySelector('#createPost').addEventListener('click', newFormHandler);