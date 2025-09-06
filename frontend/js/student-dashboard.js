// Student Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeDashboard();
    setupNavigation();
});

function initializeDashboard() {
    loadStudentData();
    updateProgressBars();
    setupEventListeners();
}

function setupNavigation() {
    const navLinks = document.querySelectorAll('.sidebar .nav-link');
    const sections = document.querySelectorAll('.content-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            sections.forEach(section => section.classList.add('d-none'));
            
            const targetSection = this.getAttribute('data-section') + '-section';
            const target = document.getElementById(targetSection);
            if (target) {
                target.classList.remove('d-none');
                target.classList.add('fade-in');
            }
        });
    });
}

function loadStudentData() {
    // Simulate loading student data
    const studentData = {
        name: 'Alice Johnson',
        id: 'STU001',
        subjects: 6,
        attendance: 92.5,
        gpa: 3.8,
        assignments: 3,
        rank: 5
    };
    
    // Update stats with animation
    setTimeout(() => {
        animateCounter('totalSubjects', studentData.subjects);
        animateCounter('attendanceRate', studentData.attendance + '%');
        animateCounter('overallGPA', studentData.gpa);
        animateCounter('pendingAssignments', studentData.assignments);
    }, 500);
}

function updateProgressBars() {
    // Animate progress bars
    setTimeout(() => {
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }, 1000);
}

function animateCounter(elementId, targetValue) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const isPercentage = targetValue.toString().includes('%');
    const isDecimal = targetValue.toString().includes('.');
    const numericValue = parseFloat(targetValue);
    const duration = 1500;
    const steps = 40;
    const increment = numericValue / steps;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
            current = numericValue;
            clearInterval(timer);
        }
        
        if (isPercentage) {
            element.textContent = current.toFixed(1) + '%';
        } else if (isDecimal) {
            element.textContent = current.toFixed(1);
        } else {
            element.textContent = Math.floor(current);
        }
    }, duration / steps);
}

function setupEventListeners() {
    // Add hover effects to schedule items
    document.querySelectorAll('.schedule-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effects to contact items
    document.querySelectorAll('.contact-item').forEach(item => {
        item.addEventListener('click', function() {
            const phone = this.querySelector('i.bi-telephone');
            if (phone) {
                showMessage('Contact information copied to clipboard!', 'success');
            }
        });
    });
    
    // Add ripple effect to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', createRipple);
    });
    
    // Schedule week selector
    const weekSelect = document.getElementById('weekSelect');
    if (weekSelect) {
        weekSelect.addEventListener('change', function() {
            loadWeekSchedule(this.value);
        });
    }
    
    // Subject card interactions
    document.querySelectorAll('.subject-card').forEach(card => {
        card.addEventListener('click', function() {
            const subject = this.querySelector('h5').textContent;
            showSubjectDetails(subject);
        });
    });
}

function loadWeekSchedule(week) {
    showMessage('📅 Loading ' + week.toLowerCase() + ' schedule...', 'info');
    setTimeout(() => {
        showMessage('✅ Schedule loaded successfully!', 'success');
    }, 1000);
}

function showSubjectDetails(subject) {
    showMessage('📚 Loading details for ' + subject + '...', 'info');
    setTimeout(() => {
        showMessage('✅ ' + subject + ' details loaded!', 'success');
    }, 800);
}

