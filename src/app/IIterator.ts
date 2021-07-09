export interface IIterator<T> {
    next(): T;
    finished(): boolean;
}