// This file is used to delete a comment from a post by identifying the comment id 
// through the data-id property on the html element and deleting the comment from 
// the database by setting the id in the page url
async function deleteCommentHandler(event) {
	event.preventDefault();
	const deleteBtnID = event.target.getAttribute('data-id');
	const comment_text = document.querySelector('[data-id="' + deleteBtnID + '"]').value;
	const post_id = window.location.toString().split('/')[
		window.location.toString().split('/').length - 1
	];
	const response = await fetch(`/api/comments/${deleteBtnID}`, {
		method: 'DELETE'
	});
	if (response.ok) {
		document.location.replace(`/dashboard/edit/${post_id}`);
	} else {
		// alert(response.statusText);
		alert('You can only delete your own comments!');
	}
}

const deleteBtn = document.getElementsByClassName('deleteCommentBtn');
for (var i = 0; i < deleteBtn.length; i++) {
	deleteBtn[i].addEventListener('click', deleteCommentHandler)
};