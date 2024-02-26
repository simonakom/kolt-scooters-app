import Button from './Button';
import { useState } from "react"

export default function AddScooterForm () {
    // const [scooterName, setScooterName] = useState ("");
    // const [ride, setRide] = useState ("0");
    // const [nationalNumber, setNationalNumber] = useState ("");
    // const [pricing, setPricing] = useState (0);
    const [scooter, setScooter] = useState ({ title:"", ride:0, registrationCode:"", hourlyPrice:0 });



    const handleNameChange = (event) => {
      setScooter ({...scooter,title: event.target.value});
    };
    const handleRideChange = (event) => {
      const newValue = +event.target.value; //console.log (newValue)
      if (newValue < 0){
          alert("Mileage must be greater than zero");
      } else setScooter ({...scooter, ride:newValue});
    };
    const handleNationalNumberChange = (event) => {
      const newValue = event.target.value;
      if(newValue.length > 5){
      alert ("National number must be up to 5 characters")
      } else setScooter ({...scooter, registrationCode:newValue});
    };
    const handlePricingChange = (e) => {
      const newValue = +e.target.value;
      if (newValue < 0) alert("Kainos reikšmė negali būti mažesnė nei nulis");
      else setScooter({ ...scooter, hourlyPrice: newValue });
    };

    return (
    <div className="flex flex-col sm:flex-row  gap-4 min-w-[80%] justify-center items-center">
        <input 
          type="text"
          value={scooter.title}
          onChange={handleNameChange}
          className="rounded-lg p-2 outline-amber-400 outline-2 text-slate-700 bg-slate-200 min-w-[100px] w-full sm:w-1/4 mb-2 sm:mb-0"
          placeholder='Type scooter model...' 
        />
        <input 
          type="number"
          value={scooter.ride.toString()}
          onChange={handleRideChange}
          className="rounded-lg p-2  outline-amber-400 outline-2 text-slate-700 bg-slate-200 min-w-[100px] w-full sm:w-1/4 mb-2 sm:mb-0"
          placeholder='Type scooter mileage...'
        />   
          <input 
          type="text"
          value={scooter.registrationCode}
          onChange={handleNationalNumberChange}
          className="rounded-lg p-2  outline-amber-400 outline-2 text-slate-700 bg-slate-200 min-w-[100px] w-full sm:w-1/4 mb-2 sm:mb-0"
          placeholder='Type scooter registration nr....'
          />
          <input
          type="number"
          value={scooter.hourlyPrice}
          onChange={handlePricingChange}
          className="rounded-lg p-2 py-2 outline-amber-400 outline-2 text-slate-700 bg-slate-200 min-w-[100px] w-full sm:w-1/4 mb-2 sm:mb-0"
          placeholder="Type scooter price/hour..."
          />
          <Button 
          text="Check" 
          color="#f4cf1b"
          textColor="#292f3f"
          />  
    </div>
  );
}