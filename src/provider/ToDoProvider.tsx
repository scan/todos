import React, {
  FunctionComponent,
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
} from 'react';
import { v4 as uuid } from 'uuid';

import noop from 'lodash/noop';
import concat from 'lodash/concat';
import filter from 'lodash/filter';

import type { ToDo, ToDoID } from '../todo';
import { openRepository, Repository } from '../repository';

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
  const [repository, setRepository] = useState<Repository | null>(null);

  useEffect(() => {
    const fetchDate = async () => {
      const repo = await openRepository();
      setRepository(repo);

      const todos = await repo.list();
      setToDos(todos);
    };
    void fetchDate();
  }, [setRepository, setToDos]);

  const addToDo = useCallback(
    (message: string) => {
      const newToDo: ToDo = {
        id: uuid(),
        message,
        createdAt: new Date(),
      };

      if (repository) {
        void repository.insert(newToDo);
      }

      setToDos(concat(toDos, newToDo));
    },
    [toDos, setToDos, repository]
  );

  const removeToDo = useCallback(
    (tid: ToDoID) => {
      if (repository) {
        void repository.remove(tid);
      }

      setToDos(filter(toDos, ({ id }) => id !== tid));
    },
    [toDos, setToDos, repository]
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
