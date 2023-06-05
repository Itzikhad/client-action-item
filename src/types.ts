import { Dispatch, SetStateAction } from "react";

interface Address {
    street_number: string;
    street_name: string;
    city: string;
    state: string;
    country: string;
}

export interface User {
    id: number;
    profile_img_url: string;
    profile_thumbnail_url: string;
    title: string;
    first_name: string;
    last_name: string;
    gender: string;
    address: Address;
    email: string;
    phone: string;
    age: number;
    year: string;
    show: boolean;
}

export type Context = {
    users: User[] | null;
    selectedUser: User | null;
    setSelectedUser: Dispatch<SetStateAction<User | null>>;
}
