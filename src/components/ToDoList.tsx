import React, { FunctionComponent, useCallback } from 'react';
import map from 'lodash/map';

import Grid from '@material-ui/core/Grid';

import type { ToDoID } from '../todo';

import { useToDos } from '../provider/ToDoProvider';
import ToDoItem from './ToDoItem';

const ToDoList: FunctionComponent = () => {
  const { toDos, removeToDo } = useToDos();

  const onRemove = useCallback((id: ToDoID) => () => {
    removeToDo(id);
  }, [removeToDo])

  return (
    <Grid container>
      { map(toDos, ({ id, message, createdAt }) => (
        <ToDoItem key={ id } message={ message } createdAt={ createdAt } onRemove={ onRemove(id) } />
      )) }
    </Grid>
  )
};

export default ToDoList;
