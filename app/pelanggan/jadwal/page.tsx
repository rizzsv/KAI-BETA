import React from "react"
import FilterJadwal from "./FilterJadwal"
import axiosInstance from "@/helper/api";
import { ScheduleType } from "@/app/karyawan/types";
import { getCookie } from "@/helper/client-cookie";
import Jadwal from "./Schedule";

const getJadwal = async (
    departure_location: string,
    arrived_location: string
): Promise<ScheduleType[]> => {
    try {
      const url = `/schedule?departure_location=${departure_location}&arrived_location=${arrived_location}`;
      const TOKEN = await getCookie(`token`);
  
      const response: any = await axiosInstance.get(url, {
        headers: { authorization: `Bearer ${TOKEN}` },
      });
  
      if (response.data.success === true) {
        return response.data.data;
      }
  
      return [];
    } catch (error) {
      console.log(error);
      return [];
    }
  };

type Props = {
    queryParam: Record<string, string> | string[] | undefined
}

const JadwalPage = async (myProp: Props) => {
    const departure_location = 
    myProp.queryParam?.departure_location.toString() || ""
    const arrived_location =
    myProp.queryParam?.arrived_location.toString() || ""

    const dataJadwal = await getJadwal(departure_location, arrived_location)
    
    return (
        <div className="w-full p-3">
            <div className="bg-blue-600 w-full p-3 rounded-md shadow-md">
                <h1 className="text-white text-xl font-bold">
                    Pemesanan Tiket Kereta Api
                </h1>

                <FilterJadwal
                departure_location={departure_location}
                arrived_location={arrived_location}
                />
            </div>
            {
                departure_location !== "" &&
                arrived_location !== "" &&

                <div className="my-3">

                    {
                     dataJadwal.length == 0 ?
                     <div className="w-full p-3 rounded-md bg-orange-100">
                        Maaf, jadwal tidak tersedia
                     </div> :
                     <div>
                        {
                            dataJadwal.map((jadwal, index) => (
                                <Jadwal
                                item={jadwal}
                                key={index}
                                />
                            ))
                        }
                     </div>
                    }
                </div>
            }
        </div>
    )
}
export default JadwalPage