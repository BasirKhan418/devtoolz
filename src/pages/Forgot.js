import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import  { AiFillEye }from "react-icons/ai";
import  { AiFillEyeInvisible }from "react-icons/ai";
import { useRouter } from 'next/router';
import Spinner from './components/Spinner';
import { set } from 'mongoose';
const Forgot = () => {
  const [email,setEmail]=useState('');
  const router = useRouter();
  const [password,setPassword]=useState('');
  const [cpassword,setcPassword]=useState('');
  const [loading,setLoading]=useState(false);
  const[otp,setOtp]=useState('');
  const [sendMail,setSendMail]=useState(false);
  const [otpsent,setOtpsent]=useState(false);
  const[showPassword,setShowPassword]=useState(false);
  const[showPassword1,setShowPassword1]=useState(false);
  const handleChanges=(e)=>{
      if(e.target.name=="email"){
          setEmail(e.target.value);
      }
      else if(e.target.name=="password"){
          setPassword(e.target.value);
      }
      else if(e.target.name=="cpassword"){
        setcPassword(e.target.value);
    }
    else if(e.target.name=="otp"){
        setOtp(e.target.value);
    }
  }
  const SendMail=async()=>{
    setLoading(true);
    const data = {email,sendMail:true};
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/forgot`,
      {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const r = await response.json();
      setEmail("");
      if(r.success){
        setLoading(false);
        setSendMail(true);
        setOtpsent(true);
        toast.success("Otp sent successfully", {
            position: "top-right",

        });
      }
      else{
        toast.error("Something went wrong. Please try again after some time", {
            position: "top-right",
        });
        setLoading(false);
      }
  }
  const handleSubmit=async()=>{
    setLoading(true);
    const data = {password,cpassword,sendMail:false,otp};
    if(password!=cpassword){
        toast.error("Password and confirm password should be same", {
            position: "top-right",
        });
    }
    else{
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/forgot`,
        {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const r = await response.json();
      if(r.success){
        toast.success("Password changed successfully", {
            position: "top-right",
        });
        setTimeout(()=>{
            router.push("/login?user=true");
        },2000)
        setLoading(false);
        setPassword('');
        setcPassword('')
      }
      else{
        toast.error(`${r.message}`, {
            position: "top-right",
        });
        setLoading(false);
      }
    }
     
  }
  return (
    <div className='min-h-screen'>
          <style jsx global>{`
        .animate-img {
          background-image: url("/asset/sphere.webp");
          background-size: cover;
          background-repeat: no-repeat;
          z-index: -1;
          transform: translateY(-50%);
          position: absolute;
          left: -30%;
          bottom: auto;
          right: auto;
          top: 58%;
          animation: rotate360 30s linear infinite; /* Adjust duration as needed */
        }
        @keyframes rotate360 {
          0% {
            transform: translateY(-50%) rotate(0deg);
          }
          100% {
            transform: translateY(-50%) rotate(360deg);
          }
        }
      `}</style>

      <div className="">
        <img src="/asset/sphere.webp" className=" animate-img w-100 h-full" />
        </div>
      <Toaster />
      {loading?<Spinner/>: <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6 py-28">
            <div className="flex-1">
                <div className="text-center">
                    <div className="flex justify-center mx-auto">
                        <Image className="" src="/asset/Devtoolzlogo-nobg.png" alt="Logo" height={100} width={100}/>
                    </div>

                    <p className="mt-3 text-gray-500 dark:text-gray-300">Forgot Your Password</p>
                </div>

                <div className="mt-8">
                       {!sendMail&& <div>
                            <label hrmlFor="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email Address</label>
                            <input type="email" name="email" id="email" value={email} onChange={handleChanges} placeholder="example@example.com" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-indigo-400 dark:focus:border-indigo-400 focus:ring-indigo-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                        </div>}
                        {otpsent&& <div>
                            <label hrmlFor="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Otp</label>
                            <input type="number" name="otp" id="email" value={otp} onChange={handleChanges} placeholder="XXXXXX" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-indigo-400 dark:focus:border-indigo-400 focus:ring-indigo-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                        </div>}

                      {sendMail&& <> <div className="mt-6 relative">
                            <div className="flex justify-between mb-2">
                                <label hrmlFor="password" className="text-sm text-gray-600 dark:text-gray-200">Password</label>
                            </div>

                            <input type={showPassword?"text":"password"} name="password" id="password" value={password} onChange={handleChanges} placeholder="Your Password" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-indigo-400 dark:focus:border-indigo-400 focus:ring-indigo-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                            {
                            showPassword?<AiFillEye className="absolute right-2 text-2xl text-gray-400 bottom-2" onClick={()=>{
                                setShowPassword(!showPassword);
                            }}/>:<AiFillEyeInvisible className="absolute right-2 text-2xl text-gray-400 bottom-2" onClick={()=>{
                                setShowPassword(!showPassword);
                            }}/>
                            }
                        </div>
                        <div className="mt-6 relative">
                            <div className="flex justify-between mb-2">
                                <label hrmlFor="password" className="text-sm text-gray-600 dark:text-gray-200">Confirm Password</label>
                            </div>
                            <input type={showPassword1?"text":"password"} name="cpassword" id="password" value={cpassword} onChange={handleChanges} placeholder="Your Confirm Password" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-indigo-400 dark:focus:border-indigo-400 focus:ring-indigo-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                            {
                            showPassword1?<AiFillEye className="absolute right-2 text-2xl text-gray-400 bottom-2" onClick={()=>{
                                setShowPassword1(!showPassword1);
                            }}/>:<AiFillEyeInvisible className="absolute right-2 text-2xl text-gray-400 bottom-2" onClick={()=>{
                                setShowPassword1(!showPassword1);
                            }}/>
                            }
                        </div></>}
                     
                        {!sendMail&&<div className="mt-6">
                            <button onClick={SendMail} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-indigo-500 rounded-lg hover:bg-indigo-400 focus:outline-none focus:bg-indigo-400 focus:ring focus:ring-indigo-300 focus:ring-opacity-50">
                                Request Otp
                            </button>
                        </div>}
                        {sendMail&&<div className="mt-6">
                            <button onClick={handleSubmit} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-indigo-500 rounded-lg hover:bg-indigo-400 focus:outline-none focus:bg-indigo-400 focus:ring focus:ring-indigo-300 focus:ring-opacity-50">
                                Change Password
                            </button>
                        </div>}
               
                </div>
            </div>
        </div>}
    </div>
  )
}

export default Forgot
