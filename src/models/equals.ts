export interface Equals<T> {
    canEqual(that: T): boolean
    equals(that: T): boolean
}