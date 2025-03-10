export const dynamic = "force-dynamic";
import { KeretaType, ScheduleType } from "@/app/karyawan/types";
import axiosInstance from "@/helper/api";
import { getServerCookie } from "@/helper/server-cookie";

type Props = {
    params: { schedule_id: number };
};

const showTime = (date: string) => {
    if (!date) return "-";
    const currentDate = new Date(date);
    return currentDate.toLocaleTimeString("id-ID", {
        year: "numeric",
        month: "long",
        day: "2-digit",
    });
};

const getTrainBySchedule = async (schedule_id: number): Promise<KeretaType | null> => {
    try {
        const url = `/schedule/train/${schedule_id}`;
        const TOKEN = await getServerCookie("token");
        const response = await axiosInstance.get(url, {
            headers: { authorization: `Bearer ${TOKEN}` },
        });
        return response.data.success ? response.data.data : null;
    } catch (error) {
        console.error("Error fetching train by schedule:", error);
        return null;
    }
};

const getScheduleDetail = async (schedule_id: number): Promise<ScheduleType | null> => {
    try {
        const url = `/schedule/${schedule_id}`;
        const TOKEN = await getServerCookie("token");
        const response = await axiosInstance.get(url, {
            headers: { authorization: `Bearer ${TOKEN}` },
        });
        return response.data.success ? response.data.data : null;
    } catch (error) {
        console.error("Error fetching schedule details:", error);
        return null;
    }
};

const KeretaDetailPage = async ({ params }: Props) => {
    const schedule_id = params.schedule_id;
    const detailSchedule = await getScheduleDetail(schedule_id);
    const detailKereta = await getTrainBySchedule(schedule_id);

    return (
        <div className="w-full p-3">
            <h1 className="text-2xl font-bold">Detail Keberangkatan Kereta</h1>
            <table>
                <tbody>
                    <tr>
                        <td>Stasiun Keberangkatan</td>
                        <td>: {detailSchedule?.departured_location || "-"}</td>
                    </tr>
                    <tr>
                        <td>Waktu Keberangkatan</td>
                        <td>: {detailSchedule?.departured_time ? showTime(detailSchedule.departured_time) : "-"}</td>
                    </tr>
                    <tr>
                        <td>Waktu Kedatangan</td>
                        <td>: {detailSchedule?.arrived_time ? showTime(detailSchedule.arrived_time) : "-"}</td>
                    </tr>
                    <tr>
                        <td>Nama Kereta</td>
                        <td>: {detailKereta?.name || "-"}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default KeretaDetailPage;
