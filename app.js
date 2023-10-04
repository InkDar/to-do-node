import { commands } from './enum.js';
import * as ToDoService from './toDo.service.js';
import * as ReadLine from 'node:readline/promises';
import {
  stdin as input,
  stdout as output,
} from 'node:process';

const readLine = ReadLine.createInterface({
  input,
  output,
});

const toDos = [];

const showPossibleCommands = () => {
  console.log("\nPlease choose a command from the list below:");
  for (let key of Object.keys(commands)) {
    console.log(`${key}: ${commands[key]}`);
  }
};


const main = async () => {
  showPossibleCommands();
  const newCommand = await readLine.question('Your Command: ');

  switch (newCommand) {
    // List Current ToDos
    case "1": {
      const currentToDos = ToDoService.getCurrentToDos(toDos);
      currentToDos.length > 0 ? console.table(currentToDos) : console.log("\nNo To Dos in the list!");
      break;
    }
    // Add ToDo
    case "2": {
      const title = await readLine.question('ToDo Title: ');
      const description = await readLine.question('ToDo short description: ');
      toDos.push({
        id: toDos.length,
        title,
        description,
        done: false,
        deleted: false,
      });
      console.log("\nSuccessfully added!");
      break;
    }
    // Mark as Done
    case "3": {
      const currentToDos = ToDoService.getCurrentToDos(toDos);
      currentToDos.length > 0 ? await markDone() : console.log("\nNo To Dos in the list!");
      break;
    }
    // Mark as Undone
    case "4": {
      const completedToDos = ToDoService.getCompletedToDos(toDos);
      completedToDos.length > 0 ? await markUndone() : console.log("\nNo To Dos in the list!");
      break;
    }
    // Completed ToDos
    case "5": {
      const completedToDos = ToDoService.getCompletedToDos(toDos);
      completedToDos.length > 0 ? console.table(completedToDos) : console.log("\nNo Completed To Dos in the list!");
      break;
    }
    // Delete ToDo
    case "6": {
      const currentToDos = ToDoService.getCurrentToDos(toDos);
      currentToDos.length > 0 ? await deleteToDo() : console.log("\nNo To Dos in the list!");
      break;
    }
    // Restore Deleted ToDo
    case "7": {
      const deletedToDos = ToDoService.getDeletedToDos(toDos);
      deletedToDos.length > 0 ? await restoreToDo() : console.log("\nNo To Dos in the list!");
      break;
    }
    // Deleted ToDos
    case "8": {
      const deletedToDos = ToDoService.getDeletedToDos(toDos);
      deletedToDos.length > 0 ? console.table(deletedToDos) : console.log("\nNo Deleted To Dos in the list!");
      break;
    }
    // Exit the program
    case "9": {
      return readLine.close();
    }
    default: {
      console.log("\n****************");
      console.log("*Wrong Command!*");
      console.log("****************\n");
      break;
    }
  }

  main();
};

const markDone = async () => {
  console.table(ToDoService.getCurrentToDos(toDos));
  let id = await readLine.question('\nToDo id to mark done: ');
  try {
    id = parseInt(id);
  } catch (error) {
    console.log("\nPlease provide a valid id!");
    return markDone();
  }
  const index = toDos.findIndex(e => e.id === id);

  if (index < 0) {
    console.log("\nPlease provide a valid id!");
    return markDone();
  }
  toDos[index].done = true;
  console.log('\nYEEEY a task is complete!');
  return;
}

const markUndone = async () => {
  console.table(ToDoService.getCompletedToDos(toDos));
  let id = await readLine.question('\nToDo id to mark undone: ');
  try {
    id = parseInt(id);
  } catch (error) {
    console.log("\nPlease provide a valid id!");
    return markUndone();
  }
  const index = toDos.findIndex(e => e.id === id);
  const completedIndex = ToDoService.getCompletedToDos(toDos).findIndex(e => e.id === id);

  if (index < 0 || completedIndex < 0) {
    console.log("\nPlease provide a valid id!");
    return markUndone();
  }
  toDos[index].done = false;
  console.log('\nToDo Marked as Undone!');
  return;
}

const deleteToDo = async () => {
  console.table(ToDoService.getCurrentToDos(toDos));
  let id = await readLine.question('\nToDo id to delete: ');
  try {
    id = parseInt(id);
  } catch (error) {
    console.log("\nPlease provide a valid id!");
    return deleteToDo();
  }
  const index = toDos.findIndex(e => e.id === id);

  if (index < 0) {
    console.log("\nPlease provide a valid id!");
    return deleteToDo();
  }
  toDos[index].deleted = true;
  console.log('\nToDo successfully deleted!');
  return;
}

const restoreToDo = async () => {
  console.table(ToDoService.getDeletedToDos(toDos));
  let id = await readLine.question('\nToDo id to restore: ');
  try {
    id = parseInt(id);
  } catch (error) {
    console.log("\nPlease provide a valid id!");
    return restoreToDo();
  }
  const index = toDos.findIndex(e => e.id === id);
  const deletedIndex = ToDoService.getDeletedToDos(toDos).findIndex(e => e.id === id);

  if (index < 0 || deletedIndex < 0) {
    console.log("\nPlease provide a valid id!");
    return restoreToDo();
  }
  toDos[index].deleted = false;
  console.log('\nToDo successfully Restored!');
  return;
}

main();

