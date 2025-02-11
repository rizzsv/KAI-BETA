"use client"

import Modal from "@/components/Modal"
import axiosInstance from "@/helper/api"
import { getCookie } from "@/helper/client-cookie"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import DatePicker from "react-datepicker"
import { toast, ToastContainer } from "react-toastify"
import { KeretaType } from "../types"

type Props = {
    trains: KeretaType[]
}
const AddSchedule = (myProp: Props) => {
    const router = useRouter()
    const [show, setShow] = useState<boolean>(false)
    const [departured_location, setDeparturedLocation] = useState<string>("")
    const [departured_time, setDepartured_time] = useState<string>("")
    const [arrived_time, setArrived_time] = useState<string>("")
    const [arrived_location, setArrived_location] = useState<string>("")
    const [train_id, setTrain_id] = useState<number>(0)
    const [price, setPrice] = useState<number>(0)

    const openModal = () => {
        setShow(true)
        setDeparturedLocation("")
        setDepartured_time("")
        setArrived_location("")
        setArrived_time("")
        setTrain_id(0)
        setPrice(0)
    }

    const closeModal = () => {
        setShow(false)
    }

    const handleSubmit = async (e: FormEvent) => {
        try {
            const url = `/schedule`
            const requestData = {
                departured_location, departured_time, arrived_time, arrived_location, train_id, price
            }
            const TOKEN = getCookie(`token`)
            const response: any = await axiosInstance.post(url, requestData, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`
                }
            })
            const message = response.data.message 
            if(response.data.success === true){
                setShow(false)
                toast(message, {
                    containerId: `toastAddJadwal`,
                    type: `success`
                })
                setTimeout(() => router.refresh(), 1000)
            } else {
                toast(message, {
                    containerId: `toastAddJadwal`,
                    type: `warning`
                })
            }
        } catch (error) {
            console.log(error);
            toast(`Something went wrong`, {
                containerId: `toastAddJadwal`,
                type: "error"
            })
            
        }
    }

    return (
        <div>
            <ToastContainer containerId={`toastAddJadwal`}/>
        <button className="px-4 py-2 rounded-md text-white bg-green-600 hover:bg-green-500"
        type="button"
        onClick={() => openModal()}> 
            Tambah Jadwal Kereta
        </button>
        <Modal isShow={show}>

            <form onSubmit={handleSubmit}>
            {/* Modal Header */}
            <div className="w-full p-3 rounded-t-lg">
            <h1 className="font-semibold text-lg">Tambah Data Kereta</h1>
            <span className="text-sm text-slate-500">
              Pastikan data yang diisi suda benar
            </span>
          </div>

          {/* Modal Body */}
          <div className="w-full p-3">
            <div className="my-2 border rounded-md">
                <small className="text-xs font-semibold text-sky-500">
                    Berangkat dari
                </small>
                <input type="text" id={`departured_location`} value={departured_location} onChange={e => setDeparturedLocation (e.target.value)} 
                className="p-1 outline-none w-full hover:border-b hover: border-b-sky-500"
                required={true}
                />
            </div>

            <div className="my-2 border rounded-md">
                <small className="text-xs font-semibold text-sky-500">
                    Waktu keberangkatan
                </small>
                <DatePicker
                id={`departured_time`}
                selected={new Date(departured_time)}
                className="p-1 outline-none w-full hover:border-b hover: border-b-sky-500"
                dateFormat={`dd MMM yyy hh:mm aa`}
                onChange={(date: Date) => setDepartured_time(date?.getTime().toString() || "")}
                required={true}
                />
            </div>

            <div className="my-2 border rounded-md">
                <small className="text-xs font-semibold text-sky-500">
                    Tiba di
                </small>
                <input type="text" id={`arrived_location`} value={arrived_location} onChange={e => setArrived_location (e.target.value)} 
                className="p-1 outline-none w-full hover:border-b hover: border-b-sky-500"
                required={true}
                />
            </div>

            <div className="my-2 border rounded-md">
                <small className="text-xs font-semibold text-sky-500">
                    Waktu Kedatangan
                </small>
                <DatePicker
                id={`arrived_time`}
                selected={new Date(arrived_time)}
                className="p-1 outline-none w-full hover:border-b hover: border-b-sky-500"
                dateFormat={`dd MMM yyy hh:mm aa`}
                onChange={(date: Date) => setArrived_time(date?.getTime().toString() || "")}
                required={true}
                />
            </div>
            
            <div className="my-2 border rounded-md">
                <small className="text-xs font-semibold text-sky-500">
                    Harga
                </small>
                <input type="number" id={`price`} value={price.toString()} onChange={e => setPrice(Number(e.target.value))} 
                className="p-1 outline-none w-full hover:border-b hover: border-b-sky-500"
                required={true}
                />
            </div>

            <div className="my-2 border rounded-md">
                <small className="text-xs font-semibold text-sky-500">
                    Jenis Kereta
                </small>
                <select id={`train_id`}
                value={train_id.toString()}
                onChange={E => setTrain_id(Number(E.target.value))}
                className="p-1 outline-none w-full border hover: border-b-sky-500"
                required={true}
                >
                    <option value="">Pilih Jenis Kereta</option>
                    {myProp.trains.map((kereta, index) => (
                        <option value={kereta.id} key={`optionKereta-${index}`}>
                            {kereta.name}
                        </option>
                    ))}
                </select>
                className="p-1 outline-none w-full hover:border-b hover: border-b-sky-500"
                required={true}
                />
            </div>
          </div>
          

          {/* Modal footer */}
          <div className="w-full p-3 rounded-b-lg flex items-center justify-end gap-2">
            <button 
                type="button"
                className="px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-600"
                onClick={() => closeModal()}
            >
                Close
            </button>

            <button 
                type="submit"
                className="px-4 py-2 rounded-md bg-sky-700 hover:bg-sky-600"
            >
                Save
            </button>
          </div>
            </form>

        </Modal>
        </div>
    )
}

export default AddSchedule