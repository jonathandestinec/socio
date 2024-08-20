import React from 'react'

const Feeds = ({ user, session }: Auth0Params) => {
    return (
        <div className=' h-screen overflow-y-scroll w-3/6 feeds'>
            You are in our DB.
            <p>THis is your Info: {user.email}</p>
        </div>
    )
}

export default Feeds