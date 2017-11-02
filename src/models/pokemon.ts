import { Gender, validateGender } from '../constants/Gender'
import { Equals } from '../models/equals'

export class Pokemon implements Equals<Pokemon> {
    public name: string
    public height: string
    public weight: string
    public gender: string
    public abilities: string

    constructor(name: string, height: string, weight: string, gender: Gender, abilities: string) {
        this.name = name
        this.height = height
        this.weight = weight
        validateGender(gender)
        this.gender = gender
        this.abilities = abilities
    }
    public canEqual(that: Pokemon): boolean {
        return this.name === that.name
    }
    public equals(that: Pokemon): boolean {
        return this.canEqual(that) && this.weight === that.weight
    }
}