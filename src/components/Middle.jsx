import {useEffect, useState} from "react"

function Scooter({scooter}){
  return (
      <div 
        key={scooter.id} 
        className="bg-white rounded p-4 flex flex-wrap" >
          <div>    
            <h3 className="font-bold">{scooter.title}</h3>
            <div className="">Rida {scooter.ride}km </div>
          </div>
          <div>
            <h3 className="font-bold">valst.nr</h3>
            <div className="">{scooter.registrationCode}</div>
          </div>
          <div>
            <h3 className="font-bold">Kaina/val</h3>
            <div className="">{scooter.hourlyPrice}</div>
          </div>
          <div>
            <h3 className="font-bold">lasy use date</h3>
            <div className="">{scooter.lastUseTime}.toLocaleDateString("lt")</div>
          </div>
         </div>


  );
}


export default function Middle () {
  const [scooter, setScooter] = useState([]);

  useEffect(()=>{
    fetch("/scooter.json")
      .then((resp)=> resp.json())
      .then((data)=> {
        console.log(data);
        setScooter(data);
      });
  },[])


  return (
    <div className="container bg-blue-100 min-h-[400px] mx-auto flex flex-col p-4">   
      {scooter.map((s)=>(
        <Scooter 
          key={s.id} 
          scooter={s} />
      ))}
    </div>
    );
}