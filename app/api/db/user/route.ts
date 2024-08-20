import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

const prisma = new PrismaClient().$extends(withAccelerate())

export async function POST(request: NextRequest) {

    const username = request.nextUrl.searchParams.get("username")
    const email = request.nextUrl.searchParams.get("email")
    const fullname = request.nextUrl.searchParams.get("fullname")
    const picture = request.nextUrl.searchParams.get("picture")

    try {

        if (username && picture && email && fullname) {

            const user = await prisma.user.create({
                data: {
                    username: username,
                    email: email,
                    fullname: fullname,
                    picture: picture
                }
            })

            return NextResponse.json({
                message: "User created successfully",
                code: "success",
                user
            })

        } else {
            return NextResponse.json({
                message: "Missing required parameters: username, picture, email, fullname",
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

export async function GET(request: NextRequest) {

    const email = request.nextUrl.searchParams.get("email")

    try {

        if (email) {
            const user = await prisma.user.findUnique({
                where: {
                    email: email
                }
            })

            if (user) {
                return NextResponse.json({
                    message: "User found",
                    code: "user_found",
                    user
                })
            }

            else {
                return NextResponse.json({
                    message: "User not found",
                    code: "user_not_found"
                })
            }

        } else {
            return NextResponse.json({
                message: "Missing required parameter: email",
                code: "missing_params"
            })
        }

    } catch (error) {
        return NextResponse.json({
            message: "An error occurred",
            code: "error",
            error
        })
    }
}