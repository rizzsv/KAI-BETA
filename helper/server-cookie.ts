import Cookies from "js-cookie"
import { cookies } from "next/headers"

export const getServerCookie = async (
    key: string
): Promise<any> => {
    return (await cookies()).get(key)?.value || ""
}

export const removeCookie = (key: string): void => {
    Cookies.remove(key)
}

