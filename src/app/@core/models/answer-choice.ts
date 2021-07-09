import { IIterable } from "src/app/IIterable";
import { IIterator } from "src/app/IIterator";
import { IStack } from "src/app/IStack";
import { Iterator } from "src/app/Iterator";
import Stack from "src/app/Stack";
import Box from "./box";
import Concurrency from "./concurrency";

class AnswerChoice extends Concurrency implements IIterable<Box>{

    surveyImageId: number = 0;
    surveyImage!: File;
    boxes: Array<Box> = [];
    backStack: IStack<Box> = new Stack<Box>();

    /**
     * Add 
     * @param box Box
     * @returns 
     */
    addBox(box: Box): void {
        if (box.width == 0 || box.height == 0) {
            return;
        }
        this.boxes.push(box);
    }

    canUndo(): boolean {
        return this.boxes.length > 0;
    }

    canRedo(): boolean {
        return !this.backStack.isEmpty();
    }

    undo(): void {
        if (!this.canUndo()) { return; }
        const topOfForward: Box = this.boxes.pop()!;
        this.backStack.push(topOfForward);
    }

    redo(): void {
        if (!this.canRedo()) { return; }
        const topOfBack: Box = this.backStack.pop()!;
        this.boxes.push(topOfBack);
    }

    /**
     * Get iterator
     */
    createIterator(): IIterator<Box> {
        const xs: Box[] = this.boxes.slice();
        return new Iterator<Box>(xs);
    }
}
export default AnswerChoice;