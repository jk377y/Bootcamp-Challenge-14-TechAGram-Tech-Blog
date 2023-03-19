// This file is used to edit a comment on a post by identifying the comment id
// through the data-id property on the html element and updating the comment in the database
// by setting the id in the page url
async function editCommentHandler(event) {
	event.preventDefault();
	const btnID = event.target.getAttribute('data-id');
	const comment_text = document.querySelector('[data-id="' + btnID + '"]').value;
	const post_id = window.location.toString().split('/')[
		window.location.toString().split('/').length - 1
	];
	const response = await fetch(`/api/comments/${btnID}`, {
		method: 'PUT',
		body: JSON.stringify({ 'comment_text': comment_text }),
		headers: { 'Content-Type': 'application/json' }
	})
	.catch((err) => { console.log(err) });
	if (response.ok) {
		document.location.replace(`/dashboard/edit/${post_id}`);
	} else {
		alert(response.statusText);
	}
}

const editCommentBtns = document.getElementsByClassName('editCommentBtn');
for (var i = 0; i < editCommentBtns.length; i++) {
	editCommentBtns[i].addEventListener('click', editCommentHandler)
};