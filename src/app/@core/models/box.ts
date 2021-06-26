import Choice from "./choice";
import Concurrency from "./concurrency";

class Box extends Concurrency{
    choiceId: number = 0;
    choice!: Choice;
    startX: number = 0;
    startY: number = 0;
    width: number = 0;
    height: number = 0;
}

export default Box;