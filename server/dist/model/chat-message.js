import { Message } from './message';
export class ChatMessage extends Message {
    constructor(from, content) {
        super(from, content);
    }
}
