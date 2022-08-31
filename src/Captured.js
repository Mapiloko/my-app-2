import './App.css';
import React from 'react';


function Captured({setView, children}) {

    // console.log(children)
  

  return (
    <div className='Viewer'>
       <h1>{children} Images Captured</h1>
       <button onClick={setView} style={{width:"70%"}} >Go to Viewer</button>
    </div>
  );
}

export default Captured;
