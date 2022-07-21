import { ITypingGameStore } from "./ITypingGameStore";
import { action, observable, makeAutoObservable } from "mobx";

export class TypingGameStore implements ITypingGameStore {

    @observable
    originalText: string;

    @observable
    typingText: string;

    @observable
    userInput: string;

    constructor() {
        makeAutoObservable(this);
        this.originalText = 'A virtual assistant (typically abbreviated to VA) is generally self-employed and provides professional administrative, technical, or creative assistance to clients remotely from a home office.';
 
        this.typingText = 'A virtual assistant (typically abbreviated to VA) is generally self-employed and provides professional administrative, technical, or creative assistance to clients remotely from a home office.';
 
        this.userInput = '';
    }

    startInterval(): void {
        throw new Error("Method not implemented.");
    }
    resetInterval(): void {
        throw new Error("Method not implemented.");
    }

    @action setStoreUserInput(input: string){
        this.userInput = input;
    }

    @action setStoreTypingText(input: string){
        this.typingText = input;
    }

    @action setStoreOriginalText(input: string){
        this.originalText = input;
    }

    @action userInputReceived(input: string): void {
        console.log('user input received called')
        if (this.userInput.length > this.originalText.length)
            return
        var typingText = this.originalText;
        var chars = this.userInput.split("")
        var originalChars = this.originalText.split("");
        var currStr = '';
        for (var i = 0; i < chars.length; i++) {
            if (chars[i] !== originalChars[i]) {
                currStr += "<span class='error'>" + originalChars[i] + "</span>"
            }
            else {
                currStr += originalChars[i];
            }
        }

        if (chars.length === originalChars.length)
            typingText = currStr
        else
            typingText = currStr + this.originalText.substring(chars.length);

        this.typingText = typingText;
    }
    
    loadText(): void {
        throw new Error("Method not implemented.");
    }

}