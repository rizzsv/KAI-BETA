import { wagon } from "../../types"
import Seat from "../Seat"
import AddSeat from "./addSeat"
import DropGerbong from "./dropGerbong"
import EditGerbong from "./editGerbong"


interface props {
  item: wagon
}

const Gerbong = (myProps: props) => {

  const gerbongId: number = Number(myProps.item.id) as number
  return (
    <div className="w-full my-2 bg-slate-50 rounded-md shadow-md flex flex-wrap justify-between">
      <div className="p-3">
        <small className="text-xs">Nama Gerbong</small>
        <br />
        {myProps.item.name}
        <br />
        Jumlah Kursi: {myProps.item.seat_count}

        <div className="w-full my-2">
          {
            myProps.item.seats.length == 0? 
            <div className="flex flex-col space-y-5">
               <div className="bg-sky-200 p-5 rounded-md">
              Gerbong ini belum mempunyai kursi
            </div>
            <AddSeat wagonId={myProps.item.id} id={myProps.item.id}/>
            </div>
            :
            <div className="flex flex-wrap gap-3">
               <AddSeat wagonId={myProps.item.id} id={myProps.item.id}/>
              {
                myProps.item.seats.map((seat, index) => (
                  <Seat key={`seat-${index}`}
                  item={seat}
                  />
                ))
              }
            </div>
          }
        </div>
      </div>
      <div className="p-3 flex gap-3">
        <EditGerbong item={myProps.item}/>
        <DropGerbong item={myProps.item.id}/>
      </div>
    </div>
  )
}

export default Gerbong