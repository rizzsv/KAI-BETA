export const dynamic = "force-dynamic";
import axiosInstance from "@/helper/api";
import { EmployeeType } from "../types";


import Sidebar from "@/components/sidebar";
import AddCustomer from "./addCustomer";
import CustomerData from "./customer";
import { getServerCookie } from "@/helper/server-cookie";


const getAllCustomer = async (): Promise<EmployeeType[]> => {
  try {
    const token = await getServerCookie("token");
    console.log(token);

    const response: any = await axiosInstance.get("/customer", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (response.data.success == true) {
      return response.data.data;
    }
    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

const customerPage = async () => {
  const dataCustomer = await getAllCustomer();

  return (
    <div className="md:flex">
      <Sidebar />
      <div className="w-full relative container p-5 bg-white h-screen" >
        <h1 className="text-2xl font-bold text-black">Data Pelanggan</h1>
        <span>Halaman ini memuat data karyawan SekopTix</span>
        <div className="my-3">
          <AddCustomer />
          {dataCustomer.map((customer, index) => (
            <CustomerData item={customer} key={`customer-${index}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default customerPage;