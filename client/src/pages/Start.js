import { React } from 'react'
import { useNavigate} from 'react-router-dom';
import './style.css'

function Start() {
  

  let navigate = useNavigate();
  const handleNavigate =() =>{
    navigate('/login')
  }
 
  return (
    <div className='start-page'>

    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-25 border loginForm">
        <center><h2>Login As</h2></center>
        <div className="start-btn">
          <button type="button" className="btn btn-primary" onClick={handleNavigate}>
            Employee
          </button>
          <button type="button" className="btn btn-success" onClick={handleNavigate}>
            Admin
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Start;
