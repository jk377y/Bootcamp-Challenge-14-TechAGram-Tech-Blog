// This file is used to log out the user by destroying the session
// and redirecting the user to the homepage.
async function logout() {
	const response = await fetch('/api/users/logout', {
		method: 'post',
		headers: { 'Content-Type': 'application/json' }
	});
	if (response.ok) {
		document.location.replace('/');
	} else {
		alert(response.statusText);
	}
}

document.querySelector('#logout').addEventListener('click', logout);