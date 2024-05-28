import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAvailableSlots, bookSlot,  fetchStudentBookedSlots} from '../actions/slotActions';

const StudentDashboard = () => {
  const dispatch = useDispatch();
  const [studentId, setStudentId] = useState(1); // Assuming the logged-in student ID is 1

  const slots = useSelector(state => state.slots.availableSlots);
  const studentBookedSlots = useSelector(state => state.slots.studentBookedSlots);

  useEffect(() => {
    dispatch(fetchAvailableSlots());
    dispatch(fetchStudentBookedSlots(studentId));
  }, [dispatch]);

  const handleBookSlot = (slotId) => {
    dispatch(bookSlot(slotId, studentId));
  };

  const handleStudentChange = (e) => {
    setStudentId(e.target.value);
    dispatch(fetchStudentBookedSlots(e.target.value));
  }

  return (
    <div>
      <h2>Student Dashboard</h2>
      <div>
        <h4>Student Selection</h4>
        <select onChange={handleStudentChange}>
          <option value="1">Student 1</option>
          <option value="2">Student 2</option>
          <option value="3">Student 3</option>
        </select>
      </div>

      <div>
        <h4>Available Slots</h4>
        <ul>
          {slots.map(slot => (
            <li key={slot.id}>
              
              Coach: {slot.coach.name}
              <br />Time: {new Date(slot.start_time).toLocaleString()} - {new Date(slot.end_time).toLocaleString()}
              <br />Phone: {slot.coach.phone_number}
              <button className="btn btn-primary" onClick={() => handleBookSlot(slot.id)}>Book Slot</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4>Booked Slots</h4>
        <ul>
          {studentBookedSlots.map(slot => (
            <li key={slot.id}>
              Coach: {slot.coach.name}
              <br />Time: {new Date(slot.start_time).toLocaleString()} - {new Date(slot.end_time).toLocaleString()}
              <br />Phone: {slot.coach.phone_number}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentDashboard;
