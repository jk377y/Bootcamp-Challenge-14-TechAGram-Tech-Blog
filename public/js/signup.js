const signupFormHandler = async (event) => {
	event.preventDefault();
	const username = document.querySelector('#userName-signup').value.trim();
	const email = document.querySelector('#email-signup').value.trim();
	const password = document.querySelector('#password-signup').value.trim();
	if (username && email && password) {
		const response = await fetch('/api/users', {
			method: 'POST',
			body: JSON.stringify({ username, email, password }),
			headers: { 'Content-Type': 'application/json' },
		});
		if (response.ok) {
			document.location.replace('/api/food');
		} else {
			alert('Failed to sign up.');
		}
	}
};

document.querySelector('#signUp').addEventListener('click', signupFormHandler);