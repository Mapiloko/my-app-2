import './App.css';
import React, {useEffect, useRef, useState } from 'react';
import Profile from './Profile';
import Login from './Login';
import ChangeColor from './ChangeColor';

function App() {
  const videoRef = useRef(null)
  const photoRef = useRef(null)
  const [counter, setCount] = useState(0);
  const [captured, setCaptured] = useState(false);
  const [numCaptures] = useState(60);


  const getVideo = () => {
    navigator.mediaDevices.getUserMedia({video: true})
                           .then(stream => {
                              let video = videoRef.current;
                              video.setAttribute('autoplay', ''); // required to tell iOS safari we don't want fullscreen

                              video.setAttribute('muted', ''); // required to tell iOS safari we don't want fullscreen

                              video.setAttribute('playsinline', ''); // required to tell iOS safari we don't want fullscreen
                              video.srcObject = stream
                              video.play();
                           }).catch(err =>{
                            console.error(err) 
                           })
  }

  const takePhoto = () =>{

    let videoCanvas = videoRef.current;
    
    photoRef.current.width=640; 
    photoRef.current.height=480;
    
    let ctx = photoRef.current.getContext('2d');
    ctx.drawImage(videoCanvas, 0, 0, photoRef.current.width , photoRef.current.height);

    photoRef.current.toBlob( (blob) => {

    navigator?.serviceWorker?.controller?.postMessage({
        blob: blob,
        type: "POST_DATA"
      });
      // idbRequest.add_data({blob:blob})
    },"image/jpeg" )

  }

  // useEffect(() => {
  //   getVideo();
  // },[])

  const setIntervals = ()=>{

     var count = 0

     while(count < numCaptures)
     {
       
         takePhoto();
         setCount(count)        
        count = count + 1
     }

     setCaptured(true)
  
  
  }

  return (
      <div className='container'>
        <Profile></Profile>
        <Login></Login>
        <p>Herere</p>
        <ChangeColor></ChangeColor>
      </div>
  );
}

export default App;
