"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

type Props = {
    departure_location: string
    arrived_location: string
}

const FilterJadwal = (myProp: Props) => {

    const [departure_location, setDepartureLocation] = useState<string>("")
    const [arrived_location, setArrivedLocation] = useState<string>("")
    const router = useRouter()

    const handleSeacrh = () => {
        if(
            departure_location !== "" &&
            arrived_location !== ""
        ){
            router.push(`/pelanggan/jadwal?departure_location=${departure_location}&arrived_location=${arrived_location}`)
        }
    }

    useEffect(() => {
        setDepartureLocation(myProp.departure_location)
        setArrivedLocation(myProp.arrived_location)
    }, [myProp])

    return (
        <div className="my-5 flex flex-wrap items-center">
        <div className="w-full md:w-1/2 p-3">
            <strong className="font-semibold text-white">
                Stasiun Asal
            </strong>
            <input type="text" id={`departure_location`}
                className="w-full border p-2 rounded-sm"
                value={departure_location}
                onChange={e => setDepartureLocation(e.target.value)}
            />
        </div>

        <div className="w-full md:w-1/2 p-3">
            <strong className="font-semibold text-white">
                Stasiun Tujuan
            </strong>
            <input type="text" id={`arrived_location`}
                className="w-full border p-2 rounded-sm"
                value={arrived_location}
                onChange={e => setArrivedLocation(e.target.value)}
            />
        </div>

        <button type="button"
        onClick={() => handleSeacrh()}
        className="px-4 py-2 rounded-md bg-orange-600 hover:bg-orange-500 text-white"
        >
            Cari Kereta 
        </button>
    </div>
    )
}

export default FilterJadwal