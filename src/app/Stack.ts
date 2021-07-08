import { IStack } from "./IStack";

export default class Stack<T> implements IStack<T>{

    private collection: T[] = [];

    /**
     * Returns a boolean that stack is empty
     * @returns boolean
     */
    isEmpty(): boolean {
        return this.collection.length == 0;
    }

    /**
     * Push data to the stack
     * @param item Item
     */
    push(item: T): void {
        this.collection.push(item);
    }

    /**
     * Pop top element of stack
     */
    pop(): T | undefined {
        return this.collection.pop();
    }

    /**
     * Clear stack
     */
    free(): void {
        this.collection = [];
    }

}