"use client";


import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { ScheduleType, KeretaType } from "../types";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { getCookie } from "@/helper/client-cookie";
import axiosInstance from "@/helper/api";
import Modal from "@/components/Modal";

type props = {
  jadwal: ScheduleType;
  trains: KeretaType[] | undefined;
};

const EditJadwal = (myProps: props) => {
  const router = useRouter();
  const [show, setShow] = useState<boolean>(false);
  const [departured_location, setDeparturedLocation] = useState<string>(myProps.jadwal.departured_location);
  const [arrived_location, setArrivedLocation] = useState<string>(myProps.jadwal.arrived_location);
  const [departured_time, setDeparturedTime] = useState<Date>(new Date(myProps.jadwal.departured_time));
  const [arrived_time, setArrivedTime] = useState<Date>(new Date(myProps.jadwal.arrived_time));
  const [train_id, setTrainId] = useState<number>(myProps.jadwal.train_id);
  const [price, setPrice] = useState<number>(myProps.jadwal.price);

  const openModal = () => {
    setDeparturedLocation(myProps.jadwal.departured_location);
    setArrivedLocation(myProps.jadwal.arrived_location);
    setDeparturedTime(new Date(myProps.jadwal.departured_time));
    setArrivedTime(new Date(myProps.jadwal.arrived_time));
    setTrainId(myProps.jadwal.train_id);
    setPrice(myProps.jadwal.price);
    setShow(true);
  };

  const closeModal = () => {
    setShow(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();

      const cookie = getCookie("token");
      const request = {
        departured_location,
        arrived_location,
        departured_time,
        arrived_time,
        price,
      };

      const response: any = await axiosInstance.put(
        `/schedule/${myProps.jadwal.id}`,
        request,
        {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        }
      );

      const message = response.data.message;

      if (response.data.success != true) {
        toast(message, {
          type: "warning",
          containerId: `toastEdit-${myProps.jadwal.id}`,
        });
      }

      toast(message, {
        type: "success",
        containerId: `toastEdit-${myProps.jadwal.id}`,
      });
      setShow(false);
      setTimeout(() => router.refresh(), 1000);
    } catch (error) {
      console.log(error);
      toast(`Something went wrong`, {
        toastId: `toastEdit-${myProps.jadwal.id}`,
        type: "error",
      });
    }
  };

  return (
    <div>
      <ToastContainer containerId={`toastEdit-${myProps.jadwal.id}`} />
      <button
        type="submit"
        className="px-2 py-1 rounded-md group bg-sky-600 hover:bg-sky-500 text-white"
        onClick={() => openModal()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 bg-sky-600 group-hover:bg-sky-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
        </svg>
      </button>
      <Modal isShow={show}>
        <form onSubmit={handleSubmit}>
          {/* Modal header */}
          <div className="w-full p-3 rounded-t-md">
            <h1 className="font-semibold text-lg text-black">Tambah Kereta</h1>
            <span className="text-sm text-slate-500">
              Pastikan data terisi dengan benar
            </span>
          </div>

          {/* Modal body */}
          <div className="w-full p-3">
            <div className="my-2 border rounded-md">
              <small className="text-xs p-1 font-semibold text-sky-500">
                Berangkat dari
              </small>
              <input
                type="text"
                id={`departured_location`}
                value={departured_location}
                onChange={(e) => setDeparturedLocation(e.target.value)}
                className="p-1 outline-none w-full hover:border-b border-b-sky-500"
                required={true}
              />
            </div>
            <div className="my-2 border rounded-md">
              <small className="text-xs p-1 font-semibold text-sky-500">
                Waktu Keberangkatan
              </small>
              <br />

              <DatePicker
                showTimeInput={true}
                id={`departured_time`}
                selected={new Date(departured_time)}
                dateFormat={`dd MMMM yyyy HH:mm`}
                className="p-1 outline-none w-full hover:border-b border-b-sky-500"
                onChange={(date) => setDeparturedTime(date || new Date())}
              />
            </div>
            <div className="my-2 border rounded-md">
              <small className="text-xs p-1 font-semibold text-sky-500">
                Tiba di
              </small>
              <input
                type="text"
                id={`arrived_location`}
                value={arrived_location}
                onChange={(e) => setArrivedLocation(e.target.value)}
                className="p-1 outline-none w-full hover:border-b border-b-sky-500"
                required={true}
              />
            </div>
            <div className="my-2 border rounded-md">
              <small className="text-xs p-1 font-semibold text-sky-500">
                Waktu Kedatangan
              </small>
              <br />
              <DatePicker
                showTimeInput={true}
                id={`arrived_time`}
                selected={new Date(arrived_time)}
                dateFormat={`dd MMMM yyyy HH:mm`}
                className="p-1 outline-none w-full hover:border-b border-b-sky-500"
                onChange={(date) => setArrivedTime(date || new Date())}
              />
            </div>
            <div className="my-2 border rounded-md">
              <small className="text-xs p-1 font-semibold text-sky-500">
                Harga
              </small>
              <input
                type="number"
                id={`price`}
                value={price.toString()}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="p-1 outline-none w-full hover:border-b border-b-sky-500"
                required={true}
              />
            </div>
            <div className="my-2 border rounded-md">
              <small className="text-xs p-1 font-semibold text-sky-500">
                Jenis Kereta
              </small>
              <select
                id={`train_id`}
                value={train_id.toString()}
                onChange={(e) => setTrainId(Number(e.target.value))}
                className="p-1 outline-none w-full border border-b-sky-500"
                required={true}
                disabled
              >
                <option value="">Pilih Jenis Kereta</option>
                {myProps.trains && myProps.trains.map((kereta, index) => (
                  <option
                    className="rounded-md shadow-sm border-none"
                    key={`optionKereta-${index}`}
                    value={kereta.id}
                  >
                    {kereta.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="w-full p-3 rounded-b-lg flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => closeModal()}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-md"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-sky-700 hover:bg-sky-600 text-white rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default EditJadwal;