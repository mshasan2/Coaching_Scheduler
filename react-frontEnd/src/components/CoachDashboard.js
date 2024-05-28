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
      <div>
        <span className='h2'>Coach Dashboard</span>
        <span className='float-end'>
          <span className='h4 pe-2'>Coach Selection</span>
          <select onChange={handleCoachChange}>
            <option value="1">Coach 1</option>
            <option value="2">Coach 2</option>
            <option value="3">Coach 3</option>
          </select>
          
        </span>
      </div>

      <div className="m-4 p-2 ">
        <h4>Add Availability Slot</h4>
        <div className='row'>

          <label className='col-form-label col-1'>Start Time </label>
          <div className='col-6'>
            <input
              id='start_time'
              className='form-control'
              name='start_time'
              type="datetime-local"
              value={startTime}
              onChange={e => setStartTime(e.target.value)}
            />
          </div>
          
          <button className="btn btn-primary col-2" onClick={handleAddSlot}>Add Slot</button>
        </div>
      </div>

      <div className="ms-4 me-4 mb-4">
        <h4>Upcoming Slots</h4>
        <ul className='m-2 list-group'>
          {slots.map(slot => (
            <li className='list-group-item list-group-item-secondary' key={'up'+slot.id}>
              <strong>Slot:</strong> {new Date(slot.start_time).toLocaleString()} - {new Date(slot.end_time).toLocaleString()}
              <br /> <strong>Student: </strong> {slot.student ? slot.student.name : 'Not booked'}
              <br /><strong> Phone: </strong> {slot.student ? slot.student.phone_number : 'N/A'}
            </li>
          ))}
        </ul>
      </div>

      <div className="m-4">
        <h4>Record Student Satisfaction</h4>
        <div className='form-group row'>
          <div className='col-4 m-2 '>
          <select className='form-select' onChange={e => setSelectedSlot(coachPastSlots.find(slot => slot.id === parseInt(e.target.value)))}>
            <option value="">Select a slot</option>
            {coachPastSlots.map(slot => (
              <option key={slot.id} value={slot.id}>
                {new Date(slot.start_time).toLocaleString()} - {new Date(slot.end_time).toLocaleString()}
              </option>
            ))}
          </select>
          </div>
          <div className='col-4 m-2'>
          <input
            className='form-control'
            type="number"
            value={satisfaction}
            onChange={e => setSatisfaction(e.target.value)}
            placeholder="Satisfaction (1-5)"
          />
          </div>
          <div className='row'>
          <div className='col-4 m-2 pe-1'>
            <textarea
              className='form-control'
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Notes"
            />
          </div>
          <div className='col-4 ps-4  m-2'>
          <button className="btn btn-primary" onClick={handleAddReview}>Add Review</button>
          </div>
          </div>
        </div>
      </div>

      <div className="m-4">
        <h4>Past Reviews</h4>
        <ul className='m-2 list-group'>
          {reviews.map(review => (
            
            <li className='list-group-item list-group-item-secondary' key={'re' + review.id}>
              
              <strong>Slot: </strong>
                
                {(review.start_time && new Date(review.start_time).toLocaleString())|| 'Loading...'}
                <span> - </span>
                {(review.end_time && new Date(review.end_time).toLocaleString()) || 'Loading...'}
              
              <br/> <strong>Satisfaction: </strong>{(review.review && review.review.satisfaction) || 'Loading...'}
              <br/> <strong>Notes: </strong>{(review.review && review.review.notes) || 'Loading...'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CoachDashboard;
