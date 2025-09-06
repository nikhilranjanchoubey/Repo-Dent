#include "../include/sms.h"
#include <iomanip>

// User class implementation
User::User(std::string id, std::string user, std::string pass, std::string r, std::string n)
    : userId(id), username(user), password(pass), role(r), name(n) {}

bool User::authenticate(std::string user, std::string pass) {
    return username == user && password == pass;
}

// Student class implementation
Student::Student(std::string id, std::string user, std::string pass, std::string name,
                std::string sId, std::string c, std::string date, std::string contact)
    : User(id, user, pass, "student", name), studentId(sId), course(c), 
      admissionDate(date), parentContact(contact) {}

std::string Student::toCSV() const {
    return userId + "," + username + "," + password + "," + name + "," + 
           studentId + "," + course + "," + admissionDate + "," + parentContact;
}

Student Student::fromCSV(const std::string& line) {
    std::stringstream ss(line);
    std::string token;
    std::vector<std::string> tokens;
    
    while (std::getline(ss, token, ',')) {
        tokens.push_back(token);
    }
    
    if (tokens.size() >= 8) {
        return Student(tokens[0], tokens[1], tokens[2], tokens[3], 
                      tokens[4], tokens[5], tokens[6], tokens[7]);
    }
    return Student("", "", "", "", "", "", "", "");
}

// Teacher class implementation
Teacher::Teacher(std::string id, std::string user, std::string pass, std::string name,
                std::string tId, std::string sub, std::string dept)
    : User(id, user, pass, "teacher", name), teacherId(tId), subject(sub), department(dept) {}

std::string Teacher::toCSV() const {
    return userId + "," + username + "," + password + "," + name + "," + 
           teacherId + "," + subject + "," + department;
}

Teacher Teacher::fromCSV(const std::string& line) {
    std::stringstream ss(line);
    std::string token;
    std::vector<std::string> tokens;
    
    while (std::getline(ss, token, ',')) {
        tokens.push_back(token);
    }
    
    if (tokens.size() >= 7) {
        return Teacher(tokens[0], tokens[1], tokens[2], tokens[3], 
                      tokens[4], tokens[5], tokens[6]);
    }
    return Teacher("", "", "", "", "", "", "");
}

// Admin class implementation
Admin::Admin(std::string id, std::string user, std::string pass, std::string name)
    : User(id, user, pass, "admin", name) {}

// Attendance class implementation
Attendance::Attendance(std::string sId, std::string d, std::string st, std::string sub)
    : studentId(sId), date(d), status(st), subject(sub) {}

std::string Attendance::toCSV() const {
    return studentId + "," + date + "," + status + "," + subject;
}

Attendance Attendance::fromCSV(const std::string& line) {
    std::stringstream ss(line);
    std::string token;
    std::vector<std::string> tokens;
    
    while (std::getline(ss, token, ',')) {
        tokens.push_back(token);
    }
    
    if (tokens.size() >= 4) {
        return Attendance(tokens[0], tokens[1], tokens[2], tokens[3]);
    }
    return Attendance("", "", "", "");
}

// Grade class implementation
Grade::Grade(std::string sId, std::string sub, std::string exam, float m, float max)
    : studentId(sId), subject(sub), examType(exam), marks(m), maxMarks(max) {}

std::string Grade::toCSV() const {
    return studentId + "," + subject + "," + examType + "," + 
           std::to_string(marks) + "," + std::to_string(maxMarks);
}

Grade Grade::fromCSV(const std::string& line) {
    std::stringstream ss(line);
    std::string token;
    std::vector<std::string> tokens;
    
    while (std::getline(ss, token, ',')) {
        tokens.push_back(token);
    }
    
    if (tokens.size() >= 5) {
        return Grade(tokens[0], tokens[1], tokens[2], 
                    std::stof(tokens[3]), std::stof(tokens[4]));
    }
    return Grade("", "", "", 0.0f, 0.0f);
}

// SMS class implementation
SMS::SMS() {
    loadData();
}

void SMS::loadData() {
    // Load students
    std::ifstream studentFile("../data/students.csv");
    std::string line;
    while (std::getline(studentFile, line)) {
        if (!line.empty()) {
            students.push_back(Student::fromCSV(line));
        }
    }
    studentFile.close();
    
    // Load teachers
    std::ifstream teacherFile("../data/teachers.csv");
    while (std::getline(teacherFile, line)) {
        if (!line.empty()) {
            teachers.push_back(Teacher::fromCSV(line));
        }
    }
    teacherFile.close();
    
    // Load attendance
    std::ifstream attendanceFile("../data/attendance.csv");
    while (std::getline(attendanceFile, line)) {
        if (!line.empty()) {
            attendanceRecords.push_back(Attendance::fromCSV(line));
        }
    }
    attendanceFile.close();
    
    // Load grades
    std::ifstream gradeFile("../data/grades.csv");
    while (std::getline(gradeFile, line)) {
        if (!line.empty()) {
            grades.push_back(Grade::fromCSV(line));
        }
    }
    gradeFile.close();
    
    // Initialize default admin
    admins.push_back(Admin("1", "admin", "admin123", "System Administrator"));
}

