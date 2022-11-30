import './App.css';
import React from 'react';
import { useDispatch } from 'react-redux'
import {login, logout} from './features/user'

function Login() {
  const dispatch = useDispatch()

  return (
    <div className='text-center mt-4' >
       <button onClick={()=> dispatch(login({name:"Pedro", age: 30, email: "email2@gamil.com"}))} > Login</button>
       <button onClick={()=> dispatch(logout())} >logout</button>
    </div>
  );
}

export default Login;
