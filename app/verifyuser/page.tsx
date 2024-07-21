"use client";
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState, Suspense } from 'react';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from 'react-query';

// TypeScript type for warning messages
interface Warning {
    message: string;
}

const VerifyUserContent = () => {
    const params = useSearchParams();
    const email = params.get("email");
    const length = email?.length;
    const [otpVal, setOtpVal] = useState("");
    const router = useRouter();
    const [warning, setWarning] = useState<Warning | null>(null);

    useEffect(() => {
        // Side effects if any can be handled here
    }, []);

    const ValidateOTP = async () => {
        if (!email) {
            setWarning({ message: "Email is not available." });
            return;
        }

        try {
            const response = await axios.post("/api/verifyOtp", {
                email: email,
                otp: otpVal
            });

            if (response.data.auth) {
                router.push("/category?page=1");
            } else {
                setWarning({ message: "Wrong OTP, please try again." });
            }
        } catch (error) {
            console.error("OTP validation failed:", error);
            setWarning({ message: "An error occurred while verifying OTP." });
        }
    };

    if (length === undefined) {
        return (
            <Suspense fallback={<div>Loading...</div>}>
                <main>
                    <header>
                        <Navbar />
                    </header>
                    <section>
                        <div>Access restricted !!</div>
                        <div>
                            <Button onClick={() => router.push("/")}>Go To Home</Button>
                        </div>
                    </section>
                </main>
            </Suspense>
        );
    }

    return (
        <>
            <main>
                <header>
                    <Navbar />
                </header>
                <section>
                    <div>
                        <div className='flex justify-center items-center'>
                            <Card className='md:w-2/6 mt-8 border border-gray-400'>
                                <CardHeader className='text-center'>
                                    <CardTitle>
                                        <h1 className='mb-4 text-2xl font-semibold'>
                                            Verify your email
                                        </h1>
                                    </CardTitle>
                                    <CardDescription className='text-black'>
                                        <p>Enter the 8-digit code you received on</p>
                                        <p>
                                            {email?.slice(0, 3)}{"*****"}
                                            {email?.slice(length! - 10)}
                                        </p>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className='flex flex-col justify-center items-center'>
                                        <p className='capitalize my-2'>code</p>
                                        <div>
                                            <InputOTP value={otpVal}
                                                onChange={(value) => {
                                                    setOtpVal(value);
                                                    setWarning(null); // Clear warning on change
                                                }} maxLength={8}>
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={0} />
                                                    <InputOTPSlot index={1} />
                                                    <InputOTPSlot index={2} />
                                                    <InputOTPSlot index={3} />
                                                </InputOTPGroup>
                                                <InputOTPSeparator />
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={4} />
                                                    <InputOTPSlot index={5} />
                                                    <InputOTPSlot index={6} />
                                                    <InputOTPSlot index={7} />
                                                </InputOTPGroup>
                                            </InputOTP>
                                        </div>
                                    </div>
                                    <div>
                                        <p className='text-red-700 font-semibold text-center'>
                                            {warning?.message}
                                        </p>
                                    </div>
                                    <div>
                                        <Button onClick={ValidateOTP} className='w-full my-6'>Verify</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};

const queryClient = new QueryClient();

const VerifyUser  = () => (
  <QueryClientProvider client={queryClient}>
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyUserContent />
    </Suspense>
  </QueryClientProvider>
);


export default VerifyUser;
