export interface DecodedUser {
    iss: string
    aud: string
    auth_time: number
    user_id: string
    sub: string
    iat: number 
    exp: number 
    email: string
    email_verified: boolean
    firebase: object
    sign_in_provider: string
}