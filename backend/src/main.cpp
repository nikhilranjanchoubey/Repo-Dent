#include "../include/sms.h"
#include <iostream>
#include <ctime>

void displayMenu(const std::string& role) {
    std::cout << "\n=== Student Management System ===" << std::endl;
    std::cout << "Role: " << role << std::endl;
    
    if (role == "admin") {
        std::cout << "1. Add Student" << std::endl;
        std::cout << "2. Delete Student" << std::endl;
        std::cout << "3. Search Students" << std::endl;
        std::cout << "4. View All Students" << std::endl;
        std::cout << "5. Add Teacher" << std::endl;
        std::cout << "6. Mark Attendance" << std::endl;
        std::cout << "7. Record Grade" << std::endl;
        std::cout << "8. Generate Reports" << std::endl;
    } else if (role == "teacher") {
        std::cout << "1. View Students" << std::endl;
        std::cout << "2. Mark Attendance" << std::endl;
        std::cout << "3. Record Grade" << std::endl;
        std::cout << "4. View Attendance" << std::endl;
    } else if (role == "student") {
        std::cout << "1. View My Grades" << std::endl;
        std::cout << "2. View My Attendance" << std::endl;
    }
    
    std::cout << "0. Logout" << std::endl;
    std::cout << "Choice: ";
}

std::string getCurrentDate() {
    time_t now = time(0);
    char* dt = ctime(&now);
    std::string date(dt);
    date.pop_back(); // Remove newline
    return date.substr(0, 10); // Get date part only
}

void adminMenu(SMS& sms) {
    int choice;
    while (true) {
        displayMenu("admin");
        std::cin >> choice;
        
        switch (choice) {
            case 1: {
                std::string id, username, password, name, studentId, course, date, contact;
                std::cout << "Enter User ID: "; std::cin >> id;
                std::cout << "Enter Username: "; std::cin >> username;
                std::cout << "Enter Password: "; std::cin >> password;
                std::cout << "Enter Name: "; std::cin.ignore(); std::getline(std::cin, name);
                std::cout << "Enter Student ID: "; std::cin >> studentId;
                std::cout << "Enter Course: "; std::cin.ignore(); std::getline(std::cin, course);
                std::cout << "Enter Admission Date (YYYY-MM-DD): "; std::cin >> date;
                std::cout << "Enter Parent Contact: "; std::cin >> contact;
                
                Student student(id, username, password, name, studentId, course, date, contact);
                if (sms.addStudent(student)) {
                    std::cout << "Student added successfully!" << std::endl;
                } else {
                    std::cout << "Error: Student ID already exists!" << std::endl;
                }
                break;
            }
            case 2: {
                std::string studentId;
                std::cout << "Enter Student ID to delete: ";
                std::cin >> studentId;
                if (sms.deleteStudent(studentId)) {
                    std::cout << "Student deleted successfully!" << std::endl;
                } else {
                    std::cout << "Student not found!" << std::endl;
                }
                break;
            }
            case 3: {
                std::string query;
                std::cout << "Enter search query: ";
                std::cin.ignore();
                std::getline(std::cin, query);
                auto results = sms.searchStudents(query);
                std::cout << "Search Results:" << std::endl;
                for (const auto& student : results) {
                    std::cout << "ID: " << student.getStudentId() << ", Name: " << student.getName()
                             << ", Course: " << student.getCourse() << std::endl;
                }
                break;
            }
            case 4: {
                auto students = sms.getAllStudents();
                std::cout << "All Students:" << std::endl;
                for (const auto& student : students) {
                    std::cout << "ID: " << student.getStudentId() << ", Name: " << student.getName()
                             << ", Course: " << student.getCourse() << std::endl;
                }
                break;
            }
            case 5: {
                std::string id, username, password, name, teacherId, subject, department;
                std::cout << "Enter User ID: "; std::cin >> id;
                std::cout << "Enter Username: "; std::cin >> username;
                std::cout << "Enter Password: "; std::cin >> password;
                std::cout << "Enter Name: "; std::cin.ignore(); std::getline(std::cin, name);
                std::cout << "Enter Teacher ID: "; std::cin >> teacherId;
                std::cout << "Enter Subject: "; std::cin.ignore(); std::getline(std::cin, subject);
                std::cout << "Enter Department: "; std::getline(std::cin, department);
                
                Teacher teacher(id, username, password, name, teacherId, subject, department);
                sms.addTeacher(teacher);
                std::cout << "Teacher added successfully!" << std::endl;
                break;
            }
            case 6: {
                std::string studentId, date, status, subject;
                std::cout << "Enter Student ID: "; std::cin >> studentId;
                std::cout << "Enter Date (YYYY-MM-DD) or press Enter for today: ";
                std::cin.ignore();
                std::getline(std::cin, date);
                if (date.empty()) date = getCurrentDate();
                std::cout << "Enter Status (Present/Absent): "; std::cin >> status;
                std::cout << "Enter Subject: "; std::cin.ignore(); std::getline(std::cin, subject);
                
                Attendance attendance(studentId, date, status, subject);
                sms.markAttendance(attendance);
                std::cout << "Attendance marked successfully!" << std::endl;
                break;
            }
            case 7: {
                std::string studentId, subject, examType;
                float marks, maxMarks;
                std::cout << "Enter Student ID: "; std::cin >> studentId;
                std::cout << "Enter Subject: "; std::cin.ignore(); std::getline(std::cin, subject);
                std::cout << "Enter Exam Type: "; std::getline(std::cin, examType);
                std::cout << "Enter Marks: "; std::cin >> marks;
                std::cout << "Enter Max Marks: "; std::cin >> maxMarks;
                
                Grade grade(studentId, subject, examType, marks, maxMarks);
                sms.recordGrade(grade);
                std::cout << "Grade recorded successfully!" << std::endl;
                break;
            }
            case 8: {
                std::string studentId;
                std::cout << "Enter Student ID for reports: ";
                std::cin >> studentId;
                sms.generateAttendanceReport(studentId);
                sms.generateGradeReport(studentId);
                std::cout << "Reports generated successfully!" << std::endl;
                break;
            }
            case 0:
                return;
            default:
                std::cout << "Invalid choice!" << std::endl;
        }
    }
}

int main() {
    SMS sms;
    
    std::cout << "=== Student Management System Login ===" << std::endl;
    std::string username, password;
    std::cout << "Username: "; std::cin >> username;
    std::cout << "Password: "; std::cin >> password;
    
    User* user = sms.authenticate(username, password);
    if (user) {
        std::cout << "Login successful! Welcome, " << user->getName() << std::endl;
        
        if (user->getRole() == "admin") {
            adminMenu(sms);
        } else {
            std::cout << "Dashboard for " << user->getRole() << " is under development." << std::endl;
        }
    } else {
        std::cout << "Invalid credentials!" << std::endl;
    }
    
    return 0;
}