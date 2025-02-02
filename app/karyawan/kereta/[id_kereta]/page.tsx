import { getServerCookie } from "@/helper/server-cookie";
import { KeretaType } from "../../types";
import axiosInstance from "@/helper/api";
import Gerbong from "./Gerbong";
import AddGerbong from "./addGerbong";

const getDetailKereta = async (
  id_kereta: string
): Promise<KeretaType | null> => {
  try {
    const TOKEN = await getServerCookie(`token`);
    const url = `/train/${id_kereta}`;

    const respone = await axiosInstance.get(url, {
      headers: {
        authorization: `Bearer ${TOKEN}`,
      },
    });
    
    if (respone.data.success === true) {
      return respone.data.data;
    }
    return null;
  } catch (error) {
    console.log('Error fetching kereta:', error);
    return null;
  }
};

type props = {
  params: {
    id_kereta: string;
  };
};
const DetailKeretaPage = async (myProp: props) => {
  const id_kereta = myProp.params.id_kereta;
  const datakereta = await getDetailKereta(id_kereta);

  return (
    <div className="w-full p-3">
      {
        datakereta === null ?
        <div className="bg-yellow-100 rounded-md p-3">
          <h1 className="text-lg font-semibold">Informasi</h1>
          <p className="text-sm text-slate-500">Data kereta tidak ditemukan</p>
        </div>
        :
        <div>
          <h1 className="text-lg font-semibold">{datakereta.name}</h1>
          <p className="text-sm">{datakereta.descriptions}</p>

          <h2 className="text-base font-medium">
            Daftar Gerbong
          </h2>

          <AddGerbong />
          
          <div className="my-5">
          {
            datakereta.wagons.map((gerbong, index) => (
              <Gerbong item={gerbong} key={`keyGerbong-${index}`}
              />
            ))
          }
          </div>
        </div>
      }
    </div>
  );
};
export default DetailKeretaPage;
