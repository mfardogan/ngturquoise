import { IIterator } from "./IIterator";

export class Iterator<T> implements IIterator<T>{

    constructor(
        private xs: T[]
    ) { }

    /**
     * Get next element
     * @returns T
     */
    next(): T {
        const top = this.xs.pop()!;
        return top;
    }

    /**
     * Is finished
     * @returns boolean
     */
    finished(): boolean {
        return this.xs.length == 0;
    }

}