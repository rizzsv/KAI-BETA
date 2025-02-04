"use client"

import { FormEvent, useState } from "react";
import { GerbongType } from "../../types";
import { useRouter } from "next/navigation";
import { getCookie } from "@/helper/client-cookie";
import axiosInstance from "@/helper/api";
import { toast, ToastContainer } from "react-toastify";
import Modal from "@/components/Modal";

type props = {
    item: GerbongType
}


const EditGerbong = (myProp: props) => {
  const [name, setName] = useState<string>("")
  const [seat_count, setSeatCount] = useState<number>(0)
  const [Show, setShow] = useState<boolean>(false)
  const router = useRouter();

  const openModal = () => {
    setShow(true);
    setName(myProp.item.name);
    setSeatCount(myProp.item.seat_count)
  };

  const closeModal = () => {
    setShow(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault()
      const TOKEN = getCookie(`token`)
      const url = `/train/wagon/${myProp.item.id}`
      const requestData = {
          name,
          seat_count
      }

      const response: any = await axiosInstance
      .put(url, requestData, {
          headers: {
              authorization: `Bearer ${TOKEN}`
          }
      })

      const message = response.data.message

      if(response.data.success == true){
          toast(
              `${message}`,
              {
                  containerId: `toastEdit-${myProp.item.id}`,
                  type: "success",
                  theme: "colored",
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
              }
              )
              setShow(false)
              // reload page 
              setTimeout(() => router.refresh(), 1000)
      } else {
          toast(
              `${message}`,
              {
                  containerId: `toastEdit-${myProp.item.id}`,
                  type: "error",
                  theme: "colored",
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
              }
          )
      }
    } catch (error) {
      console.log(error);
      toast(
          `Something wrong`,
          {
              containerId: `toastEdit-${myProp.item.id}`,
              type: "error",
              theme: "colored",
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
          }
      )
    }
  }
  return (
    <div>
    <ToastContainer containerId={`toastEdit-${myProp.item.id}`}/>
  <button
    onClick={() => openModal()}
    type="button"
    className="px-2 py-1 rounded-md bg-sky-600 hover:bg-sky-500"
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
<path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>

  </button>
  <Modal isShow={Show}>
    <form onSubmit={e => handleSubmit(e)}>
      <div className="w-full p-3 rounded-t-lg">
        <h1 className="font-semibold text-lg">Edit Data Kereta</h1>
        <span className="text-sm text-slate-500">
          Pastikan data yang diisi suda benar
        </span>
      </div>
      <div className="w-full p-3">
        <div className="my-2 border rounded-md p-3">
          <small className="text-sm font-semibold text-sky-600">
            Nama Kereta
          </small>
          <input
            type="text"
            id={`name-${myProp.item.id}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required={true}
            className="w-full p-1 outline-none focus:border-b-sky-600 focus:border-b"
          />
        </div>

        <div className="my-2 border rounded-md p-3">
          <small className="text-sm font-semibold text-sky-600">
            deskripsi Kereta
          </small>
          <input
            type="text"
            id={`deskripsi-${myProp.item.id}`}
            value={seat_count}
            onChange={(e) => setSeatCount(Number(e.target.value))}
            required={true}
            className="w-full p-1 outline-none focus:border-b-sky-600 focus:border-b"
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
  );
};

export default EditGerbong;

