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

***Note:*** As a time limit of ~3 hours was mentioned in the Project information documentation, I have tried to complete the project within that time frame and have made some assumptions to expedite the development process. Please refer to the "Assumptions" section for more details and pardon any discrepancies.

## Assumptions

- Due to time constraints, the folder structure is not meticulously maintained. All files are kept in a simple and flat structure for easier implementation and testing.
- The database schema has not been normalized to the highest degree to expedite the development process.
- Authentication is not implemented due to the simplicity of the application.
- Tests are not implemented due to time constraints. 
- All slots are exactly 2 hours long, as specified in the user stories.
- Each slot can only be booked by one student.
- Students and coaches must manually switch roles using a toggle in the navigation bar.
- There is no need for an authentication system; users are pre-created for testing purposes.
- The application is designed for desktop use only.
- Students can book any available slot from any coach.
- Coaches can only view their own upcoming slots.
- Coaches can only view past feedback for their own calls.
- The satisfaction score is a number between 1 and 5.
- The application is designed for a single timezone.
- The application is designed for a single language (English).

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
  - Coach 1: `name: John Doe, phone: 123-456-7890`
  - Coach 2: `name: Jane Smith, phone: 987-654-3210`
  - Coach 3: `name: Alice Johnson, phone: 555-123-4567`
- **Students**:
  - Student 1: `name: Michael Johnson, phone: 111-222-3333`
  - Student 2: `name: Emily White, phone: 444-555-6666`
  - Student 3: `name: David Brown, phone: 777-888-9999`

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

## Future Improvements

- Implement a more robust database schema with normalized tables.
- Add authentication for users.
- Implement a more user-friendly interface with better error handling.
- Add the ability to edit and delete slots.
- Implement a mobile-responsive design.
- Add the ability to filter slots by date and time.
- Implement a notification system for booking and feedback submission.
- Add the ability to search for coaches and students.
- Implement a multi-language feature.
- Add the ability to view feedback for all calls, not just the coach's own calls.
- Implement a timezone feature.


## Acknowledgements

Thanks to the Stepful team for the opportunity to work on this project.

