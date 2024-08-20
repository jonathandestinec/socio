import React from 'react'
import { cn } from '@/lib/utils';
import LeftNavLinks from './LeftNavLinks';

const LeftSideNav = async ({ user, session }: Auth0Params) => {

    return (
        <div className=' w-1/4 h-screen border-r-[1px] border-r-slate-300'>

            <LeftNavLinks />

            <hr className=' bg-slate-300' />

        </div>
    )
}

export default LeftSideNav