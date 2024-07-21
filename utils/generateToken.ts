const jwt = require("jsonwebtoken")

export default async function generateToken(user:{email:string,id:number}) {
    const secretKey = process.env.Secret_key!;
    return jwt.sign(user,secretKey);
}