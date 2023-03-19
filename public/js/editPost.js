// This file is used to handle the edit post form by updating the post title and post content in the database.
// The id of the post is obtained from the url and used to update the post in the database.
async function editFormHandler(event) {
	event.preventDefault();
	const title = document.querySelector('input[name="post-title"]').value;
	const post_content = document.querySelector('input[name="post-content"]').value;
	const id = window.location.toString().split('/')[
		window.location.toString().split('/').length - 1
	];
	const response = await fetch(`/api/posts/${id}`, {
		method: 'PUT',
		body: JSON.stringify({ title, post_content }),
		headers: { 'Content-Type': 'application/json' }
	});
	if (response.ok) {
		document.location.replace('/dashboard');
	} else {
		alert(response.statusText);
	}
}

document.querySelector('#savePostBtn').addEventListener('click', editFormHandler);