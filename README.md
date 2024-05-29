# Coaching Conundrum Scheduling System

## Overview

This project is a web application to manage the scheduling of 1-on-1 coaching calls between students and coaches. The application allows coaches to add their availability, students to book coaching slots, and both parties to view their schedules and necessary contact information. Additionally, coaches can record and review feedback from their calls.

## Features

### User Stories

1. **Coaches can add slots of availability to their calendars.**
   - Each slot is 2 hours long.
   - Each slot can be booked by exactly one student.
2. **Coaches can view their own upcoming slots.**
3. **Students can book available slots for any coach.**
4. **When a slot is booked, both the student and coach can view each other's phone numbers.**
5. **Coaches record the student's satisfaction (1-5) and write free-form notes after a call.**
6. **Coaches can review past scores and notes for all their calls.**

### Additional Requirements

- Easily switch between coach and student roles.
- Pre-created users for testing (no authentication required).

## Technology Stack

- **Frontend**: HTML, CSS, React.js, Redux, Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MySQL (Sequelize ORM)

## Project Structure

- **client**: Contains the React.js frontend code.
- **server**: Contains the Node.js backend code.
- **database**: Contains the MySQL database schema and seed data.


## Setup and Installation

### Prerequisites

- Node.js and npm installed.
- MySQL and MySQLWorkbench installed.

### Steps

1. Clone the repository:

    ```bash
    git clone https://github.com/mshasan2/Coaching_Scheduler
    cd Coaching_Scheduler
    ```

2. Install backend dependencies:

    ```bash
    cd node-backEnd
    npm install
    ```

3. Install frontend dependencies:

    ```bash
    cd react-frontEnd
    npm install
    ```

4. Set up the database:
    - Open MySQLWorkbench and run the SQL script in `database/coach_student_db.sql`.
    Note: This will create a new database named `coach_student_db` with the necessary tables and will seed the database with some sample data.
    - Update database credentials in `node-backEnd/.env`.

5. Start the backend server:

    ```bash
    cd node-backEnd
    nodemon index.js
    ```
    The server will start on `http://localhost:3000`.

6. Start the frontend server:

    ```bash
    cd react-frontEnd
    npm start
    ```
    The React app will open in your browser at `http://localhost:3001`.

## Usage

### Switching Roles

- To switch between coach and student roles, use the toggle button available in the navigation bar.

### Pre-created Users

- **Coaches**:
  - Coach 1: `phone: 123-456-7890`
  - Coach 2: `phone: 987-654-3210`
  - Coach 3: `phone: 111-222-3333`
- **Students**:
  - Student 1: `phone: 555-555-5555`
  - Student 2: `phone: 666-666-6666`
  - Student 3: `phone: 777-777-7777`

### Selecting a Coach/Student

- Use the dropdown menu in the respective pages to select a coach or student.

### Adding Availability 

- Coaches can add slots of availability by clicking on the calendar and selecting a date and time. Then by clicking on the "Add Slot" button, the slot will be added to the respective coach's dashboard.

### Booking a Slot

- Students can book available slots by clicking on the "Book Slot" button under the respective slot. The slot will be added to the respective student's dashboard.

### Recording Feedback

- Coaches can record feedback by selecting a slot from their dashboard and entering the satisfaction score and notes. The feedback will be saved and can be viewed later.

### Displaying Past Feedback

- All feeback recorded by a coach is displayed in the "Past Reviews" section of their dashboard.


