export interface IStack<T> {
    isEmpty(): boolean;
    push(item: T): void;
    pop(): T | undefined;
    free(): void;
}