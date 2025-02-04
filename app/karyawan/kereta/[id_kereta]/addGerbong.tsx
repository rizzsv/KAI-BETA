"use client";

import Modal from "@/components/Modal";
import axiosInstance from "@/helper/api";
import { getCookie } from "@/helper/client-cookie";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

type Props = {
  id_kereta: number;
};

const AddGerbong = ({ id_kereta }: Props) => {
  const [name, setName] = useState<string>("");
  const [seatCount, setSeatCount] = useState<number>(0);
  const [trainId, setTrainId] = useState<number>(id_kereta);
  const [descriptions, setDescriptions] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const router = useRouter();

  const openModal = () => {
    setShow(true);
    setName("");
    setSeatCount(0);
    setTrainId(id_kereta);
    setDescriptions("");
    setType("");
  };

  const closeModal = () => setShow(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    try {
      const TOKEN = getCookie("token");
      const url = "train/wagon";
      const requestData = { name, seat_Count: seatCount, train_Id: trainId, descriptions, type };
      
      const response = await axiosInstance.post(url, requestData, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });

      const message = response.data.message;
      
      toast(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        type: "success",
      });
      
      if (response.data.success) {
        setShow(false);
        setTimeout(() => router.refresh(), 1000);
      }
    } catch (error) {
      console.error(error);
      toast("Something went wrong", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        containerId: "toastAddGerbong",
        type: "error",
      });
    }
  };

  return (
    <div>
      <ToastContainer containerId="toastAddGerbong" />
      <button
        type="button"
        className="px-4 py-2 rounded-md bg-green-500 text-white"
        onClick={() => openModal()}
      >
        Tambah Gerbong Kereta 
      </button>
      <Modal isShow={show}>
        <form onSubmit={handleSubmit}>
          <div className="w-full p-3">
            <div className="my-2 border rounded-md p-3">
              <small className="text-sm font-semibold text-sky-600">
                Nama Gerbong
              </small>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-1 outline-none focus:border-b-sky-600 focus:border-b"
              />
            </div>

            <div className="my-2 border rounded-md p-3">
              <small className="text-sm font-semibold text-sky-600">
                Jumlah Kursi
              </small>
              <input
                type="number"
                id={`seatCount`}
                value={seatCount.toString()}
                onChange={(e) => setSeatCount(Number(e.target.value))}
                required={true}
                className="w-full p-1 outline-none focus:border-b-sky-600 focus:border-b"
              />
            </div>
          </div>

          <div className="w-full p-3 rounded-b-lg flex items-center justify-end gap-2">
            <button 
              type="button"
              className="px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-600"
              onClick={closeModal}
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
  );
};

export default AddGerbong;