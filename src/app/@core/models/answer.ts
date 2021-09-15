import AnswerChoice from "./answer-choice";
import Box from "./box";
import Concurrency from "./concurrency";
import Doctor from "./doctor";
import Survey from "./survey";

class Answer extends Concurrency {

    doctorId: number = 0;
    doctor!: Doctor;
    surveyId: number = 0;
    survey!: Survey;
    choices: Array<AnswerChoice> = [];
    creationAt!: Date;

    static prepare(images: Array<number>): Answer {

        const answer = new Answer();
        images.forEach((id: number) => {
            const choice = new AnswerChoice();
            choice.surveyImageId = id;
            answer.choices.push(choice);
        })
        return answer;
    }

    getAnswerByImage(image: number): AnswerChoice {
        const choice = this.choices.find(e => e.surveyImageId === image);
        return choice!;
    }

    prettyAnswer(): void {
        this.choices.forEach(element => {
            element.boxes = element.boxes.filter(e => e.width > 0 && e.height > 0);
        });
    }
}
export default Answer;