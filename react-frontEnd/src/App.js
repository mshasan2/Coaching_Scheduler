import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import CoachDashboard from './components/CoachDashboard';
import StudentDashboard from './components/StudentDashboard';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/coach" element={<CoachDashboard />} />
              <Route path="/student" element={<StudentDashboard />} />
              <Route path="/" element={<HomePage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
