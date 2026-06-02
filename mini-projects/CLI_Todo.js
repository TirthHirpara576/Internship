// Lec-28 :- How to build CLI-Todo-App using NodeJS

import readline from "readline"; // using this readline module, we can interact with user in command line
const rl = readline.createInterface({
    // this is the standard input/output stream, which allows us to read/write data from/to the command line
    input: process.stdin,
    output: process.stdout, 
});

const todoList = []; // this is an array to store our todo items

function showMenu() {  
    console.log("\nTodo List App");
    console.log("1. Add Todo");
    console.log("2. View Todos");
    console.log("3. Exit"); 
    rl.question("Choose an option: ", handleInput); // This question method prompts the user with the specified question and waits for input. Once the user provides input, it calls the handleInput function with the user's response as an argument.
}

function handleInput(option) {
    switch (option) {
        case "1":
            addTodo();
            break;
        case "2":
            viewTodos();
            break;
        case "3":
            console.log("Exiting...");
            rl.close(); // This method closes the readline interface, which will end the program.
            break;
        default:
            console.log("Invalid option");
            showMenu(); // Show menu again if input is invalid
    }
}

function addTodo() {
    rl.question("Enter a todo: ", (task) => {
        todoList.push(task);
        console.log("Task added!");
        showMenu(); // Show menu again after adding a task
    });
}

function viewTodos() {
    console.log("\nYour Todos:");
    todoList.forEach((todo, index) => {
        console.log(`${index + 1}. ${todo}`);
    });
    showMenu(); // Show menu again after viewing todos
}

showMenu(); // Start the application by showing the menu