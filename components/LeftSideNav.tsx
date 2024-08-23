import React from 'react'
import { cn } from '@/lib/utils';
import LeftNavLinks from './LeftNavLinks';
import PinnedPreview from './PinnedPreview';

const LeftSideNav = async ({ user, session }: Auth0Params) => {

    return (
        <div className=' w-1/4 h-screen border-r-[1px] border-r-slate-300'>

            <LeftNavLinks />

            <hr className=' bg-slate-300' />

            <PinnedPreview user={user} session={session} />

        </div>
    )
}

export default LeftSideNav