import { useState } from "react"
import Top from './components/Top';
import Middle from './components/Middle';
import Bottom from './components/Bottom';

export default function Layout () {
  const [newScooter, setNewScooter] = useState(null);
  
  function notifyScooterAddition(scooter) {
		setNewScooter(scooter); //when new scooter is added in "AddScooter.jsx", ne value here is set for new scooter. After change of scooters value - addition to localStorage happens in Middle.jsx with useEffect
	}
  return (
    <div>
      <Top notifyScooterAddition={notifyScooterAddition} />
      <Middle newScooter={newScooter} />
      <Bottom />
    </div> 
  )
}