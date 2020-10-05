import React, {
  FunctionComponent,
  createContext,
  useContext,
  useCallback,
  useState,
} from 'react';
import { v4 as uuid } from 'uuid';

import noop from 'lodash/noop';
import concat from 'lodash/concat';
import filter from 'lodash/filter';

import type { ToDo, ToDoID } from '../todo';

type ToDoContextData = {
  toDos: ToDo[];
  addToDo: (message: string) => void;
  removeToDo: (id: ToDoID) => void;
};

const ToDoContext = createContext<ToDoContextData>({
  toDos: [],
  addToDo: noop,
  removeToDo: noop,
});

const ToDoProvider: FunctionComponent = ({ children }) => {
  const [toDos, setToDos] = useState<ToDo[]>([]);

  const addToDo = useCallback(
    (message: string) => {
      const newToDo: ToDo = {
        id: uuid(),
        message,
        createdAt: new Date(),
      };

      setToDos(concat(toDos, newToDo));
    },
    [toDos, setToDos]
  );

  const removeToDo = useCallback(
    (tid: ToDoID) => {
      setToDos(filter(toDos, ({ id }) => id !== tid));
    },
    [toDos, setToDos]
  );

  return (
    <ToDoContext.Provider
      value={ {
        toDos,
        addToDo,
        removeToDo,
      } }
    >
      {children}
    </ToDoContext.Provider>
  );
};

export const useToDos = (): ToDoContextData => useContext(ToDoContext);

export default ToDoProvider;
