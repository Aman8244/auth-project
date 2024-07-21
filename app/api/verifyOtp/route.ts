import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    let isMatch = false;
    const data = await req.json();
    const { email, otp } = data;
    try {
        const response = await prisma.user.findFirst({
            where: {
                email: email
            }
        })
        isMatch = (response?.otp === otp);

    } catch (error) {
        return NextResponse.json({
            auth: false
        })
    }
    if (isMatch) {
        await prisma.user.update({
            where: {
                email: email
            },
            data: {
                otp: "null",
                verified: true
            }
        })
    }
    return NextResponse.json({
        auth: isMatch
    })
}