import { IIterator } from "./IIterator";

export interface IIterable<T> {
    createIterator(): IIterator<T>
}