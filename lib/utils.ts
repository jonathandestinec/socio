import { getSession } from "@auth0/nextjs-auth0"
import { NextRequest, NextResponse } from "next/server"

import { type ClassValue, clsx } from "clsx"
import { redirect } from "next/navigation"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const verifySession = async (req: NextRequest, res: NextResponse) => {

  const session = await getSession(req, res)

  if (!session || !session?.user) {
    return NextResponse.json({
      message: "Unothorized request"
    })
  } else {
    return true
  }
}