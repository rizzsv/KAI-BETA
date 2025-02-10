"use client";


import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { EmployeeType } from "../types";
import { getCookie } from "@/helper/client-cookie";
import axiosInstance from "@/helper/api";
import Modal from "@/components/Modal";

type props = {
  admin: EmployeeType;
};

const EditAdmin = (myprops: props) => {
  const [nik, setNik] = useState<string>("");
  const [name, setName] = useState<string>(myprops.admin.name);
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const router = useRouter();

  const openModal = () => {
    setNik(myprops.admin.nik);
    setName(myprops.admin.name);
    setAddress(myprops.admin.address);
    setPhone(myprops.admin.phone);
    setUsername(myprops.admin.user_details.username);
    setPassword(myprops.admin.user_details.password);
    setShow(true);
  };

  const closeModal = () => setShow(false);

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();

      const cookie = getCookie("token");
      const request = {
        nik,
        name,
        address,
        phone,
        username,
        password,
      };

      const response: any = await axiosInstance.put(
        `/employee/${myprops.admin.id}`,
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
          containerId: `toastEdit-${myprops.admin.id}`,
        });
      }

      toast(message, {
        type: "success",
        containerId: `toastEdit-${myprops.admin.id}`,
      });
      setShow(false);
      setTimeout(() => router.refresh(), 1000);
      
    } catch (error) {
      console.log(error);
      toast(`Something went wrong`, {
        toastId: `toastEdit-${myprops.admin.id}`,
        type: "error",
      });
    }
  };

  return (
    <div>
      <ToastContainer containerId={`toastEdit-${myprops.admin.id}`} />
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
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="w-full p-3 rounded-t-md">
            <h1 className="font-semibold text-lg text-black">
              Edit Karyawan
            </h1>
            <span className="text-sm text-slate-500">
              Pastikan data terisi dengan benar!
            </span>
          </div>

          <div className="w-full grid grid-cols-2 gap-3 p-3">
            <div className="my-2 border rounded-md p-3">
              <small className="text-sm font-semibold text-sky-600">
                Username
              </small>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="p-1 w-full outline-none focus:border-sky-600 focus:border-b text-black"
              />
            </div>
            <div className="my-2 border rounded-md p-3">
              <small className="text-sm font-semibold text-sky-600">
                Password
              </small>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="p-1 w-full outline-none focus:border-sky-600 focus:border-b text-black"
              />
            </div>
            <div className="my-2 border rounded-md p-3">
              <small className="text-sm font-semibold text-sky-600">NIK</small>
              <input
                type="number"
                id="nik"
                value={nik}
                onChange={(e) => setNik(e.target.value)}
                required
                className="p-1 w-full outline-none focus:border-sky-600 focus:border-b text-black"
              />
            </div>
            <div className="my-2 border rounded-md p-3">
              <small className="text-sm font-semibold text-sky-600">
                Nama Karyawan
              </small>
              <input
                type="text"
                id="karyawan"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="p-1 w-full outline-none focus:border-sky-600 focus:border-b text-black"
              />
            </div>
            <div className="my-2 border rounded-md p-3">
              <small className="text-sm font-semibold text-sky-600">
                Alamat
              </small>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="p-1 w-full outline-none focus:border-sky-600 focus:border-b text-black"
              />
            </div>
            <div className="my-2 border rounded-md p-3">
              <small className="text-sm font-semibold text-sky-600">
                No. Telepon
              </small>
              <input
                type="number"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="p-1 w-full outline-none focus:border-sky-600 focus:border-b text-black"
              />
            </div>
          </div>
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

export default EditAdmin;