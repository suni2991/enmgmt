import React, { useState } from 'react'
import './style.css';
import useAuth from "../hooks/useAuth";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2';



function Login() {
  let { auth } = useAuth();
  let { setAuth } = useAuth();

  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");


  let handleSubmit = async () => {
    let credentials = {
      email,
      password,

    };
    let baseURL = "http://localhost:6001/api/login"

    axios.post(baseURL, credentials).then((response) => {

      if (response.status === 200) {
        console.log("response data is:", response.data)

        if (response.data.role === "Admin") {
          navigate("/home");
        } else if (response.data.role === "Manager") {
          navigate("/manager");
        } else if (response.data.role === "Employee") {
          navigate('/self')
        }
          let authData = response.data;
         
        
      }
      else { console.warn("check the response") }
      setAuth(response.data)
      console.log("response:", response)
      
    })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 400) {
            Swal.fire({
              title: 'Error!',
              text: 'Enter Email and password',
              icon: 'error',
              showConfirmButton: true,
              confirmButtonColor: '#00B4D2',
            })
          } else if (error.response.status === 404) {
            Swal.fire({
              title: 'Access Denied!',
              text: 'Invalid Credentials / UnAuthorised Access!',
              icon: 'error',
              showConfirmButton: true,
              confirmButtonColor: '#00B4D2',
            })
          } 
          else if (error.response.status === 401) {
            Swal.fire({
              title:'Access Denied!',
              text: 'Invalid Credentials / UnAuthorised Access!',
              icon: 'error',
              showConfirmButton: true,
              confirmButtonColor: '#00B4D2',
            })}
          }

       
      });
    navigate(from, { replace: true });
  }


  return (
    <div className='start-page'>

    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>


      {auth.role ?
        <h1> Welcome to {auth.role} Dashboard</h1>
        :  <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
        <div className='p-3 rounded w-25 border loginForm'>
          <div className='text-warning'>
           
          </div>
          <h2>Login Page</h2>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor="email"><strong>Email:</strong></label>
              <input type="email" name='email' autoComplete='off' placeholder='Enter Email'
                value={email} onChange={(e) => setEmail(e.target.value)} className='form-control rounded-0'/>
            </div>
            <div className='mb-3'> 
              <label htmlFor="password"><strong>Password:</strong></label>
              <input type="password" name='password' placeholder='Enter Password'
                value={password} onChange={(e) => setPassword(e.target.value)} className='form-control rounded-0'/>
            </div>
            <button type="submit" className='btn btn-success w-100 rounded-0 mb-2'>Log in</button>
            <div className='mb-1'> 
              <input type="checkbox" name="tick" id="tick" className='me-2'/>
              <label htmlFor="password">You are Agree with terms & conditions</label>
            </div>
          </form>
        </div>
      </div>}


    </div>
    </div>
  )
}

export default Login
