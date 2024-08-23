import { getSession } from "@auth0/nextjs-auth0"
import { getPinnedUsers, getRecentActivities } from "./db.actions"

const base_url = process.env.BASE_URL

export const addPost = async ({ userId, content }: AddPostPArams) => {

    try {

        // Create the POST
        const newPost = await fetch(`${base_url}/api/db/post/?userId=${userId}&content=${content}`, {
            method: "POST",
        })

        // Add this to the user's activity list for notifications for those who are following them
        const newActivity = await fetch(`${base_url}/api/db/activity/?userId=${userId}&activity=Has added a new post&type=New Post Upload`, {
            method: "POST"
        })

        console.log(newActivity.json())

        return newPost.json()

    } catch (error) {
        console.log(error)
    }
}

export const getTargetPinnedUserActivities = async (userId: string) => {

    const session = await getSession()

    if (!session?.user) {
        return ({
            message: "Unauthorized",
            code: "access_denied" as const
        })
    }

    try {

        // Get all pinned users
        const allPinnedUsers = await getPinnedUsers(userId)

        if (allPinnedUsers.userFollowings) {
            // Get all the ids of the people you're following
            const allPinnedUsersId = allPinnedUsers.userFollowings.map(user => user.followingId)

            // Get recent activities for each of the pinned users
            const allRecentActivities = await getRecentActivities("asc", 1, allPinnedUsersId)

            return allRecentActivities
        }

        else {
            return
        }

    } catch (error) {
        console.log(error)
    }
}