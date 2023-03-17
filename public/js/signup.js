const signupFormHandler = async (event) => {
    console.log('#signup clicked');
	event.preventDefault();
	const username = document.querySelector('#userSignup').value.trim();
	const password = document.querySelector('#passwordSignup').value.trim();
	if (username && password) {
		const response = await fetch('/api/users', {
			method: 'post',
			body: JSON.stringify({username, password}),
			headers: { 'Content-Type': 'application/json' },
		});
        console.log(response);
		if (response.ok) {
			document.location.replace('/');
		} else {
			alert('Failed to sign up.');
		}
	}
};

document.querySelector('#signup').addEventListener('click', signupFormHandler);