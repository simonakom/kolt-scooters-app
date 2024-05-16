import { useState } from "react"
import Top from './components/Top';
import Middle from './components/Middle';
import KoltContext from "./context/KoltContext";

export default function Layout () {
  const [newScooter, setNewScooter] = useState(null);
  
  // function notifyScooterAddition(scooter) {
	// 	setNewScooter(scooter); //when new scooter is added in "AddScooter.jsx", new value here is set for new scooter. After change of scooters value - addition to localStorage happens in Middle.jsx with useEffect
	// }

  // function resetNewScooter(){
  //   setNewScooter(null);
  // }

//   return (
//     <div>
//       <Top notifyScooterAddition={notifyScooterAddition} />
//       <Middle 
//         newScooter={newScooter} 
//         resetInput = {resetNewScooter}/>
//     </div> 
//   )
// }

return ( 
  <div>
     <KoltContext.Provider value={{newScooter,setNewScooter }} > 
     <Top />
     <Middle />
     </KoltContext.Provider>
  </div>
 )
}
