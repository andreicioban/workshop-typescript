export type Gender = "M" | "F" | "Male" | "Female"
export function validateGender(g: Gender): void {
    switch(g) {
        case "M":
        case "F":
        case "Male":
        case "Female": break;
        default: throw new Error('Unknown gender!')
    }
}