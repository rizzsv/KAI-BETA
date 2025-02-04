import React from 'react'
import EditSeat from './[id_kereta]/editSeat'
import Deleteseat from './[id_kereta]/deleteSeat'

interface props {
  item: seat
}
const Seat = (myprops: props) => {
  return (
    <div className='size-20 rounded-sm flex flex-col items-center justify-center bg-sky-700'>
     <div className='flex justify-between mt-[-2rem] gap-[10px]'>
      <div>
        <EditSeat seatId={myprops.item.id} seatName={myprops.item.seat_number}/>
      </div>
      <div>
        <Deleteseat seatId={myprops.item.id}/>
      </div>
     </div>
       <div>
       <span className='text-white font-semibold'>
            {myprops.item.seat_number}
        </span>
       </div>
    </div>
  )
}

export default Seat