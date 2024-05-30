import axios from "axios";

export const fetchAvailableSlots = () => async (dispatch) => {
  const res = await axios.get("http://localhost:3000/slots");
  dispatch({ type: "FETCH_AVAILABLE_SLOTS", payload: res.data });
};

export const createSlot = (slot) => async (dispatch) => {
  const res = await axios.post("http://localhost:3000/slots", slot);
  dispatch({ type: "CREATE_SLOT", payload: res.data });
};

export const bookSlot = (slotId, studentId) => async (dispatch) => {
  const res = await axios.post(`http://localhost:3000/slots/${slotId}/book`, {
    student_id: studentId,
  });
  dispatch({ type: "BOOK_SLOT", payload: res.data });
};

export const fetchCoachSlots = (coachId) => async (dispatch) => {
  const res = await axios.get(`http://localhost:3000/coaches/${coachId}/slots`);
  dispatch({ type: "FETCH_COACH_SLOTS", payload: res.data });
};

export const fetchCoachReviews = (coachId) => async (dispatch) => {
  const res = await axios.get(
    `http://localhost:3000/coaches/${coachId}/reviews`
  );
  dispatch({ type: "FETCH_COACH_REVIEWS", payload: res.data });
};

export const addReview = (slotId, review) => async (dispatch) => {
  const res = await axios.post(
    `http://localhost:3000/slots/${slotId}/review`,
    review
  );
  dispatch({ type: "ADD_REVIEW", payload: res.data });
};

export const fetchStudentBookedSlots = (studentId) => async (dispatch) => {
  const res = await axios.get(
    `http://localhost:3000/students/${studentId}/slots`
  );
  dispatch({ type: "STUDENT_BOOKED_SLOTS", payload: res.data });
};

export const fetchCoachPastSlots = (coachId) => async (dispatch) => {
  const res = await axios.get(
    `http://localhost:3000/coaches/${coachId}/pastSlots`
  );
  dispatch({ type: "COACH_PAST_SLOTS", payload: res.data });
};
