import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

const prisma = new PrismaClient().$extends(withAccelerate())

export async function GET(request: NextRequest) {

    const username = request.nextUrl.searchParams.get("username")

    try {

        if (username) {
            // Check if the username is already taken in the database
            const usernameExists = await prisma.user.findUnique({
                where: {
                    username: username
                }
            })

            // Check if the username exists in the database
            if (usernameExists) {
                return NextResponse.json({ message: "Username is not available", code: "username_unavailable" })
            } else {
                return NextResponse.json({ message: "Username is available", code: "username_available" })
            }

        }
        else {
            return NextResponse.json({
                message: "Username is required",
                code: "error"
            })
        }

    }
    catch (error) {
        return NextResponse.json({
            message: "An error occurred",
            code: "error",
            error
        })
    } finally {
        await prisma.$disconnect()
    }

}