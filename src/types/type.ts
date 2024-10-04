export type TProfile = {
    _id: string;
    user_id: number;
    first_name: string,
    last_name: string,
    username: string,
    phone: number,
    address: {
        street: string,
        city: string,
        state: string,
        zip_code: number
    },
    profile_picture: string,
    profile_cover: string,
    role: string,
    tags: [
        {
            _id: string,
            name: string,
        },
        {
            _id: string,
            name: string,
        },
        {
            _id: string,
            name: string,
        },
    ]
    about: string,
    social_links: [
        {
            id: number,
            name: string,
            link: string,
            is_exist: boolean,
        },
        {
            id: number,
            name: string,
            link: string,
            is_exist: boolean,
        }
    ],
    is_active: boolean,
    created_at: Date,
    updated_at: Date,
}

export type TUser = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    otp_code: string;
    otp_expiration: Date,
    is_verified: boolean,
    created_at: Date,
    updated_at: Date,
}