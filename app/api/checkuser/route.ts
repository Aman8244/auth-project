import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const query =  req.nextUrl;
    const email = query.searchParams.get("email");
    console.log("check user response *********\n",email,"\n*********\n")

    const checkuser = await prisma.user.findFirst({
        where: {
            email: email!
        }
    })
    const response = await checkuser?.email
    if(response){
        return NextResponse.json({
            userExists: true,
        })
    }
    return NextResponse.json({
        userExists: false
    })
}