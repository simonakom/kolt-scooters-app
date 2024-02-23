import Button from './Button';

export default function Top () {

    return (
      <div className="mx-auto bg-teal-700 min-h-[300px] min-w-[100px] p-4 flex flex-col items-center overflow-scroll"> 
        <img src="/public/electric-scooter.png" alt="Scooter" className="max-w-[100px] mt-5 sm:max-w-[150px] sm:mt-5"/>
        <h2 className='my-7 text-3xl font-semibold text-white'> Kolt ScootTrack</h2>
        <div className="flex flex-col sm:flex-row  gap-4 min-w-[90%] justify-center items-center">
            <input 
              type="text" 
              className="rounded-lg p-2 outline-amber-400 outline-2 text-slate-700 bg-slate-200 min-w-[100px] w-full sm:w-1/4 mb-2 sm:mb-0"
              placeholder='Type scooter model...' 
            />
            <input 
              type="text" 
              className="rounded-lg p-2  outline-amber-400 outline-2 text-slate-700 bg-slate-200 min-w-[100px] w-full sm:w-1/4 mb-2 sm:mb-0"
              placeholder='Type scooter mileage...' 
            />   
            <Button 
              text="Check" 
              color="#f4cf1b"
              textColor="#292f3f"
              />  
        </div>

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