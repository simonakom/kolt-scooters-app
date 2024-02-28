import AddScooterForm from './AddScooter.jsx';
import * as PropTypes from "prop-types";
import scooterImage from '../../public/electric-scooter.png'; 
// "/public/electric-scooter.png" 

export default function Top ({notifyScooterAddition}) {
  return (
    <div className="mx-auto bg-teal-700 min-h-[300px] min-w-[100px] p-4 flex flex-col items-center overflow-hidden"> 
      <img src={scooterImage} alt="Scooter" className="max-w-[100px] mt-5 sm:max-w-[150px] sm:mt-5"/>
      <h2 className='my-7 text-3xl font-semibold text-white'> Kolt ScootTrack</h2>
      <AddScooterForm notifyScooterAddition={notifyScooterAddition} />
    </div>
    );
  }
  Top.propTypes = {
    notifyScooterAddition: PropTypes.func,
  };