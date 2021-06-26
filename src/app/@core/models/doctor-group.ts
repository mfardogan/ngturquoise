import Concurrency from "./concurrency";
import Doctor from "./doctor";

class DoctorGroup extends Concurrency {
    doctorCount: number = 0;
    groupName: string = '';
    code!: string;
    default: boolean = false;
    description!: string;
    doctors: Array<Doctor> = []
}

export default DoctorGroup;