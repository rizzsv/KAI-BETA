export const dynamic = "force-dynamic";
import React from "react";
import FilterJadwal from "./FilterJadwal";
import axiosInstance from "@/helper/api";
import { ScheduleType } from "@/app/karyawan/types";

import Jadwal from "./Schedule";
import { getServerCookie } from "@/helper/server-cookie";

const getJadwal = async (
  departure_location: string,
  arrived_location: string
): Promise<ScheduleType[]> => {
  try {
    const url = `/schedule?departured_location=${departure_location}&arrived_location=${arrived_location}`;
    const TOKEN = await getServerCookie(`token`);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  searchParams: {
    departured_location?: string;
    arrived_location?: string;
  };
};

const JadwalPage = async (myProp: Props) => {
  const departure_location =
    (await myProp.searchParams).departured_location?.toString() || "";
  const arrived_location =
    (await myProp.searchParams).arrived_location?.toString() || "";

  const dataJadwal = await getJadwal(departure_location, arrived_location);

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
      {departure_location !== "" && arrived_location !== "" && (
        <div className="my-3">
          {dataJadwal.length == 0 ? (
            <div className="w-full p-3 rounded-md bg-orange-100">
              Maaf, jadwal tidak tersedia
            </div>
          ) : (
            <div>
              {dataJadwal.map((jadwal, index) => (
                <Jadwal item={jadwal} key={index} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default JadwalPage;
