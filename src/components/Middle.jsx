import { useEffect, useState } from "react"
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { FaPencil, FaTrashCan } from "react-icons/fa6";

function Status({ status }) {
  return (
    <div className="text-2xl inline">
      {status ? <FaCheckCircle color="#42b1e2" /> : <FaTimesCircle color="#d67eb2" />}
    </div>
  );
}

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
            <div>{new Date(scooter.lastUseTime).toLocaleDateString("lt")}</div>
          </div>
          <div className="border-l-2  border-slate-200 px-3 inline min-w-[120px]">    
            <h3 className="font-bold">Status</h3>
            <div className="flex gap-2"><Status status={scooter.isBusy}/>{scooter.isBusy ? "available" : "In use"}</div>
          </div>

          <div className='flex gap-x-10 gap-y-20 items-center p-3'>
            <FaPencil className="text-yellow-600 hover:text-yellow-500 text-2xl btn-hover cursor-pointer" />
            <FaTrashCan className="text-rose-800 hover:text-rose-700 text-2xl btn-hover cursor-pointer" />
          </div>
      </div>
  );
}

export default function Middle () {
  const [scooter, setScooter] = useState(getAllScooters);

  //Using json file
  // useEffect(()=>{
  //   fetch("/scooters.json")
  //     .then((resp)=> resp.json())
  //     .then((data)=> {
  //       console.log(data);
  //       setScooter(data);
  //     });
  // },[])

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