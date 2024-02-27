import Button from './Button';
import AddScooterForm from './AddScooter.jsx';
import * as PropTypes from "prop-types";

export default function Top ({notifyScooterAddition}) {
  return (
    <div className="mx-auto bg-teal-700 min-h-[300px] min-w-[100px] p-4 flex flex-col items-center overflow-scroll"> 
      <img src="/public/electric-scooter.png" alt="Scooter" className="max-w-[100px] mt-5 sm:max-w-[150px] sm:mt-5"/>
      <h2 className='my-7 text-3xl font-semibold text-white'> Kolt ScootTrack</h2>
      <AddScooterForm notifyScooterAddition={notifyScooterAddition} />
        <div className='flex flex-col sm:flex-row mt-6 sm:mt-8 p-3 gap-5 whitespace-nowrap'>
          <Button 
            text="available"
            color="#42b1e2"
            textColor="#292f3f" 
          />
          <Button
            text="In use" 
            color="#d67eb2" 
            textColor="#292f3f" 
          />
        </div>
    </div>
    );
  }
  Top.propTypes = {
    notifyScooterAddition: PropTypes.func,
  };