export class PrivateUser {
    uuid: string;
    alias: string;
    username: string;
}

export class PrivateUserAccount {
    user_uuid: string;
    alias: string;
    username: string;
    first_name: string;
    last_name: string;
    formatted_name: string;
}

export class PrivateUserPreferences {
    user_uuid: string;
    alias: string;
    username: string;
    first_name: string;
    last_name: string;
    formatted_name: string;
    is_private: boolean;
    account_type: string;

}

export class PrivateUpdatePrivateFlag {
    is_private: boolean;
}

export class PrivateUpdateNames {
    first_name: string;
    last_name: string;
}

export class PrivateUpdatePassword {
    old_password: string;
    new_password: string;
}

export class PrivateUpdateUsername {
    old_username: string;
    new_username: string;
    password: string;
}

export class PublicUser {
    user_uuid: string;
    user_uuid_digest: string;
    alias: string;
    is_friend: boolean;
}

export class PublicUserProfile {
    user_uuid: string;
    user_uuid_digest: string;
    alias: string;

}

