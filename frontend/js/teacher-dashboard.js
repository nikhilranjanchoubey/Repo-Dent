// Teacher Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeDashboard();
    setupNavigation();
});

function initializeDashboard() {
    // Initialize dashboard components
    loadTodaySchedule();
    updateStats();
    setupEventListeners();
}

function setupNavigation() {
    const navLinks = document.querySelectorAll('.sidebar .nav-link');
    const sections = document.querySelectorAll('.content-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
            
            // Hide all sections
            sections.forEach(section => section.classList.add('d-none'));
            
            // Show target section
            const targetSection = this.getAttribute('data-section') + '-section';
            const target = document.getElementById(targetSection);
            if (target) {
                target.classList.remove('d-none');
                target.classList.add('fade-in');
            }
        });
    });
}

function loadStudents() {
    const classSelect = document.getElementById('classSelect').value;
    const attendanceDate = document.getElementById('attendanceDate').value;
    
    if (!classSelect) {
        alert('Please select a class first');
        return;
    }
    
    // Simulate loading students
    showMessage('Loading students for ' + classSelect + '...', 'info');
    
    setTimeout(() => {
        showMessage('Students loaded successfully!', 'success');
    }, 1000);
}

function saveAttendance() {
    const attendanceData = [];
    const rows = document.querySelectorAll('#attendanceTable tr');
    
    rows.forEach(row => {
        const studentId = row.cells[0]?.textContent;
        const presentRadio = row.querySelector('input[type="radio"][value="present"]:checked');
        const absentRadio = row.querySelector('input[type="radio"][value="absent"]:checked');
        
        if (studentId && (presentRadio || absentRadio)) {
            attendanceData.push({
                studentId: studentId,
                status: presentRadio ? 'present' : 'absent'
            });
        }
    });
    
    if (attendanceData.length > 0) {
        showMessage('Attendance saved successfully!', 'success');
        console.log('Attendance Data:', attendanceData);
    } else {
        showMessage('No attendance data to save', 'warning');
    }
}

function updateStats() {
    // Simulate real-time stats updates
    const stats = {
        classes: Math.floor(Math.random() * 3) + 4,
        students: Math.floor(Math.random() * 20) + 130,
        attendance: (Math.random() * 5 + 90).toFixed(1),
        tasks: Math.floor(Math.random() * 5) + 5
    };
    
    // Update with animation
    animateCounter('totalStudents', stats.students);
    animateCounter('attendanceRate', stats.attendance + '%');
}

function exportSchedule() {
    showMessage('📅 Exporting weekly schedule...', 'info');
    setTimeout(() => {
        showMessage('✅ Schedule exported successfully!', 'success');
    }, 1500);
}

function loadWeeklySchedule(week) {
    showMessage('📊 Loading schedule for ' + week + '...', 'info');
    // Simulate schedule loading
    setTimeout(() => {
        showMessage('✅ Schedule updated!', 'success');
    }, 1000);
}

function animateCounter(elementId, targetValue) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const isPercentage = targetValue.includes('%');
    const numericValue = parseFloat(targetValue);
    const duration = 1000;
    const steps = 30;
    const increment = numericValue / steps;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
            current = numericValue;
            clearInterval(timer);
        }
        
        element.textContent = isPercentage ? 
            current.toFixed(1) + '%' : 
            Math.floor(current);
    }, duration / steps);
}

function loadTodaySchedule() {
    // Simulate loading today's schedule
    const scheduleItems = document.querySelectorAll('.schedule-item');
    scheduleItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('fade-in');
        }, index * 200);
    });
}

function setupEventListeners() {
    // Add event listeners for interactive elements
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', createRipple);
    });
    
    // Auto-save functionality for marks
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('change', function() {
            const marks = parseInt(this.value);
            const maxMarks = parseInt(this.max) || 100;
            const percentage = (marks / maxMarks) * 100;
            
            // Update grade based on percentage
            const gradeCell = this.closest('tr').querySelector('.badge');
            if (gradeCell) {
                updateGrade(gradeCell, percentage);
            }
        });
    });
}

function updateGrade(gradeElement, percentage) {
    let grade, className;
    
    if (percentage >= 90) {
        grade = 'A+';
        className = 'bg-success';
    } else if (percentage >= 85) {
        grade = 'A';
        className = 'bg-success';
    } else if (percentage >= 80) {
        grade = 'B+';
        className = 'bg-primary';
    } else if (percentage >= 75) {
        grade = 'B';
        className = 'bg-info';
    } else if (percentage >= 70) {
        grade = 'C+';
        className = 'bg-warning';
    } else if (percentage >= 60) {
        grade = 'C';
        className = 'bg-warning';
    } else {
        grade = 'F';
        className = 'bg-danger';
    }
    
    gradeElement.textContent = grade;
    gradeElement.className = `badge ${className}`;
}

