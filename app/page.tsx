"use client"

import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axiosInstance from "../helper/api";
import { storeCookie } from "@/helper/client-cookie";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [username, SetUsername] = useState<string>("")
  const [password, SetPassword] = useState<string>("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault()
      const url = `/auth`
      const requestData = {
        username,
        password
      }

      const response: any = await axiosInstance.post(url, requestData)

      if(response.data.success === false) {
        toast(response.data.message,
          {
            containerId: "toastLogin",
            type: "error",
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        )
      } else {
        const token = response.data.token
        const role = response.data.role

        storeCookie("token", token)

        toast(response.data.message,
          {
            containerId: "toastLogin",
            type: "success",
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        )

        if (role === "ADMIN"){
          setTimeout(() => router.replace("/karyawan/kereta"), 1000)
        }
      }
    } catch (error) {
      console.log(error);
      
      toast("Something Wrong", 
        {
          containerId: "toastLogin",
          type: "error",
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      )
    }
  }

  return (
    <div className="w-dvw h-dvh flex justify-center items-center">
      <ToastContainer containerId={`toastLogin`}/>
      <form onSubmit={e => handleSubmit(e)}
      
      className="w-5/6 md:w-1/2 border rounded-lg">

      {/* header login */}
      <div className="w-full bg-blue-600 text-white p-3">
        <h1 className="text-xl font-semibold">
          Login
        </h1>
      </div>

      {/* Login Body */}
      <div className="w-full p-5">
        <div className="mb-3">
          <span className="text-sm text-blue-600">Username</span>
          <input type="text" id={`username`}
          value={username}
          onChange={e => SetUsername(e.target.value)}
          required={true}
          className="w-full border rounded-md"
          />
        </div>

        <div className="mb-3">
          <span className="text-sm text-blue-600">Password</span>
          <input type="password" id={`password`}
          value={password}
          onChange={e => SetPassword(e.target.value)}
          required={true}
          className="w-full border rounded-md"
          />
        </div>

        <button type="submit" className="bg-green-600 hover:bg-green-500 text-white w-full rounded-md px-4 py-2">
          Login
        </button>

      </div>
      </form>
    </div>
  )
}

export default LoginPage;