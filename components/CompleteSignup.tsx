"use client"

import React from 'react'
import CompleteSignupDialog from './CompleteSIgnupDialog'
import ProfileAndEmail from './ProfileAndEmail'

import { Ubuntu_Mono } from 'next/font/google';

const ubuntu_mono = Ubuntu_Mono({ subsets: ["latin-ext"], weight:["400", "700"] });


const CompleteSignup = ({ email, picture, fullname, }: CompleteSignupParams) => {
    return (
        <div className=' w-full h-screen flex items-center justify-center'>

            <div>
                <div className={`${ubuntu_mono.className}`}>
                    <h1 className=' text-5xl text-center font-extrabold mb-5'>Heyy, </h1>

                    <ProfileAndEmail email={email} picture={picture} fullname={fullname} />

                    <p className=' text-center mt-5 bg-gradient-to-tr from-pink-400 to-indigo-600 bg-clip-text text-transparent'>You need to complete your Signup process, and that's all!</p>
                </div>

                {/* Button Trigger */}
                <CompleteSignupDialog email={email} picture={picture} fullname={fullname} />
            </div>
            
        </div>
    )
}

export default CompleteSignup