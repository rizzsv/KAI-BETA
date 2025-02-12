import axiosInstance from "@/helper/api";
import { KeretaType, ScheduleType } from "../types";
import AddJadwal from "./addSchedule";
import Jadwal from "./Schedule";
import { getServerCookie } from "@/helper/server-cookie";


const getJadwal = async (): Promise<ScheduleType[]> => {
  try {
    const url = `/schedule`;
    const TOKEN = await getServerCookie(`token`);

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

const getKereta = async (): Promise<KeretaType[]> => {
  try {
      /** get token from cookie */
      const TOKEN = await getServerCookie("token")
      const url = `/train`
      /** hit endpoint */
      const response: any = await axiosInstance
          .get(url, {
              headers: {
                  authorization: `Bearer ${TOKEN}`
              }
          })
      if (response.data.success == true) {
          return response.data.data
      }
      return []
  } catch (error) {
      console.log(error);
      return []
  }
}

const JadwalPage = async () => {
  const dataJadwal = await getJadwal();
  const dataKereta = await getKereta();

  return (
      <div className="w-full p-5 bg-white">
        <h1 className="text-xl font-bold">Data Jadwal</h1>
        <span className="text-sm text-slate-500">
          Halaman ini memuat daftar jadwal kereta api yang tersedia
        </span>

        <div className="my-3">
          <AddJadwal trains={dataKereta} />
          {dataJadwal.map((jadwal, index) => (
            <Jadwal key={`keyJadwal-${index}`} item={jadwal} trainData={dataKereta} />
          ))}
        </div>
      </div>
  );
};

export default JadwalPage;