import { NextRequest, NextResponse } from "next/server";
import { verifyKaryawan } from "./helper/authorization";

export const middleware = async (request: NextRequest) => {   
    if(request.nextUrl.pathname.startsWith(`/employee`)){
        const token = request.cookies.get(`token`)?.value;

        const redirectLogin = request.nextUrl.clone();
        redirectLogin.pathname = "/"

        if(typeof token === undefined){
            return NextResponse.redirect(redirectLogin);
        }

        const isVerifiedToken = await verifyKaryawan(token ?? "")
        if(isVerifiedToken === false){
            return NextResponse.redirect(redirectLogin);
        }
        return NextResponse.next();
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/employee/:path*"]
}