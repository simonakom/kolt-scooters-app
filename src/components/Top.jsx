import Button from './Button';

export default function Top () {

    return (
      <div className="container mx-auto bg-blue-50 min-h-[400px] p-4">   
      <h2 className='text-center my-20 text-xl font-bold font-[Times New Roman]'> Add scooter</h2>
        <div className="flex gap-4 w-4/5 justify-center mx-auto">

          <input 
            type="text" 
            className="rounded px-2 py-1 outline-sky-200 outline-2 w-1/4"
            placeholder='scooter model' />

          <input 
            type="text" 
            className="rounded px-2 py-1 outline-sky-200 outline-2 w-1/4"
            placeholder='scooter rida' 
             />   
            
          <Button 
            text="Addddd" 
            color="blue" />
        </div>
        
          <div className='flex justify-center mt-20 gap-4'>
          <Button 
            text="show free"
            color="lightgreen" />
          <Button
            text="show taken" 
            color="pink" />
          </div>


      </div>
  
      )
  }