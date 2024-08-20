import React from 'react'

import { Button } from '@/components/ui/button'
import Image from 'next/image'

const page = () => {
    return (
        <div className=' flex items-center justify-center w-full h-screen'>
            <div className=' w-full h-full flex items-center justify-between'>

                <Image
                    src={"/assets/auth.svg"}
                    width={200}
                    height={300}
                    alt='Field'
                    className=' w-[40%] h-full md:block hidden'
                />

                <div className=' md:w-[60%] w-full h-full flex items-center justify-center auth-card'>
                    <div className=' md:w-max w-min'>
                        <h1 className=' text-2xl font-semibold mb-1 text-gray-600'>Hello,</h1>

                        <p className=' text-5xl font-bold text-center'>
                            Welcome to
                            <span className=' bg-gradient-to-tr from-pink-400 to-indigo-600 bg-clip-text text-transparent'> Socio.</span>
                        </p>

                        <a href="/api/auth/login">
                            <Button className=' flex items-center justify-center gap-2 ml-auto mr-auto mt-8 rounded-full ring-2 ring-gray-950 bg-transparent text-gray-950 font-semibold text-center hover:text-white hover:ring-white pt-5 pb-5 pr-8 pl-8 text-lg'>Signin with
                                <span>
                                    <i className="fi fi-brands-google flex items-center justify-center"></i>
                                </span>
                            </Button>
                        </a>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default page