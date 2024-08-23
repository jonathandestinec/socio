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
    id?: string
}

declare type DbUserSpecificUserType = {
    user?: DbUser
}

declare type AddUserResponse = {
    message: string;
    code: "success" | "missing_params" | "error";
    user: DbUser;
}

declare type UserExistsResponse = {
    message: string;
    code: "user_found" | "user_not_found" | "error" | "missing_params" | "access_denied"
    user?: DbUser;
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

declare type PinnedUsersParams = {
    latestNotification: string;
    userId: string | undefined;
    picture: string;
    fullname: string;
}

declare type PinnedUserType = {
    id: string;
    userId: string;
    followingId: string;
    activityTime: Date;
}

declare type GetPinnedUsers = {
    message: string;
    code: "success" | "error" | "missing_params" | "access_denied";
    userFollowings?: PinnedUserType[];
}

declare type AddPostPArams = {
    userId: string;
    content: string;
}

declare type UserFollowings = {
    id: string;
    userId: string;
    followingId: string;
}

declare type TargetPinnedUser = {
    message: string;
    code: "success" | "error" | "access_denied";
    userFollowings: UserFollowings[];
}

declare type ActivityOrderTime = "asc" | "desc" | any

declare type RecentActivity = {
    id: string;
    type: string;
    time: Date;
    userId: string;
    activity: string;
}
