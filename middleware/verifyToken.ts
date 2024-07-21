import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
const jwt = require("jsonwebtoken")
export default async function VerifyToken(handler: NextApiHandler) {
    return async (req: NextApiRequest,res:NextApiResponse) => {
        const token = req.headers.authorization?.split(' ')[1];
        const secretKey = process.env.Secret_Key!
        if (!token) {
            return NextResponse.json({
                message: 'Authorization token missing',
                auth: false
            });
        }

        try {
            const decoded = jwt.verify(token, secretKey);
            req.body.user = decoded; 
            return handler(req,res);
        } catch (error) {
            return  NextResponse.json({
                message: 'Authorization token missing',
                auth: false
            });
        }
    };
}