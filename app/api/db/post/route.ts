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
        const content = request.nextUrl.searchParams.get("content")

        try {

            if (userId && content) {

                const user = await prisma.post.create({
                    data: {
                        userId: userId,
                        content: content
                    }
                })

                return NextResponse.json({
                    message: "Post created successfully",
                    code: "success",
                    user
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
