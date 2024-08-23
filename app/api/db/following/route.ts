import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

const prisma = new PrismaClient().$extends(withAccelerate())

export const POST = withApiAuthRequired(
    async (request: NextRequest) => {

        // Adding Route Security
        const session = await getSession();

        if (!session || !session.user) {
            return NextResponse.json({ error: 'Unauthorized' });
        }

        const userId = request.nextUrl.searchParams.get("userId")
        const toFollowId = request.nextUrl.searchParams.get("toFollowId")

        try {

            if (userId && toFollowId) {

                const newFollow = await prisma.following.create({
                    data: {
                        followingId: toFollowId,
                        userId: userId
                    }
                })

                return NextResponse.json({
                    message: "Followed this user successfully",
                    code: "success",
                    newFollow
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

        const userId = request.nextUrl.searchParams.get("userId")

        try {

            if (userId) {


                const userFollowings = await prisma.following.findMany({
                    where: {
                        userId: userId
                    }
                })

                return NextResponse.json({
                    message: "Here are the users you are following",
                    code: "success",
                    userFollowings
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