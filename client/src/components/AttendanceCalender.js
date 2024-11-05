import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import useAuth from '../hooks/useAuth';

const localizer = momentLocalizer(moment);

const AttendanceCalendar = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [view, setView] = useState('month'); // Default to monthly view
  const {auth} = useAuth();
  
  const employeeId = auth._id
  console.log("Employee ID", employeeId) // Use employeeId based on auth structure
  useEffect(() => {
    console.log("useEffect triggered with employeeId:", employeeId);
    
    const fetchAttendance = async () => {
      if (!employeeId) {
        console.log("No employee ID found. Exiting fetch.");
        return; // Early exit if employeeId is not defined
      }
  
      try {
        const response = await axios.get(`http://localhost:6001/api/attendance/${employeeId}`);
        setAttendanceData(response.data);
        console.log("Attendance data:", response.data); // Log fetched data
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };
  
    fetchAttendance();
  }, [auth]);
  
  // Convert attendance data to calendar event format
  const events = attendanceData.map((record) => ({
    title: record.status,
    start: new Date(record.checkIn), // Start time based on checkIn
    end: new Date(record.checkOut),   // End time based on checkOut
    status: record.status,
    hoursWorked: record.hoursWorked,
  }));

  const eventStyleGetter = (event) => {
    const backgroundColor = event.status === 'Present' ? '#4caf50' : '#f44336'; // Green for Present, Red for Absent
    return {
      style: {
        backgroundColor,
        borderRadius: '5px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block',
      },
    };
  };

  return (
    <div>
      <h2>Attendance Calendar</h2>
      <div>
        <button onClick={() => setView('week')}>Week View</button>
        <button onClick={() => setView('month')}>Month View</button>
      </div>
      {events.length === 0 ? ( // Check if there are events to display
        <div>No attendance records available for this period.</div>
      ) : (
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600, margin: '20px' }}
          views={['month', 'week']}
          view={view}
          onView={(newView) => setView(newView)} // Update view when user changes it
          eventPropGetter={eventStyleGetter} // Style events based on attendance status
          tooltipAccessor={(event) => `${event.status} - Hours Worked: ${event.hoursWorked.toFixed(2)}`}
        />
      )}
    </div>
  );
};

export default AttendanceCalendar;
