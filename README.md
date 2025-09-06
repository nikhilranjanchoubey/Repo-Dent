# Learnilo - Student Management System (SMS)

A modern, comprehensive Student Management System built with C/C++ backend and cutting-edge web frontend using Bootstrap 5. Features real Arya College of Engineering & IT data with interactive demo capabilities and glass morphism design.

## 🏗️ Project Structure

```
SMS/
├── backend/                 # C/C++ Backend
│   ├── include/            # Header files
│   │   └── sms.h          # Main SMS class definitions
│   ├── src/               # Source files
│   │   ├── sms.cpp        # SMS implementation
│   │   └── main.cpp       # Main application
│   ├── obj/               # Object files (generated)
│   ├── bin/               # Executable files (generated)
│   └── Makefile           # Build configuration
├── frontend/              # Web Frontend
│   ├── css/
│   │   ├── style.css      # Main styles with animations
│   │   ├── footer-styles.css
│   │   └── schedule-styles.css
│   ├── js/
│   │   ├── auth.js        # Authentication system
│   │   ├── admin-dashboard.js
│   │   ├── teacher-dashboard.js
│   │   ├── student-dashboard.js
│   │   ├── parent-dashboard.js
│   │   └── footer-interactions.js
│   ├── index.html         # Main login page
│   ├── welcome.html       # Modern landing page with role selection
   ├── signup.html        # Registration page
   ├── category.html      # Educational categories page
│   ├── admin-dashboard.html
│   ├── teacher-dashboard.html
│   ├── student-dashboard.html
│   └── parent-dashboard.html
├── data/                  # Data storage (CSV files)
│   ├── students.csv       # Student records
│   ├── teachers.csv       # Teacher records
│   ├── attendance.csv     # Attendance records
│   └── grades.csv         # Grade records
└── README.md             # This file
```

## 🚀 Features

### Core Modules
- **Student Admission & Registration**: Add, edit, delete, search student records
- **Attendance Management**: Daily/period-wise attendance tracking with reports
- **Academic Performance**: Grade entry, updates, and performance tracking
- **User Role Management**: Admin, Teacher, Student, Parent dashboards
- **Report Generation**: Attendance reports, grade reports, admission statistics
- **Timetable Scheduling**: Class scheduling and management
- **Notifications**: Announcements and system notifications

### User Roles & Permissions
- **Admin**: Full system access, manage all records, user roles, reports
- **Teacher**: Take attendance, record grades, view teaching schedule, manage student details
- **Student**: View class schedule, attendance records, grades & marks, contact teachers
- **Parent**: Monitor child's attendance, academic progress, contact teachers, receive school updates

## 🛠️ Technology Stack

### Backend
- **Language**: C++ with OOP concepts
- **Data Storage**: CSV files (MySQL-ready structure)
- **Features**: File handling, CRUD operations, data structures

### Frontend
- **Framework**: Bootstrap 5
- **Languages**: HTML5, CSS3, JavaScript (ES6+)
- **Features**: Responsive design, ARIA compliance, real-time validation

## 📋 Prerequisites

### For Backend (C++)
- GCC compiler (g++) version 7.0 or higher
- Make utility (for building)
- Windows: MinGW-w64 or Visual Studio Build Tools

### For Frontend
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for better development experience)

## 🔧 Installation & Setup

### 1. Clone/Download the Project
```bash
git clone <repository-url>
cd SMS
```

### 2. Backend Setup

#### On Windows:
```cmd
cd backend
mingw32-make all
```

#### On Linux/Mac:
```bash
cd backend
make all
```

### 3. Initialize Data Files
The system will automatically create data files on first run. Sample data is already provided in the `data/` directory.

### 4. Frontend Setup
Simply open `frontend/index.html` in your web browser, or use a local server:

```bash
# Using Python (if installed)
cd frontend
python -m http.server 8000

# Using Node.js (if installed)
npx http-server

# Then open http://localhost:8000
```

## 🎮 Usage Instructions

### Running the Backend Application

#### Windows:
```cmd
cd backend
make run-win
```

#### Linux/Mac:
```bash
cd backend
make run
```

### Using the Web Interface

1. **Landing Page**: Open `frontend/welcome.html` in your browser
2. **Interactive Demo**: Click on "Interactive Demo" card to view credentials
3. **Demo Credentials**:
   - **Teacher**: `teacher@sms.edu` / `teacher123`
   - **Student**: `student@sms.edu` / `student123`
   - **Parent**: `parent@sms.edu` / `parent123`
4. **Navigation**: Use navbar for Login/Register or explore Categories

### Backend Console Interface

The C++ application provides a console interface for:
- Adding/deleting students
- Managing teachers
- Recording attendance
- Entering grades
- Generating reports

## 📊 Sample Data

The system comes with real Arya College of Engineering & IT data:

### Students (III SEM CS-B)
- NIKHIL (CS-B-01) - Computer Science & Engineering
- PRASHANT (CS-B-02) - Computer Science & Engineering
- MD. SAHIL (CS-B-03) - Computer Science & Engineering
- MUKESH (CS-B-04) - Computer Science & Engineering
- MUSKAN (CS-B-05) - Computer Science & Engineering

### Faculty
- **Dr. Devesh Bandil** - OOPS & Mentor (CS-B)
- **Dr. Vishal Shrivastava** - Software Engineering
- **Dr. Rajeev Kumar** - Data Structures & Algorithms
- **Er. Chhavi Gupta** - Digital Electronics
- **Mrs. Ekta Soni** - Applied Engineering Management
- **Mr. Harshit Agarwal** - Mathematics for Engineers & Applications

