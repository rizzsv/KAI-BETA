import { KeretaType, ScheduleType } from "@/app/karyawan/types"
import Link from "next/link"



type props = {
    item: ScheduleType,
    trainData: KeretaType[]
}

const showTime = (date: string) => {
    const currentDate = new Date(date)
    return currentDate.toLocaleTimeString(
        `id-ID`,
        {
            year: `numeric`,
            month: `long`,
            day: `2-digit`
        }
    )
}

const Jadwal = (myProps: props) => {
    return(
        <div className="flex flex-wrap w-full border rounded-md shadow-md my-2 bg-slate-50">
            <div className="w-full md:w-3/12 p-3 flex flex-col">
                {/* berrangkat dari */}
                <small className="text-xs font-semibold text-sky-700">
                    Berangkat dari
                </small>
                <strong>
                    {myProps.item.departured_location}
                </strong>
                {/* waktu keberangkatan */}
                <small className="text-xs font-semibold text-sky-700">
                    Waktu Keberangkatan
                </small>
                <strong>
                    {showTime(myProps.item.departured_time)}
                </strong>
            </div>
            <div className="w-full md:w-3/12 p-3 flex flex-col">
                {/* lokasi tiba */}
                <small className="text-xs font-semibold text-sky-700">
                    Tiba di
                </small>
                <strong>
                    {myProps.item.arrived_location}
                </strong>
                {/* waktu tiba */}
                <small className="text-xs font-semibold text-sky-700">
                    Waktu Tiba
                </small>
                <strong>
                    {showTime(myProps.item.arrived_time)}
                </strong>
            </div>
            <div className="w-full md:w-4/12 p-3 flex flex-col">
                {/* unit kereta */}
                <small className="text-xs font-semibold text-sky-700">
                    Unit Kereta
                </small>
                <strong>
                    {myProps.item.train_details.name}
                </strong>
                {/* harga */}
                <small className="text-xs font-semibold text-sky-700">
                    Harga
                </small>
                <strong>
                    {
                        myProps.item.price
                            .toLocaleString(`en-US`,
                                {
                                    style: `currency`,
                                    currency: `IDR`
                                }
                            )
                    }
                </strong>
            </div>
            <div className="w-full flex flex-col  md:w-2/12 p-2">
            <small className="text-sm text-blue-700 font-medium">
                Opsi
            </small>
            <Link href={`/pelanggan/pesan/${myProps.item.id}`}>
            <button type="button" 
            className="px-4 py-2 rounded-md bg-orange-500 hover:bg-orange-600 text-white">
                pesan
            </button>
            </Link>
        </div>
        </div>
    )
}

export default Jadwal;