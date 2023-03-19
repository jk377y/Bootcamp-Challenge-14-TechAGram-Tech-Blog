// This file is used to handle the login form by sending the username and password 
// from the input fields to the server to authenticate the user.
async function loginFormHandler(event) {
	event.preventDefault();
	const username = document.querySelector('#user-login').value.trim();
	const password = document.querySelector('#password-login').value.trim();
	if (username && password) {		
		const response = await fetch('/api/users/login', {
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

document.querySelector('#login').addEventListener('click', loginFormHandler);