function showMessage(message, type) {
    // Create and show toast message
    const toast = document.createElement('div');
    toast.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    toast.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    toast.innerHTML = `
        <i class="bi bi-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}-fill me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.remove();
        }
    }, 3000);
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

function showDaySchedule(day) {
    const teacherSchedules = {
        'Monday': [
            { time: '9:00-9:50', subject: 'OOPS Lab', room: 'CL-06', class: 'CS-A', type: 'lab' },
            { time: '9:50-10:40', subject: 'OOPS Lab', room: 'CL-06', class: 'CS-A', type: 'lab' },
            { time: '10:40-11:30', subject: 'OOPS Theory', room: 'LT-19', class: 'CS-B', type: 'class' },
            { time: '11:30-12:20', subject: 'OOPS Theory', room: 'LT-19', class: 'CS-C', type: 'class' },
            { time: '2:00-2:50', subject: 'OOPS Theory', room: 'LT-19', class: 'CS-B', type: 'class' },
            { time: '2:50-3:40', subject: 'OOPS Theory', room: 'LT-19', class: 'CS-A', type: 'class' }
        ],
        'Tuesday': [
            { time: '9:00-9:50', subject: 'OOPS Theory', room: 'LT-19', class: 'CS-C', type: 'class' },
            { time: '9:50-10:40', subject: 'OOPS Theory', room: 'LT-19', class: 'CS-B', type: 'class' },
            { time: '10:40-11:30', subject: 'OOPS Theory', room: 'LT-19', class: 'CS-A', type: 'class' },
            { time: '1:10-2:00', subject: 'OOPS Theory', room: 'LT-19', class: 'CS-C', type: 'class' },
            { time: '2:00-2:50', subject: 'OOPS Lab', room: 'CL-06', class: 'CS-B', type: 'lab' },
            { time: '2:50-3:40', subject: 'OOPS Lab', room: 'CL-06', class: 'CS-B', type: 'lab' }
        ],
        'Wednesday': [
            { time: '9:00-9:50', subject: 'OOPS Theory', room: 'LT-19', class: 'CS-B', type: 'class' },
            { time: '10:40-11:30', subject: 'OOPS Lab', room: 'CL-06', class: 'CS-A', type: 'lab' },
            { time: '11:30-12:20', subject: 'OOPS Lab', room: 'CL-06', class: 'CS-A', type: 'lab' },
            { time: '1:10-2:00', subject: 'OOPS Theory', room: 'LT-19', class: 'CS-C', type: 'class' },
            { time: '2:50-3:40', subject: 'OOPS Theory', room: 'LT-19', class: 'CS-B', type: 'class' }
        ],
        'Thursday': [
            { time: '9:50-10:40', subject: 'OOPS Theory', room: 'LT-19', class: 'CS-A', type: 'class' },
            { time: '10:40-11:30', subject: 'OOPS Theory', room: 'LT-19', class: 'CS-C', type: 'class' },
            { time: '1:10-2:00', subject: 'OOPS Lab', room: 'CL-06', class: 'CS-B', type: 'lab' },
            { time: '2:00-2:50', subject: 'OOPS Lab', room: 'CL-06', class: 'CS-B', type: 'lab' },
            { time: '2:50-3:40', subject: 'OOPS Theory', room: 'LT-19', class: 'CS-A', type: 'class' }
        ],
        'Friday': [
            { time: '9:00-9:50', subject: 'OOPS Lab', room: 'CL-06', class: 'CS-A', type: 'lab' },
            { time: '9:50-10:40', subject: 'OOPS Lab', room: 'CL-06', class: 'CS-A', type: 'lab' },
            { time: '11:30-12:20', subject: 'OOPS Theory', room: 'LT-19', class: 'CS-B', type: 'class' },
            { time: '1:10-2:00', subject: 'OOPS Theory', room: 'LT-19', class: 'CS-C', type: 'class' },
            { time: '2:00-2:50', subject: 'OOPS Lab', room: 'CL-06', class: 'CS-B', type: 'lab' },
            { time: '2:50-3:40', subject: 'OOPS Lab', room: 'CL-06', class: 'CS-B', type: 'lab' }
        ],
        'Saturday': [
            { time: '9:00-9:50', subject: 'OOPS Theory', room: 'LT-19', class: 'CS-C', type: 'class' },
            { time: '9:50-10:40', subject: 'OOPS Theory', room: 'LT-19', class: 'CS-A', type: 'class' },
            { time: '10:40-11:30', subject: 'OOPS Lab', room: 'CL-06', class: 'CS-B', type: 'lab' },
            { time: '11:30-12:20', subject: 'OOPS Lab', room: 'CL-06', class: 'CS-B', type: 'lab' }
        ]
    };

    const daySchedule = teacherSchedules[day];
    if (!daySchedule) return;

    const scheduleContainer = document.querySelector('#schedule-section .schedule-container');
    scheduleContainer.innerHTML = `
        <div class="schedule-title">${day}'s Teaching Schedule</div>
        <div class="row g-3">
            ${daySchedule.map(item => `
                <div class="col-md-6 col-lg-4">
                    <div class="card h-100 ${item.type === 'lab' ? 'border-success' : 'border-primary'}">
                        <div class="card-body">
                            <h6 class="card-title text-${item.type === 'lab' ? 'success' : 'primary'}">
                                ${item.subject}
                            </h6>
                            <p class="card-text mb-1">
                                <i class="bi bi-clock me-1"></i>${item.time}
                            </p>
                            <p class="card-text mb-1">
                                <i class="bi bi-geo-alt me-1"></i>${item.room}
                            </p>
                            <p class="card-text mb-0">
                                <i class="bi bi-people me-1"></i>${item.class}
                            </p>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
        <div class="mt-3">
            <button class="btn btn-outline-secondary btn-sm" onclick="showWeekView()">
                <i class="bi bi-arrow-left me-1"></i>Back to Week View
            </button>
        </div>
    `;
    
    showMessage(`📅 Showing ${day}'s teaching schedule`, 'info');
}

function showWeekView() {
    const scheduleContainer = document.querySelector('#schedule-section .schedule-container');
    scheduleContainer.innerHTML = `
        <div class="schedule-title">Weekly Teaching Schedule</div>
        <div class="schedule-grid">
            <div class="header">Time</div>
            <div class="header">Monday</div>
            <div class="header">Tuesday</div>
            <div class="header">Wednesday</div>
            <div class="header">Thursday</div>
            <div class="header">Friday</div>
            <div class="header">Saturday</div>
            
            <div class="header">9:00-9:50</div>
            <div class="cell lab">Lab</div>
            <div class="cell class">Class</div>
            <div class="cell class">Class</div>
            <div class="cell free">Free</div>
            <div class="cell lab">Lab</div>
            <div class="cell class">Class</div>
            
            <div class="header">9:50-10:40</div>
            <div class="cell lab">Lab</div>
            <div class="cell class">Class</div>
            <div class="cell free">Free</div>
            <div class="cell class">Class</div>
            <div class="cell lab">Lab</div>
            <div class="cell class">Class</div>
            
            <div class="header">10:40-11:30</div>
            <div class="cell class">Class</div>
            <div class="cell class">Class</div>
            <div class="cell lab">Lab</div>
            <div class="cell class">Class</div>
            <div class="cell free">Free</div>
            <div class="cell lab">Lab</div>
            
            <div class="header">11:30-12:20</div>
            <div class="cell class">Class</div>
            <div class="cell class">Class</div>
            <div class="cell lab">Lab</div>
            <div class="cell free">Free</div>
            <div class="cell class">Class</div>
            <div class="cell lab">Lab</div>
            
            <div class="header">12:20-1:10</div>
            <div class="cell break">BREAK</div>
            <div class="cell break">BREAK</div>
            <div class="cell break">BREAK</div>
            <div class="cell break">BREAK</div>
            <div class="cell break">BREAK</div>
            <div class="cell break">BREAK</div>
            
            <div class="header">1:10-2:00</div>
            <div class="cell free">Free</div>
            <div class="cell class">Class</div>
            <div class="cell class">Class</div>
            <div class="cell lab">Lab</div>
            <div class="cell class">Class</div>
            <div class="cell free">Free</div>
            
            <div class="header">2:00-2:50</div>
            <div class="cell class">Class</div>
            <div class="cell lab">Lab</div>
            <div class="cell free">Free</div>
            <div class="cell lab">Lab</div>
            <div class="cell lab">Lab</div>
            <div class="cell free">Free</div>
            
            <div class="header">2:50-3:40</div>
            <div class="cell class">Class</div>
            <div class="cell lab">Lab</div>
            <div class="cell class">Class</div>
            <div class="cell class">Class</div>
            <div class="cell lab">Lab</div>
            <div class="cell free">Free</div>
        </div>
    `;
    
    showMessage('📅 Showing weekly teaching schedule', 'info');
}

// Initialize animations
function initializeAnimations() {
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

    document.querySelectorAll('.fade-in').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// Footer interaction functions
function quickAttendance() {
    document.querySelector('[data-section="attendance"]').click();
    showMessage('📊 Loading attendance management...', 'info');
}

function viewSchedule() {
    document.querySelector('[data-section="schedule"]').click();
    showMessage('📅 Loading your teaching schedule...', 'info');
}

function exportData() {
    showMessage('📥 Exporting teacher data...', 'info');
    setTimeout(() => {
        showMessage('✅ Data exported successfully!', 'success');
    }, 1500);
}

// Update last sync time
function updateLastSync() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    const syncElement = document.getElementById('lastSync');
    if (syncElement) {
        syncElement.textContent = timeString;
    }
}

// Initialize sync time on load
setTimeout(updateLastSync, 1000);

// Logout and Settings functions
function logout() {
    showMessage('👋 Logging out...', 'info');
    setTimeout(() => {
        window.location.href = 'welcome.html';
    }, 1000);
}

function showSettings() {
    showMessage('⚙️ Settings coming soon! Till date enjoy the demo', 'info');
}