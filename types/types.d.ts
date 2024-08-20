declare type Auth0User = {
    given_name: string;
    nickname: string;
    name: string;
    picture: string;
    updated_at: string;
    email: string;
    email_verified: boolean;
    sub: string;
    sid: string;
}

declare type CompleteSignupParams = {
    email: string;
    picture: string;
    fullname: string;
}

declare type ProfleAndEmailParams = {
    email: string;
    picture: string;
    fullname: string;
}

declare type UserNameState = "available" | "unavailable" | "no_input"

declare type HandleSignupFunctionProps = {
    username: string
}

declare type DbUser = {
    email: string;
    fullname: string;
    picture: string;
    username: string;
}

declare type AddUserResponse = {
    message: string;
    code: "success" | "missing_params" | "error";
    user: DbUser;
}

declare type UserExistsResponse = {
    message: string;
    code: "user_found" | "user_not_found" | "error" | "missing_params";
    user: DbUser;
}

declare type UserNameAvailibilityResponse = {
    message: string;
    code: "username_unavailable" | "username_available" | "error";
}

declare type ModalState = "initial" | "completed"

declare type Auth0Params = {
    user: Auth0User;
    session: Session
}