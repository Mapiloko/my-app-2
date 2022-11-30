import './App.css';
import React, {useEffect, useRef, useState } from 'react';
import Viewer from './Viewer';
import Captured from './Captured';
import Barcode from './Barcode';
// import {idbRequest} from './store'


function App() {
  const videoRef = useRef(null)
  const photoRef = useRef(null)
  const [counter, setCount] = useState(0);
  const [viewer, setViewer] = useState(false);
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
    <div>
      <Barcode></Barcode>
      <p>Test</p>
      {/* { viewer? <Viewer></Viewer> : captured ? <Captured setView={()=> setViewer(true) } >{counter}</Captured> :
       <div className='camera' >
          <video ref={videoRef}></video>
          <canvas style={{display: "none" }} ref={photoRef} id="photores"></canvas>
          <div className='Buttnss'>
            <button className='btn btn-primary text-center'  onClick={setIntervals} disabled={counter===60} >Capture Images</button>
          </div>
       </div>
      } */}
    </div>
  );
}

export default App;
