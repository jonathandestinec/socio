"use client"

import React, { useRef, useState } from "react"

import { Ubuntu_Mono } from "next/font/google";

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { useToast } from "./ui/use-toast";
import { addUser, checkUserNameAvailibility } from "@/lib/db.actions";
import { redirect, useRouter } from "next/navigation";

const ubuntu_mono = Ubuntu_Mono({ subsets: ["latin-ext"], weight: ["400", "700"] });

export default function CompleteSignupDialog({ email, picture, fullname }: CompleteSignupParams) {

    const { toast } = useToast()

    const router = useRouter()

    const UserNameRef = useRef<HTMLInputElement>(null)

    const [usernameState, setUsernameState] = useState<UserNameState>("available")
    const [isLoading, setIsLoading] = useState(false)
    const [modalState, setModalState] = useState<ModalState>("initial")

    const handleCompleteSignup = async (username: string | undefined) => {

        // Begin the process
        setIsLoading(true)

        // Check for !undefined
        if (username != undefined && username != "") {

            const isUsernameAvailable: UserNameAvailibilityResponse = await checkUserNameAvailibility(username)


            // Perform further validation for the username
            if (isUsernameAvailable.code === "username_unavailable") {

                setUsernameState("unavailable")
                // Don't peform any action
                setIsLoading(false)
                return

            } else if (isUsernameAvailable.code === "username_available") {

                // Send data to your backend API or database here.
                const data = {
                    username,
                    email,
                    picture,
                    fullname
                }

                const response: AddUserResponse = await addUser({ ...data })

                if (response.code === "success") {

                    // OnSuccess
                    setModalState("completed")

                    setUsernameState("available")
                    setIsLoading(false)

                    router.refresh()

                } else if (response.code === "error") {
                    toast({
                        title: response.code,
                        description: response.message,
                        variant: "destructive"
                    })
                }

            } else {
                // Handle error
                console.error("Error checking username availability:", isUsernameAvailable)
                setIsLoading(false)
            }

        } else {
            setUsernameState("no_input")
            setIsLoading(false)
        }

    }

    return (
        <Dialog>
            <div className=" w-full flex items-center justify-center mt-8">
                <DialogTrigger asChild>
                    <Button className={`${ubuntu_mono.className}`}>Complete Signup_</Button>
                </DialogTrigger>
            </div>

            <DialogContent className={`sm:max-w-[425px]`}>
                {
                    modalState === "completed" ? (
                        <div className=" w-full h-full flex items-center justify-center">
                            <div>
                                <h1 className=" text-5xl text-center">🚀🚀</h1>
                                <p className={` font-bold text-center text-3xl`}>Process complete</p>
                                <p className={`${ubuntu_mono.className} text-center font-semibold text-lg`}>Redirecting you to the home page</p>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <DialogHeader>
                                <DialogTitle>Complete Signup_</DialogTitle>
                                <DialogDescription>
                                    Fill out these inputs and you're done creating your account!
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">

                                <div className={`flex items-center justify-center gap-5`}>

                                    <Label htmlFor="username" className="text-right">
                                        Username
                                    </Label>

                                    <div className=" w-max h-max">
                                        <Label htmlFor="username" className=" text-left text-red-500">
                                            {
                                                usernameState === "unavailable" ? "Username is already taken" :
                                                    usernameState === "no_input" ? "Enter a username" :
                                                        ""
                                            }
                                        </Label>

                                        <Input
                                            id="username"
                                            placeholder="Enter a unique username"
                                            className={cn(`col-span-3 mt-2`,
                                                {
                                                    "border-red-500 border-2 text-red-500": usernameState === "unavailable",
                                                    "border-red-600 border-2 text-red-500": usernameState === "no_input",
                                                    "border-slate-300 border-2": usernameState === "available",
                                                }
                                            )}
                                            ref={UserNameRef}
                                            autoFocus
                                            required
                                        />
                                    </div>

                                </div>
                            </div>
                            <DialogFooter>
                                <Button
                                    type="submit"
                                    onClick={() => {
                                        handleCompleteSignup(UserNameRef.current?.value)
                                    }}
                                    disabled={isLoading}
                                    className=" flex items-center justify-center gap-2"
                                >
                                    Save changes
                                    <span className={cn(`loading loading-spinner`,
                                        {
                                            "hidden": !isLoading,
                                            "block": isLoading
                                        }
                                    )}></span>
                                </Button>
                            </DialogFooter>
                        </div>
                    )
                }
            </DialogContent>
        </Dialog>
    )
}
