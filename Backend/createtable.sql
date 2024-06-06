CREATE TABLE Admin (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    Password VARCHAR(255) NOT NULL
);

CREATE TABLE Departments (
    DeptId INT AUTO_INCREMENT PRIMARY KEY,
    DeptName VARCHAR(100) NOT NULL,
    HeadOfDept VARCHAR(100)
);

CREATE TABLE Faculty (
    FacultyId INT AUTO_INCREMENT PRIMARY KEY,
    FullName VARCHAR(50) NOT NULL,
    Gender VARCHAR(10),
    Qualification VARCHAR(100),
    Experience INT,
    Designation VARCHAR(50)
);

CREATE TABLE Students (
    Sid INT AUTO_INCREMENT PRIMARY KEY,
    FullName VARCHAR(100) NOT NULL,
    DOB DATE,
    Gender VARCHAR(10),
    Blood VARCHAR(10),
    Address TEXT,
    Phone VARCHAR(20),
    Email VARCHAR(100) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    DeptId INT,
    FOREIGN KEY (DeptId) REFERENCES Departments(DeptId)
);

CREATE TABLE Courses (
    CourseId VARCHAR(255) PRIMARY KEY,
    CourseName TEXT NOT NULL,
    DeptId INT NOT NULL,
    FOREIGN KEY (Deptid) REFERENCES Departments(Deptid)
);

CREATE TABLE Enrollment (
    Sid INT,
    CourseId VARCHAR(255),
    PRIMARY KEY (Sid, CourseId),
    FOREIGN KEY (Sid) REFERENCES students(Sid),
    FOREIGN KEY (CourseId) REFERENCES courses(CourseId)
);