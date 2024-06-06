ALTER TABLE faculty add column Email TEXT;
ALTER TABLE faculty ADD COLUMN Password TEXT DEFAULT ('123');
ALTER TABLE faculty ADD COLUMN Phone TEXT DEFAULT ('123-456');
ALTER TABLE faculty ADD COLUMN DeptId INT;
ALTER TABLE faculty ADD CONSTRAINT fk_dept FOREIGN KEY (DeptId) REFERENCES Departments(DeptId);


INSERT INTO Admin (Username, Email, Password) VALUES 
('admin1', 'admin1@unimaster.com', '123'),
('admin2', 'admin2@unimaster.com', '123');

INSERT INTO Faculty (FullName, Gender, Qualification, Experience, Designation) VALUES 
('John Doe', 'Male', 'PhD in Computer Science, Expert in AI', 10, 'Professor'),
('Jane Smith', 'Female', 'PhD in Mathematics, Expert in Algebra', 8, 'Assistant Professor'),
('Dr. Robert Wilson', 'Male', 'PhD in Computer Science with specialization in Artificial Intelligence', 10, 'Professor'),
('Dr. Linda Martin', 'Female', 'PhD in Mathematics with a focus on Algebraic Topology', 8, 'Associate Professor'),
('Dr. Emily Johnson', 'Female', 'PhD in Physics specializing in Quantum Mechanics', 12, 'Senior Lecturer'),
('Dr. Michael Brown', 'Male', 'PhD in Chemistry with a specialization in Organic Chemistry', 7, 'Lecturer'),
('Dr. Sarah Davis', 'Female', 'PhD in Biology with a focus on Genetics', 5, 'Assistant Professor');

update faculty set deptid=2 where facultyid=2;
update faculty set deptid=1 where facultyid=3;
update faculty set deptid=2 where facultyid=4;
update faculty set deptid=3 where facultyid=5;
update faculty set deptid=4 where facultyid=6;
update faculty set deptid=2 where facultyid=7;
update faculty set deptid=2 where facultyid=8;
update faculty set deptid=1 where facultyid=9;

-- Insert Departments
INSERT INTO Departments (DeptName, HeadOfDept) VALUES 
('Computer Science', 'Dr. Smith'),
('Mathematics', 'Dr. Johnson'),
('Physics', 'Dr. Brown'),
('Chemistry', 'Dr. Davis'),
('Biology', 'Dr. Wilson'),
('Electrical Engineering', 'Dr. Martin'),
('Mechanical Engineering', 'Dr. Velraj'),
('Civil Engineering', 'Dr. Lee'),
('Environmental Science', 'Dr. Revathi'),
('Business Administration', 'Dr. Thompson');

