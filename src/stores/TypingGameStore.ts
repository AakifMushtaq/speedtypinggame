import { ITypingGameStore } from "./ITypingGameStore";
import { action, observable, makeAutoObservable } from "mobx";
import typingtexts from "../typingtexts.json"
export class TypingGameStore implements ITypingGameStore {

    @observable
    originalText: string;

    @observable
    typingText: string;

    @observable
    userInput: string;

    @observable
    difficulty: string[];

    constructor() {
        makeAutoObservable(this);
        this.difficulty = ["Easy", "Medium", "Hard"]
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

    @action updateTextDifficulty(difficulty: string){
        let text = '';
        if(difficulty.toLowerCase() === 'easy'){
            text = typingtexts.TypingTexts.filter(x => x.difficulty === 'easy')[0].text;
        }
        else if(difficulty.toLowerCase() === 'medium'){
            text = typingtexts.TypingTexts.filter(x => x.difficulty === 'medium')[0].text;
        }
        else if(difficulty.toLowerCase() === 'hard'){
            text = typingtexts.TypingTexts.filter(x => x.difficulty === 'hard')[0].text;
        }

        this.setStoreOriginalText(text);
        this.setStoreTypingText(text);
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