export default function generateOTP (length:number):string{
   let Otp = "";
    for(let i=0;i<length;i++){
        Otp += Math.floor(Math.random()*10);
    }
   return Otp
}