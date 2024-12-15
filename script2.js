const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

    function showSignupForm() {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
    }

    function showLoginForm() {
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
    }

        // Handle form submissions (just for demonstration)
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Login form submitted');
    });

    signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Signup form submitted');
    })