// This file is used to handle the signup form by sending the username and password 
// from the input fields to the server to create a new user.
async function signupFormHandler(event) {
	event.preventDefault();
	const username = document.querySelector('#username-signup').value.trim();
	const password = document.querySelector('#password-signup').value.trim();
	if (username && password) {
		const response = await fetch('/api/users', {
			method: 'post',
			body: JSON.stringify({ username, password }),
			headers: { 'Content-Type': 'application/json' }
		});
		if (response.ok) {
			document.location.replace('/dashboard');
		} else {
			alert(response.statusText);
		}
	}
}

document.querySelector('#signup').addEventListener('click', signupFormHandler);