export interface ITypingGameStore{
    /**
     * variable to store the original text
     * 
     * @type string
     * @memberof ITypingGameStore
     */
    originalText: string

     /**
     * variable to store the current state of text
     * 
     * @type {string}
     * @memberof ITypingGameStore
     */
    typingText: string

     /**
     * variable to store what user has entered so far
     * 
     * @type {string}
     * @memberof ITypingGameStore
     */
    userInput: string

    setStoreTypingText(input: string): void

    setStoreOriginalText(input: string): void

    setStoreUserInput(input: string): void

    /**
     * start the count down timer
     */
    startInterval(): void

    /**
     * reset the count down timer
     */
    resetInterval(): void

    /**
     * on text change
     */
    userInputReceived(input: string): void

     /**
     * load text
     */
    loadText(): void
}