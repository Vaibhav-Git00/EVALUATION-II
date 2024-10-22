document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    fetch(`http://localhost:3003/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`)
        .then(response => response.json())
        .then(users => {
            // Check if any user matches the provided credentials
            const user = users.find(user => user.email === email && user.password === password);
            if (user) {
                // If user is found, redirect to home page
                localStorage.setItem("email",user.email)
                alert("Login successful!");
                window.location.href = "dashboard.html"; // Redirect to home page
            } else {
                // If no user is found, show error
                document.getElementById('emailError').textContent = "Email or password is incorrect.";
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('emailError').textContent = "An error occurred. Please try again.";
        });
});
