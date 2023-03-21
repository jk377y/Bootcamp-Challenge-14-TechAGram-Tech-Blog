// identify the post id and insert it into the delete route in the html
// then a fetch request is made to the delete route in the api
async function deleteFormHandler(event) {
	event.preventDefault();
	const id = window.location.toString().split('/')[
		window.location.toString().split('/').length - 1
	];
	const response = await fetch(`/api/posts/${id}`, {
		method: 'DELETE'
	});
	if (response.ok && username.req.session.username === username) {
		document.location.replace('/dashboard/');
	} else if (response.ok && username.req.session.username !== username) {
		alert('You cannot delete a post that is not yours!');
	} else {
		alert('ALL comments must be deleted before deleting the post is allowed.');
	}
}

document.querySelector('#deletePostBtn').addEventListener('click', deleteFormHandler);