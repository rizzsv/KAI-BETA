"use client";

import Modal from "@/components/Modal";
import axiosInstance from "@/helper/api";
import { getCookie } from "@/helper/client-cookie";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const AddKereta = () => {
  const [name, setName] = useState<string>("");
  const [descriptions, setDescriptions] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [Show, setShow] = useState<boolean>(false);
  const router = useRouter();

  const openModal = () => {
    setShow(true);
    setName("");
    setDescriptions("");
    setType("");
  };

  const closeModal = () => {
    setShow(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    try {
        e.preventDefault()
        const TOKEN = getCookie(`token`)
        const url = `/train`
        const requestData = {
            name,
            descriptions,
            type
        }

        //hit endpoint 
        const response: any = await axiosInstance
        .post(url, requestData, {
            headers: {
                authorization: `Bearer ${TOKEN}`
            }
        })

        const message = response.data.message

        if(response.data.success == true){
            toast(
                `${message}`,
                {
                    containerId: `toastAdd`,
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
                    containerId: `toastAdd`,
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
                containerId: `toastAdd`,
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
        <ToastContainer containerId={`toastAdd`}/>
      <button
        onClick={() => openModal()}
        type="button"
        className="px-4 py-2 rounded-md bg-lime-600 hover:bg-lime-500"
      >
        Tambah Data Kereta
      </button>
      <Modal isShow={Show}>
        <form onSubmit={e => handleSubmit(e)}>
          <div className="w-full p-3 rounded-t-lg">
            <h1 className="font-semibold text-lg">Tambah Data Kereta</h1>
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
                id={`name`}
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
                id={`deskripsi`}
                value={descriptions}
                onChange={(e) => setDescriptions(e.target.value)}
                required={true}
                className="w-full p-1 outline-none focus:border-b-sky-600 focus:border-b"
              />
            </div>

            <div className="my-2 border rounded-md p-3">
              <small className="text-sm font-semibold text-sky-600">
                Type Kereta
              </small>
              <input
                type="text"
                id={`tipe`}
                value={type}
                onChange={(e) => setType(e.target.value)}
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

export default AddKereta;
