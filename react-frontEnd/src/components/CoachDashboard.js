import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoachSlots, fetchCoachReviews, addReview, createSlot, fetchCoachPastSlots } from '../actions/slotActions';

const CoachDashboard = () => {
  const dispatch = useDispatch();
  const [coachId, setCoachId] = useState(1); // Assuming the logged-in coach ID is 1
  const [startTime, setStartTime] = useState('');
  const [satisfaction, setSatisfaction] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);

//   const slots = useSelector(state => state.slots.bookedSlots);
//   const reviews = useSelector(state => state.slots.reviews);

  const slots = useSelector(state => state.slots.bookedSlots || []);
  const reviews = useSelector(state => state.slots.reviews || []);
  const coachPastSlots = useSelector(state => state.slots.coachPastSlots || []);

  useEffect(() => {
    dispatch(fetchCoachSlots(coachId));
    dispatch(fetchCoachReviews(coachId));
    dispatch(fetchCoachPastSlots(coachId));
  }, [dispatch, coachId]);

  const handleAddSlot = () => {
    // Logic to add a new slot (handled via backend API call)
    // Reset the start time field after submission\
    dispatch(createSlot({coach_id: coachId, start_time: startTime}));
    setStartTime('');
  };

  const handleAddReview = () => {
    if (selectedSlot) {
      console.log('selectedSlot', selectedSlot.id, satisfaction, notes);
      dispatch(addReview(selectedSlot.id, { satisfaction, notes }));
      setSatisfaction('');
      setNotes('');
      setSelectedSlot(null);
    }
  };

  const handleCoachChange = (e) => {
    setCoachId(e.target.value);
  };

  return (
    <div>
      <h2>Coach Dashboard</h2>
      <div>
        <h4>Coach Selection</h4>
        <select onChange={handleCoachChange}>
          <option value="1">Coach 1</option>
          <option value="2">Coach 2</option>
          <option value="3">Coach 3</option>
        </select>
      </div>

      <div className="mb-4">
        <h4>Add Availability Slot</h4>
        <label>Start Time: 
          <input
            name='start_time'
            type="datetime-local"
            value={startTime}
            onChange={e => setStartTime(e.target.value)}
          />
        </label>
        <button className="btn btn-primary" onClick={handleAddSlot}>Add Slot</button>
      </div>

      <div className="mb-4">
        <h4>Upcoming Slots</h4>
        <ul>
          {slots.map(slot => (
            <li key={slot.id}>
              {new Date(slot.start_time).toLocaleString()} - {new Date(slot.end_time).toLocaleString()}
              <br />Student: {slot.student ? slot.student.name : 'Not booked'}
              <br />Phone: {slot.student ? slot.student.phone_number : 'N/A'}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h4>Record Student Satisfaction</h4>
        <select onChange={e => setSelectedSlot(coachPastSlots.find(slot => slot.id === parseInt(e.target.value)))}>
          <option value="">Select a slot</option>
          {coachPastSlots.map(slot => (
            <option key={slot.id} value={slot.id}>
              {new Date(slot.start_time).toLocaleString()} - {new Date(slot.end_time).toLocaleString()}
            </option>
          ))}
        </select>
        <br />
        <input
          type="number"
          value={satisfaction}
          onChange={e => setSatisfaction(e.target.value)}
          placeholder="Satisfaction (1-5)"
        />
        
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="Notes"
        />
        <button className="btn btn-primary" onClick={handleAddReview}>Add Review</button>
      </div>

      <div>
        <h4>Past Reviews</h4>
        <ul>
          {reviews.map(review => (
            
            <li key={review.id}>
              
                <br/>Slot:
                
                {(review.start_time && new Date(review.start_time).toLocaleString())|| 'Loading...'}
                <span> - </span>
                {(review.end_time && new Date(review.end_time).toLocaleString()) || 'Loading...'}
              
              <br />Satisfaction: {(review.review && review.review.satisfaction) || 'Loading...'}
              <br />Notes: {(review.review && review.review.notes) || 'Loading...'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CoachDashboard;
