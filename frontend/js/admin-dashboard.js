// Admin Dashboard JavaScript
class AdminDashboard {
    constructor() {
        this.students = [];
        this.teachers = [];
        this.attendance = [];
        this.grades = [];
        this.init();
    }

    init() {
        // Check authentication
        if (!authManager.isAuthenticated() || authManager.getCurrentUser().role !== 'admin') {
            window.location.href = 'index.html';
            return;
        }

        // Load sample data
        this.loadSampleData();
        
        // Initialize event listeners
        this.initEventListeners();
        
        // Update user info
        document.getElementById('adminName').textContent = authManager.getCurrentUser().name;
        
        // Show dashboard by default
        this.showSection('dashboard');
    }

    loadSampleData() {
        // Sample students data
        this.students = [
            { id: 'STU001', name: 'Alice Johnson', course: 'Computer Science', admissionDate: '2024-01-15', status: 'Active', parentContact: '+1234567890' },
            { id: 'STU002', name: 'Bob Smith', course: 'Mathematics', admissionDate: '2024-01-20', status: 'Active', parentContact: '+1234567891' },
            { id: 'STU003', name: 'Carol Davis', course: 'Physics', admissionDate: '2024-02-01', status: 'Active', parentContact: '+1234567892' },
            { id: 'STU004', name: 'David Wilson', course: 'Computer Science', admissionDate: '2024-02-10', status: 'Inactive', parentContact: '+1234567893' },
            { id: 'STU005', name: 'Eva Brown', course: 'Mathematics', admissionDate: '2024-02-15', status: 'Active', parentContact: '+1234567894' }
        ];

        // Sample teachers data
        this.teachers = [
            { id: 'TCH001', name: 'Dr. John Smith', subject: 'Computer Science', department: 'Engineering' },
            { id: 'TCH002', name: 'Prof. Sarah Johnson', subject: 'Mathematics', department: 'Science' },
            { id: 'TCH003', name: 'Dr. Michael Brown', subject: 'Physics', department: 'Science' }
        ];

        // Update dashboard stats
        this.updateDashboardStats();
        this.renderStudentsTable();
    }

    initEventListeners() {
        // Navigation
        document.querySelectorAll('.sidebar .nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('data-section');
                this.showSection(section);
                
                // Update active nav
                document.querySelectorAll('.sidebar .nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });

        // Search functionality
        const searchInput = document.getElementById('studentSearch');
        if (searchInput) {
            searchInput.addEventListener('input', () => this.filterStudents());
        }

        const courseFilter = document.getElementById('courseFilter');
        if (courseFilter) {
            courseFilter.addEventListener('change', () => this.filterStudents());
        }
    }

    showSection(sectionName) {
        // Hide all sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.add('d-none');
        });

        // Show selected section
        const targetSection = document.getElementById(`${sectionName}-section`);
        if (targetSection) {
            targetSection.classList.remove('d-none');
            targetSection.classList.add('fade-in');
        }
    }

    updateDashboardStats() {
        document.getElementById('totalStudents').textContent = this.students.length;
        document.getElementById('totalTeachers').textContent = this.teachers.length;
        
        // Calculate attendance rate (mock calculation)
        const activeStudents = this.students.filter(s => s.status === 'Active').length;
        const attendanceRate = ((activeStudents / this.students.length) * 100).toFixed(1);
        document.getElementById('attendanceRate').textContent = `${attendanceRate}%`;
        
        document.getElementById('activeCourses').textContent = 
            [...new Set(this.students.map(s => s.course))].length;
    }

    renderStudentsTable() {
        const tbody = document.getElementById('studentsTableBody');
        if (!tbody) return;

        tbody.innerHTML = '';
        
        this.students.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.course}</td>
                <td>${student.admissionDate}</td>
                <td>
                    <span class="badge bg-${student.status === 'Active' ? 'success' : 'secondary'}">
                        ${student.status}
                    </span>
                </td>
                <td>
                    <button class="btn btn-sm btn-outline-primary me-1" onclick="adminDashboard.editStudent('${student.id}')" title="Edit">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="adminDashboard.deleteStudent('${student.id}')" title="Delete">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    filterStudents() {
        const searchTerm = document.getElementById('studentSearch')?.value.toLowerCase() || '';
        const courseFilter = document.getElementById('courseFilter')?.value || '';
        
        let filteredStudents = this.students;
        
        if (searchTerm) {
            filteredStudents = filteredStudents.filter(student => 
                student.name.toLowerCase().includes(searchTerm) ||
                student.id.toLowerCase().includes(searchTerm)
            );
        }
        
        if (courseFilter) {
            filteredStudents = filteredStudents.filter(student => 
                student.course === courseFilter
            );
        }
        
        this.renderFilteredStudents(filteredStudents);
    }

    renderFilteredStudents(students) {
        const tbody = document.getElementById('studentsTableBody');
        if (!tbody) return;

        tbody.innerHTML = '';
        
        students.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.course}</td>
                <td>${student.admissionDate}</td>
                <td>
                    <span class="badge bg-${student.status === 'Active' ? 'success' : 'secondary'}">
                        ${student.status}
                    </span>
                </td>
                <td>
                    <button class="btn btn-sm btn-outline-primary me-1" onclick="adminDashboard.editStudent('${student.id}')" title="Edit">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="adminDashboard.deleteStudent('${student.id}')" title="Delete">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    addStudent() {
        if (!validateForm('addStudentForm')) {
            this.showAlert('Please fill in all required fields.', 'danger');
            return;
        }

        const studentData = {
            id: document.getElementById('studentId').value,
            name: document.getElementById('studentName').value,
            course: document.getElementById('studentCourse').value,
            admissionDate: document.getElementById('admissionDate').value,
            parentContact: document.getElementById('parentContact').value,
            status: 'Active'
        };

        // Check if student ID already exists
        if (this.students.find(s => s.id === studentData.id)) {
            this.showAlert('Student ID already exists!', 'danger');
            return;
        }

        this.students.push(studentData);
        this.renderStudentsTable();
        this.updateDashboardStats();
        
        // Close modal and reset form
        const modal = bootstrap.Modal.getInstance(document.getElementById('addStudentModal'));
        modal.hide();
        document.getElementById('addStudentForm').reset();
        
        this.showAlert('Student added successfully!', 'success');
    }

    editStudent(studentId) {
        const student = this.students.find(s => s.id === studentId);
        if (student) {
            // Populate form with student data (implementation would go here)
            this.showAlert('Edit functionality would be implemented here.', 'info');
        }
    }

    deleteStudent(studentId) {
        if (confirm('Are you sure you want to delete this student?')) {
            this.students = this.students.filter(s => s.id !== studentId);
            this.renderStudentsTable();
            this.updateDashboardStats();
            this.showAlert('Student deleted successfully!', 'success');
        }
    }

    showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        alertDiv.innerHTML = `
            <i class="bi bi-${type === 'success' ? 'check-circle' : type === 'danger' ? 'exclamation-triangle' : 'info-circle'}-fill me-2"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(alertDiv);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 5000);
    }
}

// Global function for modal
function addStudent() {
    adminDashboard.addStudent();
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.adminDashboard = new AdminDashboard();
});