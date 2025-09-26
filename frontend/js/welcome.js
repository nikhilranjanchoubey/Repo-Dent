// Welcome page functionality with backend simulation
let selectedRole = '';

// Enhanced demo users with full profiles
const demoUsers = {
    teacher: { 
        email: 'teacher@sms.edu', 
        password: 'teacher123',
        name: 'Dr. John Smith',
        id: 'TCH001',
        department: 'Computer Science',
        subjects: ['CS101', 'CS201', 'CS301']
    },
    student: { 
        email: 'student@sms.edu', 
        password: 'student123',
        name: 'Alice Johnson',
        id: 'STU001',
        class: 'CS Year 2',
        gpa: 3.8
    },
    parent: { 
        email: 'parent@sms.edu', 
        password: 'parent123',
        name: 'Robert Johnson',
        id: 'PAR001',
        child: 'Alice Johnson',
        childId: 'STU001'
    }
};

// Backend simulation
class BackendAPI {
    static async authenticate(email, password, role) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const user = demoUsers[role];
                if (user && user.email === email && user.password === password) {
                    resolve({
                        success: true,
                        user: user,
                        token: 'demo_token_' + Date.now(),
                        message: 'Authentication successful'
                    });
                } else {
                    resolve({
                        success: false,
                        message: 'Invalid credentials or role mismatch'
                    });
                }
            }, 1500); // Simulate network delay
        });
    }

    static async getUserData(userId, role) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    data: demoUsers[role]
                });
            }, 800);
        });
    }
}

function selectRole(role) {
    selectedRole = role;
    document.getElementById('selectedRole').value = role;
    document.getElementById('roleTitle').textContent = `${role.charAt(0).toUpperCase() + role.slice(1)} Portal Access`;
    
    // Auto-fill demo credentials with animation
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    
    // Clear fields first
    email.value = '';
    password.value = '';
    
    // Animate typing effect
    setTimeout(() => {
        typeText(email, demoUsers[role].email, 50);
        setTimeout(() => {
            typeText(password, demoUsers[role].password, 50);
        }, 500);
    }, 300);
    
    const modal = new bootstrap.Modal(document.getElementById('loginModal'));
    modal.show();
}

function typeText(element, text, speed) {
    let i = 0;
    const timer = setInterval(() => {
        element.value += text.charAt(i);
        i++;
        if (i >= text.length) {
            clearInterval(timer);
            element.classList.add('is-valid');
        }
    }, speed);
}

function showSignup() {
    alert('Signup functionality will be implemented in the next version. Please use demo credentials for now.');
}

// Initialize animations
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    
    // Login form handler
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const role = document.getElementById('selectedRole').value;
        
        // Validate credentials
        if (email === demoUsers[role].email && password === demoUsers[role].password) {
            showMessage('Login successful! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = `${role}-dashboard.html`;
            }, 1500);
        } else {
            showMessage('Invalid credentials. Please try again.', 'danger');
        }
    });
});

function showMessage(message, type) {
    const messageDiv = document.getElementById('loginMessage');
    messageDiv.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            <i class="bi bi-${type === 'success' ? 'check-circle' : 'exclamation-triangle'}-fill me-2"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
}

// Role card hover effects
document.querySelectorAll('.role-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.05)';
        this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 10px 15px -3px rgb(0 0 0 / 0.1)';
    });
});
// Enhanced login form handler with backend simulation
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('selectedRole').value;
    
    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<div class="loading-spinner me-2"></div>Authenticating...';
    submitBtn.disabled = true;
    
    try {
        // Simulate backend authentication
        const result = await BackendAPI.authenticate(email, password, role);
        
        if (result.success) {
            // Store user session
            localStorage.setItem('sms_user', JSON.stringify(result.user));
            localStorage.setItem('sms_token', result.token);
            localStorage.setItem('sms_role', role);
            
            showMessage('🎉 Login successful! Redirecting to dashboard...', 'success');
            
            // Animate success
            submitBtn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Success!';
            submitBtn.classList.add('btn-success');
            
            setTimeout(() => {
                window.location.href = `${role}-dashboard.html`;
            }, 2000);
        } else {
            showMessage('❌ ' + result.message, 'danger');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    } catch (error) {
        showMessage('🔧 System error. Please try again.', 'danger');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeFooter();
    
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

function initializeFooter() {
    // Footer initialized without interactions
}

function showSignup() {
    const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
    modal.hide();
    
    setTimeout(() => {
        showMessage('🚀 Signup feature coming soon! Advanced user registration with email verification.', 'info');
    }, 500);
}

function redirectToVideo() {
    showGlobalMessage('🎥 Opening demo video...', 'info');
    
    const video = document.createElement('video');
    video.src = 'REPODENT.mp4';
    video.controls = true;
    video.autoplay = true;
    video.style.width = '100%';
    
    const modal = document.createElement('div');
    modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px';
    modal.onclick = () => modal.remove();
    
    const container = document.createElement('div');
    container.style.cssText = 'max-width:90%;background:white;padding:20px;border-radius:10px';
    container.appendChild(video);
    modal.appendChild(container);
    document.body.appendChild(modal);
    
    video.onerror = () => {
        modal.remove();
        showGlobalMessage('📁 Video file not found. Please place REPODENT.mp4 in frontend folder', 'warning');
    };
}

function showGlobalMessage(message, type) {
    // Create or get existing message container
    let messageContainer = document.getElementById('globalMessage');
    if (!messageContainer) {
        messageContainer = document.createElement('div');
        messageContainer.id = 'globalMessage';
        messageContainer.style.position = 'fixed';
        messageContainer.style.top = '100px';
        messageContainer.style.left = '50%';
        messageContainer.style.transform = 'translateX(-50%)';
        messageContainer.style.zIndex = '9999';
        messageContainer.style.width = '90%';
        messageContainer.style.maxWidth = '500px';
        document.body.appendChild(messageContainer);
    }
    
    messageContainer.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show bounce-in" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        if (messageContainer && messageContainer.innerHTML) {
            messageContainer.innerHTML = '';
        }
    }, 5000);
}

