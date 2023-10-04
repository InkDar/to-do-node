const getCurrentToDos = (toDoList) => {
  const filteredToDos = [];
  toDoList.forEach(toDo => {
    if (!toDo.done && !toDo.deleted) {
      filteredToDos.push({
        id: toDo.id,
        title: toDo.title,
        description: toDo.description,
      })
    }
  });
  return filteredToDos;
}

const getCompletedToDos = (toDoList) => {
  const filteredToDos = [];
  toDoList.forEach(toDo => {
    if (toDo.done && !toDo.deleted) {
      filteredToDos.push({
        id: toDo.id,
        title: toDo.title,
        description: toDo.description,
      })
    }
  });
  return filteredToDos;
}

const getDeletedToDos = (toDoList) => {
  const filteredToDos = [];
  toDoList.forEach(toDo => {
    if (toDo.deleted) {
      filteredToDos.push({
        id: toDo.id,
        title: toDo.title,
        description: toDo.description,
      });
    }
  });
  return filteredToDos;
}

export {
  getCurrentToDos,
  getCompletedToDos,
  getDeletedToDos,
}
