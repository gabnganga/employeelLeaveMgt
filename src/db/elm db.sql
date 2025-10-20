-- USERS TABLE
CREATE TABLE users (
    staffid INT PRIMARY KEY NOT NULL,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(MAX) NOT NULL,
    role VARCHAR(55) DEFAULT 'Employee',
);


-- LEAVE TYPE TABLE
CREATE TABLE leavetype (
    leavetypeid INT PRIMARY KEY IDENTITY (1,1),
    leavetype VARCHAR(100) NOT NULL,
    annuallimit INT,
    description VARCHAR(MAX),
);


-- LEAVE REQUEST TABLE
CREATE TABLE leaverequest (
    leaveid INT PRIMARY KEY IDENTITY(1,1),
    staffid INT NOT NULL,
    leavetypeid INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    FOREIGN KEY (staffid) REFERENCES users(staffid),
    FOREIGN KEY (leavetypeid) REFERENCES leavetype(leavetypeid),
);



-- COMMENT TABLE
CREATE TABLE comments (
    commentid INT  PRIMARY KEY IDENTITY(1,1),
    leaveid INT NOT NULL,
    comment VARCHAR(100),
    status VARCHAR(55) DEFAULT 'Pending',
    managerid INT DEFAULT 5674,
    FOREIGN KEY (leaveid) REFERENCES leaverequest(leaveid),
    FOREIGN KEY (managerid) REFERENCES users(staffid)
);


INSERT INTO users (staffid, username, email, password, role) 
VALUES
(3045,'Alice Johnson', 'alice@company.com', 'hashedpassword', 'Admin'),
(5674,'Brian Smith', 'brian@company.com', 'hashedpassword', 'Manager'),
(1896,'Carol Lee', 'carol@company.com', 'hashedpassword', 'Employee'),
(1226,'David Kim', 'david@company.com', 'hashedpassword', 'Employee'),
(3122,'Emily Clark', 'emily@company.com', 'hashedpassword', 'Employee');

INSERT INTO leavetype (leavetype, annuallimit, description) 
VALUES
('Annual Leave', 21, 'Standard yearly vacation leave'),
('Sick Leave', 7, 'For medical or health reasons'),
('Maternity Leave', 90, 'For maternity-related absence'),
('Emergency Leave', 5, 'For urgent personal matters'),
('Unpaid Leave', NULL, 'Leave without pay');

INSERT INTO leaverequest (staffid, leavetypeid, start_date, end_date) 
VALUES
(1896, 1, '2025-10-10', '2025-10-12'),
(1226, 2, '2025-10-15', '2025-10-18'),
(3122, 3, '2025-09-01', '2025-09-30'),
(1896, 1, '2025-11-01', '2025-11-03'),
(3122, 2, '2025-10-20', '2025-10-22');



INSERT INTO comments (leaveid, comment, status, managerid) 
VALUES
(1, 'Approved, enjoy your time!', 'Approved', 5674),
(2, 'Awaiting project completion.', 'Pending', 5674),
(3, 'Approved maternity leave.', 'Approved', 5674),
(4, 'Conflicts with deadlines.', 'Rejected', 5674),
(5, 'Will review tomorrow.', 'Pending',  5674);


