CREATE DATABASE coach_student_db;

USE coach_student_db;

CREATE TABLE coaches (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(255) NOT NULL
);

CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(255) NOT NULL
);

CREATE TABLE slots (
  id INT AUTO_INCREMENT PRIMARY KEY,
  coach_id INT NOT NULL,
  start_time DATETIME NOT NULL,
  end_time DATETIME NOT NULL,
  student_id INT DEFAULT NULL,
  FOREIGN KEY (coach_id) REFERENCES coaches(id),
  FOREIGN KEY (student_id) REFERENCES students(id)
);

CREATE TABLE reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slot_id INT NOT NULL,
  satisfaction INT NOT NULL,
  notes TEXT,
  FOREIGN KEY (slot_id) REFERENCES slots(id)
);

INSERT INTO coaches (name, phone_number) VALUES
('John Doe', '1234567890'),
('Jane Smith', '9876543210'),
('Alice Johnson', '5551234567');

INSERT INTO students (name, phone_number) VALUES
('Michael Johnson', '1112223333'),
('Emily White', '4445556666'),
('David Brown', '7778889999');

INSERT INTO slots (coach_id, start_time, end_time, student_id) VALUES
(1, '2024-06-01 09:00:00', '2024-06-01 11:00:00', 3),
(1, '2024-06-02 14:00:00', '2024-06-02 16:00:00', 2),
(2, '2024-06-03 10:00:00', '2024-06-03 12:00:00', 1),
(3, '2024-06-04 15:00:00', '2024-06-04 17:00:00', 1);

INSERT INTO slots (coach_id, start_time, end_time, student_id) VALUES
(1, '2024-06-08 10:00:00', '2024-06-08 11:00:00', NULL);

INSERT INTO reviews (slot_id, satisfaction, notes) VALUES
(1, 5, 'Great session!'),
(2, 4, 'Very informative'),
(3, 3, 'Could have been better');
