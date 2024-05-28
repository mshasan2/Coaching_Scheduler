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
  }, [dispatch, studentId]);

  const handleBookSlot = (slotId) => {
    dispatch(bookSlot(slotId, studentId));
  };

  const handleStudentChange = (e) => {
    setStudentId(e.target.value);
    //dispatch(fetchStudentBookedSlots(e.target.value));
  }

  return (
    <div>
      <div>
        <span className='h2'>Student Dashboard</span>
        <span className='float-end'>
          <span className='h4 pe-2'>Student Selection</span>
          <select onChange={handleStudentChange}>
            <option value="1">Student 1</option>
            <option value="2">Student 2</option>
            <option value="3">Student 3</option>
          </select>
          
        </span>
      </div>
      
      <div className="m-4">
        <h4>Available Slots</h4>
        <ul className='m-2 list-group'>
          {slots.map(slot => (
            <li className='list-group-item list-group-item-secondary' key={slot.id}>
              <strong>Coach: </strong>{slot.coach.name}
              <br /><strong>Time: </strong>{new Date(slot.start_time).toLocaleString()} - {new Date(slot.end_time).toLocaleString()}
              <br /><strong>Phone: </strong>{slot.coach.phone_number}
              <br /><button className="btn btn-primary" onClick={() => handleBookSlot(slot.id)}>Book Slot</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="m-4">
        <h4>Booked Slots</h4>
        <ul className='m-2 list-group'>
          {studentBookedSlots.map(slot => (
            <li className='list-group-item list-group-item-secondary' key={slot.id}>
              <strong>Coach: </strong>{slot.coach.name}
              <br /><strong>Time: </strong>{new Date(slot.start_time).toLocaleString()} - {new Date(slot.end_time).toLocaleString()}
              <br /><strong>Phone: </strong>{slot.coach.phone_number}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentDashboard;
