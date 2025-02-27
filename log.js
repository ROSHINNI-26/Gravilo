document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const username = document.getElementById("loginUsername").value.trim();
        const password = document.getElementById("loginPassword").value.trim();
        
        if (username === "" || password === "") {
            alert("Please fill in all fields.");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters long.");
            return;
        }
        
        alert("Login successful!");
    });

    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const fullName = document.getElementById("fullName").value.trim();
        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const skillType = document.getElementById("skillType").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        const nameRegex = /^[A-Za-z ]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10}$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

        if (!fullName || !username || !email || !phone || !skillType || !password || !confirmPassword) {
            alert("All fields are required.");
            return;
        }
        
        if (!nameRegex.test(fullName)) {
            alert("Full name can only contain letters and spaces.");
            return;
        }

        if (!emailRegex.test(email)) {
            alert("Invalid email format.");
            return;
        }
        
        if (!phoneRegex.test(phone)) {
            alert("Phone number must be 10 digits.");
            return;
        }

        if (!passwordRegex.test(password)) {
            alert("Password must be at least 6 characters, including a letter and a number.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }
        
        alert("Registration successful!");
    });

    document.querySelectorAll(".tab-btn").forEach(button => {
        button.addEventListener("click", function () {
            document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
            document.querySelectorAll(".form").forEach(form => form.classList.remove("active"));
            
            this.classList.add("active");
            document.getElementById(this.dataset.tab + "Form").classList.add("active");
        });
    });
});
