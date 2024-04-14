
export class QuestionManager {
    constructor() {
        //questions should be objects formatted like so:
        // {
        //     question: "example",
        //     a: "example",
        //     b: "example",
        //     c: "example",
        //     d: "example"
        // }

        //list holding all question objects in each subject
        this.math = []
        this.physics = []
        this.science = []

        //booleans that are true if player selects the subject
        this.math = false;
        this.physics = false;
        this.science = false;
    }

    addMathQuestion(question) {
        this.math.push(question)
    }

    addPhysicsQuestion(question) {
        this.physics.push(question);
    }
    
    addScienceQuestion(question) {
        this.science.push(question)
    }
}