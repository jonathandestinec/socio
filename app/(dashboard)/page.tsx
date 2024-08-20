import React from 'react'
import { getSession } from '@auth0/nextjs-auth0'
import { redirect } from 'next/navigation'
import { Ubuntu_Mono } from 'next/font/google';

const ubuntu_mono = Ubuntu_Mono({ subsets: ["latin-ext"], weight: ["400", "700"] });

import CompleteSignup from '@/components/CompleteSignup'
import { findUser } from '@/lib/db.actions'
import Feeds from '@/components/Feeds'

const page = async () => {

    const session = await getSession()
    let user = session?.user && session.user as Auth0User;

    if (!session?.user || !session || !user) {
        redirect("/auth")
    }

    else {

        const response: UserExistsResponse = await findUser(user.email)

        const error = true

        console.log(response)

        // Now check if the use is in our DB, meaning that have provided us with the other necessary information

        if (response.code === "user_found") {

            // Good. We have this user. Display their info
            return (
                <div>

                    <Feeds user={user} session={session} />

                </div>
            )
        } else if (response.code === "error") {
            return (
                <div className={`${ubuntu_mono.className} flex items-center justify-center`}>
                    <div>
                        <h1 className=' font-bold text-center text-4xl'>Oops, an error occurred.</h1>
                        <p className=' font-semibold text-center text-lg'>Try refreshing your browser to fix this</p>
                        <p className=' text-center mt-8'>{`{${response.message}}`}</p>
                    </div>
                </div>
            )
        }
        else {

            // Now, we don't have this user in our DB. Prompt Extra Info Form
            return (
                <div>
                    <CompleteSignup email={user.email} picture={user.picture} fullname={user.name} />
                </div>
            )
        }
    }

}

export default page