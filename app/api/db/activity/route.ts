import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

const prisma = new PrismaClient().$extends(withAccelerate())

export const POST = withApiAuthRequired(
    async (request: NextRequest) => {

        const session = await getSession();

        if (!session || !session.user) {
            return NextResponse.json({ error: 'Unauthorized' });
        }

        const userId = request.nextUrl.searchParams.get("userId")
        const activity = request.nextUrl.searchParams.get("activity")
        const activityType = request.nextUrl.searchParams.get("type")

        try {

            if (userId && activity && activityType) {

                const newActivity = await prisma.activity.create({
                    data: {
                        userId: userId,
                        activity: activity,
                        type: activityType
                    }
                })

                return NextResponse.json({
                    message: "Activity assed successfully",
                    code: "success",
                    newActivity
                })

            } else {
                return NextResponse.json({
                    message: "Missing required parameters",
                    code: "missing_params"
                })
            }

        } catch (error) {
            return NextResponse.json({
                message: "An error occurred",
                code: "error",
                error
            })
        } finally {
            await prisma.$disconnect()
        }

    }
)


export const GET = withApiAuthRequired(
    async (request: NextRequest) => {

        const session = await getSession();

        if (!session || !session.user) {
            return NextResponse.json({ error: 'Unauthorized' });
        }

        const order: ActivityOrderTime = request.nextUrl.searchParams.get("order")
        const limit = request.nextUrl.searchParams.get("limit")
        const userIds = request.nextUrl.searchParams.get("userIds")

        const allActivities: RecentActivity[] = []

        try {

            if (order && limit && userIds) {


                const allPinnedUsers = userIds.split(",")

                for (const pinnedUserId of allPinnedUsers) {
                    const usersActivities: RecentActivity[] = await prisma.activity.findMany({
                        where: {
                            userId: pinnedUserId
                        },
                        orderBy: {
                            time: order,
                        },
                        take: parseInt(limit)
                    })

                    allActivities.push(...usersActivities)
                }

                if (allActivities[0] === undefined) {
                    return NextResponse.json({
                        message: "There are no activities yet for the provided users",
                        code: "success",
                        allActivities
                    })
                } else {
                    return NextResponse.json({
                        message: "Here are the activities for this user",
                        code: "success",
                        allActivities
                    })
                }

            } else {
                return NextResponse.json({
                    message: "Missing required parameters",
                    code: "missing_params"
                })
            }

        } catch (error) {
            return NextResponse.json({
                message: "An error occurred",
                code: "error",
                error
            })
        } finally {
            await prisma.$disconnect()
        }

    }
)