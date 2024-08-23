import { getSession } from "@auth0/nextjs-auth0"
import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

const prisma = new PrismaClient().$extends(withAccelerate())

export const addUser = async ({ email, username, fullname, picture }: DbUser) => {
    // Add user logic here
    try {

        const response = await fetch(`/api/db/user?email=${email}&username=${username}&picture=${picture}&fullname=${fullname}`, {
            method: "POST"
        })

        return response.json()

    } catch (error) {
        throw (error)
    }
}

export const checkUserNameAvailibility = async (username: string) => {

    try {

        // Check if username already exists in the database
        const usernameExists = await prisma.user.findUnique({
            where: {
                username: username
            }
        })

        if (usernameExists) {
            return { message: "Username is not available", code: "username_unavailable" }
        }

        else {
            return { message: "Username is available", code: "username_available" }
        }

    } catch (error) {
        console.log(error)
    }
}

export const findUser = async (email: string) => {

    const session = await getSession()

    if (!session?.user) {
        return ({
            message: "Unauthorized",
            code: "access_denied" as const
        })
    }

    try {

        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (user) {
            return ({
                message: "User found",
                code: "user_found" as const,
                user
            })
        }

        else {
            return ({
                message: "User not found",
                code: "user_not_found" as const
            })
        }

    } catch (error) {
        console.log(error)
        return ({
            message: "An error occured",
            code: "error" as const
        })
    }
}


export const getPinnedUsers = async (userId: string) => {
    const session = await getSession()

    if (!session?.user) {
        return ({
            message: "Unauthorized",
            code: "access_denied" as const
        })
    }

    try {

        if (userId) {

            const userFollowings = await prisma.following.findMany({
                where: {
                    userId: userId
                },
            })

            return ({
                message: "Here are the users you are following",
                code: "success" as const,
                userFollowings
            })

        } else {
            return ({
                message: "Missing required parameters",
                code: "missing_params" as const
            })
        }

    } catch (error) {
        return ({
            message: "An error occurred",
            code: "error" as const
        })
    }
}

export const getRecentActivities = async (
    order: "asc" | "desc",
    limit: number,
    userIds: string[],) => {

    const session = await getSession()

    if (!session?.user) {
        return ({
            message: "Unauthorized",
            code: "access_denied" as const
        })
    }

    try {

        const allActivities: RecentActivity[] = []

        if (order && limit && userIds) {

            for (const pinnedUserId of userIds) {
                const usersActivities: RecentActivity[] = await prisma.activity.findMany({
                    where: {
                        userId: pinnedUserId
                    },
                    orderBy: {
                        time: order
                    },
                    take: limit
                })

                allActivities.push(...usersActivities)
            }

            if (allActivities[0] === undefined) {
                return ({
                    message: "There are no activities yet for the provided users",
                    code: "success",
                    allActivities
                })
            } else {
                return ({
                    message: "Here are the activities for this user",
                    code: "success",
                    allActivities
                })
            }

        } else {
            return ({
                message: "Missing required parameters",
                code: "missing_params"
            })
        }

    } catch (error) {
        return ({
            message: "An error occurred",
            code: "error",
            error
        })
    }
}