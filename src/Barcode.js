import './App.css';
import "./dbr";
import React, {useEffect, useRef} from 'react';
import { BarcodeScanner } from 'dynamsoft-javascript-barcode';



function Barcode() {
  const elRef = useRef(null)
  let pScanner = null;


useEffect(() => {

    (async () => {
      try {
        if (pScanner == null)
          pScanner = BarcodeScanner.createInstance();
          const scanner = await pScanner;

          elRef.current.appendChild(scanner.getUIElement());

          // scanner.onFrameRead = results => {
          //   if (results.length > 0) 
          //       console.log(results);
          // };
          scanner.onUniqueRead = (txt, result) => {
            alert(result);
            // alert(txt);
          };
          await scanner.open();
    } catch (ex) {
        console.error(ex);
    }

    })();

    },[])

  return (
    <div className="barcode">
       <div ref={elRef} style={{width: "500px", height: "500px"}}>
        </div>
    </div>
  );
}

export default Barcode;
