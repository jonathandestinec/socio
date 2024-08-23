"use client"

import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Ubuntu_Mono } from 'next/font/google';

const ubuntu_mono = Ubuntu_Mono({ subsets: ["latin-ext"], weight: ["400", "700"] });

const PinnedUsersComponent = ({ userId, latestNotification, picture, fullname }: PinnedUsersParams) => {
    return (
        <div className=' p-2 box-border mb-3 hover:bg-slate-100 transition-all ease-in rounded-full'>

            <div className='flex items-center justify-center w-full'>
                <div className=' w-full flex items-center gap-5 max-w-full'>
                    <Avatar>
                        <AvatarImage src={picture} alt="profile" />
                        <AvatarFallback>{fullname.slice(0, 1)}</AvatarFallback>
                    </Avatar>

                    <div className=' w-full'>
                        <p className={`${ubuntu_mono.className} text-sm font-semibold`}>{fullname}</p>

                        <p className={`font-normal text-sm truncate ... w-2/3`}>{latestNotification}</p>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default PinnedUsersComponent