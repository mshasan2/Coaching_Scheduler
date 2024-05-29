const initialState = {
    availableSlots: [],
    bookedSlots: [],
    reviews: [],
    studentBookedSlots: [],
    coachPastSlots: []
  };
  
  const slotReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'CREATE_SLOT':
        return { ...state, bookedSlots: [...state.bookedSlots, action.payload] };
      case 'FETCH_AVAILABLE_SLOTS':
        return { ...state, availableSlots: action.payload };
      case 'BOOK_SLOT':
        return { ...state, studentBookedSlots: [...state.studentBookedSlots, action.payload] };
      case 'FETCH_COACH_SLOTS':
        return { ...state, bookedSlots: action.payload };
      case 'FETCH_COACH_REVIEWS':
        return { ...state, reviews: action.payload };
      case 'ADD_REVIEW':
        return { ...state, reviews: [...state.reviews, action.payload] };
      case 'STUDENT_BOOKED_SLOTS':
        return { ...state, studentBookedSlots: action.payload };
      case 'COACH_PAST_SLOTS':
        return { ...state, coachPastSlots: action.payload };
      default:
        return state;
    }
  };
  
  export default slotReducer;
  