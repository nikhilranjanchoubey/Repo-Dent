#ifndef SMS_H
#define SMS_H

#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <sstream>
#include <algorithm>

class User {
protected:
    std::string userId;
    std::string username;
    std::string password;
    std::string role;
    std::string name;

public:
    User(std::string id, std::string user, std::string pass, std::string r, std::string n);
    virtual ~User() {}
    std::string getUserId() const { return userId; }
    std::string getUsername() const { return username; }
    std::string getRole() const { return role; }
    std::string getName() const { return name; }
    bool authenticate(std::string user, std::string pass);
};

class Student : public User {
private:
    std::string studentId;
    std::string course;
    std::string admissionDate;
    std::string parentContact;

public:
    Student(std::string id, std::string user, std::string pass, std::string name, 
            std::string sId, std::string c, std::string date, std::string contact);
    std::string getStudentId() const { return studentId; }
    std::string getCourse() const { return course; }
    std::string getAdmissionDate() const { return admissionDate; }
    std::string getParentContact() const { return parentContact; }
    std::string toCSV() const;
    static Student fromCSV(const std::string& line);
};

class Teacher : public User {
private:
    std::string teacherId;
    std::string subject;
    std::string department;

public:
    Teacher(std::string id, std::string user, std::string pass, std::string name,
            std::string tId, std::string sub, std::string dept);
    std::string getTeacherId() const { return teacherId; }
    std::string getSubject() const { return subject; }
    std::string getDepartment() const { return department; }
    std::string toCSV() const;
    static Teacher fromCSV(const std::string& line);
};

class Admin : public User {
public:
    Admin(std::string id, std::string user, std::string pass, std::string name);
};

class Attendance {
private:
    std::string studentId;
    std::string date;
    std::string status;
    std::string subject;

public:
    Attendance(std::string sId, std::string d, std::string st, std::string sub);
    std::string getStudentId() const { return studentId; }
    std::string getDate() const { return date; }
    std::string getStatus() const { return status; }
    std::string getSubject() const { return subject; }
    std::string toCSV() const;
    static Attendance fromCSV(const std::string& line);
};

class Grade {
private:
    std::string studentId;
    std::string subject;
    std::string examType;
    float marks;
    float maxMarks;

public:
    Grade(std::string sId, std::string sub, std::string exam, float m, float max);
    std::string getStudentId() const { return studentId; }
    std::string getSubject() const { return subject; }
    std::string getExamType() const { return examType; }
    float getMarks() const { return marks; }
    float getMaxMarks() const { return maxMarks; }
    std::string toCSV() const;
    static Grade fromCSV(const std::string& line);
};

class SMS {
private:
    std::vector<Student> students;
    std::vector<Teacher> teachers;
    std::vector<Admin> admins;
    std::vector<Attendance> attendanceRecords;
    std::vector<Grade> grades;

public:
    SMS();
    
    // File operations
    void loadData();
    void saveData();
    
    // Student management
    bool addStudent(const Student& student);
    bool deleteStudent(const std::string& studentId);
    Student* findStudent(const std::string& studentId);
    std::vector<Student> searchStudents(const std::string& query);
    std::vector<Student> getAllStudents() const { return students; }
    
    // Teacher management
    bool addTeacher(const Teacher& teacher);
    std::vector<Teacher> getAllTeachers() const { return teachers; }
    
    // Attendance management
    bool markAttendance(const Attendance& attendance);
    std::vector<Attendance> getAttendanceByStudent(const std::string& studentId);
    std::vector<Attendance> getAttendanceByDate(const std::string& date);
    
    // Grade management
    bool recordGrade(const Grade& grade);
    std::vector<Grade> getGradesByStudent(const std::string& studentId);
    
    // Authentication
    User* authenticate(const std::string& username, const std::string& password);
    
    // Reports
    void generateAttendanceReport(const std::string& studentId);
    void generateGradeReport(const std::string& studentId);
};

#endif