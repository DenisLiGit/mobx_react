import {action, makeAutoObservable} from "mobx";

class Todo {
    todolist = []

    @action get Todos() {
        return this.todolist
    }

    @action get TodoId() {
        const alphabet = "abcdefghijklmnopqrstuvwxyz"
        const randomCharacter = alphabet[Math.floor(Math.random() * alphabet.length)]
        const rundomNumber = Math.random()

        return `${randomCharacter}${rundomNumber}`
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default Todo