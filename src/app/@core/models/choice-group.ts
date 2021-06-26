import Choice from "./choice";
import Concurrency from "./concurrency";

class ChoiceGroup extends Concurrency {
    name: string = '';
    code!: string;
    default: boolean = false;
    description!: string;
    choiceCount: number = 0;
    surveyCount: number = 0;
    choices: Array<Choice> = [];
}

export default ChoiceGroup;