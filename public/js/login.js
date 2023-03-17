const loginFormHandler = async (event) => {
	console.log('#login clicked');
	event.preventDefault();
	const username = document.querySelector('#userLogin').value.trim();
	const password = document.querySelector('#passwordLogin').value.trim();
	if (username && password) {
		const response = await fetch('/api/users/login', {
			method: 'post',
			body: JSON.stringify({ username, password }),
			headers: { 'Content-Type': 'application/json' },
		});
		console.log(response);
		if (response.ok) {
			document.location.replace('/dashboard');
		} else {
			alert('Failed to log in.');
		}
	}
};

document.querySelector('#login').addEventListener('click', loginFormHandler);