import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { UserData } from "@/components/AuthForm";
import generateToken from "@/utils/generateToken";
import generateOTP from "@/utils/generateOTP";

const bcryptjs = require("bcryptjs")
const nodemailer = require("nodemailer")


export async function POST(req: NextRequest) {
    const data: UserData = await req.json();
    console.log(data);
    const salt = parseInt(process.env.Salt_Round!);
    const otp = generateOTP(8);
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: data.email, // Replace with your email
            subject: 'Welcome To ECOMMERCE',
            text: `To Confirm Your Email Here is your Otp \n OTP - ${otp}`,
        };
        const hash = await bcryptjs.hash(data.password, salt)
        const createUser = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hash,
                otp: otp
            }
        })
        const token = await generateToken({ email: data.email, id: createUser.id })
        console.log(token)
        await transporter.sendMail(mailOptions);
        return NextResponse.json({
            message: "success",
            token
        })

    } catch (error) {
        console.log("Error Occured :", error)
        return NextResponse.json({
            message: "Failed Internal Error1"
        })
    }


}