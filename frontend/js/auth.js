// Authentication and session management
class AuthManager {
    constructor() {
        this.currentUser = null;
        this.sessionTimeout = 30 * 60 * 1000; // 30 minutes
        this.initializeAuth();
    }

    initializeAuth() {
        // Check for existing session
        const savedUser = localStorage.getItem('sms_user');
        const sessionStart = localStorage.getItem('sms_session_start');
        
        if (savedUser && sessionStart) {
            const elapsed = Date.now() - parseInt(sessionStart);
            if (elapsed < this.sessionTimeout) {
                this.currentUser = JSON.parse(savedUser);
                this.redirectToDashboard();
            } else {
                this.logout();
            }
        }
    }

    async login(username, password, role) {
        // Simulate authentication with demo data
        const users = {
            admin: { username: 'admin', password: 'admin123', name: 'System Administrator', role: 'admin' },
            teacher1: { username: 'teacher1', password: 'pass123', name: 'John Smith', role: 'teacher' },
            student1: { username: 'student1', password: 'pass123', name: 'Alice Johnson', role: 'student' },
            parent1: { username: 'parent1', password: 'pass123', name: 'Bob Johnson', role: 'parent' }
        };

        return new Promise((resolve) => {
            setTimeout(() => {
                const user = users[username];
                if (user && user.password === password && user.role === role) {
                    this.currentUser = user;
                    localStorage.setItem('sms_user', JSON.stringify(user));
                    localStorage.setItem('sms_session_start', Date.now().toString());
                    resolve({ success: true, user });
                } else {
                    resolve({ success: false, message: 'Invalid credentials or role mismatch' });
                }
            }, 1000); // Simulate network delay
        });
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('sms_user');
        localStorage.removeItem('sms_session_start');
        window.location.href = 'index.html';
    }

    redirectToDashboard() {
        if (this.currentUser) {
            window.location.href = `${this.currentUser.role}-dashboard.html`;
        }
    }

    isAuthenticated() {
        return this.currentUser !== null;
    }

    getCurrentUser() {
        return this.currentUser;
    }
}

// Initialize auth manager
const authManager = new AuthManager();

// Login form handler with modern animations
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Initialize animations
    initializeAnimations();
    
    const loginForm = document.getElementById('loginForm');
    const messageDiv = document.getElementById('loginMessage');

    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const role = document.getElementById('role').value;
            
            // Show loading state
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Logging in...';
            submitBtn.disabled = true;
            
            try {
                const result = await authManager.login(username, password, role);
                
                if (result.success) {
                    showMessage('Login successful! Redirecting...', 'success');
                    setTimeout(() => {
                        authManager.redirectToDashboard();
                    }, 1500);
                } else {
                    showMessage(result.message, 'danger');
                }
            } catch (error) {
                showMessage('Login failed. Please try again.', 'danger');
            } finally {
                // Reset button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    function showMessage(message, type) {
        messageDiv.innerHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                <i class="bi bi-${type === 'success' ? 'check-circle' : 'exclamation-triangle'}-fill me-2"></i>
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
    }
});

// Session timeout warning
function startSessionTimer() {
    setTimeout(() => {
        if (authManager.isAuthenticated()) {
            const modal = new bootstrap.Modal(document.getElementById('sessionWarningModal'));
            modal.show();
        }
    }, authManager.sessionTimeout - 5 * 60 * 1000); // 5 minutes before timeout
}

// Form validation utilities
function validateForm(formId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll('input[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('is-invalid');
            isValid = false;
        } else {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        }
    });

    return isValid;
}

// Real-time form validation
document.addEventListener('input', function(e) {
    if (e.target.hasAttribute('required')) {
        if (e.target.value.trim()) {
            e.target.classList.remove('is-invalid');
            e.target.classList.add('is-valid');
        } else {
            e.target.classList.remove('is-valid');
            e.target.classList.add('is-invalid');
        }
    }
});

// Export for use in other files
window.authManager = authManager;
window.validateForm = validateForm;
// Modern animation initialization
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    // Observe bounce-in elements
    document.querySelectorAll('.bounce-in').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'scale(0.3)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        observer.observe(el);
    });

    // Add hover effects to cards
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add ripple effect to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', createRipple);
    });
}

// Ripple effect for buttons
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle);
}

// Smooth scroll for navigation links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Add loading animation styles
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 600ms linear;
        background-color: rgba(255, 255, 255, 0.6);
    }

    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(79, 70, 229, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    }

    .loading-overlay.show {
        opacity: 1;
        visibility: visible;
    }

    .loading-content {
        text-align: center;
        color: white;
    }

    .loading-spinner {
        width: 60px;
        height: 60px;
        border: 4px solid rgba(255, 255, 255, 0.3);
        border-left: 4px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 1rem;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Show loading overlay
function showLoadingOverlay(message = 'Loading...') {
    let overlay = document.querySelector('.loading-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'loading-overlay';
        overlay.innerHTML = `
            <div class="loading-content">
                <div class="loading-spinner"></div>
                <h4>${message}</h4>
            </div>
        `;
        document.body.appendChild(overlay);
    }
    setTimeout(() => overlay.classList.add('show'), 10);
}

// Hide loading overlay
function hideLoadingOverlay() {
    const overlay = document.querySelector('.loading-overlay');
    if (overlay) {
        overlay.classList.remove('show');
        setTimeout(() => overlay.remove(), 300);
    }
}