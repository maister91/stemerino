import { Option } from '../_models/option';

export class Poll {
    pollID: number;
    topic: string;
    options: Option[];
    count: number;
}
