"use client"

import Link from "next/link"
import { EmployeeType } from "../types"
import EditAdmin from "./editEmployee"
import DeleteAdmin from "./deleteEmployee"
import ForgotPasswordEmployee from "./forgotPassword"


interface props {
    item: EmployeeType
}

const EmployeeData = (
    { item }: props
) => {
    return (
        <div className="w-full flex flex-wrap my-2 shadow-md bg-slate-50 text-black rounded-lg">
            <div className="w-full flex flex-col  md:w-4/12 p-2">
                <small className="text-sm text-blue-700 font-medium">
                    Nama Karyawan
                </small>
                <span >
                    <Link href={`/employee${item.id}`}>
                    {item.name}
                    </Link>
                </span>
            </div>
            <div className="w-full flex flex-col  md:w-4/12 p-2">
                <small className="text-sm text-blue-700 font-medium">
                    Username
                </small>
                <span>{item.user_details?.username || "Nama pengguna tidak tersedia"}</span>
            </div>
            <div className="w-full flex flex-col  md:w-2/12 p-2">
                <small className="text-sm text-blue-700 font-medium">
                    Role
                </small>
                <span >{item.user_details?.role}</span>
            </div>
            <div className="w-full flex flex-col  md:w-2/12 p-2">
                <small className="text-sm text-blue-700 font-medium">
                    Action
                </small>
                <div className="flex gap-2 items-center">
                    <EditAdmin admin={item}/>
                    <DeleteAdmin adminId={item.id}/>
                    <ForgotPasswordEmployee admin={item}/>  
                </div>
            </div>
        </div>
    )
}

export default EmployeeData