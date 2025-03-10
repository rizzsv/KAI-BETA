"use client"

import { KursiType } from "@/app/karyawan/types"
import Modal from "@/components/Modal"
import { useState } from "react"

type Props = {
    item: KursiType
}

const Seat = (myProp: Props) => {
    const [show, setShow] = useState<boolean>(false)
    const [passanger_id, setPassangerID] = useState<string>("")
    const [passanger_name, setPassangerName] = useState<string>("")

    return (
        <div>
            <button type="button"
            disabled={myProp.item.used}
             className="size-10 flex items-center justify-center font-semibold rounded-md bg-sky disabled:bg-slate-600 text-white">
                {myProp.item.seat_number}
            </button>

            <Modal isShow={show}>
                <form>
                    
                </form>
            </Modal>
        </div>
    )
}

export default Seat