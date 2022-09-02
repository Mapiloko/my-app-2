import './App.css';
import React, { useEffect, useState } from 'react';
import {idbRequest} from './store'


function Viewer() {

  const [flag, setFlag] = useState(0);
  const [cursur, setCursor] = useState(0);
  const [imageUrls, setImageUrls] = useState([]);
  const [image1, setimage1] = useState("");
  const [image2, setimage2] = useState("");
  const [image0, setimage0] = useState("");
 
  
  async function fetchData() {
    const res  = await idbRequest.get_all()

    let newTodos =[];
  
    for(let i = 0; i < res.length ; i++){
        const url = await blobToBase64(res[i].blob)

        newTodos.push({id:i+1, url: url});
        setImageUrls(newTodos);
      }
    return newTodos

    }
    
    useEffect(()=>{
      fetchData().then(res=>{
          setimage0(res[0])
          setimage1(res[1])
          setimage2(res[2])
          setCursor(2)
          setFlag(1)
          idbRequest.clear_store()
      })

  },[])

function blobToBase64(blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  const nextView = ()=>{
    if(cursur < imageUrls.length-1)
    {
      setimage0(imageUrls[cursur+1])
      setimage1(imageUrls[cursur+2])
      setimage2(imageUrls[cursur+3])
      setCursor(cursur + 3)
      setFlag(flag + 1)
    }
  }

  return (
    <>
    {cursur===0? 
        <div>Loading...</div>: 
        <>
         <div className='row'>
            <div className='col-md-4 col-xs-12'>
              <div className="card">
                <img src={image0.url} className="card-img-top" alt="..."></img>
                <div className="card-body">
                  <p className="card-text"> Image Id {image0.id}</p>
                </div>
              </div>
            </div>
            <div className='col-md-4 col-xs-12'>
                <div className="card">
                    <img src={image1.url} className="card-img-top" alt="..."></img>
                    <div className="card-body">
                      <p className="card-text">Image Id {image1.id}</p>
                    </div>
                </div>
            </div>
            <div className='col-md-4 col-xs-12'>
                <div className="card">
                  <img src={image2.url} className="card-img-top" alt="..."></img>
                  <div className="card-body">
                    <p className="card-text">Image Id {image2.id}</p>
                  </div>
              </div>
            </div>
        </div>

        { cursur===imageUrls.length-1 ?  <h3>You reached end of View</h3>:
        <button className='btn btn-primary mt-3' onClick={nextView} >Next View</button>
        }
      <h2> Batch {flag}</h2>
      </>
    }
    </>
  );
}

export default Viewer;
