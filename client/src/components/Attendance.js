// import React, { useState } from 'react';
// import axios from 'axios';

// import { Button, notification } from 'antd';

// function Attendance({auth}) {
//   const [isCheckedIn, setIsCheckedIn] = useState(false);
//   const [loading, setLoading] = useState(false);
  
//   const employeeId = auth._id
//   console.log(employeeId)
//   const handleCheckIn = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.post('http://localhost:6001/checkin', { employeeId });
//       setIsCheckedIn(true);
//       notification.success({
//         message: 'Check-In Successful',
//         description: response.data.message,
//       });
//     } catch (error) {
//       notification.error({
//         message: 'Check-In Error',
//         description: error.response?.data?.message || 'Error during check-in',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCheckOut = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.post('http://localhost:6001/checkout', { employeeId });
//       setIsCheckedIn(false);
//       notification.success({
//         message: 'Check-Out Successful',
//         description: response.data.message,
//       });
//     } catch (error) {
//       notification.error({
//         message: 'Check-Out Error',
//         description: error.response?.data?.message || 'Error during check-out',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ textAlign: 'center', padding: '20px', display:'flex', flexDirection:'row' }}>
//       <h2>welcome {auth.fullName}</h2>
//       {isCheckedIn ? (
//         <Button type="primary" onClick={handleCheckOut} loading={loading}>
//           Check Out
//         </Button>
//       ) : (
//         <Button type="primary" onClick={handleCheckIn} loading={loading}>
//           Check In
//         </Button>
//       )}
//     </div>
//   );
// }

// export default Attendance;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, notification } from 'antd';

function Attendance({ auth }) {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const employeeId = auth._id;

  // Fetch the latest attendance record on component mount
  useEffect(() => {
    const fetchCheckInStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:6001/api/attendance/${employeeId}`);
        const latestRecord = response.data[0];

        if (latestRecord && latestRecord.checkIn && !latestRecord.checkOut) {
          setIsCheckedIn(true);
        } else {
          setIsCheckedIn(false);
        }
      } catch (error) {
        console.error('Error fetching attendance record:', error);
      }
    };

    fetchCheckInStatus();
  }, [employeeId]);

  const handleCheckIn = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:6001/checkin', { employeeId });
      setIsCheckedIn(true);
      notification.success({
        message: 'Check-In Successful',
        description: response.data.message,
      });
    } catch (error) {
      notification.error({
        message: 'Check-In Error',
        description: error.response?.data?.message || 'Error during check-in',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:6001/checkout', { employeeId });
      setIsCheckedIn(false);
      notification.success({
        message: 'Check-Out Successful',
        description: response.data.message,
      });
    } catch (error) {
      notification.error({
        message: 'Check-Out Error',
        description: error.response?.data?.message || 'Error during check-out',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row'}}>
      <h1 style={{ margin:'0px 0px 20px' }}>Welcome {auth.fullName}</h1>
      {isCheckedIn ? (
        <button type="primary" onClick={handleCheckOut} loading={loading} style={{ margin:'5px 5px 10px 5px' }}>
          Check Out
        </button>
      ) : (
        <button type="primary" onClick={handleCheckIn} loading={loading} style={{ margin:'5px 5px 10px 5px' }}>
          Check In
        </button>
      )}
    </div>
  );
}

export default Attendance;
