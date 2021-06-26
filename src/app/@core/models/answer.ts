import AnswerChoice from "./answer-choice";
import Box from "./box";
import Concurrency from "./concurrency";
import Doctor from "./doctor";
import Survey from "./survey";

class Answer extends Concurrency{

    doctorId: number = 0;
    doctor!: Doctor;
    surveyId: number = 0;
    survey!: Survey;
    choices: Array<AnswerChoice> = [];
    creationAt!: Date;

    static prepare(images: Array<number>): Answer {

        const answer: Answer = new Answer();
        images.forEach((id: number) => {

            const choice: AnswerChoice = new AnswerChoice();
            choice.boxes = [];
            choice.surveyImageId = id;
            answer.choices.push(choice);
        })
        return answer;
    }

    addBox(image: number, box: Box): void {
        const choice = this.choices.find(e => e.surveyImageId === image);
        choice?.boxes.push(box);
    }
}
export default Answer;