function showDemoCredentials() {
    // Remove existing modal if present
    const existingModal = document.getElementById('credentialsModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.id = 'credentialsModal';
    modalOverlay.style.position = 'fixed';
    modalOverlay.style.top = '0';
    modalOverlay.style.left = '0';
    modalOverlay.style.width = '100%';
    modalOverlay.style.height = '100%';
    modalOverlay.style.background = 'rgba(0,0,0,0.5)';
    modalOverlay.style.zIndex = '9999';
    modalOverlay.style.display = 'flex';
    modalOverlay.style.alignItems = 'center';
    modalOverlay.style.justifyContent = 'center';
    modalOverlay.style.padding = '20px';
    
    // Create credentials card
    const credentialsCard = document.createElement('div');
    credentialsCard.className = 'card bg-white border-primary';
    credentialsCard.style.maxWidth = '400px';
    credentialsCard.style.width = '100%';
    credentialsCard.innerHTML = `
        <div class="card-header bg-primary text-white text-center">
            <h6 class="mb-0"><i class="bi bi-key me-2"></i>Demo Credentials</h6>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-12 mb-3">
                    <strong class="text-primary">Teacher:</strong><br>
                    <small>Email: teacher@sms.edu</small><br>
                    <small>Password: teacher123</small>
                </div>
                <div class="col-12 mb-3">
                    <strong class="text-success">Student:</strong><br>
                    <small>Email: student@sms.edu</small><br>
                    <small>Password: student123</small>
                </div>
                <div class="col-12">
                    <strong class="text-warning">Parent:</strong><br>
                    <small>Email: parent@sms.edu</small><br>
                    <small>Password: parent123</small>
                </div>
            </div>
        </div>
    `;
    
    // Prevent card clicks from closing modal
    credentialsCard.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // Close modal when clicking on overlay
    modalOverlay.addEventListener('click', function() {
        modalOverlay.remove();
    });
    
    // Add card to overlay
    modalOverlay.appendChild(credentialsCard);
    
    // Add overlay to body
    document.body.appendChild(modalOverlay);
    
    // Auto-hide after 10 seconds
    setTimeout(() => {
        if (modalOverlay && modalOverlay.parentNode) {
            modalOverlay.remove();
        }
    }, 10000);
}

function showMessage(message, type) {
    const messageDiv = document.getElementById('loginMessage');
    messageDiv.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show bounce-in" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
}

// Role card hover effects with enhanced animations
document.querySelectorAll('.role-card').forEach(card => {
    card.style.cursor = 'pointer';
    
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-20px) scale(1.08) rotateY(5deg)';
        this.style.boxShadow = '0 25px 50px rgba(0,0,0,0.3)';
        this.style.background = 'linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(79, 70, 229, 0.05) 100%)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1) rotateY(0deg)';
        this.style.boxShadow = '';
        this.style.background = '';
    });
    
    // Add click animation
    card.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});

// Enhanced animations with intersection observer
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }
        });
    }, observerOptions);

    // Observe fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px) scale(0.9)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });

    // Stagger animation for role cards
    document.querySelectorAll('.role-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) scale(0.8)';
        card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        }, index * 200);
    });
}

// Redirect modal functions
function showRedirectModal() {
    const modal = new bootstrap.Modal(document.getElementById('redirectModal'));
    modal.show();
}

function redirectToGitHub() {
    // Close the modal first
    const modal = bootstrap.Modal.getInstance(document.getElementById('redirectModal'));
    modal.hide();
    
    // Open GitHub link in new tab
    window.open('https://github.com/nikhilranjanchoubey/Repo-Dent', '_blank');
}