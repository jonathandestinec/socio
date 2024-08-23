import React from 'react'
import PinnedUserComponent from './PinnedUserComponent'
import { findUser, getPinnedUsers, getRecentActivities } from '@/lib/db.actions'

const PinnedPreview = async ({ user, session }: Auth0Params) => {

    const currentUser: DbUserSpecificUserType = await findUser(user.email)

    if (currentUser && currentUser.user && currentUser.user.id) {

        const myPinnedUsers: GetPinnedUsers = await getPinnedUsers(currentUser.user.id)

        // Check if you have pinned users:

        if (myPinnedUsers.userFollowings && myPinnedUsers.userFollowings.length > 0) {

            // Get the userId from each of the pinnedUsers array
            const myPinnedUsersId = myPinnedUsers.userFollowings.map((pinnedUser: PinnedUserType) => pinnedUser.followingId)

            // Get the fullname and picture from each pinned user
            myPinnedUsersId.map(async (pinnedUser: string) => {

                console.log(pinnedUser)

                const pinned: DbUserSpecificUserType = await findUser(pinnedUser)

                console.log(pinned)

                // If user exists, get their recent activities
                if (pinned.user && pinned.user && pinned.user.id) {
                    console.log({
                        pinned: pinned
                    })

                    const pinnedUsersActivities = await getRecentActivities("desc", 1, myPinnedUsersId)

                    if (pinnedUsersActivities && pinnedUsersActivities.allActivities && pinnedUsersActivities.allActivities?.length > 0) {

                        return (
                            <div className=' w-4/5 ml-auto mr-auto h-40 p-5 box-border ring-1 ring-gray-300 mt-5 rounded-2xl relative' key={pinned.user.id}>

                                <i className="fi fi-sr-thumbtack absolute top-0 right-0 mt-3 mr-3"></i>

                                {
                                    pinnedUsersActivities.allActivities.slice(0, 2).map((user, i) => {

                                        // Fetch latest notification from user
                                        const latestNotification = {
                                            message: "Just added a new post. Click to view now",
                                        }

                                        return (
                                            <a href="/notifications" key={user.id}>
                                                {
                                                    pinned.user && (
                                                        <PinnedUserComponent latestNotification={latestNotification.message} userId={currentUser.user?.id} fullname={pinned.user?.fullname} picture={pinned.user?.picture} />
                                                    )
                                                }
                                            </a>
                                        )
                                    })
                                }

                            </div>
                        )
                    }
                }
            })

        } else {
            return (
                <div>
                    <p>No pinned users found.</p>
                </div>
            )
        }
    }
    else {
        return (
            <div>
                <p>Cannot find your account</p>
            </div>
        )
    }
}

export default PinnedPreview