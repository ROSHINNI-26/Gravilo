// Form switching functionality
const tabBtns = document.querySelectorAll('.tab-btn');
const forms = document.querySelectorAll('.form');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and forms
        tabBtns.forEach(b => b.classList.remove('active'));
        forms.forEach(f => f.classList.remove('active'));

        // Add active class to clicked button and corresponding form
        btn.classList.add('active');
        document.querySelector(`#${btn.dataset.tab}Form`).classList.add('active');
    });
});

// Validation helper functions
function showError(input, message) {
    const formGroup = input.parentElement;
    const errorDisplay = formGroup.querySelector('.error-message');
    input.classList.add('error');
    errorDisplay.textContent = message;
}

function clearError(input) {
    const formGroup = input.parentElement;
    const errorDisplay = formGroup.querySelector('.error-message');
    input.classList.remove('error');
    errorDisplay.textContent = '';
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
    const re = /^\+?[1-9]\d{1,14}$/;
    return re.test(phone);
}

function validateField(input, validationFn, errorMessage) {
    if (!input.value.trim()) {
        showError(input, 'This field is required');
        return false;
    }
    if (validationFn && !validationFn(input.value)) {
        showError(input, errorMessage);
        return false;
    }
    clearError(input);
    return true;
}

// Login form validation
const loginForm = document.getElementById('loginForm');
const loginButton = loginForm.querySelector('.submit-btn');

loginButton.addEventListener('click', (e) => {
    e.preventDefault();
    let isValid = true;

    const username = document.getElementById('loginUsername');
    const password = document.getElementById('loginPassword');

    isValid = validateField(username) && isValid;
    isValid = validateField(password) && isValid;

    if (isValid) {
        // Here you would typically make an API call to your backend
        console.log('Login attempt:', {
            username: username.value,
            password: password.value
        });
        loginForm.submit();
    }
});

// Registration form validation
const registerForm = document.getElementById('registerForm');
const registerButton = registerForm.querySelector('.submit-btn');

registerButton.addEventListener('click', (e) => {
    e.preventDefault();
    let isValid = true;

    const formData = {
        fullName: document.getElementById('fullName'),
        username: document.getElementById('username'),
        email: document.getElementById('email'),
        phone: document.getElementById('phone'),
        skillType: document.getElementById('skillType'),
        password: document.getElementById('password'),
        confirmPassword: document.getElementById('confirmPassword')
    };

    // Validate all fields
    isValid = validateField(formData.fullName) && isValid;
    isValid = validateField(formData.username) && isValid;
    isValid = validateField(formData.email, validateEmail, 'Please enter a valid email address') && isValid;
    isValid = validateField(formData.phone, validatePhone, 'Please enter a valid phone number') && isValid;
    isValid = validateField(formData.skillType) && isValid;

    // Password validation
    if (!validateField(formData.password)) {
        isValid = false;
    } else if (formData.password.value.length < 8) {
        showError(formData.password, 'Password must be at least 8 characters');
        isValid = false;
    } else {
        clearError(formData.password);
    }

    // Confirm password validation
    if (!validateField(formData.confirmPassword)) {
        isValid = false;
    } else if (formData.password.value !== formData.confirmPassword.value) {
        showError(formData.confirmPassword, 'Passwords do not match');
        isValid = false;
    } else {
        clearError(formData.confirmPassword);
    }

    if (isValid) {
        // Here you would typically make an API call to your backend
        console.log('Registration attempt:', {
            fullName: formData.fullName.value,
            username: formData.username.value,
            email: formData.email.value,
            phone: formData.phone.value,
            skillType: formData.skillType.value,
            password: formData.password.value
        });
        registerForm.submit();
    }
});

// Add input event listeners to clear errors when user starts typing
document.querySelectorAll('input, select').forEach(input => {
    input.addEventListener('input', () => clearError(input));
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add navbar background color on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = '#fff';
        navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    } else {
        navbar.style.backgroundColor = '#fff';
        navbar.style.boxShadow = 'none';
    }
});

// Add animation to feature cards on scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});