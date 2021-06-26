import Box from "./box";
import Concurrency from "./concurrency";

class AnswerChoice extends Concurrency{
    surveyImageId: number = 0;
    surveyImage!: File;
    boxes: Array<Box> = [];
}
export default AnswerChoice;