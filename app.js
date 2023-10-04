import { commands } from './enum.js';
import * as ReadLine from 'node:readline/promises';
import {
  stdin as input,
  stdout as output,
} from 'node:process';

const readLine = ReadLine.createInterface({
  input,
  output,
});

const showPossibleCommands = () => {
  console.log(" ");
  console.log("Please choose a command from the list below:");
  for (let key in Object.keys(commands)) {
    console.log(`${key}: ${commands[key]}`);
  }
  // console.log("1. List current ToDos");
  // console.log("2. Add ToDo");
  // console.log("3. Mark as Done");
  // console.log("4. Completed ToDos");
  // console.log("5. Delete ToDo");
  // console.log("6. Deleted ToDos");
  // console.log("0. Exit the program");
  // console.log(" ");
};

const main = async () => {
  showPossibleCommands();
  const newCommand = await readLine.question('Your Command: ');

  switch (newCommand) {
    case "7": {
      return readLine.close();
    }
    case "1": {

    }
    default: {
      console.log(" ");
      console.log("****************");
      console.log("*Wrong Command!*");
      console.log("****************");
      console.log(" ");
    }
  }

  main();
};

main();

