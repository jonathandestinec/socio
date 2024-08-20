"use client"

import React from 'react'
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const LeftNavLinks = () => {

    const currentPath = usePathname()

    return (
        <div>
            <a href="/">
                <button className={cn(`w-3/4 flex items-center justify-center gap-5 text-center mb-3 ml-auto mr-auto pt-3 pb-3 rounded-xl font-semibold text-[15px] mt-5`, {
                    "bg-indigo-500 text-white": currentPath === "/"
                })}>
                    Feeds
                    <span>
                        <i className={cn(`fi fi-sr-house-window flex items-center justify-center`, {
                            "text-black": currentPath != "/"
                        })}></i>
                    </span>
                </button>
            </a>
            <a href="/messages">
                <button className={cn(`w-3/4 flex items-center justify-center gap-5 text-center mb-3 ml-auto mr-auto pt-3 pb-3 rounded-xl font-semibold text-[15px]`, {
                    "bg-indigo-500 text-white": currentPath === "/messages"
                })}>
                    Messages
                    <span>
                        <i className={cn(`fi fi-sr-messages flex items-center justify-center`, {
                            "text-gray-700": currentPath != "/messages"
                        })}></i>
                    </span>
                </button>
            </a>
            <a href="/bookmarks">
                <button className={cn(`w-3/4 flex items-center justify-center gap-5 text-center mb-3 ml-auto mr-auto pt-3 pb-3 rounded-xl font-semibold text-[15px]`, {
                    "bg-indigo-500 text-white": currentPath === "/bookmarks"
                })}>
                    Bookmarks
                    <span>
                        <i className={cn(`fi fi-sr-bookmark flex items-center justify-center`, {
                            "text-gray-700": currentPath != "/bookmarks"
                        })}></i>
                    </span>
                </button>
            </a>
        </div>
    )
}

export default LeftNavLinks