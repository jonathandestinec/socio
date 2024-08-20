import React from 'react'

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

function Profile({ email, picture, fullname }: ProfleAndEmailParams) {
    return (
        <Avatar>
            <AvatarImage src={picture} alt="Profile" />
            <AvatarFallback>{fullname.slice(0, 1)}</AvatarFallback>
        </Avatar>
    )
}


const ProfileAndEmail = ({ email, picture, fullname }: ProfleAndEmailParams) => {
    return (
        <div className=' flex items-center justify-center gap-5'>
            <Profile email={email} picture={picture} fullname={fullname} />
            <h2 className=' font-bold text-lg'>{fullname}</h2>
        </div>
    )
}

export default ProfileAndEmail