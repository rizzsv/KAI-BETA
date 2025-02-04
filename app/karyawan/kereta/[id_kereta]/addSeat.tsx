"use client";

import Modal from "@/components/Modal";
import axiosInstance from "@/helper/api";
import { getCookie } from "@/helper/client-cookie";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

interface props  {
  id_seats: number
  wagonId : number
};

const AddSeat = (myProps: props) => {
  const [seat_number, setSeatNumber] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const router = useRouter();

  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const cookie = getCookie('token')
      const response: any = await axiosInstance.post(`/train/wagon/seat`, {
        seat_number: seat_number,
        wagon_id: myProps.wagonId
      }, {
        headers: {
          authorization: `Bearer ${cookie}`,
        },
      })

      if (response.data.success === false) {
        toast(response.data.message, {
          containerId: `toastAddSeat-${myProps.id_seats}`,
          type: "warning",
        })
        setSeatNumber("")
        setShow(false)
      } else {
        toast("Kursi berhasil ditambahkan", {
          containerId: `toastAddSeat-${myProps.id_seats}`,
          type: "success",
        })
        setShow(false)
      }
    } catch (error) {
      console.log(error);
      toast('something went wrong', {
        containerId: `toastAddSeat-${myProps.id_seats}`,
        type: "error",
      })
    }
  }

return (
  <>
    <ToastContainer containerId={`toastAddSeat-${myProps.id_seats}`}/>
    <button className='size-20 rounded-sm flex items-center justify-center bg-green-700 text-white font-bold text-2xl cursor-pointer'
    onClick={() => setShow(true)}
    >
        &#43;
    </button>
    <Modal isShow={show}>
    <form onSubmit={(e) => handleSubmit(e)}>
          <div className="w-full p-3 rounded-t-md">
              <h1 className="font-semibold text-lg text-black">Tambah Kursi Kereta</h1>
              <span className="text-sm text-slate-500">
                Pastikan data terisi dengan benar
              </span>
            </div>

            <div className="w-full p-3">
              <div className="my-2 border rounded-md p-3">
                <small className="text-sm font-semibold text-sky-600">
                  Seat Number
                </small>
                <input type="text" id="name" 
                value={seat_number} 
                onChange={(e) => setSeatNumber(e.target.value)}
                required 
                className="p-1 w-full outline-none focus:border-sky-600 focus:border-b text-black" 
                />
              </div>
            </div>

            <div className="w-full p-3 rounded-b-lg flex items-center justify-end gap-2">
             <button type="button" onClick={() => closeModal()}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-md"
              >Close</button>
             <button type="submit"
              className="px-4 py-2 bg-sky-700 hover:bg-sky-600 text-white rounded-md"
              >Submit</button>
            </div>
            </form>
    </Modal>
    </>
)
}

export default AddSeat;