-- Insert Students
INSERT INTO Students (FullName, DOB, Gender, Blood, Address, Phone, Email, Password, DeptId) VALUES 
('Alice Johnson', '2002-05-14', 'Female', 'O+', '123 Main St', '555-1234', 'alice@uni.com', '123', 1),
('Bob Smith', '2001-08-22', 'Male', 'A+', '456 Elm St', '555-5678', 'bob@uni.com', '123', 2),
('Carol Williams', '2000-03-11', 'Female', 'B+', '789 Maple Ave', '555-2345', 'carol@uni.com', '123', 3),
('David Brown', '2002-07-19', 'Male', 'AB+', '101 Oak St', '555-3456', 'david@uni.com', '123', 4),
('Eve Davis', '2001-11-05', 'Female', 'O-', '202 Pine St', '555-4567', 'eve@uni.com', '123', 5),
('Frank Garcia', '2000-01-15', 'Male', 'A-', '303 Birch St', '555-5679', 'frank@uni.com', '123', 6),
('Grace Hall', '2001-02-28', 'Female', 'B-', '404 Cedar St', '555-6789', 'grace@uni.com', '123', 7),
('Hank Lee', '2002-04-13', 'Male', 'O+', '505 Spruce St', '555-7890', 'hank@uni.com', '123', 8),
('Ivy Martinez', '2000-09-23', 'Female', 'A+', '606 Willow St', '555-8901', 'ivy@uni.com', '123', 9),
('Jack Moore', '2001-12-12', 'Male', 'AB-', '707 Chestnut St', '555-9012', 'jack@uni.com', '123', 10),
('Karen Robinson', '2002-03-07', 'Female', 'O+', '808 Walnut St', '555-0123', 'karen@uni.com', '123', 1),
('Larry Scott', '2001-06-18', 'Male', 'A+', '909 Ash St', '555-1235', 'larry@uni.com', '123', 2),
('Mona Thompson', '2000-05-22', 'Female', 'B+', '1010 Birchwood Ave', '555-2346', 'mona@uni.com', '123', 3),
('Nick White', '2002-08-30', 'Male', 'AB+', '1111 Maplewood Dr', '555-3457', 'nick@uni.com', '123', 4),
('Olivia Young', '2001-10-20', 'Female', 'O-', '1212 Pinecrest Rd', '555-4568', 'olivia@uni.com', '123', 5),
('Paul Harris', '2000-12-09', 'Male', 'A-', '1313 Cedarwood Ln', '555-5670', 'paul@uni.com', '123', 6),
('Quinn Allen', '2002-02-16', 'Female', 'B-', '1414 Elmwood Pl', '555-6781', 'quinn@uni.com', '123', 7),
('Ryan King', '2001-07-27', 'Male', 'O+', '1515 Oakwood St', '555-7892', 'ryan@uni.com', '123', 8),
('Sophie Wright', '2000-11-11', 'Female', 'A+', '1616 Sprucewood Dr', '555-8903', 'sophie@uni.com', '123', 9),
('Tom Walker', '2001-09-05', 'Male', 'AB-', '1717 Chestnutwood Rd', '555-9014', 'tom@uni.com', '123', 10),
('Raj Patel', '2000-05-22', 'Male', 'B+', '1010 Birchwood Ave', '555-2346', 'raj@uni.com', '123', 1),
('Rohan Mehta', '2000-11-11', 'Male', 'A+', '1616 Sprucewood Dr', '555-8903', 'rohan@uni.com', '123', 2);

-- Insert courses for Computer Science (DeptId = 1)
INSERT INTO Courses (CourseId, CourseName, DeptId) VALUES ('CS101', 'Introduction to Computer Science', 1);
INSERT INTO Courses (CourseId, CourseName, DeptId) VALUES ('CS102', 'Data Structures', 1);
INSERT INTO Courses (CourseId, CourseName, DeptId) VALUES ('CS103', 'Algorithms', 1);
INSERT INTO Courses (CourseId, CourseName, DeptId) VALUES ('CS104', 'Operating Systems', 1);

-- Insert courses for Mathematics (DeptId = 2)
INSERT INTO Courses (CourseId, CourseName, DeptId) VALUES ('MATH101', 'Calculus I', 2);
INSERT INTO Courses (CourseId, CourseName, DeptId) VALUES ('MATH102', 'Linear Algebra', 2);
INSERT INTO Courses (CourseId, CourseName, DeptId) VALUES ('MATH103', 'Abstract Algebra', 2);
INSERT INTO Courses (CourseId, CourseName, DeptId) VALUES ('MATH104', 'Probability and Statistics', 2);

-- Insert courses for Physics (DeptId = 3)
INSERT INTO Courses (CourseId, CourseName, DeptId) VALUES ('PHY101', 'General Physics I', 3);
INSERT INTO Courses (CourseId, CourseName, DeptId) VALUES ('PHY102', 'Electromagnetism', 3);
INSERT INTO Courses (CourseId, CourseName, DeptId) VALUES ('PHY103', 'Quantum Mechanics', 3);
INSERT INTO Courses (CourseId, CourseName, DeptId) VALUES ('PHY104', 'Thermodynamics', 3);

-- Insert courses for Chemistry (DeptId = 4)
INSERT INTO Courses (CourseId, CourseName, DeptId) VALUES ('CHEM101', 'General Chemistry I', 4);
INSERT INTO Courses (CourseId, CourseName, DeptId) VALUES ('CHEM102', 'Organic Chemistry', 4);
INSERT INTO Courses (CourseId, CourseName, DeptId) VALUES ('CHEM103', 'Inorganic Chemistry', 4);
INSERT INTO Courses (CourseId, CourseName, DeptId) VALUES ('CHEM104', 'Physical Chemistry', 4);