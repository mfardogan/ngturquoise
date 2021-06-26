import Concurrency from "./concurrency";

class Choice extends Concurrency{
    name: string = '';
    color: string = '';
    code!: string;
    number!: number;
    description!: string;
}

export default Choice;