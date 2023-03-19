// This file is used to add a comment to a post by identifying the post id and inserting the comment to the database.
async function commentFormHandler(event) {
	event.preventDefault();
	const comment_text = document.querySelector('textarea[name="newComment"]').value.trim();
	const post_id = window.location.toString().split('/')[
		window.location.toString().split('/').length - 1
	];
	if (comment_text) {
		const response = await fetch('/api/comments', {
			method: 'POST',
			body: JSON.stringify({ post_id, comment_text }),
			headers: { 'Content-Type': 'application/json' }
		});
		if (response.ok) {
			document.location.reload();
		} else {
			alert(response.statusText);
		}
	}
}

document.querySelector('#newComment').addEventListener('click', commentFormHandler);