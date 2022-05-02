export interface user {
    id: number
    email: string
    password: string
}

export interface session {
    id: number
    token: string
    userId: number
}

export interface Filter {
    groupBy: "discipline" | "teacher";
}

export type UserData = Omit<user, "id">

export type SessionData = Omit<session, "id">