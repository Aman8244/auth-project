"use client"
import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from './ui/button'
import axios from 'axios'
import { toast } from './ui/use-toast'
import { useRouter } from 'next/navigation'

export type UserData = {
    email: string;
    name: string;
    password: string;
    otp: string
}

const AuthForm = () => {
    const [userExists, setUserExists] = useState(0);
    const [passwordType, setPasswordType] = useState("password");
    const [warning, setWarning] = useState<string>();
    const [clicked, setClicked] = useState(false);

    const [formData, setFormdata] = useState<UserData>({
        email: "",
        name: "",
        password: "",
        otp: ""
    });
    const router = useRouter();
    useEffect(() => {

    })
    const RegisterUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setClicked(true)
        if (formData.password.length < 8)
            setWarning("Minimum password length should be 8 characters ")
        else {
            await axios.get(`/api/checkuser?email=${formData.email}`).then(async (res) => {
                if (res.data.userExists) {
                    setWarning("Email is already been taken please log in !");
                }
                else {
                    const res = await axios.post("/api/signup", {
                        email: formData.email,
                        password: formData.password,
                        name: formData.name,
                        otp: formData.otp
                    })
                    if (res.data.message === "success") {
                        localStorage.setItem("token", res.data.token)
                        toast({
                            title: "User registered Successfully"
                        })
                        router.push(`/verifyuser?email=${formData.email}`)
                    }

                    else {
                        toast({
                            title: "User not registered"
                        })
                        setClicked(false)
                    }
                    setFormdata({
                        email: "",
                        name: "",
                        password: "",
                        otp: ""
                    })
                }
            })
        }



    }


    const ValidateUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setClicked(true)
        if (formData.password.length < 8) {
            setWarning("Password length should be minimum 8")
        }
        else {
            await axios.get(`/api/checkuser?email=${formData.email}`).then(async (response) => {
                if (response.data.userExists) {
                    const res = await axios.post("/api/signin", {
                        email: formData.email,
                        password: formData.password
                    })

                    console.log(res.data)
                    if (res.data.auth) {
                        localStorage.setItem("token", res.data.token)
                        toast({
                            title: "User successfully logged In "
                        })
                        router.push("/category?page=1")
                    }
                    else {
                        toast({
                            title: "User credentials are wrong please enter again "
                        })
                        setClicked(false)
                    }

                }
                else {
                    setWarning("User Don't Exists ")
                    setClicked(false)
                }
            })
        }
    }


    if (userExists === 0)
        return (
            <div className='flex justify-center items-center py-auto '>
                <Card className='min-w-[40%] my-[2rem]'>
                    <CardHeader>
                        <CardTitle>
                            <p className='text-center text-2xl'>
                                Create your account
                            </p>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={RegisterUser}>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        setFormdata((prevdata) => {
                                            return {
                                                ...prevdata,
                                                name: e.target.value
                                            }
                                        })
                                        setWarning("");
                                    }} value={`${formData.name}`} required placeholder="Enter" />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name">Email</Label>
                                    <Input id="email" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        setFormdata((prevdata) => {
                                            return {
                                                ...prevdata,
                                                email: e.target.value
                                            }
                                        })
                                        setWarning("");
                                    }} value={`${formData.email}`} required placeholder="Enter" />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name">Password</Label>
                                    <div className='flex flex-row'>
                                        <Input id="password" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            setFormdata((prevdata) => {
                                                return {
                                                    ...prevdata,
                                                    password: e.target.value
                                                }
                                            })
                                            setWarning("");
                                        }} value={`${formData.password}`} type={passwordType} required placeholder="Enter" />
                                        <button onClick={(e) => {
                                            e.preventDefault();
                                            setPasswordType((prevtype) => {
                                                if (prevtype === "password") return "text"
                                                return "password"
                                            })
                                        }} className='font-bold '>
                                            {passwordType === "password" ? "show" : "hide"}
                                        </button>
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <p className='text-red-700 font-semibold'>
                                        {warning}
                                    </p>
                                </div>
                                <div>
                                    <Button type='submit' disabled={clicked} className='uppercase w-full'>
                                        create account
                                    </Button>
                                </div>
                            </div>
                        </form>
                        <div className='my-[2rem] flex justify-center items-center'>
                            <p>
                                Have an account ? <button onClick={() => {
                                    setUserExists(prevVal => {
                                        if (prevVal === 0) return 1;
                                        return 0;
                                    })
                                    setFormdata({
                                        email: "",
                                        name: "",
                                        password: "",
                                        otp: ""
                                    })
                                }} className='font-extrabold'>
                                    Login
                                </button>
                            </p>
                        </div>
                    </CardContent>
                    <CardFooter>

                    </CardFooter>
                </Card>

            </div>
        )

    return (
        <div className='flex justify-center items-center py-auto '>
            <Card className='min-w-[40%] my-[2rem]'>
                <CardHeader>
                    <CardTitle>
                        <p className='text-center text-2xl'>
                            Login
                        </p>
                    </CardTitle>
                    <CardDescription>
                        <p className='text-center font-semibold text-lg text-black'>
                            Welcome back to ECOMMERCE
                        </p>
                        <p className='text-center'>
                            The next gen business marketplace
                        </p>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={ValidateUser}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Email</Label>
                                <Input id="email" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setFormdata((prevdata) => {
                                        return {
                                            ...prevdata,
                                            email: e.target.value
                                        }
                                    })
                                }} value={`${formData.email}`} type='email' required placeholder="Enter" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Password</Label>
                                <div className='flex flex-row'>
                                    <Input id="password" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        setFormdata((prevdata) => {
                                            return {
                                                ...prevdata,
                                                password: e.target.value
                                            }
                                        })
                                        setWarning("")
                                    }} value={`${formData.password}`} type={passwordType} required placeholder="Enter" />
                                    <button onClick={(e) => {
                                        e.preventDefault();
                                        setPasswordType((prevtype) => {
                                            if (prevtype === "password") return "text"
                                            return "password"
                                        })
                                        setWarning("")
                                    }} className='font-bold '>
                                        {passwordType === "password" ? "show" : "hide"}
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <p className='text-red-700 font-semibold'>
                                    {warning}
                                </p>
                            </div>
                            <div>
                                <Button disabled={clicked}  type='submit' className='uppercase w-full'>
                                    login
                                </Button>
                            </div>
                        </div>
                    </form>
                    <div className='my-[2rem] flex justify-center items-center'>
                        <p>
                            Don't have an account ? <button onClick={() => {
                                setUserExists(prevVal => {
                                    if (prevVal === 0) return 1;
                                    return 0;
                                })
                                setFormdata({
                                    email: "",
                                    name: "",
                                    password: "",
                                    otp: ""
                                })
                            }} className='font-extrabold'>
                                SIGN UP
                            </button>
                        </p>
                    </div>
                </CardContent>
                <CardFooter>

                </CardFooter>
            </Card>

        </div>
    )
}

export default AuthForm