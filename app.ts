import { ToDo } from './types';
const readLine = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

const commands = ["0", "1", "2", "3", "4", "5"];
const toDos: ToDo[] = [];

const showPossibleCommands = () => {
  console.log(" ");
  console.log("Please choose a command from the list below:");
  console.log("1. List current ToDos");
  console.log("2. Add ToDo");
  console.log("3. Mark as Complete");
  console.log("4. Completed ToDos");
  console.log("5. Delete ToDo");
  console.log("5. Deleted ToDo");
  console.log("0. Exit the program");
  console.log(" ");
};

const main = () => {
  showPossibleCommands();
  readLine.question('Your Command: ', async (newCommand: string) => {
    if (newCommand === "0") {
      return readLine.close();
    }
    if (!commands.includes(newCommand)) {
      console.log(" ");
      console.log("****************");
      console.log("*Wrong Command!*");
      console.log("****************");
      console.log(" ");
    }

    main();
  });
};

main();

