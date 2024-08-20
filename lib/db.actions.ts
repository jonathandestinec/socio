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
    // Check username availability logic here
    try {

        const response = await fetch(`/api/db/username?username=${username}`, {
            method: "GET"
        })

        return response.json()

    } catch (error) {
        throw (error)
    }
}

export const findUser = async (email: string) => {

    const base_url = process.env.BASE_URL

    try {

        // Check user existence logic here
        const response = await fetch(`${base_url}/api/db/user?email=${email}`, {
            method: "GET"
        })

        return response.json()

    } catch (error) {
        console.log(error)
    }
}