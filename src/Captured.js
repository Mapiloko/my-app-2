import './App.css';
import React from 'react';


function Captured({setView, children}) {

    // console.log(children)
  

  return (
    <div className='Viewer'>
       <h1>{children + 1} Images Captured</h1>
       <button className='btn btn-primary' onClick={setView} style={{width:"70%"}} >Go to Viewer</button>
    </div>
  );
}

export default Captured;
