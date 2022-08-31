import './App.css';
import React, { useEffect, useState } from 'react';
import {getAllFromDB} from './store'


function Viewer() {

  const [flag, setFlag] = useState(0);
  const [imageUrls, setImageUrls] = useState([]);
 

  useEffect(()=>{

    async function fetchData() {
      const res  = await getAllFromDB()
    
      for(let i = 0; i < res.length ; i++){
          const url = await blobToBase64(res[i].blob)

          const newTodos = [...imageUrls];
          newTodos.push(url);
          setImageUrls(newTodos);
        }
  
        setFlag(1)
    }

    fetchData();

  })

function blobToBase64(blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }



  return (
    <>
    {flag===0? 
        <div>Loading...</div>: 
        <div className='Viewer'>
          <img src={imageUrls[0]} alt="alt" ></img>
          <img src={imageUrls[1]} alt="alt" ></img>
          <img src={imageUrls[2]} alt="alt" ></img>
        </div>
    }
    </>
  );
}

export default Viewer;
