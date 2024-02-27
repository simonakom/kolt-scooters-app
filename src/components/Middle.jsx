import { useEffect, useState } from "react"
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { FaPencil, FaTrashCan } from "react-icons/fa6";
import * as PropTypes from "prop-types";


function Status({ status }) {
  return (
    <div className="text-2xl inline">
      {status ? <FaTimesCircle color="#d67eb2" /> : <FaCheckCircle color="#42b1e2" />}
    </div>
  );
}
Status.propTypes = {
	status: PropTypes.bool.isRequired,
};

function Scooter({scooter}){
  return (
      <div 
        key={scooter.id} 
        className="bg-slate-100 text-slate-700 rounded px-10 py-3 flex flex-wrap gap-x-10 gap-y-8 justify-between overflow-scroll" >
          <div className="border-l-2 border-teal-500 px-3 py-2 ">    
            <h3 className="font-bold underline text-teal-600 min-w-[130px]">{scooter.title}</h3>
            <div>Mileage {scooter.ride}km </div>
          </div>
          <div className="border-l-2  border-slate-200 px-3 min-w-[160px]">    
            <h3 className="font-bold">Registration nr.</h3>
            <div>{scooter.registrationCode}</div>
          </div>
          <div className="border-l-2 border-slate-200 px-3 max-w-[120px]">    
            <h3 className="font-bold">Hourly Rate</h3>
            <div>{scooter.hourlyPrice}€</div>
          </div>
          <div className="border-l-2  border-slate-200 px-3 min-w-[130px]">    
            <h3 className="font-bold"> Last used</h3>
            <div>{scooter.lastUseTime === 1 ? "Never used" : new Date(scooter.lastUseTime).toLocaleDateString("lt")}</div>
          </div>
          <div className="border-l-2  border-slate-200 px-3 inline min-w-[120px]">    
            <h3 className="font-bold">Status</h3>
            <div className="flex gap-2"><Status status={scooter.isBusy}/>{scooter.isBusy ? "In use" : "available" }</div>
          </div>

          <div className='flex gap-x-10 gap-y-20 items-center p-3'>
            <FaPencil className="text-yellow-600 hover:text-yellow-500 text-2xl btn-hover cursor-pointer" />
            <FaTrashCan className="text-rose-800 hover:text-rose-700 text-2xl btn-hover cursor-pointer" />
          </div>
      </div>
  );
}
Scooter.propTypes = {
	scooter: PropTypes.object,
};

export default function Middle ({newScooter}) {
  const [scooter, setScooter] = useState(getAllScooters);

  useEffect(()=> { //Function starts when changes "newScooter". Add new scooter to array
    console.log (" value of 'newScooter' changed ")
    if (newScooter === null) return;
    if (newScooter){
      // console.log("New scooter from imputs was added:" + newScooter); console.log(newScooter);

      const newId = +localStorage.getItem("currentId");
      if(!newId){
        localStorage.setItem("currentId", "1")
      }

          const newScooterAddition = { //add missing values when adding new scooter
            ...newScooter,
            id: newId || 1,
            lastUseTime: 1,
            isBusy: false
        };
        // console.log("Missing values added:" + newScooter); console.log(newScooterAddition);
      
      setScooter([...scooter, newScooterAddition]); //Value of  all scooters: existent + new
      const nextId = newId + 1 === 1 ? 2 :newId + 1;
      localStorage.setItem("currentId", nextId)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[newScooter])

  //Add scooters to localStorage once "scooter" is updated
  useEffect(()=>{
    localStorage.setItem("scooters", JSON.stringify(scooter)); //key-scooters
  }, [scooter]) 

  //Using localStorage
  function getAllScooters() {
    const data = JSON.parse(localStorage.getItem("scooters")) || []; // console.log(data);
    if(data.length === 0) localStorage.setItem("scooters","[]");
    return data;
  }

  return (
    <div className="container mx-auto min-h-[400px] flex flex-col p-4 pt-6 gap-2 ">   
      {scooter.map((s)=>(
        <Scooter 
          key={s.id} 
          scooter={s} />
      ))}
    </div>
    );
}
Middle.propTypes = {
	newScooter: PropTypes.object,
};