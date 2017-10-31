export class User {
    public email: string
    public emailVerified: boolean
    public phoneNumber: string
    public password: string
    public displayName: string
    public photoURL: string
    public disabled: boolean

    constructor(displayName: string, email: string, password: string) {
        this.email = email
        this.password = password
        this.displayName = displayName
        this.emailVerified = false
        this.disabled = false
    }
}