import axiosInstance from "@/helper/api";
import { KeretaType } from "../types";
import { getServerCookie } from "@/helper/server-cookie";
import Train from "./Train";
import AddKereta from "./addKereta";

const getKereta = async () : Promise<KeretaType[]> => {
  try {
    // get token from cookie
    const TOKEN = await getServerCookie(`token`)
    const url = `/train`
    const response : any = await axiosInstance
    .get(url, {
        headers: {
            authorization: `Bearer ${TOKEN}`
        }
    })

    if(response.data.success == true) {
        return response.data.data
    }
    return []
  } catch (error) {
    console.log(error);
    return []
  }
}

const KeretaPage = async () => {
  const dataKereta = await getKereta() 

  return (
    <div className="w-full p-5 bg-white">
      <h1 className="text-xl">
        Data Kereta
      </h1>
      <span className="text-sm">
        Halaman ini memuat daftar kereta api yang tersedia
      </span>

      <div className="my-3">
        <AddKereta />
        {
          dataKereta.map((kereta, index) => (
            <Train 
            item={kereta}
            key={`kereta-${index}`}
            />
          ))
        }      
      </div>
    </div>
  )
}

export default KeretaPage;



