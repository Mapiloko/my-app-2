import './App.css';
import React, {useState} from 'react';
import { useDispatch } from 'react-redux'
import {changeColor} from './features/theme'

function ChangeColor() {
  const dispatch = useDispatch()
  const [color, setColor] = useState("");


  return (
    <div className='text-center mt-4' >
        <input type='text' value={color} onChange={e=>setColor(e.target.value)} ></input>
       <button onClick={()=> dispatch(changeColor(color))} >Change Color</button>
    </div>
  );
}

export default ChangeColor;
