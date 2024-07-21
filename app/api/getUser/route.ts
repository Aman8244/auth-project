import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
const jwt = require("jsonwebtoken")

export async function GET(req: NextRequest) {
    const token = req.headers.get("Authorization")!.split(' ')[1];

    console.log(token)
    if (!token) {
        return NextResponse.json({
            message:"UnAuthorised"
        })
    }


    try {
        const secret = process.env.Secret_Key;
        const decoded = await jwt.verify(token, secret);
        const user = await prisma.user.findFirst({
            where:{
                id:decoded.id,
                email:decoded.email
            },
            include:{
                categories:true
            }
        })        
        return NextResponse.json({
            user
        })
    } catch (error) {
        console.error('JWT verification failed:', error);
        throw new Error('Unauthorized');
    }

    
}