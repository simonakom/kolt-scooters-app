import { useEffect, useState, useMemo, useContext } from "react"
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { FaTrashCan } from "react-icons/fa6";
import * as PropTypes from "prop-types";
import Button from './Button';
import ErrorMessage from "./ErrorMessage";
import KoltContext from "../context/KoltContext";

function Status({ status, onClick }) {
  return (
    <div className="text-2xl inline cursor-pointer" onClick={onClick}>
      {status ? <FaTimesCircle color="#d67eb2" /> : <FaCheckCircle color="#42b1e2" />}
    </div>
  );
}
Status.propTypes = {
	status: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
};


function Scooter({scooter, deleteFunc, updateFunc}){
  return (
      <div 
          key={scooter.id} 
          className="bg-slate-100 text-slate-700 rounded px-10 py-3 flex flex-wrap gap-x-10 gap-y-8 justify-between overflow-hidden">
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
        
            <div className='flex flex-col px-3 gap-3'>
              <div className="font-bold">Update</div>
              <div className="flex gap-3"> 
                <div className="flex gap-1 min-w-[100px]"> 
                  <Status status={scooter.isBusy} onClick={updateFunc}/>
                  {scooter.isBusy ? "In use" : "available" }
                </div>
                <FaTrashCan 
                  className="text-rose-800 hover:text-rose-700 text-2xl btn-hover cursor-pointer"
                  onClick={() => deleteFunc()}/>
              </div>
            </div>
      </div>
  );
}
Scooter.propTypes = {
	scooter: PropTypes.object,
  deleteFunc: PropTypes.func,
  updateFunc: PropTypes.func,
};

export default function Middle () {
  const [scooter, setScooter] = useState(getAllScooters);
  const [showFreeScooter, setShowFreeScooter] = useState(null);
  const [selectedRideSort, setSelectedRideSort] = useState("0")
  const [errorMessage, setErrorMessage] = useState(""); 
  const {newScooter, setNewScooter } = useContext(KoltContext);

  useEffect(()=> { //Function starts when changes "newScooter". Add new scooter to array
    console.log ("value of 'newScooter' changed")
    saveScooter();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[newScooter])

  //Add scooters to localStorage once "scooter" is updated
  useEffect(()=>{
    localStorage.setItem("scooters", JSON.stringify(scooter)); //key-scooters
  }, [scooter]) 

  //Save scooter: check: null or not 
  function saveScooter() {
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
      localStorage.setItem("currentId", nextId);
      setNewScooter(null);
    }
  }

  //Using localStorage
  function getAllScooters() {
    const data = JSON.parse(localStorage.getItem("scooters")) || []; // console.log(data);
    if(data.length === 0) localStorage.setItem("scooters","[]");
    return data;
  }

  //Filtering  //Sorting by mileage
  const filteredAndSortedScooters = useMemo(() => {
		return scooter
			.filter((val) => { //val-each array value
				console.log("Filtering");
				if (showFreeScooter === null) {
					return true;
				} else if (showFreeScooter) {
					return !val.isBusy;
				} else {
					return val.isBusy;
				}
			})
			.sort((a, b) => {
				if (selectedRideSort === "1") return 0;
				else if (selectedRideSort === "2") {
					if (a.ride > b.ride) return 1;
					else if (b.ride > a.ride) return -1;
					else return 0;
				} else {
					if (a.ride > b.ride) return -1;
					else if (b.ride > a.ride) return 1;
					else return 0;
				}
			});
	}, [showFreeScooter, scooter, selectedRideSort]);
	console.log(scooter);

  //Deleting
  function deleteScooter(id) { //search in array "scooter" concrete id of scooter to delete
    const newScooters = scooter.filter((val) => val.id !==id);
    setScooter(newScooters);  //setting new value for scooter
  }

  //update status
  function updateStatus(id){
    const newScooters = [...scooter]; //copy of array "scooter"
    const recordIndex = scooter.findIndex((val) => val.id === id); //find record id of scooter
    newScooters[recordIndex].isBusy = !newScooters[recordIndex].isBusy; //update status: boolean value
    // console.log(newScooters)

      let answer;
    if (!newScooters[recordIndex].isBusy) { // Check if scooter is busy
        answer = +prompt("How many kilometres did the scooter travel?");
        console.log(answer);
        if (answer === 0) return;
        else if (!isNaN(answer)) { // Validation if user inserted number in prompt
            newScooters[recordIndex].ride += answer; // Update ride
            setScooter(newScooters);
        } else {
            setErrorMessage("Please, enter a number!");
            return;
        }
    } else {
        setScooter(newScooters); // Establish new value for scooter
    }}

  return (
    <div className="container mx-auto min-h-[400px] flex flex-col p-4 pt-6 gap-2 mb-10">   
      {/* <ErrorMessage onClose={()=>{
          setErrorMessage("")}}>{errorMessage}
      </ErrorMessage> */}
        { errorMessage !== "" && (
          <ErrorMessage onClose={()=>{
          setErrorMessage("")}}>{errorMessage}
          </ErrorMessage>
        )}
      <div className="flex flex-col sm:flex-row p-3 gap-5 justify-between items-center">
          <div className='flex flex-col sm:flex-row gap-5'>
              <Button
                text="all" 
                color="#f4cf1b" 
                textColor="#292f3f"
                onClick={() => {
                  setShowFreeScooter(null);
                }}/>
              <Button  
                text= {showFreeScooter === true 
                  ? "In use" 
                  :  "Available" 
                }
                color = { showFreeScooter === true 
                    ? "#d67eb2" 
                    : "#42b1e2" 
                }
                textColor="#292f3f" 
                onClick={() => {
                  setShowFreeScooter((prevValue) => {
                    return prevValue === true 
                      ? false 
                      : true;
                  });
                }}
              />  
            </div>
            <div>
              <select value={selectedRideSort} onChange={(e)=>setSelectedRideSort(e.target.value)} className="bg-[#9ec59e] px-5 py-2 rounded-md font-medium max-w-[150px] btn-hover break-keep overflow-hidden">
                <option value="" disabled selected>sorting by mileage</option>
                <option value="1">Default</option>
                <option value="2">Increasing</option>
                <option value="3">Decreasing</option>
              </select>
            </div>
        </div>
        {filteredAndSortedScooters.map((s)=>(
          <Scooter 
            key={s.id} 
            deleteFunc={() => deleteScooter(s.id)}
            updateFunc={() => updateStatus(s.id)}
            scooter={s} />
        ))}
    </div>
    );
}
