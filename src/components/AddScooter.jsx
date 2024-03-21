import Button from './Button';
import { useState, useContext } from "react"
import ErrorMessage from "./ErrorMessage";
import KoltContext from "../context/KoltContext";

export default function AddScooterForm () {
  const initialScooterState = { title:"", ride:0, registrationCode:"", hourlyPrice:0 };
    const [scooter, setScooter] = useState ({ title:"", ride:0, registrationCode:"", hourlyPrice:0 });
    const [errorMessage, setErrorMessage] = useState(""); 

    const {setNewScooter } = useContext(KoltContext);

    const handleNameChange = (event) => {
      const newValue = event.target.value;
      if(newValue.length > 15)
      setErrorMessage ("Name must be up to 15 characters!");
      else {
        setScooter ({...scooter,title: event.target.value});
      } 
    };
    const handleRideChange = (event) => {
      const newValue = +event.target.value; //console.log (newValue)
      if (newValue < 0){
        setErrorMessage ("Mileage must be greater than zero!");
      } else setScooter ({...scooter, ride:newValue});
    };
    const handleNationalNumberChange = (event) => {
      const newValue = event.target.value;
      if(newValue.length > 5){
        setErrorMessage ("National number must be up to 5 characters!");
      } else setScooter ({...scooter, registrationCode:newValue});
    };
    const handlePricingChange = (event) => {
      const newValue = +event.target.value;
      if (newValue < 0) {
        setErrorMessage ("Price must be greater than zero!");
      } else if (newValue > 100) 
        setErrorMessage ("Price must be up to 100€!");
      else setScooter({ ...scooter, hourlyPrice: newValue });
    };
    const saveNewScooter = () => {
       // Check if all input fields are empty
      if (
        scooter.title.trim() === "" &&
        scooter.ride === 0 &&
        scooter.registrationCode.trim() === "" &&
        scooter.hourlyPrice === 0
      ) {
        setErrorMessage("All fields are required!");
        return;
      }

      if (!/[A-Z]{3}[\d]{2}/.test(scooter.registrationCode)) {
        setErrorMessage ("Wrong registration number: It should contain 3 capital letters and 2 numbers!");
        return;
      }
      
      setNewScooter(scooter)
      setScooter(initialScooterState);
    }; 

    return (
      <div>
        <div className="mb-4 max-w-[90%] text-center"> 
        {/* <ErrorMessage onClose={()=>{
          setErrorMessage("")}}>{errorMessage}
      </ErrorMessage> */}
        { errorMessage !== "" && (
          <ErrorMessage onClose={()=>{
          setErrorMessage("")}}>{errorMessage}
          </ErrorMessage>
        )}
        </div>
        <div className="min-w-[300px] flex flex-col sm:flex-row  gap-4 justify-center items-center mb-10">
            <input 
                type="text"
                value={scooter.title}
                onChange={handleNameChange}
                className="rounded-lg p-2 outline-amber-400 outline-2 text-slate-700 bg-slate-200  w-full sm:w-1/4 mb-2 sm:mb-0"
                placeholder='Scooter model...' 
            />
            <input 
                type="number"
                value={scooter.ride === 0 ? "" : scooter.ride.toString()}
                onChange={handleRideChange}
                className="rounded-lg p-2  outline-amber-400 outline-2 text-slate-700 bg-slate-200 w-full sm:w-1/4 mb-2 sm:mb-0"
                placeholder='Scooter mileage...'
            />   
              <input 
                type="text"
                value={scooter.registrationCode}
                onChange={handleNationalNumberChange}
                className="rounded-lg p-2  outline-amber-400 outline-2 text-slate-700 bg-slate-200  w-full sm:w-1/4 mb-2 sm:mb-0"
                placeholder='Scooter registration nr....'
              />
              <input
                type="number"
                value={scooter.hourlyPrice === 0 ? "" : scooter.hourlyPrice.toString()}
                onChange={handlePricingChange}
                className="rounded-lg p-2 py-2 outline-amber-400 outline-2 text-slate-700 bg-slate-200  w-full sm:w-1/4 mb-2 sm:mb-0"
                placeholder="Scooter price €/hour..."
              />
              <Button 
                onClick={saveNewScooter}
                text="Check" 
                color="#f4cf1b"
                textColor="#292f3f"
              />  
        </div>
    </div>
  );
}