void SMS::saveData() {
    // Save students
    std::ofstream studentFile("../data/students.csv");
    for (const auto& student : students) {
        studentFile << student.toCSV() << std::endl;
    }
    studentFile.close();
    
    // Save teachers
    std::ofstream teacherFile("../data/teachers.csv");
    for (const auto& teacher : teachers) {
        teacherFile << teacher.toCSV() << std::endl;
    }
    teacherFile.close();
    
    // Save attendance
    std::ofstream attendanceFile("../data/attendance.csv");
    for (const auto& attendance : attendanceRecords) {
        attendanceFile << attendance.toCSV() << std::endl;
    }
    attendanceFile.close();
    
    // Save grades
    std::ofstream gradeFile("../data/grades.csv");
    for (const auto& grade : grades) {
        gradeFile << grade.toCSV() << std::endl;
    }
    gradeFile.close();
}

bool SMS::addStudent(const Student& student) {
    // Check if student ID already exists
    for (const auto& s : students) {
        if (s.getStudentId() == student.getStudentId()) {
            return false;
        }
    }
    students.push_back(student);
    saveData();
    return true;
}

bool SMS::deleteStudent(const std::string& studentId) {
    auto it = std::remove_if(students.begin(), students.end(),
        [&studentId](const Student& s) { return s.getStudentId() == studentId; });
    
    if (it != students.end()) {
        students.erase(it, students.end());
        saveData();
        return true;
    }
    return false;
}

Student* SMS::findStudent(const std::string& studentId) {
    for (auto& student : students) {
        if (student.getStudentId() == studentId) {
            return &student;
        }
    }
    return nullptr;
}

std::vector<Student> SMS::searchStudents(const std::string& query) {
    std::vector<Student> results;
    for (const auto& student : students) {
        if (student.getName().find(query) != std::string::npos ||
            student.getStudentId().find(query) != std::string::npos ||
            student.getCourse().find(query) != std::string::npos) {
            results.push_back(student);
        }
    }
    return results;
}

bool SMS::addTeacher(const Teacher& teacher) {
    teachers.push_back(teacher);
    saveData();
    return true;
}

bool SMS::markAttendance(const Attendance& attendance) {
    attendanceRecords.push_back(attendance);
    saveData();
    return true;
}

std::vector<Attendance> SMS::getAttendanceByStudent(const std::string& studentId) {
    std::vector<Attendance> results;
    for (const auto& attendance : attendanceRecords) {
        if (attendance.getStudentId() == studentId) {
            results.push_back(attendance);
        }
    }
    return results;
}

std::vector<Attendance> SMS::getAttendanceByDate(const std::string& date) {
    std::vector<Attendance> results;
    for (const auto& attendance : attendanceRecords) {
        if (attendance.getDate() == date) {
            results.push_back(attendance);
        }
    }
    return results;
}

bool SMS::recordGrade(const Grade& grade) {
    grades.push_back(grade);
    saveData();
    return true;
}

std::vector<Grade> SMS::getGradesByStudent(const std::string& studentId) {
    std::vector<Grade> results;
    for (const auto& grade : grades) {
        if (grade.getStudentId() == studentId) {
            results.push_back(grade);
        }
    }
    return results;
}

User* SMS::authenticate(const std::string& username, const std::string& password) {
    // Check admin
    for (auto& admin : admins) {
        if (admin.authenticate(username, password)) {
            return &admin;
        }
    }
    
    // Check teachers
    for (auto& teacher : teachers) {
        if (teacher.authenticate(username, password)) {
            return &teacher;
        }
    }
    
    // Check students
    for (auto& student : students) {
        if (student.authenticate(username, password)) {
            return &student;
        }
    }
    
    return nullptr;
}

void SMS::generateAttendanceReport(const std::string& studentId) {
    std::ofstream report("../data/attendance_report_" + studentId + ".txt");
    auto attendanceList = getAttendanceByStudent(studentId);
    
    report << "Attendance Report for Student ID: " << studentId << std::endl;
    report << "================================================" << std::endl;
    
    int present = 0, total = attendanceList.size();
    for (const auto& att : attendanceList) {
        report << "Date: " << att.getDate() << ", Subject: " << att.getSubject() 
               << ", Status: " << att.getStatus() << std::endl;
        if (att.getStatus() == "Present") present++;
    }
    
    if (total > 0) {
        report << "Attendance Percentage: " << std::fixed << std::setprecision(2) 
               << (float)present / total * 100 << "%" << std::endl;
    }
    
    report.close();
}

void SMS::generateGradeReport(const std::string& studentId) {
    std::ofstream report("../data/grade_report_" + studentId + ".txt");
    auto gradeList = getGradesByStudent(studentId);
    
    report << "Grade Report for Student ID: " << studentId << std::endl;
    report << "============================================" << std::endl;
    
    for (const auto& grade : gradeList) {
        report << "Subject: " << grade.getSubject() << ", Exam: " << grade.getExamType()
               << ", Marks: " << grade.getMarks() << "/" << grade.getMaxMarks() << std::endl;
    }
    
    report.close();
}