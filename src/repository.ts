import { openDB, IDBPDatabase } from 'idb';
import TodosApp from '../pages/_app';

import { ToDo, ToDoID } from './todo';

export interface Repository {
  list: () => Promise<ToDo[]>;
  insert: (todo: ToDo) => Promise<void>;
  remove: (id: ToDoID) => Promise<void>;
}

export const openRepository = async (): Promise<Repository> => {
  if (!('indexedDB' in window)) {
    return Promise.reject('unsupported');
  }

  const db = await openDB<ToDo>('todos', 1, {
    upgrade: (idb: IDBPDatabase<ToDo>) => {
      idb.createObjectStore('items', { keyPath: 'id' });
    }
  });

  const repo = {
    list: () => {
      return db.getAll('items');
    },
    insert: async (todo: ToDo) => {
      await db.put('items', todo);
    },
    remove: (id: ToDoID) => {
      return db.delete('items', id);
    }
  };

  return Promise.resolve(repo);
}
