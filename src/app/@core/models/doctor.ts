import File from './file';
import Concurrency from "./concurrency";

class Doctor extends Concurrency {
    title!: string;
    name: string = '';
    surname: string = '';
    fullName!: string;
    email: string = '';
    phone: string = '';
    creationAt!: Date;
    dateOfBirth!: Date;
    image!: File;
    password: string = '';
    about!: string;
    hospital!: string;
    department!: string;
    type: number = 0;
    gender: number = 0;
    isConfirmed: boolean = false;
    activityPercent: number = 0;
}

export default Doctor;