### Real Academic Data
- **Timetable**: III SEM CS-B weekly schedule with actual room allocations
- **Subjects**: SE, OOPS, DSA, DE, MEFA, AEM with lab sessions
- **Attendance**: Real attendance tracking with percentage calculations
- **Grades**: Midterm marks, assignments, and performance analytics

## 🏛️ UML Implementation

The system follows UML design patterns:

### Class Diagram Implementation
- **User** (base class): userId, username, password, role, name
- **Student** (inherits User): studentId, course, admissionDate, parentContact
- **Teacher** (inherits User): teacherId, subject, department
- **Admin** (inherits User): administrative privileges
- **Attendance**: studentId, date, status, subject
- **Grade**: studentId, subject, examType, marks, maxMarks

### Use Cases Implemented
- Login/Authentication
- Manage Student Records (CRUD)
- Update Attendance
- Record Grades
- Generate Reports
- View Dashboards

## 🔒 Security Features

- **Role-based Access Control**: Different permissions for each user type
- **Session Management**: 30-minute session timeout
- **Input Validation**: Real-time form validation with accessibility compliance
- **Data Integrity**: CSV file validation and error handling
- **Accessibility**: ARIA labels, semantic HTML, and screen reader support

## 📱 Modern Design & Features

- **Glass Morphism UI**: Modern transparent design with backdrop blur effects
- **Interactive Demo**: Click-to-view demo credentials with modal popups
- **Responsive Design**: Mobile-first Bootstrap 5 grid system
- **Modern Animations**: Smooth transitions, hover effects, and loading states
- **Accessibility Compliant**: Full ARIA support and semantic HTML
- **Cross-Browser Compatible**: Works on Chrome, Firefox, Safari, and Edge
- **Modern Typography**: Poppins font with gradient text effects
- **Interactive Elements**: Hover cards, animated buttons, and smooth scrolling

## 🔄 Backend-Frontend Integration

### Data Flow
1. **Backend**: C++ application manages data in CSV files
2. **Frontend**: JavaScript simulates API calls with local storage
3. **Integration**: Both systems use the same data structure

### File Formats
All data is stored in CSV format with real academic structure:
- `students.csv`: III SEM CS-B student records with parent contacts
- `teachers.csv`: Arya College faculty with subjects and contact details
- `attendance.csv`: Subject-wise attendance with percentage tracking
- `grades.csv`: Midterm, assignment, and overall performance records

## 🚀 Future Enhancements

### Database Integration
The system is designed for easy MySQL integration:
```sql
-- Example table structure
CREATE TABLE students (
    user_id INT PRIMARY KEY,
    username VARCHAR(50),
    password VARCHAR(100),
    name VARCHAR(100),
    student_id VARCHAR(20),
    course VARCHAR(100),
    admission_date DATE,
    parent_contact VARCHAR(20)
);
```

### API Development
- RESTful API endpoints
- JSON data exchange
- Real-time updates

## 🐛 Troubleshooting

### Common Issues

1. **Compilation Errors**:
   ```bash
   # Ensure g++ is installed
   g++ --version
   
   # Clean and rebuild
   make clean
   make all
   ```

2. **File Permission Issues**:
   ```bash
   # On Linux/Mac, ensure write permissions
   chmod 755 data/
   chmod 644 data/*.csv
   ```

3. **Frontend Not Loading**:
   - Check browser console for JavaScript errors
   - Ensure all files are in correct directories
   - Try using a local web server

### Build Commands Reference

```bash
# Build the application
make all

# Clean build files
make clean

# Run the application
make run          # Linux/Mac
make run-win      # Windows

# Show help
make help
```

## 📄 License

This project is created for educational purposes. Feel free to use and modify as needed.

## 👥 Contributors

- **System Architecture**: UML-based design with real college data integration
- **Backend Development**: C++ with OOP principles and file handling
- **Frontend Development**: Modern Bootstrap 5 + JavaScript with glass morphism design
- **UI/UX Design**: Contemporary interface with accessibility compliance
- **Data Integration**: Real timetables, faculty data, and student records from Arya College
- **Brand Design**: Learnilo branding with modern typography and visual identityples
- **Frontend Development**: Bootstrap 5 + JavaScript with modern CSS animations
- **Data Management**: CSV file handling with Arya College academic structure
- **UI/UX Design**: Modern glass morphism interface with accessibility compliance
- **Academic Integration**: Real timetables, faculty data, and student records

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Verify all prerequisites are installed
3. Ensure file permissions are correct
4. Check browser console for frontend issues

## 🎯 Key Highlights

- **Real College Data**: Integrated with Arya College of Engineering & IT academic structure
- **Complete Timetable System**: III SEM CS-B schedule with actual room allocations (LT-18, LT-19, CL-01, etc.)
- **Faculty Integration**: Real faculty names and contact information
- **Modern Interface**: Glass morphism design with smooth animations
- **Accessibility Compliant**: Full ARIA support and semantic HTML
- **Multi-Role Support**: Separate dashboards for Admin, Teacher, Student, and Parent
- **Interactive Features**: Day/week schedule views, progress tracking, and real-time updates

---

## 🌟 New Features

- **Landing Page**: Modern welcome page with role cards and feature highlights
- **Demo Credentials Modal**: Interactive popup showing login credentials
- **Category Pages**: Coming soon pages for different educational institutions
- **Registration System**: Signup page with demo message
- **Modern Footer**: Glass morphism footer with hover effects (display-only)
- **Responsive Design**: Optimized for all screen sizes

---

**Note**: Learnilo is a complete, functional Student Management System showcasing modern web development practices. Built for educational purposes with real academic data from Arya College of Engineering & IT, demonstrating contemporary UI/UX design principles and accessibility standards.