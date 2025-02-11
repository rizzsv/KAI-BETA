import { getServerCookie } from "@/helper/server-cookie";
import { ScheduleType } from "../types";
import axiosInstance from "@/helper/api";
import Schedule from "./Schedule";

const getJadwal = async (): Promise<ScheduleType[]> => {
    try {
        const url = `/schedule`
        const TOKEN = await getServerCookie(`token`)

        const response: any = await axiosInstance.get(url, {
            headers: {authorization: `Bearer ${TOKEN}`}
        })

        if(response.data.success === true){
            return response.data.data
        }

        return []
    } catch (error) {
        console.log(error);
        return[]        
    }
}

const JadwalPage = async () => {

    const dataJadwal = await getJadwal()

    return (
        <div className="w-full p-5 bg-white">
            <h1 className="text-xl font-semibold">
                Data Jadwal
            </h1>
            <span className="text-sm text-slate-500">
                Halaman ini memuat daftar jadwal kereta api yang tersedia
            </span>

            <div className="my-3">
                {dataJadwal.map((jadwal, index) => (
                    <Schedule 
                    key={`keyJadwal-${index}`}
                    item={jadwal}
                    />
                ))}
            </div>

        </div>
    )

}

export default JadwalPage;