function showMessage(message, type) {
    const toast = document.createElement('div');
    toast.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    toast.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    toast.innerHTML = `
        <i class="bi bi-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}-fill me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        if (toast.parentNode) {
            toast.remove();
        }
    }, 3000);
}

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
    const schedules = {
        'Monday': [
            { time: '9:00-12:20', subject: 'SpeakUp with Power Persona', room: 'LT-19', type: 'special' },
            { time: '1:10-2:00', subject: 'NextGen TechTrack', room: 'CL-22', type: 'special' },
            { time: '2:00-2:50', subject: 'AEM', room: 'LT-19', faculty: 'Mrs. Ekta Soni', type: 'theory' }
        ],
        'Tuesday': [
            { time: '9:00-10:40', subject: 'DE LAB', room: 'DE LAB', faculty: 'Er. Chhavi Gupta', type: 'lab' },
            { time: '10:40-11:30', subject: 'DE', room: 'LT-18', faculty: 'Er. Chhavi Gupta', type: 'theory' },
            { time: '11:30-12:20', subject: 'MEFA', room: 'LT-18', faculty: 'Mr. Harshit Agarwal', type: 'theory' },
            { time: '1:10-2:50', subject: 'NextGen TechTrack', room: 'CL-22', type: 'special' },
            { time: '2:50-3:40', subject: 'DSA', room: 'LT-18', faculty: 'Dr. Rajeev Kumar', type: 'theory' }
        ],
        'Wednesday': [
            { time: '9:00-9:50', subject: 'DE', room: 'LT-19', faculty: 'Er. Chhavi Gupta', type: 'theory' },
            { time: '9:50-10:40', subject: 'SE', room: 'LT-19', faculty: 'Dr. Vishal Shrivastava', type: 'theory' },
            { time: '10:40-12:20', subject: 'DSA LAB', room: 'CL-05', faculty: 'Dr. Rajeev Kumar', type: 'lab' },
            { time: '1:10-2:00', subject: 'DSA', room: 'LT-19', faculty: 'Dr. Rajeev Kumar', type: 'theory' },
            { time: '2:00-2:50', subject: 'AEM', room: 'LT-19', faculty: 'Mrs. Ekta Soni', type: 'theory' },
            { time: '2:50-3:40', subject: 'OOPS', room: 'LT-19', faculty: 'Dr. Devesh Bandil', type: 'theory' }
        ],
        'Thursday': [
            { time: '9:00-10:40', subject: 'NextGen TechTrack', room: 'CL-22', type: 'special' },
            { time: '10:40-12:20', subject: 'DSA LAB', room: 'CL-05', faculty: 'Dr. Rajeev Kumar', type: 'lab' },
            { time: '1:10-2:00', subject: 'SE', room: 'LT-18', faculty: 'Dr. Vishal Shrivastava', type: 'theory' },
            { time: '2:00-2:50', subject: 'MEFA', room: 'LT-18', faculty: 'Mr. Harshit Agarwal', type: 'theory' },
            { time: '2:50-3:40', subject: 'DE', room: 'LT-18', faculty: 'Er. Chhavi Gupta', type: 'theory' }
        ],
        'Friday': [
            { time: '9:00-10:40', subject: 'NextGen TechTrack', room: 'CL-22', type: 'special' },
            { time: '10:40-12:20', subject: 'SE LAB', room: 'CL-01', faculty: 'Dr. Vishal Shrivastava', type: 'lab' },
            { time: '1:10-2:00', subject: 'OOPS', room: 'LT-19', faculty: 'Dr. Devesh Bandil', type: 'theory' },
            { time: '2:00-3:40', subject: 'OOPS LAB', room: 'CL-06', faculty: 'Dr. Devesh Bandil', type: 'lab' }
        ],
        'Saturday': [
            { time: '9:00-9:50', subject: 'SE', room: 'LT-18', faculty: 'Dr. Vishal Shrivastava', type: 'theory' },
            { time: '9:50-10:40', subject: 'AEM', room: 'LT-18', faculty: 'Mrs. Ekta Soni', type: 'theory' },
            { time: '10:40-12:20', subject: 'OOPS LAB', room: 'CL-06', faculty: 'Dr. Devesh Bandil', type: 'lab' },
            { time: '1:10-3:40', subject: 'Club Activity', room: 'Various Venues', type: 'special' }
        ]
    };

    const daySchedule = schedules[day];
    if (!daySchedule) return;

    const scheduleTable = document.querySelector('.schedule-table tbody');
    scheduleTable.innerHTML = `
        <tr>
            <td class="sticky-col fw-bold">${day}</td>
            <td colspan="8" class="p-4">
                <h5 class="text-primary mb-3">${day}'s Schedule</h5>
                <div class="row g-3">
                    ${daySchedule.map(item => `
                        <div class="col-md-6 col-lg-4">
                            <div class="card h-100 ${item.type === 'lab' ? 'border-success' : item.type === 'special' ? 'border-warning' : 'border-primary'}">
                                <div class="card-body">
                                    <h6 class="card-title text-${item.type === 'lab' ? 'success' : item.type === 'special' ? 'warning' : 'primary'}">
                                        ${item.subject}
                                    </h6>
                                    <p class="card-text mb-1">
                                        <i class="bi bi-clock me-1"></i>${item.time}
                                    </p>
                                    <p class="card-text mb-1">
                                        <i class="bi bi-geo-alt me-1"></i>${item.room}
                                    </p>
                                    ${item.faculty ? `<p class="card-text mb-0"><i class="bi bi-person me-1"></i>${item.faculty}</p>` : ''}
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
            </td>
        </tr>
    `;
    
    showMessage(`📅 Showing ${day}'s schedule`, 'info');
}

function showWeekView() {
    const scheduleTable = document.querySelector('.schedule-table tbody');
    scheduleTable.innerHTML = `
        <tr>
            <td class="sticky-col fw-bold">Monday</td>
            <td colspan="4" class="schedule-cell special-class">
                <div class="class-info">
                    <strong>SpeakUp with Power Persona</strong>
                    <small class="d-block text-muted">LT-19 | Build the Best Version of You</small>
                </div>
            </td>
            <td class="break-cell bg-gradient">🍽️</td>
            <td colspan="2" class="schedule-cell special-class">
                <div class="class-info">
                    <strong>NextGen TechTrack</strong>
                    <small class="d-block text-muted">CL-22 | Focused Competitive Edge</small>
                </div>
            </td>
            <td class="schedule-cell theory-class">
                <div class="class-info">
                    <strong>AEM</strong>
                    <small class="d-block text-muted">LT-19 | Mrs. Ekta Soni</small>
                </div>
            </td>
        </tr>
        <tr>
            <td class="sticky-col fw-bold">Tuesday</td>
            <td colspan="2" class="schedule-cell lab-class">
                <div class="class-info">
                    <strong>DE LAB</strong>
                    <small class="d-block text-muted">DE LAB | Er. Chhavi Gupta</small>
                </div>
            </td>
            <td class="schedule-cell theory-class">
                <div class="class-info">
                    <strong>DE</strong>
                    <small class="d-block text-muted">LT-18 | Er. Chhavi Gupta</small>
                </div>
            </td>
            <td class="schedule-cell theory-class">
                <div class="class-info">
                    <strong>MEFA</strong>
                    <small class="d-block text-muted">LT-18 | Mr. Harshit Agarwal</small>
                </div>
            </td>
            <td class="break-cell bg-gradient">🍽️</td>
            <td colspan="2" class="schedule-cell special-class">
                <div class="class-info">
                    <strong>NextGen TechTrack</strong>
                    <small class="d-block text-muted">CL-22 | Focused Competitive Edge</small>
                </div>
            </td>
            <td class="schedule-cell theory-class">
                <div class="class-info">
                    <strong>DSA</strong>
                    <small class="d-block text-muted">LT-18 | Dr. Rajeev Kumar</small>
                </div>
            </td>
        </tr>
        <tr>
            <td class="sticky-col fw-bold">Wednesday</td>
            <td class="schedule-cell theory-class">
                <div class="class-info">
                    <strong>DE</strong>
                    <small class="d-block text-muted">LT-19 | Er. Chhavi Gupta</small>
                </div>
            </td>
            <td class="schedule-cell theory-class">
                <div class="class-info">
                    <strong>SE</strong>
                    <small class="d-block text-muted">LT-19 | Dr. Vishal Shrivastava</small>
                </div>
            </td>
            <td colspan="2" class="schedule-cell lab-class">
                <div class="class-info">
                    <strong>DSA LAB</strong>
                    <small class="d-block text-muted">CL-05 | Dr. Rajeev Kumar</small>
                </div>
            </td>
            <td class="break-cell bg-gradient">🍽️</td>
            <td class="schedule-cell theory-class">
                <div class="class-info">
                    <strong>DSA</strong>
                    <small class="d-block text-muted">LT-19 | Dr. Rajeev Kumar</small>
                </div>
            </td>
            <td class="schedule-cell theory-class">
                <div class="class-info">
                    <strong>AEM</strong>
                    <small class="d-block text-muted">LT-19 | Mrs. Ekta Soni</small>
                </div>
            </td>
            <td class="schedule-cell theory-class">
                <div class="class-info">
                    <strong>OOPS</strong>
                    <small class="d-block text-muted">LT-19 | Dr. Devesh Bandil</small>
                </div>
            </td>
        </tr>
        <tr>
            <td class="sticky-col fw-bold">Thursday</td>
            <td colspan="2" class="schedule-cell special-class">
                <div class="class-info">
                    <strong>NextGen TechTrack</strong>
                    <small class="d-block text-muted">CL-22 | Focused Competitive Edge</small>
                </div>
            </td>
            <td colspan="2" class="schedule-cell lab-class">
                <div class="class-info">
                    <strong>DSA LAB</strong>
                    <small class="d-block text-muted">CL-05 | Dr. Rajeev Kumar</small>
                </div>
            </td>
            <td class="break-cell bg-gradient">🍽️</td>
            <td class="schedule-cell theory-class">
                <div class="class-info">
                    <strong>SE</strong>
                    <small class="d-block text-muted">LT-18 | Dr. Vishal Shrivastava</small>
                </div>
            </td>
            <td class="schedule-cell theory-class">
                <div class="class-info">
                    <strong>MEFA</strong>
                    <small class="d-block text-muted">LT-18 | Mr. Harshit Agarwal</small>
                </div>
            </td>
            <td class="schedule-cell theory-class">
                <div class="class-info">
                    <strong>DE</strong>
                    <small class="d-block text-muted">LT-18 | Er. Chhavi Gupta</small>
                </div>
            </td>
        </tr>
        <tr>
            <td class="sticky-col fw-bold">Friday</td>
            <td colspan="2" class="schedule-cell special-class">
                <div class="class-info">
                    <strong>NextGen TechTrack</strong>
                    <small class="d-block text-muted">CL-22 | Focused Competitive Edge</small>
                </div>
            </td>
            <td colspan="2" class="schedule-cell lab-class">
                <div class="class-info">
                    <strong>SE LAB</strong>
                    <small class="d-block text-muted">CL-01 | Dr. Vishal Shrivastava</small>
                </div>
            </td>
            <td class="break-cell bg-gradient">🍽️</td>
            <td class="schedule-cell theory-class">
                <div class="class-info">
                    <strong>OOPS</strong>
                    <small class="d-block text-muted">LT-19 | Dr. Devesh Bandil</small>
                </div>
            </td>
            <td colspan="2" class="schedule-cell lab-class">
                <div class="class-info">
                    <strong>OOPS LAB</strong>
                    <small class="d-block text-muted">CL-06 | Dr. Devesh Bandil</small>
                </div>
            </td>
        </tr>
        <tr>
            <td class="sticky-col fw-bold">Saturday</td>
            <td class="schedule-cell theory-class">
                <div class="class-info">
                    <strong>SE</strong>
                    <small class="d-block text-muted">LT-18 | Dr. Vishal Shrivastava</small>
                </div>
            </td>
            <td class="schedule-cell theory-class">
                <div class="class-info">
                    <strong>AEM</strong>
                    <small class="d-block text-muted">LT-18 | Mrs. Ekta Soni</small>
                </div>
            </td>
            <td colspan="2" class="schedule-cell lab-class">
                <div class="class-info">
                    <strong>OOPS LAB</strong>
                    <small class="d-block text-muted">CL-06 | Dr. Devesh Bandil</small>
                </div>
            </td>
            <td class="break-cell bg-gradient">🍽️</td>
            <td colspan="3" class="schedule-cell special-class">
                <div class="class-info">
                    <strong>Club Activity</strong>
                    <small class="d-block text-muted">Various Venues</small>
                </div>
            </td>
        </tr>
    `;
    
    showMessage('📅 Showing weekly schedule', 'info');
}

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
    
    // Animate stats cards on load
    document.querySelectorAll('.stats-card, .stats-card-success, .stats-card-warning, .stats-card-info').forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('bounce-in');
        }, index * 200);
    });
    
    // Animate subject cards
    document.querySelectorAll('.subject-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

// Footer interaction functions
function quickGrades() {
    document.querySelector('[data-section="grades"]').click();
    showMessage('📊 Loading your grades...', 'info');
}

function contactMentor() {
    showMessage('📞 Mentor Contact: Dr. Devesh Bandil - +91-9876543210', 'success');
}

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