export class PrivateUser {
    uuid: string;
    alias: string;
    username: string;
}


export class PrivateUserProfile {
    user_uuid: string;
    alias: string;
    username: string;
    first_name: string;
    last_name: string;
}

export class PublicUser {
    user_uuid: string;
    user_uuid_digest: string;
    alias: string;
}

export class PublicUserDetail {
    user_uuid: string;
    alias: string;
    username: string;
    nick_name: string;
}

